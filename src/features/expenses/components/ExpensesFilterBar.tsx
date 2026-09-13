import React, { useRef, useEffect } from 'react';
import { ExpensePeriod } from '../types';

interface ExpensesFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  period: ExpensePeriod;
  onPeriodChange: (period: ExpensePeriod) => void;
  outlet: string;
  onOutletChange: (outlet: string) => void;
  category: string;
  onCategoryChange: (category: string) => void;
  status: string;
  onStatusChange: (status: string) => void;
  onResetFilters: () => void;
  filteredCount: number;
  totalCount: number;
}

export function ExpensesFilterBar({
  searchQuery,
  onSearchChange,
  period,
  onPeriodChange,
  outlet,
  onOutletChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  onResetFilters,
  filteredCount,
  totalCount,
}: ExpensesFilterBarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Global Ctrl+F listener to focus search input
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'f' || e.key === 'F')) {
        // Prevent default browser search if on page
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const periodLabelMap: Record<ExpensePeriod, string> = {
    'This Month': 'This Month (Oct 2024)',
    'Last Month': 'Last Month (Sep 2024)',
    'Last 7 Days': 'Last 7 Days',
    'Month to Date': 'Month to Date',
    'Custom Range': 'Custom Range',
    'All Time': 'All Time',
  };

  const periodConstraintMap: Record<ExpensePeriod, string> = {
    'This Month': 'Period: Oct 1 - Oct 31, 2024',
    'Last Month': 'Period: Sep 1 - Sep 30, 2024',
    'Last 7 Days': 'Period: Past 7 Days',
    'Month to Date': 'Period: Oct 1 - Present',
    'Custom Range': 'Period: Custom Range',
    'All Time': 'Period: All Time',
  };

  return (
    <div className="bg-surface-container-lowest p-space-base rounded-lg shadow-sm border border-outline-variant/30 flex flex-col gap-space-sm">
      {/* Controls row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm items-center">
        {/* Search */}
        <div className="md:col-span-4 relative">
          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
            search
          </span>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by expense #, category, payee, or ref..."
            className="w-full h-9 pl-8 pr-14 bg-surface-container-low/70 focus:bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-default text-body-default rounded-lg border border-outline-variant/30 outline-none focus:ring-1 focus:ring-primary transition-all"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] font-body-mono-num text-body-mono-num font-semibold bg-surface-container-high text-on-surface-variant">
            Ctrl+F
          </kbd>
        </div>

        {/* Date / Period Selector */}
        <div className="md:col-span-2 relative">
          <select
            value={period}
            onChange={(e) => onPeriodChange(e.target.value as ExpensePeriod)}
            className="w-full h-9 pl-8 pr-7 rounded-lg bg-surface-container-low/70 hover:bg-surface-container-low text-on-surface font-body-default text-body-default border border-outline-variant/30 outline-none appearance-none cursor-pointer truncate"
          >
            <option value="This Month">This Month (Oct 2024)</option>
            <option value="Last Month">Last Month (Sep 2024)</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Month to Date">Month to Date</option>
            <option value="All Time">All Time</option>
          </select>
          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px] pointer-events-none">
            date_range
          </span>
          <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px] pointer-events-none">
            expand_more
          </span>
        </div>

        {/* Outlet Filter */}
        <div className="md:col-span-2 relative">
          <select
            value={outlet}
            onChange={(e) => onOutletChange(e.target.value)}
            className="w-full h-9 px-space-sm pr-7 rounded-lg bg-surface-container-low/70 hover:bg-surface-container-low text-on-surface font-body-default text-body-default border border-outline-variant/30 outline-none appearance-none cursor-pointer truncate"
          >
            <option value="All Outlets">Outlet: All Outlets</option>
            <option value="Downtown Flagship #04">Downtown Flagship #04</option>
            <option value="Uptown Mall #12">Uptown Mall #12</option>
            <option value="Westside Mall #02">Westside Mall #02</option>
            <option value="Northside Mall #08">Northside Mall #08</option>
            <option value="Organization-wide">Organization-wide</option>
          </select>
          <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px] pointer-events-none">
            expand_more
          </span>
        </div>

        {/* Category Filter */}
        <div className="md:col-span-2 relative">
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full h-9 px-space-sm pr-7 rounded-lg bg-surface-container-low/70 hover:bg-surface-container-low text-on-surface font-body-default text-body-default border border-outline-variant/30 outline-none appearance-none cursor-pointer truncate"
          >
            <option value="All">Category: All</option>
            <option value="Utilities">Utilities</option>
            <option value="Store Supplies">Store Supplies</option>
            <option value="Equipment Maintenance">Equipment Maint.</option>
            <option value="Marketing">Marketing</option>
            <option value="Logistics">Logistics</option>
            <option value="Professional Services">Professional Serv.</option>
          </select>
          <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px] pointer-events-none">
            expand_more
          </span>
        </div>

        {/* Status Filter + Reset */}
        <div className="md:col-span-2 flex items-center gap-space-xs">
          <div className="relative flex-1">
            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full h-9 px-space-sm pr-7 rounded-lg bg-surface-container-low/70 hover:bg-surface-container-low text-on-surface font-body-default text-body-default border border-outline-variant/30 outline-none appearance-none cursor-pointer truncate"
            >
              <option value="Active (Exclude Voids)">Status: Active</option>
              <option value="All">Status: All</option>
              <option value="Approved">Approved</option>
              <option value="Pending Approval">Pending Approval</option>
              <option value="Draft">Draft</option>
              <option value="Rejected">Rejected</option>
              <option value="Voided">Voided</option>
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px] pointer-events-none">
              expand_more
            </span>
          </div>
          <button
            type="button"
            onClick={onResetFilters}
            title="Reset Filters"
            className="h-9 w-9 flex items-center justify-center rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant border border-outline-variant/30 transition-colors shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
          </button>
        </div>
      </div>

      {/* Active Filter Micro-Tags Row */}
      <div className="flex flex-wrap items-center gap-space-xs text-micro-label font-micro-label uppercase text-on-surface-variant pt-space-xs border-t border-outline-variant/20">
        <span className="text-outline font-bold">APPLIED CONSTRAINTS:</span>

        {/* Period Chip */}
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-low text-on-surface border border-outline-variant/30">
          <span>{periodConstraintMap[period] || periodLabelMap[period]}</span>
          {period !== 'This Month' && (
            <button
              type="button"
              onClick={() => onPeriodChange('This Month')}
              className="hover:text-error cursor-pointer flex items-center"
            >
              <span className="material-symbols-outlined text-[12px]">close</span>
            </button>
          )}
        </span>

        {/* Status Chip */}
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-low text-on-surface border border-outline-variant/30">
          <span>Status: {status}</span>
          {status !== 'Active (Exclude Voids)' && (
            <button
              type="button"
              onClick={() => onStatusChange('Active (Exclude Voids)')}
              className="hover:text-error cursor-pointer flex items-center"
            >
              <span className="material-symbols-outlined text-[12px]">close</span>
            </button>
          )}
        </span>

        {/* Store / Outlet Chip */}
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${
            outlet === 'All Outlets'
              ? 'bg-primary/10 text-primary font-bold border border-primary/20'
              : 'bg-surface-container-low text-on-surface border border-outline-variant/30'
          }`}
        >
          <span>
            {outlet === 'All Outlets' ? 'Store: All Active Stores (4)' : `Store: ${outlet}`}
          </span>
          {outlet !== 'All Outlets' && (
            <button
              type="button"
              onClick={() => onOutletChange('All Outlets')}
              className="hover:text-error cursor-pointer flex items-center"
            >
              <span className="material-symbols-outlined text-[12px]">close</span>
            </button>
          )}
        </span>

        {/* Category Chip (if filtered) */}
        {category !== 'All' && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-low text-on-surface border border-outline-variant/30">
            <span>Category: {category}</span>
            <button
              type="button"
              onClick={() => onCategoryChange('All')}
              className="hover:text-error cursor-pointer flex items-center"
            >
              <span className="material-symbols-outlined text-[12px]">close</span>
            </button>
          </span>
        )}

        {/* Search Chip (if active) */}
        {searchQuery.trim() && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-low text-on-surface border border-outline-variant/30">
            <span>Query: "{searchQuery}"</span>
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="hover:text-error cursor-pointer flex items-center"
            >
              <span className="material-symbols-outlined text-[12px]">close</span>
            </button>
          </span>
        )}

        <span className="ml-auto font-body-mono-num text-body-mono-num text-caption text-on-surface-variant lowercase">
          showing {filteredCount} of {totalCount} records
        </span>
      </div>
    </div>
  );
}
