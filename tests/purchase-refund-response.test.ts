import { describe, expect, it } from 'vitest';
import { normalizePurchaseRefundResponse } from '../src/features/purchases/utils/refunds';

const refund = {
  id: 'refund-1',
  amount: '125.50',
  refundDate: '2026-09-19',
  refundMethod: 'UPI',
  reference: null,
  notes: null,
  recordedBy: 'user-1',
  createdAt: '2026-09-19T10:00:00.000Z',
};

describe('purchase refund callable response normalization', () => {
  it('normalizes the flat response returned by the deployed callable', () => {
    expect(normalizePurchaseRefundResponse({
      refund,
      amountPaid: 1500,
      totalRefunded: 125.5,
      refundDue: 1374.5,
    })).toEqual({
      refund: {
        id: 'refund-1',
        amount: 125.5,
        refundDate: '2026-09-19',
        refundMethod: 'UPI',
        recordedBy: 'user-1',
        createdAt: '2026-09-19T10:00:00.000Z',
      },
      summary: { amountPaid: 1500, totalRefunded: 125.5, refundDue: 1374.5 },
    });
  });

  it('preserves a nested summary when the callable returns the new shape', () => {
    expect(normalizePurchaseRefundResponse({
      refund,
      summary: { amountPaid: 1500, totalRefunded: 125.5, refundDue: 1374.5 },
      amountPaid: 0,
      totalRefunded: 0,
      refundDue: 0,
    }).summary).toEqual({ amountPaid: 1500, totalRefunded: 125.5, refundDue: 1374.5 });
  });
});
