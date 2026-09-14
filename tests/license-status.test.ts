import { describe, expect, it } from 'vitest';
import { deriveLicenseStatus } from '../functions/src/licenses/licenseStatus';

const atUtcNoon = (date: string): number => Date.parse(`${date}T12:00:00.000Z`);

describe('server-derived license status', () => {
  it('keeps a license valid through its expiry date', () => {
    expect(deriveLicenseStatus('2026-01-01', '2026-09-13', atUtcNoon('2026-09-13'))).toBe('expiring_soon');
    expect(deriveLicenseStatus('2026-01-01', '2026-09-13', atUtcNoon('2026-09-14'))).toBe('expired');
  });

  it('handles future, active, and missing license dates', () => {
    const now = atUtcNoon('2026-09-13');

    expect(deriveLicenseStatus('2026-10-01', '2027-10-01', now)).toBe('not_yet_active');
    expect(deriveLicenseStatus('2026-01-01', '2027-10-01', now)).toBe('active');
    expect(deriveLicenseStatus(undefined, undefined, now)).toBe('not_assigned');
    expect(deriveLicenseStatus('invalid', '2027-10-01', now)).toBe('not_assigned');
  });
});
