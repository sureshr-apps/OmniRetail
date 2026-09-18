import { describe, expect, it } from 'vitest';
import {
  calculateCancelledPurchaseAccounting,
  cancelPurchaseWithAccounting,
} from '../functions/src/purchaseCancellation';

describe('purchase cancellation accounting', () => {
  it('preserves cash already paid and clears the supplier payable', () => {
    expect(calculateCancelledPurchaseAccounting(100.006)).toEqual({ amountPaid: 100.01, outstandingAmount: 0 });
    expect(calculateCancelledPurchaseAccounting(-10)).toEqual({ amountPaid: 0, outstandingAmount: 0 });
  });

  it('locks the purchase and clears outstanding amount atomically', async () => {
    const calls: Array<{ sql: string; params?: readonly unknown[] }> = [];
    const client = {
      query: async (sql: string, params?: readonly unknown[]) => {
        calls.push({ sql, params });
        if (sql.startsWith('SELECT')) {
          return { rowCount: 1, rows: [{ status: 'ACTIVE', receipt_status: 'PARTIALLY_RECEIVED', amount_paid: '100.00' }] };
        }
        return { rowCount: 1, rows: [] };
      },
    } as any;

    await expect(cancelPurchaseWithAccounting(client, {
      organizationId: 'org-1',
      purchaseId: 'purchase-1',
      reason: 'Cancelled by operator',
    })).resolves.toEqual({ amountPaid: 100, outstandingAmount: 0 });

    expect(calls[0].sql).toContain('FOR UPDATE');
    expect(calls[1].sql).toContain('status = \'CANCELLED\'');
    expect(calls[1].sql).toContain('outstanding_amount = $2');
    expect(calls[1].params).toEqual(['purchase-1', 0, 'Cancelled by operator']);
  });

  it('blocks cancellation after full receipt or closure', async () => {
    const client = {
      query: async () => ({ rowCount: 1, rows: [{ status: 'CLOSED', receipt_status: 'RECEIVED', amount_paid: '0' }] }),
    } as any;

    await expect(cancelPurchaseWithAccounting(client, {
      organizationId: 'org-1',
      purchaseId: 'purchase-1',
    })).rejects.toMatchObject({
      code: 'PURCHASE_NOT_CANCELLABLE',
    });
  });
});
