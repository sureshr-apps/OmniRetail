import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  dataConnect: {},
  functions: {},
  getOrganizationLicensePublic: vi.fn(),
  getOrganizationLicenseHistoryPublic: vi.fn(),
  httpsCallable: vi.fn(),
}));

vi.mock('@omniretail/sql-connect', () => ({
  getOrganizationLicensePublic: mocks.getOrganizationLicensePublic,
  getOrganizationLicenseHistoryPublic: mocks.getOrganizationLicenseHistoryPublic,
}));
vi.mock('@/infrastructure/firebase/client', () => ({
  getFirebaseClientServices: () => ({ dataConnect: mocks.dataConnect, functions: mocks.functions }),
}));
vi.mock('firebase/functions', () => ({ httpsCallable: mocks.httpsCallable }));

import { organizationLicenseService } from '@/features/licenses/services/OrganizationLicenseService';

const licenseResponse = (overrides: Record<string, unknown> = {}) => ({
  licenseId: 'lic-1', organizationId: 'org-1', planId: 'plan-2',
  startDate: '2026-01-01', expiryDate: '2026-12-31', negotiatedPrice: 20, currency: 'INR',
  ...overrides,
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe('organizationLicenseService change/modify/renew return the callable result directly', () => {
  it('changePlan returns the enriched license with no follow-up query', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({ data: licenseResponse() }));
    const result = await organizationLicenseService.changePlan('org-1', { newPlanId: 'plan-2', newNegotiatedPrice: 20, currency: 'INR' });
    expect(result).toMatchObject({ id: 'lic-1', organizationId: 'org-1', planId: 'plan-2' });
    expect(mocks.getOrganizationLicensePublic).not.toHaveBeenCalled();
  });

  it('modifyCommercialTerms returns the enriched license with no follow-up query', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({ data: licenseResponse({ negotiatedPrice: 30 }) }));
    const result = await organizationLicenseService.modifyCommercialTerms('org-1', { negotiatedPrice: 30, currency: 'INR' });
    expect(result.negotiatedPrice).toBe(30);
    expect(mocks.getOrganizationLicensePublic).not.toHaveBeenCalled();
  });

  it('renewLicense returns the enriched license with no follow-up query', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({ data: licenseResponse({ expiryDate: '2027-12-31' }) }));
    const result = await organizationLicenseService.renewLicense('org-1', { planId: 'plan-2', newStartDate: '2027-01-01', newExpiryDate: '2027-12-31', negotiatedPrice: 20, currency: 'INR' });
    expect(result.expiryDate).toBe('2027-12-31');
    expect(mocks.getOrganizationLicensePublic).not.toHaveBeenCalled();
  });

  it('rejects a malformed response instead of returning a partial license', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({ data: { licenseId: 'lic-1' } }));
    await expect(organizationLicenseService.changePlan('org-1', { newPlanId: 'plan-2', newNegotiatedPrice: 20, currency: 'INR' })).rejects.toThrow();
  });
});
