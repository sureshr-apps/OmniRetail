import React, { useState } from 'react';
import { Purchase } from '../types';
import { formatCurrency } from '../utils/calculations';

interface PurchaseDetailDrawerProps {
  purchase: Purchase | null;
  onClose: () => void;
  onCancelPurchase: (id: string) => void;
  onReceiveStock: (
    purchaseId: string,
    receivedCounts: Record<string, number>,
    batchInfo: { batchNumber: string; mfgDate: string; expiryDate: string }
  ) => void;
}

export function PurchaseDetailDrawer({
  purchase,
  onClose,
  onCancelPurchase,
  onReceiveStock,
}: PurchaseDetailDrawerProps) {
  const [batchNumber, setBatchNumber] = useState('BATCH-2024-OCT-09');
  const [mfgDate, setMfgDate] = useState('2024-10-01');
  const [expiryDate, setExpiryDate] = useState('2027-10-01');

  // Track inward receive counts per item in state
  const [receiveCounts, setReceiveCounts] = useState<Record<string, number>>({});

  if (!purchase) return null;

  const totalOrdered = purchase.items.reduce((acc, it) => acc + it.quantityOrdered, 0);
  const totalReceived = purchase.items.reduce((acc, it) => acc + it.quantityReceived, 0);
  const totalPending = Math.max(0, totalOrdered - totalReceived);
  const isCancelled = purchase.status === 'cancelled';

  const handleUpdateItemReceiveCount = (itemId: string, maxPending: number, delta: number) => {
    const current = receiveCounts[itemId] !== undefined ? receiveCounts[itemId] : maxPending;
    const next = Math.max(0, Math.min(maxPending, current + delta));
    setReceiveCounts((prev) => ({ ...prev, [itemId]: next }));
  };

  const handleConfirmInward = () => {
    // If no explicit counts touched, default to checking in all pending
    const countsToApply: Record<string, number> = {};
    purchase.items.forEach((it) => {
      const pending = it.quantityOrdered - it.quantityReceived;
      if (pending > 0) {
        countsToApply[it.id] =
          receiveCounts[it.id] !== undefined ? receiveCounts[it.id] : pending;
      }
    });

    onReceiveStock(purchase.id, countsToApply, {
      batchNumber,
      mfgDate,
      expiryDate,
    });
  };

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
                      -{formatCurrency(purchase.amountPaid)}
                    </span>
                  </div>
                  <div className="flex justify-between text-caption text-error font-bold border-t border-outline-variant/30 pt-1">
                    <span>Balance Due:</span>
                    <span className="font-body-mono-num">
                      {formatCurrency(purchase.outstandingAmount)}
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div>
                    <label className="block text-micro-label uppercase font-bold text-on-surface-variant mb-1">
                      Batch / Lot Number
                    </label>
                    <input
                      type="text"
                      value={batchNumber}
                      onChange={(e) => setBatchNumber(e.target.value)}
                      className="w-full text-xs font-mono py-1.5 px-2.5 rounded bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-micro-label uppercase font-bold text-on-surface-variant mb-1">
                      Manufacturing Date
                    </label>
                    <input
                      type="date"
                      value={mfgDate}
                      onChange={(e) => setMfgDate(e.target.value)}
                      className="w-full text-xs py-1.5 px-2.5 rounded bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-micro-label uppercase font-bold text-on-surface-variant mb-1">
                      Expiry / Shelf Life
                    </label>
                    <input
                      type="date"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="w-full text-xs py-1.5 px-2.5 rounded bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Items with pending quantities stepper */}
                {purchase.items
                  .filter((it) => it.quantityOrdered - it.quantityReceived > 0)
                  .map((it) => {
                    const pending = it.quantityOrdered - it.quantityReceived;
                    const count =
                      receiveCounts[it.id] !== undefined ? receiveCounts[it.id] : pending;
                    return (
                      <div
                        key={it.id}
                        className="p-3 bg-surface-container-lowest rounded border border-outline-variant/40 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-xs text-on-surface">
                            {it.productName} ({it.productCode})
                          </div>
                          <div className="text-[11px] text-amber-700 font-medium">
                            {pending} remaining units pending receiving
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-caption text-on-surface-variant font-medium">
                            Receive Qty:
                          </span>
                          <div className="flex items-center border border-outline-variant/60 rounded overflow-hidden">
                            <button
                              type="button"
                              onClick={() => handleUpdateItemReceiveCount(it.id, pending, -1)}
                              className="px-2.5 py-1 bg-surface-container-low hover:bg-surface-container text-on-surface font-bold text-xs cursor-pointer"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min={1}
                              max={pending}
                              value={count}
                              onChange={(e) => {
                                const val = parseInt(e.target.value, 10) || 0;
                                setReceiveCounts((prev) => ({
                                  ...prev,
                                  [it.id]: Math.min(pending, Math.max(0, val)),
                                }));
                              }}
                              className="w-12 text-center text-xs font-bold border-none focus:ring-0 py-1 bg-surface-container-lowest"
                            />
                            <button
                              type="button"
                              onClick={() => handleUpdateItemReceiveCount(it.id, pending, 1)}
                              className="px-2.5 py-1 bg-surface-container-low hover:bg-surface-container text-on-surface font-bold text-xs cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      alert(`Labels queued for ${totalPending} units (${batchNumber}).`)
                    }
                    className="flex items-center gap-1 text-xs text-primary hover:underline font-semibold cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">print</span>
                    <span>Print Barcode Labels ({totalPending} Units)</span>
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

            {/* 3. Invoices & Supporting Attachments */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Attachments &amp; Vendor Documents
              </h4>
              <div className="flex items-center gap-3 p-3 rounded border border-outline-variant/40 bg-surface-container-low/30 hover:bg-surface-container-low/60 transition-colors">
                <div className="size-10 rounded bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">picture_as_pdf</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-on-surface truncate">
                    {purchase.invoiceNumber || 'INV-ZTM-8821'}_Signed_Challan.pdf
                  </p>
                  <p className="text-[10px] text-on-surface-variant font-mono">
                    1.8 MB · Uploaded by {purchase.createdBy} · {purchase.date}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      alert('Downloading vendor challan attachment.')
                    }
                    className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant cursor-pointer"
                    title="Download"
                  >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      alert('Opening PDF document viewer in secure preview.')
                    }
                    className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant cursor-pointer"
                    title="Preview"
                  >
                    <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 4. Audit Log History */}
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
            {!isCancelled ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Are you sure you want to cancel purchase order ${purchase.purchaseNumber}?`)) {
                    onCancelPurchase(purchase.id);
                  }
                }}
                className="flex items-center gap-1.5 text-xs text-error font-medium hover:underline cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">cancel</span>
                <span>Cancel Purchase Order</span>
              </button>
            ) : (
              <span className="text-xs text-on-surface-variant font-medium">
                Order Cancelled / Voided
              </span>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded border border-outline-variant/60 text-xs font-medium hover:bg-surface-container-high text-on-surface cursor-pointer"
              >
                Print Purchase Voucher
              </button>
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
