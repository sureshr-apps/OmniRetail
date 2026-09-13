import React, { useEffect } from 'react';

export interface SupplierToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  description?: string;
}

interface SupplierToastProps {
  toast: SupplierToastMessage | null;
  onDismiss: () => void;
}

export function SupplierToast({ toast, onDismiss }: SupplierToastProps) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-container-highest border border-outline-variant/50 text-on-surface shadow-xl max-w-sm">
        <div className="shrink-0 mt-0.5">
          {toast.type === 'success' && (
            <span className="material-symbols-outlined text-[20px] text-emerald-600">
              check_circle
            </span>
          )}
          {toast.type === 'info' && (
            <span className="material-symbols-outlined text-[20px] text-primary">
              info
            </span>
          )}
          {toast.type === 'warning' && (
            <span className="material-symbols-outlined text-[20px] text-amber-600">
              warning
            </span>
          )}
        </div>

        <div className="flex-1 text-xs">
          <div className="font-semibold text-on-surface text-sm leading-tight">
            {toast.title}
          </div>
          {toast.description && (
            <div className="text-on-surface-variant mt-0.5 leading-normal">
              {toast.description}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onDismiss}
          className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant transition-colors"
        >
          <span className="material-symbols-outlined text-[16px] leading-none">close</span>
        </button>
      </div>
    </div>
  );
}
