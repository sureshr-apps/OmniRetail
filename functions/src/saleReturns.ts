import { randomUUID } from 'node:crypto';
import type { PoolClient } from 'pg';
import { recordSaleCashRefundMovement } from './cashRegister.js';
import { restoreSaleLineInventory } from './inventoryBatches.js';

const EPSILON = 0.000001;

export interface SaleReturnLineInput {
  saleLineId: string;
  quantity: number;
}

export interface SaleReturnInput {
  organizationId: string;
  saleId: string;
  lines: SaleReturnLineInput[];
  reason: string;
  requestId: string;
  actorFirebaseUid: string;
}

export interface SaleReturnResult {
  returnId: string;
  saleId: string;
  status: 'PARTIAL_REFUND' | 'REFUNDED';
  refundAmount: number;
  cashRefundAmount: number;
  restoredQty: number;
  idempotent: boolean;
}

export class SaleReturnError extends Error {
  readonly code: 'INVALID_RETURN' | 'SALE_NOT_FOUND' | 'SALE_NOT_RETURNABLE' | 'RETURN_EXCEEDS_AVAILABLE' | 'DUPLICATE_RETURN';

  constructor(code: SaleReturnError['code'], message: string) {
    super(message);
    this.name = 'SaleReturnError';
    this.code = code;
  }
}

function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateReturnAmount(totalNet: number, saleSubtotal: number, returnedSubtotal: number, isFullReturn: boolean): number {
  if (isFullReturn) return roundCurrency(Math.max(0, totalNet));
  if (!Number.isFinite(totalNet) || !Number.isFinite(saleSubtotal) || !Number.isFinite(returnedSubtotal) || saleSubtotal <= EPSILON || returnedSubtotal <= EPSILON) return 0;
  return roundCurrency(Math.max(0, totalNet) * Math.min(1, returnedSubtotal / saleSubtotal));
}

export function calculateCashRefundAmount(tenderType: string, refundAmount: number, cashPaid: number, saleTotal: number): number {
  const amount = Math.max(0, roundCurrency(refundAmount));
  if (tenderType === 'CASH') return amount;
  if (tenderType === 'SPLIT' && saleTotal > EPSILON) return roundCurrency(Math.min(amount, amount * Math.max(0, cashPaid) / saleTotal));
  return 0;
}

function normalizeStatus(status: string): SaleReturnResult['status'] {
  return status === 'REFUNDED' ? 'REFUNDED' : 'PARTIAL_REFUND';
}

export async function returnSale(client: PoolClient, input: SaleReturnInput): Promise<SaleReturnResult> {
  if (!input.organizationId || !input.saleId || !input.reason.trim() || !input.requestId || !input.actorFirebaseUid || !input.lines.length) {
    throw new SaleReturnError('INVALID_RETURN', 'Return details are incomplete.');
  }
  if (new Set(input.lines.map((line) => line.saleLineId)).size !== input.lines.length) {
    throw new SaleReturnError('INVALID_RETURN', 'Each sale line can be returned only once per request.');
  }
  if (input.lines.some((line) => !line.saleLineId || !Number.isFinite(line.quantity) || line.quantity <= 0)) {
    throw new SaleReturnError('INVALID_RETURN', 'Return quantities must be greater than zero.');
  }

  const saleResult = await client.query(
    'SELECT id, outlet_id, receipt_number, tender_type, subtotal, total_net, status FROM "sale" WHERE id = $1 AND organization_id = $2 FOR UPDATE',
    [input.saleId, input.organizationId],
  );
  if (!saleResult.rowCount) throw new SaleReturnError('SALE_NOT_FOUND', 'Sale is not in this organization.');
  const sale = saleResult.rows[0];
  const existing = await client.query(
    'SELECT id, sale_id, refund_amount, cash_refund_amount FROM "sale_return" WHERE organization_id = $1 AND request_id = $2 FOR SHARE',
    [input.organizationId, input.requestId],
  );
  if (existing.rowCount) {
    return {
      returnId: String(existing.rows[0].id),
      saleId: String(existing.rows[0].sale_id),
      status: normalizeStatus(String(sale.status)),
      refundAmount: roundCurrency(Number(existing.rows[0].refund_amount)),
      cashRefundAmount: roundCurrency(Number(existing.rows[0].cash_refund_amount)),
      restoredQty: 0,
      idempotent: true,
    };
  }
  if (sale.status === 'VOIDED') throw new SaleReturnError('SALE_NOT_RETURNABLE', 'Voided sales cannot be returned.');
  if (sale.status === 'REFUNDED') throw new SaleReturnError('SALE_NOT_RETURNABLE', 'This sale has already been fully returned.');

  const lineResult = await client.query(
    'SELECT sl.id, sl.quantity, sl.refunded_qty, sl.unit_price, sl.subtotal FROM "sale_line" sl WHERE sl.sale_id = $1 ORDER BY sl.id FOR UPDATE',
    [input.saleId],
  );
  const linesById = new Map(lineResult.rows.map((line) => [String(line.id), line]));
  const selectedLines = input.lines.map((requested) => {
    const line = linesById.get(requested.saleLineId);
    if (!line) throw new SaleReturnError('INVALID_RETURN', 'One or more selected sale lines were not found.');
    const available = Math.max(0, Number(line.quantity) - Number(line.refunded_qty ?? 0));
    if (requested.quantity > available + EPSILON) throw new SaleReturnError('RETURN_EXCEEDS_AVAILABLE', `Return quantity cannot exceed the remaining quantity for ${line.id}.`);
    return { line, quantity: requested.quantity, lineSubtotal: requested.quantity * Number(line.unit_price) };
  });
  const returnedSubtotal = selectedLines.reduce((sum, selected) => sum + selected.lineSubtotal, 0);
  const isFullReturn = lineResult.rows.every((line) => {
    const selected = selectedLines.find((item) => String(item.line.id) === String(line.id));
    return Number(line.refunded_qty ?? 0) + (selected?.quantity ?? 0) >= Number(line.quantity) - EPSILON;
  });
  const hasPreviousReturn = lineResult.rows.some((line) => Number(line.refunded_qty ?? 0) > EPSILON);
  const refundAmount = calculateReturnAmount(Number(sale.total_net), Number(sale.subtotal), returnedSubtotal, isFullReturn && !hasPreviousReturn);
  const cashPaidResult = await client.query(
    'SELECT COALESCE(SUM(amount), 0) AS amount FROM "cash_register_movement" WHERE organization_id = $1 AND source_type = \'SALE\' AND source_id = $2 AND movement_type = \'SALE\'',
    [input.organizationId, input.saleId],
  );
  const cashRefundAmount = calculateCashRefundAmount(String(sale.tender_type), refundAmount, Number(cashPaidResult.rows[0]?.amount ?? 0), Number(sale.total_net));
  const returnId = randomUUID();
  await client.query(
    `INSERT INTO "sale_return"
      (id, organization_id, sale_id, outlet_id, request_id, reason, refund_amount, cash_refund_amount, refund_method, created_by, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'ORIGINAL', $9, NOW())`,
    [returnId, input.organizationId, input.saleId, sale.outlet_id, input.requestId, input.reason.trim(), refundAmount, cashRefundAmount, input.actorFirebaseUid],
  );

  let restoredQty = 0;
  let allocatedAmount = 0;
  for (const [index, selected] of selectedLines.entries()) {
    const amount = index === selectedLines.length - 1
      ? roundCurrency(refundAmount - allocatedAmount)
      : roundCurrency(returnedSubtotal > EPSILON ? refundAmount * selected.lineSubtotal / returnedSubtotal : 0);
    allocatedAmount += amount;
    await client.query('UPDATE "sale_line" SET refunded_qty = refunded_qty + $2 WHERE id = $1', [selected.line.id, selected.quantity]);
    const restored = await restoreSaleLineInventory(client, { organizationId: input.organizationId, outletId: sale.outlet_id, saleLineId: selected.line.id, quantity: selected.quantity, requestId: input.requestId, actorFirebaseUid: input.actorFirebaseUid, reason: input.reason });
    restoredQty += restored.restoredQty;
    await client.query('INSERT INTO "sale_return_line" (id, sale_return_id, sale_line_id, quantity, amount) VALUES ($1, $2, $3, $4, $5)', [randomUUID(), returnId, selected.line.id, selected.quantity, amount]);
  }

  const status = isFullReturn ? 'REFUNDED' : 'PARTIAL_REFUND';
  await recordSaleCashRefundMovement(client, { organizationId: input.organizationId, outletId: sale.outlet_id, cashAmount: cashRefundAmount, saleId: input.saleId, receiptNumber: sale.receipt_number, actorFirebaseUid: input.actorFirebaseUid, requestId: input.requestId, reason: input.reason });
  await client.query('UPDATE "sale" SET status = $2 WHERE id = $1', [input.saleId, status]);
  return { returnId, saleId: input.saleId, status, refundAmount, cashRefundAmount, restoredQty, idempotent: false };
}
