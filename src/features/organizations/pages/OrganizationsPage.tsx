import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Search,
  Plus,
  ArrowRight,
  AlertCircle,
  RotateCcw,
  CheckCircle2,
  X,
} from 'lucide-react';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { Select } from '@/shared/components/Select';
import { Badge } from '@/shared/components/Badge';
import { Pagination } from '@/shared/components/Pagination';
import { EmptyState } from '@/shared/components/EmptyState';
import { AddOrganizationModal } from '../components/AddOrganizationModal';
import {
  Organization,
  OrganizationStatus,
  LicenseStatus,
} from '../types';
import { organizationService, deriveOrganizationView } from '../services/OrganizationService';
import {
  getLicenseStatusLabel,
  getLicenseStatusBadgeVariant,
} from '@/features/licenses/utils/licenseStatus';
import { upsertById } from '@/shared/utils/listState';

const PAGE_SIZE = 8;

export function OrganizationsPage() {
  const navigate = useNavigate();

  // Query state
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [orgStatus, setOrgStatus] = useState<OrganizationStatus | 'all'>('all');
  const [licenseStatus, setLicenseStatus] = useState<LicenseStatus | 'all'>('all');
  const [page, setPage] = useState(1);

  // Data state
  const [allOrganizations, setAllOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add Organization Modal & Feedback State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [successBanner, setSuccessBanner] = useState<{ name: string; id: string } | null>(null);

  const organizationView = useMemo(() => deriveOrganizationView(allOrganizations, {
    search: debouncedSearch,
    organizationStatus: orgStatus,
    licenseStatus,
    page,
    pageSize: PAGE_SIZE,
  }), [allOrganizations, debouncedSearch, orgStatus, licenseStatus, page]);
  const organizations = organizationView.items;
  const totalItems = organizationView.total;
  const totalPages = organizationView.totalPages;

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset page on search change
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  // Load the directory once; search, filters, and pagination are derived
  // locally while the page is open.
  const fetchOrganizations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setAllOrganizations(await organizationService.getAllOrganizations());
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while loading organizations.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  // Handler for status filter changes
  const handleOrgStatusChange = (val: string) => {
    setOrgStatus(val as OrganizationStatus | 'all');
    setPage(1);
  };

  const handleLicenseStatusChange = (val: string) => {
    setLicenseStatus(val as LicenseStatus | 'all');
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearch('');
    setDebouncedSearch('');
    setOrgStatus('all');
    setLicenseStatus('all');
    setPage(1);
  };

  const handleOrgCreated = (newOrg: Organization) => {
    setSuccessBanner({ name: newOrg.name, id: newOrg.id });
    setAllOrganizations((current) => upsertById(current, newOrg));
    setPage(1);
  };

  const isFiltered = debouncedSearch !== '' || orgStatus !== 'all' || licenseStatus !== 'all';

  return (
    <div className="space-y-4">
      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-text-primary flex items-center gap-2">
            <span>Organizations</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-surface-subdued text-text-muted border border-border-structural">
              {totalItems} total
            </span>
          </h1>
          <p className="text-xs text-text-secondary mt-0.5">
            Manage tenant retail businesses, cloud quotas, and provisioned store outlets
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          className="gap-1.5 self-start sm:self-auto text-xs"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          <span>Add Organization</span>
        </Button>
      </div>

      {/* Success Notification Banner */}
      {successBanner && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs p-3 rounded-lg flex items-center justify-between shadow-xs transition-all">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Organization <strong className="font-semibold">{successBanner.name}</strong> created
              successfully with ID{' '}
              <span className="font-mono font-bold bg-emerald-100/70 px-1.5 py-0.5 rounded border border-emerald-300">
                {successBanner.id}
              </span>
              .
            </span>
          </div>
          <button
            onClick={() => setSuccessBanner(null)}
            className="text-emerald-700 hover:text-emerald-900 p-1 rounded"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="bg-surface-elevated p-3 rounded-lg border border-border-subdued shadow-xs flex flex-col md:flex-row md:items-center gap-2.5">
        {/* Search Input */}
        <div className="flex-1">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search organizations, IDs, admin email..."
            icon={<Search className="w-4 h-4" />}
            className="h-9 text-xs"
          />
        </div>

        {/* Filters Group */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Org Status Filter */}
          <div className="w-40 sm:w-44 shrink-0">
            <Select
              options={[
                { value: 'all', label: 'All Org Statuses' },
                { value: 'active', label: 'Active Only' },
                { value: 'suspended', label: 'Suspended Only' },
              ]}
              value={orgStatus}
              onChange={(e) => handleOrgStatusChange(e.target.value)}
            />
          </div>

          {/* License Status Filter */}
          <div className="w-44 sm:w-48 shrink-0">
            <Select
              options={[
                { value: 'all', label: 'All License Statuses' },
                { value: 'active', label: 'License: Active' },
                { value: 'expiring_soon', label: 'License: Expiring Soon' },
                { value: 'expired', label: 'License: Expired' },
                { value: 'not_yet_active', label: 'License: Not Yet Active' },
                { value: 'not_assigned', label: 'License: Not Assigned' },
              ]}
              value={licenseStatus}
              onChange={(e) => handleLicenseStatusChange(e.target.value)}
            />
          </div>

          {/* Reset Filters */}
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="text-xs text-text-muted hover:text-text-primary gap-1 shrink-0"
              title="Reset all search queries and filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </Button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-surface-elevated rounded-lg border border-border-subdued shadow-xs overflow-hidden">
        {/* Error State */}
        {error && (
          <div className="p-8 text-center flex flex-col items-center justify-center">
            <AlertCircle className="w-8 h-8 text-critical mb-2" />
            <h3 className="text-sm font-semibold text-text-primary">Failed to load organizations</h3>
            <p className="text-xs text-text-secondary max-w-sm mt-1 mb-3">{error}</p>
            <Button variant="secondary" size="sm" onClick={fetchOrganizations}>
              Retry Query
            </Button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && !error && (
          <div className="divide-y divide-border-subdued">
            <div className="bg-surface-subdued px-4 py-2.5 flex items-center justify-between border-b border-border-subdued">
              <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider">
                Loading tenant directory...
              </span>
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="px-4 py-3.5 flex items-center justify-between animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-slate-200" />
                  <div className="space-y-1.5">
                    <div className="h-3.5 bg-slate-200 rounded w-36" />
                    <div className="h-2.5 bg-slate-100 rounded w-24" />
                  </div>
                </div>
                <div className="h-4 bg-slate-100 rounded w-20 hidden md:block" />
                <div className="h-4 bg-slate-100 rounded w-28 hidden lg:block" />
                <div className="h-4 bg-slate-200 rounded w-16" />
              </div>
            ))}
          </div>
        )}

        {/* Data Table */}
        {!isLoading && !error && organizations.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="h-8 bg-surface-subdued border-b border-border-subdued text-[10px] uppercase font-bold text-text-muted tracking-wider select-none">
                  <th className="px-4 py-2">Organization / Business</th>
                  <th className="px-4 py-2">Org Code</th>
                  <th className="px-4 py-2 hidden sm:table-cell">Primary Administrator</th>
                  <th className="px-4 py-2 hidden md:table-cell">Current Plan</th>
                  <th className="px-4 py-2">License Status</th>
                  <th className="px-4 py-2 hidden lg:table-cell">License Expiry</th>
                  <th className="px-4 py-2 hidden xl:table-cell">Org Status</th>
                  <th className="px-4 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subdued text-xs text-text-primary">
                {organizations.map((org) => {
                  const initials = org.name
                    .split(' ')
                    .map((n) => n[0])
                    .filter(Boolean)
                    .slice(0, 2)
                    .join('')
                    .toUpperCase();

                  return (
                    <tr
                      key={org.id}
                      onClick={() => navigate(`/organizations/${org.id}`)}
                      className="hover:bg-row-hover transition-colors cursor-pointer group"
                    >
                      {/* Organization Name + Initials Badge */}
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 border border-primary/20 group-hover:border-primary/40 transition-colors">
                            {initials}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-text-primary group-hover:text-primary transition-colors truncate">
                              {org.name}
                            </div>
                            <div className="text-[11px] text-text-muted truncate">
                              {org.contactInfo.city ? `${org.contactInfo.city}, ${org.contactInfo.state || ''}` : org.legalEntityName}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Organization ID */}
                      <td className="px-4 py-2.5">
                        <span className="font-mono text-xs font-semibold text-text-secondary bg-surface-subdued px-1.5 py-0.5 rounded border border-border-structural/70">
                          {org.organizationCode || '—'}
                        </span>
                      </td>

                      {/* Primary Administrator */}
                      <td className="px-4 py-2.5 hidden sm:table-cell">
                        {org.primaryAdmin ? (
                          <div className="min-w-0">
                            <div className="font-medium text-text-primary truncate">
                              {org.primaryAdmin.name}
                            </div>
                            <div className="text-[11px] text-text-muted truncate">
                              {org.primaryAdmin.email}
                            </div>
                          </div>
                        ) : (
                          <span className="text-text-muted italic text-[11px]">Unassigned</span>
                        )}
                      </td>

                      {/* Current Plan */}
                      <td className="px-4 py-2.5 hidden md:table-cell">
                        {org.licensePlan === 'Unassigned' ? (
                          <span className="text-text-muted italic text-[11px]">Unassigned</span>
                        ) : (
                          <span className="font-medium text-text-primary">{org.licensePlan}</span>
                        )}
                      </td>

                      {/* License Status */}
                      <td className="px-4 py-2.5">
                        <Badge variant={getLicenseStatusBadgeVariant(org.licenseStatus)} withDot>
                          {getLicenseStatusLabel(org.licenseStatus)}
                        </Badge>
                      </td>

                      {/* License Expiry */}
                      <td className="px-4 py-2.5 hidden lg:table-cell">
                        <span className="font-mono text-xs text-text-secondary">
                          {org.licenseExpiryDate || '—'}
                        </span>
                      </td>

                      {/* Organization Status */}
                      <td className="px-4 py-2.5 hidden xl:table-cell">
                        {org.status === 'active' && (
                          <Badge variant="success" withDot>
                            Active
                          </Badge>
                        )}
                        {org.status === 'suspended' && (
                          <Badge variant="critical" withDot>
                            Suspended
                          </Badge>
                        )}
                        {org.status === 'pending_setup' && (
                          <Badge variant="warning" withDot>
                            Pending
                          </Badge>
                        )}
                      </td>

                      {/* Created Date */}
                      <td className="px-4 py-2.5 hidden xl:table-cell text-text-secondary font-mono text-[11px]">
                        {org.createdDate}
                      </td>

                      {/* Action */}
                      <td className="px-4 py-2.5 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/organizations/${org.id}`);
                          }}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-active px-2 py-1 rounded hover:bg-primary/5 transition-colors"
                        >
                          <span>Manage</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty / No Results State */}
        {!isLoading && !error && organizations.length === 0 && (
          <div className="p-8">
            {isFiltered ? (
              <EmptyState
                icon={Search}
                title="No matching organizations found"
                description="No retail tenants matched your search criteria or status filter parameters. Try clearing your filters or refining your search term."
                actionLabel="Reset All Filters"
                onAction={handleResetFilters}
              />
            ) : (
              <EmptyState
                icon={Building2}
                title="No organizations registered yet"
                description="There are currently no tenant retail organizations in the system database. Get started by adding your first enterprise organization."
                actionLabel="+ Add First Organization"
                onAction={() => setIsAddModalOpen(true)}
              />
            )}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !error && totalItems > 0 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={PAGE_SIZE}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}
      </div>

      {/* Add Organization Modal */}
      <AddOrganizationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleOrgCreated}
      />
    </div>
  );
}
