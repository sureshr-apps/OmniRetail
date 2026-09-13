import React from 'react';

interface SuppliersHeaderProps {
  onAddSupplier: () => void;
  onExportDirectory: () => void;
}

export function SuppliersHeader({ onAddSupplier, onExportDirectory }: SuppliersHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-outline-variant/30 shrink-0">
      <div>
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center gap-1.5 text-micro-label font-body-mono-num font-semibold text-primary tracking-wider uppercase mb-1"
        >
          <span>Purchasing &amp; Logistics</span>
          <span className="text-outline-variant font-normal">/</span>
          <span className="text-on-surface-variant font-medium">SUP-DIR-09</span>
        </nav>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-on-surface">
          Suppliers
        </h1>
        <p className="text-sm text-on-surface-variant mt-0.5">
          Manage supplier information and purchasing relationships.
        </p>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <button
          type="button"
          onClick={onExportDirectory}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium bg-surface-container-high hover:bg-surface-container-highest text-on-surface border border-outline-variant/40 transition-colors shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          <span>Export Directory</span>
        </button>

        <button
          type="button"
          onClick={onAddSupplier}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded text-sm font-semibold bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container transition-colors shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>+ Add Supplier</span>
          <span className="ml-0.5 px-1.5 py-0.5 rounded text-[11px] font-body-mono-num bg-primary-container/30 text-on-primary-container font-semibold">
            Alt+N
          </span>
        </button>
      </div>
    </header>
  );
}
