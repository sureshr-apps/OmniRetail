import React, { useState, useEffect } from 'react';
import { Outlet, CreateOutletInput, UpdateOutletInput, OutletStatus } from '../types';

interface OutletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitCreate: (input: CreateOutletInput) => Promise<void>;
  onSubmitUpdate: (id: string, input: UpdateOutletInput) => Promise<void>;
  outletToEdit: Outlet | null;
  generatedOutletCode: string;
}

interface FormErrors {
  name?: string;
  contactPerson?: string;
  phone?: string;
  address?: string;
  city?: string;
  email?: string;
  registerCount?: string;
}

export function OutletModal({
  isOpen,
  onClose,
  onSubmitCreate,
  onSubmitUpdate,
  outletToEdit,
  generatedOutletCode,
}: OutletModalProps) {
  const isEditing = Boolean(outletToEdit);

  // Form Fields
  const [outletCode, setOutletCode] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('Standard Retail');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<OutletStatus>('Active');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Austin');
  const [state, setState] = useState('Texas');
  const [postalCode, setPostalCode] = useState('78701');
  const [country, setCountry] = useState('United States');
  const [timezone, setTimezone] = useState('America/Chicago (CST/CDT)');
  const [currency, setCurrency] = useState('USD ($)');
  const [registerCount, setRegisterCount] = useState<number>(2);

  // Validation state
  const [errors, setErrors] = useState<FormErrors>({});
  const [showValidationSummary, setShowValidationSummary] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize or reset form on open/edit change
  useEffect(() => {
    if (isOpen) {
      if (outletToEdit) {
        setOutletCode(outletToEdit.outletCode);
        setName(outletToEdit.name);
        setType(outletToEdit.type || 'Standard Retail');
        setDescription(outletToEdit.description || '');
        setStatus(outletToEdit.status);
        setContactPerson(outletToEdit.contactPerson);
        setEmail(outletToEdit.contactEmail);
        setPhone(outletToEdit.phone);
        setAddress(outletToEdit.address || '');
        setCity(outletToEdit.city);
        setState(outletToEdit.state || 'Texas');
        setPostalCode(outletToEdit.postalCode || '');
        setCountry(outletToEdit.country || 'United States');
        setTimezone(outletToEdit.timezone || 'America/Chicago (CST/CDT)');
        setCurrency(outletToEdit.currency || 'USD ($)');
        setRegisterCount(outletToEdit.registerCount);
      } else {
        setOutletCode(generatedOutletCode);
        setName('');
        setType('Standard Retail');
        setDescription('');
        setStatus('Active');
        setContactPerson('');
        setEmail('');
        setPhone('');
        setAddress('');
        setCity('Austin');
        setState('Texas');
        setPostalCode('78701');
        setCountry('United States');
        setTimezone('America/Chicago (CST/CDT)');
        setCurrency('USD ($)');
        setRegisterCount(2);
      }
      setErrors({});
      setShowValidationSummary(false);
      setIsSubmitting(false);
    }
  }, [isOpen, outletToEdit, generatedOutletCode]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!name.trim()) {
      errs.name = 'Outlet Name is required.';
    }

    if (!contactPerson.trim()) {
      errs.contactPerson = 'Contact Person is required.';
    }

    if (!phone.trim()) {
      errs.phone = 'Phone number is required for dispatch & alerts.';
    }

    if (!address.trim()) {
      errs.address = 'Street address is required for outlet operations.';
    }

    if (!city.trim()) {
      errs.city = 'City is required for regional grouping.';
    }

    if (email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errs.email = 'Please enter a valid email address.';
      }
    }

    if (registerCount < 0) {
      errs.registerCount = 'Register count must be 0 or greater.';
    }

    setErrors(errs);
    const isValid = Object.keys(errs).length === 0;
    setShowValidationSummary(!isValid);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      if (isEditing && outletToEdit) {
        const updateInput: UpdateOutletInput = {
          name: name.trim(),
          type,
          description: description.trim() || `${type} · ${registerCount} Registers`,
          status,
          contactPerson: contactPerson.trim(),
          contactEmail: email.trim(),
          phone: phone.trim(),
          address: address.trim(),
          city: city.trim(),
          state: state.trim(),
          postalCode: postalCode.trim(),
          country: country.trim(),
          timezone,
          currency,
          registerCount,
        };
        await onSubmitUpdate(outletToEdit.id, updateInput);
      } else {
        const createInput: CreateOutletInput = {
          name: name.trim(),
          type,
          description: description.trim() || `${type} · ${registerCount} Registers`,
          status,
          contactPerson: contactPerson.trim(),
          contactEmail: email.trim(),
          phone: phone.trim(),
          address: address.trim(),
          city: city.trim(),
          state: state.trim(),
          postalCode: postalCode.trim(),
          country: country.trim(),
          timezone,
          currency,
          registerCount,
        };
        await onSubmitCreate(createInput);
      }
      onClose();
    } catch (err) {
      console.error('Failed to submit outlet form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 select-none">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">add_business</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isEditing ? `Edit Outlet (${outletCode})` : 'Add Outlet'}
              </h3>
              <p className="text-xs text-slate-500">
                Configure new branch store, POS licensing and local currency settings.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto px-6 py-5 space-y-4 text-xs">
          {/* Validation Summary Box */}
          {showValidationSummary && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-md text-rose-800 text-[11px] animate-in fade-in">
              <div className="font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">warning</span>
                <span>Please resolve the highlighted required fields:</span>
              </div>
              <ul className="list-disc list-inside mt-1 space-y-0.5 text-rose-700">
                {errors.name && <li>{errors.name}</li>}
                {errors.contactPerson && <li>{errors.contactPerson}</li>}
                {errors.phone && <li>{errors.phone}</li>}
                {errors.address && <li>{errors.address}</li>}
                {errors.city && <li>{errors.city}</li>}
                {errors.email && <li>{errors.email}</li>}
                {errors.registerCount && <li>{errors.registerCount}</li>}
              </ul>
            </div>
          )}

          {/* Section: System Code & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">
                Outlet Code <span className="text-slate-400 font-normal">(System Generated · Read Only)</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={outletCode}
                  readOnly
                  className="w-full pl-8 pr-8 py-2 bg-slate-100 border border-slate-200 rounded-md font-mono font-semibold text-teal-800 cursor-not-allowed text-xs"
                />
                <span className="material-symbols-outlined absolute left-2.5 top-2 text-teal-600 text-[16px]">
                  fingerprint
                </span>
                <span
                  className="material-symbols-outlined absolute right-2.5 top-2 text-emerald-600 text-[16px]"
                  title="Unique Code Validated"
                >
                  verified
                </span>
              </div>
              <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[12px]">check</span>
                Guaranteed unique across organization
              </span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Status <span className="text-rose-500">*</span>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as OutletStatus)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600 cursor-pointer"
              >
                <option value="Active">Active (Default)</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Section: Outlet Name & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">
                Outlet Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                placeholder="e.g. Downtown Flagship #04, Uptown Boutique"
                className={`w-full px-3 py-2 bg-white border rounded-md text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                  errors.name ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                }`}
              />
              {errors.name && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">error</span>
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Store Format / Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 cursor-pointer"
              >
                <option value="Flagship">Flagship Store</option>
                <option value="Mall Kiosk / Annex">Mall Kiosk / Annex</option>
                <option value="High-Street Outlet">High-Street Outlet</option>
                <option value="Regional Flagship">Regional Flagship</option>
                <option value="Seasonal Pop-up">Seasonal Pop-up</option>
                <option value="Warehouse Store">Warehouse Store</option>
                <option value="Standard Retail">Standard Retail</option>
              </select>
            </div>
          </div>

          {/* Section: Description / Secondary note */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Operational Description <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Main Retail & VIP Showroom, Mall Annex Kiosk"
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          {/* Section: Contact Person & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Contact Person <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={contactPerson}
                onChange={(e) => {
                  setContactPerson(e.target.value);
                  if (errors.contactPerson) setErrors({ ...errors, contactPerson: undefined });
                }}
                placeholder="Store Manager or Supervisor Name"
                className={`w-full px-3 py-2 bg-white border rounded-md text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                  errors.contactPerson ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                }`}
              />
              {errors.contactPerson && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">error</span>
                  {errors.contactPerson}
                </p>
              )}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                placeholder="outlet.manager@punarvafashion.com"
                className={`w-full px-3 py-2 bg-white border rounded-md text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                  errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                }`}
              />
              {errors.email && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">error</span>
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Section: Phone & Street Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors({ ...errors, phone: undefined });
                }}
                placeholder="+1 (512) 555-0142"
                className={`w-full px-3 py-2 bg-white border rounded-md text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                  errors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                }`}
              />
              {errors.phone && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">error</span>
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Street Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (errors.address) setErrors({ ...errors, address: undefined });
                }}
                placeholder="Building, Suite, Street name"
                className={`w-full px-3 py-2 bg-white border rounded-md text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                  errors.address ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                }`}
              />
              {errors.address && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">error</span>
                  {errors.address}
                </p>
              )}
            </div>
          </div>

          {/* Section: City, State, Postal Code, Country */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                City <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  if (errors.city) setErrors({ ...errors, city: undefined });
                }}
                placeholder="Austin"
                className={`w-full px-3 py-2 bg-white border rounded-md text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                  errors.city ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                }`}
              />
              {errors.city && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">error</span>
                  {errors.city}
                </p>
              )}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">State / Prov</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Texas"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Postal Code</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="78701"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="United States"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
          </div>

          {/* Section: Operational Setup: Register Count, Time Zone, Currency */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Register Count <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min={0}
                max={50}
                value={registerCount}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setRegisterCount(isNaN(val) ? 0 : val);
                  if (errors.registerCount) setErrors({ ...errors, registerCount: undefined });
                }}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Number of physical / cloud POS registers
              </span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Time Zone <span className="text-rose-500">*</span>
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 cursor-pointer"
              >
                <option value="America/Chicago (CST/CDT)">America/Chicago (CST / CDT)</option>
                <option value="America/New_York (EST/EDT)">America/New_York (EST / EDT)</option>
                <option value="America/Denver (MST/MDT)">America/Denver (MST / MDT)</option>
                <option value="America/Los_Angeles (PST/PDT)">America/Los_Angeles (PST / PDT)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Currency <span className="text-rose-500">*</span>
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 cursor-pointer"
              >
                <option value="USD ($)">USD - US Dollar ($)</option>
                <option value="CAD ($)">CAD - Canadian Dollar ($)</option>
                <option value="EUR (€)">EUR - Euro (€)</option>
                <option value="GBP (£)">GBP - British Pound (£)</option>
              </select>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-slate-300 rounded-md text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-md font-semibold text-xs shadow-sm transition-all flex items-center space-x-1.5 focus:ring-2 focus:ring-teal-500 cursor-pointer disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[16px]">save</span>
              <span>{isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Outlet'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
