import { describe, expect, it } from 'vitest';
import { formatSupplierCode } from '../src/features/suppliers/utils/formatSupplierCode';

describe('formatSupplierCode', () => {
  it('renders the database-generated integer using the customer-facing supplier prefix', () => {
    expect(formatSupplierCode(1)).toBe('SUP-1');
    expect(formatSupplierCode(42)).toBe('SUP-42');
  });
});
