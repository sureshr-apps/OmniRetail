import React from 'react';

interface OutletSuccessBannerProps {
  message: string;
  outletCode?: string;
  outletName?: string;
  onDismiss: () => void;
}

export function OutletSuccessBanner({
  message,
  outletCode,
  outletName,
  onDismiss,
}: OutletSuccessBannerProps) {
  return (
    <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs text-emerald-800 transition-all duration-300 shadow-2xs">
      <div className="flex items-center space-x-2.5">
        <span className="material-symbols-outlined text-emerald-600 text-[20px] shrink-0">
          check_circle
        </span>
        <div>
          <span className="font-bold">{message}</span>{' '}
          {outletCode && (
            <span>
              Outlet <span className="font-mono font-semibold">{outletCode}</span>
              {outletName ? ` (${outletName})` : ''} has been saved and initialized with cloud POS sync.
            </span>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="text-emerald-700 hover:text-emerald-900 p-1 rounded hover:bg-emerald-100 transition-colors ml-3 shrink-0 cursor-pointer"
        aria-label="Dismiss notification"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
}
