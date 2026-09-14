const DAY_MILLISECONDS = 24 * 60 * 60 * 1000;

export type LicenseStatus =
  | 'not_assigned'
  | 'not_yet_active'
  | 'active'
  | 'expiring_soon'
  | 'expired';

function parseDateOnly(value: string): number {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return Number.NaN;
  return Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

export function deriveLicenseStatus(
  startDate: string | null | undefined,
  expiryDate: string | null | undefined,
  now = Date.now(),
): LicenseStatus {
  if (!startDate || !expiryDate) return 'not_assigned';

  const start = parseDateOnly(startDate);
  const expiry = parseDateOnly(expiryDate);
  if (!Number.isFinite(start) || !Number.isFinite(expiry)) return 'not_assigned';

  const today = Math.floor(now / DAY_MILLISECONDS) * DAY_MILLISECONDS;
  if (today < start) return 'not_yet_active';
  if (today > expiry) return 'expired';
  if ((expiry - today) / DAY_MILLISECONDS <= 30) return 'expiring_soon';
  return 'active';
}
