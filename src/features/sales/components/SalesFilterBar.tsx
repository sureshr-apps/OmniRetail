import React, { useState, useRef, useEffect } from 'react';
import { DateRangePreset, ColumnVisibility } from '../types';

interface SalesFilterBarProps {
  dateRange: DateRangePreset;
  onDateRangeChange: (preset: DateRangePreset) => void;
  customStartDate?: string;
  customEndDate?: string;
  onCustomDateChange: (start: string, end: string) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  channel: string;
  onChannelChange: (channel: string) => void;
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
  status: string;
  onStatusChange: (status: string) => void;
  cashier: string;
  onCashierChange: (cashier: string) => void;
  columns: ColumnVisibility;
  onToggleColumn: (colKey: keyof ColumnVisibility) => void;
}

export function SalesFilterBar({
  dateRange,
  onDateRangeChange,
  customStartDate,
  customEndDate,
  onCustomDateChange,
  searchQuery,
  onSearchQueryChange,
  channel,
  onChannelChange,
  paymentMethod,
  onPaymentMethodChange,
  status,
  onStatusChange,
  cashier,
  onCashierChange,
  columns,
  onToggleColumn,
}: SalesFilterBarProps) {
  const [isColumnsOpen, setIsColumnsOpen] = useState(false);
  const [isCustomDateOpen, setIsCustomDateOpen] = useState(false);
  const columnsRef = useRef<HTMLDivElement>(null);
  const customDateRef = useRef<HTMLDivElement>(null);

  const [tempStart, setTempStart] = useState(
    customStartDate || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [tempEnd, setTempEnd] = useState(
    customEndDate || new Date().toISOString().split('T')[0]
  );

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (columnsRef.current && !columnsRef.current.contains(e.target as Node)) {
        setIsColumnsOpen(false);
      }
      if (customDateRef.current && !customDateRef.current.contains(e.target as Node)) {
        setIsCustomDateOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const todayStr = 'Oct 28';

  return (
    <div className="bg-surface-container-lowest rounded p-space-base shadow-sm space-y-space-base">
      {/* Top Row: Date range chips & Search + Columns */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-base">
        {/* Date chips */}
        <div className="flex flex-wrap items-center gap-space-xs bg-surface-container-low p-1 rounded">
          <button
            type="button"
            onClick={() => onDateRangeChange('today')}
            className={`date-chip px-3 py-1 rounded font-caption text-caption transition-all ${
              dateRange === 'today'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs font-semibold'
                : 'text-on-surface-variant hover:text-on-surface font-medium'
            }`}
          >
            Today: {todayStr}
          </button>

          <button
            type="button"
            onClick={() => onDateRangeChange('yesterday')}
            className={`date-chip px-3 py-1 rounded font-caption text-caption transition-all ${
              dateRange === 'yesterday'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs font-semibold'
                : 'text-on-surface-variant hover:text-on-surface font-medium'
            }`}
          >
            Yesterday
          </button>

          <button
            type="button"
            onClick={() => onDateRangeChange('last7days')}
            className={`date-chip px-3 py-1 rounded font-caption text-caption transition-all ${
              dateRange === 'last7days'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs font-semibold'
                : 'text-on-surface-variant hover:text-on-surface font-medium'
            }`}
          >
            Last 7 Days
          </button>

          <button
            type="button"
            onClick={() => onDateRangeChange('monthToDate')}
            className={`date-chip px-3 py-1 rounded font-caption text-caption transition-all ${
              dateRange === 'monthToDate'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs font-semibold'
                : 'text-on-surface-variant hover:text-on-surface font-medium'
            }`}
          >
            Month to Date
          </button>

          {/* Custom Date Popover trigger */}
          <div className="relative" ref={customDateRef}>
            <button
              type="button"
              onClick={() => {
                onDateRangeChange('custom');
                setIsCustomDateOpen(!isCustomDateOpen);
              }}
              className={`h-6 px-2 rounded flex items-center gap-1 font-caption text-caption transition-all ${
                dateRange === 'custom'
                  ? 'bg-surface-container-lowest text-on-surface shadow-xs font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">calendar_month</span>
              <span>Custom</span>
            </button>

            {isCustomDateOpen && (
              <div className="absolute left-0 mt-2 w-72 bg-surface-container-lowest rounded shadow-lg border border-outline-variant/30 p-3 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="font-micro-label uppercase font-bold text-on-surface-variant mb-2">
                  Select Custom Date Range
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="text-caption text-on-surface-variant block mb-0.5">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={tempStart}
                      onChange={(e) => setTempStart(e.target.value)}
                      className="w-full h-8 px-2 bg-surface-container-low rounded text-caption border border-outline-variant/40 focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-caption text-on-surface-variant block mb-0.5">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={tempEnd}
                      onChange={(e) => setTempEnd(e.target.value)}
                      className="w-full h-8 px-2 bg-surface-container-low rounded text-caption border border-outline-variant/40 focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant/20">
                    <button
                      type="button"
                      onClick={() => setIsCustomDateOpen(false)}
                      className="px-2.5 py-1 text-caption text-on-surface-variant hover:text-on-surface"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onCustomDateChange(tempStart, tempEnd);
                        setIsCustomDateOpen(false);
                      }}
                      className="px-3 py-1 bg-primary text-on-primary rounded text-caption font-semibold shadow-xs"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search & Columns */}
        <div className="flex items-center gap-space-sm">
          {/* Table Search */}
          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-[16px] text-on-surface-variant pointer-events-none">
              filter_list
            </span>
            <input
              type="text"
              id="tableSearch"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              placeholder="Search customer, ID, or SKU..."
              className="w-full h-8 pl-8 pr-3 text-body-default font-body-default rounded bg-surface-container-low focus:bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-1 focus:ring-primary shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchQueryChange('')}
                className="absolute right-2 top-2 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            )}
          </div>

          {/* Columns Visibility Popover */}
          <div className="relative" ref={columnsRef}>
            <button
              type="button"
              onClick={() => setIsColumnsOpen(!isColumnsOpen)}
              className="h-8 px-2.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center gap-1 font-caption text-caption font-semibold transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
              <span>Columns</span>
            </button>

            {isColumnsOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded shadow-lg border border-outline-variant/30 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1 font-micro-label uppercase text-on-surface-variant font-bold border-b border-outline-variant/20 mb-1">
                  Visible Table Columns
                </div>
                <div className="max-h-64 overflow-y-auto px-2 space-y-1">
                  {[
                    { key: 'timestamp', label: 'Timestamp' },
                    { key: 'customer', label: 'Customer Profile' },
                    { key: 'staff', label: 'Staff / Operator' },
                    { key: 'itemsCount', label: 'Items Count' },
                    { key: 'taxDiscount', label: 'Tax & Disc' },
                    { key: 'status', label: 'Status Badge' },
                  ].map(({ key, label }) => (
                    <label
                      key={key}
                      className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-surface-container-low cursor-pointer text-caption text-on-surface"
                    >
                      <input
                        type="checkbox"
                        checked={columns[key as keyof ColumnVisibility]}
                        onChange={() => onToggleColumn(key as keyof ColumnVisibility)}
                        className="rounded border-outline-variant/50 text-primary focus:ring-primary w-4 h-4"
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4 Filter Dropdowns in Responsive 4-column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-sm pt-space-xs">
        {/* Filter 1: Register / Channel */}
        <div className="flex flex-col gap-1">
          <label className="font-micro-label text-micro-label uppercase font-bold text-on-surface-variant">
            Register / Channel
          </label>
          <div className="relative">
            <select
              value={channel}
              onChange={(e) => onChannelChange(e.target.value)}
              className="w-full h-8 px-2.5 pr-8 bg-surface-container-low rounded font-body-default text-body-default text-on-surface focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
            >
              <option>All Channels (Unified)</option>
              <option>POS Register 01 (Front Left)</option>
              <option>POS Register 02 (Speed Counter)</option>
              <option>Online Store (Click &amp; Collect)</option>
              <option>Direct Dispatch (B2B)</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-2 text-[16px] pointer-events-none text-on-surface-variant">
              arrow_drop_down
            </span>
          </div>
        </div>

        {/* Filter 2: Payment Method */}
        <div className="flex flex-col gap-1">
          <label className="font-micro-label text-micro-label uppercase font-bold text-on-surface-variant">
            Payment Method
          </label>
          <div className="relative">
            <select
              value={paymentMethod}
              onChange={(e) => onPaymentMethodChange(e.target.value)}
              className="w-full h-8 px-2.5 pr-8 bg-surface-container-low rounded font-body-default text-body-default text-on-surface focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
            >
              <option>All Tender Methods</option>
              <option>Visa / Mastercard</option>
              <option>Cash Drawer</option>
              <option>Split Tender (Multi-Pay)</option>
              <option>Omni Gift Card / Points</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-2 text-[16px] pointer-events-none text-on-surface-variant">
              arrow_drop_down
            </span>
          </div>
        </div>

        {/* Filter 3: Order Status */}
        <div className="flex flex-col gap-1">
          <label className="font-micro-label text-micro-label uppercase font-bold text-on-surface-variant">
            Order Status
          </label>
          <div className="relative">
            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full h-8 px-2.5 pr-8 bg-surface-container-low rounded font-body-default text-body-default text-on-surface focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
            >
              <option>All Statuses</option>
              <option>Completed</option>
              <option>Partially Refunded</option>
              <option>Refunded (Full)</option>
              <option>Voided Terminal Session</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-2 text-[16px] pointer-events-none text-on-surface-variant">
              arrow_drop_down
            </span>
          </div>
        </div>

        {/* Filter 4: Cashier on Duty */}
        <div className="flex flex-col gap-1">
          <label className="font-micro-label text-micro-label uppercase font-bold text-on-surface-variant">
            Cashier on Duty
          </label>
          <div className="relative">
            <select
              value={cashier}
              onChange={(e) => onCashierChange(e.target.value)}
              className="w-full h-8 px-2.5 pr-8 bg-surface-container-low rounded font-body-default text-body-default text-on-surface focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
            >
              <option>All Personnel</option>
              <option>Sarah Jenkins (#104)</option>
              <option>Marcus Brody (#108)</option>
              <option>Elena Rostova (#112)</option>
              <option>System Automation Bot</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-2 text-[16px] pointer-events-none text-on-surface-variant">
              arrow_drop_down
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
