import React, { useState, useEffect } from 'react';
import { OrderTotals } from '../types';

interface TotalsPanelProps {
  totals: OrderTotals;
  promoDiscount: number;
  onUpdatePromoDiscount: (val: number) => void;
  onOpenDiscountModal: () => void;
}

export const TotalsPanel = React.memo(function TotalsPanel({
  totals,
  promoDiscount,
  onUpdatePromoDiscount,
  onOpenDiscountModal,
}: TotalsPanelProps) {
  const [inputVal, setInputVal] = useState(promoDiscount.toFixed(2));
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setInputVal(promoDiscount.toFixed(2));
    }
  }, [promoDiscount, isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    const cleaned = inputVal.replace(/[^0-9.]/g, '');
    const num = parseFloat(cleaned);
    if (!isNaN(num) && num >= 0) {
      onUpdatePromoDiscount(num);
    } else {
      setInputVal(promoDiscount.toFixed(2));
    }
  };

  return (
    <div className="p-space-base bg-surface-container-low/50 flex flex-col justify-between gap-space-sm">
      <div className="flex flex-col gap-1.5">
        {/* Subtotal */}
        <div className="flex items-center justify-between font-body-default text-body-default text-on-surface-variant">
          <span>
            Subtotal ({totals.itemCount} items, {totals.unitCount} units)
          </span>
          <span className="font-body-mono-num font-medium text-on-surface">
            ₹{totals.subtotal.toFixed(2)}
          </span>
        </div>

        {/* Discount (Promo) with inline editable input & edit pencil */}
        <div className="flex items-center justify-between font-body-default text-body-default text-secondary font-medium">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">loyalty</span>
            <span>Discount (Promo)</span>
            <button
              type="button"
              onClick={onOpenDiscountModal}
              className="hover:text-primary transition-colors text-on-surface-variant flex items-center ml-0.5 cursor-pointer"
              title="Edit discount note"
            >
              <span className="material-symbols-outlined text-[14px]">edit</span>
            </button>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-body-mono-num font-semibold text-secondary">-</span>
            <div className="relative flex items-center">
              <span className="absolute left-1.5 font-body-mono-num text-caption text-secondary font-semibold pointer-events-none">
                ₹
              </span>
              <input
                type="text"
                value={isEditing ? inputVal : promoDiscount.toFixed(2)}
                onFocus={(e) => {
                  setIsEditing(true);
                  setInputVal(promoDiscount.toFixed(2));
                  e.target.select();
                }}
                onChange={(e) => setInputVal(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') e.currentTarget.blur();
                }}
                className="w-16 h-6 pl-4 pr-1.5 py-0.5 text-right font-body-mono-num text-caption font-semibold rounded border border-outline-variant/50 bg-surface-container-lowest text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-xs transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Sales Tax (GST) */}
        <div className="flex items-center justify-between font-body-default text-body-default text-on-surface-variant">
          <span>Sales Tax (GST)</span>
          <span className="font-body-mono-num font-medium text-on-surface">
            ₹{totals.tax.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Total Payable */}
      <div className="pt-2 mt-1 flex items-baseline justify-between border-t border-outline-variant/20">
        <div className="flex flex-col">
          <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
            Total Payable
          </span>
          <span className="font-caption text-caption text-on-surface-variant">
            Includes applicable store discounts
          </span>
        </div>
        <div className="text-right">
          <span className="font-body-mono-num text-primary font-bold tracking-tight text-headline-lg">
            ₹{totals.totalPayable.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
});
