import React from 'react';
import { InventoryKpiSummary } from '../types';

interface InventoryKpiCardsProps {
  kpis: InventoryKpiSummary;
}

export function InventoryKpiCards({ kpis }: InventoryKpiCardsProps) {
  const formatCurrency = (val: number) => {
    return `$${val.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-base">
      {/* Card 1: Valuation */}
      <div className="bg-surface-container-lowest p-space-base rounded-lg shadow-sm flex items-start justify-between">
        <div className="flex flex-col">
          <span className="font-micro-label text-micro-label uppercase text-on-surface-variant tracking-wider font-semibold">
            Total Stock Valuation
          </span>
          <div className="flex items-baseline gap-space-xs mt-1">
            <span className="font-headline-lg text-headline-lg font-body-mono-num text-on-surface font-bold">
              {formatCurrency(kpis.totalValuation)}
            </span>
          </div>
        </div>
        <div className="p-2 rounded bg-surface-container-low text-primary shrink-0">
          <span className="material-symbols-outlined text-[20px]">account_balance</span>
        </div>
      </div>

      {/* Card 2: Low Stock Alert */}
      <div className="bg-surface-container-lowest p-space-base rounded-lg shadow-sm flex items-start justify-between">
        <div className="flex flex-col">
          <span className="font-micro-label text-micro-label uppercase text-on-surface-variant tracking-wider font-semibold">
            Low Stock Alerts
          </span>
          <div className="flex items-baseline gap-space-xs mt-1">
            <span className="font-headline-lg text-headline-lg font-body-mono-num text-error font-bold">
              {kpis.lowStockCount}
            </span>
            <span className="font-caption text-caption text-on-surface-variant">
              items threshold breached
            </span>
          </div>
        </div>
        <div className="p-2 rounded bg-error-container/40 text-error shrink-0">
          <span className="material-symbols-outlined text-[20px]">notification_important</span>
        </div>
      </div>

      {/* Card 3: Out of Stock */}
      <div className="bg-surface-container-lowest p-space-base rounded-lg shadow-sm flex items-start justify-between">
        <div className="flex flex-col">
          <span className="font-micro-label text-micro-label uppercase text-on-surface-variant tracking-wider font-semibold">
            Out of Stock Depletion
          </span>
          <div className="flex items-baseline gap-space-xs mt-1">
            <span className="font-headline-lg text-headline-lg font-body-mono-num text-on-surface font-bold">
              {kpis.outOfStockCount}
            </span>
            <span className="font-caption text-caption text-on-surface-variant">
              SKUs fully depleted
            </span>
          </div>
        </div>
        <div className="p-2 rounded bg-surface-container-low text-on-surface-variant shrink-0">
          <span className="material-symbols-outlined text-[20px]">production_quantity_limits</span>
        </div>
      </div>

      {/* Card 4: Incoming Shipments */}
      <div className="bg-surface-container-lowest p-space-base rounded-lg shadow-sm flex items-start justify-between">
        <div className="flex flex-col">
          <span className="font-micro-label text-micro-label uppercase text-on-surface-variant tracking-wider font-semibold">
            Incoming Purchase Orders
          </span>
          <div className="flex items-baseline gap-space-xs mt-1">
            <span className="font-headline-lg text-headline-lg font-body-mono-num text-primary font-bold">
              {kpis.incomingPoCount} POs
            </span>
            <span className="font-caption text-caption text-on-surface-variant">
              due this cycle
            </span>
          </div>
        </div>
        <div className="p-2 rounded bg-primary-fixed/50 text-on-primary-fixed shrink-0">
          <span className="material-symbols-outlined text-[20px]">inbox</span>
        </div>
      </div>
    </div>
  );
}
