import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';

interface OrderItemsTableProps {
  items: CartItem[];
  selectedItemId: string | null;
  onSelectItem: (id: string) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onUpdateSalePrice?: (id: string, price: number) => void;
  onUpdateDiscount?: (id: string, discount: number) => void;
  onUpdateDiscPct?: (id: string, pct: number) => void;
}

interface EditableCellProps {
  initialValue: string;
  prefix?: string;
  suffix?: string;
  className?: string;
  onSave: (value: number) => void;
}

function EditableCell({
  initialValue,
  prefix = '',
  suffix = '',
  className = '',
  onSave,
}: EditableCellProps) {
  const [val, setVal] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setVal(initialValue);
    }
  }, [initialValue, isFocused]);

  const handleBlur = () => {
    setIsFocused(false);
    const cleaned = val.replace(/[^0-9.]/g, '');
    const num = parseFloat(cleaned);
    if (!isNaN(num) && num >= 0) {
      onSave(num);
    } else {
      setVal(initialValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    } else if (e.key === 'Escape') {
      setVal(initialValue);
      e.currentTarget.blur();
    }
  };

  return (
    <input
      type="text"
      value={isFocused ? val : `${prefix}${val}${suffix}`}
      onFocus={(e) => {
        setIsFocused(true);
        setVal(initialValue);
        e.target.select();
      }}
      onChange={(e) => setVal(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onClick={(e) => e.stopPropagation()}
      className={`text-right text-caption font-body-mono-num rounded border border-outline-variant/50 bg-surface-container-lowest focus:border-primary focus:outline-none shadow-xs transition-colors ${className}`}
    />
  );
}

export const OrderItemsTable = React.memo(function OrderItemsTable({
  items,
  selectedItemId,
  onSelectItem,
  onIncrement,
  onDecrement,
  onUpdateSalePrice,
  onUpdateDiscount,
  onUpdateDiscPct,
}: OrderItemsTableProps) {
  return (
    <div className="bg-surface-container-lowest rounded shadow-sm overflow-hidden flex flex-col border border-outline-variant/30 w-full flex-1 min-h-0">
      {/* Table Column Headers */}
      <div className="px-space-lg py-2 bg-surface-container-low text-on-surface-variant font-micro-label text-micro-label uppercase tracking-wider flex items-center justify-between select-none border-b border-outline-variant/20 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-space-md flex-1 min-w-0">
          <span className="w-24 shrink-0 font-semibold text-left">SKU</span>
          <span className="flex-1 min-w-[130px] truncate font-semibold text-left">
            Product &amp; Status
          </span>
        </div>
        <div className="flex items-center gap-space-sm shrink-0">
          <span className="w-16 text-center font-semibold">Stock</span>
          <span className="w-16 text-right font-semibold">Retail</span>
          <span className="w-20 text-center font-semibold">Sale Price</span>
          <span className="w-16 text-center font-semibold">Discount</span>
          <span className="w-16 text-center font-semibold">Disc %</span>
          <span className="w-24 text-right pr-1 font-semibold">Total / Rate</span>
          <span className="w-24 text-center font-semibold">Order Qty</span>
        </div>
      </div>

      {/* Cart Rows */}
      {items.length === 0 ? (
        <div className="flex-1 overflow-y-auto py-12 px-6 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant mb-3">
            <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
          </div>
          <p className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1">
            Order ledger is empty
          </p>
          <p className="font-caption text-caption text-on-surface-variant max-w-sm mb-4">
            Scan a barcode, press <kbd className="font-mono px-1 py-0.5 bg-surface-container rounded border border-outline-variant/30 text-on-surface font-bold">/</kbd> to search products, or enter an ad-hoc custom item.
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto divide-y divide-outline-variant/15">
          {items.map((item) => {
            const isSelected = selectedItemId === item.id;
            const retail = item.customRetail ?? item.product.mrp;
            const salePrice = item.customSalePrice ?? item.effectiveRate;
            const discount = item.customDiscount ?? (retail > salePrice ? retail - salePrice : item.unitDiscount);
            const discPct = retail > 0 ? ((discount / retail) * 100).toFixed(1) : '0.0';
            const lineTotal = item.quantity * item.effectiveRate;
            const isAbundantStock = item.product.stock > 30;

            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item.id)}
                className={`group px-space-lg py-2 flex items-center justify-between transition-colors select-none cursor-pointer ${
                  isSelected
                    ? 'bg-primary-fixed/20 hover:bg-primary-fixed/30 border-l-2 border-primary'
                    : 'hover:bg-surface-container-low/60 border-l-2 border-transparent'
                }`}
              >
                {/* Left side: SKU & Product Name */}
                <div className="flex items-center gap-space-md flex-1 min-w-0">
                  <span className="w-24 font-body-mono-num text-caption text-on-surface font-semibold shrink-0">
                    {item.product.sku}
                  </span>
                  <div className="flex items-center gap-2 min-w-0 truncate">
                    <span className="font-body-medium text-body-medium text-on-surface font-bold truncate group-hover:text-primary transition-colors">
                      {item.product.name}
                    </span>
                  </div>
                </div>

                {/* Right side: Stock, Retail, Sale Price, Discount, Disc %, Total/Rate, Qty */}
                <div className="flex items-center gap-space-sm shrink-0">
                  {/* Stock badge */}
                  <div className="w-16 flex justify-center">
                    <span
                      className={`font-micro-label text-micro-label px-1.5 py-0.5 rounded-full ${
                        isAbundantStock
                          ? 'bg-primary-fixed text-on-primary-fixed font-bold'
                          : 'bg-surface-container-high text-on-surface font-semibold'
                      }`}
                    >
                      {item.product.stock} left
                    </span>
                  </div>

                  {/* Retail */}
                  <div className="w-16 text-right">
                    <span className="font-body-mono-num text-caption text-on-surface-variant font-medium">
                      ₹{retail.toFixed(2)}
                    </span>
                  </div>

                  {/* Sale Price (Editable) */}
                  <div className="w-20 flex justify-center">
                    <EditableCell
                      initialValue={salePrice.toFixed(2)}
                      prefix="₹"
                      className="w-20 px-2 py-1 font-semibold text-primary"
                      onSave={(val) => onUpdateSalePrice?.(item.id, val)}
                    />
                  </div>

                  {/* Discount (Editable) */}
                  <div className="w-16 flex justify-center">
                    <EditableCell
                      initialValue={discount.toFixed(2)}
                      prefix="₹"
                      className="w-16 px-1.5 py-1 font-medium text-on-surface"
                      onSave={(val) => onUpdateDiscount?.(item.id, val)}
                    />
                  </div>

                  {/* Disc % (Editable) */}
                  <div className="w-16 flex justify-center">
                    <EditableCell
                      initialValue={discPct}
                      suffix="%"
                      className="w-16 px-1.5 py-1 font-medium text-on-surface"
                      onSave={(val) => onUpdateDiscPct?.(item.id, val)}
                    />
                  </div>

                  {/* Total / Rate */}
                  <div className="w-24 text-right pr-1 flex flex-col items-end">
                    <span className="font-body-mono-num text-body-medium text-primary font-bold">
                      ₹{lineTotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Order Qty */}
                  <div className="w-24 flex justify-center">
                    <div
                      className="flex items-center gap-1 bg-surface-container-lowest rounded p-0.5 border border-outline-variant/30 shrink-0 shadow-xs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => onDecrement(item.id)}
                        className="h-6 w-6 rounded bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-caption transition-colors cursor-pointer active:scale-95"
                        title="Decrease"
                      >
                        -
                      </button>
                      <span className="font-body-mono-num text-caption px-1.5 font-bold text-primary min-w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onIncrement(item.id)}
                        className="h-6 w-6 rounded bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-caption transition-colors cursor-pointer active:scale-95"
                        title="Increase"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});
