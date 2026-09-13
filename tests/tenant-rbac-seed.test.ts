import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const seed = readFileSync(new URL('../dataconnect/bootstrap_rbac.gql', import.meta.url), 'utf8');

describe('tenant RBAC seed', () => {
  it('defines the operational capability catalogue', () => {
    for (const code of ['billing.read', 'sales.read', 'inventory.read', 'products.read', 'purchases.read', 'suppliers.read', 'customers.read', 'expenses.read']) {
      expect(seed).toContain(`code: "${code}"`);
    }
  });

  it('grants Organization Admin tenant administration capabilities', () => {
    for (const code of ['outlets.read', 'employees.read', 'service_persons.read']) {
      expect(seed).toContain(`code: "${code}"`);
    }
    expect(seed).toContain('roleId: "00000000-0000-4000-8000-000000000002"');
  });

  it('defines the organization employee role with operational access only', () => {
    expect(seed).toContain('code: "organization.employee"');
    expect(seed).toContain('rpEmployeeBillingRead');
    expect(seed).toContain('rpEmployeeExpensesRead');
  });
});
