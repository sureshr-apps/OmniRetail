import { randomUUID } from 'node:crypto';
import type { PoolClient } from 'pg';

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
const EPSILON = 0.000001;

export type PurchasePaymentStatus = 'PAID' | 'PARTIALLY_PAID';

export type TenantPurchasePaymentStatus = 'PAID' | 'PARTIALLY_PAID' | 'UNPAID';

export function derivePurchasePaymentStatus(totalAmount: number, amountPaid: number): TenantPurchasePaymentStatus {
  if (!Number.isFinite(totalAmount) || !Number.isFinite(amountPaid) || totalAmount <= 0 || amountPaid <= 0) {
    return 'UNPAID';
  }
  return amountPaid >= totalAmount ? 'PAID' : 'PARTIALLY_PAID';
}

export interface PurchasePaymentInput {
  organizationId: string;
  purchaseId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  reference?: string | null;
  notes?: string | null;
  recordedBy: string;
  requestId: string;
}

export interface PurchasePaymentRecord {
  id: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  reference: string | null;
  notes: string | null;
  recordedBy: string;
  createdAt: string;
}

export interface PurchasePaymentSettlement {
  amountPaid: number;
  outstandingAmount: number;
  paymentStatus: PurchasePaymentStatus;
}

export class PurchasePaymentError extends Error {
  readonly code: 'INVALID_PAYMENT' | 'PURCHASE_NOT_FOUND' | 'PURCHASE_CANCELLED' | 'ALREADY_PAID' | 'OVERPAYMENT';

  constructor(code: PurchasePaymentError['code'], message: string) {
    super(message);
    this.name = 'PurchasePaymentError';
    this.code = code;
  }
}

function roundCurrency(value: number): number {
  return Number(value.toFixed(2));
}

function isValidDateOnly(value: string): boolean {
  if (!DATE_ONLY.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return date.toISOString().slice(0, 10) === value;
}

export function calculatePaymentSettlement(
  totalAmount: number,
  currentAmountPaid: number,
  paymentAmount: number,
): PurchasePaymentSettlement {
  if (![totalAmount, currentAmountPaid, paymentAmount].every(Number.isFinite) || totalAmount < 0 || currentAmountPaid < 0 || paymentAmount <= 0) {
    throw new PurchasePaymentError('INVALID_PAYMENT', 'Payment amount must be greater than zero.');
  }

  const currentOutstanding = Math.max(0, roundCurrency(totalAmount - currentAmountPaid));
  if (currentOutstanding <= EPSILON) {
    throw new PurchasePaymentError('ALREADY_PAID', 'This purchase is already fully paid.');
  }
  if (paymentAmount > currentOutstanding + EPSILON) {
    throw new PurchasePaymentError('OVERPAYMENT', `Payment cannot exceed the balance due of ₹${currentOutstanding.toFixed(2)}.`);
  }

  const amountPaid = roundCurrency(currentAmountPaid + paymentAmount);
  const outstandingAmount = Math.max(0, roundCurrency(totalAmount - amountPaid));
  return {
    amountPaid,
    outstandingAmount,
    paymentStatus: outstandingAmount <= EPSILON ? 'PAID' : 'PARTIALLY_PAID',
  };
}

export async function recordPurchasePayment(
  client: PoolClient,
  input: PurchasePaymentInput,
): Promise<{ settlement: PurchasePaymentSettlement; payment: PurchasePaymentRecord }> {
  if (!input.organizationId || !input.purchaseId || !input.recordedBy || !input.requestId || !input.paymentMethod.trim() || !isValidDateOnly(input.paymentDate)) {
    throw new PurchasePaymentError('INVALID_PAYMENT', 'Payment details are incomplete or invalid.');
  }

  const purchaseResult = await client.query(
    'SELECT id, total_amount, amount_paid, status FROM "purchase" WHERE id = $1 AND organization_id = $2 FOR UPDATE',
    [input.purchaseId, input.organizationId],
  );
  if (!purchaseResult.rowCount) {
    throw new PurchasePaymentError('PURCHASE_NOT_FOUND', 'Purchase was not found in this organization.');
  }

  const purchase = purchaseResult.rows[0];
  if (String(purchase.status).toUpperCase() === 'CANCELLED') {
    throw new PurchasePaymentError('PURCHASE_CANCELLED', 'Cancelled purchases cannot receive payments.');
  }

  const settlement = calculatePaymentSettlement(Number(purchase.total_amount), Number(purchase.amount_paid), input.amount);
  const paymentId = randomUUID();
  const paymentResult = await client.query(
    `INSERT INTO "purchase_payment"
      (id, purchase_id, amount, payment_date, payment_method, reference, notes, recorded_by, request_id, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
     RETURNING id, amount, payment_date::text, payment_method, reference, notes, recorded_by, created_at::text`,
    [paymentId, input.purchaseId, input.amount, input.paymentDate, input.paymentMethod.trim(), input.reference ?? null, input.notes ?? null, input.recordedBy, input.requestId],
  );

  await client.query(
    'UPDATE "purchase" SET amount_paid = $2, outstanding_amount = $3, payment_status = $4, updated_at = NOW() WHERE id = $1',
    [input.purchaseId, settlement.amountPaid, settlement.outstandingAmount, settlement.paymentStatus],
  );

  const row = paymentResult.rows[0];
  return {
    settlement,
    payment: {
      id: String(row.id),
      amount: Number(row.amount),
      paymentDate: String(row.payment_date),
      paymentMethod: String(row.payment_method),
      reference: row.reference == null ? null : String(row.reference),
      notes: row.notes == null ? null : String(row.notes),
      recordedBy: String(row.recorded_by),
      createdAt: String(row.created_at),
    },
  };
}
