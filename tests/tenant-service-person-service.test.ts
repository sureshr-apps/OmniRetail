import { beforeEach, describe, expect, it } from 'vitest';
import { vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  dataConnect: {},
  functions: {},
  getCurrentUserAuthorization: vi.fn(),
  listTenantServicePersons: vi.fn(),
  httpsCallable: vi.fn(),
}));

vi.mock('@omniretail/sql-connect', () => ({
  getCurrentUserAuthorization: mocks.getCurrentUserAuthorization,
  listTenantServicePersons: mocks.listTenantServicePersons,
}));
vi.mock('@/infrastructure/firebase/client', () => ({
  getFirebaseClientServices: () => ({ dataConnect: mocks.dataConnect, functions: mocks.functions }),
}));
vi.mock('firebase/functions', () => ({ httpsCallable: mocks.httpsCallable }));

import { servicePersonService } from '@/features/service-persons/services/servicePersonService';
import { MalformedCallableResponseError } from '@/shared/utils/callableResponse';

const servicePersonRow = (overrides: Record<string, unknown> = {}) => ({
  id: 'sp-1',
  organization: { id: 'org-1' },
  servicePersonCode: 101,
  fullName: 'Marcus Vance',
  email: 'm.vance@omnitrade.internal',
  phone: '+919876543210',
  specialization: 'HVAC & Appliance Repair',
  skills: 'EPA Universal Certified, Commercial Chiller Diagnostics',
  yearsOfExperience: 6,
  assignmentScope: 'ORGANIZATION',
  status: 'ACTIVE',
  createdAt: '2023-10-15T08:00:00Z',
  updatedAt: '2024-09-12T10:15:00Z',
  servicePersonOutlets_on_servicePerson: [],
  ...overrides,
});

beforeEach(() => {
  vi.clearAllMocks();
  mocks.getCurrentUserAuthorization.mockResolvedValue({
    data: { appUsers: [{ organizationMemberships_on_user: [{ status: 'ACTIVE', organization: { id: 'org-1' } }] }] },
  });
  mocks.listTenantServicePersons.mockResolvedValue({ data: { servicePeople: [servicePersonRow()] } });
});

describe('servicePersonService mutations return the canonical entity directly', () => {
  it('createServicePerson returns the enriched entity from the callable, with no follow-up list query', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', ...servicePersonRow({ id: 'sp-2', servicePersonCode: 102, fullName: 'Elena Rostova' }) },
    }));
    const created = await servicePersonService.createServicePerson({
      firstName: 'Elena', lastName: 'Rostova', phone: '+919876543210', specialization: 'HVAC & Appliance Repair', assignmentScope: 'Entire Organization',
    });
    expect(created).toMatchObject({ id: 'sp-2', servicePersonCode: 102, displayName: 'Elena Rostova' });
    expect(mocks.listTenantServicePersons).not.toHaveBeenCalled();
  });

  it('updateServicePerson returns the enriched entity from the callable, with no follow-up list query', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', ...servicePersonRow({ fullName: 'Marcus Renamed' }) },
    }));
    const updated = await servicePersonService.updateServicePerson('sp-1', { firstName: 'Marcus', lastName: 'Renamed' });
    expect(updated.displayName).toBe('Marcus Renamed');
    expect(mocks.listTenantServicePersons).not.toHaveBeenCalled();
  });

  it('changeServicePersonStatus returns the enriched entity from the callable, with no follow-up list query', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', ...servicePersonRow({ status: 'INACTIVE' }) },
    }));
    const updated = await servicePersonService.changeServicePersonStatus('sp-1', 'Inactive');
    expect(updated.status).toBe('Inactive');
    expect(mocks.listTenantServicePersons).not.toHaveBeenCalled();
  });

  it('rejects a malformed create response instead of returning a partial entity', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({ data: { success: true, organizationId: 'org-1', id: 'sp-2' } }));
    await expect(servicePersonService.createServicePerson({
      firstName: 'Elena', lastName: 'Rostova', phone: '+919876543210', specialization: 'HVAC & Appliance Repair', assignmentScope: 'Entire Organization',
    })).rejects.toBeInstanceOf(MalformedCallableResponseError);
  });

  it('propagates a failed mutation without touching any local/service state', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockRejectedValue(new Error('permission-denied')));
    await expect(servicePersonService.updateServicePerson('sp-1', { firstName: 'X' })).rejects.toThrow('permission-denied');
    expect(mocks.listTenantServicePersons).not.toHaveBeenCalled();
  });

  it('applying the same mutation response twice does not duplicate the service person (idempotent upsert)', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', ...servicePersonRow({ fullName: 'Marcus Renamed' }) },
    }));
    const first = await servicePersonService.updateServicePerson('sp-1', { firstName: 'Marcus', lastName: 'Renamed' });
    const second = await servicePersonService.updateServicePerson('sp-1', { firstName: 'Marcus', lastName: 'Renamed' });
    expect(first).toEqual(second);
  });
});

describe('servicePersonService.getAllServicePersons', () => {
  it('fetches the full org-scoped set for pages to hold and derive views from', async () => {
    const servicePersons = await servicePersonService.getAllServicePersons();
    expect(servicePersons).toHaveLength(1);
    expect(servicePersons[0].servicePersonCode).toBe(101);
  });
});
