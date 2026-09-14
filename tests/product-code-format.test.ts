import { describe, expect, it } from 'vitest';
import { formatProductCode } from '../src/features/products/utils/formatProductCode';

describe('formatProductCode', () => {
  it('renders the database-generated integer using the customer-facing product prefix', () => {
    expect(formatProductCode(1)).toBe('PR-1');
    expect(formatProductCode(42)).toBe('PR-42');
  });
});
