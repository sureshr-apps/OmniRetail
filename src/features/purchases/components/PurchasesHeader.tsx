import React from 'react';

interface PurchasesHeaderProps {
  activeCount: number;
  onExport: () => void;
  onOpenCreateModal: () => void;
}

export function PurchasesHeader({
  activeCount,
  onExport,
  onOpenCreateModal,
}: PurchasesHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 text-caption text-on-surface-variant mb-1">
          <span className="hover:text-primary transition-colors cursor-pointer">
            Purchases &amp; Procurement
          </span>
          <span>/</span>
          <span className="font-semibold text-on-surface font-mono">PUR-DIR-2024</span>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-headline-lg font-bold text-on-surface tracking-tight">
            Purchases
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-caption font-semibold bg-secondary-container/30 text-primary border border-primary/20">
            {activeCount} Active Purchases
          </span>
        </div>
        <p className="text-xs text-on-surface-variant mt-0.5">
          Manage purchase orders, supplier invoices, and stock receipts.
        </p>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onExport}
          className="flex items-center gap-1.5 px-3 py-2 rounded bg-surface-container-lowest border border-outline-variant/60 hover:bg-surface-container text-on-surface text-body-medium font-medium transition-colors shadow-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">file_download</span>
          <span>Export CSV / PDF</span>
        </button>

        <button
          type="button"
          onClick={onOpenCreateModal}
          className="flex items-center gap-2 px-3.5 py-2 rounded bg-primary-container hover:bg-primary text-on-primary text-body-medium font-bold transition-colors shadow-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
          <span>+ Create Purchase</span>
          <kbd className="px-1.5 py-0.5 rounded bg-on-primary/20 text-[10px] font-normal tracking-wide">
            Alt+P
          </kbd>
        </button>
      </div>
    </div>
  );
}
