import React from 'react';
import { InventoryItem } from '../types';
import {
  deriveStockStatus,
  calculateMarginPercent,
} from '../services/inventoryService';

interface InventoryTableProps {
  items: InventoryItem[];
  selectedIds: Set<string>;
  onToggleSelectRow: (id: string) => void;
  onToggleSelectAll: () => void;
  onAdjustStock: (item: InventoryItem) => void;
  onViewHistory: (item: InventoryItem) => void;
  isLoading?: boolean;
}

export function InventoryTable({
  items,
  selectedIds,
  onToggleSelectRow,
  onToggleSelectAll,
  onAdjustStock,
  onViewHistory,
  isLoading,
}: InventoryTableProps) {
  const isAllSelected =
    items.length > 0 && items.every((i) => selectedIds.has(i.id));
  const isSomeSelected =
    items.some((i) => selectedIds.has(i.id)) && !isAllSelected;

  const renderStockBadge = (item: InventoryItem) => {
    const status = deriveStockStatus(
      item.onHandQty,
      item.reorderLevel,
      item.overstockThreshold
    );

    if (status === 'OUT_OF_STOCK') {
      return (
        <span className="inline-flex items-center justify-center gap-1 min-w-[110px] h-6 px-2.5 rounded-full bg-error-container text-on-error-container font-body-mono-num text-caption font-bold text-center">
          0 Stock
        </span>
      );
    }

    if (status === 'LOW_STOCK') {
      return (
        <span className="inline-flex items-center justify-center gap-1 min-w-[110px] h-6 px-2.5 rounded-full bg-error-container text-on-error-container font-body-mono-num text-caption font-bold text-center">
          <span className="h-1.5 w-1.5 rounded-full bg-error animate-pulse" />
          {item.onHandQty} Low
        </span>
      );
    }

    if (item.incomingPurchaseOrder) {
      return (
        <span className="inline-flex items-center justify-center gap-1 min-w-[110px] h-6 px-2.5 rounded-full bg-surface-container-high text-on-surface font-body-mono-num text-caption font-bold text-center">
          {item.onHandQty} In Stock
        </span>
      );
    }

    return (
      <span className="inline-flex items-center justify-center gap-1 min-w-[110px] h-6 px-2.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-body-mono-num text-caption font-bold text-center">
        {item.onHandQty} In Stock
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left font-body-default text-body-default border-collapse">
        {/* Table Header */}
        <thead>
          <tr className="bg-surface-container-low font-micro-label text-micro-label uppercase tracking-wider text-on-surface-variant h-9">
            <th className="pl-space-base pr-space-xs py-2 w-10">
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={(el) => {
                  if (el) el.indeterminate = isSomeSelected;
                }}
                onChange={onToggleSelectAll}
                className="rounded text-primary focus:ring-0 cursor-pointer"
                title="Select All"
              />
            </th>
            <th className="px-space-base py-2 font-micro-label text-micro-label font-bold uppercase tracking-wider text-on-surface-variant">
              SKU &amp; Barcode
            </th>
            <th className="px-space-base py-2 min-w-[220px] font-micro-label text-micro-label font-bold uppercase tracking-wider text-on-surface-variant">
              Item Description &amp; Dept
            </th>
            <th className="px-space-base py-2 text-center min-w-[110px] font-micro-label text-micro-label font-bold uppercase tracking-wider text-on-surface-variant">
              On-Hand Qty
            </th>
            <th className="px-space-base py-2 text-right font-micro-label text-micro-label font-bold uppercase tracking-wider text-on-surface-variant">
              MRP
            </th>
            <th className="px-space-base py-2 text-right font-micro-label text-micro-label font-bold uppercase tracking-wider text-on-surface-variant">
              Cost
            </th>
            <th className="px-space-base py-2 text-right font-micro-label text-micro-label font-bold uppercase tracking-wider text-on-surface-variant">
              Retail Price
            </th>
            <th className="px-space-base py-2 text-right min-w-[80px] font-micro-label text-micro-label font-bold uppercase tracking-wider text-on-surface-variant">
              Margin %
            </th>
            <th className="pr-space-base pl-space-base py-2 text-right min-w-[140px] font-micro-label text-micro-label font-bold uppercase tracking-wider text-on-surface-variant">
              Terminal Actions
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-surface-container">
          {isLoading ? (
            <tr>
              <td colSpan={9} className="py-12 text-center text-on-surface-variant">
                <div className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined animate-spin text-[20px]">
                    progress_activity
                  </span>
                  <span>Loading inventory items...</span>
                </div>
              </td>
            </tr>
          ) : items.length === 0 ? (
            <tr>
              <td colSpan={9} className="py-12 text-center text-on-surface-variant">
                <div className="flex flex-col items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[32px] text-outline">
                    inventory_2
                  </span>
                  <p className="font-semibold text-body-medium">No inventory records match filter criteria</p>
                  <p className="text-caption">Try adjusting search query or location filter.</p>
                </div>
              </td>
            </tr>
          ) : (
            items.map((item) => {
              const isSelected = selectedIds.has(item.id);
              const margin = calculateMarginPercent(item.retailPrice, item.cost);
              const isOut = item.onHandQty === 0;

              return (
                <tr
                  key={item.id}
                  className={`transition-colors group ${
                    isSelected
                      ? 'bg-surface-container-high/60'
                      : isOut
                      ? 'bg-surface-container-low/30 hover:bg-surface-container-low'
                      : 'hover:bg-surface-container-low'
                  }`}
                >
                  {/* Selection Checkbox */}
                  <td className="pl-space-base pr-space-xs py-2">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelectRow(item.id)}
                      className="rounded text-primary focus:ring-0 cursor-pointer"
                    />
                  </td>

                  {/* SKU & Barcode */}
                  <td className="px-space-base py-2">
                    <div className="flex flex-col">
                      <span className="font-body-mono-num text-body-medium font-bold text-on-surface">
                        {item.sku}
                      </span>
                      <span className="font-body-mono-num text-caption text-on-surface-variant">
                        {item.barcode}
                      </span>
                    </div>
                  </td>

                  {/* Item Description & Dept */}
                  <td className="px-space-base py-2">
                    <div className="flex items-center gap-space-sm">
                      <img
                        className="w-8 h-8 rounded object-cover bg-surface-container shrink-0"
                        src={item.imageUrl}
                        alt={item.imageAlt || item.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          // Fallback icon box
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="font-body-medium text-body-medium text-on-surface font-semibold truncate">
                          {item.name}
                        </span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="font-caption text-caption text-primary font-medium">
                            {item.department}
                          </span>
                          <span className="text-on-surface-variant text-[10px]">•</span>

                          {isOut ? (
                            <span className="font-caption text-caption text-error font-medium">
                              Out of Stock
                            </span>
                          ) : item.incomingPurchaseOrder ? (
                            <span className="font-caption text-caption text-tertiary font-medium">
                              {item.incomingPurchaseOrder}
                            </span>
                          ) : item.lotNumber ? (
                            <span className="font-caption text-caption text-on-surface-variant font-mono">
                              {item.lotNumber}
                            </span>
                          ) : item.badgeMetadata ? (
                            <span className="font-caption text-caption text-on-surface-variant">
                              {item.badgeMetadata}
                            </span>
                          ) : (
                            <span className="font-caption text-caption text-on-surface-variant">
                              {item.category}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* On-Hand Qty */}
                  <td className="px-space-base py-2 text-center">
                    {renderStockBadge(item)}
                  </td>

                  {/* MRP */}
                  <td className="px-space-base py-2 text-right font-caption text-caption">
                    <span className="font-body-mono-num text-on-surface-variant font-medium">
                      ${item.mrp.toFixed(2)}
                    </span>
                  </td>

                  {/* Cost */}
                  <td className="px-space-base py-2 text-right font-caption text-caption">
                    <span className="font-body-mono-num text-on-surface-variant font-medium">
                      ${item.cost.toFixed(2)}
                    </span>
                  </td>

                  {/* Retail Price */}
                  <td className="px-space-base py-2 text-right font-caption text-caption">
                    <span className="font-body-mono-num text-on-surface font-semibold">
                      ${item.retailPrice.toFixed(2)}
                    </span>
                  </td>

                  {/* Margin % */}
                  <td className="px-space-base py-2 text-right">
                    <span className="font-body-mono-num text-caption font-bold text-primary">
                      {margin.toFixed(1)}%
                    </span>
                  </td>

                  {/* Terminal Actions */}
                  <td className="pr-space-base pl-space-base py-2 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-90 group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => onAdjustStock(item)}
                        className="h-7 px-2 rounded bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface font-caption text-caption flex items-center gap-1 transition-colors cursor-pointer"
                        title="Quick Stock Adjustment (+/-)"
                      >
                        <span className="material-symbols-outlined text-[14px]">exposure</span>
                        <span>+/-</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onViewHistory(item)}
                        className="h-7 px-2 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-caption text-caption flex items-center gap-1 transition-colors cursor-pointer"
                        title="View Movement Audit Trail"
                      >
                        <span className="material-symbols-outlined text-[14px]">history</span>
                      </button>
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
