import { describe, expect, it } from 'vitest';
import { formatInventoryDateForDisplay, parseInventoryDate } from '@/features/inventory/utils/date';

describe('inventory batch date formatting', () => {
  it('formats persisted ISO dates as DD/MM/YYYY', () => {
    expect(formatInventoryDateForDisplay('2026-09-15')).toBe('15/09/2026');
  });

  it('parses valid DD/MM/YYYY input into the persisted ISO format', () => {
    expect(parseInventoryDate('15/09/2026')).toBe('2026-09-15');
  });

  it('rejects invalid dates and malformed input', () => {
    expect(parseInventoryDate('31/02/2026')).toBeUndefined();
    expect(parseInventoryDate('09/15/2026')).toBeUndefined();
  });
});
