import React, { useState } from 'react';
import { Expense } from '../types';
import { formatCurrency } from '../utils/calculations';

interface VoidConfirmDialogProps {
  expense: Expense | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmVoid: (id: string, reason: string) => void;
}

export function VoidConfirmDialog({
  expense,
  isOpen,
  onClose,
  onConfirmVoid,
}: VoidConfirmDialogProps) {
  const [reason, setReason] = useState('Duplicate entry recorded by error');

  if (!isOpen || !expense) return null;

  const handleConfirm = () => {
    onConfirmVoid(expense.id, reason);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-inverse-surface/50 backdrop-blur-xs z-60 flex items-center justify-center p-space-base animate-in fade-in duration-100"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-2xl border border-outline-variant/30 p-space-xl flex flex-col gap-space-base"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-space-base">
          <div className="w-10 h-10 rounded-full bg-error-container/40 text-error flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">warning</span>
          </div>
          <div className="flex flex-col">
            <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
              Void Expense Record?
            </h3>
            <p className="font-caption text-caption text-on-surface-variant mt-1">
              Are you sure you want to void{' '}
              <strong className="text-on-surface font-body-mono-num">{expense.expenseNumber}</strong>{' '}
              ({formatCurrency(expense.amount)})?
            </p>
          </div>
        </div>

        <div className="p-space-sm rounded-lg bg-surface-container-low border border-outline-variant/30 text-caption text-on-surface-variant flex flex-col gap-1">
          <div className="flex justify-between">
            <span>Description:</span>
            <span className="font-medium text-on-surface truncate max-w-[200px]">
              {expense.description}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Outlet:</span>
            <span className="font-medium text-on-surface">{expense.outletName}</span>
          </div>
          <div className="flex justify-between">
            <span>Payee:</span>
            <span className="font-medium text-on-surface">{expense.vendorName || 'N/A'}</span>
          </div>
        </div>

        <div>
          <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
            Reason for Voiding *
          </label>
          <input
            type="text"
            required
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full h-9 px-space-sm bg-surface-container-lowest text-on-surface rounded-lg border border-outline-variant/40 outline-none focus:ring-1 focus:ring-error shadow-xs font-body-default text-body-default"
          />
        </div>

        <p className="font-caption text-caption text-outline">
          * Voiding will deactivate this expense from active financial totals and ledger balances,
          preserving it in audit history with a VOIDED stamp.
        </p>

        <div className="flex items-center justify-end gap-space-sm pt-space-xs border-t border-outline-variant/20">
          <button
            type="button"
            onClick={onClose}
            className="h-9 px-space-base rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-body-medium text-body-medium transition-colors border border-outline-variant/30 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="h-9 px-space-base rounded-lg bg-error hover:bg-error/90 text-on-error font-headline-sm text-headline-sm flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">cancel</span>
            <span>Confirm Void</span>
          </button>
        </div>
      </div>
    </div>
  );
}
