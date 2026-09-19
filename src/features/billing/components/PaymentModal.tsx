import React, { useState, useEffect } from 'react';
import { Customer, OrderTotals, PaymentMethod } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  method: PaymentMethod;
  totals: OrderTotals;
  customer: Customer;
  orderNumber: string;
  fastCashAmount?: number;
  onCompleteSale: () => Promise<void>;
}

export function PaymentModal({
  isOpen,
  onClose,
  method,
  totals,
  customer,
  orderNumber,
  fastCashAmount,
  onCompleteSale,
}: PaymentModalProps) {
  const [stage, setStage] = useState<'tender' | 'processing' | 'success'>('tender');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cashTendered, setCashTendered] = useState<string>(
    fastCashAmount ? fastCashAmount.toFixed(2) : totals.totalPayable.toFixed(2)
  );

  useEffect(() => {
    if (isOpen) {
      if (fastCashAmount) {
        setCashTendered(fastCashAmount.toFixed(2));
      } else {
        setCashTendered(totals.totalPayable.toFixed(2));
      }
      setStage('tender');
      setIsSubmitting(false);
    }
  }, [isOpen, fastCashAmount, totals.totalPayable]);

  if (!isOpen) return null;

  const tenderedNum = parseFloat(cashTendered) || 0;
  const changeDue = Math.max(0, tenderedNum - totals.totalPayable);

  const handleProcess = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setStage('processing');
    try {
      await onCompleteSale();
      setStage('success');
    } catch {
      setStage('tender');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDone = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/40 backdrop-blur-xs p-4">
      <div className="bg-surface-container-lowest rounded-md shadow-xl border border-outline-variant/40 w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-space-lg py-3 bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">
              {method === 'card'
                ? 'contactless'
                : method === 'cash' || method === 'fast_cash'
                ? 'payments'
                : method === 'digital'
                ? 'qr_code_2'
                : method === 'split'
                ? 'call_split'
                : 'card_membership'}
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              {method === 'card'
                ? 'Pay with Card'
                : method === 'cash' || method === 'fast_cash'
                ? 'Cash Tender & Change'
                : method === 'digital'
                ? 'Digital / QR Payment'
                : method === 'split'
                ? 'Split Bill Payment'
                : 'Store Points Redemption'}
            </h3>
          </div>
          {stage !== 'processing' && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-space-lg flex flex-col gap-space-base">
          {stage === 'tender' && (
            <>
              <div className="bg-surface-container-low p-space-base rounded border border-outline-variant/30 flex items-center justify-between">
                <div>
                  <span className="font-caption text-caption text-on-surface-variant block">
                    Amount Due for {orderNumber}
                  </span>
                  <span className="font-body-mono-num text-headline-lg font-bold text-primary">
                    ₹{totals.totalPayable.toFixed(2)}
                  </span>
                </div>
                <div className="text-right font-caption text-caption text-on-surface-variant">
                  <span>Customer: <strong className="text-on-surface">{customer.name}</strong></span>
                  <br />
                  <span>Tier: <strong className="text-secondary">{customer.tier}</strong></span>
                </div>
              </div>

              {/* Specific Method UI */}
              {(method === 'cash' || method === 'fast_cash') && (
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="font-caption text-caption text-on-surface font-semibold mb-1.5 block">
                      Cash Received from Customer (₹)
                    </label>
                    <div className="relative flex items-center">
                      <span className="font-body-mono-num text-headline-md text-on-surface-variant absolute left-3">
                        ₹
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        min={totals.totalPayable}
                        value={cashTendered}
                        onChange={(e) => setCashTendered(e.target.value)}
                        className="w-full h-12 pl-8 pr-3 rounded bg-surface-container-lowest font-body-mono-num text-headline-md font-bold text-on-surface focus:outline-none border border-outline-variant/40 focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  {/* Change due pill */}
                  <div className="p-space-base rounded bg-primary-fixed/20 border border-primary/30 flex items-center justify-between">
                    <span className="font-body-medium text-body-medium font-semibold text-on-surface">
                      Change Due:
                    </span>
                    <span className="font-body-mono-num text-headline-md font-bold text-primary">
                      ₹{changeDue.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              {method === 'digital' && (
                <div className="py-6 px-4 bg-surface-container-low rounded border border-outline-variant/30 flex flex-col items-center justify-center text-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-[40px] text-primary">qr_code_2</span>
                  </div>
                  <div>
                    <p className="font-body-medium text-body-medium font-bold text-on-surface">
                      Scan Customer QR / Wallet
                    </p>
                    <p className="font-caption text-caption text-on-surface-variant mt-0.5">
                      Customer can scan customer-facing display QR code for Apple Pay, Google Pay, or digital wallet.
                    </p>
                  </div>
                </div>
              )}

              {method === 'split' && (
                <div className="flex flex-col gap-3">
                  <p className="font-caption text-caption text-on-surface-variant">
                    Splitting bill evenly across 2 tenders (₹
                    {(totals.totalPayable / 2).toFixed(2)} each):
                  </p>
                  <div className="p-3 rounded bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
                    <span className="font-body-medium font-semibold">Tender 1 (Card)</span>
                    <span className="font-body-mono-num font-bold text-primary">
                      ₹{(totals.totalPayable / 2).toFixed(2)}
                    </span>
                  </div>
                  <div className="p-3 rounded bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
                    <span className="font-body-medium font-semibold">Tender 2 (Cash)</span>
                    <span className="font-body-mono-num font-bold text-primary">
                      ₹{(totals.totalPayable / 2).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              {method === 'points' && (
                <div className="flex flex-col gap-3">
                  <div className="p-3 rounded bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
                    <span className="font-body-medium font-semibold">Customer Available Points</span>
                    <span className="font-body-mono-num font-bold text-secondary">
                      {customer.points} pts (₹{(customer.points * 0.10).toFixed(2)} value)
                    </span>
                  </div>
                  <p className="font-caption text-caption text-on-surface-variant">
                    Redeeming all eligible store points towards this order. Remainder covered via secondary tender.
                  </p>
                </div>
              )}
            </>
          )}

          {stage === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
              <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="font-body-medium text-body-medium font-bold text-on-surface">
                Authorizing Transaction...
              </p>
              <p className="font-caption text-caption text-on-surface-variant">
                Communicating with terminal &amp; ledger
              </p>
            </div>
          )}

          {stage === 'success' && (
            <div className="py-4 flex flex-col items-center justify-center text-center gap-3">
              <div className="w-14 h-14 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-md animate-in zoom-in-50">
                <span className="material-symbols-outlined text-[32px]">check</span>
              </div>
              <div>
                <h4 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Payment Approved &amp; Finalized
                </h4>
                <p className="font-caption text-caption text-on-surface-variant">
                  Transaction complete for {orderNumber} · Customer: {customer.name}
                </p>
              </div>

              {/* Receipt Summary Box */}
              <div className="w-full mt-2 p-space-base rounded bg-surface-container-low border border-outline-variant/30 flex flex-col gap-1.5 text-left font-body-mono-num text-caption">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal:</span>
                  <span>₹{totals.subtotal.toFixed(2)}</span>
                </div>
                {totals.memberDiscount > 0 && (
                  <div className="flex justify-between text-secondary">
                    <span>Discount:</span>
                    <span>-₹{totals.memberDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-on-surface-variant">
                  <span>GST:</span>
                  <span>₹{totals.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-on-surface pt-1 border-t border-outline-variant/20">
                  <span>Total Paid:</span>
                  <span className="text-primary font-bold">₹{totals.totalPayable.toFixed(2)}</span>
                </div>
                {method === 'cash' && changeDue > 0 && (
                  <div className="flex justify-between text-secondary font-bold">
                    <span>Change Returned:</span>
                    <span>₹{changeDue.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-space-base bg-surface-container-low/50 border-t border-outline-variant/20 flex justify-end gap-2">
          {stage === 'tender' && (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded text-on-surface-variant hover:bg-surface-container font-body-medium text-body-medium transition-colors cursor-pointer"
              >
                Cancel (Esc)
              </button>
              <button
                type="button"
                onClick={handleProcess}
                className="px-5 py-2 rounded bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-headline-sm font-semibold transition-colors shadow-xs cursor-pointer flex items-center gap-2"
              >
                <span>Authorize &amp; Complete</span>
                <span className="font-body-mono-num text-micro-label px-1 py-0.2 rounded bg-primary-container/80 text-on-primary font-bold">
                  Enter
                </span>
              </button>
            </>
          )}

          {stage === 'success' && (
            <div className="flex items-center justify-between w-full">
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="px-3 py-1.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-body-medium text-body-medium transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>Print Receipt</span>
              </button>
              <button
                type="button"
                onClick={handleDone}
                className="px-5 py-2 rounded bg-primary text-on-primary font-headline-sm text-headline-sm font-semibold hover:bg-primary-container transition-colors shadow-xs cursor-pointer flex items-center gap-2"
              >
                <span>New Sale</span>
                <span className="font-body-mono-num text-micro-label px-1 py-0.2 rounded bg-primary-container/80 text-on-primary font-bold">
                  Enter
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
