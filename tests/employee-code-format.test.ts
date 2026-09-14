import { describe, expect, it } from 'vitest';
import { formatEmployeeCode } from '../src/features/employees/utils/formatEmployeeCode';

describe('formatEmployeeCode', () => {
  it('renders the database-generated integer using the customer-facing employee prefix', () => {
    expect(formatEmployeeCode(1)).toBe('EMP-1');
    expect(formatEmployeeCode(42)).toBe('EMP-42');
  });
});
