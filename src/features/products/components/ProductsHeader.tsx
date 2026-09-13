import React from 'react';

interface ProductsHeaderProps {
  totalCount: number;
  onExportCsv: () => void;
  onOpenAddModal: () => void;
}

export function ProductsHeader({
  totalCount,
  onExportCsv,
  onOpenAddModal,
}: ProductsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-base select-none">
      <div>
        <div className="flex items-center gap-space-sm">
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Products
          </h1>
          <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-caption text-caption font-bold">
            {totalCount.toLocaleString()} Master SKUs
          </span>
        </div>
        <p className="font-body-default text-body-default text-on-surface-variant mt-0.5">
          Manage your product catalogue, tax mapping, and inventory replenishment thresholds.
        </p>
      </div>

      <div className="flex items-center gap-space-sm self-start md:self-auto">
        <button
          type="button"
          onClick={onExportCsv}
          className="h-10 px-space-base bg-surface-container-lowest hover:bg-surface-container-low text-on-surface font-body-medium text-body-medium rounded-lg flex items-center gap-space-xs transition-colors shadow-sm border border-outline-variant/30 cursor-pointer"
          title="Export CSV (Products catalogue)"
        >
          <span className="material-symbols-outlined text-primary text-[18px]">
            download
          </span>
          <span>Export</span>
          <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
            arrow_drop_down
          </span>
        </button>

        <button
          type="button"
          onClick={onOpenAddModal}
          className="h-10 px-4 bg-[#0f766e] hover:bg-[#115e59] active:bg-[#134e4a] text-white font-medium text-sm rounded-lg flex items-center gap-2 transition-all duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0f766e] focus:ring-offset-2 cursor-pointer"
          title="Add New Catalogue Product (Alt+P)"
        >
          <div className="flex flex-col items-center justify-center leading-tight py-0.5">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] leading-none">
                add
              </span>
              <span className="font-medium text-[13px]">Add Product</span>
            </div>
            <kbd className="text-[10px] font-mono opacity-85 text-teal-100">
              Alt+P
            </kbd>
          </div>
        </button>
      </div>
    </div>
  );
}
