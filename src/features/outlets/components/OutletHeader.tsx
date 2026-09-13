import React from 'react';

interface OutletHeaderProps {
  totalCount: number;
  onExportCsv: () => void;
  onAddOutlet: () => void;
}

export function OutletHeader({
  totalCount,
  onExportCsv,
  onAddOutlet,
}: OutletHeaderProps) {
  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 shrink-0">
      <div>
        {/* Breadcrumb matching Stitch */}
        <div className="flex items-center space-x-1.5 text-xs text-slate-500 mb-1">
          <span className="hover:text-slate-800 transition-colors">Settings</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="hover:text-slate-800 transition-colors">Organization Config</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="font-semibold text-teal-700">Outlet Master</span>
        </div>

        {/* Title & Badge */}
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Outlet Master</h1>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
            {totalCount} {totalCount === 1 ? 'Outlet' : 'Outlets'} Total
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage your organization’s outlets, store locations, contact hierarchy, and register licenses.
        </p>
      </div>

      {/* Primary Action Buttons */}
      <div className="flex items-center space-x-2.5">
        <button
          type="button"
          onClick={onExportCsv}
          className="inline-flex items-center space-x-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold px-3 py-2 rounded-md shadow-2xs transition-colors cursor-pointer"
          title="Export current filtered list to CSV"
        >
          <span className="material-symbols-outlined text-[16px] text-slate-500">file_download</span>
          <span>Export CSV</span>
        </button>

        <button
          type="button"
          onClick={onAddOutlet}
          className="inline-flex items-center space-x-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-3.5 py-2 rounded-md shadow-sm transition-all focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>Add Outlet</span>
        </button>
      </div>
    </div>
  );
}
