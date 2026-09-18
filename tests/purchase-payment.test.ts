import { describe, expect, it } from 'vitest';
import { calculatePaymentSettlement } from '../functions/src/purchasePayments';

describe('purchase payment settlement', () => {
  it('settles a remaining balance and marks the purchase paid', () => {
    expect(calculatePaymentSettlement(350, 100, 250)).toEqual({
      amountPaid: 350,
      outstandingAmount: 0,
      paymentStatus: 'PAID',
    });
  });

  it('keeps a purchase partially paid after a smaller payment', () => {
    expect(calculatePaymentSettlement(350, 100, 50)).toEqual({
      amountPaid: 150,
      outstandingAmount: 200,
      paymentStatus: 'PARTIALLY_PAID',
    });
  });

  it('rejects overpayments and payments after settlement', () => {
    expect(() => calculatePaymentSettlement(350, 100, 250.01)).toThrow('cannot exceed');
    expect(() => calculatePaymentSettlement(350, 350, 1)).toThrow('already fully paid');
  });
});
