import { beforeEach, describe, expect, it } from 'vitest';
import { vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  dataConnect: {},
  functions: {},
  getCurrentUserAuthorization: vi.fn(),
  listTenantOutlets: vi.fn(),
  httpsCallable: vi.fn(),
}));

vi.mock('@omniretail/sql-connect', () => ({
  getCurrentUserAuthorization: mocks.getCurrentUserAuthorization,
  listTenantOutlets: mocks.listTenantOutlets,
}));
vi.mock('@/infrastructure/firebase/client', () => ({
  getFirebaseClientServices: () => ({ dataConnect: mocks.dataConnect, functions: mocks.functions }),
}));
vi.mock('firebase/functions', () => ({ httpsCallable: mocks.httpsCallable }));

import { outletService } from '@/features/outlets/services/outletService';
import { MalformedCallableResponseError } from '@/shared/utils/callableResponse';

const outletRow = (overrides: Record<string, unknown> = {}) => ({
  id: 'outlet-1', outletCode: 42, name: 'Main Street', contactPerson: 'Alex',
  email: 'alex@example.com', phone: '+919876543210', address: '1 Main St', status: 'ACTIVE',
  ...overrides,
});

beforeEach(() => {
  vi.clearAllMocks();
  mocks.getCurrentUserAuthorization.mockResolvedValue({
    data: { appUsers: [{ organizationMemberships_on_user: [{ status: 'ACTIVE', organization: { id: 'org-1' } }] }] },
  });
  mocks.listTenantOutlets.mockResolvedValue({ data: { outlets: [outletRow()] } });
});

describe('outletService mutations return the canonical entity directly', () => {
  it('createOutlet returns the enriched entity from the callable, with no follow-up list query', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', ...outletRow({ id: 'outlet-2', outletCode: 43, name: 'New Outlet' }) },
    }));
    const created = await outletService.createOutlet({ name: 'New Outlet', contactPerson: 'Alex', phone: '+919876543210', address: '1 Main St' });
    expect(created).toMatchObject({ id: 'outlet-2', outletCode: 43, name: 'New Outlet' });
    expect(mocks.listTenantOutlets).not.toHaveBeenCalled();
  });

  it('updateOutlet returns the enriched entity from the callable, with no follow-up list query', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', ...outletRow({ name: 'Renamed Outlet' }) },
    }));
    const updated = await outletService.updateOutlet('outlet-1', { name: 'Renamed Outlet' });
    expect(updated.name).toBe('Renamed Outlet');
    expect(mocks.listTenantOutlets).not.toHaveBeenCalled();
  });

  it('changeOutletStatus returns the enriched entity from the callable, with no follow-up list query', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', ...outletRow({ status: 'INACTIVE' }) },
    }));
    const updated = await outletService.changeOutletStatus('outlet-1', 'Inactive');
    expect(updated.status).toBe('Inactive');
    expect(mocks.listTenantOutlets).not.toHaveBeenCalled();
  });

  it('deleteOutlet calls the organization-scoped delete callable without a list reload', async () => {
    const callable = vi.fn().mockResolvedValue({ data: { success: true, organizationId: 'org-1', id: 'outlet-1' } });
    mocks.httpsCallable.mockReturnValue(callable);
    await outletService.deleteOutlet('outlet-1');
    expect(mocks.httpsCallable).toHaveBeenCalledWith(mocks.functions, 'deleteTenantOutlet');
    expect(callable).toHaveBeenCalledWith(expect.objectContaining({ organizationId: 'org-1', id: 'outlet-1', requestId: expect.any(String) }));
    expect(mocks.listTenantOutlets).not.toHaveBeenCalled();
  });

  it('rejects a malformed create response instead of returning a partial entity', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({ data: { success: true, organizationId: 'org-1', id: 'outlet-2' } }));
    await expect(outletService.createOutlet({ name: 'New Outlet', contactPerson: 'Alex', phone: '+919876543210', address: '1 Main St' }))
      .rejects.toBeInstanceOf(MalformedCallableResponseError);
  });

  it('propagates a failed mutation without touching any local/service state', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockRejectedValue(new Error('permission-denied')));
    await expect(outletService.updateOutlet('outlet-1', { name: 'X' })).rejects.toThrow('permission-denied');
    expect(mocks.listTenantOutlets).not.toHaveBeenCalled();
  });

  it('applying the same mutation response twice does not duplicate the outlet (idempotent upsert)', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', ...outletRow({ name: 'Renamed Outlet' }) },
    }));
    const first = await outletService.updateOutlet('outlet-1', { name: 'Renamed Outlet' });
    const second = await outletService.updateOutlet('outlet-1', { name: 'Renamed Outlet' });
    expect(first).toEqual(second);
  });
});

describe('outletService.getAllOutlets', () => {
  it('fetches the full org-scoped set for pages to hold and derive views from', async () => {
    const outlets = await outletService.getAllOutlets();
    expect(outlets).toHaveLength(1);
    expect(outlets[0].outletCode).toBe(42);
  });
});
