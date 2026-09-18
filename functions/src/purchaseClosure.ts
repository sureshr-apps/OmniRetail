import type { PoolClient } from 'pg';

const EPSILON = 0.000001;

export interface PartialPurchaseLine {
  quantityOrdered: number;
  quantityReceived: number;
  unitCost: number;
  discountPercent: number;
  taxRate: number;
}

export interface PartialPurchaseTotals {
  subtotal: number;
  tax: number;
  shippingFee: number;
  handlingFee: number;
  totalAmount: number;
}

export class PurchaseClosureError extends Error {
  readonly code: 'INVALID_CLOSURE' | 'PURCHASE_NOT_FOUND' | 'PURCHASE_NOT_CLOSABLE' | 'NOTHING_RECEIVED';

  constructor(code: PurchaseClosureError['code'], message: string) {
    super(message);
    this.name = 'PurchaseClosureError';
    this.code = code;
  }
}

function roundCurrency(value: number): number {
  return Number(value.toFixed(2));
}

export function calculatePartialPurchaseTotals(
  lines: readonly PartialPurchaseLine[],
  shippingFee: number,
  handlingFee: number,
): PartialPurchaseTotals {
  if (!lines.length || ![shippingFee, handlingFee].every(Number.isFinite) || shippingFee < 0 || handlingFee < 0) {
    throw new PurchaseClosureError('INVALID_CLOSURE', 'Purchase totals could not be recalculated.');
  }

  let orderedSubtotal = 0;
  let receivedSubtotal = 0;
  let receivedTax = 0;
  let receivedUnits = 0;

  for (const line of lines) {
    if (![line.quantityOrdered, line.quantityReceived, line.unitCost, line.discountPercent, line.taxRate].every(Number.isFinite)
      || line.quantityOrdered <= 0
      || line.quantityReceived < 0
      || line.quantityReceived > line.quantityOrdered + EPSILON
      || line.unitCost < 0
      || line.discountPercent < 0
      || line.taxRate < 0) {
      throw new PurchaseClosureError('INVALID_CLOSURE', 'Purchase line quantities or pricing are invalid.');
    }

    const discountMultiplier = Math.max(0, 1 - line.discountPercent / 100);
    orderedSubtotal += line.quantityOrdered * line.unitCost * discountMultiplier;
    receivedSubtotal += line.quantityReceived * line.unitCost * discountMultiplier;
    receivedTax += line.quantityReceived * line.unitCost * discountMultiplier * line.taxRate / 100;
    receivedUnits += line.quantityReceived;
  }

  if (receivedUnits <= EPSILON) {
    throw new PurchaseClosureError('NOTHING_RECEIVED', 'Receive at least one unit before closing the purchase.');
  }

  const receiptRatio = orderedSubtotal > EPSILON ? Math.min(1, receivedSubtotal / orderedSubtotal) : 0;
  const adjustedShippingFee = roundCurrency(shippingFee * receiptRatio);
  const adjustedHandlingFee = roundCurrency(handlingFee * receiptRatio);
  const subtotal = roundCurrency(receivedSubtotal);
  const tax = roundCurrency(receivedTax);
  return {
    subtotal,
    tax,
    shippingFee: adjustedShippingFee,
    handlingFee: adjustedHandlingFee,
    totalAmount: roundCurrency(subtotal + tax + adjustedShippingFee + adjustedHandlingFee),
  };
}

export async function closePurchaseWithPartialReceipt(
  client: PoolClient,
  input: { organizationId: string; purchaseId: string },
): Promise<PartialPurchaseTotals & { amountPaid: number; outstandingAmount: number; paymentStatus: 'PAID' | 'PARTIALLY_PAID' | 'UNPAID' }> {
  const purchaseResult = await client.query(
    'SELECT id, shipping_fee, handling_fee, amount_paid, status FROM "purchase" WHERE id = $1 AND organization_id = $2 FOR UPDATE',
    [input.purchaseId, input.organizationId],
  );
  if (!purchaseResult.rowCount) {
    throw new PurchaseClosureError('PURCHASE_NOT_FOUND', 'Purchase was not found in this organization.');
  }

  const purchase = purchaseResult.rows[0];
  const status = String(purchase.status).toUpperCase();
  if (status === 'CANCELLED' || status === 'CLOSED') {
    throw new PurchaseClosureError('PURCHASE_NOT_CLOSABLE', 'This purchase is already closed or cancelled.');
  }

  const linesResult = await client.query(
    'SELECT quantity_ordered, quantity_received, unit_cost, discount_percent, tax_rate FROM "purchase_line" WHERE purchase_id = $1 FOR UPDATE',
    [input.purchaseId],
  );
  const hasPendingUnits = linesResult.rows.some((line) => Number(line.quantity_received) < Number(line.quantity_ordered) - EPSILON);
  if (!hasPendingUnits) {
    throw new PurchaseClosureError('PURCHASE_NOT_CLOSABLE', 'This purchase is already fully received.');
  }
  const totals = calculatePartialPurchaseTotals(linesResult.rows.map((line) => ({
    quantityOrdered: Number(line.quantity_ordered),
    quantityReceived: Number(line.quantity_received),
    unitCost: Number(line.unit_cost),
    discountPercent: Number(line.discount_percent),
    taxRate: Number(line.tax_rate),
  })), Number(purchase.shipping_fee), Number(purchase.handling_fee));

  const amountPaid = Math.max(0, roundCurrency(Number(purchase.amount_paid)));
  const outstandingAmount = Math.max(0, roundCurrency(totals.totalAmount - amountPaid));
  const paymentStatus = outstandingAmount <= EPSILON ? 'PAID' : amountPaid > EPSILON ? 'PARTIALLY_PAID' : 'UNPAID';

  await client.query(
    'UPDATE "purchase" SET subtotal = $2, shipping_fee = $3, handling_fee = $4, tax = $5, total_amount = $6, outstanding_amount = $7, payment_status = $8, status = \'CLOSED\', updated_at = NOW() WHERE id = $1',
    [input.purchaseId, totals.subtotal, totals.shippingFee, totals.handlingFee, totals.tax, totals.totalAmount, outstandingAmount, paymentStatus],
  );

  return { ...totals, amountPaid, outstandingAmount, paymentStatus };
}
