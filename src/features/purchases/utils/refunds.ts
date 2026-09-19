import { PurchaseRefund, PurchaseRefundSummary } from '../types';

export interface PurchaseRefundCallableResponse {
  refund: unknown;
  summary?: PurchaseRefundSummary;
  amountPaid?: number;
  totalRefunded?: number;
  refundDue?: number;
}

export function mapPurchaseRefund(row: any): PurchaseRefund {
  return {
    id: String(row.id),
    amount: Number(row.amount),
    refundDate: String(row.refundDate),
    refundMethod: String(row.refundMethod),
    reference: row.reference == null ? undefined : String(row.reference),
    notes: row.notes == null ? undefined : String(row.notes),
    recordedBy: String(row.recordedBy),
    createdAt: String(row.createdAt),
  };
}

/**
 * Supports both the current callable response and the original deployed shape.
 * Older functions return summary fields next to `refund`; newer clients may
 * receive the same values under `summary`.
 */
export function normalizePurchaseRefundResponse(data: PurchaseRefundCallableResponse): {
  refund: PurchaseRefund;
  summary: PurchaseRefundSummary;
} {
  return {
    refund: mapPurchaseRefund(data.refund),
    summary: data.summary ?? {
      amountPaid: Number(data.amountPaid ?? 0),
      totalRefunded: Number(data.totalRefunded ?? 0),
      refundDue: Number(data.refundDue ?? 0),
    },
  };
}
