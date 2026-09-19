import React, { useEffect, useMemo, useState } from 'react';
import { Modal } from '@/shared/components/Modal';
import { formatCurrency } from '@/shared/utils/currency';
import type { SaleReturnLineInput, SalesTransaction } from '../types';

interface SaleReturnModalProps {
  transaction: SalesTransaction | null;
  isSubmitting: boolean;
  error: string | null;
  onClose: () => void;
  onSubmit: (lines: SaleReturnLineInput[], reason: string) => Promise<void>;
}

export function SaleReturnModal({ transaction, isSubmitting, error, onClose, onSubmit }: SaleReturnModalProps) {
  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const [reason, setReason] = useState('Customer return');

  useEffect(() => {
    if (!transaction) return;
    setQuantities(Object.fromEntries(transaction.items.map((item) => [item.id, '0'])));
    setReason('Customer return');
  }, [transaction]);

  const selectedLines = useMemo(() => transaction?.items.flatMap((item) => {
    const quantity = Number(quantities[item.id] ?? 0);
    return Number.isFinite(quantity) && quantity > 0 ? [{ saleLineId: item.id, quantity }] : [];
  }) ?? [], [quantities, transaction]);

  const estimatedRefund = useMemo(() => {
    if (!transaction || !selectedLines.length || transaction.subtotal <= 0) return 0;
    const selectedSubtotal = selectedLines.reduce((sum, line) => {
      const item = transaction.items.find((candidate) => candidate.id === line.saleLineId);
      return sum + line.quantity * (item?.unitPrice ?? 0);
    }, 0);
    const selectedAllRemaining = transaction.items.every((item) => {
      const selected = selectedLines.find((line) => line.saleLineId === item.id)?.quantity ?? 0;
      return selected >= (item.returnableQuantity ?? item.quantity);
    });
    return selectedAllRemaining && !(transaction.items.some((item) => (item.returnedQuantity ?? 0) > 0))
      ? transaction.totalNet
      : Math.round(transaction.totalNet * Math.min(1, selectedSubtotal / transaction.subtotal) * 100) / 100;
  }, [selectedLines, transaction]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!transaction || !selectedLines.length || !reason.trim()) return;
    await onSubmit(selectedLines, reason.trim());
  }

  return (
    <Modal isOpen={Boolean(transaction)} onClose={() => !isSubmitting && onClose()} title="Issue return" description={transaction ? `Select quantities to return from ${transaction.receiptNumber}. Refunds use the original tender method.` : undefined} maxWidth="xl">
      {transaction && <form onSubmit={submit} className="space-y-5">
        {error && <div role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{error}</div>}
        <div className="overflow-x-auto rounded-md border border-border-subdued">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-surface-subdued text-xs uppercase tracking-wide text-text-muted"><tr><th className="px-4 py-3">Item</th><th className="px-4 py-3">Sold</th><th className="px-4 py-3">Already returned</th><th className="px-4 py-3">Return quantity</th><th className="px-4 py-3 text-right">Refund</th></tr></thead>
            <tbody className="divide-y divide-border-subdued">{transaction.items.map((item) => {
              const returnableQuantity = item.returnableQuantity ?? item.quantity;
              const quantity = Number(quantities[item.id] ?? 0);
              return <tr key={item.id}>
                <td className="px-4 py-3"><div className="font-semibold text-text-primary">{item.name}</div><div className="text-xs text-text-secondary">{item.sku || 'Custom item'}</div></td>
                <td className="px-4 py-3 text-text-secondary">{item.quantity}</td>
                <td className="px-4 py-3 text-text-secondary">{item.returnedQuantity ?? 0}</td>
                <td className="px-4 py-3"><input aria-label={`Return quantity for ${item.name}`} type="number" min="0" max={returnableQuantity} step="1" value={quantities[item.id] ?? '0'} onChange={(event) => setQuantities((current) => ({ ...current, [item.id]: event.target.value }))} disabled={returnableQuantity <= 0 || isSubmitting} className="h-9 w-28 rounded-md border border-border-subdued px-2 text-sm text-text-primary disabled:bg-surface-subdued" /><div className="mt-1 text-xs text-text-muted">{returnableQuantity} available</div></td>
                <td className="px-4 py-3 text-right font-semibold text-text-primary">{formatCurrency(Math.max(0, quantity) * item.unitPrice)}</td>
              </tr>;
            })}</tbody>
          </table>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-text-secondary">Reason<input required value={reason} onChange={(event) => setReason(event.target.value)} disabled={isSubmitting} className="mt-1 h-10 w-full rounded-md border border-border-subdued px-3 text-sm text-text-primary" /></label>
          <div className="rounded-md bg-surface-subdued px-4 py-3 text-sm text-text-secondary"><div>Original tender: <strong className="text-text-primary">{transaction.tender.label}</strong></div><div className="mt-1">Estimated refund: <strong className="text-text-primary">{formatCurrency(estimatedRefund)}</strong></div><div className="mt-1 text-xs">Cash refunds reduce today&apos;s expected drawer balance.</div></div>
        </div>
        <div className="flex justify-end gap-2 border-t border-border-subdued pt-4"><button type="button" onClick={onClose} disabled={isSubmitting} className="rounded-md border border-border-subdued px-4 py-2 text-sm font-semibold text-text-secondary disabled:opacity-50">Cancel</button><button type="submit" disabled={isSubmitting || !selectedLines.length || !reason.trim()} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">{isSubmitting ? 'Processing…' : 'Confirm return'}</button></div>
      </form>}
    </Modal>
  );
}
