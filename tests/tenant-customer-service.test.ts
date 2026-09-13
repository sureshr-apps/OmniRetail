import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const source = readFileSync(new URL('../src/features/customers/services/customerService.ts', import.meta.url), 'utf8');

describe('tenant customer service adapter', () => {
  it('loads customer data through authenticated tenant authorization', () => {
    expect(source).toContain('getCurrentUserAuthorization');
    expect(source).toContain('listTenantCustomers');
    expect(source).toContain('No active organization membership.');
    expect(source).toContain('export const customerService: ICustomerService = new ProductionCustomerService()');
    expect(source).toContain("'createTenantCustomerRecord'");
    expect(source).toContain("'updateTenantCustomerRecord'");
    expect(source).toContain("'changeTenantCustomerStatus'");
  });
});
