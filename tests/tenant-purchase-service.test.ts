import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { calculateOutstandingAmount, calculatePurchaseTotals } from '@/features/purchases/utils/calculations';
import { resolvePurchaseActor } from '@/features/purchases/services/purchaseService';
const source = readFileSync(new URL('../src/features/purchases/services/purchaseService.ts', import.meta.url), 'utf8');
const modal = readFileSync(new URL('../src/features/purchases/components/CreatePurchaseModal.tsx', import.meta.url), 'utf8');
const detailDrawer = readFileSync(new URL('../src/features/purchases/components/PurchaseDetailDrawer.tsx', import.meta.url), 'utf8');
const functions = readFileSync(new URL('../functions/src/index.ts', import.meta.url), 'utf8');
const inventoryBatches = readFileSync(new URL('../functions/src/inventoryBatches.ts', import.meta.url), 'utf8');
const closure = readFileSync(new URL('../functions/src/purchaseClosure.ts', import.meta.url), 'utf8');
const purchasesPage = readFileSync(new URL('../src/features/purchases/pages/PurchasesPage.tsx', import.meta.url), 'utf8');

function section(source: string, start: string, end: string): string {
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end, startIndex + start.length);
  expect(startIndex).toBeGreaterThanOrEqual(0);
  expect(endIndex).toBeGreaterThan(startIndex);
  return source.slice(startIndex, endIndex);
}

describe('tenant purchase service adapter', () => {
  it('uses tenant reads and production lifecycle actions', () => {
    expect(source).toContain('listTenantPurchases');
    expect(source).toContain("'changeTenantPurchaseStatus'");
    expect(source).toContain("'receiveTenantPurchaseLineRecord'");
    expect(source).toContain('new ProductionPurchaseService()');
    expect(source).toContain("'recordTenantPurchasePayment'");
    expect(source).toContain('async recordPayment');
    expect(source).toContain("'listTenantPurchaseRefunds'");
    expect(source).toContain("'recordTenantPurchaseRefund'");
    expect(source).toContain("'closeTenantPurchaseWithPartialReceipt'");
    expect(source).toContain('closePurchaseWithPartialReceipt');
    expect(source).toContain("outstandingAmount: status === 'cancelled' ? 0");
    expect(functions).toContain('cancelPurchaseWithAccounting');
    expect(detailDrawer).toContain('onRecordPayment');
    expect(detailDrawer).toContain('Record Payment');
    expect(detailDrawer).toContain('Close with Partial Receipt');
  });

  it('derives payment status from the actual amount paid and total', () => {
    expect(source).toContain('paymentStatus: totals.derivedPaymentStatus');
    expect(functions).toContain('derivePurchasePaymentStatus(totalAmount, amountPaid)');
    expect(calculatePurchaseTotals([{ quantity: 2, unitCost: 100, discountPercent: 0, taxRate: 15 }], 0, 0, 500).derivedPaymentStatus).toBe('PAID');
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
    expect(calculateOutstandingAmount(382.5, 100)).toBe(282.5);
    expect(detailDrawer).toContain('const balanceDue = isCancelled ? 0 : calculateOutstandingAmount(purchase.totalAmount, purchase.amountPaid)');
    expect(detailDrawer).not.toContain('-{formatCurrency(purchase.amountPaid)}');
  });

  it('initializes production supplier and outlet choices instead of fixture ids', () => {
    expect(modal).toContain('suppliers[0]?.id ?? \'\'');
    expect(modal).toContain('outlets[0]?.id ?? \'\'');
    expect(modal).not.toContain('sup-101');
    expect(modal).not.toContain('Downtown Flagship #04');
  });

  it('starts new purchases unpaid with no shipping or initial payment', () => {
    expect(modal).toContain('useState<number>(0)');
    expect(modal).toContain("'UNPAID'");
    expect(modal).toContain("useState<string>('0.00')");
  });

  it('uses the authenticated user as the purchase creator', () => {
    expect(source).toContain('const createdBy = resolvePurchaseActor(authorization.data.appUsers[0]);');
    expect(source).toContain('createdBy, lines:');
    expect(source).not.toContain("createdBy: 'Current operator'");
    expect(resolvePurchaseActor({ displayName: '  Sarah Jenkins  ', username: 'sj123' })).toBe('Sarah Jenkins');
    expect(resolvePurchaseActor({ displayName: '', username: 'sj123' })).toBe('sj123');
    expect(() => resolvePurchaseActor(undefined)).toThrow('Current user identity is unavailable.');
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

  it('does not offer cancellation after all purchase units are received', () => {
    expect(detailDrawer).toContain('!isCancelled && !isClosed && !isFullyReceived');
    expect(detailDrawer).toContain("'Order Fully Received'");
  });

  it('preserves ordered quantities while closing partial receipts and blocks future inward stock', () => {
    expect(closure).toContain("status === 'CLOSED'");
    expect(closure).toContain('quantityOrdered');
    expect(closure).toContain('quantityReceived');
    expect(inventoryBatches).toContain("purchaseStatus === 'CLOSED' || purchaseStatus === 'CANCELLED'");
    expect(functions).toContain('export const closeTenantPurchaseWithPartialReceipt');
  });

  it('does not render a redundant cancel button beside stock inward confirmation', () => {
    const receiveSection = detailDrawer.slice(detailDrawer.indexOf('Receive Inward Stock Workflow Box'), detailDrawer.indexOf('Drawer Footer Actions'));
    expect(receiveSection).not.toMatch(/onClick=\{onClose\}[\s\S]*>\s*Cancel\s*</);
  });

  it('does not render procurement audit trail data or UI', () => {
    expect(detailDrawer).not.toContain('Procurement Audit Trail');
    expect(detailDrawer).not.toContain('purchase.auditTrail');
  });

  it('persists and displays each later supplier payment', () => {
    expect(functions).toContain('export const recordTenantPurchasePayment');
    expect(functions).toContain('recordPurchasePayment(client');
    expect(source).toContain('paymentHistory');
    expect(detailDrawer).toContain('Payment History');
    expect(detailDrawer).toContain('Payment date must use DD/MM/YYYY format.');
  });

  it('supports partial and multiple supplier refunds for cancelled purchases', () => {
    expect(functions).toContain('export const listTenantPurchaseRefunds');
    expect(functions).toContain('export const recordTenantPurchaseRefund');
    expect(functions).toContain('recordPurchaseRefund(client');
    expect(detailDrawer).toContain('Supplier Refund Due:');
    expect(detailDrawer).toContain('Record Supplier Refund / Credit');
    expect(detailDrawer).toContain('Refund History');
    expect(detailDrawer).toContain('Supplier Credit');
    expect(detailDrawer).toContain('purchase.amountPaid > purchase.totalAmount');
    expect(detailDrawer).toContain("purchase.receiptStatus === 'RECEIVED'");
    expect(source).not.toContain('Refunds can only be recorded for cancelled purchases.');
  });

  it('handles the deployed flat refund summary and avoids a redundant ledger refresh', () => {
    const refundHandler = section(purchasesPage, 'const handleRecordRefund', 'return (');
    const service = source;
    expect(service).toContain('normalizePurchaseRefundResponse(response.data as PurchaseRefundCallableResponse)');
    expect(refundHandler).not.toContain('await loadLedger()');
    expect(refundHandler).toContain('recorded against the purchase.');
  });

  it('initializes inventory stock timestamps for raw SQL inserts', () => {
    const inserts = [...inventoryBatches.matchAll(/INSERT INTO "inventory_stock" \(([^)]+)\)/g)];

    expect(inserts).toHaveLength(2);
    for (const insert of inserts) expect(insert[1]).toContain('updated_at');
    expect(inventoryBatches).toContain('overstock_threshold, updated_at) VALUES ($1, $2, $3, 0, $4, $5, NOW())');
    expect(inventoryBatches).toContain('overstock_threshold, updated_at) VALUES ($1, $2, $3, $4, $5, $6, NOW())');
  });

  it('initializes inventory batch receipt timestamps for raw SQL inserts', () => {
    const inserts = [...inventoryBatches.matchAll(/INSERT INTO "inventory_batch" \(([^)]+)\)/g)];

    expect(inserts).toHaveLength(2);
    for (const insert of inserts) expect(insert[1]).toContain('received_at');
    expect(inventoryBatches).toContain('expiry_date, on_hand_qty, received_at) VALUES ($1, $2, $3, $4, $5, $6, $7, 0, NOW())');
    expect(inventoryBatches).toContain('batch_number, on_hand_qty, received_at)');
    expect(inventoryBatches).toContain("\\'UNTRACKED\\'");
  });

  it('initializes inventory movement creation timestamps for raw SQL inserts', () => {
    expect(inventoryBatches).toContain('actor_firebase_uid, request_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW())');
  });
});
