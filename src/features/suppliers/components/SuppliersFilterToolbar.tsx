import React, { RefObject } from 'react';
import { SupplierStatus } from '../types';

interface SuppliersFilterToolbarProps {
  searchInputRef: RefObject<HTMLInputElement>;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  statusFilter: 'ALL' | SupplierStatus;
  onStatusFilterChange: (val: 'ALL' | SupplierStatus) => void;
  categoryFilter: string;
  onCategoryFilterChange: (val: string) => void;
  categories: string[];
  onResetFilters: () => void;
  isFiltered: boolean;
}

export function SuppliersFilterToolbar({
  searchInputRef,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  categories,
  onResetFilters,
  isFiltered,
}: SuppliersFilterToolbarProps) {
  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 p-3 bg-surface-container-lowest border border-outline-variant/40 rounded shadow-xs">
      {/* Search Input Box */}
      <div className="relative flex-1 min-w-[280px]">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant pointer-events-none">
          search
        </span>
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by supplier name, code, contact person, phone, email, or tax ID..."
          className="w-full pl-10 pr-20 py-2 text-sm rounded bg-surface-container border border-outline-variant/40 text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="p-1 rounded-full hover:bg-surface-container-high text-on-surface-variant text-[14px]"
              title="Clear search"
            >
              <span className="material-symbols-outlined text-[16px] leading-none">close</span>
            </button>
          )}
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[11px] font-body-mono-num font-semibold bg-surface-container-high text-on-surface-variant border border-outline-variant/30">
            Ctrl+F
          </span>
        </div>
      </div>

      {/* Filters cluster */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value as 'ALL' | SupplierStatus)}
          className="px-3 py-2 text-sm rounded bg-surface-container border border-outline-variant/40 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
        >
          <option value="ALL">Status: All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => onCategoryFilterChange(e.target.value)}
          className="px-3 py-2 text-sm rounded bg-surface-container border border-outline-variant/40 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer max-w-[175px]"
        >
          <option value="All Categories">Category: All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Reset Button */}
        {isFiltered && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
            title="Reset all filters"
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
