import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';

interface PriceCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: CartItem | null;
  onUpdateRate: (itemId: string, newRate: number) => void;
}

export function PriceCheckModal({
  isOpen,
  onClose,
  selectedItem,
  onUpdateRate,
}: PriceCheckModalProps) {
  const [newRateStr, setNewRateStr] = useState('');

  useEffect(() => {
    if (selectedItem) {
      setNewRateStr(selectedItem.effectiveRate.toFixed(2));
    }
  }, [selectedItem]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!selectedItem) return;
    const parsed = parseFloat(newRateStr);
    if (!isNaN(parsed) && parsed >= 0) {
      onUpdateRate(selectedItem.id, parsed);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/40 backdrop-blur-xs p-4">
      <div className="bg-surface-container-lowest rounded-md shadow-xl border border-outline-variant/40 w-full max-w-md overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        <div className="px-space-lg py-3 bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">price_check</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Price Check &amp; Override (F4)
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
          {selectedItem ? (
            <>
              <div className="p-space-base rounded bg-surface-container-low border border-outline-variant/30 flex flex-col gap-1">
                <span className="font-micro-label text-micro-label uppercase text-on-surface-variant font-bold">
                  Target Item
                </span>
                <span className="font-body-medium text-body-medium font-bold text-on-surface">
                  {selectedItem.product.name}
                </span>
                <div className="flex items-center gap-4 text-caption text-on-surface-variant mt-1 font-body-mono-num">
                  <span>SKU: {selectedItem.product.sku}</span>
                  <span>Stock: {selectedItem.product.stock} units</span>
                  <span>Original MRP: ${selectedItem.product.mrp.toFixed(2)}</span>
                </div>
              </div>

              <div>
                <label className="font-caption text-caption text-on-surface font-semibold mb-1.5 block">
                  Effective Unit Rate ($)
                </label>
                <div className="relative flex items-center">
                  <span className="font-body-mono-num text-body-medium text-on-surface-variant absolute left-3">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.10"
                    min="0"
                    value={newRateStr}
                    onChange={(e) => setNewRateStr(e.target.value)}
                    className="w-full h-10 pl-7 pr-3 rounded bg-surface-container-low font-body-mono-num text-body-medium text-on-surface focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/40 focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="py-6 text-center text-on-surface-variant font-body-default">
              Please select an item from the order table first to inspect or override its price.
            </div>
          )}
        </div>

        <div className="p-space-base bg-surface-container-low/50 border-t border-outline-variant/20 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded text-on-surface-variant hover:bg-surface-container font-body-medium text-body-medium transition-colors cursor-pointer"
          >
            Cancel
          </button>
          {selectedItem && (
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-1.5 rounded bg-primary text-on-primary font-body-medium text-body-medium hover:bg-primary-container transition-colors cursor-pointer"
            >
              Update Rate
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
