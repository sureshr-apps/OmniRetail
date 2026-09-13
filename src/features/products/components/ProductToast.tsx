import React, { useEffect } from 'react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  description?: string;
}

interface ProductToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export function ProductToast({ toast, onDismiss }: ProductToastProps) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200 select-none">
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-xl p-space-base flex items-start gap-space-sm max-w-sm">
        <div
          className={`p-1.5 rounded-full flex items-center justify-center shrink-0 ${
            toast.type === 'success'
              ? 'bg-emerald-100 text-emerald-800'
              : toast.type === 'warning'
              ? 'bg-amber-100 text-amber-800'
              : 'bg-primary/15 text-primary'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {toast.type === 'success'
              ? 'check_circle'
              : toast.type === 'warning'
              ? 'warning'
              : 'info'}
          </span>
        </div>

        <div className="flex-1 pr-2">
          <h4 className="font-body-medium text-body-medium font-semibold text-on-surface">
            {toast.title}
          </h4>
          {toast.description && (
            <p className="font-caption text-caption text-on-surface-variant mt-0.5">
              {toast.description}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onDismiss}
          className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    </div>
  );
}
