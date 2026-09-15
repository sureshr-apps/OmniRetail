import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  dataConnect: {},
  functions: {},
  createLicensePlan: vi.fn(), updateLicensePlan: vi.fn(), getLicensePlan: vi.fn(),
  createOrganization: vi.fn(), updateOrganization: vi.fn(), getOrganization: vi.fn(),
  updateOrganizationAdministrator: vi.fn(), listOrganizationAdministrators: vi.fn(), getOrganizationAdministrator: vi.fn(),
  changeOrganizationAdministratorStatus: vi.fn(),
  httpsCallable: vi.fn(),
}));

vi.mock('@omniretail/sql-connect', () => ({
  createLicensePlan: mocks.createLicensePlan, updateLicensePlan: mocks.updateLicensePlan, getLicensePlan: mocks.getLicensePlan,
  createOrganization: mocks.createOrganization, updateOrganization: mocks.updateOrganization, getOrganization: mocks.getOrganization,
  updateOrganizationAdministrator: mocks.updateOrganizationAdministrator, listOrganizationAdministrators: mocks.listOrganizationAdministrators,
  getOrganizationAdministrator: mocks.getOrganizationAdministrator,
  LicensePlanStatus: { ACTIVE: 'ACTIVE', INACTIVE: 'INACTIVE' },
}));
vi.mock('@/infrastructure/firebase/client', () => ({
  getFirebaseClientServices: () => ({ dataConnect: mocks.dataConnect, functions: mocks.functions }),
}));
vi.mock('firebase/functions', () => ({ httpsCallable: mocks.httpsCallable }));

import { licensePlanService } from '@/features/plans/services/LicensePlanService';
import { organizationService } from '@/features/organizations/services/OrganizationService';
import { organizationLicenseService } from '@/features/licenses/services/OrganizationLicenseService';
import { organizationAdminService } from '@/features/organizations/services/OrganizationAdminService';

const planRow = (overrides: Record<string, unknown> = {}) => ({ id: 'plan-1', planCode: 'PLN-1', name: 'Starter', description: 'desc', level: 1, maxStores: 1, maxUsers: 5, status: 'ACTIVE', createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-02T00:00:00Z', ...overrides });
const orgRow = (overrides: Record<string, unknown> = {}) => ({ id: 'org-1', organizationCode: 'ORG-1', businessName: 'Acme', legalEntityName: null, taxId: null, primaryContactName: 'Owner', email: 'owner@example.com', phone: '+919876543210', address: null, city: null, state: null, postalCode: null, timezone: 'Asia/Kolkata (IST)', currency: 'INR (₹)', status: 'ACTIVE', createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-02T00:00:00Z', ...overrides });

beforeEach(() => {
  vi.clearAllMocks();
  mocks.createLicensePlan.mockResolvedValue({ data: { licensePlan_insert: { id: 'plan-1' } } });
  mocks.updateLicensePlan.mockResolvedValue({ data: {} });
  mocks.getLicensePlan.mockResolvedValue({ data: { licensePlan: planRow() } });
  mocks.createOrganization.mockResolvedValue({ data: {} });
  mocks.updateOrganization.mockResolvedValue({ data: {} });
  mocks.getOrganization.mockResolvedValue({ data: { organization: orgRow() } });
  mocks.updateOrganizationAdministrator.mockResolvedValue({ data: {} });
  const adminMembershipRow = { createdAt: '2026-01-01T00:00:00Z', status: 'ACTIVE', user: { id: 'admin-1', username: 'owner', email: 'owner@example.com', displayName: 'Updated Owner', phone: '+919876543210', status: 'ACTIVE' } };
  mocks.listOrganizationAdministrators.mockResolvedValue({ data: { organizationMemberships: [adminMembershipRow] } });
  mocks.getOrganizationAdministrator.mockResolvedValue({ data: { organizationMemberships: [adminMembershipRow] } });
  mocks.httpsCallable.mockImplementation((_functions: unknown, name: string) => {
    if (name === 'listOrganizationsDirectory') return vi.fn().mockResolvedValue({ data: { organizations: [orgRow()] } });
    if (name === 'assignOrganizationLicense') return vi.fn().mockResolvedValue({ data: { licenseId: 'lic-1', organizationId: 'org-1', planId: 'plan-1', startDate: '2026-01-01', expiryDate: '2026-12-31', negotiatedPrice: 10, currency: 'INR' } });
    if (name === 'provisionOrganizationAdministrator') return vi.fn().mockResolvedValue({ data: { appUserId: 'admin-1', organizationMembershipId: 'membership-1', organizationId: 'org-1', username: 'owner', displayName: 'Owner', email: 'owner@example.com', phone: '+919876543210', status: 'active' } });
    if (name === 'changeOrganizationAdministratorStatus') return mocks.changeOrganizationAdministratorStatus;
    throw new Error(`unexpected callable ${name}`);
  });
});

describe('mutation refresh regressions', () => {
  it('reloads the persisted Plan after edit instead of trusting stale modal state', async () => {
    const updated = await licensePlanService.updatePlan('plan-1', { name: 'Updated', description: 'new', level: 1, maxStores: 2, maxUsers: 8 });
    expect(mocks.updateLicensePlan).toHaveBeenCalledOnce();
    expect(mocks.getLicensePlan).toHaveBeenCalledWith(mocks.dataConnect, { id: 'plan-1' });
    expect(updated.name).toBe('Updated');
    expect(updated.maxUsers).toBe(8);
  });

  it('reloads the persisted Plan after add before returning it to the list', async () => {
    const created = await licensePlanService.createPlan({ name: 'Starter', description: 'desc', level: 1, maxStores: 1, maxUsers: 5 });
    expect(mocks.createLicensePlan).toHaveBeenCalledOnce();
    expect(mocks.getLicensePlan).toHaveBeenCalledWith(mocks.dataConnect, { id: 'plan-1' });
    expect(created.id).toBe('plan-1');
  });

  it('creates and edits organizations via a single targeted read-back, not a full directory reload', async () => {
    const created = await organizationService.createOrganization({ name: 'Acme', primaryContactName: 'Owner', email: 'OWNER@example.com', phone: '+919876543210' });
    expect(mocks.createOrganization).toHaveBeenCalledOnce();
    const createArgs = mocks.createOrganization.mock.calls[0][1] as { id: unknown };
    expect(typeof createArgs.id).toBe('string');
    expect(mocks.getOrganization).toHaveBeenCalledWith(mocks.dataConnect, { id: createArgs.id });
    expect(mocks.httpsCallable).not.toHaveBeenCalledWith(mocks.functions, 'listOrganizationsDirectory');
    expect(created.organizationCode).toBe('ORG-1');
    await organizationService.updateOrganization('org-1', { name: 'Updated Acme', primaryContactName: 'New Owner', email: 'new@example.com', phone: '+919876543210' });
    expect(mocks.getOrganization).toHaveBeenCalledWith(mocks.dataConnect, { id: 'org-1' });
  });

  it('returns the persisted license assignment result for immediate UI refresh', async () => {
    const license = await organizationLicenseService.assignLicense('org-1', { planId: 'plan-1', startDate: '2026-01-01', expiryDate: '2026-12-31', negotiatedPrice: 10, currency: 'INR' });
    expect(license).toMatchObject({ id: 'lic-1', organizationId: 'org-1', planId: 'plan-1' });
    expect(JSON.stringify(license)).not.toContain('mock');
  });

  it('updates administrators via a single targeted read-back, not a full list reload', async () => {
    const updated = await organizationAdminService.updateAdministrator('org-1', 'admin-1', { name: 'Updated Owner', email: 'owner@example.com', phone: '+919876543210' });
    expect(mocks.getOrganizationAdministrator).toHaveBeenCalledWith(mocks.dataConnect, { organizationId: 'org-1', userId: 'admin-1' });
    expect(mocks.listOrganizationAdministrators).not.toHaveBeenCalled();
    expect(updated.id).toBe('admin-1');
    expect(updated.name).toBe('Updated Owner');
    expect(updated.createdAt).toBe('2026-01-01');
  });

  it('returns the production administrator created by the callable for immediate list refresh', async () => {
    const created = await organizationAdminService.createAdministrator('org-1', { name: 'Owner', username: 'owner', email: 'owner@example.com', phone: '+919876543210' });
    expect(created.id).toBe('admin-1');
    expect(created.organizationId).toBe('org-1');
    expect(created.name).toBe('Owner');
  });

  it('returns the enriched administrator from changeAdministratorStatus with no follow-up query', async () => {
    mocks.changeOrganizationAdministratorStatus.mockResolvedValue({ data: { success: true, id: 'admin-1', organizationId: 'org-1', name: 'Owner', username: 'owner', email: 'owner@example.com', phone: '+919876543210', status: 'inactive', createdAt: '2026-01-01T00:00:00Z' } });
    const updated = await organizationAdminService.changeAdministratorStatus('org-1', 'admin-1', 'inactive');
    expect(updated).toMatchObject({ id: 'admin-1', organizationId: 'org-1', status: 'inactive' });
    expect(mocks.listOrganizationAdministrators).not.toHaveBeenCalled();
    expect(mocks.getOrganizationAdministrator).not.toHaveBeenCalled();
  });

  it('rejects a malformed changeAdministratorStatus response instead of returning a partial entity', async () => {
    mocks.changeOrganizationAdministratorStatus.mockResolvedValue({ data: { success: true, id: 'admin-1' } });
    await expect(organizationAdminService.changeAdministratorStatus('org-1', 'admin-1', 'inactive')).rejects.toThrow();
  });
});
