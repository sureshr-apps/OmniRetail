import React from 'react';
import { Outlet } from '../types';
import { formatOutletCode } from '../utils/formatOutletCode';

interface OutletStatusConfirmDialogProps {
  isOpen: boolean;
  outlet: Outlet | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isProcessing: boolean;
}

export function OutletStatusConfirmDialog({
  isOpen,
  outlet,
  onClose,
  onConfirm,
  isProcessing,
}: OutletStatusConfirmDialogProps) {
  if (!isOpen || !outlet) return null;

  const isDeactivating = outlet.status === 'Active';

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 select-none">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5">
          <div className="flex items-start space-x-3.5">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                isDeactivating
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              <span className="material-symbols-outlined text-[24px]">
                {isDeactivating ? 'warning' : 'power_settings_new'}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {isDeactivating ? 'Deactivate Outlet' : 'Activate Outlet'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isDeactivating ? (
                  <>
                    Are you sure you want to deactivate{' '}
                    <span className="font-semibold text-slate-800">{outlet.name}</span> (
                    <span className="font-mono text-teal-700">{formatOutletCode(outlet.outletCode)}</span>)?
                    The outlet will remain in the directory for historical auditing.
                  </>
                ) : (
                  <>
                    Are you sure you want to restore active status for{' '}
                    <span className="font-semibold text-slate-800">{outlet.name}</span> (
                    <span className="font-mono text-teal-700">{formatOutletCode(outlet.outletCode)}</span>)?
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-end space-x-2.5">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="px-3.5 py-1.5 bg-white border border-slate-300 rounded-md text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isProcessing}
            className={`px-4 py-1.5 text-white font-semibold text-xs rounded-md shadow-2xs transition-colors cursor-pointer flex items-center space-x-1.5 disabled:opacity-50 ${
              isDeactivating
                ? 'bg-amber-600 hover:bg-amber-700'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isDeactivating ? 'toggle_off' : 'toggle_on'}
            </span>
            <span>
              {isProcessing
                ? 'Updating...'
                : isDeactivating
                ? 'Deactivate Outlet'
                : 'Activate Outlet'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
