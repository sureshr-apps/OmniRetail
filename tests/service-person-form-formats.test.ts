import { describe, expect, it } from 'vitest';
import {
  formatIndianPhone,
  isValidIndianPhone,
} from '@/features/service-persons/utils/formFormats';

describe('service person form formats', () => {
  it('formats Indian mobile numbers consistently', () => {
    expect(formatIndianPhone('9876543210')).toBe('+91 98765 43210');
    expect(formatIndianPhone('+919876543210')).toBe('+91 98765 43210');
    expect(isValidIndianPhone('+91 98765 43210')).toBe(true);
    expect(isValidIndianPhone('+91 12345 67890')).toBe(false);
  });

  it('keeps Service Person phone formatting independent of unavailable database fields', () => {
    expect(formatIndianPhone('9876543210')).toBe('+91 98765 43210');
  });
});
