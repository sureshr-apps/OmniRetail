import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Layers,
  Search,
  RotateCcw,
  Pencil,
  Archive,
  Play,
  Store,
  Users,
  Shield,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  PlusCircle,
  Lightbulb,
  SlidersHorizontal,
  Trash2,
} from 'lucide-react';
import { licensePlanService } from '../services/LicensePlanService';
import { LicensePlan, PlanStatus } from '../types';
import { AddPlanModal } from '../components/AddPlanModal';
import { EditPlanModal } from '../components/EditPlanModal';
import { DeactivatePlanModal } from '../components/DeactivatePlanModal';
import { Badge } from '@/shared/components/Badge';
import { Button } from '@/shared/components/Button';

export function PlansPage() {
  const [plans, setPlans] = useState<LicensePlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | PlanStatus>('all');
  const [levelFilter, setLevelFilter] = useState<'all' | number>('all');
  const [selectedPlanIds, setSelectedPlanIds] = useState<string[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<LicensePlan | null>(null);
  const [deactivatingPlan, setDeactivatingPlan] = useState<LicensePlan | null>(null);

  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Fetch plans through service
  const fetchPlans = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await licensePlanService.getPlans({
        search,
        status: statusFilter,
        level: levelFilter,
      });
      setPlans(data);
    } catch (err) {
      console.error('Failed to load plans:', err);
    } finally {
      setIsLoading(false);
    }
  }, [search, statusFilter, levelFilter]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  // Keyboard shortcut listeners: Ctrl+/ for search, Alt+N for Add Plan
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.altKey && (e.key === 'n' || e.key === 'N')) {
        e.preventDefault();
        setIsAddModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Show auto-dismissing toast notification
  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification((curr) => (curr === message ? null : curr));
    }, 3500);
  };

  // Fast direct activate action
  const handleActivatePlan = async (plan: LicensePlan) => {
    try {
      const updated = await licensePlanService.changePlanStatus(plan.id, 'active');
      setPlans((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      showToast(`Plan "${updated.name}" is now active and available for new organizations.`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to activate plan.';
      showToast(msg);
    }
  };

  const handleDeletePlan = async (plan: LicensePlan) => {
    if (!window.confirm(`Delete the ${plan.name} plan? This is only possible when it has no license or history references.`)) return;
    try {
      await licensePlanService.deletePlan(plan.id);
      setPlans((prev) => prev.filter((p) => p.id !== plan.id));
      showToast(`Plan "${plan.name}" was deleted.`);
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Unable to delete the plan.');
    }
  };

  // Load Preset Defaults (for demo/testing)
  const handleLoadDefaults = async () => {
    try {
      setIsLoading(true);
      const defaults = await licensePlanService.resetToDefaults();
      setPlans(defaults);
      showToast('Plan catalog reset to default plans.');
    } finally {
      setIsLoading(false);
    }
  };

  // Metrics calculations
  const activeCount = useMemo(() => plans.filter((p) => p.status === 'active').length, [plans]);
  const inactiveCount = useMemo(() => plans.filter((p) => p.status === 'inactive').length, [plans]);
  const totalAssignedOrganizations = useMemo(
    () =>
      plans.reduce(
        (acc, p) => acc + (p.assignedOrganizationsCount ?? p.assignedTenantsCount ?? 0),
        0
      ),
    [plans]
  );
  const highestPlan = useMemo(() => {
    if (plans.length === 0) return null;
    return [...plans].sort((a, b) => b.level - a.level)[0];
  }, [plans]);
  const averageLimits = useMemo(() => {
    if (plans.length === 0) return { stores: 0, users: 0 };
    const totalStores = plans.reduce((sum, p) => sum + p.maxStores, 0);
    const totalUsers = plans.reduce((sum, p) => sum + p.maxUsers, 0);
    return {
      stores: (totalStores / plans.length).toFixed(1),
      users: Math.round(totalUsers / plans.length),
    };
  }, [plans]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setLevelFilter('all');
  };

  const isFiltered = search.trim() !== '' || statusFilter !== 'all' || levelFilter !== 'all';

  // Toggle select all
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedPlanIds(plans.map((p) => p.id));
    } else {
      setSelectedPlanIds([]);
    }
  };

  const handleToggleSelectRow = (id: string) => {
    setSelectedPlanIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-16 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-lg border border-slate-700 flex items-center gap-2 text-xs animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Page Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border-subdued">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-primary/10 text-primary flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-text-primary tracking-tight">Plans</h1>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Define the usage limits available to organizations.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            className="gap-1.5 text-xs shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Plan</span>
          </Button>
        </div>
      </div>

      {/* When Plans exist or are loading, show KPI matrix and table */}
      {plans.length > 0 || isFiltered ? (
        <>
          {/* KPI Summary Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Plans */}
            <div className="bg-surface-elevated p-4 rounded-lg border border-border-subdued shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-text-muted">
                <span className="text-[10px] uppercase font-bold tracking-wider">Total Plans</span>
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-text-primary">{plans.length}</span>
                <span className="text-xs text-emerald-700 font-semibold">{activeCount} Active</span>
                <span className="text-xs text-text-muted">/ {inactiveCount} Inactive</span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[11px] text-text-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                <span>Active and inactive plans</span>
              </div>
            </div>

            {/* Assigned Organizations */}
            <div className="bg-surface-elevated p-4 rounded-lg border border-border-subdued shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-text-muted">
                <span className="text-[10px] uppercase font-bold tracking-wider">
                  Assigned Organizations
                </span>
                <Store className="w-4 h-4" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-text-primary">
                  {totalAssignedOrganizations}
                </span>
                <span className="text-xs text-primary font-semibold">Assigned</span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[11px] text-text-secondary truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                <span>Organizations assigned to plans</span>
              </div>
            </div>

            {/* Highest Plan Limit */}
            <div className="bg-surface-elevated p-4 rounded-lg border border-border-subdued shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-text-muted">
                <span className="text-[10px] uppercase font-bold tracking-wider">
                  Highest Plan Limit
                </span>
                <Shield className="w-4 h-4" />
              </div>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-base font-bold text-text-primary">
                  {highestPlan ? `${highestPlan.maxStores} Stores` : '—'}
                </span>
                <span className="text-text-muted text-xs">/</span>
                <span className="text-xs font-mono font-medium text-text-primary">
                  {highestPlan ? `${highestPlan.maxUsers} Users` : '—'}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1 text-[11px] text-text-secondary">
                <span className="text-primary font-semibold">
                  {highestPlan ? `Level ${highestPlan.level}` : 'Level 0'}
                </span>
                <span className="text-text-muted">•</span>
                <span className="text-text-muted truncate">
                  {highestPlan ? `${highestPlan.name} limit` : 'No limits'}
                </span>
              </div>
            </div>

            {/* Average Allocation */}
            <div className="bg-surface-elevated p-4 rounded-lg border border-border-subdued shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-text-muted">
                <span className="text-[10px] uppercase font-bold tracking-wider">
                  Average Allocation
                </span>
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-base font-bold font-mono text-text-primary">
                  {averageLimits.stores} Stores
                </span>
                <span className="text-text-muted text-xs">/</span>
                <span className="text-xs font-mono font-medium text-text-primary">
                  {averageLimits.users} Users
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[11px] text-text-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
                <span>Per organization average</span>
              </div>
            </div>
          </div>

          {/* Table Container Card */}
          <div className="bg-surface-elevated rounded-lg border border-border-subdued shadow-xs overflow-hidden flex flex-col">
            {/* Toolbar Filters */}
            <div className="p-3.5 bg-surface-elevated border-b border-border-subdued flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="flex flex-1 flex-wrap items-center gap-2.5">
                {/* Search Input */}
                <div className="relative min-w-[260px] max-w-md flex-1">
                  <Search className="w-4 h-4 text-text-muted absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search plans by name or description (Ctrl+/)"
                    className="w-full h-8 pl-8 pr-12 text-xs bg-surface-subdued rounded border border-border-subdued text-text-primary placeholder:text-text-muted focus:outline-none focus:bg-surface-elevated focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                  <kbd className="absolute right-2 top-1/2 -translate-y-1/2 bg-surface-elevated border border-border-subdued px-1.5 py-0.5 rounded text-[9px] font-mono text-text-muted select-none pointer-events-none">
                    Ctrl+/
                  </kbd>
                </div>

                {/* Status Dropdown */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'all' | PlanStatus)}
                  className="h-8 px-2.5 text-xs bg-surface-subdued hover:bg-surface-subdued/80 text-text-primary border border-border-subdued rounded cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                {/* Level Dropdown */}
                <select
                  value={levelFilter}
                  onChange={(e) =>
                    setLevelFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))
                  }
                  className="h-8 px-2.5 text-xs bg-surface-subdued hover:bg-surface-subdued/80 text-text-primary border border-border-subdued rounded cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                >
                  <option value="all">All Levels</option>
                  <option value={1}>Level 1</option>
                  <option value={2}>Level 2</option>
                  <option value={3}>Level 3</option>
                  <option value={4}>Level 4</option>
                  <option value={0}>Level 0 (Inactive)</option>
                </select>

                {/* Reset Filters button */}
                {isFiltered && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResetFilters}
                    className="h-8 text-xs text-text-muted hover:text-text-primary gap-1 shrink-0"
                    title="Reset filters"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </Button>
                )}
              </div>
            </div>

            {/* Table Surface */}
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse select-text">
                <thead>
                  <tr className="h-8 bg-surface-subdued border-b border-border-subdued text-[10px] uppercase font-bold text-text-muted tracking-wider select-none">
                    <th className="w-10 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={
                          plans.length > 0 && selectedPlanIds.length === plans.length
                        }
                        onChange={handleSelectAll}
                        className="w-3.5 h-3.5 rounded text-primary accent-primary cursor-pointer"
                      />
                    </th>
                    <th className="px-4 py-2">Plan Name</th>
                    <th className="px-4 py-2 min-w-[240px]">Description</th>
                    <th className="px-4 py-2">Level</th>
                    <th className="px-4 py-2 text-right">Maximum Stores</th>
                    <th className="px-4 py-2 text-right">Maximum Users</th>
                    <th className="px-4 py-2 text-center">Status</th>
                    <th className="px-4 py-2">Last Updated</th>
                    <th className="px-4 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subdued text-xs text-text-primary">
                  {plans.map((plan) => {
                    const isSelected = selectedPlanIds.includes(plan.id);

                    return (
                      <tr
                        key={plan.id}
                        className={`h-10 hover:bg-row-hover transition-colors ${
                          isSelected ? 'bg-primary/5' : ''
                        } ${plan.status === 'inactive' ? 'opacity-85' : ''}`}
                      >
                        {/* Checkbox */}
                        <td className="px-3 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleSelectRow(plan.id)}
                            className="w-3.5 h-3.5 rounded text-primary accent-primary cursor-pointer"
                          />
                        </td>

                        {/* Plan Name */}
                        <td className="px-4 py-2.5 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                plan.status === 'inactive'
                                  ? 'bg-slate-400'
                                  : plan.level === 1
                                  ? 'bg-emerald-500'
                                  : plan.level === 2
                                  ? 'bg-primary'
                                  : plan.level === 3
                                  ? 'bg-blue-600'
                                  : 'bg-purple-600'
                              }`}
                            />
                            <span className="font-semibold text-text-primary">
                              {plan.name}
                            </span>
                          </div>
                        </td>

                        {/* Description */}
                        <td className="px-4 py-2.5 text-text-secondary max-w-sm truncate">
                          {plan.description || '—'}
                        </td>

                        {/* Level */}
                        <td className="px-4 py-2.5 whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-subdued border border-border-subdued text-[11px] text-text-secondary">
                            <span className="font-mono font-bold text-primary">
                              Level {plan.level}
                            </span>
                          </div>
                        </td>

                        {/* Maximum Stores (Right aligned) */}
                        <td className="px-4 py-2.5 text-right font-mono font-medium text-text-primary whitespace-nowrap">
                          {plan.maxStores} {plan.maxStores === 1 ? 'Store' : 'Stores'}
                        </td>

                        {/* Maximum Users (Right aligned) */}
                        <td className="px-4 py-2.5 text-right font-mono font-medium text-text-primary whitespace-nowrap">
                          {plan.maxUsers} Users
                        </td>

                        {/* Status */}
                        <td className="px-4 py-2.5 text-center whitespace-nowrap">
                          <Badge
                            variant={plan.status === 'active' ? 'success' : 'neutral'}
                            withDot
                          >
                            {plan.status === 'active' ? 'ACTIVE' : 'INACTIVE'}
                          </Badge>
                        </td>

                        {/* Last Updated */}
                        <td className="px-4 py-2.5 font-mono text-[11px] text-text-secondary whitespace-nowrap">
                          {plan.updatedAt}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-2.5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            {/* Edit Action */}
                            <button
                              type="button"
                              onClick={() => setEditingPlan(plan)}
                              className="p-1.5 rounded hover:bg-surface-subdued text-text-muted hover:text-primary transition-colors"
                              title="Edit Plan"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>

                            {/* Deactivate / Activate Action */}
                            {plan.status === 'active' ? (
                              <button
                                type="button"
                                onClick={() => setDeactivatingPlan(plan)}
                                className="p-1.5 rounded hover:bg-rose-50 text-text-muted hover:text-critical transition-colors"
                                title="Deactivate Plan"
                              >
                                <Archive className="w-3.5 h-3.5" />
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleActivatePlan(plan)}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider transition-colors"
                                title="Activate Plan"
                              >
                                <Play className="w-3 h-3" />
                                <span>Activate</span>
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleDeletePlan(plan)}
                              className="p-1.5 rounded hover:bg-rose-50 text-text-muted hover:text-rose-600 transition-colors"
                              title="Delete Plan"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Empty results during active search/filter */}
            {!isLoading && plans.length === 0 && (
              <div className="py-12 flex flex-col items-center justify-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-surface-subdued flex items-center justify-center text-text-muted mb-2 border border-border-subdued">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-text-primary">
                  No matching plans found
                </h3>
                <p className="text-xs text-text-secondary max-w-sm mt-1">
                  No plans matched your search or status query. Try clearing or refining your criteria.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleResetFilters}
                  className="mt-4 text-xs"
                >
                  Reset Filters
                </Button>
              </div>
            )}

            {/* Table Footer / Pagination */}
            <div className="px-4 py-2.5 bg-surface-subdued border-t border-border-subdued flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-secondary">
              <div className="flex items-center gap-3">
                <span>
                  Showing <strong className="text-text-primary font-semibold">{plans.length}</strong> of{' '}
                  <strong className="text-text-primary font-semibold">{plans.length}</strong> plans
                </span>
                <div className="h-3 w-px bg-border-subdued hidden sm:block" />
                <div className="flex items-center gap-1 text-[11px] text-text-muted">
                  <span>Rows per page:</span>
                  <span className="font-mono font-semibold text-text-primary">25</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[11px] font-mono font-semibold text-text-primary">
                  Page 1 of 1
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Empty State Main Stage */
        <div className="bg-surface-elevated rounded-xl border border-border-subdued shadow-xs overflow-hidden flex flex-col">
          {/* Status Micro Header */}
          <div className="px-6 py-2.5 bg-surface-subdued border-b border-border-subdued flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[10px] uppercase font-bold tracking-widest text-text-muted">
                Plan Catalog
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>Plan Management Active</span>
            </div>
          </div>

          {/* Core Visual Slate */}
          <div className="p-8 sm:p-14 flex flex-col items-center justify-center text-center">
            <div className="w-full max-w-2xl py-8 px-6 sm:px-12 rounded-xl bg-surface-subdued/50 border border-dashed border-border-subdued flex flex-col items-center">
              {/* Vector Illustration */}
              <div className="relative w-24 h-24 mb-5 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" />
                <svg
                  className="w-20 h-20 text-primary relative z-10"
                  fill="none"
                  viewBox="0 0 96 96"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="20" cy="24" fill="currentColor" fillOpacity="0.25" r="1.5" />
                  <circle cx="48" cy="24" fill="currentColor" fillOpacity="0.25" r="1.5" />
                  <circle cx="76" cy="24" fill="currentColor" fillOpacity="0.25" r="1.5" />
                  <circle cx="20" cy="72" fill="currentColor" fillOpacity="0.25" r="1.5" />
                  <circle cx="48" cy="72" fill="currentColor" fillOpacity="0.25" r="1.5" />
                  <circle cx="76" cy="72" fill="currentColor" fillOpacity="0.25" r="1.5" />
                  <path d="M48 64L22 51L48 38L74 51L48 64Z" fill="#dae2fd" fillOpacity="0.6" />
                  <path
                    d="M22 51L48 64L74 51M22 56L48 69L74 56"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeOpacity="0.4"
                    strokeWidth="2"
                  />
                  <path
                    d="M22 43L48 56L74 43"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeOpacity="0.7"
                    strokeWidth="2"
                  />
                  <path
                    d="M48 48L18 33L48 18L78 33L48 48Z"
                    fill="#86f2e4"
                    fillOpacity="0.3"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 33L48 48L78 33"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <circle cx="48" cy="33" fill="currentColor" r="3.5" />
                  <path
                    d="M48 18V12M78 33H84M18 33H12"
                    stroke="currentColor"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                  />
                  <rect
                    fill="#005c55"
                    fillOpacity="0.1"
                    height="10"
                    rx="2"
                    width="24"
                    x="36"
                    y="5"
                  />
                  <path d="M41 10H55" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Headings */}
              <div className="flex flex-col gap-1.5 max-w-lg mb-6">
                <h2 className="text-lg font-bold text-text-primary tracking-tight">
                  No plans created yet
                </h2>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Create a plan to define the usage limits available to organizations. Establish foundational capacity limits including Maximum Stores and Maximum Users.
                </p>
              </div>

              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Button
                  variant="primary"
                  onClick={() => setIsAddModalOpen(true)}
                  className="gap-2 shadow-sm text-xs"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>+ Add Plan</span>
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleLoadDefaults}
                  className="gap-1.5 text-xs"
                >
                  <Layers className="w-3.5 h-3.5 text-text-muted" />
                  <span>Load Default Plans</span>
                </Button>
              </div>

              {/* Auxiliary Helper Shortcut */}
              <div className="mt-5 flex items-center gap-1.5 text-[11px] text-text-muted">
                <span>Quick shortcut:</span>
                <span className="px-1.5 py-0.5 rounded bg-surface-elevated font-mono text-[10px] text-text-primary font-bold border border-border-subdued">
                  Alt + N
                </span>
                <span>anywhere to create new plan</span>
              </div>
            </div>
          </div>

          {/* Guidance Cards */}
          <div className="p-6 bg-surface-subdued/30 border-t border-border-subdued space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-text-primary">
                <Lightbulb className="w-4 h-4 text-primary" />
                <span>Plan Configuration Guidance</span>
              </div>
              <span className="text-[11px] text-text-muted">
                Key principles for plan management
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Usage Limits */}
              <div className="bg-surface-elevated rounded-xl p-4 flex flex-col justify-between border border-border-subdued shadow-xs relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary" />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                      <Store className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[10px] text-text-muted font-bold">
                      RULE_01
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-text-primary">Usage Limits</h4>
                    <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">
                      Plans define limits: <strong className="text-text-primary">Maximum Stores</strong> and <strong className="text-text-primary">Maximum Users</strong>. When an organization reaches these boundaries, existing stores and users continue working while adding new ones is restricted until upgraded.
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-2 border-t border-border-subdued flex items-center justify-between text-[10px] text-text-muted">
                  <span className="flex items-center gap-1 text-primary font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    Operational guard
                  </span>
                  <span className="font-mono font-bold">Limits</span>
                </div>
              </div>

              {/* Card 2: Plan Progression (Levels) */}
              <div className="bg-surface-elevated rounded-xl p-4 flex flex-col justify-between border border-border-subdued shadow-xs relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-600" />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-blue-700 border border-blue-200">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[10px] text-text-muted font-bold">
                      RULE_02
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-text-primary">Plan Progression (Levels)</h4>
                    <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">
                      Assign explicit numerical sequence levels (e.g., Level 1 Starter, Level 2 Professional, Level 3 Enterprise). This hierarchy defines organization upgrade paths.
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-2 border-t border-border-subdued flex items-center justify-between text-[10px] text-text-muted">
                  <span className="flex items-center gap-1 text-blue-700 font-semibold">
                    <ArrowRight className="w-3 h-3" />
                    Rank-ordered progression
                  </span>
                  <span className="font-mono font-bold">Ordered Levels</span>
                </div>
              </div>

              {/* Card 3: License Decoupling */}
              <div className="bg-surface-elevated rounded-xl p-4 flex flex-col justify-between border border-border-subdued shadow-xs relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber-500" />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded bg-amber-50 flex items-center justify-center text-amber-700 border border-amber-200">
                      <Shield className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[10px] text-text-muted font-bold">
                      RULE_03
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-text-primary">Pricing Decoupling</h4>
                    <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">
                      Pricing, contractual billing, and custom discount agreements are decoupled from plan limits. Rates are negotiated and bound individually per organization.
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-2 border-t border-border-subdued flex items-center justify-between text-[10px] text-text-muted">
                  <span className="flex items-center gap-1 text-amber-700 font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    Commercial flexibility
                  </span>
                  <span className="font-mono font-bold">Independent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Plan Modal */}
      <AddPlanModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={(newPlan) => {
          setPlans((prev) => [...prev, newPlan]);
          showToast(`Plan "${newPlan.name}" created and added to catalog.`);
        }}
      />

      {/* Edit Plan Modal */}
      <EditPlanModal
        isOpen={!!editingPlan}
        onClose={() => setEditingPlan(null)}
        plan={editingPlan}
        onSuccess={(updatedPlan) => {
          setPlans((prev) => prev.map((p) => (p.id === updatedPlan.id ? updatedPlan : p)));
          showToast(`Plan "${updatedPlan.name}" updated successfully.`);
        }}
      />

      {/* Deactivate Plan Modal */}
      <DeactivatePlanModal
        isOpen={!!deactivatingPlan}
        onClose={() => setDeactivatingPlan(null)}
        plan={deactivatingPlan}
        onSuccess={(updatedPlan) => {
          setPlans((prev) => prev.map((p) => (p.id === updatedPlan.id ? updatedPlan : p)));
          showToast(`Plan "${updatedPlan.name}" deactivated.`);
        }}
      />
    </div>
  );
}
