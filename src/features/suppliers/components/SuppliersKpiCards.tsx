import React from 'react';
import { SuppliersKpiSummary } from '../types';
import { formatCurrency } from '../utils/calculations';

interface SuppliersKpiCardsProps {
  kpis: SuppliersKpiSummary;
}

export function SuppliersKpiCards({ kpis }: SuppliersKpiCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Total Suppliers */}
      <div className="p-4 rounded bg-surface-container-lowest border border-outline-variant/40 shadow-xs flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
            Total Suppliers
          </span>
          <span className="p-1.5 rounded bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-[18px]">local_shipping</span>
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold font-body-mono-num text-on-surface tracking-tight">
            {kpis.totalSuppliers}
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-primary font-medium">
            <span className="material-symbols-outlined text-[15px]">trending_up</span>
            <span>{kpis.totalSuppliersChangeText}</span>
          </div>
        </div>
      </div>

      {/* Card 2: Active Partnerships */}
      <div className="p-4 rounded bg-surface-container-lowest border border-outline-variant/40 shadow-xs flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
            Active Partnerships
          </span>
          <span className="p-1.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
            <span className="material-symbols-outlined text-[18px]">handshake</span>
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold font-body-mono-num text-on-surface tracking-tight">
            {kpis.activePartnerships}
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
            <span className="material-symbols-outlined text-[15px]">check_circle</span>
            <span>{kpis.activePercentageText}</span>
          </div>
        </div>
      </div>

      {/* Card 3: Outstanding Balance */}
      <div className="p-4 rounded bg-surface-container-lowest border border-outline-variant/40 shadow-xs flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
            Outstanding Balance
          </span>
          <span className="p-1.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400">
            <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold font-body-mono-num text-on-surface tracking-tight">
            {formatCurrency(kpis.outstandingBalance)}
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-[15px] text-amber-600">schedule</span>
            <span>{kpis.outstandingDueText}</span>
          </div>
        </div>
      </div>

      {/* Card 4: Pending Deliveries */}
      <div className="p-4 rounded bg-surface-container-lowest border border-outline-variant/40 shadow-xs flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
            Pending Deliveries
          </span>
          <span className="p-1.5 rounded bg-tertiary/10 text-tertiary">
            <span className="material-symbols-outlined text-[18px]">inventory</span>
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold font-body-mono-num text-on-surface tracking-tight">
            {kpis.pendingDeliveries} POs
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-[15px] text-tertiary">local_mall</span>
            <span>{kpis.pendingDeliveriesSubtext}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
