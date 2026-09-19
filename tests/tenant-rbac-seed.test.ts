import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const seed = readFileSync(new URL('../dataconnect/bootstrap_rbac.gql', import.meta.url), 'utf8');
const rolePermissionSeed = readFileSync(new URL('../dataconnect/bootstrap_rbac_permissions.gql', import.meta.url), 'utf8');
const completeSeed = `${seed}\n${rolePermissionSeed}`;
const administratorSeed = readFileSync(new URL('../dataconnect/seed_organization_administrators.gql', import.meta.url), 'utf8');

describe('tenant RBAC seed', () => {
  it('defines the operational capability catalogue', () => {
    for (const code of ['billing.read', 'sales.read', 'inventory.read', 'products.read', 'purchases.read', 'suppliers.read', 'customers.read', 'expenses.read', 'cash.read']) {
      expect(seed).toContain(`code: "${code}"`);
    }
  });

  it('grants Organization Admin tenant administration capabilities', () => {
    for (const code of ['outlets.read', 'employees.read', 'service_persons.read']) {
      expect(seed).toContain(`code: "${code}"`);
    }
    expect(completeSeed).toContain('roleId: "00000000-0000-4000-8000-000000000002"');
  });

  it('defines the organization employee role with operational access only', () => {
    expect(seed).toContain('code: "organization.employee"');
    expect(rolePermissionSeed).toContain('rpEmployeeBillingRead');
    expect(rolePermissionSeed).toContain('rpEmployeeExpensesRead');
    expect(rolePermissionSeed).toContain('rpEmployeeCashRead');
  });

  it('seeds organization administrators with the organization-admin role', () => {
    expect(administratorSeed).toContain('member1: organizationMembership_upsert');
    expect(administratorSeed).toContain('member2: organizationMembership_upsert');
    expect(administratorSeed).not.toContain('roleId: "00000000-0000-4000-8000-000000000001"');
    expect(administratorSeed.match(/roleId: "00000000-0000-4000-8000-000000000002"/g)).toHaveLength(2);
  });
});
