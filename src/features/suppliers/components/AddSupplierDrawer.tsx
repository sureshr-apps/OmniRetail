import React, { useState } from 'react';
import { CreateSupplierInput, SupplierCategory, PaymentTerms } from '../types';

interface AddSupplierDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateSupplierInput) => Promise<void>;
  categories: string[];
}

const DEFAULT_CATEGORIES: SupplierCategory[] = [
  'Consumer Electronics',
  'Apparel & Textiles',
  'Beverages & Groceries',
  'Tools & Hardware',
  'Office Supplies',
  'Packaging & Shipping',
  'Leather & Accessories',
  'Point of Sale & Tech',
  'General Merchandise',
];

const PAYMENT_TERMS_OPTIONS: PaymentTerms[] = [
  'Net 30 Days',
  'Net 15 Days',
  'Net 45 Days',
  'Net 60 Days',
  'Cash on Delivery (COD)',
  'Immediate Wire',
];

export function AddSupplierDrawer({
  isOpen,
  onClose,
  onSubmit,
  categories,
}: AddSupplierDrawerProps) {
  const availableCategories = Array.from(new Set([...DEFAULT_CATEGORIES, ...categories]));
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [taxId, setTaxId] = useState('');
  const [category, setCategory] = useState<SupplierCategory>('Consumer Electronics');
  const [paymentTerms, setPaymentTerms] = useState<PaymentTerms>('Net 30 Days');
  const [creditLimit, setCreditLimit] = useState('25000');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Supplier name is required';
    if (!contactPerson.trim()) errs.contactPerson = 'Contact person is required';
    if (!phone.trim()) errs.phone = 'Phone number is required';
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        name,
        contactPerson,
        phone,
        email,
        taxId,
        category,
        paymentTerms,
        creditLimit: parseFloat(creditLimit) || 10000,
        address,
        notes,
      });
      // Reset form
      setName('');
      setContactPerson('');
      setPhone('');
      setEmail('');
      setTaxId('');
      setCategory('Consumer Electronics');
      setPaymentTerms('Net 30 Days');
      setCreditLimit('25000');
      setAddress('');
      setNotes('');
      setErrors({});
      onClose();
    } catch (err) {
      console.error('Failed to save supplier:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-space-base"
      onClick={onClose}
    >
      <div
        className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-space-2xl py-space-base bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Add New Supplier</h2>
              <p className="font-caption text-caption text-on-surface-variant">
                Register a supplier for purchasing and inventory operations.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body (Scrollable Form) */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-space-2xl overflow-y-auto space-y-space-xl flex-1">
          {/* Section 1: Supplier Information */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">storefront</span>
              <span>1. Supplier Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-on-surface mb-1">
                  Supplier Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Apex Global Electronics"
                  className={`w-full px-3 py-2 text-sm rounded bg-surface-container border ${
                    errors.name ? 'border-error ring-1 ring-error' : 'border-outline-variant/40'
                  } text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-1 focus:ring-primary`}
                />
                {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-on-surface mb-1">
                  Primary Category <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  list="supplier-categories"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  placeholder="e.g. Consumer Electronics"
                  className="w-full px-3 py-2 text-sm rounded bg-surface-container border border-outline-variant/40 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                />
                <datalist id="supplier-categories">
                  {availableCategories.map((cat) => <option key={cat} value={cat} />)}
                </datalist>
              </div>

              <div>
                <label className="block text-xs font-medium text-on-surface mb-1">
                  Contact Person <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="e.g. Marcus Vance"
                  className={`w-full px-3 py-2 text-sm rounded bg-surface-container border ${
                    errors.contactPerson ? 'border-error ring-1 ring-error' : 'border-outline-variant/40'
                  } text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-1 focus:ring-primary`}
                />
                {errors.contactPerson && (
                  <p className="text-xs text-error mt-1">{errors.contactPerson}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-on-surface mb-1">
                  Phone Number <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +1 (555) 382-9100"
                  className={`w-full px-3 py-2 text-sm rounded bg-surface-container border ${
                    errors.phone ? 'border-error ring-1 ring-error' : 'border-outline-variant/40'
                  } text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-1 focus:ring-primary`}
                />
                {errors.phone && <p className="text-xs text-error mt-1">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-on-surface mb-1">
                  Email Address <span className="text-error">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. orders@apexge.com"
                  className={`w-full px-3 py-2 text-sm rounded bg-surface-container border ${
                    errors.email ? 'border-error ring-1 ring-error' : 'border-outline-variant/40'
                  } text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-1 focus:ring-primary`}
                />
                {errors.email && <p className="text-xs text-error mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Business & Tax Details */}
          <div className="space-y-4 pt-4 border-t border-outline-variant/20">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-secondary">receipt_long</span>
              <span>2. Business &amp; Tax Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-on-surface mb-1">
                  GST <span className="text-on-surface-variant font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  placeholder="e.g. 29ABCDE1234F1Z5"
                  className={`w-full px-3 py-2 text-sm rounded bg-surface-container border ${
                    errors.taxId ? 'border-error ring-1 ring-error' : 'border-outline-variant/40'
                  } text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-1 focus:ring-primary`}
                />
                {errors.taxId && <p className="text-xs text-error mt-1">{errors.taxId}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-on-surface mb-1">
                  Payment Terms
                </label>
                <select
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value as PaymentTerms)}
                  className="w-full px-3 py-2 text-sm rounded bg-surface-container border border-outline-variant/40 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  {PAYMENT_TERMS_OPTIONS.map((term) => (
                    <option key={term} value={term}>
                      {term}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-on-surface mb-1">
                  Credit Limit (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={creditLimit}
                  onChange={(e) => setCreditLimit(e.target.value)}
                  placeholder="e.g. 25000"
                  className="w-full px-3 py-2 text-sm rounded bg-surface-container border border-outline-variant/40 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary font-body-mono-num"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Headquarters Address */}
          <div className="space-y-4 pt-4 border-t border-outline-variant/20">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-tertiary">location_on</span>
              <span>3. Headquarters Address</span>
            </h3>

            <div>
                <label className="block text-xs font-medium text-on-surface mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 104 Madison Ave, Suite 800"
                  className="w-full px-3 py-2 text-sm rounded bg-surface-container border border-outline-variant/40 text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-1 focus:ring-primary"
                />
            </div>
          </div>

          {/* Section 4: Notes & Procurement Terms */}
          <div className="space-y-4 pt-4 border-t border-outline-variant/20">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">notes</span>
              <span>4. Additional Information &amp; Notes</span>
            </h3>
            <div>
              <label className="block text-xs font-medium text-on-surface mb-1">
                Procurement Notes / Agreement Details
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add internal notes on preferred freight carriers, minimum order quantities (MOQ), or contract numbers..."
                className="w-full px-3 py-2 text-sm rounded bg-surface-container border border-outline-variant/40 text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          </div>

          {/* Modal Footer */}
          <div className="px-space-2xl py-space-base bg-surface-container-low border-t border-outline-variant/30 flex items-center justify-end gap-space-base">
            <button
              type="button"
              onClick={onClose}
              className="h-9 px-space-base bg-surface-container hover:bg-surface-container-high text-on-surface rounded font-body-medium text-body-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-9 px-space-2xl bg-primary hover:bg-primary-container text-on-primary rounded font-body-medium text-body-medium shadow-xs transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <span>Create Supplier</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
