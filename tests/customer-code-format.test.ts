import { describe, expect, it } from 'vitest';
import { formatCustomerCode } from '../src/features/customers/utils/formatCustomerCode';

describe('formatCustomerCode', () => {
  it('renders the database-generated integer using the customer-facing customer prefix', () => {
    expect(formatCustomerCode(1)).toBe('CUST-1');
    expect(formatCustomerCode(42)).toBe('CUST-42');
  });
});
