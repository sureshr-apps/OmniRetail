import { describe, expect, it } from 'vitest';
import {
  calculatePurchaseRefundSummary,
  PurchaseRefundError,
  recordPurchaseRefund,
} from '../functions/src/purchaseRefunds';

describe('purchase refund ledger', () => {
  it('preserves the original payment and calculates the remaining refund due', () => {
    expect(calculatePurchaseRefundSummary(100, 0)).toEqual({ amountPaid: 100, totalRefunded: 0, refundDue: 100 });
    expect(calculatePurchaseRefundSummary(100, 40)).toEqual({ amountPaid: 100, totalRefunded: 40, refundDue: 60 });
    expect(calculatePurchaseRefundSummary(100, 120)).toEqual({ amountPaid: 100, totalRefunded: 120, refundDue: 0 });
  });

  it('requires the purchase to be cancelled before recording a refund', async () => {
    const client = {
      query: async (sql: string) => {
        if (sql.startsWith('SELECT id, supplier_id')) {
          return { rowCount: 1, rows: [{ id: 'purchase-1', supplier_id: 'supplier-1', status: 'ACTIVE', amount_paid: '100.00' }] };
        }
        throw new Error(`Unexpected query: ${sql}`);
      },
    } as any;

    await expect(recordPurchaseRefund(client, {
      organizationId: 'org-1',
      purchaseId: 'purchase-1',
      amount: 100,
      refundDate: '2026-09-19',
      refundMethod: 'UPI',
      recordedBy: 'user-1',
      requestId: 'refund-request-1',
    })).rejects.toMatchObject({ code: 'PURCHASE_NOT_CANCELLED' });
  });

  it('locks a cancelled purchase, records a partial refund, and leaves amount paid unchanged', async () => {
    const calls: Array<{ sql: string; params?: readonly unknown[] }> = [];
    const client = {
      query: async (sql: string, params?: readonly unknown[]) => {
        calls.push({ sql, params });
        if (sql.startsWith('SELECT id, supplier_id')) {
          return { rowCount: 1, rows: [{ id: 'purchase-1', supplier_id: 'supplier-1', status: 'CANCELLED', amount_paid: '100.00' }] };
        }
        if (sql.includes('SELECT id, purchase_id, amount, refund_date')) return { rowCount: 0, rows: [] };
        if (sql.includes('SUM(amount)')) {
          const total = calls.some((call) => call.sql.startsWith('INSERT INTO "purchase_refund"')) ? '40.00' : '0.00';
          return { rowCount: 1, rows: [{ total_refunded: total }] };
        }
        if (sql.startsWith('INSERT INTO "purchase_refund"')) {
          return {
            rowCount: 1,
            rows: [{ id: 'refund-1', amount: '40.00', refund_date: '2026-09-19', refund_method: 'UPI', reference: 'UTR-1', notes: null, recorded_by: 'user-1', created_at: '2026-09-19T10:00:00.000Z' }],
          };
        }
        throw new Error(`Unexpected query: ${sql}`);
      },
    } as any;

    const result = await recordPurchaseRefund(client, {
      organizationId: 'org-1',
      purchaseId: 'purchase-1',
      amount: 40,
      refundDate: '2026-09-19',
      refundMethod: 'UPI',
      reference: 'UTR-1',
      recordedBy: 'user-1',
      requestId: 'refund-request-1',
    });

    expect(result.summary).toEqual({ amountPaid: 100, totalRefunded: 40, refundDue: 60 });
    expect(result.refund.amount).toBe(40);
    expect(calls[0].sql).toContain('FOR UPDATE');
    expect(calls.some((call) => call.sql.startsWith('UPDATE "purchase"'))).toBe(false);
  });

  it('blocks a refund above the remaining due', async () => {
    const client = {
      query: async (sql: string) => {
        if (sql.startsWith('SELECT id, supplier_id')) return { rowCount: 1, rows: [{ id: 'purchase-1', supplier_id: 'supplier-1', status: 'CANCELLED', amount_paid: '100.00' }] };
        if (sql.includes('SELECT id, purchase_id, amount, refund_date')) return { rowCount: 0, rows: [] };
        if (sql.includes('SUM(amount)')) return { rowCount: 1, rows: [{ total_refunded: '60.00' }] };
        throw new Error(`Unexpected query: ${sql}`);
      },
    } as any;

    await expect(recordPurchaseRefund(client, {
      organizationId: 'org-1', purchaseId: 'purchase-1', amount: 41,
      refundDate: '2026-09-19', refundMethod: 'Supplier Credit', recordedBy: 'user-1', requestId: 'refund-request-2',
    })).rejects.toMatchObject({ code: 'OVER_REFUND' });
  });

  it('returns an existing refund for a retried request without inserting twice', async () => {
    const calls: string[] = [];
    const client = {
      query: async (sql: string) => {
        calls.push(sql);
        if (sql.startsWith('SELECT id, supplier_id')) return { rowCount: 1, rows: [{ id: 'purchase-1', supplier_id: 'supplier-1', status: 'CANCELLED', amount_paid: '100.00' }] };
        if (sql.includes('SELECT id, purchase_id, amount, refund_date')) return { rowCount: 1, rows: [{ id: 'refund-1', purchase_id: 'purchase-1', amount: '100.00', refund_date: '2026-09-19', refund_method: 'UPI', reference: null, notes: null, recorded_by: 'user-1', created_at: '2026-09-19T10:00:00.000Z' }] };
        if (sql.includes('SUM(amount)')) return { rowCount: 1, rows: [{ total_refunded: '100.00' }] };
        throw new Error(`Unexpected query: ${sql}`);
      },
    } as any;

    const result = await recordPurchaseRefund(client, {
      organizationId: 'org-1', purchaseId: 'purchase-1', amount: 100,
      refundDate: '2026-09-19', refundMethod: 'UPI', recordedBy: 'user-1', requestId: 'refund-request-1',
    });

    expect(result.refund.id).toBe('refund-1');
    expect(result.summary.refundDue).toBe(0);
    expect(calls.some((sql) => sql.startsWith('INSERT INTO'))).toBe(false);
  });

  it('exposes a stable domain error for a refund with no remaining due', () => {
    expect(new PurchaseRefundError('NO_REFUND_DUE', 'There is no supplier refund due for this purchase.')).toMatchObject({
      code: 'NO_REFUND_DUE',
    });
  });
});
