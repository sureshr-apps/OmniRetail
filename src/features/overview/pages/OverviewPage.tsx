import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  CheckCircle2,
  PauseCircle,
  Clock,
  AlertTriangle,
  ArrowRight,
  SlidersHorizontal,
  RefreshCw,
  Store,
  Layers,
  ShoppingBag,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/shared/components/Button';
import { EmptyState } from '@/shared/components/EmptyState';
import { AddOrganizationModal } from '@/features/organizations/components/AddOrganizationModal';
import { RenewLicenseModal } from '@/features/licenses/components/RenewLicenseModal';
import { overviewService, formatRelativeCreatedDate } from '../services/OverviewService';
import { OverviewData, ExpiringLicenseItem } from '../types';
import { Organization } from '@/features/organizations/types';
import { cn } from '@/shared/utils/cn';

export function OverviewPage() {
  const navigate = useNavigate();

  // Data state
  const [data, setData] = useState<OverviewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add Organization Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Renew License Modal state
  const [selectedExpiringForRenew, setSelectedExpiringForRenew] = useState<ExpiringLicenseItem | null>(null);

  // Success notifications
  const [notification, setNotification] = useState<{ message: string; type: 'success' } | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await overviewService.getOverviewData();
      setData(result);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load platform overview data.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Clear notification after 4 seconds
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      setNotification(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [notification]);

  const handleAddOrgSuccess = async (createdOrg: Organization) => {
    setIsAddModalOpen(false);
    setNotification({
      message: `Organization "${createdOrg.name}" (${createdOrg.id}) successfully created.`,
      type: 'success',
    });
    await loadData();
  };

  const handleRenewSuccess = async () => {
    const renewedOrgName = selectedExpiringForRenew?.organization.name;
    setSelectedExpiringForRenew(null);
    setNotification({
      message: `License for ${renewedOrgName || 'organization'} was successfully renewed.`,
      type: 'success',
    });
    await loadData();
  };

  const getPlanIcon = (planName: string) => {
    const lower = planName.toLowerCase();
    if (lower.includes('enterprise')) {
      return <Layers className="w-3.5 h-3.5 text-tertiary" />;
    }
    if (lower.includes('multi-store') || lower.includes('professional')) {
      return <Store className="w-3.5 h-3.5 text-primary" />;
    }
    return <ShoppingBag className="w-3.5 h-3.5 text-text-muted" />;
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="flex items-center justify-between p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-semibold ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top Platform Control Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-elevated p-5 rounded-lg border border-border-subdued shadow-sm">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
            Platform Overview
          </h1>
          <p className="text-xs text-text-muted">
            Multi-tenant organization provisioning, and licensing status
          </p>
        </div>

        {/* Actions Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <Button
            id="btn-add-org"
            variant="primary"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 h-9 text-xs font-semibold shadow-sm"
          >
            <Building2 className="w-4 h-4" />
            <span>+ Add Organization</span>
          </Button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-critical flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-critical shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold">Error Loading Overview</span>
              <span className="text-xs text-rose-700 mt-0.5">{error}</span>
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={loadData} className="text-xs shrink-0">
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Retry
          </Button>
        </div>
      )}

      {/* Loading state skeleton */}
      {isLoading && !data && (
        <div className="space-y-6">
          {/* Skeleton Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-surface-elevated rounded-lg p-4 border border-border-subdued shadow-sm animate-pulse h-24 flex justify-between items-start">
                <div className="space-y-2">
                  <div className="h-2.5 bg-slate-200 rounded w-28"></div>
                  <div className="h-8 bg-slate-200 rounded w-16"></div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-slate-200"></div>
              </div>
            ))}
          </div>

          {/* Skeleton Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-7 bg-surface-elevated rounded-lg border border-border-subdued shadow-sm p-6 h-80 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-48 mb-6"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 bg-slate-100 rounded w-full"></div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 bg-surface-elevated rounded-lg border border-border-subdued shadow-sm p-6 h-80 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-44 mb-6"></div>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="h-20 bg-slate-100 rounded w-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Loaded View */}
      {data && (
        <>
          {/* Primary Metric Strip (4 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Card 1: Total Organizations */}
            <div className="bg-surface-elevated rounded-lg p-4 border border-border-subdued shadow-sm flex items-start justify-between hover:shadow-md transition-all group">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                  Total Organizations
                </span>
                <span className="text-3xl font-bold tracking-tight text-text-primary mt-1 font-mono">
                  {data.metrics.totalOrganizations}
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-surface-subdued flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Building2 className="w-5 h-5" />
              </div>
            </div>

            {/* Card 2: Active Organizations */}
            <div className="bg-surface-elevated rounded-lg p-4 border border-border-subdued shadow-sm flex items-start justify-between hover:shadow-md transition-all group">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                  Active Organizations
                </span>
                <span className="text-3xl font-bold tracking-tight text-text-primary mt-1 font-mono">
                  {data.metrics.activeOrganizations}
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            {/* Card 3: Suspended Organizations */}
            <div className="bg-surface-elevated rounded-lg p-4 border border-border-subdued shadow-sm flex items-start justify-between hover:shadow-md transition-all group">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                  Suspended Organizations
                </span>
                <span className="text-3xl font-bold tracking-tight text-critical mt-1 font-mono">
                  {data.metrics.suspendedOrganizations}
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center text-critical group-hover:bg-critical group-hover:text-white transition-colors">
                <PauseCircle className="w-5 h-5" />
              </div>
            </div>

            {/* Card 4: Licenses Expiring Soon */}
            <div className="bg-surface-elevated rounded-lg p-4 border border-border-subdued shadow-sm flex items-start justify-between hover:shadow-md transition-all group">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                  Licenses Expiring Soon
                </span>
                <span className="text-3xl font-bold tracking-tight text-tertiary mt-1 font-mono">
                  {data.metrics.licensesExpiringSoon}
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-white transition-colors">
                <Clock className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Two-Column Master Partition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left Column (Approx 60%: 7 cols of 12) - Recently Added Organizations */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="bg-surface-elevated rounded-lg border border-border-subdued shadow-sm overflow-hidden flex flex-col">
                {/* Section Header */}
                <div className="p-4 bg-surface-elevated border-b border-border-subdued flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-text-primary">
                        Recently Added Organizations
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Structured Organizations Table */}
                {data.recentlyAddedOrganizations.length === 0 ? (
                  <div className="p-6">
                    <EmptyState
                      icon={Building2}
                      title="No organizations found"
                      description="No tenant organizations have been registered yet."
                      actionLabel="+ Add Organization"
                      onAction={() => setIsAddModalOpen(true)}
                    />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-surface-subdued border-b border-border-subdued">
                          <th className="py-2.5 px-4 text-[10px] font-bold uppercase text-text-muted tracking-wider">
                            Organization
                          </th>
                          <th className="py-2.5 px-4 text-[10px] font-bold uppercase text-text-muted tracking-wider">
                            Plan
                          </th>
                          <th className="py-2.5 px-4 text-[10px] font-bold uppercase text-text-muted tracking-wider">
                            Status
                          </th>
                          <th className="py-2.5 pr-4 text-right text-[10px] font-bold uppercase text-text-muted tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-subdued">
                        {data.recentlyAddedOrganizations.map((org) => (
                          <tr
                            key={org.id}
                            className="hover:bg-row-hover transition-colors group"
                          >
                            {/* Organization Column */}
                            <td className="py-3 px-4">
                              <div className="flex flex-col">
                                <button
                                  type="button"
                                  onClick={() => navigate(`/organizations/${org.id}`)}
                                  className="text-left text-sm font-semibold text-text-primary hover:text-primary transition-colors cursor-pointer"
                                >
                                  {org.name}
                                </button>
                                <div className="flex items-center gap-1.5 mt-0.5 text-xs text-text-muted">
                                  <span className="font-mono text-[11px] text-text-muted">{org.organizationCode || '—'}</span>
                                  <span>•</span>
                                  <span>{formatRelativeCreatedDate(org.createdDate)}</span>
                                </div>
                              </div>
                            </td>

                            {/* Plan Column */}
                            <td className="py-3 px-4">
                              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-subdued text-xs font-medium text-text-secondary border border-border-subdued whitespace-nowrap">
                                {getPlanIcon(org.licensePlan)}
                                <span>{org.licensePlan}</span>
                              </div>
                            </td>

                            {/* Status Column */}
                            <td className="py-3 px-4 whitespace-nowrap">
                              {org.status === 'active' && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                  Active
                                </span>
                              )}
                              {org.status === 'suspended' && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold uppercase">
                                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                  Suspended
                                </span>
                              )}
                              {org.status === 'pending_setup' && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-300 text-[10px] font-bold uppercase">
                                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                                  Pending Setup
                                </span>
                              )}
                            </td>

                            {/* Actions Column */}
                            <td className="py-3 pr-4 text-right">
                              <button
                                type="button"
                                onClick={() => navigate(`/organizations/${org.id}`)}
                                title="Manage Organization"
                                className="p-1.5 rounded-md hover:bg-surface-subdued text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                              >
                                <SlidersHorizontal className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Footer Navigation Bar */}
                <div className="p-3 px-4 bg-surface-subdued border-t border-border-subdued flex items-center justify-between">
                  <span className="text-xs text-text-muted">
                    Showing {data.recentlyAddedOrganizations.length} of {data.totalOrganizationsCount} registered tenants
                  </span>
                  <button
                    type="button"
                    onClick={() => navigate('/organizations')}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-interactive transition-colors cursor-pointer"
                  >
                    <span>View All Organizations</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column (Approx 40%: 5 cols of 12) - Licenses Expiring Soon */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="bg-surface-elevated rounded-lg border border-border-subdued shadow-sm p-4 flex flex-col gap-3">
                {/* Header */}
                <div className="flex items-center justify-between pb-2 border-b border-border-subdued">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-critical">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-sm font-semibold text-text-primary leading-tight">
                        Licenses Expiring Soon
                      </h2>
                      <span className="text-xs text-text-muted leading-tight">
                        Licenses expiring within 30 days
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-rose-100 text-critical text-[10px] font-bold">
                    {data.expiringLicenses.length} TOTAL
                  </span>
                </div>

                {/* Priority Expiring Cards List */}
                <div className="flex flex-col gap-2.5">
                  {data.expiringLicenses.length === 0 ? (
                    <div className="py-8 px-4 text-center bg-surface-subdued rounded-lg border border-dashed border-border-subdued flex flex-col items-center justify-center">
                      <CheckCircle2 className="w-7 h-7 text-emerald-600 mb-2" />
                      <h4 className="text-xs font-semibold text-text-primary">
                        No Licenses Expiring Soon
                      </h4>
                      <p className="text-[11px] text-text-muted mt-0.5 max-w-xs leading-relaxed">
                        All active tenant licenses have more than 30 days of validity remaining.
                      </p>
                    </div>
                  ) : (
                    data.expiringLicenses.map((item) => (
                      <div
                        key={item.license.id}
                        className="bg-surface-subdued p-3.5 rounded-lg border border-border-subdued flex flex-col gap-2 hover:border-border-structural transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex flex-col min-w-0">
                            <button
                              type="button"
                              onClick={() => navigate(`/organizations/${item.organization.id}`)}
                              className="text-left text-sm font-semibold text-text-primary hover:text-primary transition-colors truncate block cursor-pointer"
                            >
                              {item.organization.name}
                            </button>
                            <span className="text-[11px] font-mono text-text-muted mt-0.5">
                              {item.organization.organizationCode || '—'} • {item.plan?.name || 'Assigned Plan'}
                            </span>
                          </div>
                          <span
                            className={cn(
                              'px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider whitespace-nowrap',
                              item.daysRemaining !== null && item.daysRemaining <= 7
                                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                : 'bg-surface-elevated text-text-primary border border-border-subdued'
                            )}
                          >
                            {item.daysRemaining === 0
                              ? 'Expires Today'
                              : item.daysRemaining === 1
                              ? 'Expires in 1 day'
                              : `Expires in ${item.daysRemaining} days`}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs text-text-secondary font-medium">
                            Exp: {item.formattedExpiryDate}
                          </span>
                          <button
                            type="button"
                            onClick={() => setSelectedExpiringForRenew(item)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary hover:bg-primary-interactive active:bg-primary-active text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Renew License</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Add Organization Workflow (reusing existing modal) */}
      <AddOrganizationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddOrgSuccess}
      />

      {/* Renew License Workflow (reusing existing modal) */}
      {selectedExpiringForRenew && (
        <RenewLicenseModal
          isOpen={!!selectedExpiringForRenew}
          onClose={() => setSelectedExpiringForRenew(null)}
          organizationId={selectedExpiringForRenew.organization.id}
          organizationName={selectedExpiringForRenew.organization.name}
          currentLicense={selectedExpiringForRenew.license}
          currentPlan={selectedExpiringForRenew.plan}
          onSuccess={handleRenewSuccess}
        />
      )}
    </div>
  );
}
