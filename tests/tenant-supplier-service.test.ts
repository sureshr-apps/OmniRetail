import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const source = readFileSync(new URL('../src/features/suppliers/services/supplierService.ts', import.meta.url), 'utf8');

describe('tenant supplier service adapter', () => {
  it('uses authenticated tenant-scoped supplier reads', () => {
    expect(source).toContain('getCurrentUserAuthorization');
    expect(source).toContain('listTenantSuppliers');
    expect(source).toContain('No active organization membership.');
    expect(source).toContain('export const supplierService: ISupplierService = new ProductionSupplierService()');
    expect(source).toContain("'createTenantSupplierRecord'");
    expect(source).toContain("'updateTenantSupplierRecord'");
    expect(source).toContain("'changeTenantSupplierStatus'");
  });
});
