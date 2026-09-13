import React from 'react';
import { ProductsKpiSummary } from '../types';

interface ProductsKpiCardsProps {
  kpis: ProductsKpiSummary;
}

export function ProductsKpiCards({ kpis }: ProductsKpiCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-base select-none">
      {/* Card 1: Total Products */}
      <div className="bg-surface-container-lowest p-space-base rounded-lg shadow-sm flex flex-col justify-between border border-outline-variant/20">
        <div className="flex items-center justify-between mb-space-xs">
          <span className="font-caption text-caption uppercase tracking-wider text-on-surface-variant font-semibold">
            Total Catalogued
          </span>
          <div className="p-1.5 rounded bg-surface-container-low text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">category</span>
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-display-currency text-display-currency text-on-surface">
              {kpis.totalCatalogued.toLocaleString()}
            </span>
            <span className="font-micro-label text-micro-label text-primary font-bold">
              SKUs
            </span>
          </div>
          <div className="flex items-center gap-space-2xs mt-1">
            <span className="material-symbols-outlined text-[14px] text-primary">
              trending_up
            </span>
            <span className="font-caption text-caption text-primary font-semibold">
              +{kpis.addedThisFiscalCycle} added
            </span>
            <span className="font-caption text-caption text-on-surface-variant">
              this fiscal cycle
            </span>
          </div>
        </div>
      </div>

      {/* Card 2: In-Stock Items */}
      <div className="bg-surface-container-lowest p-space-base rounded-lg shadow-sm flex flex-col justify-between border border-outline-variant/20">
        <div className="flex items-center justify-between mb-space-xs">
          <span className="font-caption text-caption uppercase tracking-wider text-on-surface-variant font-semibold">
            In-Stock Items
          </span>
          <div className="p-1.5 rounded bg-secondary-container/40 text-on-secondary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-display-currency text-display-currency text-on-surface">
              {kpis.inStockCount.toLocaleString()}
            </span>
            <span className="font-caption text-caption font-semibold text-secondary">
              {kpis.inStockPercentage}%
            </span>
          </div>
          <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden mt-2">
            <div
              className="bg-primary h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, Math.max(0, kpis.inStockPercentage))}%` }}
            />
          </div>
          <span className="font-caption text-caption text-on-surface-variant mt-1 block">
            Full store distribution ready
          </span>
        </div>
      </div>

      {/* Card 3: Low Stock Alert */}
      <div className="bg-surface-container-lowest p-space-base rounded-lg shadow-sm flex flex-col justify-between border border-outline-variant/20">
        <div className="flex items-center justify-between mb-space-xs">
          <span className="font-caption text-caption uppercase tracking-wider text-on-surface-variant font-semibold">
            Low Stock Alert
          </span>
          <div className="p-1.5 rounded bg-amber-50 text-amber-700 flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">warning</span>
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-display-currency text-display-currency text-amber-700">
              {kpis.lowStockCount}
            </span>
            <span className="font-micro-label text-micro-label uppercase bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">
              Action Needed
            </span>
          </div>
          <span className="font-caption text-caption text-on-surface-variant mt-1 block">
            Below reorder safety threshold
          </span>
        </div>
      </div>

      {/* Card 4: Out of Stock */}
      <div className="bg-surface-container-lowest p-space-base rounded-lg shadow-sm flex flex-col justify-between border border-outline-variant/20">
        <div className="flex items-center justify-between mb-space-xs">
          <span className="font-caption text-caption uppercase tracking-wider text-on-surface-variant font-semibold">
            Out of Stock
          </span>
          <div className="p-1.5 rounded bg-error-container text-on-error-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">
              remove_shopping_cart
            </span>
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-display-currency text-display-currency text-error">
              {kpis.outOfStockCount}
            </span>
            <span className="font-micro-label text-micro-label uppercase bg-error-container text-on-error-container px-1.5 py-0.5 rounded font-bold">
              PO Required
            </span>
          </div>
          <span className="font-caption text-caption text-on-surface-variant mt-1 block">
            Zero inventory across all locations
          </span>
        </div>
      </div>
    </div>
  );
}
