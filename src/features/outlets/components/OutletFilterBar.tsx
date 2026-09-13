import React from 'react';
import { OutletStatus } from '../types';

interface OutletFilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  statusFilter: 'All' | OutletStatus;
  onStatusFilterChange: (status: 'All' | OutletStatus) => void;
  cityFilter: string;
  onCityFilterChange: (city: string) => void;
  availableCities: string[];
  totalCount: number;
  activeCount: number;
  inactiveCount: number;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function OutletFilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  cityFilter,
  onCityFilterChange,
  availableCities,
  totalCount,
  activeCount,
  inactiveCount,
  onRefresh,
  isRefreshing,
}: OutletFilterBarProps) {
  return (
    <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
      {/* Left Search Input */}
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search outlets by outlet name, outlet code, city, or phone number..."
            className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-600 focus:bg-white transition-all"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              title="Clear search"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          ) : (
            <span className="absolute right-2.5 top-2.5 text-slate-400 pointer-events-none">
              <span className="material-symbols-outlined text-[16px]">tune</span>
            </span>
          )}
        </div>
      </div>

      {/* Right Filters (Status & City & Refresh) */}
      <div className="flex flex-wrap items-center gap-2.5 text-xs">
        {/* Status Segmented Filter */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200 text-slate-600 font-medium">
          <span className="text-[11px] text-slate-400 px-2 uppercase font-semibold">Status:</span>
          <button
            type="button"
            onClick={() => onStatusFilterChange('All')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              statusFilter === 'All'
                ? 'bg-white text-teal-800 shadow-2xs font-semibold'
                : 'hover:text-slate-900 text-slate-600'
            }`}
          >
            All ({totalCount})
          </button>
          <button
            type="button"
            onClick={() => onStatusFilterChange('Active')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              statusFilter === 'Active'
                ? 'bg-white text-teal-800 shadow-2xs font-semibold'
                : 'hover:text-slate-900 text-slate-600'
            }`}
          >
            Active ({activeCount})
          </button>
          <button
            type="button"
            onClick={() => onStatusFilterChange('Inactive')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              statusFilter === 'Inactive'
                ? 'bg-white text-teal-800 shadow-2xs font-semibold'
                : 'hover:text-slate-900 text-slate-600'
            }`}
          >
            Inactive ({inactiveCount})
          </button>
        </div>

        {/* City Dropdown */}
        <div className="relative">
          <select
            value={cityFilter}
            onChange={(e) => onCityFilterChange(e.target.value)}
            className="appearance-none bg-slate-50 border border-slate-200 rounded-md pl-3 pr-8 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-teal-600 cursor-pointer"
          >
            <option value="">All Cities ({availableCities.length})</option>
            {availableCities.map((c) => (
              <option key={c} value={c}>
                {c}, TX
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-2 top-2 text-slate-400 pointer-events-none text-[16px]">
            expand_more
          </span>
        </div>

        {/* Refresh Button */}
        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-slate-600 transition-colors cursor-pointer disabled:opacity-50"
          title="Reload List"
        >
          <span
            className={`material-symbols-outlined text-[18px] block ${
              isRefreshing ? 'animate-spin text-teal-700' : ''
            }`}
          >
            refresh
          </span>
        </button>
      </div>
    </div>
  );
}
