import { describe, expect, it } from 'vitest';
import { formatPurchaseDateForDisplay, parsePurchaseDate } from '@/features/purchases/utils/date';

describe('purchase batch date format', () => {
  it('formats persisted ISO dates as DD/MM/YYYY', () => {
    expect(formatPurchaseDateForDisplay('2026-09-15')).toBe('15/09/2026');
  });

  it('parses valid DD/MM/YYYY input into the persisted ISO format', () => {
    expect(parsePurchaseDate('15/09/2026')).toBe('2026-09-15');
  });

  it('rejects invalid or non-Indian date formats', () => {
    expect(parsePurchaseDate('31/02/2026')).toBeUndefined();
    expect(parsePurchaseDate('09/15/2026')).toBeUndefined();
  });
});
