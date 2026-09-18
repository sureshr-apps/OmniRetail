import { describe, expect, it } from 'vitest';
import { PurchaseItem, PurchaseReceiptLine } from '@/features/purchases/types';
import { validatePurchaseReceiptLines } from '@/features/purchases/utils/receiving';

const items: PurchaseItem[] = [
  {
    id: 'line-red',
    productId: 'product-red',
    productCode: 'PRD-RED',
    productName: 'Red Shirt',
    sku: 'RED-S',
    quantityOrdered: 10,
    quantityReceived: 0,
    unitCost: 100,
    discountPercent: 0,
    taxRate: 5,
    taxAmount: 50,
    lineTotal: 1050,
  },
  {
    id: 'line-blue',
    productId: 'product-blue',
    productCode: 'PRD-BLUE',
    productName: 'Blue Shirt',
    sku: 'BLUE-S',
    quantityOrdered: 10,
    quantityReceived: 0,
    unitCost: 100,
    discountPercent: 0,
    taxRate: 5,
    taxAmount: 50,
    lineTotal: 1050,
  },
];

const batch = (quantity: number, batchNumber: string, mfgDate = '', expiryDate = '') => ({
  quantity,
  batchNumber,
  mfgDate,
  expiryDate,
});

describe('purchase stock inward validation', () => {
  it('accepts different batch details for different products', () => {
    const receipts: PurchaseReceiptLine[] = [
      { lineId: 'line-red', batches: [batch(10, 'RED-01', '2026-01-01', '2027-01-01')] },
      { lineId: 'line-blue', batches: [batch(10, 'BLUE-01', '2026-02-01', '2027-02-01')] },
    ];

    expect(validatePurchaseReceiptLines(items, receipts)).toBeNull();
  });

  it('accepts one product split across multiple batches', () => {
    const receipts: PurchaseReceiptLine[] = [{
      lineId: 'line-red',
      batches: [
        batch(6, 'RED-01', '2026-01-01', '2027-01-01'),
        batch(4, 'RED-02', '2026-02-01', '2027-02-01'),
      ],
    }];

    expect(validatePurchaseReceiptLines(items, receipts)).toBeNull();
  });

  it('rejects receiving more than the pending quantity', () => {
    const receipts: PurchaseReceiptLine[] = [{ lineId: 'line-red', batches: [batch(11, 'RED-01')] }];

    expect(validatePurchaseReceiptLines(items, receipts)).toContain('cannot receive more than 10');
  });

  it('rejects a manufacturing date after the expiry date', () => {
    const receipts: PurchaseReceiptLine[] = [{ lineId: 'line-red', batches: [batch(5, 'RED-01', '2027-02-01', '2027-01-01')] }];

    expect(validatePurchaseReceiptLines(items, receipts)).toContain('manufacturing date cannot be after');
  });

  it('rejects an empty receipt submission', () => {
    expect(validatePurchaseReceiptLines(items, [])).toContain('at least one product');
    expect(validatePurchaseReceiptLines(items, [{ lineId: 'line-red', batches: [batch(0, 'RED-01')] }])).toContain('at least one product');
  });
});
