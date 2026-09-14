import { beforeEach, describe, expect, it } from 'vitest';
import { vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  dataConnect: {},
  functions: {},
  getCurrentUserAuthorization: vi.fn(),
  listTenantSuppliers: vi.fn(),
  httpsCallable: vi.fn(),
}));

vi.mock('@omniretail/sql-connect', () => ({
  getCurrentUserAuthorization: mocks.getCurrentUserAuthorization,
  listTenantSuppliers: mocks.listTenantSuppliers,
}));
vi.mock('@/infrastructure/firebase/client', () => ({
  getFirebaseClientServices: () => ({ dataConnect: mocks.dataConnect, functions: mocks.functions }),
}));
vi.mock('firebase/functions', () => ({ httpsCallable: mocks.httpsCallable }));

import { supplierService } from '@/features/suppliers/services/supplierService';
import { MalformedCallableResponseError } from '@/shared/utils/callableResponse';

const supplierRow = (overrides: Record<string, unknown> = {}) => ({
  id: 'supplier-1',
  supplierCode: 101,
  name: 'Apex Global Electronics',
  contactPerson: 'Marcus Vance',
  phone: '+15553829100',
  email: 'marcus@apexge.com',
  taxId: 'US-8829104',
  address: '1 Apex Way',
  city: 'New York',
  state: 'NY',
  postalCode: '10001',
  country: 'United States',
  category: 'Consumer Electronics',
  paymentTerms: 'Net 30 Days',
  creditLimit: 50000,
  status: 'ACTIVE',
  notes: null,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  ...overrides,
});

const createInput = {
  name: 'Apex Global Electronics',
  contactPerson: 'Marcus Vance',
  phone: '+15553829100',
  email: 'marcus@apexge.com',
  taxId: 'US-8829104',
  category: 'Consumer Electronics' as const,
  paymentTerms: 'Net 30 Days' as const,
  creditLimit: 50000,
  city: 'New York',
};

beforeEach(() => {
  vi.clearAllMocks();
  mocks.getCurrentUserAuthorization.mockResolvedValue({
    data: { appUsers: [{ organizationMemberships_on_user: [{ status: 'ACTIVE', organization: { id: 'org-1' } }] }] },
  });
  mocks.listTenantSuppliers.mockResolvedValue({ data: { suppliers: [supplierRow()] } });
});

describe('supplierService mutations return the canonical entity directly', () => {
  it('createSupplier returns the enriched entity from the callable, with no follow-up list query', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', ...supplierRow({ id: 'supplier-2', supplierCode: 102, name: 'New Supplier' }) },
    }));
    const created = await supplierService.createSupplier(createInput);
    expect(created).toMatchObject({ id: 'supplier-2', supplierCode: 102, name: 'New Supplier' });
    expect(mocks.listTenantSuppliers).not.toHaveBeenCalled();
  });

  it('updateSupplier returns the enriched entity from the callable, with no follow-up list query after the mutation', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', ...supplierRow({ name: 'Renamed Supplier' }) },
    }));
    const updated = await supplierService.updateSupplier('supplier-1', { name: 'Renamed Supplier' });
    expect(updated.name).toBe('Renamed Supplier');
    // One call to resolve the current record before building the mutation payload — no call afterward.
    expect(mocks.listTenantSuppliers).toHaveBeenCalledTimes(1);
  });

  it('toggleSupplierStatus returns the enriched entity from the callable, with no follow-up list query after the mutation', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', ...supplierRow({ status: 'INACTIVE' }) },
    }));
    const updated = await supplierService.toggleSupplierStatus('supplier-1');
    expect(updated.status).toBe('Inactive');
    expect(mocks.listTenantSuppliers).toHaveBeenCalledTimes(1);
  });

  it('deleteSupplier calls the organization-scoped delete callable without reloading the list', async () => {
    const callable = vi.fn().mockResolvedValue({ data: { success: true, organizationId: 'org-1', id: 'supplier-1' } });
    mocks.httpsCallable.mockReturnValue(callable);
    await supplierService.deleteSupplier('supplier-1');
    expect(mocks.httpsCallable).toHaveBeenCalledWith(mocks.functions, 'deleteTenantSupplier');
    expect(callable).toHaveBeenCalledWith(expect.objectContaining({ organizationId: 'org-1', id: 'supplier-1', requestId: expect.any(String) }));
    expect(mocks.listTenantSuppliers).not.toHaveBeenCalled();
  });

  it('rejects a malformed create response instead of returning a partial entity', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({ data: { success: true, organizationId: 'org-1', id: 'supplier-2' } }));
    await expect(supplierService.createSupplier(createInput))
      .rejects.toBeInstanceOf(MalformedCallableResponseError);
  });

  it('rejects a malformed update response instead of returning a partial entity', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({ data: { success: true, organizationId: 'org-1', id: 'supplier-1' } }));
    await expect(supplierService.updateSupplier('supplier-1', { name: 'X' }))
      .rejects.toBeInstanceOf(MalformedCallableResponseError);
  });

  it('propagates a failed mutation without any follow-up list query', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockRejectedValue(new Error('permission-denied')));
    await expect(supplierService.updateSupplier('supplier-1', { name: 'X' })).rejects.toThrow('permission-denied');
    // Only the pre-mutation lookup used to build the payload — none after the failed call.
    expect(mocks.listTenantSuppliers).toHaveBeenCalledTimes(1);
  });

  it('applying the same mutation response twice does not duplicate the supplier (idempotent upsert)', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', ...supplierRow({ name: 'Renamed Supplier' }) },
    }));
    const first = await supplierService.updateSupplier('supplier-1', { name: 'Renamed Supplier' });
    const second = await supplierService.updateSupplier('supplier-1', { name: 'Renamed Supplier' });
    expect(first).toEqual(second);
  });
});

describe('supplierService.getAllSuppliers', () => {
  it('fetches the full org-scoped set for pages to hold and derive views from', async () => {
    const suppliers = await supplierService.getAllSuppliers();
    expect(suppliers).toHaveLength(1);
    expect(suppliers[0].supplierCode).toBe(101);
  });
});
