import { Organization } from '@/features/organizations/types';
import { OrganizationLicense } from '@/features/licenses/types';
import { LicensePlan } from '@/features/plans/types';

export interface OverviewMetrics {
  totalOrganizations: number;
  activeOrganizations: number;
  suspendedOrganizations: number;
  licensesExpiringSoon: number;
}

export interface ExpiringLicenseItem {
  license: OrganizationLicense;
  organization: Organization;
  plan: LicensePlan | null;
  daysRemaining: number | null;
  formattedExpiryDate: string;
}

export interface OverviewData {
  metrics: OverviewMetrics;
  recentlyAddedOrganizations: Organization[];
  expiringLicenses: ExpiringLicenseItem[];
  totalOrganizationsCount: number;
}
