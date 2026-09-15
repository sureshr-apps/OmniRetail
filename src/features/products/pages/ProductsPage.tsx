import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/context/AuthContext';
import {
  Product,
  StatusFilterOption,
  ProductType,
  CreateProductInput,
  UpdateProductInput,
  ProductCategoryOption,
  ProductSubcategoryOption,
} from '../types';
import { Supplier } from '@/features/suppliers/types';
import { productService, deriveProductView } from '../services/productService';
import { supplierService } from '@/features/suppliers/services/supplierService';
import { formatProductCode } from '../utils/formatProductCode';
import { upsertById, removeById } from '@/shared/utils/listState';
import { useDeleteConfirmation } from '@/shared/hooks/useDeleteConfirmation';
import { MasterDeleteConfirmDialog } from '@/shared/components/MasterDeleteConfirmDialog';
import { ProductsHeader } from '../components/ProductsHeader';
import { ProductsKpiCards } from '../components/ProductsKpiCards';
import { ProductsFilterToolbar } from '../components/ProductsFilterToolbar';
import { ProductsTable } from '../components/ProductsTable';
import { ProductsPagination } from '../components/ProductsPagination';
import { ProductDetailDrawer } from '../components/ProductDetailDrawer';
import { AddProductModal } from '../components/AddProductModal';
import { EditProductModal } from '../components/EditProductModal';
import { ManageProductTaxonomyModal } from '../components/ManageProductTaxonomyModal';
import { ProductToast, ToastMessage } from '../components/ProductToast';
import { getProductCreationErrorMessage } from '../services/productError';

function mergeProductCategoryOption(options: ProductCategoryOption[], product: Product): ProductCategoryOption[] {
  const categoryIndex = options.findIndex((category) => category.id === product.categoryId || category.value.toLowerCase() === product.categoryName.toLowerCase());
  if (categoryIndex < 0) {
    return [...options, {
      id: product.categoryId,
      value: product.categoryName,
      subcategories: product.subcategoryId && product.subcategory ? [{ id: product.subcategoryId, value: product.subcategory }] : [],
    }].sort((a, b) => a.value.localeCompare(b.value));
  }
  const next = options.slice();
  const category = next[categoryIndex];
  if (product.subcategoryId && product.subcategory && !category.subcategories.some((subcategory) => subcategory.id === product.subcategoryId)) {
    next[categoryIndex] = { ...category, subcategories: [...category.subcategories, { id: product.subcategoryId, value: product.subcategory }] };
  }
  return next;
}

type TaxonomyDeleteTarget =
  | { kind: 'category'; category: ProductCategoryOption }
  | { kind: 'subcategory'; category: ProductCategoryOption; subcategory: ProductSubcategoryOption };

export function ProductsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isOrganizationAdmin = user?.roles.some((role) => role.code === 'organization.admin') ?? false;

  // Data: the full org-scoped set. Mutations upsert into this directly; the
  // visible page, filters, and KPIs are all derived from it below.
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter & pagination state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilterOption>('ALL');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [brandFilter, setBrandFilter] = useState('All Brands');
  const [typeFilter, setTypeFilter] = useState<ProductType | 'ALL'>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<ProductCategoryOption[]>([]);

  const categories = useMemo(
    () => categoryOptions.map((category) => category.value),
    [categoryOptions],
  );
  const brands = useMemo(
    () => Array.from(new Set(allProducts.map((product) => product.brand).filter(Boolean))).sort(),
    [allProducts],
  );
  // Selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Modals & drawers — viewingProductId/editingProductId are derived to the
  // record itself below, so they stay in sync with allProducts automatically.
  const [viewingProductId, setViewingProductId] = useState<string | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTaxonomyModalOpen, setIsTaxonomyModalOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const data = useMemo(
    () => deriveProductView(allProducts, {
      search: searchQuery,
      status: statusFilter,
      category: categoryFilter,
      brand: brandFilter,
      type: typeFilter,
      page: currentPage,
      pageSize,
    }),
    [allProducts, searchQuery, statusFilter, categoryFilter, brandFilter, typeFilter, currentPage, pageSize],
  );
  const viewingProduct = useMemo(
    () => allProducts.find((p) => p.id === viewingProductId) ?? null,
    [allProducts, viewingProductId],
  );
  const editingProduct = useMemo(
    () => allProducts.find((p) => p.id === editingProductId) ?? null,
    [allProducts, editingProductId],
  );

  const deleteConfirmation = useDeleteConfirmation<Product>({
    deleteRecord: (product) => productService.deleteProduct(product.id),
    onDeleted: (product) => {
      setAllProducts((prev) => removeById(prev, product.id));
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
      setViewingProductId(null);
      setToast({
        id: `toast-${Date.now()}`,
        type: 'success',
        title: 'Product Deleted',
        description: `${formatProductCode(product.productCode)} was permanently removed.`,
      });
    },
  });

  // Load products catalogue — only for the initial mount or an explicit refresh.
  // Mutations no longer trigger this; they update allProducts locally instead.
  const loadCatalogue = useCallback(async () => {
    setIsLoading(true);
    try {
      const [products, categoryMasters] = await Promise.all([
        productService.getAllProducts(),
        productService.getCategoryOptions(),
      ]);
      setAllProducts(products);
      setCategoryOptions(categoryMasters);
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
  }, []);

  useEffect(() => {
    loadCatalogue();
  }, [loadCatalogue]);

  useEffect(() => {
    void supplierService.getAllSuppliers()
      .then(setSuppliers)
      .catch((error) => console.error('Failed to load product supplier options:', error));
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
        else if (isTaxonomyModalOpen) setIsTaxonomyModalOpen(false);
        else if (editingProductId) setEditingProductId(null);
        else if (viewingProductId) setViewingProductId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAddModalOpen, isTaxonomyModalOpen, editingProductId, viewingProductId]);

  // Selection handlers
  const handleToggleSelectRow = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleToggleSelectAll = () => {
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
    if (data.items.length === 0) {
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
      `"${formatProductCode(p.productCode)}"`,
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
  const handleCreateProducts = async (inputs: CreateProductInput[]) => {
    const createdProducts: Product[] = [];
    try {
      for (const input of inputs) {
        createdProducts.push(await productService.createProduct(input));
      }
      setIsAddModalOpen(false);
      for (const created of createdProducts) {
        setAllProducts((prev) => upsertById(prev, created));
        setCategoryOptions((prev) => mergeProductCategoryOption(prev, created));
      }
      setToast({
        id: `toast-${Date.now()}`,
        type: 'success',
        title: inputs.length === 1 ? 'Master SKU Created' : 'Variant Products Created',
        description: inputs.length === 1
          ? `Successfully added ${formatProductCode(createdProducts[0].productCode)} (${createdProducts[0].name}) to catalogue.`
          : `Successfully added ${createdProducts.length} products for the selected variants.`,
      });
    } catch (err) {
      console.error('Failed to create product:', err);
      setToast({
        id: `toast-${Date.now()}`,
        type: 'warning',
        title: 'Creation Failed',
        description: createdProducts.length > 0
          ? `${createdProducts.length} variant product(s) were created before the failure. ${getProductCreationErrorMessage(err)}`
          : getProductCreationErrorMessage(err),
      });
      throw err;
    }
  };

  // Update Product handler
  const handleUpdateProduct = async (input: UpdateProductInput) => {
    try {
      const updated = await productService.updateProduct(input.id, input);
      setEditingProductId(null);
      setAllProducts((prev) => upsertById(prev, updated));
      setCategoryOptions((prev) => mergeProductCategoryOption(prev, updated));
      setToast({
        id: `toast-${Date.now()}`,
        type: 'success',
        title: 'Product Updated',
        description: `Successfully saved master data for ${formatProductCode(updated.productCode)}.`,
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
      setAllProducts((prev) => upsertById(prev, updated));
      setToast({
        id: `toast-${Date.now()}`,
        type: 'info',
        title: 'Status Updated',
        description: `${formatProductCode(product.productCode)} is now set to ${nextStatus.toUpperCase()}.`,
      });
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  const handlePromptDelete = (product: Product) => {
    setViewingProductId(null);
    deleteConfirmation.open(product);
  };

  const taxonomyDeleteConfirmation = useDeleteConfirmation<TaxonomyDeleteTarget>({
    deleteRecord: (target) => target.kind === 'category'
      ? productService.deleteCategory(target.category.id)
      : productService.deleteSubcategory(target.subcategory.id),
    onDeleted: (target) => {
      if (target.kind === 'category') {
        setCategoryOptions((prev) => prev.filter((category) => category.id !== target.category.id));
        if (categoryFilter === target.category.value) setCategoryFilter('All Categories');
        setToast({ id: `toast-${Date.now()}`, type: 'success', title: 'Category Deleted', description: `${target.category.value} was permanently removed.` });
      } else {
        setCategoryOptions((prev) => prev.map((category) => category.id === target.category.id
          ? { ...category, subcategories: category.subcategories.filter((subcategory) => subcategory.id !== target.subcategory.id) }
          : category));
        setToast({ id: `toast-${Date.now()}`, type: 'success', title: 'Subcategory Deleted', description: `${target.subcategory.value} was permanently removed.` });
      }
    },
  });

  const handlePromptTaxonomyDelete = (target: TaxonomyDeleteTarget) => {
    setIsTaxonomyModalOpen(false);
    taxonomyDeleteConfirmation.open(target);
  };

  const handleCreateCategory = async (value: string) => {
    try {
      const created = await productService.createCategory(value);
      setCategoryOptions((prev) => [...prev, created].sort((a, b) => a.value.localeCompare(b.value)));
      setToast({ id: `toast-${Date.now()}`, type: 'success', title: 'Category Added', description: `${created.value} is now available for products.` });
    } catch (error) {
      setToast({ id: `toast-${Date.now()}`, type: 'warning', title: 'Category Not Added', description: 'Could not add this category.' });
      throw error;
    }
  };

  const handleUpdateCategory = async (id: string, value: string) => {
    try {
      const updated = await productService.updateCategory(id, value);
      setCategoryOptions((prev) => prev.map((category) => category.id === id ? { ...category, value: updated.value } : category));
      setAllProducts((prev) => prev.map((product) => product.categoryId === id ? { ...product, categoryName: updated.value } : product));
      setToast({ id: `toast-${Date.now()}`, type: 'success', title: 'Category Updated', description: `Category renamed to ${updated.value}.` });
    } catch (error) {
      setToast({ id: `toast-${Date.now()}`, type: 'warning', title: 'Category Not Updated', description: 'Could not rename this category.' });
      throw error;
    }
  };

  const handleCreateSubcategory = async (categoryId: string, value: string) => {
    try {
      const created = await productService.createSubcategory(categoryId, value);
      setCategoryOptions((prev) => prev.map((category) => category.id === categoryId
        ? { ...category, subcategories: [...category.subcategories, created].sort((a, b) => a.value.localeCompare(b.value)) }
        : category));
      setToast({ id: `toast-${Date.now()}`, type: 'success', title: 'Subcategory Added', description: `${created.value} is now available for products.` });
    } catch (error) {
      setToast({ id: `toast-${Date.now()}`, type: 'warning', title: 'Subcategory Not Added', description: 'Could not add this subcategory.' });
      throw error;
    }
  };

  const handleUpdateSubcategory = async (id: string, value: string) => {
    try {
      const updated = await productService.updateSubcategory(id, value);
      setCategoryOptions((prev) => prev.map((category) => ({
        ...category,
        subcategories: category.subcategories.map((subcategory) => subcategory.id === id ? { ...subcategory, value: updated.value } : subcategory),
      })));
      setAllProducts((prev) => prev.map((product) => product.subcategoryId === id ? { ...product, subcategory: updated.value } : product));
      setToast({ id: `toast-${Date.now()}`, type: 'success', title: 'Subcategory Updated', description: `Subcategory renamed to ${updated.value}.` });
    } catch (error) {
      setToast({ id: `toast-${Date.now()}`, type: 'warning', title: 'Subcategory Not Updated', description: 'Could not rename this subcategory.' });
      throw error;
    }
  };

  // Duplicate Product
  const handleDuplicateProduct = async (product: Product) => {
    try {
      const created = await productService.createProduct({
        name: `${product.name} (Copy)`,
        brand: product.brand,
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
      setAllProducts((prev) => upsertById(prev, created));
      setCategoryOptions((prev) => mergeProductCategoryOption(prev, created));
      setViewingProductId(created.id);
      setToast({
        id: `toast-${Date.now()}`,
        type: 'success',
        title: 'Product Duplicated',
        description: `Created new draft ${formatProductCode(created.productCode)} based on ${formatProductCode(product.productCode)}.`,
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
          totalCount={data.totalCount || 10}
          onExportCsv={handleExportCsv}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          onOpenTaxonomyModal={isOrganizationAdmin ? () => setIsTaxonomyModalOpen(true) : undefined}
        />

        {/* 2. KPI Summary Cards */}
        <ProductsKpiCards kpis={data.kpis} />

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
            items={data.items}
            selectedIds={selectedIds}
            onToggleSelectRow={handleToggleSelectRow}
            onToggleSelectAll={handleToggleSelectAll}
            onViewProduct={(p) => setViewingProductId(p.id)}
            isLoading={isLoading}
          />

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
        </div>
      </div>

      {/* Slide-over Product Detail Drawer */}
      <ProductDetailDrawer
        product={viewingProduct}
        onClose={() => setViewingProductId(null)}
        onEdit={(p) => {
          setViewingProductId(null);
          setEditingProductId(p.id);
        }}
        onToggleStatus={handleToggleStatus}
        onDelete={handlePromptDelete}
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
            onCreated={handleCreateProducts}
        categories={categories}
        categoryOptions={categoryOptions}
        brands={brands}
        suppliers={suppliers}
      />

      {/* Edit Product Modal */}
      <EditProductModal
        product={editingProduct}
        isOpen={!!editingProduct}
        onClose={() => setEditingProductId(null)}
        onUpdated={handleUpdateProduct}
        categories={categories}
        categoryOptions={categoryOptions}
        brands={brands}
        suppliers={suppliers}
      />

      <ManageProductTaxonomyModal
        isOpen={isTaxonomyModalOpen}
        categories={categoryOptions}
        onClose={() => setIsTaxonomyModalOpen(false)}
        onCreateCategory={handleCreateCategory}
        onUpdateCategory={handleUpdateCategory}
        onDeleteCategory={(category) => handlePromptTaxonomyDelete({ kind: 'category', category })}
        onCreateSubcategory={handleCreateSubcategory}
        onUpdateSubcategory={handleUpdateSubcategory}
        onDeleteSubcategory={(category, subcategory) => handlePromptTaxonomyDelete({ kind: 'subcategory', category, subcategory })}
      />

      <MasterDeleteConfirmDialog
        entityLabel="Product"
        recordName={deleteConfirmation.record?.name ?? ''}
        isOpen={deleteConfirmation.isOpen}
        isProcessing={deleteConfirmation.isProcessing}
        error={deleteConfirmation.error}
        onClose={deleteConfirmation.close}
        onConfirm={deleteConfirmation.confirm}
      />

      <MasterDeleteConfirmDialog
        entityLabel={taxonomyDeleteConfirmation.record?.kind === 'subcategory' ? 'Subcategory' : 'Category'}
        recordName={taxonomyDeleteConfirmation.record?.kind === 'subcategory' ? taxonomyDeleteConfirmation.record.subcategory.value : taxonomyDeleteConfirmation.record?.category.value ?? ''}
        isOpen={taxonomyDeleteConfirmation.isOpen}
        isProcessing={taxonomyDeleteConfirmation.isProcessing}
        error={taxonomyDeleteConfirmation.error}
        onClose={taxonomyDeleteConfirmation.close}
        onConfirm={taxonomyDeleteConfirmation.confirm}
      />

      {/* Toast Notification */}
      <ProductToast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
