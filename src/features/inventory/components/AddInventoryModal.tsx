import React, { useMemo, useState } from 'react';
import type { Product } from '@/features/products/types';
import type { AddInventoryInput } from '../types';
import { parseInventoryDate } from '../utils/date';

interface AddInventoryModalProps {
  currentOutletId: string | null;
  currentOutletName?: string;
  products: Product[];
  onClose: () => void;
  onSave: (input: AddInventoryInput) => void | Promise<void>;
}

export function AddInventoryModal({ currentOutletId, currentOutletName, products, onClose, onSave }: AddInventoryModalProps) {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [batchNumber, setBatchNumber] = useState('');
  const [mfgDate, setMfgDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [dateErrors, setDateErrors] = useState<{ mfgDate?: string; expiryDate?: string }>({});

  const selectedProduct = useMemo(() => products.find((product) => product.id === productId), [productId, products]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const parsedQuantity = Number(quantity);
    if (!productId || !Number.isFinite(parsedQuantity) || parsedQuantity <= 0) return;

    const parsedMfgDate = parseInventoryDate(mfgDate);
    const parsedExpiryDate = parseInventoryDate(expiryDate);
    const nextDateErrors: { mfgDate?: string; expiryDate?: string } = {};
    if (mfgDate.trim() && !parsedMfgDate) {
      nextDateErrors.mfgDate = 'Use a valid date in DD/MM/YYYY format';
    }
    if (expiryDate.trim() && !parsedExpiryDate) {
      nextDateErrors.expiryDate = 'Use a valid date in DD/MM/YYYY format';
    }
    if (parsedMfgDate && parsedExpiryDate && parsedMfgDate > parsedExpiryDate) {
      nextDateErrors.expiryDate = 'Expiry date must be on or after manufacturing date';
    }
    setDateErrors(nextDateErrors);
    if (Object.keys(nextDateErrors).length > 0) return;

    await onSave({
      productId,
      outletId: currentOutletId ?? '',
      quantity: parsedQuantity,
      batchNumber: batchNumber.trim() || undefined,
      mfgDate: parsedMfgDate,
      expiryDate: parsedExpiryDate,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-xl shadow-xl border border-outline-variant/30 flex flex-col overflow-hidden">
        <div className="px-space-lg py-space-base border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><span className="material-symbols-outlined text-[20px]">playlist_add</span></div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Add Inventory</h3>
              <p className="font-caption text-caption text-on-surface-variant">Add units for an existing product</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface"><span className="material-symbols-outlined text-[20px]">close</span></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-space-lg space-y-4">
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">store</span>
              <div>
                <p className="font-micro-label uppercase font-bold text-on-surface-variant">Adding to outlet</p>
                <p className="font-body-medium text-body-medium font-semibold text-on-surface">{currentOutletName ?? 'No outlet selected'}</p>
              </div>
            </div>

            <div>
              <label className="font-caption text-caption font-semibold text-on-surface block mb-1">Product <span className="text-error">*</span></label>
              <select required value={productId} onChange={(event) => setProductId(event.target.value)} className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary">
                <option value="">Select a product</option>
                {products.map((product) => <option key={product.id} value={product.id}>{product.name} · {product.sku}</option>)}
              </select>
              {selectedProduct && <p className="mt-1 font-micro-label text-on-surface-variant">{selectedProduct.type === 'consumable' ? 'Consumable' : 'Stockable'} · Current catalogue price ₹{selectedProduct.sellingPrice.toFixed(2)}</p>}
            </div>

            <div>
              <label className="font-caption text-caption font-semibold text-on-surface block mb-1">Units to add <span className="text-error">*</span></label>
              <input required min="0.01" step="any" type="number" value={quantity} onChange={(event) => setQuantity(event.target.value)} className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-mono-num text-body-default text-on-surface focus:outline-none focus:border-primary" />
            </div>

            <div className="border-t border-outline-variant/20 pt-4 space-y-3">
              <p className="font-caption text-caption font-semibold text-on-surface">Batch and expiry tracking <span className="font-normal text-on-surface-variant">(optional for non-expiring products)</span></p>
              <div>
                <label className="font-caption text-caption text-on-surface-variant block mb-1">Batch / Lot number</label>
                <input type="text" value={batchNumber} onChange={(event) => setBatchNumber(event.target.value)} placeholder="Leave blank for untracked stock" className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-mono-num text-body-default text-on-surface focus:outline-none focus:border-primary" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-caption text-caption text-on-surface-variant block mb-1">Manufacturing date</label>
                  <input type="text" inputMode="numeric" maxLength={10} value={mfgDate} onChange={(event) => setMfgDate(event.target.value)} placeholder="DD/MM/YYYY" aria-invalid={Boolean(dateErrors.mfgDate)} className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary" />
                  {dateErrors.mfgDate && <p className="mt-1 font-micro-label text-error">{dateErrors.mfgDate}</p>}
                </div>
                <div>
                  <label className="font-caption text-caption text-on-surface-variant block mb-1">Expiry date</label>
                  <input type="text" inputMode="numeric" maxLength={10} value={expiryDate} onChange={(event) => setExpiryDate(event.target.value)} placeholder="DD/MM/YYYY" aria-invalid={Boolean(dateErrors.expiryDate)} className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary" />
                  {dateErrors.expiryDate && <p className="mt-1 font-micro-label text-error">{dateErrors.expiryDate}</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="px-space-lg py-space-sm border-t border-outline-variant/20 bg-surface-container-low flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className="h-8 px-space-base rounded hover:bg-surface-container-high text-on-surface font-body-medium text-body-medium">Cancel</button>
            <button type="submit" className="h-8 px-space-base bg-primary hover:bg-primary-container text-on-primary rounded font-body-medium text-body-medium font-semibold flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">check</span><span>Add Inventory</span></button>
          </div>
        </form>
      </div>
    </div>
  );
}
