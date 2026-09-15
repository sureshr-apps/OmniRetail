import React from 'react';
import { EmployeeStatus, AssignmentScope, LoginAccessStatus } from '../types';

interface EmployeeFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: 'All' | EmployeeStatus;
  onStatusFilterChange: (status: 'All' | EmployeeStatus) => void;
  scopeFilter: 'All' | AssignmentScope;
  onScopeFilterChange: (scope: 'All' | AssignmentScope) => void;
  loginFilter: 'All' | LoginAccessStatus;
  onLoginFilterChange: (login: 'All' | LoginAccessStatus) => void;
  outletFilter: string;
  onOutletFilterChange: (outlet: string) => void;
  availableOutlets: string[];
  onExportCsv: () => void;
  isFiltered: boolean;
  onClearFilters: () => void;
}

export function EmployeeFilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  scopeFilter,
  onScopeFilterChange,
  loginFilter,
  onLoginFilterChange,
  outletFilter,
  onOutletFilterChange,
  availableOutlets,
  onExportCsv,
  isFiltered,
  onClearFilters,
}: EmployeeFilterBarProps) {
  return (
    <div className="bg-surface-container-lowest p-space-base rounded-lg border border-outline-variant/30 shadow-xs flex flex-col gap-space-base select-none">
      {/* Search Input */}
      <div className="relative w-full">
        <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-on-surface-variant pointer-events-none">
          search
        </span>
        <input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-9 pl-9 pr-9 rounded bg-surface-container-low border border-outline-variant/40 font-body-default text-body-default text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          placeholder="Search by name, employee code, phone, or email..."
          type="text"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-2.5 text-on-surface-variant hover:text-on-surface cursor-pointer"
            title="Clear search"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        )}
      </div>

      {/* Filter Selects & Action Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-space-base w-full">
        <div className="flex flex-wrap items-center gap-space-sm w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value as 'All' | EmployeeStatus)}
            className="h-9 px-2.5 rounded bg-surface-container-low border border-outline-variant/40 font-caption text-caption text-on-surface focus:outline-none focus:border-primary shrink-0 cursor-pointer"
          >
            <option value="All">Status: All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          {/* Scope Filter */}
          <select
            value={scopeFilter}
            onChange={(e) => onScopeFilterChange(e.target.value as 'All' | AssignmentScope)}
            className="h-9 px-2.5 rounded bg-surface-container-low border border-outline-variant/40 font-caption text-caption text-on-surface focus:outline-none focus:border-primary shrink-0 cursor-pointer"
          >
            <option value="All">Scope: All</option>
            <option value="Entire Organization">Scope: Entire Org</option>
            <option value="Specific Outlets">Specific Outlet</option>
          </select>

          {/* Login Access Filter */}
          <select
            value={loginFilter}
            onChange={(e) => onLoginFilterChange(e.target.value as 'All' | LoginAccessStatus)}
            className="h-9 px-2.5 rounded bg-surface-container-low border border-outline-variant/40 font-caption text-caption text-on-surface focus:outline-none focus:border-primary shrink-0 cursor-pointer"
          >
            <option value="All">Login: All Access</option>
            <option value="Enabled">Enabled</option>
            <option value="Disabled">Disabled</option>
          </select>

          {/* Outlet Filter */}
          <select
            value={outletFilter}
            onChange={(e) => onOutletFilterChange(e.target.value)}
            className="h-9 px-2.5 rounded bg-surface-container-low border border-outline-variant/40 font-caption text-caption text-on-surface focus:outline-none focus:border-primary shrink-0 cursor-pointer max-w-[200px] truncate"
          >
            <option value="">Outlet: All Stores</option>
            {availableOutlets.map((outletName) => (
              <option key={outletName} value={outletName}>
                {outletName}
              </option>
            ))}
          </select>

          {isFiltered && (
            <button
              type="button"
              onClick={onClearFilters}
              className="h-9 px-2.5 rounded text-caption text-primary hover:bg-primary-container/10 transition-colors flex items-center gap-1 cursor-pointer font-medium"
            >
              <span className="material-symbols-outlined text-[14px]">filter_alt_off</span>
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Right side utility buttons */}
        <div className="flex items-center gap-space-sm shrink-0 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={onExportCsv}
            className="h-9 px-3 rounded border border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container-low font-caption text-caption text-on-surface flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Export CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
}
