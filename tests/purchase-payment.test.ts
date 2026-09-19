import { describe, expect, it } from 'vitest';
import { calculatePaymentSettlement, derivePurchasePaymentStatus as deriveServerPurchasePaymentStatus } from '../functions/src/purchasePayments';
import { derivePurchasePaymentStatus as deriveClientPurchasePaymentStatus } from '@/features/purchases/utils/calculations';

describe('purchase payment status derivation', () => {
  it('marks an overpaid purchase as paid instead of partially paid', () => {
    expect(deriveServerPurchasePaymentStatus(330, 1500)).toBe('PAID');
    expect(deriveClientPurchasePaymentStatus(330, 1500)).toBe('PAID');
  });

  it('distinguishes unpaid and partially paid purchases', () => {
    expect(deriveServerPurchasePaymentStatus(330, 0)).toBe('UNPAID');
    expect(deriveServerPurchasePaymentStatus(330, 100)).toBe('PARTIALLY_PAID');
    expect(deriveClientPurchasePaymentStatus(330, 0)).toBe('UNPAID');
    expect(deriveClientPurchasePaymentStatus(330, 100)).toBe('PARTIALLY_PAID');
  });
});

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
