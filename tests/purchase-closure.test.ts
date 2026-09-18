import { describe, expect, it } from 'vitest';
import { calculatePartialPurchaseTotals } from '../functions/src/purchaseClosure';

describe('partial purchase closure totals', () => {
  it('recalculates product, tax, and prorated freight from received quantities', () => {
    expect(calculatePartialPurchaseTotals([
      { quantityOrdered: 10, quantityReceived: 5, unitCost: 10, discountPercent: 0, taxRate: 5 },
    ], 120, 20)).toEqual({
      subtotal: 50,
      tax: 2.5,
      shippingFee: 60,
      handlingFee: 10,
      totalAmount: 122.5,
    });
  });

  it('aggregates received quantities across multiple products', () => {
    expect(calculatePartialPurchaseTotals([
      { quantityOrdered: 10, quantityReceived: 10, unitCost: 10, discountPercent: 0, taxRate: 5 },
      { quantityOrdered: 10, quantityReceived: 2, unitCost: 5, discountPercent: 10, taxRate: 12 },
    ], 30, 0)).toEqual({
      subtotal: 109,
      tax: 6.08,
      shippingFee: 22.55,
      handlingFee: 0,
      totalAmount: 137.63,
    });
  });

  it('requires at least one received unit before closing', () => {
    expect(() => calculatePartialPurchaseTotals([
      { quantityOrdered: 10, quantityReceived: 0, unitCost: 10, discountPercent: 0, taxRate: 5 },
    ], 0, 0)).toThrow('Receive at least one unit');
  });
});
