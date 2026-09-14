import { describe, expect, it } from 'vitest';
import {
  formatIndianDate,
  formatIndianDateInput,
  formatIndianPhone,
  isValidIndianPhone,
  parseIndianDate,
} from '@/features/service-persons/utils/formFormats';

describe('service person form formats', () => {
  it('formats Indian mobile numbers consistently', () => {
    expect(formatIndianPhone('9876543210')).toBe('+91 98765 43210');
    expect(formatIndianPhone('+919876543210')).toBe('+91 98765 43210');
    expect(isValidIndianPhone('+91 98765 43210')).toBe(true);
    expect(isValidIndianPhone('+91 12345 67890')).toBe(false);
  });

  it('formats and validates dates as DD/MM/YYYY while submitting ISO dates', () => {
    expect(formatIndianDate('2026-09-14')).toBe('14/09/2026');
    expect(formatIndianDateInput('14092026')).toBe('14/09/2026');
    expect(parseIndianDate('14/09/2026')).toBe('2026-09-14');
    expect(parseIndianDate('31/02/2026')).toBeUndefined();
  });
});
