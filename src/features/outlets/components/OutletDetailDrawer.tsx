import React from 'react';
import { Outlet } from '../types';
import { formatOutletCode } from '../utils/formatOutletCode';

interface OutletDetailDrawerProps {
  outlet: Outlet | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (outlet: Outlet) => void;
  onToggleStatus: (outlet: Outlet) => void;
  onDelete: (outlet: Outlet) => void;
}

export function OutletDetailDrawer({
  outlet,
  isOpen,
  onClose,
  onEdit,
  onToggleStatus,
  onDelete,
}: OutletDetailDrawerProps) {
  if (!isOpen || !outlet) return null;

  const isInactive = outlet.status === 'Inactive';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-96 bg-white border-l border-slate-200 shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
          {/* Drawer Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded bg-teal-100 text-teal-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">store</span>
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 leading-tight">Outlet Details</h2>
                <div className="text-[11px] font-mono text-teal-700 font-semibold">
                  {formatOutletCode(outlet.outletCode)}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded transition-colors cursor-pointer"
              title="Close Drawer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs">
            {/* Main Overview Card */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm">{outlet.name}</div>
                </div>
                {!isInactive ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0 ml-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1" />
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-200 text-slate-700 border border-slate-300 shrink-0 ml-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1" />
                    Inactive
                  </span>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-slate-500">pin_drop</span>
                <span>Contact Info</span>
              </h4>
              <div className="bg-white border border-slate-200 rounded-md p-3 space-y-2 text-slate-600">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Contact Person:</span>
                  <span className="font-medium text-slate-800">{outlet.contactPerson}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Phone:</span>
                  <span className="font-mono text-slate-800">{outlet.phone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Email:</span>
                  <span className="font-mono text-slate-800 truncate max-w-[180px]" title={outlet.contactEmail}>
                    {outlet.contactEmail}
                  </span>
                </div>
                <div className="pt-1.5 border-t border-slate-100 flex justify-between">
                  <span className="text-slate-400">Street Address:</span>
                  <span className="font-medium text-slate-800 text-right">
                    {outlet.address || '—'}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Outlet Activity Feed */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-slate-500">history</span>
                <span>Recent Outlet Activity</span>
              </h4>
              <div className="border-l-2 border-slate-200 pl-3.5 space-y-3.5 py-1">
                {outlet.recentActivity && outlet.recentActivity.length > 0 ? (
                  outlet.recentActivity.map((act) => (
                    <div key={act.id}>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-slate-800">{act.title}</span>
                        <span className="text-[10px] text-slate-400">{act.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{act.description}</p>
                    </div>
                  ))
                ) : (
                  <div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-800">Cloud Sync Active</span>
                      <span className="text-[10px] text-slate-400">Online</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Store registers operational and connected with central inventory.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(outlet);
              }}
              className="flex-1 inline-flex items-center justify-center space-x-1.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs py-2 rounded shadow-2xs transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
              <span>Edit Outlet</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onToggleStatus(outlet);
              }}
              className={`inline-flex items-center space-x-1 border font-semibold text-xs py-2 px-3 rounded shadow-2xs transition-colors cursor-pointer ${
                outlet.status === 'Active'
                  ? 'bg-white hover:bg-rose-50 text-rose-700 border-rose-300'
                  : 'bg-white hover:bg-emerald-50 text-emerald-700 border-emerald-300'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {outlet.status === 'Active' ? 'power_settings_new' : 'check_circle'}
              </span>
              <span>{outlet.status === 'Active' ? 'Deactivate' : 'Activate'}</span>
            </button>
            <button
              type="button"
              onClick={() => onDelete(outlet)}
              className="inline-flex items-center justify-center border border-rose-300 bg-white hover:bg-rose-50 text-rose-700 font-semibold text-xs py-2 px-3 rounded shadow-2xs transition-colors cursor-pointer"
              title="Delete Outlet"
            >
              <span className="material-symbols-outlined text-[16px]">delete</span>
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
