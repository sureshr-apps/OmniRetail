import { beforeEach, describe, expect, it } from 'vitest';
import { vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  dataConnect: {},
  functions: {},
  getCurrentUserAuthorization: vi.fn(),
  listTenantCustomers: vi.fn(),
  httpsCallable: vi.fn(),
}));

vi.mock('@omniretail/sql-connect', () => ({
  getCurrentUserAuthorization: mocks.getCurrentUserAuthorization,
  listTenantCustomers: mocks.listTenantCustomers,
}));
vi.mock('@/infrastructure/firebase/client', () => ({
  getFirebaseClientServices: () => ({ dataConnect: mocks.dataConnect, functions: mocks.functions }),
}));
vi.mock('firebase/functions', () => ({ httpsCallable: mocks.httpsCallable }));

import { customerService } from '@/features/customers/services/customerService';
import { MalformedCallableResponseError } from '@/shared/utils/callableResponse';

const customerRow = (overrides: Record<string, unknown> = {}) => ({
  id: 'cust-1', customerCode: 105, type: 'INDIVIDUAL', name: 'Jane Doe',
  phone: '+919876543210', email: 'jane@example.com', taxId: null, address: '1 Elm St',
  creditLimit: 1500, preferredContact: 'Email & SMS', dateOfBirth: null, gender: null,
  status: 'ACTIVE', notes: null,
  ...overrides,
});

beforeEach(() => {
  vi.clearAllMocks();
  mocks.getCurrentUserAuthorization.mockResolvedValue({
    data: { appUsers: [{ organizationMemberships_on_user: [{ status: 'ACTIVE', organization: { id: 'org-1' } }] }] },
  });
  mocks.listTenantCustomers.mockResolvedValue({ data: { customers: [customerRow()] } });
});

describe('customerService mutations return the canonical entity directly', () => {
  it('createCustomer returns the enriched entity from the callable, with no follow-up list query to locate it', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', ...customerRow({ id: 'cust-2', customerCode: 106, name: 'New Customer' }) },
    }));
    const created = await customerService.createCustomer({
      type: 'Individual', name: 'New Customer', phone: '+919876543210', email: 'new@example.com',
    });
    expect(created).toMatchObject({ id: 'cust-2', customerCode: 106, name: 'New Customer' });
    // customerCode is now a server-assigned serial, so create never needs an
    // up-front (or follow-up) listTenantCustomers call to compute or locate it.
    expect(mocks.listTenantCustomers).not.toHaveBeenCalled();
  });

  it('updateCustomer returns the enriched entity from the callable, with no follow-up list query to locate it', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', ...customerRow({ name: 'Renamed Customer' }) },
    }));
    const updated = await customerService.updateCustomer('cust-1', { name: 'Renamed Customer' });
    expect(updated.name).toBe('Renamed Customer');
    // listTenantCustomers is used once up-front to load the current row (the update callable
    // requires the full field set), never afterward to re-fetch the mutated row.
    expect(mocks.listTenantCustomers).toHaveBeenCalledTimes(1);
  });

  it('changeCustomerStatus returns the enriched entity from the callable, with no follow-up list query', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', ...customerRow({ status: 'INACTIVE' }) },
    }));
    const updated = await customerService.changeCustomerStatus('cust-1', 'Inactive');
    expect(updated.status).toBe('Inactive');
    expect(mocks.listTenantCustomers).not.toHaveBeenCalled();
  });

  it('deleteCustomer calls the organization-scoped delete callable without reloading the list', async () => {
    const callable = vi.fn().mockResolvedValue({ data: { success: true, organizationId: 'org-1', id: 'cust-1' } });
    mocks.httpsCallable.mockReturnValue(callable);
    await customerService.deleteCustomer('cust-1');
    expect(mocks.httpsCallable).toHaveBeenCalledWith(mocks.functions, 'deleteTenantCustomer');
    expect(callable).toHaveBeenCalledWith(expect.objectContaining({ organizationId: 'org-1', id: 'cust-1', requestId: expect.any(String) }));
    expect(mocks.listTenantCustomers).not.toHaveBeenCalled();
  });

  it('rejects a malformed update response instead of returning a partial entity', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({ data: { success: true, organizationId: 'org-1', id: 'cust-1' } }));
    await expect(customerService.updateCustomer('cust-1', { name: 'X' }))
      .rejects.toBeInstanceOf(MalformedCallableResponseError);
  });

  it('rejects a malformed status-change response instead of returning a partial entity', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({ data: { success: true, organizationId: 'org-1', id: 'cust-1' } }));
    await expect(customerService.changeCustomerStatus('cust-1', 'Inactive'))
      .rejects.toBeInstanceOf(MalformedCallableResponseError);
  });

  it('propagates a failed mutation without touching any local/service state', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockRejectedValue(new Error('permission-denied')));
    await expect(customerService.changeCustomerStatus('cust-1', 'Inactive')).rejects.toThrow('permission-denied');
    expect(mocks.listTenantCustomers).not.toHaveBeenCalled();
  });

  it('applying the same mutation response twice does not duplicate the customer (idempotent upsert)', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', ...customerRow({ name: 'Renamed Customer' }) },
    }));
    const first = await customerService.updateCustomer('cust-1', { name: 'Renamed Customer' });
    const second = await customerService.updateCustomer('cust-1', { name: 'Renamed Customer' });
    expect(first).toEqual(second);
  });
});

describe('customerService.getAllCustomers', () => {
  it('fetches the full org-scoped set for pages to hold and derive views from', async () => {
    const customers = await customerService.getAllCustomers();
    expect(customers).toHaveLength(1);
    expect(customers[0].customerCode).toBe(105);
  });
});
