import React, { useState } from 'react';
import { CreateProductInput, ProductType } from '../types';
import { productService } from '../services/productService';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (newProduct: CreateProductInput) => void;
}

export function AddProductModal({
  isOpen,
  onClose,
  onCreated,
}: AddProductModalProps) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('Punarva Studio');
  const [type, setType] = useState<ProductType>('stockable');
  const [categoryName, setCategoryName] = useState('Apparel / Shirts');
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');

  const [sku, setSku] = useState('');
  const [barcode, setBarcode] = useState('');
  const [hsnCode, setHsnCode] = useState('6205.20.00');
  const [unitOfMeasure, setUnitOfMeasure] = useState('Pieces (Pcs)');
  const [variantsConfigured, setVariantsConfigured] = useState('');

  const [cost, setCost] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [mrp, setMrp] = useState('');
  const [minSellingPrice, setMinSellingPrice] = useState('');
  const [taxCategory, setTaxCategory] = useState('GST 12% (Standard Apparel)');
  const [discountAllowed, setDiscountAllowed] = useState(true);

  const [reorderLevel, setReorderLevel] = useState('15');
  const [reorderQuantity, setReorderQuantity] = useState('30');
  const [openingStock, setOpeningStock] = useState('20');
  const [openingStoreOutlet, setOpeningStoreOutlet] = useState(
    'Downtown Flagship #01'
  );

  const [primarySupplier, setPrimarySupplier] = useState(
    'Zenith Textile Mills (SUP-102)'
  );
  const [supplierProductCode, setSupplierProductCode] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const validate = async (): Promise<boolean> => {
    const errs: { [key: string]: string } = {};

    if (!name.trim()) {
      errs.name = 'Product name is required';
    }

    if (!sku.trim()) {
      errs.sku = 'SKU identifier is required';
    } else if (!(await productService.checkSkuUnique(sku.trim()))) {
      errs.sku = 'SKU is already taken in catalog';
    }

    if (barcode.trim() && !(await productService.checkBarcodeUnique(barcode.trim()))) {
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

    if (
      type === 'stockable' &&
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
      categoryId: categoryName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      categoryName,
      subcategory: subcategory.trim() || undefined,
      type,
      sku: sku.trim(),
      barcode: barcode.trim() || undefined,
      hsnCode: hsnCode.trim() || undefined,
      unitOfMeasure:
        type === 'service' ? 'Job / Service' : unitOfMeasure || 'Pieces (Pcs)',
      sellingPrice: Number(sellingPrice),
      mrp: mrp.trim() ? Number(mrp) : undefined,
      cost: cost.trim() ? Number(cost) : undefined,
      minSellingPrice: minSellingPrice.trim() ? Number(minSellingPrice) : undefined,
      discountAllowed,
      taxCategory,
      status: 'active',
      reorderLevel: type !== 'service' ? Number(reorderLevel) || 15 : undefined,
      reorderQuantity: type !== 'service' ? Number(reorderQuantity) || 30 : undefined,
      openingStock: type !== 'service' ? Number(openingStock) || 0 : undefined,
      openingStoreOutlet,
      primarySupplier,
      supplierProductCode: supplierProductCode.trim() || undefined,
      description: description.trim() || undefined,
      variantsConfigured: variantsConfigured.trim() || undefined,
    };

    onCreated(payload);
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs">
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
                    setType('service');
                    setUnitOfMeasure('Job / Service');
                    setOpeningStock('0');
                  }}
                  className={`p-2.5 rounded-lg border text-left flex flex-col transition-all cursor-pointer ${
                    type === 'service'
                      ? 'border-primary bg-primary/10 text-on-surface'
                      : 'border-outline-variant/40 bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-semibold text-caption text-on-surface">
                    <span className="material-symbols-outlined text-[16px] text-primary">design_services</span>
                    <span>Service Item</span>
                  </div>
                  <span className="text-[10px] text-on-surface-variant mt-0.5">Alterations, labor, non-stock</span>
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
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. Punarva Studio"
                  className="w-full h-9 px-3 rounded bg-surface-container-low border border-outline-variant/40 text-body-default text-on-surface outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                  Category *
                </label>
                <select
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full h-9 px-3 rounded bg-surface-container-low border border-outline-variant/40 text-body-default text-on-surface outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  <option value="Apparel / Shirts">Apparel / Shirts</option>
                  <option value="Apparel / Bottoms">Apparel / Bottoms</option>
                  <option value="Apparel / Outerwear">Apparel / Outerwear</option>
                  <option value="Accessories / Bags">Accessories / Bags</option>
                  <option value="Accessories / Scarves">Accessories / Scarves</option>
                  <option value="Footwear / Shoes">Footwear / Shoes</option>
                  <option value="Fabrics">Fabrics</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Consumables">Consumables</option>
                  <option value="Service">Service</option>
                </select>
              </div>

              <div>
                <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                  Subcategory
                </label>
                <input
                  type="text"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  placeholder="e.g. Linen Tops / Cuban Collar"
                  className="w-full h-9 px-3 rounded bg-surface-container-low border border-outline-variant/40 text-body-default text-on-surface outline-none focus:ring-1 focus:ring-primary"
                />
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
                  placeholder={type === 'service' ? 'Not required for services' : 'e.g. 8904512399'}
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
                  placeholder="6205.20.00"
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
                  <option value="Job / Service">Job / Service</option>
                  <option value="Box / Carton">Box / Carton</option>
                </select>
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                  Configured Variants Note
                </label>
                <input
                  type="text"
                  value={variantsConfigured}
                  onChange={(e) => setVariantsConfigured(e.target.value)}
                  placeholder="e.g. Size (S, M, L), Color (Olive, White)"
                  className="w-full h-9 px-3 rounded bg-surface-container-low border border-outline-variant/40 text-body-default text-on-surface outline-none focus:ring-1 focus:ring-primary"
                />
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
                  Purchase Cost ($)
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
                  Selling Price ($) *
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
                  MRP / Sticker Price ($)
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
                  <option value="GST 12% (Standard Apparel)">GST 12% (Standard Apparel)</option>
                  <option value="GST 18% (Luxury Accessories & Footwear)">
                    GST 18% (Luxury Accessories &amp; Footwear)
                  </option>
                  <option value="GST 5% (Essential Textiles & Packaging)">
                    GST 5% (Essential Textiles &amp; Packaging)
                  </option>
                  <option value="GST 18% (Service Rates)">GST 18% (Service Rates)</option>
                  <option value="Tax Exempt (Zero Rated)">Tax Exempt (Zero Rated)</option>
                </select>
              </div>

              <div>
                <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                  Floor Price ($)
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
                    Opening Master Stock (Units)
                  </label>
                  <input
                    type="number"
                    value={openingStock}
                    onChange={(e) => setOpeningStock(e.target.value)}
                    className="w-full h-9 px-3 rounded bg-surface-container-lowest border border-outline-variant/40 text-body-default font-body-mono-num text-on-surface outline-none focus:ring-1 focus:ring-primary"
                  />
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
                <input
                  type="text"
                  value={primarySupplier}
                  onChange={(e) => setPrimarySupplier(e.target.value)}
                  placeholder="Zenith Textile Mills (SUP-102)"
                  className="w-full h-9 px-3 rounded bg-surface-container-low border border-outline-variant/40 text-body-default text-on-surface outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-caption text-caption text-on-surface font-medium block mb-1">
                  Supplier Part Code
                </label>
                <input
                  type="text"
                  value={supplierProductCode}
                  onChange={(e) => setSupplierProductCode(e.target.value)}
                  placeholder="e.g. ZTM-LIN-09"
                  className="w-full h-9 px-3 rounded bg-surface-container-low border border-outline-variant/40 text-body-default font-body-mono-num text-on-surface outline-none focus:ring-1 focus:ring-primary"
                />
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
