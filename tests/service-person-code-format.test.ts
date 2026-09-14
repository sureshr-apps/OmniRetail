import { describe, expect, it } from 'vitest';
import { formatServicePersonCode } from '../src/features/service-persons/utils/formatServicePersonCode';

describe('formatServicePersonCode', () => {
  it('renders the database-generated integer using the customer-facing service-person prefix', () => {
    expect(formatServicePersonCode(1)).toBe('SVC-1');
    expect(formatServicePersonCode(42)).toBe('SVC-42');
  });
});
