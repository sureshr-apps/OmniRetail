import React, { useEffect } from 'react';
import { SalesTransaction } from '../types';
import { formatCurrency as formatInrCurrency } from '@/shared/utils/currency';

interface TransactionDetailDrawerProps {
  transaction: SalesTransaction | null;
  onClose: () => void;
  onReprintSlip: (tx: SalesTransaction) => void;
  onIssueReturn: (tx: SalesTransaction) => void;
}

export function TransactionDetailDrawer({
  transaction,
  onClose,
  onReprintSlip,
  onIssueReturn,
}: TransactionDetailDrawerProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!transaction) return null;

  const { customer, items, tender, staff } = transaction;
  const isRefunded = transaction.status === 'REFUNDED';
  const isVoided = transaction.status === 'VOIDED';

  const formatCurrency = (val: number) => {
    const formatted = formatInrCurrency(Math.abs(val));
    return val < 0 ? `-${formatted}` : formatted;
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const totalUnits = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-[2px] z-50 transition-opacity duration-200 animate-in fade-in"
        onClick={onClose}
      />

      {/* Slide-over drawer */}
      <div className="fixed top-0 right-0 h-screen w-full max-w-md sm:max-w-lg bg-surface-container-lowest z-50 shadow-2xl flex flex-col transition-transform duration-200 ease-out animate-in slide-in-from-right">
        {/* Drawer Header */}
        <div className="h-14 px-space-base bg-surface-container-low flex items-center justify-between shrink-0 border-b border-outline-variant/30">
          <div className="flex items-center gap-space-xs">
            <div className="w-8 h-8 rounded bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0">
              <span className="material-symbols-outlined text-[18px]">receipt</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Transaction Breakdown
                </span>
                <span
                  className={`font-micro-label text-micro-label px-1.5 py-0.5 rounded font-bold ${
                    isRefunded
                      ? 'bg-red-100 text-red-800'
                      : isVoided
                      ? 'bg-surface-container text-on-surface-variant'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {isRefunded ? 'REFUNDED' : isVoided ? 'VOIDED' : 'SETTLED'}
                </span>
              </div>
              <span className="font-body-mono-num text-caption text-on-surface-variant">
                AUDIT REF: #{transaction.id}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer"
            title="Close Drawer (Esc)"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Drawer Body Scrollable */}
        <div className="flex-1 overflow-y-auto p-space-lg space-y-space-lg font-body-default text-body-default">
          {/* Card 1: Terminal Station & Register */}
          <div className="bg-surface-container-low p-space-base rounded flex flex-col gap-space-xs">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="font-caption text-caption uppercase text-on-surface-variant font-bold tracking-wider">
                  Terminal Station &amp; Register
                </span>
                <span className="font-body-medium text-body-medium text-on-surface font-semibold">
                  {transaction.terminalName}
                </span>
                <span className="font-caption text-caption text-on-surface-variant font-mono">
                  Terminal ID: {transaction.terminalId}
                </span>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="font-caption text-caption uppercase text-on-surface-variant font-bold tracking-wider">
                  Operator
                </span>
                <span className="font-body-medium text-body-medium text-on-surface font-semibold">
                  {staff.name}
                </span>
                <span className="font-micro-label text-micro-label text-primary font-bold">
                  {staff.shiftId || 'SHIFT #104'}
                </span>
              </div>
            </div>
            <div className="pt-space-xs flex justify-between text-caption text-on-surface-variant border-t border-outline-variant/20 mt-1">
              <span>
                Timestamp: {transaction.displayDate} · {transaction.displayTime}
              </span>
              <span className="font-mono">Slip #{transaction.receiptNumber}</span>
            </div>
          </div>

          {/* Card 2: Customer Profile */}
          <div className="bg-surface-container-low p-space-base rounded flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-caption shrink-0">
                {getInitials(customer.name)}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-body-medium text-body-medium text-on-surface font-bold">
                    {customer.name}
                  </span>
                  {customer.vipTier && (
                    <span className="font-micro-label text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-900 font-bold">
                      {customer.vipTier}
                    </span>
                  )}
                </div>
                {customer.email && (
                  <span className="font-caption text-caption text-on-surface-variant">
                    {customer.email}
                  </span>
                )}
                {customer.phone && (
                  <span className="font-caption text-caption font-mono text-on-surface-variant">
                    {customer.phone}
                  </span>
                )}
              </div>
            </div>

            {customer.rewardDelta !== undefined && (
              <div className="text-right flex flex-col items-end">
                <span className="font-micro-label text-micro-label uppercase text-primary font-bold">
                  Reward Delta
                </span>
                <span className="font-headline-sm text-headline-sm font-bold text-primary font-body-mono-num">
                  {customer.rewardDelta >= 0
                    ? `+${customer.rewardDelta} pts`
                    : `${customer.rewardDelta} pts`}
                </span>
                {customer.rewardBalance && (
                  <span className="font-caption text-caption text-on-surface-variant">
                    Balance: {customer.rewardBalance.toLocaleString()}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Card 3: Purchased SKUs */}
          <div>
            <div className="flex items-center justify-between pb-space-xs mb-space-xs text-on-surface-variant font-micro-label text-micro-label uppercase tracking-wider font-bold">
              <span>
                Purchased SKUs ({totalUnits} {totalUnits === 1 ? 'Unit' : 'Units'})
              </span>
              <span>Subtotal</span>
            </div>
            <div className="space-y-space-xs">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-space-sm rounded bg-surface-container-low flex items-center justify-between"
                >
                  <div className="flex flex-col max-w-[260px]">
                    <span className="font-body-medium text-body-medium text-on-surface font-semibold truncate">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-2 text-caption text-on-surface-variant">
                      <span className="font-mono text-micro-label">SKU: {item.sku}</span>
                      <span>•</span>
                      <span>
                        Qty: {item.quantity} @ ₹{item.unitPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <span className="font-body-mono-num font-bold text-body-default text-on-surface">
                    ₹{item.subtotal.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Financial Breakdown */}
          <div className="bg-surface-container-low p-space-base rounded space-y-space-xs font-caption text-caption">
            <div className="flex justify-between text-on-surface-variant">
              <span>Gross Line Items Subtotal</span>
              <span className="font-body-mono-num font-semibold text-on-surface">
                {formatCurrency(transaction.subtotal)}
              </span>
            </div>

            {transaction.discount > 0 && (
              <div className="flex justify-between text-primary">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">local_offer</span>
                  <span>{transaction.discountLabel} (Applied)</span>
                </div>
                <span className="font-body-mono-num font-semibold">
                  -₹{transaction.discount.toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex justify-between text-on-surface-variant">
              <span>Sales Tax</span>
              <span className="font-body-mono-num font-semibold text-on-surface">
                {transaction.taxLabel}
              </span>
            </div>

            <div className="pt-space-xs flex justify-between items-center text-on-surface border-t border-outline-variant/30 mt-1">
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm font-bold">
                  {isRefunded ? 'Total Refunded' : 'Total Tendered'}
                </span>
                <span className="font-caption text-caption text-on-surface-variant">
                  {isVoided
                    ? 'Session aborted'
                    : isRefunded
                    ? 'Reversed to original method'
                    : 'Processed instantly'}
                </span>
              </div>
              <span
                className={`font-display-currency text-display-currency font-bold font-body-mono-num ${
                  isRefunded ? 'text-error' : isVoided ? 'text-on-surface-variant' : 'text-primary'
                }`}
              >
                {formatCurrency(transaction.totalNet)}
              </span>
            </div>
          </div>

          {/* Card 5: Payment Settlement Gateway */}
          <div className="p-space-base rounded bg-surface-container-low space-y-space-xs">
            <span className="font-micro-label text-micro-label uppercase text-on-surface-variant font-bold tracking-wider">
              Payment Settlement Gateway
            </span>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[20px]">
                  {tender.type === 'cash'
                    ? 'payments'
                    : tender.type === 'apple_pay'
                    ? 'payment'
                    : 'credit_card'}
                </span>
                <div className="flex flex-col">
                  <span className="font-body-medium text-body-medium font-bold text-on-surface">
                    {tender.cardBrand || tender.label}
                  </span>
                  <span className="font-mono text-caption text-on-surface-variant">
                    {tender.cardLast4 ? `Card: ····${tender.cardLast4} · ` : ''}Auth Code:{' '}
                    {tender.authCode || '894109'}
                  </span>
                </div>
              </div>
              <span className="font-micro-label text-micro-label px-2 py-0.5 rounded bg-surface-container font-bold text-on-surface">
                {tender.type === 'cash' ? 'DRAWER VERIFIED' : 'CHIP EMV'}
              </span>
            </div>
            <div className="pt-space-2xs text-micro-label text-on-surface-variant font-mono">
              STAN: {tender.stan || '0092819'} · Trace ID:{' '}
              {tender.traceId || '20241028-DF04-8821-POS1'}
            </div>
          </div>

          {/* Card 6: Cashier Shift Note */}
          <div className="p-space-base rounded bg-surface-container-low space-y-space-2xs">
            <div className="flex items-center justify-between">
              <span className="font-micro-label text-micro-label uppercase text-on-surface-variant font-bold tracking-wider">
                Cashier Shift Note
              </span>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                edit_note
              </span>
            </div>
            <p className="font-caption text-caption text-on-surface italic">
              &ldquo;
              {transaction.shiftNote ||
                'Customer transaction verified against store register ledger audit rules.'}
              &rdquo;
            </p>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-space-base bg-surface-container-low shrink-0 flex items-center gap-space-sm border-t border-outline-variant/30">
          <button
            type="button"
            onClick={() => onReprintSlip(transaction)}
            className="flex-1 h-10 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-body-medium text-body-medium font-semibold flex items-center justify-center gap-space-xs transition-colors shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Reprint Slip</span>
          </button>

          <button
            type="button"
            onClick={() => onIssueReturn(transaction)}
            className="flex-1 h-10 rounded bg-error-container hover:bg-red-200 text-on-error-container font-body-medium text-body-medium font-bold flex items-center justify-center gap-space-xs transition-colors shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">assignment_return</span>
            <span>Issue Return</span>
          </button>
        </div>
      </div>
    </>
  );
}
