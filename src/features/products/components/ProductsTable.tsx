import React, { useState } from 'react';
import { Product } from '../types';

interface ProductsTableProps {
  items: Product[];
  selectedIds: Set<string>;
  onToggleSelectRow: (id: string) => void;
  onToggleSelectAll: () => void;
  onViewProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
  onToggleStatus: (product: Product) => void;
  isLoading: boolean;
}

export function ProductsTable({
  items,
  selectedIds,
  onToggleSelectRow,
  onToggleSelectAll,
  onViewProduct,
  onEditProduct,
  onToggleStatus,
  isLoading,
}: ProductsTableProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const allSelected =
    items.length > 0 && items.every((item) => selectedIds.has(item.id));
  const someSelected =
    items.some((item) => selectedIds.has(item.id)) && !allSelected;

  const handleMenuClick = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === productId ? null : productId);
  };

  return (
    <div className="overflow-x-auto select-none">
      <table className="w-full text-left border-collapse min-w-[1080px]">
        <thead>
          <tr className="bg-surface-container-low text-on-surface-variant font-micro-label text-micro-label uppercase tracking-wider h-9 border-b border-outline-variant/20">
            <th className="w-10 px-space-base text-center">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(el) => {
                  if (el) el.indeterminate = someSelected;
                }}
                onChange={onToggleSelectAll}
                className="rounded accent-primary cursor-pointer w-3.5 h-3.5"
                title="Select all on current page"
              />
            </th>
            <th className="w-28 px-space-base font-semibold">Product Code</th>
            <th className="min-w-[200px] px-space-base font-semibold">
              Product Name &amp; Brand
            </th>
            <th className="w-40 px-space-base font-semibold">Category</th>
            <th className="w-44 px-space-base font-semibold">SKU / Barcode</th>
            <th className="w-32 px-space-base text-right font-semibold">
              Selling / MRP
            </th>
            <th className="w-24 px-space-base text-center font-semibold">Status</th>
            <th className="w-28 px-space-base text-center font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody className="font-body-default text-body-default text-on-surface divide-y divide-outline-variant/15">
          {isLoading ? (
            <tr>
              <td colSpan={8} className="py-12 text-center text-on-surface-variant">
                <div className="flex flex-col items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[28px] animate-spin text-primary">
                    progress_activity
                  </span>
                  <span className="font-caption text-caption">Loading catalogue items...</span>
                </div>
              </td>
            </tr>
          ) : items.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-16 text-center text-on-surface-variant">
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-[24px]">search_off</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    No products match your current filters
                  </h3>
                  <p className="font-caption text-caption text-on-surface-variant max-w-sm">
                    Try adjusting your keyword query, category selections, or status toggles.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            items.map((item) => {
              const isSelected = selectedIds.has(item.id);
              const isMenuOpen = activeMenuId === item.id;

              return (
                <tr
                  key={item.id}
                  onClick={() => onViewProduct(item)}
                  className={`h-12 hover:bg-surface-container-low/60 transition-colors cursor-pointer group ${
                    isSelected ? 'bg-primary-fixed/10' : ''
                  } ${item.status === 'inactive' ? 'opacity-85' : ''}`}
                >
                  {/* Checkbox */}
                  <td
                    className="px-space-base text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelectRow(item.id)}
                      className="rounded accent-primary cursor-pointer w-3.5 h-3.5"
                    />
                  </td>

                  {/* Product Code */}
                  <td className="px-space-base font-body-mono-num text-body-mono-num font-bold text-primary">
                    {item.productCode}
                  </td>

                  {/* Product Name & Brand */}
                  <td className="px-space-base">
                    <div className="flex flex-col">
                      <span className="font-body-medium text-body-medium font-semibold text-on-surface group-hover:text-primary transition-colors">
                        {item.name}
                      </span>
                      <span className="font-caption text-caption text-on-surface-variant">
                        {item.brand}
                      </span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-space-base">
                    <span
                      className={`px-2 py-0.5 rounded font-caption text-caption font-medium ${
                        item.type === 'service'
                          ? 'bg-surface-container text-on-surface'
                          : 'bg-surface-container-high text-on-surface'
                      }`}
                    >
                      {item.categoryName}
                    </span>
                  </td>

                  {/* SKU / Barcode */}
                  <td className="px-space-base">
                    <div className="flex flex-col font-body-mono-num text-body-mono-num">
                      <span className="text-on-surface font-semibold">{item.sku}</span>
                      <span className="font-caption text-caption text-on-surface-variant">
                        {item.barcode || 'N/A (Service)'}
                      </span>
                    </div>
                  </td>

                  {/* Selling / MRP */}
                  <td className="px-space-base text-right font-body-mono-num text-body-mono-num">
                    <div className="flex flex-col items-end">
                      <span className="font-semibold text-on-surface">
                        ${item.sellingPrice.toFixed(2)}
                      </span>
                      {item.type === 'service' ? (
                        <span className="font-caption text-caption text-on-surface-variant">
                          Fixed Rate
                        </span>
                      ) : item.type === 'consumable' && item.cost ? (
                        <span className="font-caption text-caption text-on-surface-variant">
                          Cost: ${item.cost.toFixed(2)}
                        </span>
                      ) : item.mrp && item.mrp > item.sellingPrice ? (
                        <span className="font-caption text-caption text-on-surface-variant line-through">
                          ${item.mrp.toFixed(2)}
                        </span>
                      ) : (
                        <span className="font-caption text-caption text-on-surface-variant">
                          Standard
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-space-base text-center">
                    {item.status === 'active' ? (
                      <span className="px-2 py-0.5 rounded-full font-micro-label text-micro-label uppercase font-bold bg-emerald-100 text-emerald-800">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full font-micro-label text-micro-label uppercase font-bold bg-surface-container text-on-surface-variant">
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td
                    className="px-space-base text-center relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-center gap-1 text-on-surface-variant">
                      <button
                        type="button"
                        onClick={() => onViewProduct(item)}
                        className="p-1 rounded hover:bg-surface-container-high hover:text-primary transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          visibility
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onEditProduct(item)}
                        className="p-1 rounded hover:bg-surface-container-high hover:text-primary transition-colors cursor-pointer"
                        title="Edit Product"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          edit
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onViewProduct(item)}
                        className="p-1 rounded hover:bg-surface-container-high hover:text-primary transition-colors cursor-pointer"
                        title="View Multi-Store Stock Status"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          tune
                        </span>
                      </button>

                      <div className="relative">
                        <button
                          type="button"
                          onClick={(e) => handleMenuClick(e, item.id)}
                          className="p-1 rounded hover:bg-surface-container-high hover:text-primary transition-colors cursor-pointer"
                          title="More Options"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            more_vert
                          </span>
                        </button>

                        {isMenuOpen && (
                          <div className="absolute right-0 mt-1 w-44 bg-surface-container-lowest rounded shadow-lg border border-outline-variant/30 py-1 z-30 text-left">
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                onViewProduct(item);
                              }}
                              className="w-full px-3 py-1.5 text-caption font-medium hover:bg-surface-container flex items-center gap-2 text-on-surface cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[14px]">
                                visibility
                              </span>
                              <span>View Details</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                onEditProduct(item);
                              }}
                              className="w-full px-3 py-1.5 text-caption font-medium hover:bg-surface-container flex items-center gap-2 text-on-surface cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[14px]">
                                edit
                              </span>
                              <span>Edit Product</span>
                            </button>

                            <div className="h-px bg-outline-variant/20 my-1" />

                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                onToggleStatus(item);
                              }}
                              className={`w-full px-3 py-1.5 text-caption font-medium hover:bg-surface-container flex items-center gap-2 cursor-pointer ${
                                item.status === 'active'
                                  ? 'text-error hover:text-error'
                                  : 'text-primary hover:text-primary'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[14px]">
                                power_settings_new
                              </span>
                              <span>
                                {item.status === 'active'
                                  ? 'Inactivate Product'
                                  : 'Activate Product'}
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
