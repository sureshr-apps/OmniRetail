import { describe, expect, it } from 'vitest';
import { formatOutletCode } from '../src/features/outlets/utils/formatOutletCode';

describe('formatOutletCode', () => {
  it('renders the database-generated integer using the customer-facing outlet prefix', () => {
    expect(formatOutletCode(1)).toBe('OUTLET-1');
    expect(formatOutletCode(42)).toBe('OUTLET-42');
  });
});
