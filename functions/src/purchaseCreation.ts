import { randomUUID } from 'node:crypto';
import type { PoolClient } from 'pg';

export interface PurchaseCreationLineInput {
  productId: string;
  quantity: number;
  unitCost: number;
  discountPercent: number;
  taxRate: number;
  taxAmount: number;
  lineTotal: number;
}

export interface PurchaseCreationInput {
  organizationId: string;
  purchaseNumber: string;
  purchaseDate: string;
  supplierId: string;
  outletId: string | null;
  scope: string;
  paymentTerms: string | null;
  subtotal: number;
  shippingFee: number;
  handlingFee: number;
  tax: number;
  totalAmount: number;
  amountPaid: number;
  outstandingAmount: number;
  paymentStatus: string;
  receiptStatus: string;
  status: string;
  createdBy: string;
  lines: PurchaseCreationLineInput[];
}

function isNonNegativeNumber(value: number): boolean {
  return Number.isFinite(value) && value >= 0;
}

function validateLine(line: PurchaseCreationLineInput): void {
  if (!line.productId || !Number.isFinite(line.quantity) || line.quantity <= 0
    || !isNonNegativeNumber(line.unitCost)
    || !isNonNegativeNumber(line.discountPercent) || line.discountPercent > 100
    || !isNonNegativeNumber(line.taxRate)
    || !isNonNegativeNumber(line.taxAmount)
    || !isNonNegativeNumber(line.lineTotal)) {
    throw new Error('invalid line');
  }
}

/**
 * Persists a purchase header and every purchase line on the caller's SQL
 * transaction. The caller owns BEGIN/COMMIT/ROLLBACK; no write is committed
 * until this function returns successfully.
 */
export async function createPurchaseInTransaction(
  client: PoolClient,
  input: PurchaseCreationInput,
): Promise<{ purchaseId: string; lineIds: string[] }> {
  if (!input.organizationId || !input.purchaseNumber || !input.purchaseDate || !input.supplierId
    || !input.createdBy || !input.lines.length) {
    throw new Error('invalid input');
  }
  input.lines.forEach(validateLine);

  const supplier = await client.query(
    'SELECT id, status FROM "supplier" WHERE id = $1 AND organization_id = $2 FOR SHARE',
    [input.supplierId, input.organizationId],
  );
  if (!supplier.rowCount || String(supplier.rows[0].status).toUpperCase() !== 'ACTIVE') {
    throw new Error('supplier is not active in this organization');
  }

  if (input.outletId) {
    const outlet = await client.query(
      'SELECT id, status FROM "outlet" WHERE id = $1 AND organization_id = $2 FOR SHARE',
      [input.outletId, input.organizationId],
    );
    if (!outlet.rowCount || String(outlet.rows[0].status).toUpperCase() !== 'ACTIVE') {
      throw new Error('outlet is not active in this organization');
    }
  }

  const productIds = [...new Set(input.lines.map((line) => line.productId))];
  const products = await client.query(
    'SELECT id, status FROM "product" WHERE organization_id = $1 AND id = ANY($2::uuid[]) FOR SHARE',
    [input.organizationId, productIds],
  );
  const activeProductIds = new Set(
    products.rows
      .filter((row) => String(row.status).toUpperCase() === 'ACTIVE')
      .map((row) => String(row.id)),
  );
  if (activeProductIds.size !== productIds.length || productIds.some((id) => !activeProductIds.has(id))) {
    throw new Error('purchase line is not valid for this organization');
  }

  const purchaseId = randomUUID();
  await client.query(
    `INSERT INTO "purchase" (
      id, organization_id, purchase_number, purchase_date, supplier_id, outlet_id, scope,
      payment_terms, subtotal, shipping_fee, handling_fee, tax, total_amount, amount_paid,
      outstanding_amount, payment_status, receipt_status, status, created_by, created_at, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, NOW(), NOW())`,
    [
      purchaseId, input.organizationId, input.purchaseNumber, input.purchaseDate, input.supplierId,
      input.outletId, input.scope, input.paymentTerms, input.subtotal, input.shippingFee,
      input.handlingFee, input.tax, input.totalAmount, input.amountPaid, input.outstandingAmount,
      input.paymentStatus, input.receiptStatus, input.status, input.createdBy,
    ],
  );

  const lineIds: string[] = [];
  for (const line of input.lines) {
    const lineId = randomUUID();
    await client.query(
      `INSERT INTO "purchase_line" (
        id, purchase_id, product_id, quantity_ordered, quantity_received, unit_cost,
        discount_percent, tax_rate, tax_amount, line_total
      ) VALUES ($1, $2, $3, $4, 0, $5, $6, $7, $8, $9)`,
      [lineId, purchaseId, line.productId, line.quantity, line.unitCost, line.discountPercent, line.taxRate, line.taxAmount, line.lineTotal],
    );
    lineIds.push(lineId);
  }

  return { purchaseId, lineIds };
}
