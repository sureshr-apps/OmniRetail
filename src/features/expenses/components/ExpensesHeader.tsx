import React, { useState, useRef, useEffect } from 'react';

interface ExpensesHeaderProps {
  totalRecordsCount: number;
  onOpenAddExpense: () => void;
  onExportCsv: () => void;
  onExportPdf: () => void;
}

export function ExpensesHeader({
  totalRecordsCount,
  onOpenAddExpense,
  onExportCsv,
  onExportPdf,
}: ExpensesHeaderProps) {
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setIsExportMenuOpen(false);
      }
    }
    if (isExportMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isExportMenuOpen]);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-base">
      <div className="flex flex-col gap-space-2xs">
        <div className="flex items-center gap-space-base flex-wrap">
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-semibold">
            Expenses
          </h1>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-micro-label text-micro-label uppercase font-bold">
            {totalRecordsCount} Recorded Entries
          </span>
          <span className="inline-flex items-center gap-1 font-caption text-caption text-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Ledger Synchronized
          </span>
        </div>
        <p className="font-body-default text-body-default text-on-surface-variant">
          Track, classify, and reconcile multi-outlet operating expenditures and operational overhead.
        </p>
      </div>

      <div className="flex items-center gap-space-sm shrink-0">
        {/* Export dropdown */}
        <div className="relative" ref={exportMenuRef}>
          <button
            type="button"
            onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
            className="h-9 px-space-base rounded-lg bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant/40 text-on-surface font-body-medium text-body-medium flex items-center gap-space-xs transition-colors shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
              download
            </span>
            <span>Export CSV / PDF</span>
            <span className="material-symbols-outlined text-[14px] text-on-surface-variant">
              expand_more
            </span>
          </button>

          {isExportMenuOpen && (
            <div className="absolute right-0 mt-1 w-56 bg-surface-container-lowest rounded-lg border border-outline-variant/40 shadow-lg py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
              <button
                type="button"
                onClick={() => {
                  setIsExportMenuOpen(false);
                  onExportCsv();
                }}
                className="w-full px-3 py-2 text-caption text-on-surface hover:bg-surface-container-low flex items-center gap-2 text-left cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] text-primary">table_view</span>
                <div>
                  <div className="font-medium text-on-surface">Export CSV (Data Ledger)</div>
                  <div className="text-[10px] text-on-surface-variant">Filtered rows with line breakdown</div>
                </div>
              </button>
              <div className="h-px bg-outline-variant/20 my-1" />
              <button
                type="button"
                onClick={() => {
                  setIsExportMenuOpen(false);
                  onExportPdf();
                }}
                className="w-full px-3 py-2 text-caption text-on-surface hover:bg-surface-container-low flex items-center gap-2 text-left cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] text-error">picture_as_pdf</span>
                <div>
                  <div className="font-medium text-on-surface">Export PDF (Audit Summary)</div>
                  <div className="text-[10px] text-on-surface-variant">Pre-formatted managerial report</div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Add Expense action */}
        <button
          type="button"
          onClick={onOpenAddExpense}
          className="h-9 px-space-base rounded-lg bg-primary-container hover:bg-primary text-on-primary font-headline-sm text-headline-sm flex items-center gap-space-sm shadow-sm transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Add Expense</span>
          <kbd className="px-1.5 py-0.2 rounded text-[10px] font-body-mono-num text-body-mono-num bg-on-primary/20 text-on-primary font-semibold">
            Alt+E
          </kbd>
        </button>
      </div>
    </div>
  );
}
