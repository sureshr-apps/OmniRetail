import React, { useState } from 'react';

interface CustomItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomItem: (name: string, rate: number, quantity: number) => void;
}

export function CustomItemModal({
  isOpen,
  onClose,
  onAddCustomItem,
}: CustomItemModalProps) {
  const [name, setName] = useState('');
  const [rate, setRate] = useState('');
  const [quantity, setQuantity] = useState('1');

  if (!isOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const rateNum = parseFloat(rate);
    const qtyNum = parseInt(quantity, 10) || 1;
    if (rateNum >= 0) {
      onAddCustomItem(name.trim() || 'Custom Line Item', rateNum, qtyNum);
      setName('');
      setRate('');
      setQuantity('1');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/40 backdrop-blur-xs p-4">
      <div className="bg-surface-container-lowest rounded-md shadow-xl border border-outline-variant/40 w-full max-w-md overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        <div className="px-space-lg py-3 bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-secondary">add_circle</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Instant Custom Item Entry
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

        <form onSubmit={handleAdd} className="p-space-lg flex flex-col gap-space-base">
          <div>
            <label className="font-caption text-caption text-on-surface font-semibold mb-1.5 block">
              Item Description
            </label>
            <input
              type="text"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Specialty Gift Wrap, Rush Service..."
              className="w-full h-10 px-3 rounded bg-surface-container-low font-body-default text-on-surface focus:outline-none border border-outline-variant/40 focus:border-primary transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-caption text-caption text-on-surface font-semibold mb-1.5 block">
                Price (₹)
              </label>
              <div className="relative flex items-center">
                <span className="font-body-mono-num text-body-medium text-on-surface-variant absolute left-3">
                  ₹
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="0.00"
                  className="w-full h-10 pl-7 pr-3 rounded bg-surface-container-low font-body-mono-num text-body-medium text-on-surface focus:outline-none border border-outline-variant/40 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="font-caption text-caption text-on-surface font-semibold mb-1.5 block">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full h-10 px-3 rounded bg-surface-container-low font-body-mono-num text-body-medium text-on-surface focus:outline-none border border-outline-variant/40 focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-outline-variant/20 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded text-on-surface-variant hover:bg-surface-container font-body-medium text-body-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded bg-primary text-on-primary font-body-medium text-body-medium hover:bg-primary-container transition-colors cursor-pointer"
            >
              Add to Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
