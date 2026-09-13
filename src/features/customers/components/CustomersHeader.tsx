import React from 'react';

interface CustomersHeaderProps {
  onExport: () => void;
  onAddCustomer: () => void;
  totalCustomers: number;
}

export function CustomersHeader({ onExport, onAddCustomer }: CustomersHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-base mb-space-lg">
      <div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Customers</h1>
        <p className="font-body-default text-body-default text-on-surface-variant mt-0.5">
          Manage customer profiles and purchase relationships.
        </p>
      </div>
      <div className="flex items-center gap-space-sm">
        <button
          type="button"
          onClick={onExport}
          className="h-9 px-space-base bg-surface-container-lowest hover:bg-surface-container text-on-surface border border-outline-variant/50 rounded font-body-medium text-body-medium flex items-center gap-space-xs transition-colors shadow-xs"
          title="Export current directory as CSV"
        >
          <span className="material-symbols-outlined text-[16px]">download</span>
          <span>Export Directory</span>
        </button>
        <button
          type="button"
          onClick={onAddCustomer}
          className="h-9 px-space-base bg-primary hover:bg-primary-container text-on-primary rounded font-body-medium text-body-medium flex items-center gap-space-xs transition-colors shadow-xs"
          title="Create a new customer profile"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>Add Customer</span>
        </button>
      </div>
    </div>
  );
}
