import React, { useState } from 'react';
import { Product } from '../types';
import { formatProductCode } from '../utils/formatProductCode';

interface ProductDetailDrawerProps {
  product: Product | null;
  onClose: () => void;
  onEdit: (product: Product) => void;
  onToggleStatus: (product: Product) => void;
  onDelete: (product: Product) => void;
  onNavigateToInventory: () => void;
  onDuplicate: (product: Product) => void;
}

export function ProductDetailDrawer({
  product,
  onClose,
  onEdit,
  onToggleStatus,
  onDelete,
  onNavigateToInventory,
  onDuplicate,
}: ProductDetailDrawerProps) {
  const [imgError, setImgError] = useState(false);

  if (!product) return null;

  // Calculate gross margin if cost and selling price available
  const marginPercent =
    product.cost && product.sellingPrice > 0
      ? (((product.sellingPrice - product.cost) / product.sellingPrice) * 100).toFixed(1)
      : null;

  const totalUnits = product.stockSummary?.onHandTotal ?? 0;

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex justify-end transition-opacity">
      <div className="w-full sm:w-[480px] bg-surface-container-lowest shadow-2xl h-full flex flex-col animate-in slide-in-from-right duration-200 border-l border-outline-variant/30">
        {/* Drawer Header */}
        <div className="px-space-xl py-space-lg bg-surface-container-low flex items-center justify-between border-b border-outline-variant/20 shrink-0">
          <div className="flex items-center gap-space-sm">
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Product Details
                </span>
                <span className="font-body-mono-num text-caption font-bold text-primary px-1.5 py-0.5 rounded bg-surface-container-high">
                  {formatProductCode(product.productCode)}
                </span>
              </div>
              <span className="font-caption text-caption text-on-surface-variant">
                Downtown Flagship · Multi-Store Ledger
              </span>
            </div>
          </div>

          <div className="flex items-center gap-space-xs">
            {product.status === 'active' ? (
              <span className="px-2 py-0.5 rounded-full font-micro-label text-micro-label uppercase font-bold bg-emerald-100 text-emerald-800">
                Active
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full font-micro-label text-micro-label uppercase font-bold bg-surface-container text-on-surface-variant">
                Inactive
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-surface-container text-on-surface-variant flex items-center justify-center transition-colors cursor-pointer"
              title="Close Drawer (Esc)"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Drawer Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-space-xl space-y-space-xl text-on-surface">
          {/* Core Product Visual & Description */}
          <div className="flex items-start gap-space-base bg-surface-container-low/40 p-space-base rounded-lg border border-outline-variant/20">
            {product.imageUrl && !imgError ? (
              <img
                src={product.imageUrl}
                alt={product.imageAlt || product.name}
                onError={() => setImgError(true)}
                className="w-20 h-20 rounded-lg object-cover bg-surface-container-high shrink-0 border border-outline-variant/30"
              />
            ) : (
              <div className="w-20 h-20 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant shrink-0 border border-outline-variant/30">
                <span className="material-symbols-outlined text-[32px]">
                  {product.type === 'service' ? 'design_services' : 'inventory_2'}
                </span>
              </div>
            )}
            <div className="flex flex-col">
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold leading-snug">
                {product.name}
              </h2>
              <span className="font-caption text-caption text-primary font-semibold">
                {product.brand} • {product.categoryName}
              </span>
              <p className="font-caption text-caption text-on-surface-variant mt-1 line-clamp-3">
                {product.description ||
                  'No description provided for this product master record.'}
              </p>
            </div>
          </div>

          {/* Section: Identification & Barcodes */}
          <div>
            <h3 className="font-caption text-caption uppercase tracking-wider text-on-surface-variant font-bold mb-space-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">
                badge
              </span>
              <span>Identification &amp; Codes</span>
            </h3>
            <div className="grid grid-cols-2 gap-space-sm bg-surface-container-low/30 p-space-base rounded-lg font-caption text-caption border border-outline-variant/20">
              <div>
                <span className="text-on-surface-variant block">SKU Code</span>
                <span className="font-body-mono-num font-semibold text-on-surface text-body-default">
                  {product.sku}
                </span>
              </div>
              <div>
                <span className="text-on-surface-variant block">Barcode (EAN-13)</span>
                <span className="font-body-mono-num font-semibold text-on-surface text-body-default">
                  {product.barcode || 'N/A (Service)'}
                </span>
              </div>
              <div>
                <span className="text-on-surface-variant block">HSN / SAC Code</span>
                <span className="font-body-mono-num font-semibold text-on-surface">
                  {product.hsnCode || '6205.20.00'}
                </span>
              </div>
              <div>
                <span className="text-on-surface-variant block">Unit of Measure</span>
                <span className="font-semibold text-on-surface">
                  {product.unitOfMeasure || 'Pieces (Pcs)'}
                </span>
              </div>
              <div className="col-span-2 pt-1 border-t border-outline-variant/20">
                <span className="text-on-surface-variant block">Variants Configured</span>
                <span className="font-semibold text-on-surface">
                  {product.variantsConfigured || 'Standard SKU (No matrix variants)'}
                </span>
              </div>
            </div>
          </div>

          {/* Section: Pricing & Tax Structure */}
          <div>
            <h3 className="font-caption text-caption uppercase tracking-wider text-on-surface-variant font-bold mb-space-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">
                payments
              </span>
              <span>Pricing &amp; Tax Structure</span>
            </h3>
            <div className="grid grid-cols-3 gap-space-xs bg-surface-container-low/30 p-space-base rounded-lg font-caption text-caption border border-outline-variant/20">
              <div>
                <span className="text-on-surface-variant block">Purchase Cost</span>
                <span className="font-body-mono-num font-semibold text-on-surface text-body-default">
                  {product.cost !== undefined ? `$${product.cost.toFixed(2)}` : 'N/A'}
                </span>
              </div>
              <div>
                <span className="text-on-surface-variant block">Selling Price</span>
                <span className="font-body-mono-num font-bold text-primary text-body-default">
                  ${product.sellingPrice.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-on-surface-variant block">MRP (Sticker)</span>
                <span className="font-body-mono-num font-semibold text-on-surface text-body-default">
                  {product.mrp !== undefined ? `$${product.mrp.toFixed(2)}` : 'N/A'}
                </span>
              </div>
              <div className="col-span-3 pt-space-xs flex items-center justify-between text-caption border-t border-outline-variant/20 mt-1">
                <span className="text-on-surface-variant">
                  Gross Operating Margin:{' '}
                  {marginPercent ? (
                    <span className="font-body-mono-num font-bold text-emerald-700">
                      {marginPercent}%
                    </span>
                  ) : (
                    <span className="font-body-mono-num font-bold text-on-surface">N/A</span>
                  )}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-bold">
                  {product.taxCategory || 'GST 12%'}
                </span>
              </div>
              <div className="col-span-3 text-on-surface-variant pt-1">
                <span>
                  Min Selling Price:{' '}
                  <span className="font-body-mono-num text-on-surface font-semibold">
                    ${product.minSellingPrice?.toFixed(2) || product.sellingPrice.toFixed(2)}
                  </span>{' '}
                  • Discount Allowed:{' '}
                  <span className="text-primary font-semibold">
                    {product.discountAllowed ? 'Yes' : 'No'}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Section: Multi-Store Stock Breakdown */}
          <div>
            <div className="flex items-center justify-between mb-space-xs">
              <h3 className="font-caption text-caption uppercase tracking-wider text-on-surface-variant font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  store
                </span>
                <span>Multi-Store Stock Allocation</span>
              </h3>
              {product.type !== 'service' && (
                <span className="font-body-mono-num font-bold text-primary font-caption text-caption">
                  {totalUnits} Units Total
                </span>
              )}
            </div>

            {product.type === 'service' ? (
              <div className="p-space-base rounded-lg bg-surface-container-low/30 border border-outline-variant/20 text-caption text-on-surface-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  info
                </span>
                <span>
                  Service item: Fulfilled dynamically on demand. Inventory warehouse quantities do not apply.
                </span>
              </div>
            ) : product.stockSummary?.storeBreakdown &&
              product.stockSummary.storeBreakdown.length > 0 ? (
              <div className="bg-surface-container-low/30 rounded-lg overflow-hidden font-caption text-caption border border-outline-variant/20 divide-y divide-outline-variant/15">
                {product.stockSummary.storeBreakdown.map((st) => (
                  <div
                    key={st.storeId}
                    className={`p-space-base flex items-center justify-between transition-colors ${
                      st.isWarning ? 'bg-amber-50/60' : 'hover:bg-surface-container-low/60'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-on-surface">{st.storeName}</span>
                      <span className="text-on-surface-variant text-[10px]">
                        {st.locationText}
                      </span>
                    </div>
                    <div className="text-right font-body-mono-num">
                      <span
                        className={`font-bold block ${
                          st.quantity === 0
                            ? 'text-error'
                            : st.isWarning
                            ? 'text-amber-800'
                            : 'text-on-surface'
                        }`}
                      >
                        {st.quantity} units
                      </span>
                      <span
                        className={`text-[10px] ${
                          st.isWarning ? 'text-amber-700 font-semibold' : 'text-emerald-700'
                        }`}
                      >
                        {st.statusText}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-space-base rounded-lg bg-surface-container-low/30 border border-outline-variant/20 text-caption text-on-surface-variant">
                <span>Total On-Hand: {totalUnits} units across distribution network.</span>
              </div>
            )}
          </div>

          {/* Section: Procurement & Supplier */}
          <div>
            <h3 className="font-caption text-caption uppercase tracking-wider text-on-surface-variant font-bold mb-space-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">
                local_shipping
              </span>
              <span>Procurement &amp; Supplier</span>
            </h3>
            <div className="bg-surface-container-low/30 p-space-base rounded-lg font-caption text-caption space-y-2 border border-outline-variant/20">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Preferred Supplier:</span>
                <span className="font-semibold text-on-surface">
                  {product.primarySupplier || 'Not linked'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Reorder Parameters:</span>
                <span className="font-semibold text-on-surface">
                  {product.type === 'service'
                    ? 'N/A (Service Item)'
                    : `Trigger at ${product.reorderLevel || 15} • PO Qty: ${
                        product.reorderQuantity || 30
                      } units`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Batch / Expiry Tracking:</span>
                <span className="text-on-surface-variant">Disabled</span>
              </div>
            </div>
          </div>

          {/* Section: Recent Activity */}
          <div>
            <h3 className="font-caption text-caption uppercase tracking-wider text-on-surface-variant font-bold mb-space-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">
                history
              </span>
              <span>Recent Ledger Activity</span>
            </h3>
            <div className="bg-surface-container-low/30 p-space-base rounded-lg font-caption text-caption space-y-2 border border-outline-variant/20">
              {product.recentActivity && product.recentActivity.length > 0 ? (
                product.recentActivity.map((act) => (
                  <div key={act.id} className="flex items-center justify-between">
                    <span className="text-on-surface font-medium">{act.title}</span>
                    <span className="font-body-mono-num text-on-surface-variant">
                      {act.reference} • {act.timeAgo}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-on-surface-variant text-caption">
                  No recent ledger transactions logged for this product.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Drawer Action Footer */}
        <div className="p-space-base bg-surface-container-low flex items-center justify-between gap-space-xs border-t border-outline-variant/20 shrink-0">
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="flex-1 h-9 bg-primary hover:bg-primary-container text-on-primary font-body-medium text-body-medium rounded-lg shadow-sm flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
            <span>Edit Product</span>
          </button>

          <button
            type="button"
            onClick={onNavigateToInventory}
            className="h-9 px-space-base bg-surface-container-lowest hover:bg-surface-container text-on-surface font-body-medium text-body-medium rounded-lg flex items-center gap-1 shadow-sm border border-outline-variant/30 transition-colors cursor-pointer"
            title="View live quantities in Inventory screen"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span>Stock</span>
          </button>

          <button
            type="button"
            onClick={() => onDuplicate(product)}
            className="h-9 px-space-base bg-surface-container-lowest hover:bg-surface-container text-on-surface font-body-medium text-body-medium rounded-lg flex items-center gap-1 shadow-sm border border-outline-variant/30 transition-colors cursor-pointer"
            title="Duplicate as new product"
          >
            <span className="material-symbols-outlined text-[16px]">content_copy</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleStatus(product)}
            className={`h-9 px-space-base rounded-lg flex items-center gap-1 transition-colors cursor-pointer ${
              product.status === 'active'
                ? 'bg-error-container hover:bg-error-container/80 text-on-error-container'
                : 'bg-primary/15 hover:bg-primary/25 text-primary'
            }`}
            title={product.status === 'active' ? 'Deactivate Product' : 'Activate Product'}
          >
            <span className="material-symbols-outlined text-[16px]">
              power_settings_new
            </span>
          </button>
          <button
            type="button"
            onClick={() => onDelete(product)}
            className="h-9 px-space-base rounded-lg border border-error/30 bg-surface-container-lowest text-error hover:bg-error-container/20 flex items-center gap-1 transition-colors cursor-pointer"
            title="Delete Product"
          >
            <span className="material-symbols-outlined text-[16px]">delete</span>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
