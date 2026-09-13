import React from 'react';

interface InventoryToastProps {
  title: string;
  message: string;
  onClose: () => void;
}

export function InventoryToast({ title, message, onClose }: InventoryToastProps) {
  return (
    <div className="fixed bottom-5 right-5 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 border border-outline-variant/20 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <span className="material-symbols-outlined text-[20px] text-primary-fixed">
        check_circle
      </span>
      <div>
        <p className="font-body-medium font-semibold leading-tight">{title}</p>
        <p className="font-caption text-[11px] text-inverse-on-surface/80">{message}</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="ml-2 text-inverse-on-surface/70 hover:text-inverse-on-surface cursor-pointer"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
}
