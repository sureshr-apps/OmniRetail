import React, { useEffect, useState } from 'react';
import { PaymentTerms, Supplier, SupplierCategory, UpdateSupplierInput } from '../types';

interface EditSupplierModalProps {
  isOpen: boolean;
  supplier: Supplier | null;
  onClose: () => void;
  onSubmit: (id: string, updates: UpdateSupplierInput) => Promise<void>;
  categories: string[];
}

const PAYMENT_TERMS_OPTIONS: PaymentTerms[] = [
  'Net 30 Days',
  'Net 15 Days',
  'Net 45 Days',
  'Net 60 Days',
  'Cash on Delivery (COD)',
  'Immediate Wire',
];

export function EditSupplierModal({
  isOpen,
  supplier,
  onClose,
  onSubmit,
  categories,
}: EditSupplierModalProps) {
  const availableCategories = Array.from(new Set(categories));
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [taxId, setTaxId] = useState('');
  const [category, setCategory] = useState<SupplierCategory>('');
  const [paymentTerms, setPaymentTerms] = useState<PaymentTerms>('Net 30 Days');
  const [creditLimit, setCreditLimit] = useState('25000');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!supplier) return;

    setName(supplier.name);
    setContactPerson(supplier.contactPerson);
    setPhone(supplier.phone);
    setEmail(supplier.email);
    setTaxId(supplier.taxId || '');
    setCategory(supplier.category);
    setPaymentTerms(supplier.paymentTerms);
    setCreditLimit(String(supplier.creditLimit));
    setAddress(supplier.address || '');
    setNotes(supplier.notes || '');
    setErrors({});
  }, [supplier]);

  if (!isOpen || !supplier) return null;

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = 'Supplier name is required';
    if (!contactPerson.trim()) nextErrors.contactPerson = 'Contact person is required';
    if (!phone.trim()) nextErrors.phone = 'Phone number is required';
    if (!email.trim()) {
      nextErrors.email = 'Email address is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email';
    }
    if (!category.trim()) nextErrors.category = 'Primary category is required';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(supplier.id, {
        name: name.trim(),
        contactPerson: contactPerson.trim(),
        phone: phone.trim(),
        email: email.trim(),
        taxId: taxId.trim() || undefined,
        category: category.trim(),
        paymentTerms,
        creditLimit: Number.parseFloat(creditLimit) || supplier.creditLimit,
        address: address.trim(),
        notes: notes.trim(),
      });
      onClose();
    } catch (error) {
      console.error('Failed to update supplier:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-3 py-2 text-sm rounded bg-surface-container border ${
      errors[field] ? 'border-error ring-1 ring-error' : 'border-outline-variant/40'
    } text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-1 focus:ring-primary`;

  return (
    <div
      className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-space-base"
      onClick={onClose}
    >
      <div
        className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="px-space-2xl py-space-base bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">edit</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Edit Supplier</h2>
              <p className="font-caption text-caption text-on-surface-variant">
                Update supplier details used by purchasing and inventory operations.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
            aria-label="Close edit supplier dialog"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-space-2xl overflow-y-auto space-y-space-xl flex-1">
            <section className="space-y-4">
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
                    onChange={(event) => setName(event.target.value)}
                    className={inputClass('name')}
                  />
                  {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-on-surface mb-1">
                    Primary Category <span className="text-error">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    required
                    className={inputClass('category')}
                  >
                    <option value="">Select a category</option>
                    {availableCategories.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                  {errors.category && <p className="text-xs text-error mt-1">{errors.category}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-on-surface mb-1">
                    Contact Person <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(event) => setContactPerson(event.target.value)}
                    className={inputClass('contactPerson')}
                  />
                  {errors.contactPerson && <p className="text-xs text-error mt-1">{errors.contactPerson}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-on-surface mb-1">
                    Phone Number <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className={inputClass('phone')}
                  />
                  {errors.phone && <p className="text-xs text-error mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-on-surface mb-1">
                    Email Address <span className="text-error">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={inputClass('email')}
                  />
                  {errors.email && <p className="text-xs text-error mt-1">{errors.email}</p>}
                </div>
              </div>
            </section>

            <section className="space-y-4 pt-4 border-t border-outline-variant/20">
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
                    onChange={(event) => setTaxId(event.target.value)}
                    className={inputClass('taxId')}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-on-surface mb-1">Payment Terms</label>
                  <select
                    value={paymentTerms}
                    onChange={(event) => setPaymentTerms(event.target.value as PaymentTerms)}
                    className={inputClass('paymentTerms')}
                  >
                    {PAYMENT_TERMS_OPTIONS.map((term) => <option key={term} value={term}>{term}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-on-surface mb-1">Credit Limit (₹)</label>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={creditLimit}
                    onChange={(event) => setCreditLimit(event.target.value)}
                    className={`${inputClass('creditLimit')} font-body-mono-num`}
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4 pt-4 border-t border-outline-variant/20">
              <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-tertiary">location_on</span>
                <span>3. Headquarters Address</span>
              </h3>
              <input
                type="text"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                className={inputClass('address')}
              />
            </section>

            <section className="space-y-4 pt-4 border-t border-outline-variant/20">
              <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">notes</span>
                <span>4. Additional Information &amp; Notes</span>
              </h3>
              <textarea
                rows={3}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                className={inputClass('notes')}
              />
            </section>
          </div>

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
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
