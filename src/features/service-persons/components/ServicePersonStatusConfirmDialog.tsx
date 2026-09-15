import React from 'react';
import { ServicePerson } from '../types';
import { formatServicePersonCode } from '../utils/formatServicePersonCode';

interface ServicePersonStatusConfirmDialogProps {
  person: ServicePerson | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isProcessing: boolean;
}

export function ServicePersonStatusConfirmDialog({
  person,
  isOpen,
  onClose,
  onConfirm,
  isProcessing,
}: ServicePersonStatusConfirmDialogProps) {
  if (!isOpen || !person) return null;

  const willBeInactive = person.status === 'Active';

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-space-lg">
      <div className="bg-surface-container-lowest rounded-xl shadow-xl w-full max-w-md p-space-lg flex flex-col border border-outline-variant/30 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center gap-3 mb-space-base">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              willBeInactive
                ? 'bg-amber-100 text-amber-800'
                : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">
              {willBeInactive ? 'pause_circle' : 'play_circle'}
            </span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              {willBeInactive ? 'Deactivate' : 'Activate'}
            </h3>
            <span className="font-body-mono-num text-caption text-on-surface-variant font-medium">
              {formatServicePersonCode(person.servicePersonCode)} · {person.displayName}
            </span>
          </div>
        </div>

        {/* Message */}
        <p className="font-body-default text-body-default text-on-surface-variant mb-space-lg">
          {willBeInactive
            ? `Are you sure you want to deactivate ${person.displayName}? They will be marked as Inactive. All historical records and past service assignments will remain preserved.`
            : `Are you sure you want to reactivate ${person.displayName}?`}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-space-sm pt-space-base border-t border-outline-variant/20">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="h-9 px-space-base rounded-xl border border-outline-variant/50 bg-surface hover:bg-surface-container-high font-body-medium text-caption text-on-surface transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isProcessing}
            className={`h-9 px-space-lg rounded-xl font-body-medium text-caption text-on-primary transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50 ${
              willBeInactive
                ? 'bg-amber-700 hover:bg-amber-800'
                : 'bg-primary hover:bg-primary-container'
            }`}
          >
            {isProcessing ? (
              <>
                <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                <span>Updating...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">
                  {willBeInactive ? 'lock' : 'check_circle'}
                </span>
                <span>{willBeInactive ? 'Deactivate' : 'Activate'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
