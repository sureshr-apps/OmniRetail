import { randomUUID } from 'node:crypto';
import type { PoolClient } from 'pg';

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
const EPSILON = 0.000001;

export interface PurchaseRefundInput {
  organizationId: string;
  purchaseId: string;
  amount: number;
  refundDate: string;
  refundMethod: string;
  reference?: string | null;
  notes?: string | null;
  recordedBy: string;
  requestId: string;
}

export interface PurchaseRefundRecord {
  id: string;
  amount: number;
  refundDate: string;
  refundMethod: string;
  reference: string | null;
  notes: string | null;
  recordedBy: string;
  createdAt: string;
}

export interface PurchaseRefundSummary {
  amountPaid: number;
  totalRefunded: number;
  refundDue: number;
}

export class PurchaseRefundError extends Error {
  readonly code: 'INVALID_REFUND' | 'PURCHASE_NOT_FOUND' | 'PURCHASE_NOT_CANCELLED' | 'NO_REFUND_DUE' | 'OVER_REFUND';

  constructor(code: PurchaseRefundError['code'], message: string) {
    super(message);
    this.name = 'PurchaseRefundError';
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

export function calculatePurchaseRefundSummary(amountPaid: number, totalRefunded: number): PurchaseRefundSummary {
  const paid = Math.max(0, roundCurrency(Number.isFinite(amountPaid) ? amountPaid : 0));
  const refunded = Math.max(0, roundCurrency(Number.isFinite(totalRefunded) ? totalRefunded : 0));
  return {
    amountPaid: paid,
    totalRefunded: refunded,
    refundDue: Math.max(0, roundCurrency(paid - refunded)),
  };
}

interface PurchaseRefundContext {
  purchaseId: string;
  supplierId: string;
  status: string;
  amountPaid: number;
}

async function loadPurchaseRefundContext(client: PoolClient, organizationId: string, purchaseId: string): Promise<PurchaseRefundContext> {
  const result = await client.query(
    'SELECT id, supplier_id, status, amount_paid FROM "purchase" WHERE id = $1 AND organization_id = $2 FOR UPDATE',
    [purchaseId, organizationId],
  );
  if (!result.rowCount) throw new PurchaseRefundError('PURCHASE_NOT_FOUND', 'Purchase was not found in this organization.');
  const row = result.rows[0];
  return {
    purchaseId: String(row.id),
    supplierId: String(row.supplier_id),
    status: String(row.status).toUpperCase(),
    amountPaid: Number(row.amount_paid),
  };
}

async function loadRefundTotal(client: PoolClient, organizationId: string, purchaseId: string): Promise<number> {
  const result = await client.query(
    'SELECT COALESCE(SUM(amount), 0) AS total_refunded FROM "purchase_refund" WHERE organization_id = $1 AND purchase_id = $2',
    [organizationId, purchaseId],
  );
  return Number(result.rows[0]?.total_refunded ?? 0);
}

function mapRefundRow(row: Record<string, unknown>): PurchaseRefundRecord {
  return {
    id: String(row.id),
    amount: Number(row.amount),
    refundDate: String(row.refund_date),
    refundMethod: String(row.refund_method),
    reference: row.reference == null ? null : String(row.reference),
    notes: row.notes == null ? null : String(row.notes),
    recordedBy: String(row.recorded_by),
    createdAt: String(row.created_at),
  };
}

export async function listPurchaseRefunds(
  client: PoolClient,
  input: { organizationId: string; purchaseId: string },
): Promise<{ refunds: PurchaseRefundRecord[]; summary: PurchaseRefundSummary }> {
  const context = await loadPurchaseRefundContext(client, input.organizationId, input.purchaseId);
  const result = await client.query(
    `SELECT id, amount, refund_date::text, refund_method, reference, notes,
            recorded_by, created_at::text
       FROM "purchase_refund"
      WHERE organization_id = $1 AND purchase_id = $2
      ORDER BY refund_date DESC, created_at DESC, id DESC`,
    [input.organizationId, input.purchaseId],
  );
  const refunds = result.rows.map((row) => mapRefundRow(row));
  return {
    refunds,
    summary: calculatePurchaseRefundSummary(context.amountPaid, refunds.reduce((sum, refund) => sum + refund.amount, 0)),
  };
}

export async function recordPurchaseRefund(
  client: PoolClient,
  input: PurchaseRefundInput,
): Promise<{ refund: PurchaseRefundRecord; summary: PurchaseRefundSummary }> {
  if (!input.organizationId || !input.purchaseId || !input.recordedBy || !input.requestId || !input.refundMethod.trim() || !isValidDateOnly(input.refundDate) || !Number.isFinite(input.amount) || input.amount <= 0) {
    throw new PurchaseRefundError('INVALID_REFUND', 'Refund details are incomplete or invalid.');
  }

  const context = await loadPurchaseRefundContext(client, input.organizationId, input.purchaseId);
  if (context.status !== 'CANCELLED') {
    throw new PurchaseRefundError('PURCHASE_NOT_CANCELLED', 'Refunds can only be recorded for cancelled purchases.');
  }

  const existingResult = await client.query(
    `SELECT id, purchase_id, amount, refund_date::text, refund_method, reference, notes,
            recorded_by, created_at::text
       FROM "purchase_refund"
      WHERE organization_id = $1 AND request_id = $2
      LIMIT 1`,
    [input.organizationId, input.requestId],
  );
  if (existingResult.rowCount) {
    if (String(existingResult.rows[0].purchase_id) !== context.purchaseId) {
      throw new PurchaseRefundError('INVALID_REFUND', 'This refund request id has already been used for another purchase.');
    }
    const refund = mapRefundRow(existingResult.rows[0]);
    const totalRefunded = await loadRefundTotal(client, input.organizationId, input.purchaseId);
    return { refund, summary: calculatePurchaseRefundSummary(context.amountPaid, totalRefunded) };
  }

  const before = calculatePurchaseRefundSummary(context.amountPaid, await loadRefundTotal(client, input.organizationId, input.purchaseId));
  if (before.refundDue <= EPSILON) {
    throw new PurchaseRefundError('NO_REFUND_DUE', 'There is no supplier refund due for this purchase.');
  }
  if (input.amount > before.refundDue + EPSILON) {
    throw new PurchaseRefundError('OVER_REFUND', `Refund cannot exceed the remaining supplier refund due of ₹${before.refundDue.toFixed(2)}.`);
  }

  const refundId = randomUUID();
  const result = await client.query(
    `INSERT INTO "purchase_refund"
     (id, organization_id, purchase_id, supplier_id, amount, refund_date,
       refund_method, reference, notes, recorded_by, request_id, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
     ON CONFLICT (request_id) DO NOTHING
     RETURNING id, amount, refund_date::text, refund_method, reference, notes,
               recorded_by, created_at::text`,
    [refundId, input.organizationId, context.purchaseId, context.supplierId, roundCurrency(input.amount), input.refundDate, input.refundMethod.trim(), input.reference?.trim() || null, input.notes?.trim() || null, input.recordedBy, input.requestId],
  );
  if (!result.rowCount) {
    const retryResult = await client.query(
      `SELECT id, purchase_id, amount, refund_date::text, refund_method, reference, notes,
              recorded_by, created_at::text
         FROM "purchase_refund"
        WHERE organization_id = $1 AND request_id = $2
        LIMIT 1`,
      [input.organizationId, input.requestId],
    );
    if (!retryResult.rowCount) throw new PurchaseRefundError('INVALID_REFUND', 'The refund could not be recorded. Please try again.');
    if (String(retryResult.rows[0].purchase_id) !== context.purchaseId) {
      throw new PurchaseRefundError('INVALID_REFUND', 'This refund request id has already been used for another purchase.');
    }
    const refund = mapRefundRow(retryResult.rows[0]);
    const totalRefunded = await loadRefundTotal(client, input.organizationId, input.purchaseId);
    return { refund, summary: calculatePurchaseRefundSummary(context.amountPaid, totalRefunded) };
  }
  const refund = mapRefundRow(result.rows[0]);
  const totalRefunded = await loadRefundTotal(client, input.organizationId, input.purchaseId);
  return { refund, summary: calculatePurchaseRefundSummary(context.amountPaid, totalRefunded) };
}
