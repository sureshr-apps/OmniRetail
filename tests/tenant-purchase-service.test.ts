import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
const source = readFileSync(new URL('../src/features/purchases/services/purchaseService.ts', import.meta.url), 'utf8');
const modal = readFileSync(new URL('../src/features/purchases/components/CreatePurchaseModal.tsx', import.meta.url), 'utf8');
const functions = readFileSync(new URL('../functions/src/index.ts', import.meta.url), 'utf8');
const inventoryBatches = readFileSync(new URL('../functions/src/inventoryBatches.ts', import.meta.url), 'utf8');

describe('tenant purchase service adapter', () => {
  it('uses tenant reads and production lifecycle actions', () => {
    expect(source).toContain('listTenantPurchases');
    expect(source).toContain("'changeTenantPurchaseStatus'");
    expect(source).toContain("'receiveTenantPurchaseLineRecord'");
    expect(source).toContain('new ProductionPurchaseService()');
  });

  it('sends the selected purchase status and payment status to the callable', () => {
    expect(source).toContain('paymentStatus: input.paymentOption');
    expect(source).toContain('status: input.status.toUpperCase()');
    expect(source).toContain('input.outletId ? candidate.id === input.outletId');
  });

  it('initializes production supplier and outlet choices instead of fixture ids', () => {
    expect(modal).toContain('suppliers[0]?.id ?? \'\'');
    expect(modal).toContain('outlets[0]?.id ?? \'\'');
    expect(modal).not.toContain('sup-101');
    expect(modal).not.toContain('Downtown Flagship #04');
  });

  it('selects purchase products from the loaded production catalogue', () => {
    expect(modal).toContain('value={line.productId}');
    expect(modal).toContain('onChange={(e) => handleSelectProduct(idx, e.target.value)}');
    expect(modal).toContain('{product.name} · {product.sku}');
    expect(modal).not.toContain('handleSelectPredefinedProduct');
    expect(modal).not.toContain('value={line.productName}');
  });

  it('persists draft and active purchase statuses and rejects empty purchases', () => {
    expect(functions).toContain("const status = d.status === 'DRAFT' || d.status === 'ACTIVE' ? d.status : ''");
    expect(functions).toContain('status, createdBy');
    expect(functions).toContain('lines.length === 0');
    expect(modal).toContain('Add at least one product line before saving the purchase.');
  });

  it('uses the trusted outlet lookup inside Cloud Functions instead of a user-authenticated outlet query', () => {
    expect(functions).toContain('getTenantOutletTrusted({ organizationId, id: outletId })');
    expect(functions).not.toContain('listTenantOutlets({ organizationId })');
  });

  it('lets the receipt boundary derive product and outlet from the persisted purchase line', () => {
    expect(functions).toContain("const result = await withSqlTransaction((client) => receiveInventoryForPurchase(client, { organizationId, purchaseId, lineId, quantityReceived");
    expect(functions).not.toContain("!organizationId || !purchaseId || !lineId || !outletId || !productId");
    expect(source).not.toContain('outletId: purchase.outletId, productId: line.productId');
    expect(inventoryBatches).toContain('WHERE pl.id = $1 AND pl.purchase_id = $2 AND p.organization_id = $3 FOR UPDATE');
    expect(inventoryBatches).toContain('const productId = String(line.product_id)');
    expect(inventoryBatches).toContain('const outletId = line.outlet_id ? String(line.outlet_id) : \'\'');
    expect(inventoryBatches).not.toContain('p.outlet_id = $4 FOR UPDATE');
  });
});
