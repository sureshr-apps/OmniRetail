import React, { useState, useEffect } from 'react';
import { CreateCustomerInput, CustomerType } from '../types';
import { parseCustomerDate } from '../utils/date';

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: CreateCustomerInput) => Promise<void>;
}

export function AddCustomerModal({ isOpen, onClose, onSubmit }: AddCustomerModalProps) {
  const [type, setType] = useState<CustomerType>('Individual');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');

  // Address
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  // Business & Tax
  const [taxId, setTaxId] = useState('');
  const [creditLimit, setCreditLimit] = useState<string>('5000');

  const [notes, setNotes] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [documentValue, setDocumentValue] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setErrors({});
      setName('');
      setPhone('');
      setEmail('');
      setDateOfBirth('');
      setGender('');
      setAddress('');
      setCity('');
      setState('');
      setPostalCode('');
      setCountry('');
      setTaxId('');
      setCreditLimit(type === 'Business' ? '10000' : '2500');
      setNotes('');
      setDocumentType('');
      setDocumentValue('');
    }
  }, [isOpen, type]);

  if (!isOpen) return null;

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
      errs.email = 'Please provide a valid email format (e.g. name@domain.com)';
    }
    if (!city.trim()) errs.city = 'City is required';
    if (!state.trim()) errs.state = 'State is required';
    if (dateOfBirth.trim() && !parseCustomerDate(dateOfBirth)) {
      errs.dateOfBirth = 'Use a valid date in DD/MM/YYYY format';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await onSubmit({
        type,
        name,
        phone,
        email,
        dateOfBirth: parseCustomerDate(dateOfBirth),
        gender: gender && gender !== 'Select Gender' ? gender : undefined,
        address: address || undefined,
        city,
        state,
        postalCode: postalCode || undefined,
        country,
        taxId: taxId || undefined,
        creditLimit: creditLimit ? parseFloat(creditLimit) : undefined,
        notes: notes || undefined,
        documentType: documentType || undefined,
        documentValue: documentValue || undefined,
      });
      onClose();
    } catch (err) {
      console.error('Error creating customer:', err);
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
              <span className="material-symbols-outlined text-[18px]">person_add</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">
                Add New Customer Profile
              </h2>
              <p className="font-caption text-caption text-on-surface-variant">
                Register a new individual or business wholesale relationship.
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
                        name="cust-type"
                        type="radio"
                      />
                      <span className="font-body-default text-body-default text-on-surface">Individual</span>
                    </label>
                    <label className="flex items-center gap-space-xs cursor-pointer">
                      <input
                        checked={type === 'Business'}
                        onChange={() => setType('Business')}
                        className="text-primary focus:ring-primary cursor-pointer"
                        name="cust-type"
                        type="radio"
                      />
                      <span className="font-body-default text-body-default text-on-surface">Business</span>
                    </label>
                  </div>
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
                    placeholder="e.g. Jonathan Sterling or Sterling Apparel Co."
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
                    placeholder="+91 98765 43210"
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
                    placeholder="customer@domain.com"
                    type="email"
                  />
                  {errors.email && <p className="text-[11px] text-error mt-0.5">{errors.email}</p>}
                </div>
                <div>
                  <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                    Date of Birth
                  </label>
                  <input
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full h-9 px-space-base rounded bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary"
                    placeholder="DD/MM/YYYY"
                    inputMode="numeric"
                    type="text"
                  />
                  {errors.dateOfBirth && <p className="text-[11px] text-error mt-0.5">{errors.dateOfBirth}</p>}
                </div>
                <div>
                  <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full h-9 px-space-base rounded bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary"
                  >
                    <option value="">Select Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Non-Binary / Other">Non-Binary / Other</option>
                    <option value="Prefer Not to Say">Prefer Not to Say</option>
                  </select>
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
                    placeholder="123 Retail Ave, Suite 400"
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
                    placeholder="Mumbai"
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
                    placeholder="Maharashtra"
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
                    placeholder="78701"
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
                    placeholder="India"
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
                    GST Number
                  </label>
                  <input
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    className="w-full h-9 px-space-base rounded bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary"
                    placeholder="22AAAAA0000A1Z5"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                    Credit Limit (₹)
                  </label>
                  <input
                    value={creditLimit}
                    onChange={(e) => setCreditLimit(e.target.value)}
                    className="w-full h-9 px-space-base rounded bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary"
                    placeholder="5000.00"
                    type="number"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Documents & Notes */}
            <div className="space-y-space-base">
              <div className="border-b border-outline-variant/20 pb-1">
                <h3 className="font-headline-sm text-headline-sm text-primary flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px]">badge</span>
                  <span>Documents & Notes</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-base">
                <div>
                  <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                    Document Type
                  </label>
                  <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className="w-full h-9 px-space-base rounded bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary"
                  >
                    <option value="">Select Document</option>
                    <option value="Aadhaar">Aadhaar</option>
                    <option value="PAN">PAN</option>
                    <option value="Driving Licence">Driving Licence</option>
                    <option value="Passport">Passport</option>
                    <option value="Voter ID">Voter ID</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                    Document Value
                  </label>
                  <input
                    value={documentValue}
                    onChange={(e) => setDocumentValue(e.target.value)}
                    className="w-full h-9 px-space-base rounded bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary"
                    placeholder="Enter document number"
                    type="text"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-caption text-caption text-on-surface font-semibold mb-1">
                    Customer Internal Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-space-base rounded bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary"
                    placeholder="Add specific delivery preferences, sizing notes, or VIP tier highlights..."
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
              {isSubmitting ? 'Creating...' : 'Create Customer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
