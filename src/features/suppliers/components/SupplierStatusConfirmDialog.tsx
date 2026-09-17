import React from 'react';
import { Supplier } from '../types';
import { formatSupplierCode } from '../utils/formatSupplierCode';

interface SupplierStatusConfirmDialogProps {
  supplier: Supplier | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export function SupplierStatusConfirmDialog({
  supplier,
  isOpen,
  onClose,
  onConfirm,
}: SupplierStatusConfirmDialogProps) {
  if (!isOpen || !supplier) return null;

  const isDeactivating = supplier.status === 'Active';

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-space-base">
      <div
        className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-xl w-full max-w-md p-space-2xl space-y-space-base animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              isDeactivating
                ? 'bg-error-container/40 text-error'
                : 'bg-primary-fixed text-on-primary-fixed'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">
              {isDeactivating ? 'local_shipping' : 'check_circle'}
            </span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              {isDeactivating ? 'Deactivate Supplier' : 'Activate Supplier'}
            </h3>
            <span className="font-body-mono-num text-caption text-on-surface-variant font-semibold">
              {formatSupplierCode(supplier.supplierCode)} · {supplier.name}
            </span>
          </div>
        </div>

        <p className="font-body-default text-body-default text-on-surface-variant">
          {isDeactivating
            ? `Are you sure you want to deactivate ${supplier.name}? The supplier will remain in the directory for historical purchase records.`
            : `Are you sure you want to activate ${supplier.name}? This supplier will be available for purchasing and inventory operations.`}
        </p>

        <div className="flex items-center justify-end gap-space-sm pt-2">
          <button
            type="button"
            onClick={onClose}
            className="h-9 px-space-base bg-surface-container hover:bg-surface-container-high text-on-surface rounded font-body-medium text-body-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={async () => {
              await onConfirm();
              onClose();
            }}
            className={`h-9 px-space-base rounded font-body-medium text-body-medium transition-colors ${
              isDeactivating
                ? 'bg-error hover:bg-error/90 text-on-error'
                : 'bg-primary hover:bg-primary-container text-on-primary'
            }`}
          >
            {isDeactivating ? 'Deactivate Supplier' : 'Activate Supplier'}
          </button>
        </div>
      </div>
    </div>
  );
}
