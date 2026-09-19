import React from 'react';

export function LedgerBreadcrumbRibbon() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-space-sm bg-surface-container-lowest p-space-sm rounded-lg shadow-sm border border-outline-variant/30">
      <div className="flex items-center gap-space-xs text-on-surface-variant font-caption text-caption">
        <span className="material-symbols-outlined text-primary text-[16px]">account_balance</span>
        <span className="font-micro-label text-micro-label uppercase tracking-widest text-outline font-bold">
          FINANCIALS &amp; LEDGER
        </span>
      </div>

      <div className="flex items-center gap-space-sm font-caption text-caption text-on-surface-variant">
        <span className="inline-flex items-center gap-1 font-micro-label text-micro-label px-2 py-0.5 rounded bg-secondary-container/60 text-on-secondary-container font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
          LEDGER ACTIVE
        </span>
      </div>
    </div>
  );
}
