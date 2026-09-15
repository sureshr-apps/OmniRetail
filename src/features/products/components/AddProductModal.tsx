import React, { useState } from 'react';
import { CreateProductInput, ProductCategoryOption, ProductType } from '../types';
import { productService } from '../services/productService';
import { Supplier } from '@/features/suppliers/types';
import {
  expandProductVariantDimensions,
  getProductVariantCombinationCount,
  parseProductVariants,
  PRODUCT_VARIANT_COMBINATION_LIMIT,
} from '../utils/variants';

interface VariantDimensionDraft {
  id: number;
  name: string;
  valuesInput: string;
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (newProducts: CreateProductInput[]) => Promise<void>;
  categories: string[];
  categoryOptions: ProductCategoryOption[];
  brands: string[];
  suppliers: Supplier[];
}

export function AddProductModal({
  isOpen,
  onClose,
  onCreated,
  categories,
  categoryOptions,
  brands,
  suppliers,
}: AddProductModalProps) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [type, setType] = useState<ProductType>('stockable');
  const [categoryName, setCategoryName] = useState('Apparel / Shirts');
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');

  const [sku, setSku] = useState('');
  const [barcode, setBarcode] = useState('');
  const [hsnCode, setHsnCode] = useState('');
  const [unitOfMeasure, setUnitOfMeasure] = useState('Pieces (Pcs)');
  const [variantDimensions, setVariantDimensions] = useState<VariantDimensionDraft[]>([
    { id: 1, name: '', valuesInput: '' },
  ]);

  const [cost, setCost] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [mrp, setMrp] = useState('');
  const [minSellingPrice, setMinSellingPrice] = useState('');
  const [taxCategory, setTaxCategory] = useState('GST 12%');
  const [discountAllowed, setDiscountAllowed] = useState(true);

  const [reorderLevel, setReorderLevel] = useState('15');
  const [reorderQuantity, setReorderQuantity] = useState('30');
  const [openingStock, setOpeningStock] = useState('20');
  const [openingStoreOutlet, setOpeningStoreOutlet] = useState(
    'Downtown Flagship #01'
  );

  const [primarySupplier, setPrimarySupplier] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const selectedCategory = categoryOptions.find((category) => category.value.trim().toLowerCase() === categoryName.trim().toLowerCase());
  const availableSubcategories = selectedCategory?.subcategories.map((subcategoryOption) => subcategoryOption.value) ?? [];
  const activeSuppliers = suppliers.filter((supplier) => supplier.status === 'Active');
  const normalizedVariantDimensions = variantDimensions
    .map((dimension) => ({ name: dimension.name.trim(), values: parseProductVariants(dimension.valuesInput) }))
    .filter((dimension) => dimension.name || dimension.values.length > 0);
  const variantCombinationCount = getProductVariantCombinationCount(normalizedVariantDimensions);

  if (!isOpen) return null;

  const validate = async (): Promise<boolean> => {
    const errs: { [key: string]: string } = {};
    const configuredVariants = normalizedVariantDimensions;

    if (!name.trim()) {
      errs.name = 'Product name is required';
    }
    if (!categoryName.trim()) {
      errs.categoryName = 'Category is required';
    }

    if (!sku.trim()) {
      errs.sku = 'SKU identifier is required';
    } else if (!(await productService.checkSkuUnique(sku.trim()))) {
      errs.sku = 'SKU is already taken in catalog';
    }

    if (barcode.trim() && configuredVariants.length > 0) {
      errs.barcode = 'A shared barcode cannot identify multiple variants. Assign barcodes after creation.';
    } else if (barcode.trim() && !(await productService.checkBarcodeUnique(barcode.trim()))) {
      errs.barcode = 'Barcode is already assigned to another item';
    }

    const dimensionNames = new Set<string>();
    for (const dimension of configuredVariants) {
      const normalizedName = dimension.name.toLowerCase();
      if (!dimension.name || dimension.values.length === 0) {
        errs.variants = 'Each variant dimension must have a name and at least one value.';
        break;
      }
      if (dimensionNames.has(normalizedName)) {
        errs.variants = 'Variant dimension names must be unique.';
        break;
      }
      dimensionNames.add(normalizedName);
    }
    if (!errs.variants && variantCombinationCount > PRODUCT_VARIANT_COMBINATION_LIMIT) {
      errs.variants = `You can create up to ${PRODUCT_VARIANT_COMBINATION_LIMIT} products at once. Reduce the number of variant values.`;
    }

    if (!sellingPrice.trim() || isNaN(Number(sellingPrice)) || Number(sellingPrice) < 0) {
      errs.sellingPrice = 'Valid selling price (>= 0) is required';
    }

    if (cost.trim() && (isNaN(Number(cost)) || Number(cost) < 0)) {
      errs.cost = 'Purchase cost must be a valid positive number';
    }

    if (mrp.trim() && (isNaN(Number(mrp)) || Number(mrp) < 0)) {
      errs.mrp = 'MRP must be a valid positive number';
    }

    if (
      type !== 'service' &&
      reorderLevel.trim() &&
      (isNaN(Number(reorderLevel)) || Number(reorderLevel) < 0)
    ) {
      errs.reorderLevel = 'Reorder level must be >= 0';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(await validate())) return;

    const payload: CreateProductInput = {
      name,
      brand,
      categoryName: categoryName.trim(),
      subcategory: subcategory.trim() || undefined,
      type,
      sku: sku.trim(),
      barcode: barcode.trim() || undefined,
      hsnCode: hsnCode.trim() || undefined,
      unitOfMeasure: unitOfMeasure || 'Pieces (Pcs)',
      sellingPrice: Number(sellingPrice),
      mrp: mrp.trim() ? Number(mrp) : undefined,
      cost: cost.trim() ? Number(cost) : undefined,
      minSellingPrice: minSellingPrice.trim() ? Number(minSellingPrice) : undefined,
      discountAllowed,
      taxCategory,
      status: 'active',
      reorderLevel: type !== 'service' ? Number(reorderLevel) || 15 : undefined,
      reorderQuantity: type !== 'service' ? Number(reorderQuantity) || 30 : undefined,
      openingStock: type === 'stockable' ? Number(openingStock) || 0 : undefined,
      openingStoreOutlet,
      primarySupplier: primarySupplier || undefined,
      description: description.trim() || undefined,
    };

    await onCreated(expandProductVariantDimensions(payload, normalizedVariantDimensions));
    setVariantDimensions([{ id: Date.now(), name: '', valuesInput: '' }]);
  };

  const addVariantDimension = () => {
    setVariantDimensions((previous) => [...previous, { id: Date.now(), name: '', valuesInput: '' }]);
  };

  const updateVariantDimension = (id: number, field: 'name' | 'valuesInput', value: string) => {
    setVariantDimensions((previous) => previous.map((dimension) => dimension.id === id ? { ...dimension, [field]: value } : dimension));
  };

  const removeVariantDimension = (id: number) => {
    setVariantDimensions((previous) => previous.length === 1
      ? [{ id: Date.now(), name: '', valuesInput: '' }]
      : previous.filter((dimension) => dimension.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-space-base select-none">
      <div className="bg-surface-container-lowest rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-outline-variant/30 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-space-xl py-space-lg bg-surface-container-low rounded-t-xl flex items-center justify-between border-b border-outline-variant/20 shrink-0">
          <div>
            <div className="flex items-center gap-space-xs">
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Add New Product
              </h2>
            </div>
            <p className="font-caption text-caption text-on-surface-variant mt-0.5">
              Create a new master SKU record for catalogue inventory, tax classification, and replenishment tracking.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container text-on-surface-variant flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-space-xl space-y-space-xl">
          {/* Section 1: Basic Information */}
          <div className="space-y-space-sm">
            <h3 className="font-caption text-caption uppercase tracking-wider text-on-surface-variant font-bold flex items-center gap-1 border-b border-outline-variant/20 pb-1">
              <span className="material-symbols-outlined text-[16px] text-primary">info</span>
              <span>1. Basic Information</span>
            </h3>

            {/* Product Type Selector */}
            <div className="space-y-1">
              <label className="font-caption text-caption text-on-surface font-medium block">
                Product Type *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
                <button
                  type="button"
                  onClick={() => {
                    setType('stockable');
                    setUnitOfMeasure('Pieces (Pcs)');
                  }}
                  className={`p-2.5 rounded-lg border text-left flex flex-col transition-all cursor-pointer ${
                    type === 'stockable'
                      ? 'border-primary bg-primary/10 text-on-surface'
                      : 'border-outline-variant/40 bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-semibold text-caption text-on-surface">
                    <span className="material-symbols-outlined text-[16px] text-primary">inventory_2</span>
                    <span>Stockable Item</span>
                  </div>
                  <span className="text-[10px] text-on-surface-variant mt-0.5">Physical goods with inventory</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setType('consumable');
                    setUnitOfMeasure('Pieces (Pcs)');
                  }}
                  className={`p-2.5 rounded-lg border text-left flex flex-col transition-all cursor-pointer ${
                    type === 'consumable'
                      ? 'border-primary bg-primary/10 text-on-surface'
                      : 'border-outline-variant/40 bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-semibold text-caption text-on-surface">
                    <span className="material-symbols-outlined text-[16px] text-primary">package_2</span>
                    <span>Consumable</span>
                  </div>
                  <span className="text-[10px] text-on-surface-variant mt-0.5">Carry bags, tissue packaging</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-1">
              <div>
                <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Classic Linen Relaxed Shirt"
                  className={`w-full h-9 px-3 rounded bg-surface-container-low border text-body-default text-on-surface outline-none focus:ring-1 focus:ring-primary ${
                    errors.name ? 'border-error ring-1 ring-error' : 'border-outline-variant/40'
                  }`}
                />
                {errors.name && <span className="text-error text-[10px]">{errors.name}</span>}
              </div>

              <div>
                <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                  Brand Name
                </label>
                <input
                  list="product-brand-options"
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Enter brand name"
                  className="w-full h-9 px-3 rounded bg-surface-container-low border border-outline-variant/40 text-body-default text-on-surface outline-none focus:ring-1 focus:ring-primary"
                />
                <datalist id="product-brand-options">
                  {brands.map((brandOption) => <option key={brandOption} value={brandOption} />)}
                </datalist>
              </div>

              <div>
                <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                  Category *
                </label>
                <input
                  list="product-category-options"
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full h-9 px-3 rounded bg-surface-container-low border border-outline-variant/40 text-body-default text-on-surface outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                />
                <datalist id="product-category-options">
                  {categories.map((category) => <option key={category} value={category} />)}
                </datalist>
                {errors.categoryName && <span className="text-error text-[10px]">{errors.categoryName}</span>}
              </div>

              <div>
                <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                  Subcategory
                </label>
                <input
                  list="product-subcategory-options"
                  type="text"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  placeholder="e.g. Linen Tops / Cuban Collar"
                  className="w-full h-9 px-3 rounded bg-surface-container-low border border-outline-variant/40 text-body-default text-on-surface outline-none focus:ring-1 focus:ring-primary"
                />
                <datalist id="product-subcategory-options">
                  {availableSubcategories.map((subcategoryOption) => <option key={subcategoryOption} value={subcategoryOption} />)}
                </datalist>
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe material, composition, garment styling or care notes..."
                  className="w-full p-2.5 rounded bg-surface-container-low border border-outline-variant/40 text-body-default text-on-surface outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Identification & Codes */}
          <div className="space-y-space-sm">
            <h3 className="font-caption text-caption uppercase tracking-wider text-on-surface-variant font-bold flex items-center gap-1 border-b border-outline-variant/20 pb-1">
              <span className="material-symbols-outlined text-[16px] text-primary">qr_code</span>
              <span>2. Identification &amp; Barcodes</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
              <div>
                <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                  SKU Identifier *
                </label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="e.g. AP-SH-109"
                  className={`w-full h-9 px-3 rounded bg-surface-container-low border text-body-default font-body-mono-num text-on-surface outline-none focus:ring-1 focus:ring-primary ${
                    errors.sku ? 'border-error ring-1 ring-error' : 'border-outline-variant/40'
                  }`}
                />
                {errors.sku && <span className="text-error text-[10px]">{errors.sku}</span>}
              </div>

              <div>
                <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                  Barcode (EAN / UPC)
                </label>
                <input
                  type="text"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  placeholder="e.g. 8904512399"
                  className={`w-full h-9 px-3 rounded bg-surface-container-low border text-body-default font-body-mono-num text-on-surface outline-none focus:ring-1 focus:ring-primary ${
                    errors.barcode ? 'border-error ring-1 ring-error' : 'border-outline-variant/40'
                  }`}
                />
                {errors.barcode && <span className="text-error text-[10px]">{errors.barcode}</span>}
                {!errors.barcode && normalizedVariantDimensions.length > 0 && (
                  <span className="text-on-surface-variant text-[10px]">Variant barcodes are assigned individually after creation.</span>
                )}
              </div>

              <div>
                <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                  HSN / SAC Code
                </label>
                <input
                  type="text"
                  value={hsnCode}
                  onChange={(e) => setHsnCode(e.target.value)}
                  placeholder="Enter HSN / SAC code"
                  className="w-full h-9 px-3 rounded bg-surface-container-low border border-outline-variant/40 text-body-default font-body-mono-num text-on-surface outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                  Unit of Measure (UOM)
                </label>
                <select
                  value={unitOfMeasure}
                  onChange={(e) => setUnitOfMeasure(e.target.value)}
                  className="w-full h-9 px-3 rounded bg-surface-container-low border border-outline-variant/40 text-body-default text-on-surface outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  <option value="Pieces (Pcs)">Pieces (Pcs)</option>
                  <option value="Pairs (Prs)">Pairs (Prs)</option>
                  <option value="Meter (Mtr)">Meter (Mtr)</option>
                  <option value="Kilogram (Kg)">Kilogram (Kg)</option>
                  <option value="Box / Carton">Box / Carton</option>
                </select>
              </div>

              <div className="col-span-1 sm:col-span-2 rounded-lg border border-outline-variant/30 bg-surface-container-low/40 p-space-sm">
                <div className="flex items-start justify-between gap-space-sm">
                  <div>
                    <label className="font-caption text-caption text-on-surface font-medium block">
                      Variant Dimensions (optional)
                    </label>
                    <p className="mt-1 text-[10px] text-on-surface-variant">
                      Add dimensions such as Color and Size. Every combination becomes a separate product and SKU.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addVariantDimension}
                    className="shrink-0 rounded border border-primary/30 px-2 py-1 font-caption text-caption font-semibold text-primary hover:bg-primary/10"
                  >
                    + Add Dimension
                  </button>
                </div>

                <div className="mt-space-sm space-y-space-xs">
                  {variantDimensions.map((dimension, index) => (
                    <div key={dimension.id} className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)_auto] items-center gap-space-xs">
                      <input
                        type="text"
                        value={dimension.name}
                        onChange={(event) => updateVariantDimension(dimension.id, 'name', event.target.value)}
                        placeholder={index === 0 ? 'e.g. Color' : 'e.g. Size'}
                        aria-label={`Variant dimension ${index + 1} name`}
                        className="h-9 min-w-0 rounded bg-surface-container-lowest border border-outline-variant/40 px-3 text-body-default text-on-surface outline-none focus:ring-1 focus:ring-primary"
                      />
                      <input
                        type="text"
                        value={dimension.valuesInput}
                        onChange={(event) => updateVariantDimension(dimension.id, 'valuesInput', event.target.value)}
                        placeholder={index === 0 ? 'e.g. Red, Blue, Green' : 'e.g. S, M, L'}
                        aria-label={`Variant dimension ${index + 1} values`}
                        className="h-9 min-w-0 rounded bg-surface-container-lowest border border-outline-variant/40 px-3 text-body-default text-on-surface outline-none focus:ring-1 focus:ring-primary"
                      />
                      <button
                        type="button"
                        onClick={() => removeVariantDimension(dimension.id)}
                        aria-label={`Remove variant dimension ${index + 1}`}
                        className="h-9 w-9 rounded border border-outline-variant/40 text-on-surface-variant hover:bg-surface-container"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  ))}
                </div>

                {normalizedVariantDimensions.length > 0 && (
                  <p className="mt-space-xs font-caption text-caption text-on-surface-variant">
                    {variantCombinationCount} product{variantCombinationCount === 1 ? '' : 's'} will be created
                    {variantCombinationCount > PRODUCT_VARIANT_COMBINATION_LIMIT ? ` (limit: ${PRODUCT_VARIANT_COMBINATION_LIMIT})` : ''}.
                  </p>
                )}
                {errors.variants && <span className="mt-1 block text-error text-[10px]">{errors.variants}</span>}
              </div>
            </div>
          </div>

          {/* Section 3: Pricing & Tax Structure */}
          <div className="space-y-space-sm">
            <h3 className="font-caption text-caption uppercase tracking-wider text-on-surface-variant font-bold flex items-center gap-1 border-b border-outline-variant/20 pb-1">
              <span className="material-symbols-outlined text-[16px] text-primary">payments</span>
              <span>3. Pricing &amp; Tax Structure</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
              <div>
                <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                  Purchase Cost (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="22.50"
                  className="w-full h-9 px-3 rounded bg-surface-container-low border border-outline-variant/40 text-body-default font-body-mono-num text-on-surface outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.cost && <span className="text-error text-[10px]">{errors.cost}</span>}
              </div>

              <div>
                <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                  Selling Price (₹) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  placeholder="48.00"
                  className={`w-full h-9 px-3 rounded bg-surface-container-low border text-body-default font-body-mono-num text-on-surface outline-none focus:ring-1 focus:ring-primary ${
                    errors.sellingPrice ? 'border-error ring-1 ring-error' : 'border-outline-variant/40'
                  }`}
                />
                {errors.sellingPrice && (
                  <span className="text-error text-[10px]">{errors.sellingPrice}</span>
                )}
              </div>

              <div>
                <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                  MRP / Sticker Price (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={mrp}
                  onChange={(e) => setMrp(e.target.value)}
                  placeholder="55.00"
                  className="w-full h-9 px-3 rounded bg-surface-container-low border border-outline-variant/40 text-body-default font-body-mono-num text-on-surface outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.mrp && <span className="text-error text-[10px]">{errors.mrp}</span>}
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                  Tax Classification
                </label>
                <select
                  value={taxCategory}
                  onChange={(e) => setTaxCategory(e.target.value)}
                  className="w-full h-9 px-3 rounded bg-surface-container-low border border-outline-variant/40 text-body-default text-on-surface outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  <option value="GST 0%">GST 0%</option>
                  <option value="GST 5%">GST 5%</option>
                  <option value="GST 12%">GST 12%</option>
                  <option value="GST 18%">GST 18%</option>
                  <option value="GST 28%">GST 28%</option>
                </select>
              </div>

              <div>
                <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                  Floor Price (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={minSellingPrice}
                  onChange={(e) => setMinSellingPrice(e.target.value)}
                  placeholder="40.00"
                  className="w-full h-9 px-3 rounded bg-surface-container-low border border-outline-variant/40 text-body-default font-body-mono-num text-on-surface outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="col-span-1 sm:col-span-3 flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="chk-discount"
                  checked={discountAllowed}
                  onChange={(e) => setDiscountAllowed(e.target.checked)}
                  className="rounded accent-primary w-4 h-4 cursor-pointer"
                />
                <label htmlFor="chk-discount" className="font-caption text-caption text-on-surface cursor-pointer">
                  Allow cashier promotional discounts at POS billing
                </label>
              </div>
            </div>
          </div>

          {/* Section 4: Inventory & Reorder Thresholds (only for stockable items) */}
          {type === 'stockable' && (
            <div className="space-y-space-sm bg-surface-container-low/40 p-space-base rounded-lg border border-outline-variant/20">
              <h3 className="font-caption text-caption uppercase tracking-wider text-on-surface-variant font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">shelves</span>
                <span>4. Inventory &amp; Reorder Thresholds</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                <div>
                  <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                    Reorder Alert Level (Units)
                  </label>
                  <input
                    type="number"
                    value={reorderLevel}
                    onChange={(e) => setReorderLevel(e.target.value)}
                    className="w-full h-9 px-3 rounded bg-surface-container-lowest border border-outline-variant/40 text-body-default font-body-mono-num text-on-surface outline-none focus:ring-1 focus:ring-primary"
                  />
                  {errors.reorderLevel && (
                    <span className="text-error text-[10px]">{errors.reorderLevel}</span>
                  )}
                </div>

                <div>
                  <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                    Standard Reorder Batch Qty
                  </label>
                  <input
                    type="number"
                    value={reorderQuantity}
                    onChange={(e) => setReorderQuantity(e.target.value)}
                    className="w-full h-9 px-3 rounded bg-surface-container-lowest border border-outline-variant/40 text-body-default font-body-mono-num text-on-surface outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                    Opening Master Stock (Total Units)
                  </label>
                  <input
                    type="number"
                    value={openingStock}
                    onChange={(e) => setOpeningStock(e.target.value)}
                    className="w-full h-9 px-3 rounded bg-surface-container-lowest border border-outline-variant/40 text-body-default font-body-mono-num text-on-surface outline-none focus:ring-1 focus:ring-primary"
                  />
                  {variantCombinationCount > 1 && (
                    <span className="text-on-surface-variant text-[10px]">The total is split across the generated product combinations.</span>
                  )}
                </div>

                <div>
                  <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                    Opening Receiving Store
                  </label>
                  <select
                    value={openingStoreOutlet}
                    onChange={(e) => setOpeningStoreOutlet(e.target.value)}
                    className="w-full h-9 px-3 rounded bg-surface-container-lowest border border-outline-variant/40 text-body-default text-on-surface outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                  >
                    <option value="Downtown Flagship #01">Downtown Flagship #01</option>
                    <option value="Northside Galleria #02">Northside Galleria #02</option>
                    <option value="Dallas Uptown #03">Dallas Uptown #03</option>
                    <option value="Houston Galleria #04">Houston Galleria #04</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Supplier Linkage */}
          <div className="space-y-space-sm">
            <h3 className="font-caption text-caption uppercase tracking-wider text-on-surface-variant font-bold flex items-center gap-1 border-b border-outline-variant/20 pb-1">
              <span className="material-symbols-outlined text-[16px] text-primary">local_shipping</span>
              <span>5. Supplier Linkage</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
              <div>
                <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                  Primary Supplier
                </label>
                <select
                  value={primarySupplier}
                  onChange={(e) => setPrimarySupplier(e.target.value)}
                  className="w-full h-9 px-3 rounded bg-surface-container-low border border-outline-variant/40 text-body-default text-on-surface outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select supplier</option>
                  {activeSuppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.name}>
                      {supplier.name} (SUP-{supplier.supplierCode})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-space-lg bg-surface-container-low rounded-b-xl flex items-center justify-end gap-space-sm border-t border-outline-variant/20 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="h-9 px-space-lg rounded-lg border border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container text-on-surface font-body-medium text-body-medium transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="h-9 px- space-lg bg-[#0f766e] hover:bg-[#115e59] active:bg-[#134e4a] text-white font-medium text-sm rounded-lg flex items-center gap-2 px-4 shadow-sm transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">check</span>
            <span>Create Master SKU</span>
          </button>
        </div>
      </div>
    </div>
  );
}
