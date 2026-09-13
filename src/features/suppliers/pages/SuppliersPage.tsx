import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Supplier,
  SupplierQueryResult,
  SupplierStatus,
  CreateSupplierInput,
  UpdateSupplierInput,
} from '../types';
import { supplierService } from '../services/supplierService';
import { exportSuppliersToCsv } from '../utils/calculations';
import { SuppliersHeader } from '../components/SuppliersHeader';
import { SuppliersKpiCards } from '../components/SuppliersKpiCards';
import { SuppliersFilterToolbar } from '../components/SuppliersFilterToolbar';
import { SuppliersTable } from '../components/SuppliersTable';
import { SuppliersPagination } from '../components/SuppliersPagination';
import { AddSupplierDrawer } from '../components/AddSupplierDrawer';
import { SupplierDetailDrawer } from '../components/SupplierDetailDrawer';
import { SupplierToast, SupplierToastMessage } from '../components/SupplierToast';

export function SuppliersPage() {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Data & KPI state
  const [data, setData] = useState<SupplierQueryResult | null>(null);
  const [cities, setCities] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters & pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | SupplierStatus>('ALL');
  const [cityFilter, setCityFilter] = useState('All Cities');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Drawers & Modals
  const [viewingSupplier, setViewingSupplier] = useState<Supplier | null>(null);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [toast, setToast] = useState<SupplierToastMessage | null>(null);

  // Load auxiliary lists (cities, categories)
  useEffect(() => {
    async function loadAux() {
      try {
        const [citiesList, catsList] = await Promise.all([
          supplierService.getCities(),
          supplierService.getCategories(),
        ]);
        setCities(citiesList);
        setCategories(catsList);
      } catch (e) {
        console.error('Failed to load auxiliary supplier options:', e);
      }
    }
    loadAux();
  }, []);

  // Fetch directory
  const loadDirectory = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await supplierService.getSuppliers({
        search: searchQuery,
        status: statusFilter,
        city: cityFilter,
        category: categoryFilter,
        page: currentPage,
        pageSize,
      });
      setData(result);
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
  }, [searchQuery, statusFilter, cityFilter, categoryFilter, currentPage, pageSize]);

  useEffect(() => {
    loadDirectory();
  }, [loadDirectory]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+N -> Add New Supplier
      if (e.altKey && (e.key === 'n' || e.key === 'N')) {
        e.preventDefault();
        setIsAddDrawerOpen(true);
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

      // Escape -> Close drawer
      if (e.key === 'Escape') {
        if (isAddDrawerOpen) setIsAddDrawerOpen(false);
        else if (viewingSupplier) setViewingSupplier(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAddDrawerOpen, viewingSupplier]);

  // Handlers
  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('ALL');
    setCityFilter('All Cities');
    setCategoryFilter('All Categories');
    setCurrentPage(1);
  };

  const handleExportDirectory = async () => {
    try {
      // Export all matching current filters without page limit
      const allMatching = await supplierService.getSuppliers({
        search: searchQuery,
        status: statusFilter,
        city: cityFilter,
        category: categoryFilter,
        page: 1,
        pageSize: 1000,
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
      description: `${created.name} (${created.supplierCode}) is now registered.`,
    });
    // Refresh directory
    await loadDirectory();
    // Open created supplier in detail drawer
    setViewingSupplier(created);
  };

  const handleUpdateSupplier = async (id: string, updates: UpdateSupplierInput) => {
    const updated = await supplierService.updateSupplier(id, updates);
    setViewingSupplier(updated);
    setToast({
      id: `upd-${Date.now()}`,
      type: 'success',
      title: 'Record Updated',
      description: `Changes to ${updated.name} have been saved.`,
    });
    await loadDirectory();
  };

  const handleToggleStatus = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      const updated = await supplierService.toggleSupplierStatus(id);
      if (viewingSupplier && viewingSupplier.id === id) {
        setViewingSupplier(updated);
      }
      setToast({
        id: `st-${Date.now()}`,
        type: 'info',
        title: `Supplier ${updated.status}`,
        description: `${updated.name} is now marked as ${updated.status}.`,
      });
      await loadDirectory();
    } catch (err) {
      console.error('Toggle status failed:', err);
    }
  };

  const handleNewPurchaseOrder = (supplier: Supplier) => {
    setViewingSupplier(null);
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
    cityFilter !== 'All Cities' ||
    categoryFilter !== 'All Categories';

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden space-y-4 pb-2">
      {/* Page Header */}
      <SuppliersHeader
        onAddSupplier={() => setIsAddDrawerOpen(true)}
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
        cityFilter={cityFilter}
        onCityFilterChange={(c) => {
          setCityFilter(c);
          setCurrentPage(1);
        }}
        cities={cities}
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
        onSelectSupplier={(s) => setViewingSupplier(s)}
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

      {/* Add Supplier Slide-out Drawer */}
      <AddSupplierDrawer
        isOpen={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
        onSubmit={handleAddSupplier}
        categories={categories}
      />

      {/* Supplier Detail Slide-out Drawer */}
      <SupplierDetailDrawer
        supplier={viewingSupplier}
        isOpen={Boolean(viewingSupplier)}
        onClose={() => setViewingSupplier(null)}
        onUpdate={handleUpdateSupplier}
        onToggleStatus={handleToggleStatus}
        onNewPurchaseOrder={handleNewPurchaseOrder}
      />

      {/* Toast Notification */}
      <SupplierToast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
