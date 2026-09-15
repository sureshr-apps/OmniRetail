import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Supplier,
  SupplierStatus,
  CreateSupplierInput,
  UpdateSupplierInput,
} from '../types';
import { supplierService, deriveSupplierView } from '../services/supplierService';
import { exportSuppliersToCsv } from '../utils/calculations';
import { formatSupplierCode } from '../utils/formatSupplierCode';
import { upsertById, removeById } from '@/shared/utils/listState';
import { useDeleteConfirmation } from '@/shared/hooks/useDeleteConfirmation';
import { MasterDeleteConfirmDialog } from '@/shared/components/MasterDeleteConfirmDialog';
import { SuppliersHeader } from '../components/SuppliersHeader';
import { SuppliersKpiCards } from '../components/SuppliersKpiCards';
import { SuppliersFilterToolbar } from '../components/SuppliersFilterToolbar';
import { SuppliersTable } from '../components/SuppliersTable';
import { SuppliersPagination } from '../components/SuppliersPagination';
import { AddSupplierDrawer as AddSupplierModal } from '../components/AddSupplierDrawer';
import { SupplierDetailDrawer } from '../components/SupplierDetailDrawer';
import { SupplierToast, SupplierToastMessage } from '../components/SupplierToast';

export function SuppliersPage() {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Data: the full org-scoped set. Mutations upsert into this directly;
  // the visible page, filters, and KPI summary are all derived from it below.
  const [allSuppliers, setAllSuppliers] = useState<Supplier[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters & pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | SupplierStatus>('ALL');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Drawers & Modals — selection is an id; the record itself is always derived
  // from allSuppliers, so it reflects mutations with no extra sync code.
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toast, setToast] = useState<SupplierToastMessage | null>(null);

  const data = useMemo(
    () => deriveSupplierView(allSuppliers, {
      search: searchQuery,
      status: statusFilter,
      category: categoryFilter,
      page: currentPage,
      pageSize,
    }),
    [allSuppliers, searchQuery, statusFilter, categoryFilter, currentPage, pageSize],
  );
  const viewingSupplier = useMemo(
    () => allSuppliers.find((s) => s.id === selectedSupplierId) ?? null,
    [allSuppliers, selectedSupplierId],
  );

  const deleteConfirmation = useDeleteConfirmation<Supplier>({
    deleteRecord: (supplier) => supplierService.deleteSupplier(supplier.id),
    onDeleted: (supplier) => {
      setAllSuppliers((prev) => removeById(prev, supplier.id));
      setToast({
        id: `del-${Date.now()}`,
        type: 'success',
        title: 'Supplier Deleted',
        description: `${supplier.name} was permanently removed.`,
      });
      setSelectedSupplierId(null);
    },
  });

  // Load the reusable supplier category list from the organization catalogue.
  useEffect(() => {
    async function loadAux() {
      try {
        setCategories(await supplierService.getCategories());
      } catch (e) {
        console.error('Failed to load auxiliary supplier options:', e);
      }
    }
    loadAux();
  }, []);

  // Load Data — only for the initial mount or an error retry. Mutations no
  // longer trigger this; they update allSuppliers locally instead.
  const loadDirectory = useCallback(async () => {
    setIsLoading(true);
    try {
      setAllSuppliers(await supplierService.getAllSuppliers());
    } catch (err) {
      console.error('Failed to fetch suppliers:', err);
      setToast({
        id: `err-${Date.now()}`,
        type: 'warning',
        title: 'Network Issue',
        description: 'Failed to retrieve supplier records. Please retry.',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDirectory();
  }, [loadDirectory]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+N -> Add New Supplier
      if (e.altKey && (e.key === 'n' || e.key === 'N')) {
        e.preventDefault();
        setIsAddModalOpen(true);
        return;
      }

      // Ctrl+F or / -> Focus search input
      if (
        (e.ctrlKey && e.key === 'f') ||
        (e.key === '/' && document.activeElement?.tagName !== 'INPUT')
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
        return;
      }

      // Escape -> Close modal or detail drawer
      if (e.key === 'Escape') {
        if (isAddModalOpen) setIsAddModalOpen(false);
        else if (selectedSupplierId) setSelectedSupplierId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAddModalOpen, selectedSupplierId]);

  // Handlers
  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('ALL');
    setCategoryFilter('All Categories');
    setCurrentPage(1);
  };

  // CSV Export — derived locally from the already-loaded full set, matching the
  // current filters, with no extra network call.
  const handleExportDirectory = () => {
    try {
      const allMatching = deriveSupplierView(allSuppliers, {
        search: searchQuery,
        status: statusFilter,
        category: categoryFilter,
        page: 1,
        pageSize: Math.max(allSuppliers.length, 1),
      });
      exportSuppliersToCsv(allMatching.items);
      setToast({
        id: `exp-${Date.now()}`,
        type: 'success',
        title: 'Directory Exported',
        description: `Exported ${allMatching.items.length} supplier records to CSV.`,
      });
    } catch (e) {
      console.error('CSV export failed:', e);
      setToast({
        id: `err-exp-${Date.now()}`,
        type: 'warning',
        title: 'Export Failed',
        description: 'Could not generate directory export file.',
      });
    }
  };

  const handleAddSupplier = async (input: CreateSupplierInput) => {
    const created = await supplierService.createSupplier(input);
    setToast({
      id: `add-${Date.now()}`,
      type: 'success',
      title: 'Supplier Added',
      description: `${created.name} (${formatSupplierCode(created.supplierCode)}) is now registered.`,
    });
    setAllSuppliers((prev) => upsertById(prev, created));
    setCategories((prev) => Array.from(new Set([...prev, created.category])));
    // Open created supplier in detail drawer
    setSelectedSupplierId(created.id);
  };

  const handleUpdateSupplier = async (id: string, updates: UpdateSupplierInput) => {
    const updated = await supplierService.updateSupplier(id, updates);
    setToast({
      id: `upd-${Date.now()}`,
      type: 'success',
      title: 'Record Updated',
      description: `Changes to ${updated.name} have been saved.`,
    });
    setAllSuppliers((prev) => upsertById(prev, updated));
    setCategories((prev) => Array.from(new Set([...prev, updated.category])));
  };

  const handlePromptDelete = (supplier: Supplier) => {
    setSelectedSupplierId(null);
    deleteConfirmation.open(supplier);
  };

  const handleToggleStatus = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      const updated = await supplierService.toggleSupplierStatus(id);
      setToast({
        id: `st-${Date.now()}`,
        type: 'info',
        title: `Supplier ${updated.status}`,
        description: `${updated.name} is now marked as ${updated.status}.`,
      });
      setAllSuppliers((prev) => upsertById(prev, updated));
    } catch (err) {
      console.error('Toggle status failed:', err);
    }
  };

  const handleNewPurchaseOrder = (supplier: Supplier) => {
    setSelectedSupplierId(null);
    navigate('/purchases');
    // In real app or toast:
    setTimeout(() => {
      setToast({
        id: `po-nav-${Date.now()}`,
        type: 'info',
        title: 'Navigating to Purchases',
        description: `Ready to create purchase order for ${supplier.name}.`,
      });
    }, 100);
  };

  const isFiltered =
    searchQuery.trim().length > 0 ||
    statusFilter !== 'ALL' ||
    categoryFilter !== 'All Categories';

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden space-y-4 pb-2">
      {/* Page Header */}
      <SuppliersHeader
        onAddSupplier={() => setIsAddModalOpen(true)}
        onExportDirectory={handleExportDirectory}
      />

      {/* Quick Metrics Bar (KPI Cards) */}
      {data?.kpiSummary && <SuppliersKpiCards kpis={data.kpiSummary} />}

      {/* Filter & Search Toolbar */}
      <SuppliersFilterToolbar
        searchInputRef={searchInputRef}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        statusFilter={statusFilter}
        onStatusFilterChange={(s) => {
          setStatusFilter(s);
          setCurrentPage(1);
        }}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={(cat) => {
          setCategoryFilter(cat);
          setCurrentPage(1);
        }}
        categories={categories}
        onResetFilters={handleResetFilters}
        isFiltered={isFiltered}
      />

      {/* Suppliers Table */}
      <SuppliersTable
        suppliers={data?.items || []}
        onSelectSupplier={(s) => setSelectedSupplierId(s.id)}
        onToggleStatus={handleToggleStatus}
        isLoading={isLoading}
      />

      {/* Pagination Footer */}
      {data && (
        <SuppliersPagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={data.filteredCount}
          onPageChange={(p) => setCurrentPage(p)}
          onPageSizeChange={(sz) => {
            setPageSize(sz);
            setCurrentPage(1);
          }}
        />
      )}

      {/* Add Supplier Modal */}
      <AddSupplierModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSupplier}
        categories={categories}
      />

      {/* Supplier Detail Slide-out Drawer */}
      <SupplierDetailDrawer
        supplier={viewingSupplier}
        isOpen={Boolean(viewingSupplier)}
        onClose={() => setSelectedSupplierId(null)}
        onUpdate={handleUpdateSupplier}
        onToggleStatus={handleToggleStatus}
        onDelete={handlePromptDelete}
        onNewPurchaseOrder={handleNewPurchaseOrder}
        categories={categories}
      />

      <MasterDeleteConfirmDialog
        entityLabel="Supplier"
        recordName={deleteConfirmation.record?.name ?? ''}
        isOpen={deleteConfirmation.isOpen}
        isProcessing={deleteConfirmation.isProcessing}
        error={deleteConfirmation.error}
        onClose={deleteConfirmation.close}
        onConfirm={deleteConfirmation.confirm}
      />

      {/* Toast Notification */}
      <SupplierToast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
