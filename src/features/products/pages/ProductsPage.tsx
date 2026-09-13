import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Product,
  ProductQueryResult,
  StatusFilterOption,
  ProductType,
  CreateProductInput,
  UpdateProductInput,
} from '../types';
import { productService } from '../services/productService';
import { ProductsHeader } from '../components/ProductsHeader';
import { ProductsKpiCards } from '../components/ProductsKpiCards';
import { ProductsFilterToolbar } from '../components/ProductsFilterToolbar';
import { ProductsTable } from '../components/ProductsTable';
import { ProductsPagination } from '../components/ProductsPagination';
import { ProductDetailDrawer } from '../components/ProductDetailDrawer';
import { AddProductModal } from '../components/AddProductModal';
import { EditProductModal } from '../components/EditProductModal';
import { ProductToast, ToastMessage } from '../components/ProductToast';
import { getProductCreationErrorMessage } from '../services/productError';

export function ProductsPage() {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Data & KPI state
  const [data, setData] = useState<ProductQueryResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filter & pagination state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilterOption>('ALL');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [brandFilter, setBrandFilter] = useState('All Brands');
  const [typeFilter, setTypeFilter] = useState<ProductType | 'ALL'>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  // Selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Modals & drawers
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Load products catalogue
  const loadCatalogue = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await productService.getProducts({
        search: searchQuery,
        status: statusFilter,
        category: categoryFilter,
        brand: brandFilter,
        type: typeFilter,
        page: currentPage,
        pageSize,
      });
      setData(result);
    } catch (err) {
      console.error('Failed to fetch catalogue products:', err);
      setToast({
        id: `err-${Date.now()}`,
        type: 'warning',
        title: 'Network Error',
        description: 'Failed to load catalogue products. Please refresh.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, statusFilter, categoryFilter, brandFilter, typeFilter, currentPage, pageSize]);

  useEffect(() => {
    loadCatalogue();
  }, [loadCatalogue]);

  useEffect(() => {
    void Promise.all([productService.getCategories(), productService.getBrands()])
      .then(([nextCategories, nextBrands]) => {
        setCategories(nextCategories);
        setBrands(nextBrands);
      })
      .catch((error) => console.error('Failed to load product filter options:', error));
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+P -> Open Add Product
      if (e.altKey && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        setIsAddModalOpen(true);
        return;
      }

      // Ctrl+F or / -> Focus search query
      if ((e.ctrlKey && e.key === 'f') || (e.key === '/' && document.activeElement?.tagName !== 'INPUT')) {
        e.preventDefault();
        searchInputRef.current?.focus();
        return;
      }

      // Escape -> Close drawer or modal
      if (e.key === 'Escape') {
        if (isAddModalOpen) setIsAddModalOpen(false);
        else if (editingProduct) setEditingProduct(null);
        else if (viewingProduct) setViewingProduct(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAddModalOpen, editingProduct, viewingProduct]);

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
    setStatusFilter('ALL');
    setCategoryFilter('All Categories');
    setBrandFilter('All Brands');
    setTypeFilter('ALL');
    setCurrentPage(1);
  };

  // Export CSV
  const handleExportCsv = () => {
    if (!data || data.items.length === 0) {
      setToast({
        id: `toast-${Date.now()}`,
        type: 'warning',
        title: 'Export Unavailable',
        description: 'No products in the current filtered view to export.',
      });
      return;
    }

    const headers = [
      'Product Code',
      'Name',
      'Brand',
      'Category',
      'Type',
      'SKU',
      'Barcode',
      'Selling Price',
      'MRP',
      'Cost',
      'Status',
      'Total Stock',
    ];

    const rows = data.items.map((p) => [
      `"${p.productCode}"`,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.brand}"`,
      `"${p.categoryName}"`,
      `"${p.type}"`,
      `"${p.sku}"`,
      `"${p.barcode || ''}"`,
      p.sellingPrice.toFixed(2),
      p.mrp !== undefined ? p.mrp.toFixed(2) : '',
      p.cost !== undefined ? p.cost.toFixed(2) : '',
      `"${p.status}"`,
      p.stockSummary ? p.stockSummary.onHandTotal : 'N/A',
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `products_catalogue_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToast({
      id: `toast-${Date.now()}`,
      type: 'success',
      title: 'Catalogue Exported',
      description: `Successfully exported ${data.items.length} master SKU items to CSV.`,
    });
  };

  // Create Product handler
  const handleCreateProduct = async (input: CreateProductInput) => {
    try {
      const created = await productService.createProduct(input);
      setIsAddModalOpen(false);
      await loadCatalogue();
      setToast({
        id: `toast-${Date.now()}`,
        type: 'success',
        title: 'Master SKU Created',
        description: `Successfully added ${created.productCode} (${created.name}) to catalogue.`,
      });
    } catch (err) {
      console.error('Failed to create product:', err);
      setToast({
        id: `toast-${Date.now()}`,
        type: 'warning',
        title: 'Creation Failed',
        description: getProductCreationErrorMessage(err),
      });
    }
  };

  // Update Product handler
  const handleUpdateProduct = async (input: UpdateProductInput) => {
    try {
      const updated = await productService.updateProduct(input.id, input);
      setEditingProduct(null);
      if (viewingProduct?.id === input.id) {
        setViewingProduct(updated);
      }
      await loadCatalogue();
      setToast({
        id: `toast-${Date.now()}`,
        type: 'success',
        title: 'Product Updated',
        description: `Successfully saved master data for ${updated.productCode}.`,
      });
    } catch (err) {
      console.error('Failed to update product:', err);
      setToast({
        id: `toast-${Date.now()}`,
        type: 'warning',
        title: 'Update Failed',
        description: 'Failed to save product master changes.',
      });
    }
  };

  // Toggle Active/Inactive status
  const handleToggleStatus = async (product: Product) => {
    const nextStatus = product.status === 'active' ? 'inactive' : 'active';
    try {
      const updated = await productService.changeProductStatus(product.id, nextStatus);
      if (viewingProduct?.id === product.id) {
        setViewingProduct(updated);
      }
      await loadCatalogue();
      setToast({
        id: `toast-${Date.now()}`,
        type: 'info',
        title: 'Status Updated',
        description: `${product.productCode} is now set to ${nextStatus.toUpperCase()}.`,
      });
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  // Duplicate Product
  const handleDuplicateProduct = async (product: Product) => {
    try {
      const created = await productService.createProduct({
        name: `${product.name} (Copy)`,
        brand: product.brand,
        categoryId: product.categoryId,
        categoryName: product.categoryName,
        subcategory: product.subcategory,
        type: product.type,
        sku: `${product.sku}-CPY`,
        unitOfMeasure: product.unitOfMeasure,
        sellingPrice: product.sellingPrice,
        mrp: product.mrp,
        cost: product.cost,
        minSellingPrice: product.minSellingPrice,
        discountAllowed: product.discountAllowed,
        taxCategory: product.taxCategory,
        status: 'active',
        reorderLevel: product.reorderLevel,
        reorderQuantity: product.reorderQuantity,
        openingStock: 0,
        primarySupplier: product.primarySupplier,
        description: product.description,
        variantsConfigured: product.variantsConfigured,
      });
      await loadCatalogue();
      setViewingProduct(created);
      setToast({
        id: `toast-${Date.now()}`,
        type: 'success',
        title: 'Product Duplicated',
        description: `Created new draft ${created.productCode} based on ${product.productCode}.`,
      });
    } catch (err) {
      console.error('Failed to duplicate:', err);
    }
  };

  // Navigate to inventory with SKU filter
  const handleNavigateToInventory = (sku?: string) => {
    if (sku) {
      navigate(`/inventory?search=${encodeURIComponent(sku)}`);
    } else {
      navigate('/inventory');
    }
  };

  return (
    <div className="flex flex-col w-full h-full min-h-0 overflow-y-auto pr-1">
      <div className="py-space-base space-y-space-base pb-16">
        {/* 1. Page Header */}
        <ProductsHeader
          totalCount={data?.totalCount || 10}
          onExportCsv={handleExportCsv}
          onOpenAddModal={() => setIsAddModalOpen(true)}
        />

        {/* 2. KPI Summary Cards */}
        {data?.kpis && <ProductsKpiCards kpis={data.kpis} />}

        {/* 3. Filter Toolbar */}
        <ProductsFilterToolbar
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            setCurrentPage(1);
          }}
          statusFilter={statusFilter}
          onStatusFilterChange={(st) => {
            setStatusFilter(st);
            setCurrentPage(1);
          }}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={(cat) => {
            setCategoryFilter(cat);
            setCurrentPage(1);
          }}
          brandFilter={brandFilter}
          onBrandFilterChange={(b) => {
            setBrandFilter(b);
            setCurrentPage(1);
          }}
          typeFilter={typeFilter}
          onTypeFilterChange={(t) => {
            setTypeFilter(t);
            setCurrentPage(1);
          }}
          onRefresh={loadCatalogue}
          onResetFilters={handleResetFilters}
          searchInputRef={searchInputRef}
          categories={categories}
          brands={brands}
        />

        {/* 4. Products Table & Pagination Container */}
        <div className="bg-surface-container-lowest rounded-lg shadow-sm overflow-hidden border border-outline-variant/20 flex flex-col">
          <ProductsTable
            items={data?.items || []}
            selectedIds={selectedIds}
            onToggleSelectRow={handleToggleSelectRow}
            onToggleSelectAll={handleToggleSelectAll}
            onViewProduct={(p) => setViewingProduct(p)}
            onEditProduct={(p) => setEditingProduct(p)}
            onToggleStatus={handleToggleStatus}
            isLoading={isLoading}
          />

          {data && (
            <ProductsPagination
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

      {/* Slide-over Product Detail Drawer */}
      <ProductDetailDrawer
        product={viewingProduct}
        onClose={() => setViewingProduct(null)}
        onEdit={(p) => {
          setViewingProduct(null);
          setEditingProduct(p);
        }}
        onToggleStatus={handleToggleStatus}
        onNavigateToInventory={() => {
          if (viewingProduct) {
            handleNavigateToInventory(viewingProduct.sku);
          }
        }}
        onDuplicate={handleDuplicateProduct}
      />

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCreated={handleCreateProduct}
      />

      {/* Edit Product Modal */}
      <EditProductModal
        product={editingProduct}
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        onUpdated={handleUpdateProduct}
      />

      {/* Toast Notification */}
      <ProductToast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
