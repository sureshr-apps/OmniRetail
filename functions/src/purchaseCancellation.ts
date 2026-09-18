import type { PoolClient } from 'pg';

export interface PurchaseCancellationInput {
  organizationId: string;
  purchaseId: string;
  reason?: string | null;
}

export interface PurchaseCancellationResult {
  amountPaid: number;
  outstandingAmount: number;
}

export class PurchaseCancellationError extends Error {
  readonly code: 'PURCHASE_NOT_FOUND' | 'PURCHASE_NOT_CANCELLABLE';

  constructor(code: PurchaseCancellationError['code'], message: string) {
    super(message);
    this.name = 'PurchaseCancellationError';
    this.code = code;
  }
}

export function calculateCancelledPurchaseAccounting(amountPaid: number): PurchaseCancellationResult {
  const paid = Number.isFinite(amountPaid) ? Math.max(0, Number(amountPaid.toFixed(2))) : 0;
  return {
    amountPaid: paid,
    outstandingAmount: 0,
  };
}

export async function cancelPurchaseWithAccounting(
  client: PoolClient,
  input: PurchaseCancellationInput,
): Promise<PurchaseCancellationResult> {
  const purchaseResult = await client.query(
    'SELECT id, status, receipt_status, amount_paid FROM "purchase" WHERE id = $1 AND organization_id = $2 FOR UPDATE',
    [input.purchaseId, input.organizationId],
  );
  if (!purchaseResult.rowCount) {
    throw new PurchaseCancellationError('PURCHASE_NOT_FOUND', 'Purchase was not found in this organization.');
  }

  const purchase = purchaseResult.rows[0];
  const status = String(purchase.status).toUpperCase();
  const receiptStatus = String(purchase.receipt_status).toUpperCase();
  if (status === 'CLOSED' || receiptStatus === 'RECEIVED') {
    throw new PurchaseCancellationError('PURCHASE_NOT_CANCELLABLE', 'Fully received or closed purchases cannot be cancelled.');
  }

  const accounting = calculateCancelledPurchaseAccounting(Number(purchase.amount_paid));
  const reason = input.reason?.trim() || null;

  // A retry of an already-cancelled request is safe and repairs any legacy
  // row that still carried a non-zero outstanding amount.
  await client.query(
    'UPDATE "purchase" SET status = \'CANCELLED\', outstanding_amount = $2, receiving_notes = COALESCE($3, receiving_notes), updated_at = NOW() WHERE id = $1',
    [input.purchaseId, accounting.outstandingAmount, reason],
  );

  return accounting;
}
