import { getFirebaseClientServices } from '@/infrastructure/firebase/client';
import { httpsCallable } from 'firebase/functions';
import { OverviewData, OverviewMetrics, ExpiringLicenseItem } from '../types';

export function formatCalendarDate(dateStr: string): string {
  if (!dateStr) return '—';
  const parts = dateStr.split('-');
  if (parts.length < 3) return dateStr;
  const [year, month, day] = parts.map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}

export function formatRelativeCreatedDate(dateStr: string, referenceDate: Date = new Date()): string {
  if (!dateStr) return 'Recently';
  const cleanDate = dateStr.split('T')[0];
  const parts = cleanDate.split('-');
  if (parts.length < 3) return dateStr;
  const [year, month, day] = parts.map(Number);
  const created = new Date(year, month - 1, day);
  const today = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());
  const diffTime = today.getTime() - created.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return 'Added today';
  if (diffDays === 1) return 'Added 1 day ago';
  if (diffDays < 7) return `Added ${diffDays} days ago`;
  if (diffDays < 14) return 'Added 1 week ago';
  return `Added ${formatCalendarDate(cleanDate)}`;
}

export interface IOverviewService {
  getOverviewData(): Promise<OverviewData>;
}

class OverviewServiceImpl implements IOverviewService {
  async getOverviewData(): Promise<OverviewData> {
    const result = await httpsCallable(getFirebaseClientServices().functions, 'getMasterAdminOverview')({});
    return result.data as OverviewData;
    /* legacy mock aggregation removed */
    /*

    // Fetch organizations, licenses, and plans in parallel
    const [orgsResult, allLicenses, allPlans] = await Promise.all([
      organizationService.getOrganizations({ page: 1, pageSize: 1000 }),
      organizationLicenseService.getAllLicenses(),
      licensePlanService.getPlans(),
    ]);

    const organizations = orgsResult.items;

    // 1. Calculate Summary Metrics
    const totalOrganizations = orgsResult.total;
    const activeOrganizations = organizations.filter((o) => o.status === 'active').length;
    const suspendedOrganizations = organizations.filter((o) => o.status === 'suspended').length;

    // Use centralized calculateLicenseStatus for expiring licenses
    const expiringLicenseRecords = allLicenses.filter(
      (license) => calculateLicenseStatus(license) === 'expiring_soon'
    );
    const licensesExpiringSoon = expiringLicenseRecords.length;

    const metrics: OverviewMetrics = {
      totalOrganizations,
      activeOrganizations,
      suspendedOrganizations,
      licensesExpiringSoon,
    };

    // 2. Resolve Recently Added Organizations (sorted by createdDate / createdAt descending)
    const sortedOrganizations = [...organizations].sort((a, b) => {
      const dateA = new Date(a.createdDate || (a as unknown as Record<string, unknown>).createdAt as string || 0).getTime();
      const dateB = new Date(b.createdDate || (b as unknown as Record<string, unknown>).createdAt as string || 0).getTime();
      return dateB - dateA;
    });

    const recentlyAddedOrganizations = sortedOrganizations.slice(0, 4);

    // 3. Resolve Licenses Expiring Soon with Organization & Plan metadata
    const planMap = new Map(allPlans.map((p) => [p.id, p]));
    const orgMap = new Map(organizations.map((o) => [o.id, o]));

    const expiringLicenses: ExpiringLicenseItem[] = [];

    for (const license of expiringLicenseRecords) {
      let org = orgMap.get(license.organizationId);
      if (!org) {
        org = (await organizationService.getOrganization(license.organizationId)) || undefined;
      }

      if (org) {
        const plan = planMap.get(license.planId) || (await licensePlanService.getPlan(license.planId));
        const daysRemaining = getDaysUntilExpiry(license.expiryDate);

        expiringLicenses.push({
          license,
          organization: org,
          plan: plan || null,
          daysRemaining,
          formattedExpiryDate: formatCalendarDate(license.expiryDate),
        });
      }
    }

    // Sort expiring licenses by urgency (fewest days remaining first)
    expiringLicenses.sort((a, b) => (a.daysRemaining ?? 999) - (b.daysRemaining ?? 999));

    return {
      metrics,
      recentlyAddedOrganizations,
      expiringLicenses,
      totalOrganizationsCount: totalOrganizations,
    }; */
  }
}

export const overviewService: IOverviewService = new OverviewServiceImpl();
