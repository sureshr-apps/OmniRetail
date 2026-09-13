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
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [taxId, setTaxId] = useState('');
  const [category, setCategory] = useState<SupplierCategory>('Consumer Electronics');
  const [paymentTerms, setPaymentTerms] = useState<PaymentTerms>('Net 30 Days');
  const [creditLimit, setCreditLimit] = useState('25000');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('United States');
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
    if (!taxId.trim()) errs.taxId = 'Tax ID / EIN is required';
    if (!city.trim()) errs.city = 'City is required';

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
        city,
        state,
        postalCode,
        country,
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
      setCity('');
      setState('');
      setPostalCode('');
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
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-xl bg-surface-container-lowest h-full shadow-2xl z-10 flex flex-col border-l border-outline-variant/40 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between shrink-0 bg-surface-container-lowest">
          <div>
            <span className="text-micro-label uppercase font-semibold text-primary tracking-wider">
              Master Data Integration
            </span>
            <h2 className="text-xl font-bold text-on-surface">Add New Supplier</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
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
                  Supplier Code
                </label>
                <input
                  type="text"
                  disabled
                  value="Auto-generated (e.g. SUP-149)"
                  className="w-full px-3 py-2 text-sm rounded bg-surface-container/50 border border-outline-variant/30 text-on-surface-variant font-body-mono-num cursor-not-allowed italic"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-on-surface mb-1">
                  Primary Category <span className="text-error">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as SupplierCategory)}
                  className="w-full px-3 py-2 text-sm rounded bg-surface-container border border-outline-variant/40 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  {DEFAULT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
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
                  Tax ID / EIN <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  placeholder="e.g. US-8829104"
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
                  Credit Limit ($)
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-on-surface mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 104 Madison Ave, Suite 800"
                  className="w-full px-3 py-2 text-sm rounded bg-surface-container border border-outline-variant/40 text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-on-surface mb-1">
                  City <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. New York, NY"
                  className={`w-full px-3 py-2 text-sm rounded bg-surface-container border ${
                    errors.city ? 'border-error ring-1 ring-error' : 'border-outline-variant/40'
                  } text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-1 focus:ring-primary`}
                />
                {errors.city && <p className="text-xs text-error mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-on-surface mb-1">
                  State / Province
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="e.g. NY"
                  className="w-full px-3 py-2 text-sm rounded bg-surface-container border border-outline-variant/40 text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-on-surface mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="e.g. 10016"
                  className="w-full px-3 py-2 text-sm rounded bg-surface-container border border-outline-variant/40 text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-on-surface mb-1">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded bg-surface-container border border-outline-variant/40 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
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

          {/* Form Actions Footer */}
          <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-end gap-3 sticky bottom-0 bg-surface-container-lowest py-3 -mx-6 px-6 shadow-md">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded text-on-surface hover:bg-surface-container-high transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container disabled:opacity-50 transition-colors shadow-xs"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-on-primary border-t-transparent" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>Save Supplier Record</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
