import { describe, expect, it } from 'vitest';
import {
  formatIndianPhone,
  isValidIndianPhone,
} from '@/features/service-persons/utils/formFormats';
import { readFileSync } from 'node:fs';

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

  it('does not auto-populate the country code while adding a service person', () => {
    const modal = readFileSync(new URL('../src/features/service-persons/components/ServicePersonModal.tsx', import.meta.url), 'utf8');
    expect(modal).toContain('isEditing ? formatIndianPhone(e.target.value) : e.target.value');
  });
});
