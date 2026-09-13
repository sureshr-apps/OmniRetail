import React from 'react';
import { SalesKpiSummary } from '../types';

interface SalesKpiCardsProps {
  kpis: SalesKpiSummary;
}

export function SalesKpiCards({ kpis }: SalesKpiCardsProps) {
  const formatCurrency = (val: number) => {
    const formatted = Math.abs(val).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return val < 0 ? `-$${formatted}` : `$${formatted}`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-base">
      {/* Card 1: Filtered Sales Total */}
      <div className="bg-surface-container-lowest p-space-base rounded shadow-sm flex flex-col justify-between relative overflow-hidden group">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-micro-label text-micro-label uppercase tracking-wider text-on-surface-variant font-bold">
              Filtered Sales Total
            </span>
            <span className="font-display-currency text-display-currency text-on-surface font-bold mt-1 tracking-tight">
              {formatCurrency(kpis.filteredSalesTotal)}
            </span>
          </div>
          <div className="w-9 h-9 rounded bg-primary-fixed flex items-center justify-center text-on-primary-fixed shadow-xs shrink-0">
            <span className="material-symbols-outlined text-[20px]">payments</span>
          </div>
        </div>
        <div className="mt-space-md flex items-center justify-between font-caption text-caption text-on-surface-variant pt-space-xs">
          <div className="flex items-center gap-1">
            <span className="font-body-mono-num font-semibold text-primary">
              {kpis.recordedSalesCount}
            </span>
            <span>Recorded sales</span>
          </div>
          <div className="flex items-center gap-1 font-body-mono-num text-micro-label text-primary font-bold">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            <span>+{kpis.vsYesterdayPct}% vs yday</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
      </div>

      {/* Card 2: Cash Drawer Balance */}
      <div className="bg-surface-container-lowest p-space-base rounded shadow-sm flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-micro-label text-micro-label uppercase tracking-wider text-on-surface-variant font-bold">
              Cash Drawer Balance
            </span>
            <span className="font-display-currency text-display-currency text-on-surface font-bold mt-1 tracking-tight">
              {formatCurrency(kpis.cashDrawerBalance)}
            </span>
          </div>
          <div className="w-9 h-9 rounded bg-secondary-container flex items-center justify-center text-on-secondary-container shadow-xs shrink-0">
            <span className="material-symbols-outlined text-[20px]">point_of_sale</span>
          </div>
        </div>
        <div className="mt-space-md flex items-center justify-between font-caption text-caption text-on-surface-variant pt-space-xs">
          <span className="font-body-mono-num">Drawer #01 &amp; #02 Pooled</span>
          <span className="font-micro-label text-micro-label px-1.5 py-0.5 rounded bg-surface-container font-semibold text-on-surface">
            {kpis.cashVolumePct}% Vol
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary" />
      </div>

      {/* Card 3: Card & Digital Tender */}
      <div className="bg-surface-container-lowest p-space-base rounded shadow-sm flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-micro-label text-micro-label uppercase tracking-wider text-on-surface-variant font-bold">
              Card &amp; Digital Tender
            </span>
            <span className="font-display-currency text-display-currency text-on-surface font-bold mt-1 tracking-tight">
              {formatCurrency(kpis.cardAndDigitalTender)}
            </span>
          </div>
          <div className="w-9 h-9 rounded bg-tertiary-fixed flex items-center justify-center text-tertiary shadow-xs shrink-0">
            <span className="material-symbols-outlined text-[20px]">contactless</span>
          </div>
        </div>
        <div className="mt-space-md flex items-center justify-between font-caption text-caption text-on-surface-variant pt-space-xs">
          <span className="font-body-mono-num">
            {kpis.cardCount} Card / {kpis.contactlessCount} Contactless
          </span>
          <span className="font-micro-label text-micro-label px-1.5 py-0.5 rounded bg-tertiary-fixed font-semibold text-on-tertiary-fixed-variant">
            {kpis.cardVolumePct}% Vol
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-tertiary" />
      </div>

      {/* Card 4: Total Returns & Voids */}
      <div className="bg-surface-container-lowest p-space-base rounded shadow-sm flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-micro-label text-micro-label uppercase tracking-wider text-error font-bold">
              Total Returns &amp; Voids
            </span>
            <span className="font-display-currency text-display-currency text-error font-bold mt-1 tracking-tight">
              {formatCurrency(kpis.totalReturnsAndVoids)}
            </span>
          </div>
          <div className="w-9 h-9 rounded bg-error-container flex items-center justify-center text-on-error-container shadow-xs shrink-0">
            <span className="material-symbols-outlined text-[20px]">keyboard_return</span>
          </div>
        </div>
        <div className="mt-space-md flex items-center justify-between font-caption text-caption text-on-surface-variant pt-space-xs">
          <span className="font-body-mono-num font-semibold text-error">
            {kpis.refundEventsCount} Refund events
          </span>
          <span className="font-micro-label text-micro-label px-1.5 py-0.5 rounded bg-error-container font-bold text-on-error-container">
            Low Rate {kpis.returnRatePct}%
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-error" />
      </div>
    </div>
  );
}
