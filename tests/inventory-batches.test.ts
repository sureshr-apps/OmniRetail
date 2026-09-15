import { describe, expect, it } from 'vitest';
import {
  allocateBatches,
  isStockTrackedProduct,
  operationRequestId,
  resolveBatchNumber,
  sortBatchesForAllocation,
  validateBatchDates,
  type InventoryBatchRow,
} from '../functions/src/inventoryBatches';

const batch = (overrides: Partial<InventoryBatchRow> = {}): InventoryBatchRow => ({
  id: 'batch-1',
  batchNumber: 'B-1',
  mfgDate: '2026-01-01',
  expiryDate: '2026-12-31',
  onHandQty: 10,
  receivedAt: '2026-01-02T00:00:00.000Z',
  ...overrides,
});

describe('inventory batch rules', () => {
  it('tracks stock for stockable and consumable products, but never service products', () => {
    expect(isStockTrackedProduct('STOCKABLE')).toBe(true);
    expect(isStockTrackedProduct('stockable')).toBe(true);
    expect(isStockTrackedProduct('CONSUMABLE')).toBe(true);
    expect(isStockTrackedProduct('consumable')).toBe(true);
    expect(isStockTrackedProduct('SERVICE')).toBe(false);
    expect(isStockTrackedProduct(undefined)).toBe(false);
  });

  it('normalizes explicit batch numbers and creates a safe number for dated stock', () => {
    expect(resolveBatchNumber('  lot-42  ', null)).toBe('LOT-42');
    expect(resolveBatchNumber('', null)).toBe('UNTRACKED');
    expect(resolveBatchNumber(null, '2026-12-31', () => '123e4567-e89b-12d3-a456-426614174000')).toBe('AUTO-123E4567E89B12D3A4564266');
    expect(resolveBatchNumber('', '2026-12-31', () => 'not-a-uuid')).toMatch(/^AUTO-NOTAUUID/);
  });

  it('sorts batches by earliest expiry, then receipt time, then id', () => {
    const sorted = sortBatchesForAllocation([
      batch({ id: 'later-id', expiryDate: '2026-09-30', receivedAt: '2026-02-01T00:00:00.000Z' }),
      batch({ id: 'same-date-late', expiryDate: '2026-09-30', receivedAt: '2026-02-02T00:00:00.000Z' }),
      batch({ id: 'same-date-early', expiryDate: '2026-09-30', receivedAt: '2026-02-01T00:00:00.000Z' }),
      batch({ id: 'no-expiry', expiryDate: null }),
      batch({ id: 'earliest', expiryDate: '2026-09-20' }),
    ]);
    expect(sorted.map((item) => item.id)).toEqual(['earliest', 'later-id', 'same-date-early', 'same-date-late', 'no-expiry']);
  });

  it('allocates across multiple batches using FEFO and leaves no-expiry stock last', () => {
    const allocations = allocateBatches([
      batch({ id: 'late', batchNumber: 'LATE', expiryDate: '2026-12-31', onHandQty: 4 }),
      batch({ id: 'early', batchNumber: 'EARLY', expiryDate: '2026-09-20', onHandQty: 3 }),
      batch({ id: 'none', batchNumber: 'NONE', expiryDate: null, onHandQty: 20 }),
    ], 6, '2026-09-15');
    expect(allocations).toEqual([
      { batchId: 'early', batchNumber: 'EARLY', quantity: 3, expiryDate: '2026-09-20' },
      { batchId: 'late', batchNumber: 'LATE', quantity: 3, expiryDate: '2026-12-31' },
    ]);
  });

  it('excludes expired stock from sales but permits it for controlled stock reductions', () => {
    const batches = [
      batch({ id: 'expired', expiryDate: '2026-09-14', onHandQty: 8 }),
      batch({ id: 'valid', expiryDate: '2026-10-01', onHandQty: 2 }),
    ];
    expect(allocateBatches(batches, 2, '2026-09-15').map((item) => item.batchId)).toEqual(['valid']);
    expect(allocateBatches(batches, 8, '2026-09-15', true).map((item) => item.batchId)).toEqual(['expired']);
    expect(() => allocateBatches(batches, 3, '2026-09-15')).toThrow('saleable units are available');
  });

  it('rejects zero, negative, non-finite, and over-available quantities', () => {
    for (const quantity of [0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(() => allocateBatches([batch()], quantity)).toThrow('quantity must be greater than zero');
    }
    expect(() => allocateBatches([batch({ onHandQty: 1 })], 2)).toThrow('saleable units are available');
  });

  it('validates date-only values, manufacturing order, and expiry policy', () => {
    expect(() => validateBatchDates('2026-09-10', '2026-09-20', '2026-09-15')).not.toThrow();
    expect(() => validateBatchDates('2026-09-20', '2026-09-10', '2026-09-15')).toThrow('cannot be after');
    expect(() => validateBatchDates('2026-02-30', '2026-09-20', '2026-09-15')).toThrow('YYYY-MM-DD');
    expect(() => validateBatchDates('2026-09-10', '09/20/2026', '2026-09-15')).toThrow('YYYY-MM-DD');
    expect(() => validateBatchDates('2026-09-10', '2026-09-14', '2026-09-15')).toThrow('Expired stock');
    expect(() => validateBatchDates('2026-09-16', '2026-09-20', '2026-09-15')).toThrow('future');
  });

  it('keeps movement request IDs deterministic and within the database limit', () => {
    expect(operationRequestId('checkout-123', 'SALE-1')).toBe('checkout-123-SALE-1');
    expect(operationRequestId('unsafe id/with spaces', 'VOID-1')).toBe('unsafe-id-with-spaces-VOID-1');
    expect(operationRequestId('x'.repeat(200), 'SALE-1').length).toBeLessThanOrEqual(128);
  });
});
