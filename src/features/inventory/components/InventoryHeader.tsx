import React from 'react';

interface InventoryHeaderProps {
  onExportCsv: () => void;
  onAddNewProduct: () => void;
}

export function InventoryHeader({ onExportCsv, onAddNewProduct }: InventoryHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-base bg-surface-container-lowest p-space-base rounded-lg shadow-sm">
      <div className="flex flex-col">
        <div className="flex items-center gap-space-sm">
          <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight font-semibold">
            Inventory &amp; Stock Management
          </h1>
        </div>
      </div>

      {/* Action Trigger Clusters */}
      <div className="flex flex-wrap items-center gap-space-xs">
        <button
          type="button"
          onClick={onExportCsv}
          className="h-8 px-space-base bg-surface-container hover:bg-surface-container-high text-on-surface rounded font-body-medium text-body-medium flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px] text-on-surface-variant">download</span>
          <span>Export CSV</span>
        </button>

        <button
          type="button"
          onClick={onAddNewProduct}
          className="h-8 px-space-base bg-primary hover:bg-primary-container text-on-primary rounded font-body-medium text-body-medium flex items-center gap-1.5 transition-colors shadow-xs ml-space-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>Add New Product</span>
        </button>
      </div>
    </div>
  );
}
