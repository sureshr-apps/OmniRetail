import React from 'react';
import { PurchasesKpiSummary } from '../types';
import { formatCurrency } from '../utils/calculations';

interface PurchasesKpiCardsProps {
  kpis: PurchasesKpiSummary;
}

export function PurchasesKpiCards({ kpis }: PurchasesKpiCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Total Purchases */}
      <div className="p-4 rounded bg-surface-container-lowest border border-outline-variant/40 shadow-xs flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
            Total Purchases
          </span>
          <span className="p-1.5 rounded bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-[18px]">payments</span>
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold font-body-mono-num text-on-surface tracking-tight">
            {formatCurrency(kpis.totalPurchasesAmount)}
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-primary font-medium">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span>{kpis.totalPurchasesGrowthText}</span>
          </div>
        </div>
      </div>

      {/* Card 2: Pending Receipts */}
      <div className="p-4 rounded bg-surface-container-lowest border border-outline-variant/40 shadow-xs flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
            Pending Receipts
          </span>
          <span className="p-1.5 rounded bg-tertiary/10 text-tertiary">
            <span className="material-symbols-outlined text-[18px]">inventory</span>
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold text-on-surface tracking-tight">
            {kpis.pendingReceiptsCount} Orders
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-error-container text-on-error-container">
              {kpis.urgentStockoutRiskCount} Urgent Stockout Risks
            </span>
          </div>
        </div>
      </div>

      {/* Card 3: Outstanding Balance */}
      <div className="p-4 rounded bg-surface-container-lowest border border-outline-variant/40 shadow-xs flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
            Outstanding Balance
          </span>
          <span className="p-1.5 rounded bg-amber-500/10 text-amber-700">
            <span className="material-symbols-outlined text-[18px]">pending_actions</span>
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold font-body-mono-num text-on-surface tracking-tight">
            {formatCurrency(kpis.outstandingBalanceAmount)}
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-[14px] text-amber-600">info</span>
            <span>{kpis.outstandingBalanceDueText}</span>
          </div>
        </div>
      </div>

      {/* Card 4: Purchases This Month */}
      <div className="p-4 rounded bg-surface-container-lowest border border-outline-variant/40 shadow-xs flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
            Purchases This Month
          </span>
          <span className="p-1.5 rounded bg-surface-container text-on-surface-variant">
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold font-body-mono-num text-on-surface tracking-tight">
            {formatCurrency(kpis.purchasesThisMonthAmount)}
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">receipt_long</span>
            <span>{kpis.transactionsRecordedCount} transactions recorded</span>
          </div>
        </div>
      </div>
    </div>
  );
}
