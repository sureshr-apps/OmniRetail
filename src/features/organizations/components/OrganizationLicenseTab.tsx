import React, { useState, useEffect, useCallback } from 'react';
import {
  Key,
  ShieldAlert,
  ShieldCheck,
  Store,
  Users,
  Calendar,
  Coins,
  ArrowUpRight,
  RefreshCw,
  Edit3,
  AlertCircle,
  Clock,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { Organization } from '../types';
import { Badge } from '@/shared/components/Badge';
import { Button } from '@/shared/components/Button';
import { EmptyState } from '@/shared/components/EmptyState';
import { formatCurrency } from '@/shared/utils/currency';
import {
  LicenseWithPlan,
  OrganizationLicenseHistory,
  OrganizationLicense,
} from '@/features/licenses/types';
import { organizationLicenseService } from '@/features/licenses/services/OrganizationLicenseService';
import { licensePlanService } from '@/features/plans/services/LicensePlanService';
import {
  getLicenseStatusLabel,
  getLicenseStatusBadgeVariant,
  calculateLicenseStatus,
} from '@/features/licenses/utils/licenseStatus';
import { AssignLicenseModal } from '@/features/licenses/components/AssignLicenseModal';
import { ChangePlanModal } from '@/features/licenses/components/ChangePlanModal';
import { ModifyCommercialTermsModal } from '@/features/licenses/components/ModifyCommercialTermsModal';
import { RenewLicenseModal } from '@/features/licenses/components/RenewLicenseModal';
import { LicenseHistoryList } from '@/features/licenses/components/LicenseHistoryList';

export interface OrganizationLicenseTabProps {
  organization: Organization;
  onLicenseUpdated?: () => void;
}

export function OrganizationLicenseTab({
  organization,
  onLicenseUpdated,
}: OrganizationLicenseTabProps) {
  const [licenseData, setLicenseData] = useState<LicenseWithPlan | null>(null);
  const [history, setHistory] = useState<OrganizationLicenseHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal open states
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isChangePlanOpen, setIsChangePlanOpen] = useState(false);
  const [isModifyTermsOpen, setIsModifyTermsOpen] = useState(false);
  const [isRenewOpen, setIsRenewOpen] = useState(false);

  // Local feedback message
  const [feedback, setFeedback] = useState<string | null>(null);

  const loadLicenseData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [lic, hist] = await Promise.all([
        organizationLicenseService.getLicenseWithPlan(organization.id),
        organizationLicenseService.getLicenseHistory(organization.id),
      ]);
      setLicenseData(lic);
      setHistory(hist);
    } catch (err: any) {
      setError(err.message || 'Failed to load organization licensing data.');
    } finally {
      setIsLoading(false);
    }
  }, [organization.id]);

  useEffect(() => {
    loadLicenseData();
  }, [loadLicenseData]);

  const handleActionSuccess = async (message: string, updatedLicense: OrganizationLicense) => {
    setFeedback(message);
    // The mutation response is the canonical license; only the plan (which may
    // have changed) needs a targeted lookup. History is a separate,
    // server-appended audit log, so it's the one piece worth reloading.
    const updatedPlan = await licensePlanService.getPlan(updatedLicense.planId);
    setLicenseData({ license: updatedLicense, plan: updatedPlan, status: calculateLicenseStatus(updatedLicense) });
    setHistory(await organizationLicenseService.getLicenseHistory(organization.id));
    onLicenseUpdated?.();
    setTimeout(() => {
      setFeedback(null);
    }, 4000);
  };

  // Helper for computing contextual days description
  const getStatusDetail = (license: OrganizationLicense) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(license.startDate);
    start.setHours(0, 0, 0, 0);

    const expiry = new Date(license.expiryDate);
    expiry.setHours(0, 0, 0, 0);

    if (today < start) {
      const diffDays = Math.ceil((start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return `Scheduled to activate in ${diffDays} ${diffDays === 1 ? 'day' : 'days'} (${license.startDate})`;
    }

    if (today > expiry) {
      const diffDays = Math.ceil((today.getTime() - expiry.getTime()) / (1000 * 60 * 60 * 24));
      return `Expired ${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago on ${license.expiryDate}`;
    }

    const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays <= 30) {
      return `Expires in ${diffDays} ${diffDays === 1 ? 'day' : 'days'} (${license.expiryDate}) • Renewal recommended`;
    }

    return `Expires in ${diffDays} days (${license.expiryDate})`;
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-44 bg-surface-elevated rounded-lg border border-border-subdued" />
        <div className="h-64 bg-surface-elevated rounded-lg border border-border-subdued" />
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 text-rose-800 p-5 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <div>
            <div className="font-semibold text-xs text-rose-900">Unable to load license details</div>
            <div className="text-[11px] text-rose-700">{error}</div>
          </div>
        </div>
        <Button variant="secondary" size="sm" onClick={loadLicenseData}>
          Try Again
        </Button>
      </div>
    );
  }

  // 3. No-License State (Empty State)
  if (!licenseData || !licenseData.license) {
    return (
      <div className="space-y-4">
        <div className="bg-surface-elevated rounded-lg border border-border-subdued p-8 shadow-xs">
          <EmptyState
            icon={Key}
            title="No license assigned"
            description="This organization does not currently have an assigned license agreement. Platform usage limits (Maximum Stores and Maximum Users) are not established until a license plan is provisioned."
            actionLabel="Assign License"
            onAction={() => setIsAssignOpen(true)}
          />
        </div>

        {/* Modal */}
        <AssignLicenseModal
          isOpen={isAssignOpen}
          onClose={() => setIsAssignOpen(false)}
          organizationId={organization.id}
          organizationName={organization.name}
          onSuccess={(assigned) => handleActionSuccess('License successfully assigned to organization.', assigned)}
        />
      </div>
    );
  }

  const { license, plan } = licenseData;

  return (
    <div className="space-y-5">
      {/* Feedback Banner */}
      {feedback && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs p-3.5 rounded-lg flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">{feedback}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-[11px] font-semibold underline text-text-muted hover:text-text-primary"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main License Overview Card */}
      <div className="bg-surface-elevated rounded-lg border border-border-subdued shadow-xs overflow-hidden">
        {/* Top Header Bar: Status & Actions */}
        <div className="px-5 py-4 border-b border-border-subdued bg-surface-subdued/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-text-primary">
                  {plan ? plan.name : 'Unknown Plan'}
                </h3>
                <Badge variant={getLicenseStatusBadgeVariant(license.derivedStatus)} withDot>
                  {getLicenseStatusLabel(license.derivedStatus)}
                </Badge>
                {plan && (
                  <Badge variant="neutral" className="text-[10px]">
                    Level {plan.level}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-text-secondary mt-0.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-text-muted shrink-0" />
                <span>{getStatusDetail(license)}</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsChangePlanOpen(true)}
              className="gap-1.5 text-xs"
            >
              <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
              <span>Change Plan</span>
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsModifyTermsOpen(true)}
              className="gap-1.5 text-xs"
            >
              <Coins className="w-3.5 h-3.5 text-text-muted" />
              <span>Modify Commercial Terms</span>
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsRenewOpen(true)}
              className="gap-1.5 text-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Renew License</span>
            </Button>
          </div>
        </div>

        {/* Structured 2-Panel Grid: Entitlements (Read-Only) & Commercial Terms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border-subdued">
          {/* Panel 1: Plan Entitlements */}
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted">
                  Plan Entitlements
                </span>
                <div className="text-xs font-semibold text-text-primary mt-0.5">
                  Usage quotas defined by {plan?.name}
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-text-muted bg-surface-subdued px-2 py-0.5 rounded border border-border-structural">
                <Lock className="w-3 h-3" />
                <span>Defined by Plan</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Max Stores */}
              <div className="bg-surface-subdued/70 p-3.5 rounded-lg border border-border-structural/80 space-y-1">
                <div className="flex items-center justify-between text-text-muted">
                  <span className="text-[11px] font-medium">Maximum Stores</span>
                  <Store className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="text-xl font-bold text-text-primary">
                  {plan?.maxStores ?? 0}
                </div>
                <div className="text-[10px] text-text-muted">
                  {plan?.maxStores === 1 ? 'Single store outlet' : 'Maximum concurrent outlets'}
                </div>
              </div>

              {/* Max Users */}
              <div className="bg-surface-subdued/70 p-3.5 rounded-lg border border-border-structural/80 space-y-1">
                <div className="flex items-center justify-between text-text-muted">
                  <span className="text-[11px] font-medium">Maximum Users</span>
                  <Users className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="text-xl font-bold text-text-primary">
                  {plan?.maxUsers ?? 0}
                </div>
                <div className="text-[10px] text-text-muted">
                  Maximum user accounts allowed
                </div>
              </div>
            </div>

            <div className="text-[11px] text-text-secondary bg-surface-subdued/40 p-2.5 rounded border border-border-subdued leading-relaxed">
              Entitlements cannot be overridden at organization level. Organizations requiring higher capacity must move to a higher-level active plan via <strong className="font-semibold text-text-primary">Change Plan</strong>.
            </div>
          </div>

          {/* Panel 2: Commercial Agreement & Terms */}
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted">
                  Commercial Agreement
                </span>
                <div className="text-xs font-semibold text-text-primary mt-0.5">
                  Independently negotiated pricing & term
                </div>
              </div>
              <span className="font-mono text-[10px] text-text-muted bg-surface-subdued px-2 py-0.5 rounded border border-border-structural">
                {license.id}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Negotiated Price */}
              <div className="bg-surface-subdued/70 p-3.5 rounded-lg border border-border-structural/80 space-y-1 sm:col-span-2">
                <div className="flex items-center justify-between text-text-muted">
                  <span className="text-[11px] font-medium">Negotiated Price</span>
                  <Coins className="w-3.5 h-3.5 text-text-muted" />
                </div>
                <div className="text-xl font-bold text-text-primary font-mono">
                  {formatCurrency(license.negotiatedPrice, license.currency)}
                </div>
                <div className="text-[10px] text-text-muted">
                  Negotiated independently for this organization • Not fixed by plan catalog
                </div>
              </div>

              {/* Start Date */}
              <div className="bg-surface-subdued/70 p-3 rounded-lg border border-border-structural/80 space-y-1">
                <div className="text-[11px] font-medium text-text-muted">Agreement Start</div>
                <div className="text-xs font-mono font-bold text-text-primary">
                  {license.startDate}
                </div>
              </div>

              {/* Expiry Date */}
              <div className="bg-surface-subdued/70 p-3 rounded-lg border border-border-structural/80 space-y-1">
                <div className="text-[11px] font-medium text-text-muted">Agreement Expiry</div>
                <div className="text-xs font-mono font-bold text-text-primary">
                  {license.expiryDate}
                </div>
              </div>
            </div>

            <div className="text-[11px] text-text-secondary bg-surface-subdued/40 p-2.5 rounded border border-border-subdued flex items-center justify-between">
              <span>Currency: <strong className="font-semibold text-text-primary">{license.currency}</strong></span>
              <span>Status: <strong className="font-semibold text-text-primary">{getLicenseStatusLabel(license.derivedStatus)}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* License History Section */}
      <div className="bg-surface-elevated rounded-lg border border-border-subdued shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border-subdued flex items-center justify-between bg-surface-subdued/30">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                License History
              </h3>
              <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-surface-subdued text-text-secondary border border-border-structural">
                {history.length} {history.length === 1 ? 'Record' : 'Records'}
              </span>
            </div>
            <p className="text-[11px] text-text-secondary mt-0.5">
              Immutable audit log capturing plan entitlement snapshots, validity periods, and negotiated pricing.
            </p>
          </div>
        </div>

        <LicenseHistoryList history={history} />
      </div>

      {/* Change Plan Modal */}
      {isChangePlanOpen && plan && (
        <ChangePlanModal
          isOpen={isChangePlanOpen}
          onClose={() => setIsChangePlanOpen(false)}
          organizationId={organization.id}
          organizationName={organization.name}
          currentLicense={license}
          currentPlan={plan}
          onSuccess={(updated) => handleActionSuccess('Plan upgraded successfully.', updated)}
        />
      )}

      {/* Modify Commercial Terms Modal */}
      {isModifyTermsOpen && (
        <ModifyCommercialTermsModal
          isOpen={isModifyTermsOpen}
          onClose={() => setIsModifyTermsOpen(false)}
          organizationId={organization.id}
          organizationName={organization.name}
          currentLicense={license}
          onSuccess={(updated) => handleActionSuccess('Commercial terms updated successfully.', updated)}
        />
      )}

      {/* Renew License Modal */}
      {isRenewOpen && (
        <RenewLicenseModal
          isOpen={isRenewOpen}
          onClose={() => setIsRenewOpen(false)}
          organizationId={organization.id}
          organizationName={organization.name}
          currentLicense={license}
          currentPlan={plan}
          onSuccess={(updated) => handleActionSuccess('License renewed successfully.', updated)}
        />
      )}
    </div>
  );
}
