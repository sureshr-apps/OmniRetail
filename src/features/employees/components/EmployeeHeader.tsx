import React from 'react';

interface EmployeeHeaderProps {
  activeCount: number;
  onAddEmployee: () => void;
}

export function EmployeeHeader({ activeCount, onAddEmployee }: EmployeeHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-lg mb-space-2xl select-none">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-micro-label text-micro-label px-2 py-0.5 rounded bg-primary-container/10 text-primary uppercase font-bold tracking-wider">
            HR &amp; Security
          </span>
          <span className="text-outline text-caption">•</span>
          <span className="font-caption text-caption text-on-surface-variant">
            {activeCount} Active Personnel
          </span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
          Employee Master
        </h1>
        <p className="font-body-default text-body-default text-on-surface-variant mt-0.5">
          Manage employees, outlet assignments, and application access permissions across all branches.
        </p>
      </div>

      <div className="flex items-center gap-space-md shrink-0">
        <button
          type="button"
          onClick={onAddEmployee}
          className="h-9 px-space-lg bg-primary hover:bg-primary-container text-on-primary rounded font-body-medium text-body-medium flex items-center gap-space-xs transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          <span>Add Employee</span>
        </button>
      </div>
    </div>
  );
}
