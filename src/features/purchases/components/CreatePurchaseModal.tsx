import React, { useEffect, useState } from 'react';
import { CreatePurchaseInput, CreatePurchaseLineInput, PurchaseScope } from '../types';
import { SupplierOption, OutletOption } from '../services/purchaseService';
import { productService } from '@/features/products/services/productService';
import { Product } from '@/features/products/types';
import { calculatePurchaseTotals, formatCurrency } from '../utils/calculations';
import { formatProductCode } from '@/features/products/utils/formatProductCode';

interface CreatePurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (input: CreatePurchaseInput, shouldOpenDetails?: boolean) => void | Promise<void>;
  suppliers: SupplierOption[];
  outlets: OutletOption[];
}

export function CreatePurchaseModal({
  isOpen,
  onClose,
  onCreated,
  suppliers,
  outlets,
}: CreatePurchaseModalProps) {
  const [selectedSupplierId, setSelectedSupplierId] = useState('');
  const [selectedOutletId, setSelectedOutletId] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [purchaseOrderNumber, setPurchaseOrderNumber] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('Net 15 Days');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Product Lines
  const [lines, setLines] = useState<CreatePurchaseLineInput[]>([]);
  const [productSuggestions, setProductSuggestions] = useState<Product[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    void productService
      .getProducts({ page: 1, pageSize: 1000, status: 'ACTIVE' })
      .then((result) => setProductSuggestions(result.items))
      .catch((error) => console.error('Failed to load purchase product options:', error));
  }, [isOpen]);

  // Freight & Charges
  const [shippingFee, setShippingFee] = useState<number>(120.0);
  const [handlingFee, setHandlingFee] = useState<number>(0.0);

  // Settlement
  const [paymentOption, setPaymentOption] = useState<'UNPAID' | 'PARTIALLY_PAID' | 'PAID'>(
    'PARTIALLY_PAID'
  );
  const [customPaidAmount, setCustomPaidAmount] = useState<string>('1500.00');

  useEffect(() => {
    if (!isOpen) return;
    setSelectedSupplierId((current) =>
      suppliers.some((supplier) => supplier.id === current) ? current : suppliers[0]?.id ?? ''
    );
    setSelectedOutletId((current) =>
      outlets.some((outlet) => outlet.id === current) ? current : outlets[0]?.id ?? ''
    );
  }, [isOpen, outlets, suppliers]);

  if (!isOpen) return null;

  // Calculate live totals
  const { subtotal, totalTax, grandTotal } = calculatePurchaseTotals(
    lines,
    shippingFee,
    handlingFee,
    0
  );

  const initialPayment =
    paymentOption === 'PAID'
      ? grandTotal
      : paymentOption === 'UNPAID'
      ? 0
      : parseFloat(customPaidAmount) || 0;

  const handleAddLine = () => {
    const nextItem = productSuggestions[lines.length % productSuggestions.length];
    if (!nextItem) return;
    setLines((prev) => [
      ...prev,
      {
        productId: nextItem.id,
        productCode: formatProductCode(nextItem.productCode),
        productName: `${nextItem.name} (${formatProductCode(nextItem.productCode)})`,
        sku: nextItem.sku,
        quantity: 10,
        unitCost: nextItem.cost ?? 0,
        discountPercent: 0,
        taxRate: Number(nextItem.taxCategory?.match(/[0-9]+(?:\.[0-9]+)?/)?.[0] ?? 0),
      },
    ]);
  };

  const handleRemoveLine = (index: number) => {
    if (lines.length <= 1) return;
    setLines((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleUpdateLine = (index: number, field: keyof CreatePurchaseLineInput, value: any) => {
    setLines((prev) =>
      prev.map((item, idx) => {
        if (idx !== index) return item;
        return {
          ...item,
          [field]: value,
        };
      })
    );
  };

  const handleSelectProduct = (index: number, productId: string) => {
    const match = productSuggestions.find((p) => p.id === productId);
    if (!match) return;
    setLines((prev) =>
      prev.map((item, idx) => {
        if (idx !== index) return item;
        return {
          ...item,
          productId: match.id,
          productCode: formatProductCode(match.productCode),
          productName: match.name,
          sku: match.sku,
          unitCost: match.cost ?? 0,
          taxRate: Number(match.taxCategory?.match(/[0-9]+(?:\.[0-9]+)?/)?.[0] ?? 0),
        };
      })
    );
  };

  const handleSubmit = async (status: 'active' | 'draft', openDetails: boolean = false) => {
    if (isSubmitting) return;
    const supplier = suppliers.find((candidate) => candidate.id === selectedSupplierId);
    const outlet = outlets.find((candidate) => candidate.id === selectedOutletId);
    if (!supplier) {
      setFormError('Select a supplier before saving the purchase.');
      return;
    }
    if (!outlet) {
      setFormError('Select a destination outlet before saving the purchase.');
      return;
    }
    if (lines.length === 0) {
      setFormError('Add at least one product line before saving the purchase.');
      return;
    }
    if (lines.some((line) => !line.productId || !Number.isFinite(line.quantity) || line.quantity <= 0 || !Number.isFinite(line.unitCost) || line.unitCost < 0)) {
      setFormError('Check each product line has a valid product, quantity, and unit cost.');
      return;
    }

    setFormError('');

    const input: CreatePurchaseInput = {
      supplierId: supplier.id,
      supplierName: supplier.name,
      outletId: outlet.id,
      outletName: outlet.name,
      scope: 'outlet' as PurchaseScope,
      purchaseDate,
      invoiceNumber: invoiceNumber.trim() || undefined,
      purchaseOrderNumber: purchaseOrderNumber.trim() || undefined,
      paymentTerms,
      items: lines,
      shippingFee,
      handlingFee,
      initialPaymentRecorded: initialPayment,
      paymentOption,
      status,
    };

    setIsSubmitting(true);
    try {
      await onCreated(input, openDetails);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      aria-labelledby="modal-title"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto select-none"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl rounded-lg bg-surface-container-lowest border border-outline-variant/40 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
          {/* Modal Header */}
          <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low/60">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded bg-primary-container text-on-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
              </div>
              <div>
                <h3 className="text-headline-sm font-bold text-on-surface" id="modal-title">
                  Create New Purchase Direct
                </h3>
                <p className="text-caption text-on-surface-variant">
                  Record incoming stock shipment from vendor with invoice and tax breakdown.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Modal Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            {/* 1. Vendor & General Information */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">
                1. Vendor &amp; General Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-caption font-semibold text-on-surface mb-1">
                    Supplier / Vendor *
                  </label>
                  <select
                    value={selectedSupplierId}
                    onChange={(e) => setSelectedSupplierId(e.target.value)}
                    className="w-full text-xs py-2 px-3 rounded bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary font-medium"
                  >
                    {suppliers.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-caption font-semibold text-on-surface mb-1">
                    Destination Outlet *
                  </label>
                  <select
                    value={selectedOutletId}
                    onChange={(e) => setSelectedOutletId(e.target.value)}
                    className="w-full text-xs py-2 px-3 rounded bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary font-medium"
                  >
                    {outlets.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-caption font-semibold text-on-surface mb-1">
                    Purchase Date *
                  </label>
                  <input
                    type="date"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                    className="w-full text-xs py-2 px-3 rounded bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary font-medium"
                  />
                </div>

                <div>
                  <label className="block text-caption font-semibold text-on-surface mb-1">
                    Supplier Invoice #
                  </label>
                  <input
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    placeholder="e.g. INV-99214"
                    className="w-full text-xs py-2 px-3 rounded bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary font-mono"
                  />
                </div>

                <div>
                  <label className="block text-caption font-semibold text-on-surface mb-1">
                    Purchase Order (Optional)
                  </label>
                  <input
                    type="text"
                    value={purchaseOrderNumber}
                    onChange={(e) => setPurchaseOrderNumber(e.target.value)}
                    placeholder="e.g. PO-2024-082"
                    className="w-full text-xs py-2 px-3 rounded bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary font-mono"
                  />
                </div>

                <div>
                  <label className="block text-caption font-semibold text-on-surface mb-1">
                    Payment Terms
                  </label>
                  <select
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                    className="w-full text-xs py-2 px-3 rounded bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:ring-1 focus:ring-primary"
                  >
                    <option>Immediate / Cash</option>
                    <option>Net 15 Days</option>
                    <option>Net 30 Days</option>
                    <option>Net 60 Days</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Product Line Items Builder */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  2. Purchase Product Lines
                </h4>
                <button
                  type="button"
                  onClick={handleAddLine}
                  className="px-2.5 py-1 rounded bg-surface-container border border-primary/40 text-primary text-caption font-semibold hover:bg-primary/5 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px]">add</span>
                  <span>+ Add Product Line</span>
                </button>
              </div>

              <div className="border border-outline-variant/40 rounded overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-container-low border-b border-outline-variant/30 text-[10px] uppercase font-semibold text-on-surface-variant">
                    <tr>
                      <th className="py-2.5 px-3">Product / SKU</th>
                      <th className="py-2.5 px-2 text-center w-20">Qty</th>
                      <th className="py-2.5 px-2 text-right w-24">Unit Cost</th>
                      <th className="py-2.5 px-2 text-center w-20">Discount %</th>
                      <th className="py-2.5 px-2 text-center w-20">Tax %</th>
                      <th className="py-2.5 px-3 text-right">Line Total</th>
                      <th className="py-2.5 px-2 text-center w-8"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {lines.map((line, idx) => {
                      const base =
                        line.quantity * line.unitCost * (1 - (line.discountPercent || 0) / 100);
                      const lineTax = (base * (line.taxRate || 0)) / 100;
                      const lineTotal = base + lineTax;

                      return (
                        <tr key={idx}>
                          <td className="p-2">
                            <select
                              value={line.productId}
                              onChange={(e) => handleSelectProduct(idx, e.target.value)}
                              className="w-full text-xs py-1 px-2 border border-outline-variant/50 rounded bg-surface-container-lowest font-medium"
                            >
                              <option value="">Select product / SKU</option>
                              {productSuggestions.map((product) => (
                                <option key={product.id} value={product.id}>
                                  {product.name} · {product.sku} · {formatProductCode(product.productCode)}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="p-2 w-20">
                            <input
                              type="number"
                              min={1}
                              value={line.quantity}
                              onChange={(e) =>
                                handleUpdateLine(
                                  idx,
                                  'quantity',
                                  Math.max(1, parseInt(e.target.value, 10) || 1)
                                )
                              }
                              className="w-full text-center text-xs py-1 border border-outline-variant/50 rounded font-mono font-bold"
                            />
                          </td>
                          <td className="p-2 w-24">
                            <input
                              type="number"
                              step="0.1"
                              value={line.unitCost}
                              onChange={(e) =>
                                handleUpdateLine(
                                  idx,
                                  'unitCost',
                                  Math.max(0, parseFloat(e.target.value) || 0)
                                )
                              }
                              className="w-full text-right text-xs py-1 border border-outline-variant/50 rounded font-mono"
                            />
                          </td>
                          <td className="p-2 w-20">
                            <input
                              type="number"
                              min={0}
                              max={100}
                              value={line.discountPercent}
                              onChange={(e) =>
                                handleUpdateLine(
                                  idx,
                                  'discountPercent',
                                  Math.max(0, parseFloat(e.target.value) || 0)
                                )
                              }
                              className="w-full text-center text-xs py-1 border border-outline-variant/50 rounded font-mono"
                            />
                          </td>
                          <td className="p-2 w-20">
                            <input
                              type="number"
                              min={0}
                              value={line.taxRate}
                              onChange={(e) =>
                                handleUpdateLine(
                                  idx,
                                  'taxRate',
                                  Math.max(0, parseFloat(e.target.value) || 0)
                                )
                              }
                              className="w-full text-center text-xs py-1 border border-outline-variant/50 rounded font-mono"
                            />
                          </td>
                          <td className="p-2 text-right font-body-mono-num font-bold">
                            {formatCurrency(lineTotal)}
                          </td>
                          <td className="p-2 text-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveLine(idx)}
                              disabled={lines.length <= 1}
                              className="p-1 text-on-surface-variant hover:text-error disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                              title="Delete Row"
                            >
                              <span className="material-symbols-outlined text-[16px]">
                                delete
                              </span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. Additional Charges & Settlement */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  3. Freight &amp; Inward Charges
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-micro-label font-semibold text-on-surface-variant mb-1">
                      Freight / Shipping (₹)
                    </label>
                    <input
                      type="number"
                      step="1"
                      value={shippingFee}
                      onChange={(e) => setShippingFee(parseFloat(e.target.value) || 0)}
                      className="w-full text-xs py-1.5 px-2.5 rounded bg-surface-container-lowest border border-outline-variant/60 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-micro-label font-semibold text-on-surface-variant mb-1">
                      Handling Fees (₹)
                    </label>
                    <input
                      type="number"
                      step="1"
                      value={handlingFee}
                      onChange={(e) => setHandlingFee(parseFloat(e.target.value) || 0)}
                      className="w-full text-xs py-1.5 px-2.5 rounded bg-surface-container-lowest border border-outline-variant/60 font-mono"
                    />
                  </div>
                </div>

              </div>

              {/* Settlement Summary */}
              <div className="p-4 rounded bg-surface-container-low/50 border border-outline-variant/40 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface">
                  Payment &amp; Inward Settlement
                </h4>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Calculated Subtotal:</span>
                    <span className="font-body-mono-num font-medium">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Shipping &amp; Additional:</span>
                    <span className="font-body-mono-num font-medium">
                      {formatCurrency(shippingFee + handlingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Estimated Tax (GST/VAT):</span>
                    <span className="font-body-mono-num font-medium">
                      {formatCurrency(totalTax)}
                    </span>
                  </div>
                  <div className="border-t border-outline-variant/40 pt-2 flex justify-between text-sm font-bold text-on-surface">
                    <span>Grand Total:</span>
                    <span className="font-body-mono-num text-primary">
                      {formatCurrency(grandTotal)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-outline-variant/30 pt-3">
                  <label className="block text-micro-label uppercase font-bold text-on-surface-variant mb-1">
                    Initial Payment Recorded
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={paymentOption}
                      onChange={(e) => {
                        const opt = e.target.value as 'UNPAID' | 'PARTIALLY_PAID' | 'PAID';
                        setPaymentOption(opt);
                        if (opt === 'PAID') {
                          setCustomPaidAmount(grandTotal.toFixed(2));
                        } else if (opt === 'UNPAID') {
                          setCustomPaidAmount('0.00');
                        }
                      }}
                      className="text-xs py-1.5 px-2 rounded bg-surface-container-lowest border border-outline-variant/60 font-medium cursor-pointer"
                    >
                      <option value="UNPAID">Unpaid (Pay Later)</option>
                      <option value="PARTIALLY_PAID">Partially Paid</option>
                      <option value="PAID">Fully Paid</option>
                    </select>

                    <input
                      type="text"
                      disabled={paymentOption === 'UNPAID'}
                      value={
                        paymentOption === 'PAID'
                          ? `₹${grandTotal.toFixed(2)}`
                          : paymentOption === 'UNPAID'
                          ? '₹0.00'
                          : customPaidAmount
                      }
                      onChange={(e) => setCustomPaidAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                      className="text-xs py-1.5 px-2 rounded bg-surface-container-lowest border border-outline-variant/60 font-mono font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="px-6 py-3.5 border-t border-outline-variant/30 bg-surface-container-low flex items-center justify-between">
            {formError && <p className="text-xs font-semibold text-error" role="alert">{formError}</p>}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-outline-variant/60 text-xs font-medium hover:bg-surface-container text-on-surface cursor-pointer"
            >
              Cancel
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSubmit('draft', false)}
                disabled={isSubmitting}
                className="px-4 py-2 rounded border border-primary/40 bg-surface-container-lowest hover:bg-primary/5 text-primary text-xs font-semibold cursor-pointer"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={() => handleSubmit('active', true)}
                disabled={isSubmitting}
                className="px-4 py-2 rounded bg-primary-container hover:bg-primary text-on-primary text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">save</span>
                <span>Save and Receive Stock</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
