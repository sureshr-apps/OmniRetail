import React from 'react';
import { Employee } from '../types';

interface EmployeeAccessConfirmDialogProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isProcessing: boolean;
}

export function EmployeeAccessConfirmDialog({
  employee,
  isOpen,
  onClose,
  onConfirm,
  isProcessing,
}: EmployeeAccessConfirmDialogProps) {
  if (!isOpen || !employee) return null;

  const isAccessEnabled = employee.loginAccess === 'Enabled';
  const targetAction = isAccessEnabled ? 'Disable Login Access' : 'Enable Login Access';

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-in fade-in duration-150">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-lg shadow-xl border border-outline-variant/40 p-space-xl animate-in zoom-in-95 duration-150">
        <div className="flex items-start gap-space-base mb-space-base">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              isAccessEnabled
                ? 'bg-amber-100 text-amber-800'
                : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isAccessEnabled ? 'lock' : 'lock_open'}
            </span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              {targetAction}?
            </h3>
            <p className="font-body-default text-caption text-on-surface-variant mt-1">
              {isAccessEnabled ? (
                <>
                  Are you sure you want to suspend application login access for{' '}
                  <strong className="text-on-surface">{employee.displayName}</strong>? They will be
                  unable to log in to the POS terminals or web portal until re-enabled.
                </>
              ) : (
                <>
                  Enable login access for{' '}
                  <strong className="text-on-surface">{employee.displayName}</strong>? They will be
                  granted terminal credentials under role{' '}
                  <strong className="text-primary">{employee.permissionProfile || 'Standard POS'}</strong>.
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-space-sm mt-space-xl">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="h-9 px-space-lg rounded border border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container font-body-medium text-body-medium text-on-surface transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isProcessing}
            className={`h-9 px-space-lg rounded font-body-medium text-body-medium font-semibold shadow-xs transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50 ${
              isAccessEnabled
                ? 'bg-amber-700 text-white hover:bg-amber-800'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            <span>{isProcessing ? 'Updating...' : targetAction}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
