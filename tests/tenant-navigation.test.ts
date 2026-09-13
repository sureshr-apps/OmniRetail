import { describe, expect, it } from 'vitest';
import { getTenantNavigation } from '@/app/navigation/tenantNavigation';

const user = (roleCode: string, capabilities: string[] = []) => ({
  id: 'user-1', firebaseUid: 'firebase-1', name: 'Test', displayName: 'Test', email: 'test@example.com', username: 'test', phone: null,
  roles: [{ code: roleCode, name: roleCode, scope: 'ORGANIZATION' }], capabilities, organizationIds: roleCode === 'organization.admin' ? ['org-1'] : [],
});

describe('tenant navigation', () => {
  it('shows all tenant modules to organization admins except deferred Settings and Reports', () => {
    const labels = getTenantNavigation(user('organization.admin')).map((item) => item.label);
    expect(labels).toHaveLength(11);
    expect(labels).toContain('Billing / POS');
    expect(labels).toContain('Employee Master');
    expect(labels).not.toContain('Settings');
    expect(labels).not.toContain('Reports');
  });

  it('shows employees only enabled operational modules', () => {
    const labels = getTenantNavigation(user('employee', ['billing.read', 'inventory.read'])).map((item) => item.label);
    expect(labels).toEqual(['Billing / POS', 'Inventory']);
  });
});
