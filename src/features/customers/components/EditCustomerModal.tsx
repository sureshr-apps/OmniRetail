import React, { useState, useEffect } from 'react';
import { Customer, UpdateCustomerInput, CustomerType, CustomerStatus } from '../types';
import { formatCurrency } from '../utils/calculations';
import { formatCustomerCode } from '../utils/formatCustomerCode';

interface EditCustomerModalProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string, input: UpdateCustomerInput) => Promise<void>;
}

export function EditCustomerModal({
  customer,
  isOpen,
  onClose,
  onSubmit,
}: EditCustomerModalProps) {
  const [type, setType] = useState<CustomerType>('Individual');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');

  // Address
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('TX');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('United States');

  // Business & Tax
  const [taxId, setTaxId] = useState('');
  const [creditLimit, setCreditLimit] = useState<string>('5000');

  // Preferences & Status
  const [preferredContact, setPreferredContact] = useState<
    'Email & SMS' | 'Email Only' | 'SMS Text Only' | 'Phone Call'
  >('Email & SMS');
  const [status, setStatus] = useState<CustomerStatus>('Active');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (customer && isOpen) {
      setType(customer.type);
      setName(customer.name);
      setPhone(customer.phone);
      setEmail(customer.email);
      setDateOfBirth(customer.dateOfBirth || '');
      setGender(customer.gender || '');
      setAddress(customer.address || '');
      setCity(customer.city);
      setState(customer.state);
      setPostalCode(customer.postalCode || '');
      setCountry(customer.country || 'United States');
      setTaxId(customer.taxId || '');
      setCreditLimit(customer.creditLimit ? customer.creditLimit.toString() : '5000');
      setPreferredContact(customer.preferredContact || 'Email & SMS');
      setStatus(customer.status);
      setNotes(customer.notes || '');
      setErrors({});
    }
  }, [customer, isOpen]);

  if (!isOpen || !customer) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full Name or Business Name is required';
    if (!phone.trim()) {
      errs.phone = 'Primary Phone is required';
    } else if (phone.trim().length < 7) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please provide a valid email format';
    }
    if (!city.trim()) errs.city = 'City is required';
    if (!state.trim()) errs.state = 'State is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await onSubmit(customer.id, {
        type,
        name,
        phone,
        email,
        dateOfBirth: dateOfBirth || undefined,
        gender: gender || undefined,
        address: address || undefined,
        city,
        state,
        postalCode: postalCode || undefined,
        country,
        taxId: taxId || undefined,
        creditLimit: creditLimit ? parseFloat(creditLimit) : undefined,
        preferredContact,
        status,
        notes: notes || undefined,
      });
      onClose();
    } catch (err) {
      console.error('Error updating customer:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-space-base">
      <div
        className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-space-2xl py-space-base bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">edit</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">
                Edit Customer Profile
              </h2>
              <p className="font-caption text-caption text-on-surface-variant">
                Modify contact credentials and account records for{' '}
                <strong className="text-on-surface">{customer.name}</strong>
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

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-space-2xl overflow-y-auto space-y-space-xl flex-1">
            {/* Read-Only Summary Banner */}
            <div className="bg-surface-container-low p-space-base rounded border border-outline-variant/30 flex items-center justify-between">
              <div>
                <span className="font-micro-label text-micro-label text-on-surface-variant uppercase">
                  Customer Code (Immutable)
                </span>
                <div className="font-body-mono-num font-bold text-primary text-headline-sm">
                  {formatCustomerCode(customer.customerCode)}
                </div>
              </div>
              <div className="text-right">
                <span className="font-micro-label text-micro-label text-on-surface-variant uppercase">
                  Total Purchases / Balance (Derived)
                </span>
                <div className="font-body-mono-num text-caption text-on-surface">
                  {formatCurrency(customer.totalPurchases)} · Balance:{' '}
                  <strong className={customer.balance > 0 ? 'text-primary' : 'text-on-surface-variant'}>
                    {formatCurrency(customer.balance)}
                  </strong>
                </div>
              </div>
            </div>

            {/* Section 1: Customer Information */}
            <div className="space-y-space-base">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-1">
                <h3 className="font-headline-sm text-headline-sm text-primary flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px]">badge</span>
                  <span>Customer Information</span>
                </h3>
                <span className="font-caption text-caption text-on-surface-variant">* Required fields</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-base">
                <div>
                  <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                    Customer Type *
                  </label>
                  <div className="flex items-center gap-space-lg h-9">
                    <label className="flex items-center gap-space-xs cursor-pointer">
                      <input
                        checked={type === 'Individual'}
                        onChange={() => setType('Individual')}
                        className="text-primary focus:ring-primary cursor-pointer"
                        name="edit-cust-type"
                        type="radio"
                      />
                      <span className="font-body-default text-body-default text-on-surface">Individual</span>
                    </label>
                    <label className="flex items-center gap-space-xs cursor-pointer">
                      <input
                        checked={type === 'Business'}
                        onChange={() => setType('Business')}
                        className="text-primary focus:ring-primary cursor-pointer"
                        name="edit-cust-type"
                        type="radio"
                      />
                      <span className="font-body-default text-body-default text-on-surface">Business</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                    Account Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as CustomerStatus)}
                    className="w-full h-9 px-space-base rounded bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                    Full Name / Business Name *
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full h-9 px-space-base rounded bg-surface-container-low border font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary ${
                      errors.name ? 'border-error ring-1 ring-error' : 'border-outline-variant/50'
                    }`}
                    type="text"
                  />
                  {errors.name && <p className="text-[11px] text-error mt-0.5">{errors.name}</p>}
                </div>
                <div>
                  <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                    Primary Phone *
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full h-9 px-space-base rounded bg-surface-container-low border font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary ${
                      errors.phone ? 'border-error ring-1 ring-error' : 'border-outline-variant/50'
                    }`}
                    type="text"
                  />
                  {errors.phone && <p className="text-[11px] text-error mt-0.5">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                    Email Address *
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full h-9 px-space-base rounded bg-surface-container-low border font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary ${
                      errors.email ? 'border-error ring-1 ring-error' : 'border-outline-variant/50'
                    }`}
                    type="email"
                  />
                  {errors.email && <p className="text-[11px] text-error mt-0.5">{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* Section 2: Address & Location */}
            <div className="space-y-space-base">
              <div className="border-b border-outline-variant/20 pb-1">
                <h3 className="font-headline-sm text-headline-sm text-primary flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px]">home</span>
                  <span>Address & Location</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-base">
                <div className="md:col-span-2">
                  <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                    Street Address
                  </label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full h-9 px-space-base rounded bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                    City *
                  </label>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={`w-full h-9 px-space-base rounded bg-surface-container-low border font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary ${
                      errors.city ? 'border-error ring-1 ring-error' : 'border-outline-variant/50'
                    }`}
                    type="text"
                  />
                  {errors.city && <p className="text-[11px] text-error mt-0.5">{errors.city}</p>}
                </div>
                <div>
                  <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                    State / Province *
                  </label>
                  <input
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className={`w-full h-9 px-space-base rounded bg-surface-container-low border font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary ${
                      errors.state ? 'border-error ring-1 ring-error' : 'border-outline-variant/50'
                    }`}
                    type="text"
                  />
                  {errors.state && <p className="text-[11px] text-error mt-0.5">{errors.state}</p>}
                </div>
                <div>
                  <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                    Postal Code
                  </label>
                  <input
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full h-9 px-space-base rounded bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                    Country
                  </label>
                  <input
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full h-9 px-space-base rounded bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary"
                    type="text"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Business & Tax Information */}
            <div className="space-y-space-base">
              <div className="border-b border-outline-variant/20 pb-1">
                <h3 className="font-headline-sm text-headline-sm text-primary flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                  <span>Business & Tax Information</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-base">
                <div>
                  <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                    Tax Registration Number (EIN / VAT)
                  </label>
                  <input
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    className="w-full h-9 px-space-base rounded bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                    Credit Limit ($)
                  </label>
                  <input
                    value={creditLimit}
                    onChange={(e) => setCreditLimit(e.target.value)}
                    className="w-full h-9 px-space-base rounded bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary"
                    type="number"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Preferences & Notes */}
            <div className="space-y-space-base">
              <div className="border-b border-outline-variant/20 pb-1">
                <h3 className="font-headline-sm text-headline-sm text-primary flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px]">tune</span>
                  <span>Preferences & Notes</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-base">
                <div className="md:col-span-2">
                  <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                    Preferred Contact Method
                  </label>
                  <select
                    value={preferredContact}
                    onChange={(e) =>
                      setPreferredContact(
                        e.target.value as 'Email & SMS' | 'Email Only' | 'SMS Text Only' | 'Phone Call'
                      )
                    }
                    className="w-full h-9 px-space-base rounded bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary"
                  >
                    <option value="Email & SMS">Email & SMS</option>
                    <option value="Email Only">Email Only</option>
                    <option value="SMS Text Only">SMS Text Only</option>
                    <option value="Phone Call">Phone Call</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                    Customer Internal Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-space-base rounded bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary"
                    rows={3}
                  />
                </div>
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
              {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
