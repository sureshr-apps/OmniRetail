import React from 'react';

interface WorkflowBannerProps {
  expenseNumber: string;
  message?: string;
  dispatchCode?: string;
  onInspectRouting?: () => void;
  onDismiss: () => void;
}

export function WorkflowBanner({
  expenseNumber,
  message = 'successfully submitted for Tier-2 Manager Review and Audit Clearance.',
  dispatchCode = 'DISPATCHED #04',
  onInspectRouting,
  onDismiss,
}: WorkflowBannerProps) {
  return (
    <div className="flex items-center justify-between px-space-base py-space-sm rounded-lg bg-surface-container-lowest shadow-sm border border-outline-variant/30 animate-in fade-in slide-in-from-top-2 duration-150">
      <div className="flex items-center gap-space-base flex-wrap">
        <div className="w-6 h-6 rounded-full bg-secondary-container/80 flex items-center justify-center text-on-secondary-container shrink-0">
          <span className="material-symbols-outlined text-[16px]">check</span>
        </div>
        <div className="flex items-center gap-space-xs text-on-surface font-body-medium text-body-medium flex-wrap">
          <span>Expense record</span>
          <span className="font-body-mono-num text-body-mono-num font-semibold text-primary">
            {expenseNumber}
          </span>
          <span>{message}</span>
        </div>
        <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-micro-label text-micro-label uppercase font-bold shrink-0">
          {dispatchCode}
        </span>
      </div>

      <div className="flex items-center gap-space-sm shrink-0">
        {onInspectRouting && (
          <button
            type="button"
            className="font-caption text-caption font-semibold text-primary hover:underline cursor-pointer"
            onClick={onInspectRouting}
          >
            Inspect Routing
          </button>
        )}
        <button
          type="button"
          aria-label="Dismiss banner"
          className="w-6 h-6 flex items-center justify-center rounded text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors cursor-pointer"
          onClick={onDismiss}
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    </div>
  );
}
