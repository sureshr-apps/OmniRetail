import React from 'react';

export function SalesHeader() {
  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-base">
      <div className="flex flex-col gap-space-2xs">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-primary text-[20px]">receipt_long</span>
          <span className="font-micro-label text-micro-label uppercase tracking-widest text-primary font-bold">
            POS Terminal
          </span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
          Sales &amp; Orders Ledger
        </h1>
        <p className="font-body-default text-body-default text-on-surface-variant max-w-2xl">
          Complete audit trail of all in-store, online click-and-collect, and delivery transactions across terminals.
        </p>
      </div>
    </div>
  );
}
