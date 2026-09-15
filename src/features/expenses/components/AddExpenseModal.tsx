import React, { useState, useEffect } from 'react';
import { Expense, ExpenseCategory, PaymentMethod, CreateExpenseInput } from '../types';
import { formatCurrency } from '../utils/calculations';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: CreateExpenseInput, isDraft?: boolean) => void;
  expenseToEdit?: Expense | null;
  onUpdate?: (id: string, input: Partial<CreateExpenseInput>) => void;
}

export function AddExpenseModal({
  isOpen,
  onClose,
  onSubmit,
  expenseToEdit,
  onUpdate,
}: AddExpenseModalProps) {
  const [expenseNumber, setExpenseNumber] = useState('EX-2024-092');
  const [expenseDate, setExpenseDate] = useState('2024-10-25');
  const [category, setCategory] = useState<ExpenseCategory>('Store Supplies');
  const [baseAmount, setBaseAmount] = useState<number | ''>(250.0);
  const [taxAmount, setTaxAmount] = useState<number | ''>(22.5);
  const [outletName, setOutletName] = useState('Downtown Flagship #04');
  const [vendorName, setVendorName] = useState('Apex Packaging Co.');
  const [reference, setReference] = useState('INV-APX-441');
  const [description, setDescription] = useState('Thermal Paper Roll Refills for POS Terminals');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Card');
  const [paidByEmployee, setPaidByEmployee] = useState('Elena Rostova (Sr. Cashier)');
  const [paymentDate, setPaymentDate] = useState('2024-10-25');
  const [notes, setNotes] = useState('');
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Initialize or reset form values
  useEffect(() => {
    if (expenseToEdit) {
      setExpenseNumber(expenseToEdit.expenseNumber);
      setExpenseDate(
        expenseToEdit.date.includes('2024')
          ? new Date(expenseToEdit.timestamp).toISOString().split('T')[0]
          : '2024-10-25'
      );
      setCategory(expenseToEdit.category);
      setBaseAmount(expenseToEdit.baseAmount);
      setTaxAmount(expenseToEdit.taxAmount);
      setOutletName(
        expenseToEdit.scope === 'Organization-wide'
          ? 'Organization-wide Allocation'
          : expenseToEdit.outletName
      );
      setVendorName(expenseToEdit.vendorName || '');
      setReference(expenseToEdit.reference || '');
      setDescription(expenseToEdit.description);
      setPaymentMethod(expenseToEdit.paymentMethod);
      setPaidByEmployee(expenseToEdit.paidByEmployee);
      setNotes(expenseToEdit.notes || '');
      setAttachedFileName(expenseToEdit.attachments?.[0]?.name || null);
    } else {
      // Default new form
      setExpenseNumber('EX-2024-092');
      setExpenseDate('2024-10-25');
      setCategory('Store Supplies');
      setBaseAmount(250.0);
      setTaxAmount(22.5);
      setOutletName('Downtown Flagship #04');
      setVendorName('Apex Packaging Co.');
      setReference('INV-APX-441');
      setDescription('Thermal Paper Roll Refills for POS Terminals');
      setPaymentMethod('Card');
      setPaidByEmployee('Elena Rostova (Sr. Cashier)');
      setPaymentDate('2024-10-25');
      setNotes('');
      setAttachedFileName(null);
    }
    setValidationError(null);
  }, [expenseToEdit, isOpen]);

  if (!isOpen) return null;

  const currentBase = typeof baseAmount === 'number' ? baseAmount : 0;
  const currentTax = typeof taxAmount === 'number' ? taxAmount : 0;
  const totalAmount = currentBase + currentTax;

  const validate = (): boolean => {
    if (!expenseDate) {
      setValidationError('Please select a valid expense date.');
      return false;
    }
    if (!category) {
      setValidationError('Please select an expense category.');
      return false;
    }
    if (!description.trim()) {
      setValidationError('Please provide a short description for this expense.');
      return false;
    }
    if (currentBase <= 0) {
      setValidationError('Base amount must be greater than ₹0.00.');
      return false;
    }
    if (!vendorName.trim()) {
      setValidationError('Please enter a Payee or Vendor name.');
      return false;
    }
    if (!outletName) {
      setValidationError('Please select an allocation outlet.');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent, isDraft = false) => {
    e.preventDefault();
    if (!validate()) return;

    if (expenseToEdit && onUpdate) {
      onUpdate(expenseToEdit.id, {
        date: expenseDate,
        category,
        description,
        vendorName,
        reference,
        outletName:
          outletName === 'Organization-wide Allocation' ? 'Organization-wide' : outletName,
        baseAmount: currentBase,
        taxAmount: currentTax,
        paymentMethod,
        paidByEmployee,
        notes,
      });
      onClose();
    } else {
      onSubmit(
        {
          date: expenseDate,
          category,
          description,
          vendorName,
          reference,
          outletName,
          baseAmount: currentBase,
          taxAmount: currentTax,
          paymentMethod,
          paidByEmployee,
          notes,
          saveAsDraft: isDraft,
        },
        isDraft
      );
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-inverse-surface/50 backdrop-blur-xs z-50 flex items-center justify-center p-space-base animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-surface-container-lowest rounded-xl shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-space-xl py-space-lg bg-surface-container-lowest flex items-center justify-between shadow-xs border-b border-outline-variant/30">
          <div className="flex items-center gap-space-base">
            <div className="w-9 h-9 rounded-lg bg-primary-container flex items-center justify-center text-on-primary shrink-0">
              <span className="material-symbols-outlined text-[20px]">add_task</span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                {expenseToEdit ? 'Edit Operating Expense' : 'Record Operating Expense'}
              </h2>
              <span className="font-caption text-caption text-on-surface-variant">
                Disburse, allocate, and route vendor or operational invoices
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Form Body */}
        <form
          id="expenseForm"
          onSubmit={(e) => handleSubmit(e, false)}
          className="flex-1 overflow-y-auto p-space-xl flex flex-col gap-space-lg"
        >
          {/* Validation Alert */}
          {validationError && (
            <div className="p-space-sm rounded-lg bg-error-container/50 border border-error/30 text-error text-caption flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{validationError}</span>
            </div>
          )}

          {/* Section 1: Expense Details */}
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <span className="font-micro-label text-micro-label uppercase tracking-wider text-primary font-bold">
                1. EXPENSE ATTRIBUTES &amp; SUM
              </span>
              <span className="font-body-mono-num text-body-mono-num text-caption text-on-surface-variant">
                AUTO-GEN #{expenseNumber}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-base">
              <div>
                <label className="block font-caption text-caption text-on-surface-variant font-semibold mb-1">
                  Expense Number
                </label>
                <input
                  type="text"
                  readOnly
                  value={expenseNumber}
                  className="w-full h-9 px-space-sm bg-surface-container-low text-on-surface-variant font-body-mono-num text-body-mono-num rounded-lg border border-outline-variant/30 outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                  Expense Date *
                </label>
                <input
                  type="date"
                  required
                  value={expenseDate}
                  onChange={(e) => setExpenseDate(e.target.value)}
                  className="w-full h-9 px-space-sm bg-surface-container-lowest text-on-surface rounded-lg border border-outline-variant/40 outline-none focus:ring-1 focus:ring-primary shadow-xs font-body-default text-body-default"
                />
              </div>

              <div>
                <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                  Expense Category *
                </label>
                <select
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                  className="w-full h-9 px-space-sm bg-surface-container-lowest text-on-surface rounded-lg border border-outline-variant/40 outline-none focus:ring-1 focus:ring-primary shadow-xs font-body-default text-body-default cursor-pointer"
                >
                  <option value="Utilities">Utilities &amp; Power</option>
                  <option value="Store Supplies">Store Supplies</option>
                  <option value="Equipment Maintenance">Equipment Maintenance</option>
                  <option value="Logistics">Logistics &amp; Courier</option>
                  <option value="Marketing">Marketing &amp; POS Collateral</option>
                  <option value="Professional Services">Professional Services</option>
                  <option value="Other">Other Operating Cost</option>
                </select>
              </div>
            </div>

            {/* Amounts Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-base">
              <div>
                <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                  Base Amount (₹) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={baseAmount}
                  onChange={(e) =>
                    setBaseAmount(e.target.value === '' ? '' : parseFloat(e.target.value) || 0)
                  }
                  className="w-full h-9 px-space-sm bg-surface-container-lowest text-on-surface font-body-mono-num text-body-mono-num rounded-lg border border-outline-variant/40 outline-none focus:ring-1 focus:ring-primary shadow-xs"
                />
              </div>

              <div>
                <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                  Tax Provision (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={taxAmount}
                  onChange={(e) =>
                    setTaxAmount(e.target.value === '' ? '' : parseFloat(e.target.value) || 0)
                  }
                  className="w-full h-9 px-space-sm bg-surface-container-lowest text-on-surface font-body-mono-num text-body-mono-num rounded-lg border border-outline-variant/40 outline-none focus:ring-1 focus:ring-primary shadow-xs"
                />
              </div>

              <div>
                <label className="block font-caption text-caption text-primary font-bold mb-1">
                  Total Amount (Calculated)
                </label>
                <div className="w-full h-9 px-space-sm bg-surface-container-high text-primary font-body-mono-num text-body-mono-num font-bold rounded-lg border border-primary/20 flex items-center justify-between">
                  <span>TOTAL:</span>
                  <span>{formatCurrency(totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Outlet & Vendor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-base">
              <div>
                <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                  Charge to Outlet *
                </label>
                <select
                  required
                  value={outletName}
                  onChange={(e) => setOutletName(e.target.value)}
                  className="w-full h-9 px-space-sm bg-surface-container-lowest text-on-surface rounded-lg border border-outline-variant/40 outline-none focus:ring-1 focus:ring-primary shadow-xs font-body-default text-body-default cursor-pointer"
                >
                  <option value="Downtown Flagship #04">Downtown Flagship #04</option>
                  <option value="Uptown Mall #12">Uptown Mall #12</option>
                  <option value="Westside Mall #02">Westside Mall #02</option>
                  <option value="Northside Mall #08">Northside Mall #08</option>
                  <option value="Organization-wide Allocation">Organization-wide Allocation</option>
                </select>
              </div>

              <div>
                <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                  Payee / Vendor Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Facility Care Ltd."
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  className="w-full h-9 px-space-sm bg-surface-container-lowest text-on-surface rounded-lg border border-outline-variant/40 outline-none focus:ring-1 focus:ring-primary shadow-xs font-body-default text-body-default"
                />
              </div>
            </div>

            {/* Reference & Short Description */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-base">
              <div>
                <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                  Vendor Invoice / Reference Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. INV-2024-8849"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="w-full h-9 px-space-sm bg-surface-container-lowest text-on-surface font-body-mono-num text-body-mono-num rounded-lg border border-outline-variant/40 outline-none focus:ring-1 focus:ring-primary shadow-xs"
                />
              </div>

              <div>
                <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                  Short Description *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Describe purpose of expenditure..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-9 px-space-sm bg-surface-container-lowest text-on-surface rounded-lg border border-outline-variant/40 outline-none focus:ring-1 focus:ring-primary shadow-xs font-body-default text-body-default"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment Information */}
          <div className="flex flex-col gap-space-sm pt-space-xs border-t border-outline-variant/20">
            <span className="font-micro-label text-micro-label uppercase tracking-wider text-primary font-bold">
              2. DISBURSEMENT &amp; PAYMENT INFO
            </span>

            <div className="flex flex-col gap-space-xs">
              <label className="block font-caption text-caption text-on-surface font-semibold">
                Payment Tender Method
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-space-xs">
                {(['Cash', 'Card', 'Bank Transfer', 'UPI / Digital', 'Other'] as PaymentMethod[]).map(
                  (method) => {
                    const isChecked = paymentMethod === method;
                    return (
                      <label
                        key={method}
                        className={`flex items-center gap-1.5 p-2 rounded-lg cursor-pointer transition-colors text-caption font-caption border ${
                          isChecked
                            ? 'bg-primary/10 border-primary/40 text-primary font-semibold'
                            : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/30 text-on-surface'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment_method"
                          value={method}
                          checked={isChecked}
                          onChange={() => setPaymentMethod(method)}
                          className="accent-primary"
                        />
                        <span className="truncate">{method.replace(' / Digital', '')}</span>
                      </label>
                    );
                  }
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-base">
              <div>
                <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                  Paid By (Employee) *
                </label>
                <select
                  value={paidByEmployee}
                  onChange={(e) => setPaidByEmployee(e.target.value)}
                  className="w-full h-9 px-space-sm bg-surface-container-lowest text-on-surface rounded-lg border border-outline-variant/40 outline-none focus:ring-1 focus:ring-primary shadow-xs font-body-default text-body-default cursor-pointer"
                >
                  <option value="Sarah Jenkins (Store Mgr)">Sarah Jenkins (Store Mgr)</option>
                  <option value="Elena Rostova (Sr. Cashier)">Elena Rostova (Sr. Cashier)</option>
                  <option value="Marcus Vance (Asst. Mgr)">Marcus Vance (Asst. Mgr)</option>
                  <option value="David Chen (Inventory Spec.)">David Chen (Inventory Spec.)</option>
                  <option value="Amina Patel (Visual Merch)">Amina Patel (Visual Merch)</option>
                </select>
              </div>

              <div>
                <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                  Payment Date
                </label>
                <input
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className="w-full h-9 px-space-sm bg-surface-container-lowest text-on-surface rounded-lg border border-outline-variant/40 outline-none focus:ring-1 focus:ring-primary shadow-xs font-body-default text-body-default"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Supporting Documents Dropzone */}
          <div className="flex flex-col gap-space-xs pt-space-xs border-t border-outline-variant/20">
            <span className="font-micro-label text-micro-label uppercase tracking-wider text-primary font-bold">
              3. ATTACH TAX INVOICE &amp; RECEIPTS
            </span>
            <div
              onClick={() => {
                const name = `Invoice_${expenseNumber}_voucher.pdf`;
                setAttachedFileName(name);
              }}
              className="p-space-lg rounded-lg bg-surface-container-low/60 hover:bg-surface-container-low border-2 border-dashed border-outline-variant/40 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-105 transition-transform mb-space-xs">
                <span className="material-symbols-outlined text-[20px]">upload_file</span>
              </div>
              <div className="font-body-medium text-body-medium text-on-surface font-semibold">
                {attachedFileName ? (
                  <span className="text-primary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Attached: {attachedFileName}
                  </span>
                ) : (
                  'Click to browse or drag & drop physical bill image'
                )}
              </div>
              <span className="font-caption text-caption text-on-surface-variant mt-0.5">
                Supports PDF, PNG, JPG scans up to 10MB each
              </span>
            </div>
          </div>
        </form>

        {/* Modal Footer Workflow Actions */}
        <div className="px-space-xl py-space-base bg-surface-container-lowest flex items-center justify-between gap-space-sm shadow-sm border-t border-outline-variant/30 flex-wrap">
          <button
            type="button"
            onClick={onClose}
            className="h-9 px-space-base rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-body-medium text-body-medium transition-colors border border-outline-variant/30 cursor-pointer"
          >
            Cancel
          </button>

          <div className="flex items-center gap-space-sm">
            {!expenseToEdit && (
              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                className="h-9 px-space-base rounded-lg bg-surface-container-lowest hover:bg-surface-container-low text-on-surface font-body-medium text-body-medium shadow-xs border border-outline-variant/40 transition-colors cursor-pointer"
              >
                Save as Draft
              </button>
            )}

            <button
              type="submit"
              form="expenseForm"
              className="h-9 px-space-base rounded-lg bg-primary hover:bg-primary/90 text-on-primary font-headline-sm text-headline-sm flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>{expenseToEdit ? 'Save Changes' : 'Submit for Approval'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
