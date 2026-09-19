import React, { useEffect, useState } from 'react';
import { Purchase, PurchasePaymentMethod, PurchaseReceiptBatch, PurchaseReceiptLine, PurchaseRefund, PurchaseRefundMethod, PurchaseRefundSummary, RecordPurchasePaymentInput, RecordPurchaseRefundInput } from '../types';
import { calculateOutstandingAmount, formatCurrency } from '../utils/calculations';
import { validatePurchaseReceiptLines } from '../utils/receiving';
import { formatPurchaseDateForDisplay, getTodayPurchaseDate, parsePurchaseDate } from '../utils/date';

type ReceiptBatchRow = PurchaseReceiptBatch & { rowId: string };

function createReceiptBatchRow(itemId: string, quantity: number, suffix: string): ReceiptBatchRow {
  return { rowId: `${itemId}-batch-${suffix}`, quantity, batchNumber: '', mfgDate: '', expiryDate: '' };
}

interface PurchaseDetailDrawerProps {
  purchase: Purchase | null;
  onClose: () => void;
  onCancelPurchase: (id: string) => void;
  onClosePartialPurchase: (id: string) => Promise<void>;
  onReceiveStock: (purchaseId: string, receipts: PurchaseReceiptLine[]) => void;
  onRecordPayment: (purchaseId: string, payment: RecordPurchasePaymentInput) => Promise<void>;
  onLoadRefunds: (purchaseId: string) => Promise<{ refunds: PurchaseRefund[]; summary: PurchaseRefundSummary }>;
  onRecordRefund: (purchaseId: string, refund: RecordPurchaseRefundInput) => Promise<{ refund: PurchaseRefund; summary: PurchaseRefundSummary }>;
}

export function PurchaseDetailDrawer({
  purchase,
  onClose,
  onCancelPurchase,
  onClosePartialPurchase,
  onReceiveStock,
  onRecordPayment,
  onLoadRefunds,
  onRecordRefund,
}: PurchaseDetailDrawerProps) {
  const [receiptBatches, setReceiptBatches] = useState<Record<string, ReceiptBatchRow[]>>({});
  const [receiveError, setReceiveError] = useState<string | null>(null);
  const [isPaymentFormOpen, setIsPaymentFormOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PurchasePaymentMethod>('UPI');
  const [paymentReference, setPaymentReference] = useState('');
  const [paymentNotes, setPaymentNotes] = useState('');
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isPaymentSaving, setIsPaymentSaving] = useState(false);
  const [refunds, setRefunds] = useState<PurchaseRefund[]>([]);
  const [refundSummary, setRefundSummary] = useState<PurchaseRefundSummary>({ amountPaid: 0, totalRefunded: 0, refundDue: 0 });
  const [isRefundLoading, setIsRefundLoading] = useState(false);
  const [refundLoadError, setRefundLoadError] = useState<string | null>(null);
  const [isRefundFormOpen, setIsRefundFormOpen] = useState(false);
  const [refundAmount, setRefundAmount] = useState('');
  const [refundDate, setRefundDate] = useState('');
  const [refundMethod, setRefundMethod] = useState<PurchaseRefundMethod>('UPI');
  const [refundReference, setRefundReference] = useState('');
  const [refundNotes, setRefundNotes] = useState('');
  const [refundError, setRefundError] = useState<string | null>(null);
  const [isRefundSaving, setIsRefundSaving] = useState(false);
  const receiptProgressKey = purchase?.items.map((item) => `${item.id}:${item.quantityReceived}`).join('|') ?? '';

  useEffect(() => {
    setReceiptBatches({});
    setReceiveError(null);
  }, [purchase?.id, receiptProgressKey]);

  useEffect(() => {
    const balance = purchase && purchase.status !== 'cancelled'
      ? calculateOutstandingAmount(purchase.totalAmount, purchase.amountPaid)
      : 0;
    setIsPaymentFormOpen(false);
    setPaymentAmount(balance > 0 ? balance.toFixed(2) : '');
    setPaymentDate(formatPurchaseDateForDisplay(getTodayPurchaseDate()));
    setPaymentMethod('UPI');
    setPaymentReference('');
    setPaymentNotes('');
    setPaymentError(null);
    setIsPaymentSaving(false);
  }, [purchase?.id, purchase?.amountPaid, purchase?.status, purchase?.totalAmount]);

  useEffect(() => {
    let active = true;
    setRefunds([]);
    setRefundLoadError(null);
    setIsRefundFormOpen(false);
    setRefundError(null);
    setRefundDate(formatPurchaseDateForDisplay(getTodayPurchaseDate()));
    setRefundMethod('UPI');
    setRefundReference('');
    setRefundNotes('');
    setIsRefundSaving(false);

    const refundEligible = Boolean(purchase && (purchase.status === 'cancelled' || purchase.status === 'closed' || purchase.receiptStatus === 'RECEIVED'));
    const refundableBase = purchase?.status === 'cancelled'
      ? purchase.amountPaid
      : Math.max(0, (purchase?.amountPaid ?? 0) - (purchase?.totalAmount ?? 0));
    const canLoadRefunds = Boolean(refundEligible && purchase && purchase.amountPaid > 0 && (purchase.status === 'cancelled' || purchase.amountPaid > purchase.totalAmount));
    if (!canLoadRefunds) {
      setRefundSummary({ amountPaid: purchase?.amountPaid ?? 0, totalRefunded: 0, refundDue: 0 });
      setRefundAmount('');
      return () => { active = false; };
    }

    setIsRefundLoading(true);
    onLoadRefunds(purchase.id)
      .then((result) => {
        if (!active) return;
        setRefunds(result.refunds);
        setRefundSummary(result.summary);
        setRefundAmount(result.summary.refundDue > 0 ? result.summary.refundDue.toFixed(2) : '');
      })
      .catch((error) => {
        if (!active) return;
        setRefundLoadError(error instanceof Error ? error.message : 'Unable to load supplier refund history.');
        setRefundSummary({ amountPaid: purchase.amountPaid, totalRefunded: 0, refundDue: refundableBase });
        setRefundAmount(refundableBase > 0 ? refundableBase.toFixed(2) : '');
      })
      .finally(() => {
        if (active) setIsRefundLoading(false);
      });

    return () => { active = false; };
  }, [onLoadRefunds, purchase?.id, purchase?.amountPaid, purchase?.status, purchase?.totalAmount]);

  if (!purchase) return null;

  const totalOrdered = purchase.items.reduce((acc, it) => acc + it.quantityOrdered, 0);
  const totalReceived = purchase.items.reduce((acc, it) => acc + it.quantityReceived, 0);
  const totalPending = Math.max(0, totalOrdered - totalReceived);
  const isCancelled = purchase.status === 'cancelled';
  const isClosed = purchase.status === 'closed';
  const isFullyReceived = totalPending === 0;
  const canShowRefund = (isCancelled || isClosed || purchase.receiptStatus === 'RECEIVED')
    && purchase.amountPaid > 0
    && (isCancelled || purchase.amountPaid > purchase.totalAmount);
  const balanceDue = isCancelled ? 0 : calculateOutstandingAmount(purchase.totalAmount, purchase.amountPaid);

  const pendingItems = purchase.items.filter((item) => item.quantityOrdered - item.quantityReceived > 0);

  const handleRecordPayment = async () => {
    const amount = Number(paymentAmount);
    const parsedPaymentDate = parsePurchaseDate(paymentDate);
    if (!Number.isFinite(amount) || amount <= 0) {
      setPaymentError('Enter a payment amount greater than zero.');
      return;
    }
    if (amount > balanceDue + 0.000001) {
      setPaymentError(`Payment cannot exceed the balance due of ${formatCurrency(balanceDue)}.`);
      return;
    }
    if (!parsedPaymentDate) {
      setPaymentError('Payment date must use DD/MM/YYYY format.');
      return;
    }
    if (!paymentMethod) {
      setPaymentError('Select a payment method.');
      return;
    }

    setPaymentError(null);
    setIsPaymentSaving(true);
    try {
      await onRecordPayment(purchase.id, {
        amount,
        paymentDate: parsedPaymentDate,
        paymentMethod,
        reference: paymentReference.trim() || undefined,
        notes: paymentNotes.trim() || undefined,
      });
      setIsPaymentFormOpen(false);
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : 'Unable to record the payment.');
    } finally {
      setIsPaymentSaving(false);
    }
  };

  const handleRecordRefund = async () => {
    const amount = Number(refundAmount);
    const parsedRefundDate = parsePurchaseDate(refundDate);
    if (!Number.isFinite(amount) || amount <= 0) {
      setRefundError('Enter a refund amount greater than zero.');
      return;
    }
    if (amount > refundSummary.refundDue + 0.000001) {
      setRefundError(`Refund cannot exceed the remaining refund due of ${formatCurrency(refundSummary.refundDue)}.`);
      return;
    }
    if (!parsedRefundDate) {
      setRefundError('Refund date must use DD/MM/YYYY format.');
      return;
    }
    if (!refundMethod) {
      setRefundError('Select a refund method.');
      return;
    }

    setRefundError(null);
    setIsRefundSaving(true);
    try {
      const result = await onRecordRefund(purchase.id, {
        amount,
        refundDate: parsedRefundDate,
        refundMethod,
        reference: refundReference.trim() || undefined,
        notes: refundNotes.trim() || undefined,
      });
      setRefunds((current) => [result.refund, ...current.filter((refund) => refund.id !== result.refund.id)]);
      setRefundSummary(result.summary);
      setRefundAmount(result.summary.refundDue > 0 ? result.summary.refundDue.toFixed(2) : '');
      setIsRefundFormOpen(false);
      setRefundReference('');
      setRefundNotes('');
    } catch (error) {
      setRefundError(error instanceof Error ? error.message : 'Unable to record the supplier refund.');
    } finally {
      setIsRefundSaving(false);
    }
  };

  const getReceiptRows = (item: Purchase['items'][number]): ReceiptBatchRow[] => {
    const pending = item.quantityOrdered - item.quantityReceived;
    return receiptBatches[item.id] ?? [createReceiptBatchRow(item.id, pending, '1')];
  };

  const updateReceiptBatch = (
    item: Purchase['items'][number],
    rowId: string,
    field: 'batchNumber' | 'mfgDate' | 'expiryDate',
    value: string,
  ) => {
    const rows = getReceiptRows(item);
    setReceiptBatches((prev) => ({
      ...prev,
      [item.id]: rows.map((row) => (row.rowId === rowId ? { ...row, [field]: value } : row)),
    }));
    setReceiveError(null);
  };

  const updateReceiptQuantity = (item: Purchase['items'][number], rowId: string, value: string) => {
    const rows = getReceiptRows(item);
    const pending = item.quantityOrdered - item.quantityReceived;
    const otherQuantity = rows.filter((row) => row.rowId !== rowId).reduce((sum, row) => sum + row.quantity, 0);
    const maxQuantity = Math.max(0, pending - otherQuantity);
    const parsed = Number(value);
    const quantity = Number.isFinite(parsed) ? Math.min(maxQuantity, Math.max(0, parsed)) : 0;
    setReceiptBatches((prev) => ({
      ...prev,
      [item.id]: rows.map((row) => (row.rowId === rowId ? { ...row, quantity } : row)),
    }));
    setReceiveError(null);
  };

  const addReceiptBatch = (item: Purchase['items'][number]) => {
    const rows = getReceiptRows(item);
    const pending = item.quantityOrdered - item.quantityReceived;
    const allocated = rows.reduce((sum, row) => sum + row.quantity, 0);
    const suffix = `${Date.now()}-${rows.length + 1}`;
    setReceiptBatches((prev) => ({
      ...prev,
      [item.id]: [...rows, createReceiptBatchRow(item.id, Math.max(0, pending - allocated), suffix)],
    }));
    setReceiveError(null);
  };

  const removeReceiptBatch = (item: Purchase['items'][number], rowId: string) => {
    const rows = getReceiptRows(item);
    if (rows.length <= 1) return;
    setReceiptBatches((prev) => ({ ...prev, [item.id]: rows.filter((row) => row.rowId !== rowId) }));
    setReceiveError(null);
  };

  const handleConfirmInward = () => {
    const receipts: PurchaseReceiptLine[] = [];
    let dateError: string | null = null;

    for (const item of pendingItems) {
      const rows = getReceiptRows(item);
      const batches = rows.filter((row) => row.quantity > 0).map(({ rowId: _rowId, ...batch }) => {
        const mfgDate = batch.mfgDate.trim() ? parsePurchaseDate(batch.mfgDate) : '';
        const expiryDate = batch.expiryDate.trim() ? parsePurchaseDate(batch.expiryDate) : '';
        if (batch.mfgDate.trim() && !mfgDate) {
          dateError = `${item.productName}: Manufacturing date must use DD/MM/YYYY format.`;
        } else if (batch.expiryDate.trim() && !expiryDate) {
          dateError = `${item.productName}: Expiry date must use DD/MM/YYYY format.`;
        }
        return { ...batch, mfgDate: mfgDate ?? '', expiryDate: expiryDate ?? '' };
      });
      if (batches.length > 0) receipts.push({ lineId: item.id, batches });
    }

    if (dateError) {
      setReceiveError(dateError);
      return;
    }

    const validationError = validatePurchaseReceiptLines(purchase.items, receipts);
    if (validationError) {
      setReceiveError(validationError);
      return;
    }

    setReceiveError(null);
    onReceiveStock(purchase.id, receipts);
  };

  const plannedReceiptUnits = pendingItems.reduce(
    (sum, item) => sum + getReceiptRows(item).reduce((itemSum, row) => itemSum + row.quantity, 0),
    0,
  );
  const plannedBatchCount = pendingItems.reduce(
    (count, item) => count + getReceiptRows(item).filter((row) => row.quantity > 0).length,
    0,
  );

  return (
    <div
      aria-labelledby="slide-over-title"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden select-none"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-surface-container-lowest shadow-2xl flex flex-col justify-between border-l border-outline-variant/40">
          {/* Drawer Header */}
          <div className="p-5 border-b border-outline-variant/30 flex items-start justify-between bg-surface-container-low/40">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-headline-sm font-bold text-on-surface" id="slide-over-title">
                  {purchase.purchaseNumber} Details
                </h2>

                {/* Receipt Status Badge */}
                {purchase.receiptStatus === 'RECEIVED' ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <span className="size-1.5 rounded-full bg-emerald-600"></span>
                    Received
                  </span>
                ) : purchase.receiptStatus === 'PARTIALLY_RECEIVED' ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-teal-100 text-teal-800 border border-teal-300">
                    <span className="size-1.5 rounded-full bg-teal-600"></span>
                    Partially Received
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-300">
                    <span className="size-1.5 rounded-full bg-slate-500"></span>
                    Pending Receipt
                  </span>
                )}

                {/* Payment Status Badge */}
                {isCancelled ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-500 border border-slate-300">
                    <span className="size-1.5 rounded-full bg-slate-400"></span>
                    Cancelled
                  </span>
                ) : purchase.paymentStatus === 'PAID' ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <span className="size-1.5 rounded-full bg-emerald-600"></span>
                    Paid
                  </span>
                ) : purchase.paymentStatus === 'PARTIALLY_PAID' ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                    <span className="size-1.5 rounded-full bg-amber-600"></span>
                    Partially Paid
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-100 text-rose-800 border border-rose-300">
                    <span className="size-1.5 rounded-full bg-rose-600"></span>
                    Unpaid
                  </span>
                )}
                {isClosed && !isCancelled && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-teal-100 text-teal-800 border border-teal-300">
                    <span className="size-1.5 rounded-full bg-teal-600"></span>
                    Closed
                  </span>
                )}
              </div>

              <p className="text-caption text-on-surface-variant mt-1">
                Supplier: <strong className="text-on-surface">{purchase.supplierName}</strong> ·
                Invoice #{purchase.invoiceNumber || 'INV-PENDING'} · Date: {purchase.date}
              </p>
              <p className="text-caption text-on-surface-variant">
                Receiving Outlet:{' '}
                <strong className="text-on-surface">{purchase.outletName}</strong> (
                {purchase.receivingNotes || 'Store Stockroom Bay B'})
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Drawer Scrollable Body */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
            {/* 1. Line Items Breakdown Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Product Line Items ({purchase.items.length} SKUs)
                </h3>
                <span className="text-caption font-mono text-primary font-semibold">
                  {totalReceived} / {totalOrdered} Units Checked In
                </span>
              </div>

              <div className="border border-outline-variant/40 rounded overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-container-low border-b border-outline-variant/30 text-[10px] uppercase font-semibold text-on-surface-variant">
                    <tr>
                      <th className="py-2.5 px-3">Item / SKU</th>
                      <th className="py-2.5 px-2 text-center">Ordered</th>
                      <th className="py-2.5 px-2 text-center">Recv</th>
                      <th className="py-2.5 px-2 text-center">Pending</th>
                      <th className="py-2.5 px-2 text-right">Unit Price</th>
                      <th className="py-2.5 px-2 text-center">Tax</th>
                      <th className="py-2.5 px-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {purchase.items.map((item) => {
                      const pending = item.quantityOrdered - item.quantityReceived;
                      return (
                        <tr key={item.id} className="hover:bg-surface-container-low/30">
                          <td className="py-2.5 px-3">
                            <div className="font-semibold text-on-surface">{item.productName}</div>
                            <div className="text-[10px] text-on-surface-variant font-mono">
                              {item.productCode} · {item.variantInfo || item.sku}
                            </div>
                          </td>
                          <td className="py-2.5 px-2 text-center font-medium font-body-mono-num">
                            {item.quantityOrdered}
                          </td>
                          <td className="py-2.5 px-2 text-center font-bold text-teal-700 bg-teal-50 font-body-mono-num">
                            {item.quantityReceived}
                          </td>
                          <td
                            className={`py-2.5 px-2 text-center font-bold font-body-mono-num ${
                              pending > 0
                                ? 'text-error bg-error/5'
                                : 'text-on-surface-variant'
                            }`}
                          >
                            {pending}
                          </td>
                          <td className="py-2.5 px-2 text-right font-body-mono-num">
                            {formatCurrency(item.unitCost)}
                          </td>
                          <td className="py-2.5 px-2 text-center text-on-surface-variant">
                            {item.taxRate}%
                          </td>
                          <td className="py-2.5 px-3 text-right font-bold font-body-mono-num">
                            {formatCurrency(item.lineTotal)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Financial Breakdown Card */}
              <div className="mt-3 p-3.5 rounded bg-surface-container-low/50 border border-outline-variant/30 flex justify-end">
                <div className="w-64 space-y-1.5 text-xs">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Items Subtotal:</span>
                    <span className="font-body-mono-num">{formatCurrency(purchase.subtotal)}</span>
                  </div>
                  {purchase.shippingFee > 0 && (
                    <div className="flex justify-between text-on-surface-variant">
                      <span>Shipping &amp; Freight:</span>
                      <span className="font-body-mono-num">
                        {formatCurrency(purchase.shippingFee)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Total Tax (GST/VAT):</span>
                    <span className="font-body-mono-num">{formatCurrency(purchase.tax)}</span>
                  </div>
                  <div className="border-t border-outline-variant/40 pt-1.5 flex justify-between font-bold text-sm text-on-surface">
                    <span>Grand Total:</span>
                    <span className="font-body-mono-num text-primary">
                      {formatCurrency(purchase.totalAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-caption text-emerald-800 font-medium">
                    <span>Amount Paid:</span>
                    <span className="font-body-mono-num">
                      {formatCurrency(purchase.amountPaid)}
                    </span>
                  </div>
                  <div className="flex justify-between text-caption text-error font-bold border-t border-outline-variant/30 pt-1">
                    <span>Balance Due:</span>
                    <span className="font-body-mono-num">
                      {formatCurrency(balanceDue)}
                    </span>
                  </div>
                  {!isCancelled && !isClosed && balanceDue > 0.000001 && (
                    <button
                      type="button"
                      onClick={() => setIsPaymentFormOpen((open) => !open)}
                      className="w-full mt-2 px-3 py-2 rounded bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 cursor-pointer"
                    >
                      {isPaymentFormOpen ? 'Close Payment Form' : 'Record Payment'}
                    </button>
                  )}
                </div>
              </div>

              {!isCancelled && !isClosed && isPaymentFormOpen && balanceDue > 0.000001 && (
                <div className="mt-3 p-4 rounded border border-primary/30 bg-primary/5 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface">
                        Record Supplier Payment
                      </h4>
                      <p className="text-[11px] text-on-surface-variant mt-1">
                        Balance due: <strong>{formatCurrency(balanceDue)}</strong>
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-primary">payments</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-micro-label uppercase font-bold text-on-surface-variant mb-1">
                        Amount
                      </label>
                      <input
                        type="number"
                        min="0.01"
                        max={balanceDue}
                        step="0.01"
                        value={paymentAmount}
                        onChange={(event) => setPaymentAmount(event.target.value)}
                        className="w-full text-xs font-body-mono-num py-2 px-2.5 rounded bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-micro-label uppercase font-bold text-on-surface-variant mb-1">
                        Payment Date
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={10}
                        value={paymentDate}
                        onChange={(event) => setPaymentDate(event.target.value)}
                        placeholder="DD/MM/YYYY"
                        className="w-full text-xs py-2 px-2.5 rounded bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-micro-label uppercase font-bold text-on-surface-variant mb-1">
                        Payment Method
                      </label>
                      <select
                        value={paymentMethod}
                        onChange={(event) => setPaymentMethod(event.target.value as PurchasePaymentMethod)}
                        className="w-full text-xs py-2 px-2.5 rounded bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary"
                      >
                        {(['Cash', 'UPI', 'Bank Transfer', 'Card', 'Cheque', 'Other'] as PurchasePaymentMethod[]).map((method) => (
                          <option key={method} value={method}>{method}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-micro-label uppercase font-bold text-on-surface-variant mb-1">
                        Reference (Optional)
                      </label>
                      <input
                        type="text"
                        value={paymentReference}
                        onChange={(event) => setPaymentReference(event.target.value)}
                        placeholder="UTR, cheque number, etc."
                        className="w-full text-xs py-2 px-2.5 rounded bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-micro-label uppercase font-bold text-on-surface-variant mb-1">
                      Notes (Optional)
                    </label>
                    <textarea
                      value={paymentNotes}
                      onChange={(event) => setPaymentNotes(event.target.value)}
                      rows={2}
                      placeholder="Add a note about this payment"
                      className="w-full text-xs py-2 px-2.5 rounded bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                    />
                  </div>

                  {paymentError && (
                    <div className="rounded border border-error/30 bg-error-container/20 px-3 py-2 text-xs font-medium text-error" role="alert">
                      {paymentError}
                    </div>
                  )}

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsPaymentFormOpen(false)}
                      className="px-3 py-1.5 rounded border border-outline-variant text-xs font-medium hover:bg-surface-container cursor-pointer"
                      disabled={isPaymentSaving}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleRecordPayment}
                      disabled={isPaymentSaving}
                      className="px-3.5 py-1.5 rounded bg-primary hover:bg-primary/90 text-on-primary text-xs font-bold cursor-pointer disabled:opacity-60"
                    >
                      {isPaymentSaving ? 'Saving…' : 'Save Payment'}
                    </button>
                  </div>
                </div>
              )}

              {purchase.payments && purchase.payments.length > 0 && (
                <div className="mt-3 rounded border border-outline-variant/30 overflow-hidden">
                  <div className="px-3 py-2 bg-surface-container-low/50 border-b border-outline-variant/30">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                      Payment History
                    </h4>
                  </div>
                  <div className="divide-y divide-outline-variant/20">
                    {purchase.payments.map((payment) => (
                      <div key={payment.id} className="px-3 py-2.5 flex items-start justify-between gap-3 text-xs">
                        <div>
                          <div className="font-semibold text-on-surface">{payment.paymentMethod}</div>
                          <div className="text-[11px] text-on-surface-variant">
                            {formatPurchaseDateForDisplay(payment.paymentDate)} · Recorded by {payment.recordedBy}
                          </div>
                          {payment.reference && <div className="text-[11px] text-on-surface-variant">Ref: {payment.reference}</div>}
                          {payment.notes && <div className="text-[11px] text-on-surface-variant">{payment.notes}</div>}
                        </div>
                        <span className="font-body-mono-num font-bold text-emerald-700 whitespace-nowrap">
                          {formatCurrency(payment.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {canShowRefund && (
                <>
                  <div className="mt-3 p-3.5 rounded border border-amber-300 bg-amber-50/70 flex justify-end">
                    <div className="w-64 space-y-1.5 text-xs">
                      <div className="flex justify-between text-amber-900 font-semibold">
                        <span>Supplier Refund Due:</span>
                        <span className="font-body-mono-num">{formatCurrency(refundSummary.refundDue)}</span>
                      </div>
                      {refundSummary.totalRefunded > 0 && (
                        <div className="flex justify-between text-emerald-800">
                          <span>Refunded / Credited:</span>
                          <span className="font-body-mono-num">{formatCurrency(refundSummary.totalRefunded)}</span>
                        </div>
                      )}
                      {refundSummary.refundDue > 0.000001 && (
                        <button
                          type="button"
                          onClick={() => setIsRefundFormOpen((open) => !open)}
                          disabled={isRefundLoading}
                          className="w-full mt-2 px-3 py-2 rounded bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 disabled:opacity-60 cursor-pointer"
                        >
                          {isRefundFormOpen ? 'Close Refund Form' : 'Record Supplier Refund / Credit'}
                        </button>
                      )}
                      {isRefundLoading && <div className="text-[11px] text-amber-800">Loading refund history…</div>}
                      {refundLoadError && <div className="text-[11px] text-error" role="alert">{refundLoadError}</div>}
                    </div>
                  </div>

                  {isRefundFormOpen && refundSummary.refundDue > 0.000001 && (
                    <div className="mt-3 p-4 rounded border border-amber-300 bg-amber-50/50 space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface">Record Supplier Refund or Credit</h4>
                          <p className="text-[11px] text-on-surface-variant mt-1">
                            Remaining refund due: <strong>{formatCurrency(refundSummary.refundDue)}</strong>
                          </p>
                        </div>
                        <span className="material-symbols-outlined text-amber-700">currency_exchange</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-micro-label uppercase font-bold text-on-surface-variant mb-1">Amount</label>
                          <input
                            type="number"
                            min="0.01"
                            max={refundSummary.refundDue}
                            step="0.01"
                            value={refundAmount}
                            onChange={(event) => setRefundAmount(event.target.value)}
                            className="w-full text-xs font-body-mono-num py-2 px-2.5 rounded bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-micro-label uppercase font-bold text-on-surface-variant mb-1">Refund Date</label>
                          <input
                            type="text"
                            inputMode="numeric"
                            maxLength={10}
                            value={refundDate}
                            onChange={(event) => setRefundDate(event.target.value)}
                            placeholder="DD/MM/YYYY"
                            className="w-full text-xs py-2 px-2.5 rounded bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-micro-label uppercase font-bold text-on-surface-variant mb-1">Refund Method</label>
                          <select
                            value={refundMethod}
                            onChange={(event) => setRefundMethod(event.target.value as PurchaseRefundMethod)}
                            className="w-full text-xs py-2 px-2.5 rounded bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary"
                          >
                            {(['Cash', 'UPI', 'Bank Transfer', 'Card', 'Cheque', 'Supplier Credit', 'Other'] as PurchaseRefundMethod[]).map((method) => (
                              <option key={method} value={method}>{method}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-micro-label uppercase font-bold text-on-surface-variant mb-1">Reference (Optional)</label>
                          <input
                            type="text"
                            value={refundReference}
                            onChange={(event) => setRefundReference(event.target.value)}
                            placeholder="UTR, credit note, etc."
                            className="w-full text-xs py-2 px-2.5 rounded bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-micro-label uppercase font-bold text-on-surface-variant mb-1">Notes (Optional)</label>
                        <textarea
                          value={refundNotes}
                          onChange={(event) => setRefundNotes(event.target.value)}
                          rows={2}
                          placeholder="Add a note about this refund or supplier credit"
                          className="w-full text-xs py-2 px-2.5 rounded bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                        />
                      </div>

                      {refundError && (
                        <div className="rounded border border-error/30 bg-error-container/20 px-3 py-2 text-xs font-medium text-error" role="alert">
                          {refundError}
                        </div>
                      )}

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsRefundFormOpen(false)}
                          className="px-3 py-1.5 rounded border border-outline-variant text-xs font-medium hover:bg-surface-container cursor-pointer"
                          disabled={isRefundSaving}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleRecordRefund}
                          disabled={isRefundSaving}
                          className="px-3.5 py-1.5 rounded bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer disabled:opacity-60"
                        >
                          {isRefundSaving ? 'Saving…' : 'Save Refund'}
                        </button>
                      </div>
                    </div>
                  )}

                  {refunds.length > 0 && (
                    <div className="mt-3 rounded border border-outline-variant/30 overflow-hidden">
                      <div className="px-3 py-2 bg-surface-container-low/50 border-b border-outline-variant/30">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Refund History</h4>
                      </div>
                      <div className="divide-y divide-outline-variant/20">
                        {refunds.map((refund) => (
                          <div key={refund.id} className="px-3 py-2.5 flex items-start justify-between gap-3 text-xs">
                            <div>
                              <div className="font-semibold text-on-surface">{refund.refundMethod}</div>
                              <div className="text-[11px] text-on-surface-variant">
                                {formatPurchaseDateForDisplay(refund.refundDate)} · Recorded by {refund.recordedBy}
                              </div>
                              {refund.reference && <div className="text-[11px] text-on-surface-variant">Ref: {refund.reference}</div>}
                              {refund.notes && <div className="text-[11px] text-on-surface-variant">{refund.notes}</div>}
                            </div>
                            <span className="font-body-mono-num font-bold text-amber-700 whitespace-nowrap">{formatCurrency(refund.amount)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* 2. Receive Stock Action Workflow Box (Only if pending items exist & not cancelled) */}
            {!isCancelled && !isClosed && totalPending > 0 && (
              <div
                className="p-4 rounded border-2 border-primary/40 bg-primary/5 space-y-3"
                id="receive-stock-section"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded bg-primary text-on-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px]">inventory_2</span>
                    </div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface">
                      Receive Inward Stock Workflow
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-primary text-on-primary text-[10px] font-bold">
                    Action Required
                  </span>
                </div>

                <p className="text-caption text-on-surface-variant">
                  Scan received batch barcode or manually record physical count and batch identifiers
                  for store lot tracking.
                </p>

                {/* Product-specific batch rows */}
                <div className="space-y-3">
                  {pendingItems.map((item) => {
                    const pending = item.quantityOrdered - item.quantityReceived;
                    const rows = getReceiptRows(item);
                    const planned = rows.reduce((sum, row) => sum + row.quantity, 0);
                    return (
                      <div
                        key={item.id}
                        className="p-3 bg-surface-container-lowest rounded border border-outline-variant/40 space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-bold text-xs text-on-surface">
                              {item.productName} ({item.productCode})
                            </div>
                            <div className="text-[11px] text-amber-700 font-medium">
                              {pending} remaining units pending receiving
                            </div>
                          </div>
                          <span className="text-[11px] text-on-surface-variant font-medium whitespace-nowrap">
                            {planned} / {pending} units planned
                          </span>
                        </div>

                        {rows.map((row, index) => {
                          const otherQuantity = rows
                            .filter((candidate) => candidate.rowId !== row.rowId)
                            .reduce((sum, candidate) => sum + candidate.quantity, 0);
                          const maxQuantity = Math.max(0, pending - otherQuantity);
                          return (
                            <div
                              key={row.rowId}
                              className="rounded border border-outline-variant/30 bg-surface-container-low/40 p-3 space-y-2"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">
                                  Batch {index + 1}
                                </span>
                                {rows.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removeReceiptBatch(item, row.rowId)}
                                    className="text-[11px] text-error font-semibold hover:underline cursor-pointer"
                                  >
                                    Remove batch
                                  </button>
                                )}
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                <div>
                                  <label className="block text-micro-label uppercase font-bold text-on-surface-variant mb-1">
                                    Receive Qty
                                  </label>
                                  <input
                                    type="number"
                                    min={0}
                                    max={maxQuantity}
                                    step="any"
                                    value={row.quantity}
                                    onChange={(e) => updateReceiptQuantity(item, row.rowId, e.target.value)}
                                    className="w-full text-xs font-body-mono-num py-1.5 px-2.5 rounded bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary"
                                  />
                                </div>
                                <div>
                                  <label className="block text-micro-label uppercase font-bold text-on-surface-variant mb-1">
                                    Batch / Lot Number
                                  </label>
                                  <input
                                    type="text"
                                    value={row.batchNumber}
                                    onChange={(e) => updateReceiptBatch(item, row.rowId, 'batchNumber', e.target.value)}
                                    placeholder="Optional"
                                    className="w-full text-xs font-mono py-1.5 px-2.5 rounded bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary"
                                  />
                                </div>
                                <div>
                                  <label className="block text-micro-label uppercase font-bold text-on-surface-variant mb-1">
                                    Manufacturing Date
                                  </label>
                                  <input
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={10}
                                    value={formatPurchaseDateForDisplay(row.mfgDate)}
                                    onChange={(e) => updateReceiptBatch(item, row.rowId, 'mfgDate', e.target.value)}
                                    placeholder="DD/MM/YYYY"
                                    className="w-full text-xs py-1.5 px-2.5 rounded bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary"
                                  />
                                </div>
                                <div>
                                  <label className="block text-micro-label uppercase font-bold text-on-surface-variant mb-1">
                                    Expiry / Shelf Life
                                  </label>
                                  <input
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={10}
                                    value={formatPurchaseDateForDisplay(row.expiryDate)}
                                    onChange={(e) => updateReceiptBatch(item, row.rowId, 'expiryDate', e.target.value)}
                                    placeholder="DD/MM/YYYY"
                                    className="w-full text-xs py-1.5 px-2.5 rounded bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary"
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        <button
                          type="button"
                          onClick={() => addReceiptBatch(item)}
                          className="flex items-center gap-1 text-xs text-primary hover:underline font-semibold cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">add</span>
                          <span>Add another batch for this product</span>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {receiveError && (
                  <div className="rounded border border-error/30 bg-error-container/20 px-3 py-2 text-xs font-medium text-error" role="alert">
                    {receiveError}
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      alert(`Labels queued for ${plannedReceiptUnits} units across ${plannedBatchCount} batch${plannedBatchCount === 1 ? '' : 'es'}.`)
                    }
                    className="flex items-center gap-1 text-xs text-primary hover:underline font-semibold cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">print</span>
                    <span>Print Barcode Labels ({plannedReceiptUnits} Units)</span>
                  </button>
                  <div className="flex items-center gap-2">
                    {totalReceived > 0 && (
                      <button
                        type="button"
                        onClick={async () => {
                          if (!confirm(`Close ${purchase.purchaseNumber} with ${totalReceived} of ${totalOrdered} units received? The remaining units will not be receivable and the purchase totals will be adjusted.`)) return;
                          try {
                            await onClosePartialPurchase(purchase.id);
                          } catch (error) {
                            setReceiveError(error instanceof Error ? error.message : 'Unable to close the purchase.');
                          }
                        }}
                        className="px-3 py-1.5 rounded border border-amber-500 text-amber-800 bg-amber-50 text-xs font-bold hover:bg-amber-100 cursor-pointer"
                      >
                        Close with Partial Receipt
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleConfirmInward}
                      className="px-3.5 py-1.5 rounded bg-primary-container hover:bg-primary text-on-primary text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>Confirm Stock Inward</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Drawer Footer Actions */}
          <div className="p-4 border-t border-outline-variant/30 bg-surface-container-low flex items-center justify-between">
            {!isCancelled && !isClosed && !isFullyReceived ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Are you sure you want to cancel purchase order ${purchase.purchaseNumber}?`)) {
                    onCancelPurchase(purchase.id);
                  }
                }}
                className="h-9 px-space-base rounded-xl border font-body-medium text-caption transition-colors flex items-center justify-center gap-1 cursor-pointer bg-surface hover:bg-error-container/20 text-error"
              >
                <span className="material-symbols-outlined text-[16px]">cancel</span>
                <span>Cancel Purchase Order</span>
              </button>
            ) : (
              <span className="text-xs text-on-surface-variant font-medium">
                {isCancelled ? 'Order Cancelled / Voided' : isClosed ? 'Purchase Closed' : 'Order Fully Received'}
              </span>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded bg-primary text-on-primary text-xs font-bold shadow-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
