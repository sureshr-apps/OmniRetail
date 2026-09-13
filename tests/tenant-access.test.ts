import { describe, expect, it } from 'vitest';
import { canAccessTenantAdministration, canAccessTenantOperationalModule, getDefaultRoute, isMasterAdmin, isOrganizationAdmin } from '@/app/auth/tenantAccess';
import type { User } from '@/features/auth/services/AuthService';

const user = (roleCode: string, capabilities: string[] = []): User => ({
  id: 'app-user-1', firebaseUid: 'firebase-1', name: 'Test User', displayName: 'Test User',
  email: 'test@example.com', username: 'test', phone: null,
  roles: [{ code: roleCode, name: roleCode, scope: roleCode === 'master.admin' ? 'PLATFORM' : 'ORGANIZATION' }],
  capabilities, organizationIds: roleCode === 'organization.admin' ? ['org-1'] : [],
});

describe('tenant access policy', () => {
  it('distinguishes organization and master administrators', () => {
    expect(isOrganizationAdmin(user('organization.admin'))).toBe(true);
    expect(isMasterAdmin(user('master.admin'))).toBe(true);
    expect(isOrganizationAdmin(user('master.admin'))).toBe(false);
  });

  it('allows organization admins into tenant administration', () => {
    expect(canAccessTenantAdministration(user('organization.admin'))).toBe(true);
  });

  it('starts organization admins in the tenant workspace and master admins in the platform workspace', () => {
    expect(getDefaultRoute(user('organization.admin'))).toBe('/billing');
    expect(getDefaultRoute(user('master.admin'))).toBe('/overview');
    expect(getDefaultRoute(user('employee', ['sales.read']))).toBe('/sales');
  });

  it('does not grant master admins tenant administration access', () => {
    expect(canAccessTenantAdministration(user('master.admin', ['overview.read', 'organizations.read', 'plans.read']))).toBe(false);
  });

  it('allows operational employees only through enabled capabilities', () => {
    expect(canAccessTenantOperationalModule(user('employee', ['billing.read']), 'billing.read')).toBe(true);
    expect(canAccessTenantOperationalModule(user('employee'), 'billing.read')).toBe(false);
    expect(canAccessTenantOperationalModule(user('employee', ['employees.read']), 'employees.read')).toBe(false);
  });
});
