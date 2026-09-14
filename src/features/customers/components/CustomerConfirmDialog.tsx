import React from 'react';
import { Customer } from '../types';
import { formatCustomerCode } from '../utils/formatCustomerCode';

interface CustomerConfirmDialogProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  actionType: 'activate' | 'deactivate';
}

export function CustomerConfirmDialog({
  customer,
  isOpen,
  onClose,
  onConfirm,
  actionType,
}: CustomerConfirmDialogProps) {
  if (!isOpen || !customer) return null;

  const isDeactivate = actionType === 'deactivate';

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-space-base">
      <div
        className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-xl w-full max-w-md p-space-2xl space-y-space-base animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              isDeactivate
                ? 'bg-error-container/40 text-error'
                : 'bg-primary-fixed text-on-primary-fixed'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">
              {isDeactivate ? 'person_off' : 'person_check'}
            </span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              {isDeactivate ? 'Deactivate Customer Profile' : 'Activate Customer Profile'}
            </h3>
            <span className="font-body-mono-num text-caption text-on-surface-variant font-semibold">
              {formatCustomerCode(customer.customerCode)} · {customer.name}
            </span>
          </div>
        </div>

        <p className="font-body-default text-body-default text-on-surface-variant">
          {isDeactivate
            ? `Are you sure you want to deactivate ${customer.name}? This customer will be flagged as Inactive and hidden from active billing lookups, but historical sales transactions and relationship records will remain intact.`
            : `Are you sure you want to reactivate ${customer.name}? This customer profile will become active and selectable across POS and directory searches.`}
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
              isDeactivate
                ? 'bg-error hover:bg-error/90 text-on-error'
                : 'bg-primary hover:bg-primary-container text-on-primary'
            }`}
          >
            {isDeactivate ? 'Deactivate Customer' : 'Activate Customer'}
          </button>
        </div>
      </div>
    </div>
  );
}
