import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { formatCurrency } from '@/features/customers/utils/calculations';
import { formatCustomerDateForDisplay, parseCustomerDate } from '@/features/customers/utils/date';

const addModal = readFileSync(new URL('../src/features/customers/components/AddCustomerModal.tsx', import.meta.url), 'utf8');
const editModal = readFileSync(new URL('../src/features/customers/components/EditCustomerModal.tsx', import.meta.url), 'utf8');

describe('customer India-focused form contract', () => {
  it('uses an explicit DD/MM/YYYY date field and converts valid dates to Data Connect format', () => {
    expect(addModal).toContain('placeholder="DD/MM/YYYY"');
    expect(addModal).not.toContain('type="date"');
    expect(formatCustomerDateForDisplay('2026-09-12')).toBe('12/09/2026');
    expect(parseCustomerDate('12/09/2026')).toBe('2026-09-12');
    expect(parseCustomerDate('31/02/2026')).toBeUndefined();
  });

  it('does not reintroduce US defaults or the retired preference/status controls', () => {
    for (const source of [addModal, editModal]) {
      expect(source).not.toContain('United States');
      expect(source).not.toContain("useState('TX')");
      expect(source).not.toContain('Preferred Contact Method');
      expect(source).not.toContain('Initial Account Status');
      expect(source).toContain('Document Type');
      expect(source).toContain('Document Value');
      expect(source).toContain('GST Number');
      expect(source).toContain('Credit Limit (₹)');
      expect(source).toContain('Email Address');
      expect(source).not.toContain('Email Address *');
      for (const retiredField of ['City', 'State / Province', 'Postal Code', 'Country']) {
        expect(source).not.toContain(retiredField);
      }
    }
  });

  it('formats customer amounts as Indian rupees', () => {
    expect(formatCurrency(1250)).toContain('₹');
    expect(formatCurrency(1250)).toContain('1,250.00');
  });
});
