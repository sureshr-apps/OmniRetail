import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const source = readFileSync(new URL('../src/features/suppliers/services/supplierService.ts', import.meta.url), 'utf8');

describe('tenant supplier service adapter', () => {
  it('uses authenticated tenant-scoped supplier reads', () => {
    expect(source).toContain('getCachedCurrentUserAuthorization');
    expect(source).toContain('listTenantSuppliers');
    expect(source).toContain('No active organization membership.');
    expect(source).toContain('export const supplierService: ISupplierService = new ProductionSupplierService()');
    expect(source).toContain("'createTenantSupplierRecord'");
    expect(source).toContain("'updateTenantSupplierRecord'");
    expect(source).toContain("'changeTenantSupplierStatus'");
  });

  it('loads and maps recent supplier purchase orders', () => {
    expect(source).toContain("const operationalPurchases = purchases.filter((purchase) => purchase.status !== 'CANCELLED')");
    expect(source).toContain('outstandingBalance: operationalPurchases.reduce');
    expect(source).toContain('totalOrdersCount: operationalPurchases.length');
    expect(source).toContain('recentOrders: operationalPurchases.slice(0, 5).map');
    expect(source).toContain('poNumber: purchase.purchaseOrderNumber ?? purchase.purchaseNumber');
    expect(source).toContain("outletName: purchase.outlet?.name ?? 'Organization-wide'");

    const query = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
    expect(query).toContain('id purchaseNumber purchaseOrderNumber purchaseDate outlet { name }');
  });
});
