import React from 'react';
import { CustomerStatus, CustomerType } from '../types';

interface CustomersFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: 'ALL' | CustomerStatus;
  onStatusChange: (status: 'ALL' | CustomerStatus) => void;
  type: 'ALL' | CustomerType;
  onTypeChange: (type: 'ALL' | CustomerType) => void;
  city: string;
  onCityChange: (city: string) => void;
  cities: string[];
  isFiltered: boolean;
  onResetFilters: () => void;
}

export function CustomersFilterBar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  type,
  onTypeChange,
  city,
  onCityChange,
  cities,
  isFiltered,
  onResetFilters,
}: CustomersFilterBarProps) {
  return (
    <div className="bg-surface-container-lowest p-space-base rounded border border-outline-variant/30 mb-space-lg shadow-xs flex flex-wrap items-center justify-between gap-space-base">
      {/* Search Bar */}
      <div className="relative flex-1 min-w-[280px]">
        <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-on-surface-variant pointer-events-none">
          search
        </span>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-9 pl-9 pr-8 rounded bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          placeholder="Search by customer name, customer code, phone, email, or tax ID..."
          type="text"
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-2.5 text-on-surface-variant hover:text-on-surface"
            title="Clear search"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        )}
      </div>

      {/* Filter Dropdowns */}
      <div className="flex items-center gap-space-sm flex-wrap">
        {/* Status Filter */}
        <div className="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-1 rounded border border-outline-variant/30">
          <span className="font-micro-label text-micro-label text-on-surface-variant uppercase tracking-wider">
            Status:
          </span>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value as 'ALL' | CustomerStatus)}
            className="bg-transparent font-caption text-caption text-on-surface focus:outline-none cursor-pointer pr-1"
          >
            <option value="ALL">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-1 rounded border border-outline-variant/30">
          <span className="font-micro-label text-micro-label text-on-surface-variant uppercase tracking-wider">
            Type:
          </span>
          <select
            value={type}
            onChange={(e) => onTypeChange(e.target.value as 'ALL' | CustomerType)}
            className="bg-transparent font-caption text-caption text-on-surface focus:outline-none cursor-pointer pr-1"
          >
            <option value="ALL">All Types</option>
            <option value="Individual">Individual</option>
            <option value="Business">Business</option>
          </select>
        </div>

        {/* City Filter */}
        <div className="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-1 rounded border border-outline-variant/30">
          <span className="font-micro-label text-micro-label text-on-surface-variant uppercase tracking-wider">
            City:
          </span>
          <select
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            className="bg-transparent font-caption text-caption text-on-surface focus:outline-none cursor-pointer pr-1"
          >
            <option value="ALL">All Cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Reset button if filtered */}
        {isFiltered && (
          <button
            type="button"
            onClick={onResetFilters}
            className="h-8 px-2.5 rounded text-caption text-primary hover:bg-surface-container flex items-center gap-1 transition-colors"
            title="Reset all filters"
          >
            <span className="material-symbols-outlined text-[14px]">filter_alt_off</span>
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
