import React from 'react';
import { Outlet } from '../types';

interface OutletTableProps {
  outlets: Outlet[];
  isLoading: boolean;
  error: string | null;
  onViewDetails: (outlet: Outlet) => void;
  onEditOutlet?: (outlet: Outlet) => void;
  onToggleStatus?: (outlet: Outlet) => void;
  onAddOutlet: () => void;
  onRetry: () => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export function OutletTable({
  outlets,
  isLoading,
  error,
  onViewDetails,
  onEditOutlet,
  onToggleStatus,
  onAddOutlet,
  onRetry,
  hasActiveFilters,
  onClearFilters,
}: OutletTableProps) {
  // 1. Error State
  if (error) {
    return (
      <div className="bg-white rounded-lg border border-rose-200 p-12 text-center shadow-2xs">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-50 text-rose-600 mb-3">
          <span className="material-symbols-outlined text-[26px]">error_outline</span>
        </div>
        <h3 className="text-sm font-bold text-rose-900">Failed to Retrieve Outlets</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">{error}</p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center space-x-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">refresh</span>
            <span>Retry Request</span>
          </button>
        </div>
      </div>
    );
  }

  // 2. Loading State
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-16 text-center shadow-2xs">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-50 text-teal-600 mb-4 animate-spin">
          <span className="material-symbols-outlined text-[28px]">sync</span>
        </div>
        <h3 className="text-sm font-bold text-slate-800">Loading Outlet Directory...</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Syncing real-time outlet telemetry, register status, and licensing allocation with cloud master.
        </p>
        <div className="w-48 h-1.5 bg-slate-100 rounded-full mx-auto mt-4 overflow-hidden">
          <div className="w-2/3 h-full bg-teal-600 rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  // 3. Empty State (No outlets matching search or overall)
  if (outlets.length === 0) {
    if (hasActiveFilters) {
      return (
        <div className="bg-white rounded-lg border border-dashed border-slate-300 p-12 text-center shadow-2xs">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 mb-3">
            <span className="material-symbols-outlined text-[32px]">search_off</span>
          </div>
          <h3 className="text-sm font-bold text-slate-800">No Matching Outlets Found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            No outlets matched your current search and filter parameters. Try adjusting your query or resetting filters.
          </p>
          <div className="mt-4">
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-md transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">filter_alt_off</span>
              <span>Reset All Filters</span>
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg border border-dashed border-slate-300 p-12 text-center shadow-2xs">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 mb-4">
          <span className="material-symbols-outlined text-[36px]">storefront</span>
        </div>
        <h3 className="text-base font-bold text-slate-800">No Outlets Registered Yet</h3>
        <p className="text-xs text-slate-500 mt-1.5 max-w-md mx-auto">
          Your organization currently has no retail branches or warehouse stores configured. Add your first outlet to start configuring POS registers and stock transfers.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onAddOutlet}
            className="inline-flex items-center space-x-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-4 py-2 rounded-md shadow-sm transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Add Your First Outlet</span>
          </button>
        </div>
      </div>
    );
  }

  // 4. Normal Data Table State
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
            <th className="py-3 px-4 w-28">Outlet Code</th>
            <th className="py-3 px-4">Outlet Name</th>
            <th className="py-3 px-4">Contact Person</th>
            <th className="py-3 px-4">Phone</th>
            <th className="py-3 px-4">City</th>
            <th className="py-3 px-4 text-center">No. of Employees</th>
            <th className="py-3 px-4 text-center">Status</th>
            <th className="py-3 px-4 text-right pr-6">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-normal text-slate-700">
          {outlets.map((outlet) => {
            const isInactive = outlet.status === 'Inactive';

            return (
              <tr
                key={outlet.id}
                className={`transition-colors group ${
                  isInactive
                    ? 'hover:bg-slate-50/80 bg-slate-50/40 opacity-75'
                    : 'hover:bg-slate-50/80'
                }`}
              >
                {/* 1. OUTLET CODE */}
                <td className="py-3.5 px-4 font-mono font-semibold">
                  <div className="flex items-center space-x-1.5">
                    <span
                      className={`material-symbols-outlined text-[15px] ${
                        isInactive ? 'text-slate-400' : 'text-teal-600'
                      }`}
                    >
                      store
                    </span>
                    <span className={isInactive ? 'text-slate-500' : 'text-teal-800'}>
                      {outlet.outletCode}
                    </span>
                  </div>
                </td>

                {/* 2. OUTLET NAME & REGISTER METADATA */}
                <td className="py-3.5 px-4">
                  <div
                    className={`font-semibold text-[13px] ${
                      isInactive
                        ? 'text-slate-700 line-through decoration-slate-300'
                        : 'text-slate-900'
                    }`}
                  >
                    {outlet.name}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {outlet.description || `${outlet.type || 'Retail'} · ${outlet.registerCount} Registers`}
                  </div>
                </td>

                {/* 3. CONTACT PERSON & EMAIL */}
                <td className="py-3.5 px-4">
                  <div
                    className={`font-medium ${
                      isInactive ? 'text-slate-700' : 'text-slate-800'
                    }`}
                  >
                    {outlet.contactPerson}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {outlet.contactEmail}
                  </div>
                </td>

                {/* 4. PHONE */}
                <td className="py-3.5 px-4 font-mono text-slate-600">
                  {outlet.phone}
                </td>

                {/* 5. CITY & REGION */}
                <td className="py-3.5 px-4">
                  <div
                    className={`font-medium ${
                      isInactive ? 'text-slate-700' : 'text-slate-800'
                    }`}
                  >
                    {outlet.city}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {outlet.state ? `${outlet.state}, ${outlet.country}` : outlet.country}
                  </div>
                </td>

                {/* 6. NO. OF EMPLOYEES (READ-ONLY DERIVED BADGE) */}
                <td className="py-3.5 px-4 text-center">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                      outlet.employeeCount > 0
                        ? 'bg-slate-100 text-slate-700'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {outlet.employeeCount} Staff
                  </span>
                </td>

                {/* 7. STATUS */}
                <td className="py-3.5 px-4 text-center">
                  {outlet.status === 'Active' ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1.5" />
                      Inactive
                    </span>
                  )}
                </td>

                {/* 8. ACTIONS */}
                <td className="py-3.5 px-4 text-right pr-6">
                  <button
                    type="button"
                    onClick={() => onViewDetails(outlet)}
                    className="p-1.5 text-slate-500 hover:text-teal-700 hover:bg-teal-50 rounded-md transition-colors cursor-pointer inline-flex items-center justify-center"
                    title="View Details"
                    aria-label={`View details for ${outlet.name}`}
                  >
                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
