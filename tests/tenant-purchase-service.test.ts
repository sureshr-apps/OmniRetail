import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { calculatePurchaseTotals } from '@/features/purchases/utils/calculations';
const source = readFileSync(new URL('../src/features/purchases/services/purchaseService.ts', import.meta.url), 'utf8');
const modal = readFileSync(new URL('../src/features/purchases/components/CreatePurchaseModal.tsx', import.meta.url), 'utf8');
const detailDrawer = readFileSync(new URL('../src/features/purchases/components/PurchaseDetailDrawer.tsx', import.meta.url), 'utf8');
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
    expect(source).toContain('input.handlingFee, input.initialPaymentRecorded');
  });

  it('calculates balance due after applying the initial payment', () => {
    const totals = calculatePurchaseTotals([
      { quantity: 10, unitCost: 10, discountPercent: 0, taxRate: 5 },
      { quantity: 10, unitCost: 10, discountPercent: 0, taxRate: 5 },
      { quantity: 10, unitCost: 5, discountPercent: 0, taxRate: 5 },
    ], 120, 0, 100);

    expect(totals.grandTotal).toBe(382.5);
    expect(totals.outstandingAmount).toBe(282.5);
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

  it('does not render the unsupported vendor attachment upload section', () => {
    expect(modal).not.toContain('Vendor Invoice / Challan Attachment');
    expect(modal).not.toContain('Drag &amp; drop vendor receipt');
  });

  it('does not render unsupported purchase attachments or voucher printing', () => {
    expect(detailDrawer).not.toContain('Attachments &amp; Vendor Documents');
    expect(detailDrawer).not.toContain('Downloading vendor challan attachment');
    expect(detailDrawer).not.toContain('Opening PDF document viewer in secure preview');
    expect(detailDrawer).not.toContain('Print Purchase Voucher');
  });

  it('uses the employee detail destructive action style for cancelling a purchase', () => {
    const cancelAction = detailDrawer.slice(detailDrawer.indexOf('Cancel Purchase Order') - 500, detailDrawer.indexOf('Cancel Purchase Order') + 100);

    expect(cancelAction).toContain('h-9 px-space-base rounded-xl border');
    expect(cancelAction).toContain('bg-surface hover:bg-error-container/20 text-error');
    expect(cancelAction).toContain('font-body-medium text-caption');
    expect(cancelAction).not.toContain('hover:underline');
  });

  it('persists draft and active purchase statuses and rejects empty purchases', () => {
    expect(functions).toContain("const status = d.status === 'DRAFT' || d.status === 'ACTIVE' ? d.status : ''");
    expect(functions).toContain('status, createdBy');
    expect(functions).toContain('lines.length === 0');
    expect(modal).toContain('Add at least one product line before saving the purchase.');
    expect(functions).toContain('const outstandingAmount = Math.max(0, Number((totalAmount - amountPaid).toFixed(2)))');
    expect(functions).toContain('outstandingAmount, paymentStatus');
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

  it('sends product-specific and batch-specific receipt details', () => {
    expect(source).toContain('validatePurchaseReceiptLines(purchase.items, receipts)');
    expect(source).toContain('for (const batch of receipt.batches)');
    expect(source).toContain('lineId: line.id');
    expect(source).toContain('batchNumber: batch.batchNumber.trim() || null');
    expect(detailDrawer).toContain('Add another batch for this product');
    expect(detailDrawer).toContain('PurchaseReceiptLine[]');
    expect(detailDrawer).not.toContain('BATCH-2024-OCT-09');
  });

  it('initializes inventory stock timestamps for raw SQL inserts', () => {
    const inserts = [...inventoryBatches.matchAll(/INSERT INTO "inventory_stock" \(([^)]+)\)/g)];

    expect(inserts).toHaveLength(2);
    for (const insert of inserts) expect(insert[1]).toContain('updated_at');
    expect(inventoryBatches).toContain('overstock_threshold, updated_at) VALUES ($1, $2, $3, 0, $4, $5, NOW())');
    expect(inventoryBatches).toContain('overstock_threshold, updated_at) VALUES ($1, $2, $3, $4, $5, $6, NOW())');
  });
});
