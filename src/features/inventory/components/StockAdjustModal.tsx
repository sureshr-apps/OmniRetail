import React, { useEffect, useState } from 'react';
import { InventoryItem, AdjustMode, StockAdjustmentInput } from '../types';
import { useAuth } from '@/app/context/AuthContext';
import { useTenantOutlet } from '@/app/context/TenantOutletContext';

interface StockAdjustModalProps {
  item: InventoryItem;
  onClose: () => void;
  onConfirm: (input: StockAdjustmentInput) => void;
}

export function StockAdjustModal({
  item,
  onClose,
  onConfirm,
}: StockAdjustModalProps) {
  const { user } = useAuth();
  const tenantOutlet = useTenantOutlet();
  const activeOutletName = tenantOutlet?.selectedOutlet?.name ?? 'No outlet selected';
  const activeUserName = user?.displayName?.trim() || user?.username?.trim() || 'Authenticated user';
  const [mode, setMode] = useState<AdjustMode>(
    item.onHandQty <= 0 ? 'increase' : 'decrease'
  );
  const [qty, setQty] = useState<number>(1);
  const [reasonCode, setReasonCode] = useState<string>(
    'Damaged Goods in Transit / Shelf Drop'
  );
  const [storageLocation, setStorageLocation] = useState<string>(activeOutletName);
  const [auditNote, setAuditNote] = useState<string>('');

  useEffect(() => {
    setStorageLocation(item.binRack ? `${activeOutletName} - ${item.binRack}` : activeOutletName);
  }, [activeOutletName, item.binRack]);

  // Resulting stock calculation
  const currentBase = item.onHandQty;
  let resultingStock = currentBase;
  if (mode === 'decrease') {
    resultingStock = Math.max(0, currentBase - qty);
  } else if (mode === 'increase') {
    resultingStock = currentBase + qty;
  } else {
    resultingStock = Math.max(0, qty);
  }

  const handleStepQty = (delta: number) => {
    setQty((prev) => Math.max(1, prev + delta));
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      itemId: item.id,
      sku: item.sku,
      mode,
      quantity: qty,
      reasonCode,
      storageLocation,
      auditNote: auditNote.trim() || undefined,
      operatorName: activeUserName,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm flex items-center justify-center p-4 transition-all">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-xl shadow-xl border border-outline-variant/30 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-space-lg py-space-base border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Manual Stock Adjustment
              </h3>
              <p className="font-caption text-caption text-on-surface-variant">
                Update on-hand count and track audit reasons
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

        {/* Modal Body */}
        <form onSubmit={handleConfirm} className="flex flex-col">
          <div className="p-space-lg space-y-space-base overflow-y-auto max-h-[75vh]">
            {/* Item Card */}
            <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-2">
                  <span className="font-body-mono-num text-caption font-bold px-1.5 py-0.5 rounded bg-surface-container text-on-surface">
                    {item.sku}
                  </span>
                  <span className="font-micro-label text-micro-label uppercase text-primary font-semibold">
                    Active SKU
                  </span>
                </div>
                <p className="font-body-medium text-body-medium font-semibold text-on-surface mt-1 truncate">
                  {item.name}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="font-caption text-caption text-on-surface-variant block">
                  Current On-Hand
                </span>
                <span className="font-body-mono-num text-headline-sm font-bold text-on-surface">
                  {item.onHandQty}
                </span>
                <span className="font-caption text-caption text-on-surface-variant ml-1">
                  units
                </span>
              </div>
            </div>

            {/* Adjustment Mode */}
            <div>
              <label className="font-caption text-caption font-semibold text-on-surface block mb-1.5">
                Adjustment Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setMode('decrease')}
                  className={`mode-btn py-2 px-2.5 rounded-lg border font-caption text-caption font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    mode === 'decrease'
                      ? 'border-error bg-error-container/30 text-error'
                      : 'border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface-variant'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">remove_circle_outline</span>
                  <span>Decrease (-)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMode('increase')}
                  className={`mode-btn py-2 px-2.5 rounded-lg border font-caption text-caption font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    mode === 'increase'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface-variant'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle_outline</span>
                  <span>Increase (+)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMode('reconcile')}
                  className={`mode-btn py-2 px-2.5 rounded-lg border font-caption text-caption font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    mode === 'reconcile'
                      ? 'border-tertiary bg-tertiary/10 text-tertiary'
                      : 'border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface-variant'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">balance</span>
                  <span>Set Physical</span>
                </button>
              </div>
            </div>

            {/* Quantity and Resulting Stock */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-caption text-caption font-semibold text-on-surface block">
                  Adjustment Quantity
                </label>
                <div className="flex items-center rounded-lg border border-outline-variant/50 bg-surface-container-low overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                  <button
                    type="button"
                    onClick={() => handleStepQty(-1)}
                    className="w-9 h-9 flex items-center justify-center hover:bg-surface-container text-on-surface transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">remove</span>
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-full h-9 text-center bg-transparent font-body-mono-num text-body-medium font-bold text-on-surface focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleStepQty(1)}
                    className="w-9 h-9 flex items-center justify-center hover:bg-surface-container text-on-surface transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-caption text-caption font-semibold text-on-surface block">
                  Resulting Stock
                </label>
                <div className="h-9 px-3 rounded-lg bg-surface-container border border-outline-variant/40 flex items-center justify-between">
                  <span className="font-caption text-caption text-on-surface-variant">
                    New On-Hand:
                  </span>
                  <span
                    className={`font-body-mono-num text-body-medium font-bold ${
                      resultingStock <= 0
                        ? 'text-error'
                        : resultingStock < 10
                        ? 'text-tertiary'
                        : 'text-primary'
                    }`}
                  >
                    {resultingStock} units
                  </span>
                </div>
              </div>
            </div>

            {/* Reason Code */}
            <div className="space-y-1">
              <label className="font-caption text-caption font-semibold text-on-surface block">
                Reason Code <span className="text-error">*</span>
              </label>
              <select
                value={reasonCode}
                onChange={(e) => setReasonCode(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface focus:border-primary focus:outline-none cursor-pointer"
              >
                <option value="Damaged Goods in Transit / Shelf Drop">
                  Damaged Goods in Transit / Shelf Drop
                </option>
                <option value="Expired / Stale / Quality Degradation">
                  Expired / Stale / Quality Degradation
                </option>
                <option value="Inventory Cycle Count Discrepancy">
                  Inventory Cycle Count Discrepancy
                </option>
                <option value="Supplier Direct Return (RTV)">
                  Supplier Direct Return (RTV)
                </option>
                <option value="Store Barista Sampling / Demonstration">
                  Store Barista Sampling / Demonstration
                </option>
                <option value="Found Unbilled Stock">
                  Found Unbilled Stock
                </option>
              </select>
            </div>

            {/* Storage Location & Bin */}
            <div className="space-y-1">
              <label className="font-caption text-caption font-semibold text-on-surface block">
                Active Outlet &amp; Storage Location
              </label>
              <select
                value={storageLocation}
                onChange={(e) => setStorageLocation(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface focus:border-primary focus:outline-none cursor-pointer"
              >
                <option value={activeOutletName}>{activeOutletName}</option>
                {item.binRack && <option value={`${activeOutletName} - ${item.binRack}`}>{activeOutletName} - {item.binRack}</option>}
              </select>
            </div>

            {/* Audit Note / Authorization */}
            <div className="space-y-1">
              <label className="font-caption text-caption font-semibold text-on-surface block">
                Audit Note / Authorization
              </label>
              <input
                type="text"
                value={auditNote}
                onChange={(e) => setAuditNote(e.target.value)}
                placeholder="e.g., Authorized by Manager - damaged seal on 1 unit"
                className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-space-lg py-space-sm border-t border-outline-variant/20 bg-surface-container-low flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              <span className="font-micro-label text-micro-label">Logged under {activeUserName}</span>
            </div>

            <div className="flex items-center gap-2">
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
                <span>Confirm Adjustment</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
