import React, { useState, useEffect, useCallback } from 'react';
import {
  DateRangePreset,
  ColumnVisibility,
  SalesTransaction,
  SalesQueryResult,
  SalesKpiSummary,
} from '../types';
import { salesService } from '../services/salesService';
import { SalesHeader } from '../components/SalesHeader';
import { SalesKpiCards } from '../components/SalesKpiCards';
import { SalesFilterBar } from '../components/SalesFilterBar';
import { SalesLedgerTable } from '../components/SalesLedgerTable';
import { SalesPagination } from '../components/SalesPagination';
import { TransactionDetailDrawer } from '../components/TransactionDetailDrawer';
import { SalesToast } from '../components/SalesToast';

const DEFAULT_COLUMNS: ColumnVisibility = {
  transactionRec: true,
  timestamp: true,
  customer: true,
  staff: true,
  itemsCount: true,
  taxDiscount: true,
  totalNet: true,
  status: true,
  actions: true,
};

const DEFAULT_KPIS: SalesKpiSummary = {
  filteredSalesTotal: 12480.5,
  recordedSalesCount: 184,
  vsYesterdayPct: 8.4,
  cashDrawerBalance: 3840.0,
  cashVolumePct: 30.7,
  cardAndDigitalTender: 8210.5,
  cardCount: 128,
  contactlessCount: 14,
  cardVolumePct: 65.8,
  totalReturnsAndVoids: -430.0,
  refundEventsCount: 3,
  returnRatePct: 3.4,
};

export function SalesPage() {
  // Filters State
  const [dateRange, setDateRange] = useState<DateRangePreset>('today');
  const [customStartDate, setCustomStartDate] = useState<string>('');
  const [customEndDate, setCustomEndDate] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [channel, setChannel] = useState<string>('All Channels (Unified)');
  const [paymentMethod, setPaymentMethod] = useState<string>('All Tender Methods');
  const [status, setStatus] = useState<string>('All Statuses');
  const [cashier, setCashier] = useState<string>('All Personnel');

  // Pagination State
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);

  // Column Visibility State
  const [columns, setColumns] = useState<ColumnVisibility>(DEFAULT_COLUMNS);

  // Data State
  const [data, setData] = useState<SalesQueryResult>({
    transactions: [],
    totalCount: 0,
    page: 1,
    pageSize: 25,
    totalPages: 1,
    kpis: DEFAULT_KPIS,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Selected Transaction for Slide-over Drawer
  const [selectedTx, setSelectedTx] = useState<SalesTransaction | null>(null);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Global keydown handler (e.g. F9 for Z-report)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'F9') {
        e.preventDefault();
        showToast('Generating and printing Daily Z-Report for downtown register group...');
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showToast]);

  // Fetch sales data when filters or pagination changes
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    salesService
      .getSales({
        dateRange,
        customStartDate,
        customEndDate,
        channel,
        paymentMethod,
        status,
        cashier,
        searchQuery,
        page,
        pageSize,
      })
      .then((result) => {
        if (isMounted) {
          setData(result);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load sales data:', err);
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [
    dateRange,
    customStartDate,
    customEndDate,
    channel,
    paymentMethod,
    status,
    cashier,
    searchQuery,
    page,
    pageSize,
  ]);

  // Handle date preset change
  const handleDateRangeChange = (preset: DateRangePreset) => {
    setDateRange(preset);
    setPage(1);
    showToast(`Updated date scope filter to ${preset}`);
  };

  // Handle custom date range change
  const handleCustomDateChange = (start: string, end: string) => {
    setCustomStartDate(start);
    setCustomEndDate(end);
    setDateRange('custom');
    setPage(1);
    showToast(`Filtered date range: ${start} to ${end}`);
  };

  // Handle column visibility toggling
  const handleToggleColumn = (colKey: keyof ColumnVisibility) => {
    setColumns((prev) => ({
      ...prev,
      [colKey]: !prev[colKey],
    }));
  };

  return (
    <div className="flex flex-col w-full h-full min-h-0 overflow-y-auto pr-1">
      <div className="flex flex-col gap-space-lg py-space-base pb-16">
        {/* Page Header */}
        <SalesHeader />

        {/* 4 KPI Cards */}
        <SalesKpiCards kpis={data.kpis} />

        {/* Filter Bar */}
        <SalesFilterBar
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
          customStartDate={customStartDate}
          customEndDate={customEndDate}
          onCustomDateChange={handleCustomDateChange}
          searchQuery={searchQuery}
          onSearchQueryChange={(q) => {
            setSearchQuery(q);
            setPage(1);
          }}
          channel={channel}
          onChannelChange={(ch) => {
            setChannel(ch);
            setPage(1);
          }}
          paymentMethod={paymentMethod}
          onPaymentMethodChange={(pm) => {
            setPaymentMethod(pm);
            setPage(1);
          }}
          status={status}
          onStatusChange={(st) => {
            setStatus(st);
            setPage(1);
          }}
          cashier={cashier}
          onCashierChange={(csh) => {
            setCashier(csh);
            setPage(1);
          }}
          columns={columns}
          onToggleColumn={handleToggleColumn}
        />

        {/* High-density Sales Ledger Table + Pagination */}
        <div className="bg-surface-container-lowest rounded shadow-sm overflow-hidden flex flex-col">
          <SalesLedgerTable
            transactions={data.transactions}
            columns={columns}
            onViewTransaction={(tx) => setSelectedTx(tx)}
            isLoading={isLoading}
          />

          <SalesPagination
            currentPage={data.page}
            totalPages={data.totalPages}
            totalCount={data.totalCount}
            pageSize={data.pageSize}
            onPageChange={(p) => setPage(p)}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* Slide-over Transaction Detail Drawer */}
      {selectedTx && (
        <TransactionDetailDrawer
          transaction={selectedTx}
          onClose={() => setSelectedTx(null)}
          onReprintSlip={(tx) => {
            showToast(`Thermal Receipt Reprinter Triggered for #${tx.id}`);
            setSelectedTx(null);
          }}
          onIssueReturn={(tx) => {
            showToast(`Refund wizard initialized for #${tx.id}`);
            setSelectedTx(null);
          }}
        />
      )}

      {/* Toast Notification */}
      <SalesToast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
