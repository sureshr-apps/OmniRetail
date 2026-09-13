import React from 'react';

interface SalesToastProps {
  message: string | null;
  onClose: () => void;
}

export function SalesToast({ message }: SalesToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-space-base py-space-sm rounded shadow-xl flex items-center gap-space-sm transition-all duration-200 animate-in fade-in slide-in-from-bottom-3">
      <span className="material-symbols-outlined text-primary-fixed text-[20px]">
        check_circle
      </span>
      <span className="font-body-medium text-body-medium font-medium">
        {message}
      </span>
    </div>
  );
}
