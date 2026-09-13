import React from 'react';
import { Employee } from '../types';

interface EmployeeStatusConfirmDialogProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isProcessing: boolean;
}

export function EmployeeStatusConfirmDialog({
  employee,
  isOpen,
  onClose,
  onConfirm,
  isProcessing,
}: EmployeeStatusConfirmDialogProps) {
  if (!isOpen || !employee) return null;

  const isCurrentActive = employee.employmentStatus === 'Active';
  const targetAction = isCurrentActive ? 'Deactivate' : 'Activate';

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-in fade-in duration-150">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-lg shadow-xl border border-outline-variant/40 p-space-xl animate-in zoom-in-95 duration-150">
        <div className="flex items-start gap-space-base mb-space-base">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              isCurrentActive ? 'bg-error-container text-error' : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isCurrentActive ? 'person_off' : 'check_circle'}
            </span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              {targetAction} Employee Record?
            </h3>
            <p className="font-body-default text-caption text-on-surface-variant mt-1">
              {isCurrentActive ? (
                <>
                  Are you sure you want to deactivate{' '}
                  <strong className="text-on-surface">{employee.displayName}</strong> (
                  {employee.employeeCode})? This employee will be marked inactive and prevented from
                  initiating new POS terminal shifts.
                </>
              ) : (
                <>
                  Restore <strong className="text-on-surface">{employee.displayName}</strong> (
                  {employee.employeeCode}) to Active employment status?
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
              isCurrentActive
                ? 'bg-error text-on-error hover:bg-error/90'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            <span>{isProcessing ? 'Updating...' : `Confirm ${targetAction}`}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
