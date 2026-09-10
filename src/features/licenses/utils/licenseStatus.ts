import { DerivedLicenseStatus, OrganizationLicense } from '../types';

/**
 * Calculates the derived license status based on the current date and license dates.
 * 
 * Rules:
 * - If no license or missing dates => 'not_assigned'
 * - If current date < startDate => 'not_yet_active'
 * - If current date > expiryDate => 'expired'
 * - If current date <= expiryDate and days until expiry <= 30 => 'expiring_soon'
 * - Otherwise => 'active'
 */
export function calculateLicenseStatus(
  license: Pick<OrganizationLicense, 'startDate' | 'expiryDate'> | null | undefined,
  referenceDate: Date = new Date()
): DerivedLicenseStatus {
  if (!license || !license.startDate || !license.expiryDate) {
    return 'not_assigned';
  }

  // Normalize reference date to midnight (local time)
  const today = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate()
  );

  const [sYear, sMonth, sDay] = license.startDate.split('-').map(Number);
  const startDate = new Date(sYear, sMonth - 1, sDay);

  const [eYear, eMonth, eDay] = license.expiryDate.split('-').map(Number);
  const expiryDate = new Date(eYear, eMonth - 1, eDay);

  // Check if start date is in the future
  if (today.getTime() < startDate.getTime()) {
    return 'not_yet_active';
  }

  // Check if expiry date has passed
  if (today.getTime() > expiryDate.getTime()) {
    return 'expired';
  }

  // Check if expiring within 30 days
  const diffTime = expiryDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 30 && diffDays >= 0) {
    return 'expiring_soon';
  }

  return 'active';
}

/**
 * Calculate the number of days remaining until expiry.
 * Returns negative if expired.
 */
export function getDaysUntilExpiry(
  expiryDateStr: string | undefined | null,
  referenceDate: Date = new Date()
): number | null {
  if (!expiryDateStr) return null;

  const today = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate()
  );

  const [eYear, eMonth, eDay] = expiryDateStr.split('-').map(Number);
  const expiryDate = new Date(eYear, eMonth - 1, eDay);

  const diffTime = expiryDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getLicenseStatusLabel(status: DerivedLicenseStatus): string {
  switch (status) {
    case 'not_assigned':
      return 'Not Assigned';
    case 'not_yet_active':
      return 'Not Yet Active';
    case 'active':
      return 'Active';
    case 'expiring_soon':
      return 'Expiring Soon';
    case 'expired':
      return 'Expired';
  }
}

export function getLicenseStatusBadgeVariant(
  status: DerivedLicenseStatus
): 'success' | 'warning' | 'critical' | 'info' | 'neutral' {
  switch (status) {
    case 'active':
      return 'success';
    case 'expiring_soon':
      return 'warning';
    case 'expired':
      return 'critical';
    case 'not_yet_active':
      return 'info';
    case 'not_assigned':
      return 'neutral';
  }
}
