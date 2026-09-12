import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Users,
  Key,
  Edit2,
  Power,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle,
  Calendar,
  Layers,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { httpsCallable } from 'firebase/functions';
import { Button } from '@/shared/components/Button';
import { Badge } from '@/shared/components/Badge';
import { EmptyState } from '@/shared/components/EmptyState';
import { Organization } from '../types';
import { organizationService } from '../services/OrganizationService';
import { organizationAdminService } from '../services/OrganizationAdminService';
import { OrganizationOverviewTab } from '../components/OrganizationOverviewTab';
import { OrganizationAdministratorsTab } from '../components/OrganizationAdministratorsTab';
import { OrganizationLicenseTab } from '../components/OrganizationLicenseTab';
import { EditOrganizationModal } from '../components/EditOrganizationModal';
import { ChangeOrgStatusModal } from '../components/ChangeOrgStatusModal';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';

type TabType = 'overview' | 'administrators' | 'license';

export function OrganizationDetailsPage() {
  const { organizationId, tab } = useParams<{ organizationId: string; tab?: string }>();
  const navigate = useNavigate();

  const activeTab: TabType =
    tab === 'administrators' ? 'administrators' : tab === 'license' ? 'license' : 'overview';

  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adminCount, setAdminCount] = useState<number>(0);
  const [hasCopiedId, setHasCopiedId] = useState(false);

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [statusTarget, setStatusTarget] = useState<'active' | 'suspended' | null>(null);

  // Success Feedback
  const [feedback, setFeedback] = useState<{ message: string; type?: 'success' | 'info' } | null>(
    null
  );

  const loadOrganization = useCallback(async () => {
    if (!organizationId) return;

    setIsLoading(true);
    setError(null);
    try {
      const org = await organizationService.getOrganization(organizationId);
      setOrganization(org);

      // Also get initial admin count
      if (org) {
        const admins = await organizationAdminService.getAdministrators(org.id);
        setAdminCount(admins.length);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load organization record.');
    } finally {
      setIsLoading(false);
    }
  }, [organizationId]);

  useEffect(() => {
    loadOrganization();
  }, [loadOrganization]);

  const handleCopyOrgId = () => {
    if (organization?.id) {
      navigator.clipboard.writeText(organization.organizationCode || '');
      setHasCopiedId(true);
      setTimeout(() => setHasCopiedId(false), 2000);
    }
  };

  const handleOrgUpdated = (updatedOrg: Organization) => {
    setOrganization(updatedOrg);
    setFeedback({
      message: `Organization profile for "${updatedOrg.name}" updated successfully.`,
      type: 'success',
    });
  };

  const handleStatusChanged = (updatedOrg: Organization) => {
    setOrganization(updatedOrg);
    setFeedback({
      message: `Organization status changed to ${
        updatedOrg.status === 'active' ? 'Active' : 'Suspended'
      }.`,
      type: updatedOrg.status === 'active' ? 'success' : 'info',
    });
  };

  const handleDeleteOrganization = async () => {
    if (!organization || organization.status !== 'suspended') return;
    const confirmation = window.prompt(`This permanently deletes ${organization.name} and all associated data. Type DELETE ${organization.id} to confirm.`);
    if (confirmation !== `DELETE ${organization.id}`) return;
    try {
      await httpsCallable(getFirebaseClientServices().functions, 'deleteOrganization')({ organizationId: organization.id, confirmation });
      navigate('/organizations');
    } catch { setFeedback({ message: 'Unable to delete the organization. Ensure it is suspended and try again.', type: 'info' }); }
  };

  const handleTabClick = (nextTab: TabType) => {
    if (!organizationId) return;
    if (nextTab === 'overview') {
      navigate(`/organizations/${organizationId}`);
    } else {
      navigate(`/organizations/${organizationId}/${nextTab}`);
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <div className="h-4 bg-slate-200 rounded w-24 animate-pulse" />
          <span>/</span>
          <div className="h-4 bg-slate-200 rounded w-36 animate-pulse" />
        </div>

        {/* Header Skeleton */}
        <div className="bg-surface-elevated rounded-lg border border-border-subdued p-6 shadow-xs animate-pulse space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg bg-slate-200" />
              <div className="space-y-2">
                <div className="h-6 bg-slate-200 rounded w-48" />
                <div className="h-4 bg-slate-100 rounded w-32" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-8 bg-slate-200 rounded w-24" />
              <div className="h-8 bg-slate-200 rounded w-24" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!organization || error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/organizations">
            <Button variant="secondary" size="sm" className="gap-1.5 text-xs">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Organizations</span>
            </Button>
          </Link>
        </div>

        <div className="bg-surface-elevated rounded-lg border border-border-subdued shadow-xs p-10">
          <EmptyState
            icon={Building2}
            title="Organization Record Not Found"
            description={`No organization record was found matching ID "${organizationId}". It may have been relocated or the ID may be invalid.`}
            actionLabel="Return to Organizations List"
            onAction={() => navigate('/organizations')}
          />
        </div>
      </div>
    );
  }

  const initials = organization.name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="space-y-5">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-1.5 text-xs text-text-secondary">
          <Link
            to="/organizations"
            className="text-text-muted hover:text-text-primary transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Organizations</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-border-structural" />
          <span className="font-semibold text-text-primary truncate max-w-xs">
            {organization.name}
          </span>
          <span className="font-mono text-[11px] text-text-muted bg-surface-subdued px-1.5 py-0.2 rounded border border-border-structural">
            {organization.organizationCode || '—'}
          </span>
        </nav>

        <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-text-muted">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Tenant Cloud Cluster: IN-WEST-1</span>
        </span>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`text-xs p-3.5 rounded-lg flex items-center justify-between border shadow-xs transition-all ${
            feedback.type === 'info'
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : 'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2
              className={`w-4 h-4 shrink-0 ${
                feedback.type === 'info' ? 'text-amber-600' : 'text-emerald-600'
              }`}
            />
            <span className="font-medium">{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-text-muted hover:text-text-primary text-[11px] font-semibold underline ml-3"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Organization Header Shell */}
      <div className="bg-surface-elevated rounded-lg border border-border-subdued p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Organization Identity */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-lg bg-primary/10 text-primary font-bold text-xl flex items-center justify-center shrink-0 border border-primary/20 shadow-inner">
              {initials}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl font-bold text-text-primary tracking-tight">
                  {organization.name}
                </h1>

                {/* Organization Code / Copy */}
                <button
                  type="button"
                  onClick={handleCopyOrgId}
                  className="inline-flex items-center gap-1 text-xs font-mono font-semibold bg-surface-subdued text-text-secondary px-2 py-0.5 rounded border border-border-structural hover:bg-surface-subdued/80 transition-colors cursor-pointer"
                  title="Click to copy Organization code"
                >
                  <span>{organization.organizationCode || '—'}</span>
                  {hasCopiedId ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3 text-text-muted" />
                  )}
                </button>

                {/* Organization Status */}
                {organization.status === 'active' ? (
                  <Badge variant="success" withDot>
                    Active
                  </Badge>
                ) : (
                  <Badge variant="critical" withDot>
                    Suspended
                  </Badge>
                )}
              </div>

              {/* Header Metadata */}
              <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-text-secondary">
                <span className="flex items-center gap-1 text-text-muted">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Created {organization.createdDate}</span>
                </span>
                <span className="text-border-structural hidden sm:inline">•</span>
                <span>
                  Legal: <strong className="text-text-primary font-medium">{organization.legalEntityName}</strong>
                </span>
                <span className="text-border-structural hidden sm:inline">•</span>
                <span>
                  Tier: <strong className="text-text-primary font-medium">{organization.licensePlan}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            {/* Edit Organization */}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsEditModalOpen(true)}
              className="gap-1.5 text-xs"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Organization</span>
            </Button>

            {/* Suspend or Activate Action */}
            {organization.status === 'active' ? (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setStatusTarget('suspended')}
                className="gap-1.5 text-xs"
              >
                <Power className="w-3.5 h-3.5" />
                <span>Suspend</span>
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setStatusTarget('active')}
                className="gap-1.5 text-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Activate Organization</span>
              </Button>
            )}
            {organization.status === 'suspended' && (
              <Button variant="destructive" size="sm" onClick={handleDeleteOrganization} className="gap-1.5 text-xs">
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Organization</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-border-subdued flex items-center justify-between">
        <nav className="flex space-x-6" aria-label="Organization Navigation Tabs">
          {/* Overview Tab */}
          <button
            type="button"
            onClick={() => handleTabClick('overview')}
            className={`py-2.5 px-1 border-b-2 font-medium text-xs flex items-center gap-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-text-muted hover:text-text-primary hover:border-border-structural'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          {/* Administrators Tab */}
          <button
            type="button"
            onClick={() => handleTabClick('administrators')}
            className={`py-2.5 px-1 border-b-2 font-medium text-xs flex items-center gap-2 transition-colors ${
              activeTab === 'administrators'
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-text-muted hover:text-text-primary hover:border-border-structural'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Administrators</span>
            <span
              className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${
                activeTab === 'administrators'
                  ? 'bg-primary/10 text-primary'
                  : 'bg-surface-subdued text-text-muted'
              }`}
            >
              {adminCount}
            </span>
          </button>

          {/* License Tab */}
          <button
            type="button"
            onClick={() => handleTabClick('license')}
            className={`py-2.5 px-1 border-b-2 font-medium text-xs flex items-center gap-2 transition-colors ${
              activeTab === 'license'
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-text-muted hover:text-text-primary hover:border-border-structural'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>License</span>
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-2 text-[11px] text-text-muted">
          <span>Cloud Gateway: Connected</span>
          <span>•</span>
          <span>Sync Engine: Active</span>
        </div>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'overview' && (
          <OrganizationOverviewTab organization={organization} adminCount={adminCount} />
        )}

        {activeTab === 'administrators' && (
          <OrganizationAdministratorsTab
            organization={organization}
            onAdminCountChange={(cnt) => setAdminCount(cnt)}
          />
        )}

        {activeTab === 'license' && (
          <OrganizationLicenseTab
            organization={organization}
            onLicenseUpdated={loadOrganization}
          />
        )}
      </div>

      {/* Edit Organization Modal */}
      {organization && (
        <EditOrganizationModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          organization={organization}
          onSuccess={handleOrgUpdated}
        />
      )}

      {/* Change Organization Status (Suspend / Activate) Confirmation Modal */}
      {organization && statusTarget && (
        <ChangeOrgStatusModal
          isOpen={!!statusTarget}
          onClose={() => setStatusTarget(null)}
          organization={organization}
          targetStatus={statusTarget}
          onSuccess={handleStatusChanged}
        />
      )}
    </div>
  );
}
