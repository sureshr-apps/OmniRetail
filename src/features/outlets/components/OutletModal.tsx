import React, { useEffect, useState } from 'react';
import { Outlet, CreateOutletInput, UpdateOutletInput } from '../types';

interface OutletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitCreate: (input: CreateOutletInput) => Promise<void>;
  onSubmitUpdate: (id: string, input: UpdateOutletInput) => Promise<void>;
  outletToEdit: Outlet | null;
}

interface FormErrors {
  name?: string;
  contactPerson?: string;
  phone?: string;
  address?: string;
  email?: string;
}

export function OutletModal({ isOpen, onClose, onSubmitCreate, onSubmitUpdate, outletToEdit }: OutletModalProps) {
  const isEditing = Boolean(outletToEdit);
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [showValidationSummary, setShowValidationSummary] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setName(outletToEdit?.name ?? '');
    setContactPerson(outletToEdit?.contactPerson ?? '');
    setEmail(outletToEdit?.contactEmail ?? '');
    setPhone(outletToEdit?.phone ?? '');
    setAddress(outletToEdit?.address ?? '');
    setErrors({});
    setShowValidationSummary(false);
    setIsSubmitting(false);
  }, [isOpen, outletToEdit]);

  if (!isOpen) return null;

  const clearError = (key: keyof FormErrors) => {
    if (errors[key]) setErrors({ ...errors, [key]: undefined });
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!name.trim()) nextErrors.name = 'Outlet Name is required.';
    if (!contactPerson.trim()) nextErrors.contactPerson = 'Contact Person is required.';
    if (!phone.trim()) nextErrors.phone = 'Phone number is required for outlet operations.';
    if (!address.trim()) nextErrors.address = 'Street address is required for outlet operations.';
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    setErrors(nextErrors);
    setShowValidationSummary(Object.keys(nextErrors).length > 0);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const details = {
        name: name.trim(),
        contactPerson: contactPerson.trim(),
        contactEmail: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
      };
      if (isEditing && outletToEdit) await onSubmitUpdate(outletToEdit.id, details);
      else await onSubmitCreate(details);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (error?: string) => `w-full px-3 py-2 bg-white border rounded-md text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 ${error ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'}`;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 select-none">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">add_business</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{isEditing ? `Edit Outlet (${outletToEdit?.outletCode})` : 'Add Outlet'}</h3>
              <p className="text-xs text-slate-500">Add an Indian retail outlet. Currency is INR and time zone is IST.</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer" aria-label="Close">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto px-6 py-5 space-y-4 text-xs">
          {showValidationSummary && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-md text-rose-800 text-[11px]">
              <div className="font-bold flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">warning</span>Please resolve the highlighted fields:</div>
              <ul className="list-disc list-inside mt-1 space-y-0.5 text-rose-700">
                {Object.values(errors).map((error) => <li key={error}>{error}</li>)}
              </ul>
            </div>
          )}

          {isEditing && outletToEdit && (
            <div className="flex items-center justify-between rounded-md bg-slate-50 border border-slate-200 px-3 py-2">
              <div><span className="text-slate-400">Outlet ID</span><span className="ml-2 font-mono font-semibold text-teal-800">{outletToEdit.outletCode}</span></div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${outletToEdit.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-300'}`}>{outletToEdit.status}</span>
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Outlet Name <span className="text-rose-500">*</span></label>
            <input value={name} onChange={(e) => { setName(e.target.value); clearError('name'); }} placeholder="e.g. Indiranagar Store" className={fieldClass(errors.name)} />
            {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Contact Person <span className="text-rose-500">*</span></label>
              <input value={contactPerson} onChange={(e) => { setContactPerson(e.target.value); clearError('contactPerson'); }} placeholder="Store manager name" className={fieldClass(errors.contactPerson)} />
              {errors.contactPerson && <p className="text-[11px] text-rose-600 mt-1">{errors.contactPerson}</p>}
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
              <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); clearError('email'); }} placeholder="manager@company.in" className={fieldClass(errors.email)} />
              {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Phone Number <span className="text-rose-500">*</span></label>
              <input type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); clearError('phone'); }} placeholder="+91 98765 43210" className={fieldClass(errors.phone)} />
              {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Street Address <span className="text-rose-500">*</span></label>
              <input value={address} onChange={(e) => { setAddress(e.target.value); clearError('address'); }} placeholder="Building, street name" className={fieldClass(errors.address)} />
              {errors.address && <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-slate-300 rounded-md text-slate-700 font-semibold text-xs hover:bg-slate-50 cursor-pointer">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-md font-semibold text-xs shadow-sm flex items-center space-x-1.5 cursor-pointer disabled:opacity-50">
              <span className="material-symbols-outlined text-[16px]">save</span><span>{isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Outlet'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
