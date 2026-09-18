import React, { useEffect, useState } from 'react';
import { Purchase, PurchaseReceiptBatch, PurchaseReceiptLine } from '../types';
import { calculateOutstandingAmount, formatCurrency } from '../utils/calculations';
import { validatePurchaseReceiptLines } from '../utils/receiving';
import { formatPurchaseDateForDisplay, parsePurchaseDate } from '../utils/date';

type ReceiptBatchRow = PurchaseReceiptBatch & { rowId: string };

function createReceiptBatchRow(itemId: string, quantity: number, suffix: string): ReceiptBatchRow {
  return { rowId: `${itemId}-batch-${suffix}`, quantity, batchNumber: '', mfgDate: '', expiryDate: '' };
}

interface PurchaseDetailDrawerProps {
  purchase: Purchase | null;
  onClose: () => void;
  onCancelPurchase: (id: string) => void;
  onReceiveStock: (purchaseId: string, receipts: PurchaseReceiptLine[]) => void;
}

export function PurchaseDetailDrawer({
  purchase,
  onClose,
  onCancelPurchase,
  onReceiveStock,
}: PurchaseDetailDrawerProps) {
  const [receiptBatches, setReceiptBatches] = useState<Record<string, ReceiptBatchRow[]>>({});
  const [receiveError, setReceiveError] = useState<string | null>(null);
  const receiptProgressKey = purchase?.items.map((item) => `${item.id}:${item.quantityReceived}`).join('|') ?? '';

  useEffect(() => {
    setReceiptBatches({});
    setReceiveError(null);
  }, [purchase?.id, receiptProgressKey]);

  if (!purchase) return null;

  const totalOrdered = purchase.items.reduce((acc, it) => acc + it.quantityOrdered, 0);
  const totalReceived = purchase.items.reduce((acc, it) => acc + it.quantityReceived, 0);
  const totalPending = Math.max(0, totalOrdered - totalReceived);
  const isCancelled = purchase.status === 'cancelled';
  const isFullyReceived = totalPending === 0;
  const balanceDue = calculateOutstandingAmount(purchase.totalAmount, purchase.amountPaid);

  const pendingItems = purchase.items.filter((item) => item.quantityOrdered - item.quantityReceived > 0);

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
                </div>
              </div>
            </div>

            {/* 2. Receive Stock Action Workflow Box (Only if pending items exist & not cancelled) */}
            {!isCancelled && totalPending > 0 && (
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
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-3 py-1.5 rounded border border-outline-variant text-xs font-medium hover:bg-surface-container cursor-pointer"
                    >
                      Cancel
                    </button>
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

            {/* 3. Audit Log History */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Procurement Audit Trail
              </h4>
              <ol className="relative border-l border-outline-variant/40 ml-3 space-y-4">
                {purchase.auditTrail && purchase.auditTrail.length > 0 ? (
                  purchase.auditTrail.map((log) => (
                    <li key={log.id} className="ml-4">
                      <div
                        className={`absolute -left-1.5 mt-1.5 size-3 rounded-full border border-surface-container-lowest ${
                          log.dotType === 'primary'
                            ? 'bg-primary'
                            : log.dotType === 'outline'
                            ? 'bg-outline'
                            : 'bg-outline-variant'
                        }`}
                      />
                      <time className="mb-1 text-[10px] font-mono text-on-surface-variant block">
                        {log.timeAgo}
                      </time>
                      <h5 className="text-xs font-bold text-on-surface">{log.title}</h5>
                      <p className="text-[11px] text-on-surface-variant">{log.details}</p>
                    </li>
                  ))
                ) : (
                  <li className="ml-4">
                    <div className="absolute -left-1.5 mt-1.5 size-3 rounded-full border border-surface-container-lowest bg-primary" />
                    <time className="mb-1 text-[10px] font-mono text-on-surface-variant block">
                      {purchase.date} {purchase.time}
                    </time>
                    <h5 className="text-xs font-bold text-on-surface">Purchase Created</h5>
                    <p className="text-[11px] text-on-surface-variant">
                      Initiated by {purchase.createdBy} ({purchase.creatorRole}).
                    </p>
                  </li>
                )}
              </ol>
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-4 border-t border-outline-variant/30 bg-surface-container-low flex items-center justify-between">
            {!isCancelled && !isFullyReceived ? (
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
                {isCancelled ? 'Order Cancelled / Voided' : 'Order Fully Received'}
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
