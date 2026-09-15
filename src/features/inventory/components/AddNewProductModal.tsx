import React, { useState } from 'react';
import { InventoryItem } from '../types';

interface AddNewProductModalProps {
  currentOutletId: string | null;
  onClose: () => void;
  onSave: (product: Partial<InventoryItem>) => void;
  currentOutletName?: string;
}

export function AddNewProductModal({ currentOutletId, onClose, onSave, currentOutletName }: AddNewProductModalProps) {
  const [sku, setSku] = useState('');
  const [barcode, setBarcode] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('Coffee');
  const [category, setCategory] = useState('Whole Bean');
  const [cost, setCost] = useState('12.00');
  const [mrp, setMrp] = useState('24.00');
  const [retailPrice, setRetailPrice] = useState('22.00');
  const [onHandQty, setOnHandQty] = useState('25');
  const [reorderLevel, setReorderLevel] = useState('10');
  const [batchNumber, setBatchNumber] = useState('');
  const [mfgDate, setMfgDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      sku: sku.trim(),
      barcode: barcode.trim(),
      name: name.trim(),
      department,
      category,
      locationId: currentOutletId || undefined,
      locationName: currentOutletName || '',
      cost: parseFloat(cost) || 10,
      mrp: parseFloat(mrp) || 20,
      retailPrice: parseFloat(retailPrice) || 18,
      onHandQty: parseInt(onHandQty, 10) || 0,
      reorderLevel: parseInt(reorderLevel, 10) || 5,
      overstockThreshold: 100,
      lotNumber: batchNumber.trim() || undefined,
      mfgDate: mfgDate || undefined,
      expiryDate: expiryDate || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm flex items-center justify-center p-4 transition-all">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-xl shadow-xl border border-outline-variant/30 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-space-lg py-space-base border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">add_box</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Add New Product
              </h3>
              <p className="font-caption text-caption text-on-surface-variant">
                Create a catalogue product and its first inventory record
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="p-space-lg space-y-3 overflow-y-auto max-h-[75vh]">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-caption text-caption font-semibold text-on-surface block mb-1">
                  SKU
                </label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full h-8 px-3 rounded bg-surface-container-low border border-outline-variant/50 font-body-mono-num text-caption text-on-surface focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="font-caption text-caption font-semibold text-on-surface block mb-1">
                  Barcode / UPC
                </label>
                <input
                  type="text"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  className="w-full h-8 px-3 rounded bg-surface-container-low border border-outline-variant/50 font-body-mono-num text-caption text-on-surface focus:outline-none focus:border-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-caption text-caption font-semibold text-on-surface block mb-1">
                Item Description / Name <span className="text-error">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Guatemala Santa Clara Geisha Whole Bean 250g"
                className="w-full h-8 px-3 rounded bg-surface-container-low border border-outline-variant/50 font-body-default text-caption text-on-surface focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-caption text-caption font-semibold text-on-surface block mb-1">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full h-8 px-2 rounded bg-surface-container-low border border-outline-variant/50 font-body-default text-caption text-on-surface focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="Coffee">Coffee</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Packaging">Packaging</option>
                  <option value="Pantry">Pantry</option>
                  <option value="Dairy & Plant">Dairy &amp; Plant</option>
                </select>
              </div>

              <div className="p-2 rounded bg-primary/5 border border-primary/20">
                <span className="font-micro-label uppercase font-bold text-on-surface-variant block">Selected outlet</span>
                <span className="font-caption text-caption font-semibold text-on-surface">{currentOutletName || 'No outlet selected'}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="font-caption text-caption font-semibold text-on-surface block mb-1">
                  Cost Price (₹)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  className="w-full h-8 px-2.5 rounded bg-surface-container-low border border-outline-variant/50 font-body-mono-num text-caption text-on-surface focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="font-caption text-caption font-semibold text-on-surface block mb-1">
                  Retail Price (₹)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={retailPrice}
                  onChange={(e) => setRetailPrice(e.target.value)}
                  className="w-full h-8 px-2.5 rounded bg-surface-container-low border border-outline-variant/50 font-body-mono-num text-caption text-on-surface focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="font-caption text-caption font-semibold text-on-surface block mb-1">
                  MRP (₹)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={mrp}
                  onChange={(e) => setMrp(e.target.value)}
                  className="w-full h-8 px-2.5 rounded bg-surface-container-low border border-outline-variant/50 font-body-mono-num text-caption text-on-surface focus:outline-none focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-caption text-caption font-semibold text-on-surface block mb-1">
                  Initial On-Hand Qty
                </label>
                <input
                  type="number"
                  value={onHandQty}
                  onChange={(e) => setOnHandQty(e.target.value)}
                  className="w-full h-8 px-2.5 rounded bg-surface-container-low border border-outline-variant/50 font-body-mono-num text-caption text-on-surface focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="font-caption text-caption font-semibold text-on-surface block mb-1">
                  Reorder Threshold
                </label>
                <input
                  type="number"
                  value={reorderLevel}
                  onChange={(e) => setReorderLevel(e.target.value)}
                  className="w-full h-8 px-2.5 rounded bg-surface-container-low border border-outline-variant/50 font-body-mono-num text-caption text-on-surface focus:outline-none focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="border-t border-outline-variant/20 pt-3 space-y-3">
              <p className="font-caption text-caption font-semibold text-on-surface">Batch and expiry tracking <span className="font-normal text-on-surface-variant">(optional)</span></p>
              <div>
                <label className="font-caption text-caption text-on-surface-variant block mb-1">Batch / Lot number</label>
                <input type="text" value={batchNumber} onChange={(e) => setBatchNumber(e.target.value)} placeholder="Leave blank for untracked stock" className="w-full h-8 px-3 rounded bg-surface-container-low border border-outline-variant/50 font-body-mono-num text-caption text-on-surface focus:outline-none focus:border-primary" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-caption text-caption text-on-surface-variant block mb-1">Manufacturing date</label>
                  <input type="date" value={mfgDate} onChange={(e) => setMfgDate(e.target.value)} className="w-full h-8 px-3 rounded bg-surface-container-low border border-outline-variant/50 font-body-default text-caption text-on-surface focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="font-caption text-caption text-on-surface-variant block mb-1">Expiry date</label>
                  <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="w-full h-8 px-3 rounded bg-surface-container-low border border-outline-variant/50 font-body-default text-caption text-on-surface focus:outline-none focus:border-primary" />
                </div>
              </div>
            </div>
          </div>

          <div className="px-space-lg py-space-sm border-t border-outline-variant/20 bg-surface-container-low flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-8 px-space-base rounded hover:bg-surface-container-high text-on-surface font-body-medium text-body-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-8 px-space-base bg-primary hover:bg-primary-container text-on-primary rounded font-body-medium text-body-medium font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">check</span>
              <span>Create Product</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
