import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Purchase,
  PurchaseQueryResult,
  PaymentStatus,
  PurchaseStatus,
  CreatePurchaseInput,
} from '../types';
import { purchaseService } from '../services/purchaseService';
import { SupplierOption, OutletOption } from '../services/mockData';
import { PurchasesHeader } from '../components/PurchasesHeader';
import { PurchasesKpiCards } from '../components/PurchasesKpiCards';
import { PurchasesFilterToolbar } from '../components/PurchasesFilterToolbar';
import { PurchasesTable } from '../components/PurchasesTable';
import { PurchasesPagination } from '../components/PurchasesPagination';
import { PurchaseDetailDrawer } from '../components/PurchaseDetailDrawer';
import { CreatePurchaseModal } from '../components/CreatePurchaseModal';
import { PurchaseToast, ToastMessage } from '../components/PurchaseToast';

export function PurchasesPage() {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Data & KPI state
  const [data, setData] = useState<PurchaseQueryResult | null>(null);
  const [suppliers, setSuppliers] = useState<SupplierOption[]>([]);
  const [outlets, setOutlets] = useState<OutletOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter & pagination state
  const [searchQuery, setSearchQuery] = useState('');
  const [datePeriod, setDatePeriod] = useState('This Month (Oct 2024)');
  const [selectedOutlet, setSelectedOutlet] = useState('All Outlets');
  const [selectedSupplier, setSelectedSupplier] = useState('All Suppliers');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<PaymentStatus | 'ALL'>('ALL');
  const [purchaseStatus, setPurchaseStatus] = useState<PurchaseStatus | 'ALL' | 'ACTIVE_NON_CANCELLED'>(
    'ACTIVE_NON_CANCELLED'
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Modals & drawers
  const [viewingPurchase, setViewingPurchase] = useState<Purchase | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Load auxiliary lists (suppliers & outlets)
  useEffect(() => {
    async function loadAux() {
      try {
        const [suppList, outletList] = await Promise.all([
          purchaseService.getSuppliers(),
          purchaseService.getOutlets(),
        ]);
        setSuppliers(suppList);
        setOutlets(outletList);
      } catch (e) {
        console.error('Failed to load auxiliary procurement data:', e);
      }
    }
    loadAux();
  }, []);

  // Load purchases ledger
  const loadLedger = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await purchaseService.getPurchases({
        search: searchQuery,
        datePeriod,
        outlet: selectedOutlet,
        supplier: selectedSupplier,
        paymentStatus: selectedPaymentStatus,
        purchaseStatus,
        page: currentPage,
        pageSize,
      });
      setData(result);
    } catch (err) {
      console.error('Failed to fetch purchases ledger:', err);
      setToast({
        id: `err-${Date.now()}`,
        type: 'warning',
        title: 'Connection Issue',
        description: 'Failed to load purchase records. Please refresh.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [
    searchQuery,
    datePeriod,
    selectedOutlet,
    selectedSupplier,
    selectedPaymentStatus,
    purchaseStatus,
    currentPage,
    pageSize,
  ]);

  useEffect(() => {
    loadLedger();
  }, [loadLedger]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+P -> Open Create Purchase
      if (e.altKey && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        setIsCreateModalOpen(true);
        return;
      }

      // Ctrl+F or / -> Focus search query
      if (
        (e.ctrlKey && e.key === 'f') ||
        (e.key === '/' && document.activeElement?.tagName !== 'INPUT')
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
        return;
      }

      // Escape -> Close drawer or modal
      if (e.key === 'Escape') {
        if (isCreateModalOpen) setIsCreateModalOpen(false);
        else if (viewingPurchase) setViewingPurchase(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCreateModalOpen, viewingPurchase]);

  // Selection handlers
  const handleToggleSelectRow = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleToggleSelectAll = () => {
    if (!data?.items) return;
    const allSelected = data.items.every((it) => selectedIds.has(it.id));
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      const next = new Set(selectedIds);
      data.items.forEach((it) => next.add(it.id));
      setSelectedIds(next);
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setDatePeriod('This Month (Oct 2024)');
    setSelectedOutlet('All Outlets');
    setSelectedSupplier('All Suppliers');
    setSelectedPaymentStatus('ALL');
    setPurchaseStatus('ACTIVE_NON_CANCELLED');
    setCurrentPage(1);
  };

  // Export CSV
  const handleExportCsv = () => {
    if (!data || data.items.length === 0) {
      setToast({
        id: `toast-${Date.now()}`,
        type: 'warning',
        title: 'Export Unavailable',
        description: 'No purchase records match current filters to export.',
      });
      return;
    }

    const headers = [
      'Purchase Number',
      'PO Number',
      'Invoice Number',
      'Date',
      'Supplier',
      'Outlet',
      'Total Units',
      'Subtotal',
      'Tax',
      'Total Amount',
      'Amount Paid',
      'Payment Status',
      'Receipt Status',
      'Created By',
    ];

    const rows = data.items.map((p) => [
      `"${p.purchaseNumber}"`,
      `"${p.purchaseOrderNumber || ''}"`,
      `"${p.invoiceNumber || ''}"`,
      `"${p.date} ${p.time}"`,
      `"${p.supplierName.replace(/"/g, '""')}"`,
      `"${p.outletName}"`,
      p.totalUnits,
      p.subtotal.toFixed(2),
      p.tax.toFixed(2),
      p.totalAmount.toFixed(2),
      p.amountPaid.toFixed(2),
      `"${p.paymentStatus}"`,
      `"${p.receiptStatus}"`,
      `"${p.createdBy}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `purchases_ledger_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToast({
      id: `toast-${Date.now()}`,
      type: 'success',
      title: 'Ledger Exported',
      description: `Successfully exported ${data.items.length} purchase orders to CSV.`,
    });
  };

  // Create Purchase handler
  const handleCreatePurchase = async (
    input: CreatePurchaseInput,
    shouldOpenDetails: boolean = false
  ) => {
    try {
      const created = await purchaseService.createPurchase(input);
      setIsCreateModalOpen(false);
      await loadLedger();

      setToast({
        id: `toast-${Date.now()}`,
        type: 'success',
        title: 'Purchase Order Logged',
        description: `Successfully recorded ${created.purchaseNumber} for ${created.supplierName}.`,
      });

      if (shouldOpenDetails) {
        setViewingPurchase(created);
      }
    } catch (err) {
      console.error('Failed to create purchase:', err);
      setToast({
        id: `toast-${Date.now()}`,
        type: 'warning',
        title: 'Creation Failed',
        description: 'Failed to record supplier purchase invoice.',
      });
    }
  };

  // Cancel Purchase handler
  const handleCancelPurchase = async (id: string) => {
    try {
      const updated = await purchaseService.cancelPurchase(id);
      if (viewingPurchase?.id === id) {
        setViewingPurchase(updated);
      }
      await loadLedger();
      setToast({
        id: `toast-${Date.now()}`,
        type: 'info',
        title: 'Purchase Voided',
        description: `${updated.purchaseNumber} has been marked as cancelled.`,
      });
    } catch (err) {
      console.error('Failed to cancel purchase:', err);
    }
  };

  // Receive stock check-in handler
  const handleReceiveStock = async (
    purchaseId: string,
    receivedCounts: Record<string, number>,
    batchInfo: { batchNumber: string; mfgDate: string; expiryDate: string }
  ) => {
    try {
      const updated = await purchaseService.receiveItems(purchaseId, receivedCounts, batchInfo);
      setViewingPurchase(updated);
      await loadLedger();
      setToast({
        id: `toast-${Date.now()}`,
        type: 'success',
        title: 'Stock Check-in Confirmed',
        description: `Physical count for ${updated.purchaseNumber} recorded. Batch: ${batchInfo.batchNumber}.`,
      });
    } catch (err) {
      console.error('Failed to confirm stock receipt:', err);
    }
  };

  return (
    <div className="flex flex-col w-full h-full min-h-0 overflow-y-auto pr-1 select-none">
      <div className="py-space-base space-y-space-base pb-16">
        {/* 1. Page Header */}
        <PurchasesHeader
          activeCount={data?.totalCount || 42}
          onExport={handleExportCsv}
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
        />

        {/* 2. KPI Summary Cards */}
        {data?.kpis && <PurchasesKpiCards kpis={data.kpis} />}

        {/* 3. Filter Toolbar & Table Container */}
        <div className="bg-surface-container-lowest rounded shadow-xs overflow-hidden border border-outline-variant/40 flex flex-col">
          <PurchasesFilterToolbar
            searchQuery={searchQuery}
            onSearchChange={(q) => {
              setSearchQuery(q);
              setCurrentPage(1);
            }}
            datePeriod={datePeriod}
            onDatePeriodChange={(dp) => {
              setDatePeriod(dp);
              setCurrentPage(1);
            }}
            selectedOutlet={selectedOutlet}
            onOutletChange={(o) => {
              setSelectedOutlet(o);
              setCurrentPage(1);
            }}
            selectedSupplier={selectedSupplier}
            onSupplierChange={(s) => {
              setSelectedSupplier(s);
              setCurrentPage(1);
            }}
            selectedPaymentStatus={selectedPaymentStatus}
            onPaymentStatusChange={(st) => {
              setSelectedPaymentStatus(st);
              setCurrentPage(1);
            }}
            purchaseStatus={purchaseStatus}
            onPurchaseStatusChange={(ps) => {
              setPurchaseStatus(ps);
              setCurrentPage(1);
            }}
            suppliers={suppliers}
            outlets={outlets}
            onResetFilters={handleResetFilters}
            searchInputRef={searchInputRef}
          />

          {/* 4. Purchases Table */}
          <PurchasesTable
            items={data?.items || []}
            selectedIds={selectedIds}
            onToggleSelectRow={handleToggleSelectRow}
            onToggleSelectAll={handleToggleSelectAll}
            onViewPurchase={(p) => setViewingPurchase(p)}
            isLoading={isLoading}
          />

          {/* 5. Pagination Footer */}
          {data && (
            <PurchasesPagination
              currentPage={data.page}
              totalPages={data.totalPages}
              totalCount={data.totalCount}
              filteredCount={data.filteredCount}
              pageSize={data.pageSize}
              onPageChange={(p) => setCurrentPage(p)}
              onPageSizeChange={(sz) => {
                setPageSize(sz);
                setCurrentPage(1);
              }}
            />
          )}
        </div>
      </div>

      {/* Slide-over Purchase Detail Drawer */}
      <PurchaseDetailDrawer
        purchase={viewingPurchase}
        onClose={() => setViewingPurchase(null)}
        onCancelPurchase={handleCancelPurchase}
        onReceiveStock={handleReceiveStock}
      />

      {/* Create Purchase Form Modal */}
      <CreatePurchaseModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={handleCreatePurchase}
        suppliers={suppliers}
        outlets={outlets}
      />

      {/* Toast Notification */}
      <PurchaseToast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
