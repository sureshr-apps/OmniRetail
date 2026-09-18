import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  InventoryItem,
  InventoryMovementLog,
  InventoryQueryResult,
  InventoryLocation,
  SupplierSummary,
  StockStatusTab,
  SortOption,
  StockAdjustmentInput,
  AddInventoryInput,
} from '../types';
import {
  inventoryService,
  getInventoryLocations,
  getInventorySuppliers,
  deriveStockStatus,
  calculateMarginPercent,
} from '../services/inventoryService';
import { InventoryHeader } from '../components/InventoryHeader';
import { InventoryKpiCards } from '../components/InventoryKpiCards';
import { InventoryFilterBar } from '../components/InventoryFilterBar';
import { InventoryTable } from '../components/InventoryTable';
import { InventoryPagination } from '../components/InventoryPagination';
import { InventoryShortcutsBar } from '../components/InventoryShortcutsBar';
import { StockAdjustModal } from '../components/StockAdjustModal';
import { StockAuditHistoryModal } from '../components/StockAuditHistoryModal';
import { AddNewProductModal } from '../components/AddNewProductModal';
import { AddInventoryModal } from '../components/AddInventoryModal';
import { InventoryToast } from '../components/InventoryToast';
import { productService } from '@/features/products/services/productService';
import type { Product } from '@/features/products/types';
import { useTenantOutlet } from '@/app/context/TenantOutletContext';

export function InventoryPage() {
  // Query Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<StockStatusTab>('ALL');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedSupplier, setSelectedSupplier] = useState('all');
  const [selectedSort, setSelectedSort] = useState<SortOption>('STOCK_ASC');
  const [locations, setLocations] = useState<InventoryLocation[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierSummary[]>([]);

  // Pagination State
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Data State
  const [data, setData] = useState<InventoryQueryResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Selection State
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Modal State
  const [adjustingItem, setAdjustingItem] = useState<InventoryItem | null>(null);
  const [historyItem, setHistoryItem] = useState<InventoryItem | null>(null);
  const [historyMovements, setHistoryMovements] = useState<InventoryMovementLog[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddInventoryOpen, setIsAddInventoryOpen] = useState(false);
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
  const tenantOutlet = useTenantOutlet();

  // Toast Notification State
  const [toast, setToast] = useState<{ title: string; message: string } | null>(null);

  // Search input ref for F3 shortcut
  const searchInputRef = useRef<HTMLInputElement>(null);
  const historyRequestRef = useRef(0);

  const showToast = (title: string, message: string) => {
    setToast({ title, message });
  };

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Fetch Inventory Data
  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await inventoryService.getInventory({
        search: searchQuery,
        statusTab: activeTab,
        locationId: selectedLocation,
        supplierId: selectedSupplier,
        sort: selectedSort,
        page,
        pageSize,
      });
      setData(result);
    } catch (err) {
      console.error('Failed to load inventory data', err);
    } finally {
      setIsLoading(false);
    }
  }, [
    searchQuery,
    activeTab,
    selectedLocation,
    selectedSupplier,
    selectedSort,
    page,
    pageSize,
  ]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    Promise.all([getInventoryLocations(), getInventorySuppliers()]).then(([locationOptions, supplierOptions]) => {
      setLocations(locationOptions);
      setSuppliers(supplierOptions);
    }).catch((error) => console.error('Failed to load inventory filters', error));
  }, []);

  useEffect(() => {
    let active = true;
    productService.getAllProducts().then((products) => {
      if (active) setCatalogProducts(products.filter((product) => product.status === 'active' && product.type !== 'service'));
    }).catch((error) => console.error('Failed to load catalogue products', error));
    return () => { active = false; };
  }, []);

  // Keyboard Shortcuts Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAdjustingItem(null);
        setHistoryItem(null);
        setIsAddProductOpen(false);
        setIsAddInventoryOpen(false);
      } else if (e.key === 'F3') {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      } else if (e.key === 'F4') {
        e.preventDefault();
        // If an item is selected or first visible item
        if (data && data.items.length > 0) {
          const firstSelected =
            data.items.find((i) => selectedIds.has(i.id)) || data.items[0];
          setAdjustingItem(firstSelected);
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        handlePrintBarcodes();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [data, selectedIds]);

  // Row Selection Handlers
  const handleToggleSelectRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleToggleSelectAll = () => {
    if (!data) return;
    const allCurrentPageIds = data.items.map((i) => i.id);
    const isAllSelected = allCurrentPageIds.every((id) => selectedIds.has(id));

    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (isAllSelected) {
        allCurrentPageIds.forEach((id) => next.delete(id));
      } else {
        allCurrentPageIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  const handleClearSelection = () => {
    setSelectedIds(new Set());
  };

  // Adjust Stock Confirmation
  const handleConfirmAdjustment = async (input: StockAdjustmentInput) => {
    try {
      const res = await inventoryService.adjustStock(input);
      setAdjustingItem(null);
      const modeWord =
        input.mode === 'decrease'
          ? 'Reduced by'
          : input.mode === 'increase'
          ? 'Increased by'
          : 'Reset to';
      showToast(
        'Adjustment Recorded',
        `${input.sku} ${modeWord} ${input.quantity} units. Stock is now ${res.newQty} units.`
      );
      // Reload inventory & KPIs
      await loadData();
    } catch (err: any) {
      showToast('Adjustment Failed', err?.message || 'Unable to update stock.');
    }
  };

  // Quick action from shortcuts bar: Adjust selected
  const handleAdjustSelected = () => {
    if (!data || data.items.length === 0) return;
    const targetItem =
      data.items.find((i) => selectedIds.has(i.id)) || data.items[0];
    setAdjustingItem(targetItem);
  };

  // Barcode print action
  const handlePrintBarcodes = () => {
    const count = selectedIds.size > 0 ? selectedIds.size : (data?.items.length || 0);
    showToast(
      'Print Spooler Triggered',
      `Thermal barcode labels generated for ${count} items (38mm x 25mm Avery spec).`
    );
  };

  // Export CSV
  const handleExportCsv = () => {
    if (!data || data.items.length === 0) {
      showToast('Export Error', 'No inventory items available to export.');
      return;
    }

    const headers = [
      'SKU',
      'Barcode',
      'Product Name',
      'Department',
      'Location',
      'On-Hand Qty',
      'MRP',
      'Cost',
      'Retail Price',
      'Margin %',
      'Stock Status',
    ];

    const rows = data.items.map((item) => {
      const status = deriveStockStatus(
        item.onHandQty,
        item.reorderLevel,
        item.overstockThreshold
      );
      const margin = calculateMarginPercent(item.retailPrice, item.cost);
      return [
        `"${item.sku}"`,
        `"${item.barcode}"`,
        `"${item.name.replace(/"/g, '""')}"`,
        `"${item.department}"`,
        `"${item.locationName}"`,
        item.onHandQty,
        item.mrp.toFixed(2),
        item.cost.toFixed(2),
        item.retailPrice.toFixed(2),
        `${margin.toFixed(1)}%`,
        `"${status}"`,
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `inventory-export-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Export Complete', `Exported ${data.items.length} inventory records to CSV.`);
  };

  // Add Product Handler
  const handleCreateProduct = async (productData: Partial<InventoryItem>) => {
    try {
      if (!tenantOutlet?.selectedOutletId) {
        throw new Error('Please select an outlet before creating inventory.');
      }
      const created = await inventoryService.addProduct(productData);
      setIsAddProductOpen(false);
      showToast('Product Cataloged', `${created.sku} • ${created.name} added to inventory.`);
      await loadData();
    } catch (err: any) {
      showToast('Creation Failed', err?.message || 'Could not add product.');
    }
  };

  const handleAddInventory = async (input: AddInventoryInput) => {
    try {
      if (!tenantOutlet?.selectedOutletId) {
        throw new Error('Please select an outlet before adding inventory.');
      }
      await inventoryService.addInventoryUnits({ ...input, outletId: tenantOutlet.selectedOutletId });
      setIsAddInventoryOpen(false);
      const product = catalogProducts.find((candidate) => candidate.id === input.productId);
      showToast(
        'Inventory Added',
        `${input.quantity} units of ${product?.name ?? 'the product'} added to ${tenantOutlet.selectedOutlet?.name ?? 'the selected outlet'}.`
      );
      await loadData();
    } catch (err: any) {
      showToast('Inventory Addition Failed', err?.message || 'Could not add inventory.');
    }
  };

  const handleViewHistory = async (item: InventoryItem) => {
    const requestId = historyRequestRef.current + 1;
    historyRequestRef.current = requestId;
    setHistoryItem(item);
    setHistoryMovements([]);
    setHistoryError(null);
    setIsHistoryLoading(true);
    try {
      const movements = await inventoryService.getMovementHistory(item);
      if (historyRequestRef.current === requestId) setHistoryMovements(movements);
    } catch (error) {
      if (historyRequestRef.current === requestId) setHistoryError(error instanceof Error ? error.message : 'Unable to load stock movement history.');
    } finally {
      if (historyRequestRef.current === requestId) setIsHistoryLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full min-h-0 overflow-y-auto pr-1">
      <div className="flex flex-col gap-space-base py-space-base pb-16">
        {/* Top Command & Action Bar */}
        <InventoryHeader
          onExportCsv={handleExportCsv}
          onAddInventory={() => setIsAddInventoryOpen(true)}
          onAddNewProduct={() => setIsAddProductOpen(true)}
        />

        {/* KPI Metric Strip (4 Cards) */}
        {data && <InventoryKpiCards kpis={data.kpis} />}

        {/* Filter, Search & Segment Strip */}
        {data && (
          <InventoryFilterBar
            searchQuery={searchQuery}
            onSearchChange={(q) => {
              setSearchQuery(q);
              setPage(1);
            }}
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              setPage(1);
            }}
            tabCounts={data.tabCounts}
            selectedLocation={selectedLocation}
            onLocationChange={(loc) => {
              setSelectedLocation(loc);
              setPage(1);
            }}
            selectedSort={selectedSort}
            onSortChange={(s) => {
              setSelectedSort(s);
              setPage(1);
            }}
            selectedSupplier={selectedSupplier}
            onSupplierChange={(sup) => {
              setSelectedSupplier(sup);
              setPage(1);
            }}
            searchInputRef={searchInputRef}
            locations={locations}
            suppliers={suppliers}
          />
        )}

        {/* Comprehensive Inventory High-Density Data Table Card */}
        <div className="bg-surface-container-lowest rounded-lg shadow-sm overflow-hidden flex flex-col">
          <InventoryTable
            items={data?.items || []}
            selectedIds={selectedIds}
            onToggleSelectRow={handleToggleSelectRow}
            onToggleSelectAll={handleToggleSelectAll}
            onAdjustStock={(item) => setAdjustingItem(item)}
            onViewHistory={handleViewHistory}
            isLoading={isLoading}
          />

          {data && (
            <InventoryPagination
              currentPage={data.page}
              totalPages={data.totalPages}
              totalCount={data.totalCount}
              filteredCount={data.filteredCount}
              pageSize={data.pageSize}
              onPageChange={(p) => setPage(p)}
              onPageSizeChange={(sz) => {
                setPageSize(sz);
                setPage(1);
              }}
            />
          )}
        </div>

        {/* Terminal Quick Status & Shortcuts Drawer Bar */}
        <InventoryShortcutsBar
          selectedCount={selectedIds.size}
          onClearSelection={handleClearSelection}
          onFocusSearch={() => {
            searchInputRef.current?.focus();
            searchInputRef.current?.select();
          }}
          onAdjustSelected={handleAdjustSelected}
          onPrintBarcodes={handlePrintBarcodes}
        />
      </div>

      {/* Manual Stock Adjustment Modal */}
      {adjustingItem && (
        <StockAdjustModal
          item={adjustingItem}
          onClose={() => setAdjustingItem(null)}
          onConfirm={handleConfirmAdjustment}
        />
      )}

      {/* Stock Movement Audit Trail Modal */}
      {historyItem && (
        <StockAuditHistoryModal
          item={historyItem}
          movements={historyMovements}
          isLoading={isHistoryLoading}
          error={historyError}
          onClose={() => setHistoryItem(null)}
        />
      )}

      {/* Add New Product Modal */}
      {isAddProductOpen && (
        <AddNewProductModal
          onClose={() => setIsAddProductOpen(false)}
          onSave={handleCreateProduct}
          currentOutletId={tenantOutlet?.selectedOutletId ?? null}
          currentOutletName={tenantOutlet?.selectedOutlet?.name}
        />
      )}

      {isAddInventoryOpen && (
        <AddInventoryModal
          currentOutletId={tenantOutlet?.selectedOutletId ?? null}
          currentOutletName={tenantOutlet?.selectedOutlet?.name}
          products={catalogProducts}
          onClose={() => setIsAddInventoryOpen(false)}
          onSave={handleAddInventory}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <InventoryToast
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
