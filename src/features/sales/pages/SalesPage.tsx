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
import { SaleReturnModal } from '../components/SaleReturnModal';
import { cashRegisterService } from '@/features/cash/services/cashRegisterService';
import { useTenantOutlet } from '@/app/context/TenantOutletContext';
import { formatCurrency } from '@/shared/utils/currency';

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
  filteredSalesTotal: 0,
  recordedSalesCount: 0,
  vsYesterdayPct: 0,
  cashDrawerBalance: 0,
  cashVolumePct: 0,
  cardAndDigitalTender: 0,
  cardCount: 0,
  contactlessCount: 0,
  cardVolumePct: 0,
  totalReturnsAndVoids: 0,
  refundEventsCount: 0,
  returnRatePct: 0,
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
  const [cashDrawerBalance, setCashDrawerBalance] = useState(0);
  const tenantOutlet = useTenantOutlet();
  const selectedOutletId = tenantOutlet?.selectedOutletId ?? null;

  // Selected Transaction for Slide-over Drawer
  const [selectedTx, setSelectedTx] = useState<SalesTransaction | null>(null);
  const [returningTx, setReturningTx] = useState<SalesTransaction | null>(null);
  const [returnError, setReturnError] = useState<string | null>(null);
  const [isReturning, setIsReturning] = useState(false);
  const [salesRefreshToken, setSalesRefreshToken] = useState(0);

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
    salesRefreshToken,
  ]);

  useEffect(() => {
    let isMounted = true;
    if (!selectedOutletId) {
      setCashDrawerBalance(0);
      return () => { isMounted = false; };
    }

    cashRegisterService.getSnapshot(selectedOutletId).then((snapshot) => {
      if (isMounted) setCashDrawerBalance(snapshot.summary.expectedCash);
    }).catch((error: unknown) => {
      console.error('Failed to load cash drawer balance:', error);
      if (isMounted) setCashDrawerBalance(0);
    });

    return () => { isMounted = false; };
  }, [selectedOutletId]);

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

  async function submitReturn(lines: { saleLineId: string; quantity: number }[], reason: string) {
    if (!returningTx) return;
    setIsReturning(true);
    setReturnError(null);
    try {
      const result = await salesService.issueReturn({ saleId: returningTx.id, lines, reason });
      setReturningTx(null);
      setSalesRefreshToken((current) => current + 1);
      showToast(`${formatCurrency(result.refundAmount)} return recorded${result.cashRefundAmount > 0 ? ` · ${formatCurrency(result.cashRefundAmount)} removed from cash drawer` : ''}`);
    } catch (error) {
      setReturnError(error instanceof Error ? error.message : 'Unable to issue the return.');
    } finally {
      setIsReturning(false);
    }
  }

  return (
    <div className="flex flex-col w-full h-full min-h-0 overflow-y-auto pr-1">
      <div className="flex flex-col gap-space-lg py-space-base pb-16">
        {/* Page Header */}
        <SalesHeader />

        {/* 4 KPI Cards */}
        <SalesKpiCards kpis={{ ...data.kpis, cashDrawerBalance }} />

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
            setSelectedTx(null);
            setReturnError(null);
            setReturningTx(tx);
          }}
        />
      )}

      {/* Toast Notification */}
      <SalesToast message={toastMessage} onClose={() => setToastMessage(null)} />
      <SaleReturnModal transaction={returningTx} isSubmitting={isReturning} error={returnError} onClose={() => { setReturningTx(null); setReturnError(null); }} onSubmit={submitReturn} />
    </div>
  );
}
