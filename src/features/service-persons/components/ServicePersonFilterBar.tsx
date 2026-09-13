import React from 'react';
import { ServicePersonStatus, ServicePersonScope } from '../types';

interface ServicePersonFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: 'All' | ServicePersonStatus;
  onStatusChange: (status: 'All' | ServicePersonStatus) => void;
  assignmentFilter: 'All' | ServicePersonScope;
  onAssignmentChange: (scope: 'All' | ServicePersonScope) => void;
  specializationFilter: string;
  onSpecializationChange: (spec: string) => void;
  specializations: string[];
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export function ServicePersonFilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  assignmentFilter,
  onAssignmentChange,
  specializationFilter,
  onSpecializationChange,
  specializations,
  onResetFilters,
  hasActiveFilters,
}: ServicePersonFilterBarProps) {
  return (
    <div className="bg-surface-container-lowest p-space-base rounded-xl shadow-sm mb-space-lg flex flex-col xl:flex-row gap-space-base items-stretch xl:items-center justify-between border border-outline-variant/20">
      {/* Search Bar */}
      <div className="relative flex-1 min-w-[280px]">
        <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-on-surface-variant pointer-events-none">
          search
        </span>
        <input
          id="searchInput"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, code, phone, email, or specialization..."
          className="w-full h-9 pl-9 pr-8 rounded-xl bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-2.5 text-on-surface-variant hover:text-on-surface"
            title="Clear search"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        )}
      </div>

      {/* Filter Dropdowns */}
      <div className="flex items-center gap-space-base flex-wrap">
        {/* Status Filter */}
        <div className="flex items-center gap-space-xs">
          <span className="font-caption text-caption text-on-surface-variant">Status:</span>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value as 'All' | ServicePersonStatus)}
            className="h-9 px-space-base rounded-xl bg-surface-container-low border border-outline-variant/50 font-caption text-caption text-on-surface focus:outline-none focus:border-primary"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Assignment Filter */}
        <div className="flex items-center gap-space-xs">
          <span className="font-caption text-caption text-on-surface-variant">Assignment:</span>
          <select
            id="assignmentFilter"
            value={assignmentFilter}
            onChange={(e) => onAssignmentChange(e.target.value as 'All' | ServicePersonScope)}
            className="h-9 px-space-base rounded-xl bg-surface-container-low border border-outline-variant/50 font-caption text-caption text-on-surface focus:outline-none focus:border-primary"
          >
            <option value="All">All Assignments</option>
            <option value="Entire Organization">Entire Organization</option>
            <option value="Specific Outlet">Specific Outlet</option>
          </select>
        </div>

        {/* Specialization Filter */}
        <div className="flex items-center gap-space-xs">
          <span className="font-caption text-caption text-on-surface-variant">Specialization:</span>
          <select
            id="specFilter"
            value={specializationFilter}
            onChange={(e) => onSpecializationChange(e.target.value)}
            className="h-9 px-space-base rounded-xl bg-surface-container-low border border-outline-variant/50 font-caption text-caption text-on-surface focus:outline-none focus:border-primary"
          >
            <option value="All">All Specializations</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button if active */}
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="h-9 px-2.5 rounded-xl border border-outline-variant/40 hover:bg-surface-container text-caption text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1"
            title="Reset all filters"
          >
            <span className="material-symbols-outlined text-[16px]">filter_alt_off</span>
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
