import React, { useState, useEffect } from 'react';
import { Product, ProductCategoryOption, UpdateProductInput } from '../types';
import { productService } from '../services/productService';
import { formatProductCode } from '../utils/formatProductCode';
import { Supplier } from '@/features/suppliers/types';

interface EditProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: (updated: UpdateProductInput) => void;
  categoryOptions: ProductCategoryOption[];
  brands: string[];
  suppliers: Supplier[];
}

export function EditProductModal({
  product,
  isOpen,
  onClose,
  onUpdated,
  categoryOptions,
  brands,
  suppliers,
}: EditProductModalProps) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');

  const [sku, setSku] = useState('');
  const [barcode, setBarcode] = useState('');
  const [hsnCode, setHsnCode] = useState('');
  const [unitOfMeasure, setUnitOfMeasure] = useState('');
  const [variantsConfigured, setVariantsConfigured] = useState('');

  const [cost, setCost] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [mrp, setMrp] = useState('');
  const [minSellingPrice, setMinSellingPrice] = useState('');
  const [taxCategory, setTaxCategory] = useState('GST 12%');
  const [discountAllowed, setDiscountAllowed] = useState(true);

  const [reorderLevel, setReorderLevel] = useState('');
  const [reorderQuantity, setReorderQuantity] = useState('');

  const [primarySupplier, setPrimarySupplier] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const selectedCategory = categoryOptions.find((category) => category.value.trim().toLowerCase() === categoryName.trim().toLowerCase());
  const availableSubcategories = selectedCategory?.subcategories ?? [];
  const activeSuppliers = suppliers.filter((supplier) => supplier.status === 'Active');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setBrand(product.brand);
      setCategoryName(product.categoryName);
      setSubcategory(product.subcategory || '');
      setDescription(product.description || '');
      setSku(product.sku);
      setBarcode(product.barcode || '');
      setHsnCode(product.hsnCode || '');
      setUnitOfMeasure(product.unitOfMeasure || 'Pieces (Pcs)');
      setVariantsConfigured(product.variantsConfigured || '');
      setCost(product.cost !== undefined ? String(product.cost) : '');
      setSellingPrice(String(product.sellingPrice));
      setMrp(product.mrp !== undefined ? String(product.mrp) : '');
      setMinSellingPrice(
        product.minSellingPrice !== undefined ? String(product.minSellingPrice) : ''
      );
      setTaxCategory(product.taxCategory || 'GST 12%');
      setDiscountAllowed(product.discountAllowed ?? true);
      setReorderLevel(
        product.reorderLevel !== undefined ? String(product.reorderLevel) : '15'
      );
      setReorderQuantity(
        product.reorderQuantity !== undefined ? String(product.reorderQuantity) : '30'
      );
      setPrimarySupplier(product.primarySupplier || '');
      setErrors({});
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const validate = async (): Promise<boolean> => {
    const errs: { [key: string]: string } = {};

    if (!name.trim()) {
      errs.name = 'Product name is required';
    }
    if (!categoryName.trim()) {
      errs.categoryName = 'Category is required';
    }

    if (!sku.trim()) {
      errs.sku = 'SKU identifier is required';
    } else if (!(await productService.checkSkuUnique(sku.trim(), product.id))) {
      errs.sku = 'SKU is already taken in catalog';
    }

    if (
      barcode.trim() &&
      !(await productService.checkBarcodeUnique(barcode.trim(), product.id))
    ) {
      errs.barcode = 'Barcode is already assigned to another item';
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

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(await validate())) return;

    const payload: UpdateProductInput = {
      id: product.id,
      name,
      brand,
      categoryName: categoryName.trim(),
      subcategory: subcategory.trim() || undefined,
      sku: sku.trim(),
      barcode: barcode.trim() || undefined,
      hsnCode: hsnCode.trim() || undefined,
      unitOfMeasure,
      sellingPrice: Number(sellingPrice),
      mrp: mrp.trim() ? Number(mrp) : undefined,
      cost: cost.trim() ? Number(cost) : undefined,
      minSellingPrice: minSellingPrice.trim() ? Number(minSellingPrice) : undefined,
      discountAllowed,
      taxCategory,
      reorderLevel: product.type !== 'service' ? Number(reorderLevel) || 15 : undefined,
      reorderQuantity: product.type !== 'service' ? Number(reorderQuantity) || 30 : undefined,
      primarySupplier: primarySupplier.trim() || undefined,
      description: description.trim() || undefined,
      variantsConfigured: variantsConfigured.trim() || undefined,
    };

    onUpdated(payload);
  };

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-space-base select-none">
      <div className="bg-surface-container-lowest rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-outline-variant/30 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-space-xl py-space-lg bg-surface-container-low rounded-t-xl flex items-center justify-between border-b border-outline-variant/20 shrink-0">
          <div>
            <div className="flex items-center gap-space-xs">
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Edit Product Master
              </h2>
              <span className="font-body-mono-num text-caption font-bold text-primary px-1.5 py-0.5 rounded bg-surface-container-high">
                {formatProductCode(product.productCode)}
              </span>
            </div>
            <p className="font-caption text-caption text-on-surface-variant mt-0.5">
              Update catalogue attributes, selling prices, tax mappings, and reorder alerts.
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
              <div>
                <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  list="edit-product-brand-options"
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full h-9 px-3 rounded bg-surface-container-low border border-outline-variant/40 text-body-default text-on-surface outline-none focus:ring-1 focus:ring-primary"
                />
                <datalist id="edit-product-brand-options">
                  {brands.map((brandOption) => <option key={brandOption} value={brandOption} />)}
                </datalist>
              </div>

              <div>
                <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                  Category *
                </label>
                <select
                  value={categoryName}
                  onChange={(e) => {
                    setCategoryName(e.target.value);
                    setSubcategory('');
                  }}
                  required
                  className={`w-full h-9 px-3 rounded bg-surface-container-low border text-body-default text-on-surface outline-none focus:ring-1 focus:ring-primary cursor-pointer ${errors.categoryName ? 'border-error ring-1 ring-error' : 'border-outline-variant/40'}`}
                >
                  <option value="">Select a category</option>
                  {categoryOptions.map((category) => (
                    <option key={category.id} value={category.value}>{category.value}</option>
                  ))}
                </select>
                {errors.categoryName && <span className="text-error text-[10px]">{errors.categoryName}</span>}
              </div>

              <div>
                <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                  Subcategory
                </label>
                <select
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  disabled={!selectedCategory || availableSubcategories.length === 0}
                  className="w-full h-9 px-3 rounded bg-surface-container-low border border-outline-variant/40 text-body-default text-on-surface outline-none focus:ring-1 focus:ring-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <option value="">No subcategory</option>
                  {availableSubcategories.map((subcategoryOption) => (
                    <option key={subcategoryOption.id} value={subcategoryOption.value}>{subcategoryOption.value}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded bg-surface-container-low border border-outline-variant/40 text-body-default text-on-surface outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Codes */}
          <div className="space-y-space-sm">
            <h3 className="font-caption text-caption uppercase tracking-wider text-on-surface-variant font-bold flex items-center gap-1 border-b border-outline-variant/20 pb-1">
              <span className="material-symbols-outlined text-[16px] text-primary">qr_code</span>
              <span>2. Identification Codes</span>
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
                  className={`w-full h-9 px-3 rounded bg-surface-container-low border text-body-default font-body-mono-num text-on-surface outline-none focus:ring-1 focus:ring-primary ${
                    errors.barcode ? 'border-error ring-1 ring-error' : 'border-outline-variant/40'
                  }`}
                />
                {errors.barcode && <span className="text-error text-[10px]">{errors.barcode}</span>}
              </div>

              <div>
                <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                  HSN / SAC Code
                </label>
                <input
                  type="text"
                  value={hsnCode}
                  onChange={(e) => setHsnCode(e.target.value)}
                  className="w-full h-9 px-3 rounded bg-surface-container-low border border-outline-variant/40 text-body-default font-body-mono-num text-on-surface outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                  Unit of Measure
                </label>
                <input
                  type="text"
                  value={unitOfMeasure}
                  onChange={(e) => setUnitOfMeasure(e.target.value)}
                  className="w-full h-9 px-3 rounded bg-surface-container-low border border-outline-variant/40 text-body-default text-on-surface outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Pricing */}
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
                  className="w-full h-9 px-3 rounded bg-surface-container-low border border-outline-variant/40 text-body-default font-body-mono-num text-on-surface outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="col-span-1 sm:col-span-3 flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="chk-edit-discount"
                  checked={discountAllowed}
                  onChange={(e) => setDiscountAllowed(e.target.checked)}
                  className="rounded accent-primary w-4 h-4 cursor-pointer"
                />
                <label
                  htmlFor="chk-edit-discount"
                  className="font-caption text-caption text-on-surface cursor-pointer"
                >
                  Allow cashier promotional discounts at POS billing
                </label>
              </div>
            </div>
          </div>

          {/* Section 4: Reorder Parameters & Supplier */}
          {product.type !== 'service' && (
            <div className="space-y-space-sm">
              <h3 className="font-caption text-caption uppercase tracking-wider text-on-surface-variant font-bold flex items-center gap-1 border-b border-outline-variant/20 pb-1">
                <span className="material-symbols-outlined text-[16px] text-primary">local_shipping</span>
                <span>4. Reorder Alert &amp; Supplier</span>
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
                    className="w-full h-9 px-3 rounded bg-surface-container-low border border-outline-variant/40 text-body-default font-body-mono-num text-on-surface outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                    Standard Reorder Batch Qty
                  </label>
                  <input
                    type="number"
                    value={reorderQuantity}
                    onChange={(e) => setReorderQuantity(e.target.value)}
                    className="w-full h-9 px-3 rounded bg-surface-container-low border border-outline-variant/40 text-body-default font-body-mono-num text-on-surface outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

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
                  {primarySupplier && !suppliers.some((supplier) => supplier.name === primarySupplier) && (
                    <option value={primarySupplier}>{primarySupplier}</option>
                  )}
                  {activeSuppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.name}>
                      {supplier.name} (SUP-{supplier.supplierCode})
                    </option>
                  ))}
                </select>
                </div>
              </div>
            </div>
          )}
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
            className="h-9 px-4 bg-primary hover:bg-primary-container text-on-primary font-medium text-sm rounded-lg flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">save</span>
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
