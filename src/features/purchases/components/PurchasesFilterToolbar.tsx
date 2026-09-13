import React from 'react';
import { PaymentStatus, PurchaseStatus } from '../types';
import { SupplierOption, OutletOption } from '../services/mockData';

interface PurchasesFilterToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  datePeriod: string;
  onDatePeriodChange: (period: string) => void;
  selectedOutlet: string;
  onOutletChange: (outlet: string) => void;
  selectedSupplier: string;
  onSupplierChange: (supplier: string) => void;
  selectedPaymentStatus: PaymentStatus | 'ALL';
  onPaymentStatusChange: (status: PaymentStatus | 'ALL') => void;
  purchaseStatus: PurchaseStatus | 'ALL' | 'ACTIVE_NON_CANCELLED';
  onPurchaseStatusChange: (status: PurchaseStatus | 'ALL' | 'ACTIVE_NON_CANCELLED') => void;
  suppliers: SupplierOption[];
  outlets: OutletOption[];
  onResetFilters: () => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
}

export function PurchasesFilterToolbar({
  searchQuery,
  onSearchChange,
  datePeriod,
  onDatePeriodChange,
  selectedOutlet,
  onOutletChange,
  selectedSupplier,
  onSupplierChange,
  selectedPaymentStatus,
  onPaymentStatusChange,
  purchaseStatus,
  onPurchaseStatusChange,
  suppliers,
  outlets,
  onResetFilters,
  searchInputRef,
}: PurchasesFilterToolbarProps) {
  const isFiltered =
    searchQuery.trim() !== '' ||
    datePeriod !== 'This Month (Oct 2024)' ||
    selectedOutlet !== 'All Outlets' ||
    selectedSupplier !== 'All Suppliers' ||
    selectedPaymentStatus !== 'ALL' ||
    purchaseStatus !== 'ACTIVE_NON_CANCELLED';

  return (
    <div className="p-4 border-b border-outline-variant/30 space-y-3 bg-surface-container-lowest">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        {/* Search Field */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
            <span className="material-symbols-outlined text-[18px]">search</span>
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by purchase number, supplier, invoice number, or reference number..."
            className="block w-full pl-9 pr-14 py-2 text-xs bg-surface-container-low border border-outline-variant/50 rounded focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/70 text-on-surface"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <kbd className="px-1.5 py-0.5 text-[10px] font-medium text-on-surface-variant bg-surface-container-lowest rounded border border-outline-variant/40">
              Ctrl+F
            </kbd>
          </div>
        </div>

        {/* Filter Dropdowns Group */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Date Range */}
          <div className="relative">
            <select
              value={datePeriod}
              onChange={(e) => onDatePeriodChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-xs bg-surface-container-low border border-outline-variant/50 rounded font-medium text-on-surface focus:border-primary focus:ring-0 cursor-pointer"
            >
              <option>This Month (Oct 2024)</option>
              <option>Last 30 Days</option>
              <option>Last Quarter (Q3)</option>
              <option>All Historical Records</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-2.5 text-[16px] text-on-surface-variant pointer-events-none">
              calendar_today
            </span>
          </div>

          {/* Outlet */}
          <div className="relative">
            <select
              value={selectedOutlet}
              onChange={(e) => onOutletChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-xs bg-surface-container-low border border-outline-variant/50 rounded font-medium text-on-surface focus:border-primary focus:ring-0 cursor-pointer"
            >
              <option>All Outlets</option>
              {outlets.map((o) => (
                <option key={o.id} value={o.name}>
                  {o.name}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-2 top-2.5 text-[16px] text-on-surface-variant pointer-events-none">
              expand_more
            </span>
          </div>

          {/* Supplier */}
          <div className="relative">
            <select
              value={selectedSupplier}
              onChange={(e) => onSupplierChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-xs bg-surface-container-low border border-outline-variant/50 rounded font-medium text-on-surface focus:border-primary focus:ring-0 cursor-pointer"
            >
              <option>All Suppliers</option>
              {suppliers.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-2 top-2.5 text-[16px] text-on-surface-variant pointer-events-none">
              expand_more
            </span>
          </div>

          {/* Payment Status */}
          <div className="relative">
            <select
              value={selectedPaymentStatus}
              onChange={(e) => onPaymentStatusChange(e.target.value as PaymentStatus | 'ALL')}
              className="appearance-none pl-3 pr-8 py-2 text-xs bg-surface-container-low border border-outline-variant/50 rounded font-medium text-on-surface focus:border-primary focus:ring-0 cursor-pointer"
            >
              <option value="ALL">All Payments: Unpaid, Paid...</option>
              <option value="PAID">Paid</option>
              <option value="PARTIALLY_PAID">Partially Paid</option>
              <option value="UNPAID">Unpaid</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-2.5 text-[16px] text-on-surface-variant pointer-events-none">
              expand_more
            </span>
          </div>
        </div>
      </div>

      {/* Applied Filter Tags */}
      <div className="flex items-center flex-wrap gap-2 pt-1">
        <span className="text-caption text-on-surface-variant font-semibold">
          Active Constraints:
        </span>

        {/* Period Constraint Chip */}
        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-surface-container text-on-surface text-caption font-medium border border-outline-variant/40">
          <span>Period: {datePeriod === 'This Month (Oct 2024)' ? 'Oct 1 - Oct 31, 2024' : datePeriod}</span>
          <button
            type="button"
            onClick={() => onDatePeriodChange('All Historical Records')}
            className="hover:text-error transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">close</span>
          </button>
        </span>

        {/* Status Constraint Chip */}
        {purchaseStatus === 'ACTIVE_NON_CANCELLED' && (
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-surface-container text-on-surface text-caption font-medium border border-outline-variant/40">
            <span>Status: Active (Exclude Cancelled)</span>
            <button
              type="button"
              onClick={() => onPurchaseStatusChange('ALL')}
              className="hover:text-error transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          </span>
        )}

        {/* Outlet Constraint Chip if filtered */}
        {selectedOutlet !== 'All Outlets' && (
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-surface-container text-on-surface text-caption font-medium border border-outline-variant/40">
            <span>Outlet: {selectedOutlet}</span>
            <button
              type="button"
              onClick={() => onOutletChange('All Outlets')}
              className="hover:text-error transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          </span>
        )}

        {/* Supplier Constraint Chip if filtered */}
        {selectedSupplier !== 'All Suppliers' && (
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-surface-container text-on-surface text-caption font-medium border border-outline-variant/40">
            <span>Supplier: {selectedSupplier}</span>
            <button
              type="button"
              onClick={() => onSupplierChange('All Suppliers')}
              className="hover:text-error transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          </span>
        )}

        {/* Payment Status Constraint Chip if filtered */}
        {selectedPaymentStatus !== 'ALL' && (
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-surface-container text-on-surface text-caption font-medium border border-outline-variant/40">
            <span>
              Payment:{' '}
              {selectedPaymentStatus === 'PAID'
                ? 'Paid'
                : selectedPaymentStatus === 'PARTIALLY_PAID'
                ? 'Partially Paid'
                : 'Unpaid'}
            </span>
            <button
              type="button"
              onClick={() => onPaymentStatusChange('ALL')}
              className="hover:text-error transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          </span>
        )}

        {/* Reset Filters button */}
        {isFiltered && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-caption text-primary hover:underline font-semibold ml-2 cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}
