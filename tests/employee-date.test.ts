import { describe, expect, it } from 'vitest';
import { formatEmployeeDateForDisplay, parseEmployeeDate } from '@/features/employees/utils/date';

describe('employee date formatting', () => {
  it('formats persisted ISO dates as DD/MM/YYYY', () => {
    expect(formatEmployeeDateForDisplay('2026-09-15')).toBe('15/09/2026');
  });

  it('parses valid DD/MM/YYYY input into the persisted ISO format', () => {
    expect(parseEmployeeDate('15/09/2026')).toBe('2026-09-15');
  });

  it('rejects invalid dates and malformed input', () => {
    expect(parseEmployeeDate('31/02/2026')).toBeUndefined();
    expect(parseEmployeeDate('09/15/2026')).toBeUndefined();
  });
});
