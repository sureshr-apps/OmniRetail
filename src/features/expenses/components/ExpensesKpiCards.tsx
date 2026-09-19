import React from 'react';
import { ExpenseKPIs } from '../types';
import { formatCurrency } from '../utils/calculations';

interface ExpensesKpiCardsProps {
  kpis: ExpenseKPIs;
  periodLabel: string;
  onFilterPending?: () => void;
}

export function ExpensesKpiCards({
  kpis,
  periodLabel,
  onFilterPending,
}: ExpensesKpiCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-base">
      {/* Card 1: Total Expenses (YTD) */}
      <div className="bg-surface-container-lowest p-space-base rounded-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-caption text-caption font-semibold uppercase text-on-surface-variant tracking-wider">
              Total Expenses (YTD)
            </span>
            <span className="font-display-currency text-display-currency text-on-surface mt-1">
              {formatCurrency(kpis.totalExpensesYtd)}
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[22px]">payments</span>
          </div>
        </div>
        <div className="mt-space-base pt-space-xs flex items-center justify-between text-caption font-caption">
          <div className="flex items-center gap-1 text-primary font-semibold">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            <span>+{kpis.ytdGrowthPercent}%</span>
            <span className="text-on-surface-variant font-normal">vs previous period</span>
          </div>
          {/* Micro Sparkline SVG */}
          <svg className="w-16 h-5 text-primary opacity-80" fill="none" viewBox="0 0 64 20">
            <path
              d="M1 17L12 13L24 15L36 8L48 10L63 3"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      {/* Card 2: This Month */}
      <div className="bg-surface-container-lowest p-space-base rounded-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-caption text-caption font-semibold uppercase text-on-surface-variant tracking-wider">
              This Month ({periodLabel})
            </span>
            <span className="font-display-currency text-display-currency text-on-surface mt-1">
              {formatCurrency(kpis.thisMonthTotal)}
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary shrink-0">
            <span className="material-symbols-outlined text-[22px]">calendar_today</span>
          </div>
        </div>
        <div className="mt-space-base pt-space-xs flex items-center justify-between text-caption font-caption">
          <div className="flex items-center gap-1 text-on-surface font-medium">
            <span className="font-body-mono-num text-body-mono-num font-semibold text-tertiary">
              {kpis.thisMonthCount}
            </span>
            <span className="text-on-surface-variant">transactions settled</span>
          </div>
          <span className="font-micro-label text-micro-label px-1.5 py-0.5 rounded bg-surface-container-low text-on-surface font-semibold">
            TARGET {kpis.targetPercent}%
          </span>
        </div>
      </div>

      {/* Card 3: Pending Approval */}
      <div
        onClick={onFilterPending}
        className={`bg-surface-container-lowest p-space-base rounded-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between ${
          onFilterPending ? 'cursor-pointer hover:border-error/40 transition-colors' : ''
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-caption text-caption font-semibold uppercase text-on-surface-variant tracking-wider">
              Pending Approval
            </span>
            <div className="flex items-baseline gap-space-xs mt-1 flex-wrap">
              <span className="font-display-currency text-display-currency text-on-surface">
                {kpis.pendingApprovalCount} Entries
              </span>
              <span className="font-body-mono-num text-body-mono-num text-error font-semibold">
                ({formatCurrency(kpis.pendingApprovalAmount)})
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-error-container/40 flex items-center justify-center text-error shrink-0">
            <span className="material-symbols-outlined text-[22px]">pending_actions</span>
          </div>
        </div>
        <div className="mt-space-base pt-space-xs flex items-center justify-between text-caption font-caption">
          <span className="text-error font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-error" />
            Requires Manager Sign-off
          </span>
          <kbd className="px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-micro-label text-micro-label font-bold">
            {kpis.queueCode}
          </kbd>
        </div>
      </div>

      {/* Card 4: Largest Expense Category */}
      <div className="bg-surface-container-lowest p-space-base rounded-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex flex-col min-w-0 mr-2">
            <span className="font-caption text-caption font-semibold uppercase text-on-surface-variant tracking-wider">
              Largest Expense Category
            </span>
            <span className="font-headline-md text-headline-md text-on-surface mt-1 truncate">
              {kpis.largestCategoryName}
            </span>
            <span className="font-body-mono-num text-body-mono-num font-semibold text-primary">
              {formatCurrency(kpis.largestCategoryAmount)}
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-secondary-container/50 flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-[22px]">bolt</span>
          </div>
        </div>
        <div className="mt-space-base pt-space-xs flex items-center justify-between text-caption font-caption">
          <div className="w-full flex flex-col gap-1">
            <div className="flex justify-between font-caption text-caption text-on-surface-variant">
              <span>Share of Spend</span>
              <span className="font-semibold text-on-surface">
                {kpis.largestCategorySharePercent}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-300"
                style={{ width: `${kpis.largestCategorySharePercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
