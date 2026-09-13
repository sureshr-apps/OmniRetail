import React, { useState } from 'react';

interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDiscount: number;
  subtotal: number;
  onApplyDiscount: (amount: number) => void;
}

export function DiscountModal({
  isOpen,
  onClose,
  currentDiscount,
  subtotal,
  onApplyDiscount,
}: DiscountModalProps) {
  const [discountValue, setDiscountValue] = useState<string>(
    currentDiscount > 0 ? currentDiscount.toString() : ''
  );

  if (!isOpen) return null;

  const handleApply = (amount: number) => {
    onApplyDiscount(Math.max(0, Math.min(amount, subtotal)));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/40 backdrop-blur-xs p-4">
      <div className="bg-surface-container-lowest rounded-md shadow-xl border border-outline-variant/40 w-full max-w-md overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        <div className="px-space-lg py-3 bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">percent</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Order Promotional Discount (F2)
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-space-lg flex flex-col gap-space-base">
          <div className="text-caption text-on-surface-variant">
            Subtotal eligible: <span className="font-body-mono-num font-bold text-on-surface">${subtotal.toFixed(2)}</span>
          </div>

          <div>
            <label className="font-caption text-caption text-on-surface font-semibold mb-1.5 block">
              Quick Presets
            </label>
            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => handleApply(subtotal * 0.05)}
                className="py-2 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-body-mono-num text-caption font-bold border border-outline-variant/30 transition-colors cursor-pointer"
              >
                5% Off
              </button>
              <button
                type="button"
                onClick={() => handleApply(subtotal * 0.10)}
                className="py-2 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-body-mono-num text-caption font-bold border border-outline-variant/30 transition-colors cursor-pointer"
              >
                10% Off
              </button>
              <button
                type="button"
                onClick={() => handleApply(5.00)}
                className="py-2 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-body-mono-num text-caption font-bold border border-outline-variant/30 transition-colors cursor-pointer"
              >
                $5.00 Off
              </button>
              <button
                type="button"
                onClick={() => handleApply(10.00)}
                className="py-2 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-body-mono-num text-caption font-bold border border-outline-variant/30 transition-colors cursor-pointer"
              >
                $10.00 Off
              </button>
            </div>
          </div>

          <div>
            <label className="font-caption text-caption text-on-surface font-semibold mb-1.5 block">
              Custom Amount ($)
            </label>
            <div className="relative flex items-center">
              <span className="font-body-mono-num text-body-medium text-on-surface-variant absolute left-3">
                $
              </span>
              <input
                type="number"
                step="0.50"
                min="0"
                max={subtotal}
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                placeholder="0.00"
                className="w-full h-10 pl-7 pr-3 rounded bg-surface-container-low font-body-mono-num text-body-medium text-on-surface focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/40 focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="p-space-base bg-surface-container-low/50 border-t border-outline-variant/20 flex items-center justify-between">
          <button
            type="button"
            onClick={() => handleApply(0)}
            className="text-caption text-error font-semibold hover:underline cursor-pointer"
          >
            Clear Discount
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded text-on-surface-variant hover:bg-surface-container font-body-medium text-body-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleApply(parseFloat(discountValue) || 0)}
              className="px-4 py-1.5 rounded bg-primary text-on-primary font-body-medium text-body-medium hover:bg-primary-container transition-colors cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
