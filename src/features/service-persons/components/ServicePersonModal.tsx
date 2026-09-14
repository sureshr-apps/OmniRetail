import React, { useState, useEffect } from 'react';
import {
  ServicePerson,
  ServicePersonScope,
  CreateServicePersonInput,
  UpdateServicePersonInput,
} from '../types';
import { formatServicePersonCode } from '../utils/formatServicePersonCode';
import {
  formatIndianPhone,
  isValidIndianPhone,
} from '../utils/formFormats';

interface ServicePersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: CreateServicePersonInput | UpdateServicePersonInput) => Promise<void>;
  personToEdit: ServicePerson | null;
  availableOutlets: { id: string; name: string }[];
  specializations: string[];
}

export function ServicePersonModal({
  isOpen,
  onClose,
  onSubmit,
  personToEdit,
  availableOutlets,
  specializations,
}: ServicePersonModalProps) {
  const isEditing = !!personToEdit;

  // Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [specialization, setSpecialization] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState(4);
  const [notes, setNotes] = useState('');

  const [assignmentScope, setAssignmentScope] = useState<ServicePersonScope>('Entire Organization');
  const [selectedOutletName, setSelectedOutletName] = useState('');

  // Errors & Loading
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Initialize or reset form when modal opens or personToEdit changes
  useEffect(() => {
    if (personToEdit) {
      setFirstName(personToEdit.firstName);
      setLastName(personToEdit.lastName);
      setPhone(formatIndianPhone(personToEdit.phone));
      setEmail(personToEdit.email);
      setAddress(personToEdit.address || '');
      setCity(personToEdit.city || '');
      setPostalCode(personToEdit.postalCode || '');
      setSpecialization(personToEdit.specialization || '');
      setYearsOfExperience(personToEdit.yearsOfExperience ?? 4);
      setNotes(personToEdit.notes || '');
      setAssignmentScope(personToEdit.assignmentScope);
      setSelectedOutletName(personToEdit.outletName && personToEdit.outletName !== 'Organization-wide' ? personToEdit.outletName : (availableOutlets[0]?.name || ''));
    } else {
      setFirstName('');
      setLastName('');
      setPhone('');
      setEmail('');
      setAddress('');
      setCity('');
      setPostalCode('');
      setSpecialization('');
      setYearsOfExperience(4);
      setNotes('');
      setAssignmentScope('Entire Organization');
      setSelectedOutletName(availableOutlets[0]?.name || '');
    }
    setErrors({});
    setShowSuccess(false);
  }, [personToEdit, isOpen, availableOutlets, specializations]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!phone.trim()) newErrors.phone = 'Phone number is required.';
    else if (!isValidIndianPhone(phone)) newErrors.phone = 'Enter a valid Indian phone number.';
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (assignmentScope === 'Specific Outlet' && !selectedOutletName) {
      newErrors.outlet = 'Please select an assigned outlet.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const outletMatch = availableOutlets.find((o) => o.name === selectedOutletName);

      const payload = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        address: address.trim() || undefined,
        city: city.trim() || undefined,
        postalCode: postalCode.trim() || undefined,
        specialization: specialization.trim() || undefined,
        yearsOfExperience: Number(yearsOfExperience),
        notes: notes.trim() || undefined,
        assignmentScope,
        outletId: assignmentScope === 'Specific Outlet' ? (outletMatch?.id || 'out-1') : undefined,
        outletName: assignmentScope === 'Specific Outlet' ? selectedOutletName : 'Organization-wide',
      };

      await onSubmit(payload);
      setShowSuccess(true);
      setTimeout(() => {
        setIsSubmitting(false);
        onClose();
      }, 700);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-space-lg">
      <div className="bg-surface-container-lowest rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 border border-outline-variant/30">
        {/* Modal Header */}
        <div className="px-space-lg py-space-base border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-low shrink-0">
          <div className="flex items-center gap-space-sm">
            <span
              className="material-symbols-outlined text-primary text-[20px]"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              badge
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              {isEditing
                ? `Edit Service Person (${formatServicePersonCode(personToEdit.servicePersonCode)})`
                : 'Add New Service Person'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body (Scrollable Form Sections) */}
        <div className="flex-1 overflow-y-auto p-space-lg space-y-space-2xl">
          <form id="servicePersonForm" onSubmit={handleSubmit} className="space-y-space-2xl">
            {/* Section 1: Personal Information */}
            <div className="space-y-space-base">
              <h4 className="font-headline-sm text-headline-sm text-primary flex items-center gap-2 pb-1 border-b border-outline-variant/20">
                <span className="material-symbols-outlined text-[18px]">person</span>
                <span>1. Personal Information</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-base">
                {isEditing && (
                  <div>
                    <label className="block font-micro-label text-micro-label uppercase text-on-surface-variant mb-1">
                      Service Person Code
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={formatServicePersonCode(personToEdit.servicePersonCode)}
                      className="w-full h-9 px-space-base rounded-xl bg-surface-container-high border border-outline-variant/40 font-body-mono-num text-caption text-on-surface-variant cursor-not-allowed"
                    />
                  </div>
                )}
                <div>
                  <label className="block font-micro-label text-micro-label uppercase text-on-surface-variant mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Jonathan"
                    className={`w-full h-9 px-space-base rounded-xl bg-surface-container-low border ${
                      errors.firstName ? 'border-error' : 'border-outline-variant/50'
                    } font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary`}
                  />
                  {errors.firstName && (
                    <span className="text-error text-caption mt-0.5 block">{errors.firstName}</span>
                  )}
                </div>
                <div>
                  <label className="block font-micro-label text-micro-label uppercase text-on-surface-variant mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Brooks"
                    className={`w-full h-9 px-space-base rounded-xl bg-surface-container-low border ${
                      errors.lastName ? 'border-error' : 'border-outline-variant/50'
                    } font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary`}
                  />
                  {errors.lastName && (
                    <span className="text-error text-caption mt-0.5 block">{errors.lastName}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-base">
                <div>
                  <label className="block font-micro-label text-micro-label uppercase text-on-surface-variant mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(formatIndianPhone(e.target.value))}
                    inputMode="tel"
                    placeholder="+91 98765 43210"
                    className={`w-full h-9 px-space-base rounded-xl bg-surface-container-low border ${
                      errors.phone ? 'border-error' : 'border-outline-variant/50'
                    } font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary`}
                  />
                  {errors.phone && (
                    <span className="text-error text-caption mt-0.5 block">{errors.phone}</span>
                  )}
                </div>
                <div>
                  <label className="block font-micro-label text-micro-label uppercase text-on-surface-variant mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="j.brooks@omnitrade.internal"
                    className={`w-full h-9 px-space-base rounded-xl bg-surface-container-low border ${
                      errors.email ? 'border-error' : 'border-outline-variant/50'
                    } font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary`}
                  />
                  {errors.email && (
                    <span className="text-error text-caption mt-0.5 block">{errors.email}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-space-base">
                <div className="md:col-span-2">
                  <label className="block font-micro-label text-micro-label uppercase text-on-surface-variant mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Retail Parkway, Suite 400"
                    className="w-full h-9 px-space-base rounded-xl bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-micro-label text-micro-label uppercase text-on-surface-variant mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                    className="w-full h-9 px-space-base rounded-xl bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-micro-label text-micro-label uppercase text-on-surface-variant mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Enter postal code"
                    className="w-full h-9 px-space-base rounded-xl bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Professional Information */}
            <div className="space-y-space-base">
              <h4 className="font-headline-sm text-headline-sm text-primary flex items-center gap-2 pb-1 border-b border-outline-variant/20">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>2. Professional Information</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-base">
                <div>
                  <label className="block font-micro-label text-micro-label uppercase text-on-surface-variant mb-1">
                    Specialization
                  </label>
                  <input
                    type="text"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    list="service-person-specializations"
                    placeholder="Enter or select a specialization"
                    className="w-full h-9 px-space-base rounded-xl bg-surface-container-low border border-outline-variant/50 font-caption text-caption text-on-surface focus:outline-none focus:border-primary"
                  />
                  <datalist id="service-person-specializations">
                    {specializations.map((option) => <option key={option} value={option} />)}
                  </datalist>
                </div>
                <div>
                  <label className="block font-micro-label text-micro-label uppercase text-on-surface-variant mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(Number(e.target.value))}
                    className="w-full h-9 px-space-base rounded-xl bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block font-micro-label text-micro-label uppercase text-on-surface-variant mb-1">
                  Service Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Special requirements, working hours, or gear allocation..."
                  className="w-full p-space-base rounded-xl bg-surface-container-low border border-outline-variant/50 font-body-default text-body-default text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Section 3: Organization and Outlet Assignment */}
            <div className="space-y-space-base">
              <h4 className="font-headline-sm text-headline-sm text-primary flex items-center gap-2 pb-1 border-b border-outline-variant/20">
                <span className="material-symbols-outlined text-[18px]">domain</span>
                <span>3. Organization &amp; Outlet Assignment</span>
              </h4>

              <div className="space-y-2">
                <label className="flex items-center gap-space-sm cursor-pointer p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                  <input
                    type="radio"
                    name="assignmentScope"
                    checked={assignmentScope === 'Entire Organization'}
                    onChange={() => setAssignmentScope('Entire Organization')}
                    className="text-primary focus:ring-primary"
                  />
                  <div>
                    <div className="font-body-medium text-body-medium text-on-surface font-semibold">
                      Entire Organization
                    </div>
                    <div className="font-caption text-caption text-on-surface-variant">
                      Service person can be dispatched to any retail outlet or regional hub.
                    </div>
                  </div>
                </label>

                <label className="flex items-center gap-space-sm cursor-pointer p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                  <input
                    type="radio"
                    name="assignmentScope"
                    checked={assignmentScope === 'Specific Outlet'}
                    onChange={() => setAssignmentScope('Specific Outlet')}
                    className="text-primary focus:ring-primary"
                  />
                  <div>
                    <div className="font-body-medium text-body-medium text-on-surface font-semibold">
                      Specific Outlet
                    </div>
                    <div className="font-caption text-caption text-on-surface-variant">
                      Restrict dispatch eligibility to selected retail locations only.
                    </div>
                  </div>
                </label>
              </div>

              {/* Outlet Dropdown when Specific Outlet is chosen */}
              {assignmentScope === 'Specific Outlet' && (
                <div className="pl-6 pt-2 space-y-1.5 animate-in fade-in duration-150">
                  <label className="block font-micro-label text-micro-label uppercase text-on-surface-variant">
                    Select Applicable Outlet:
                  </label>
                  <select
                    value={selectedOutletName}
                    onChange={(e) => setSelectedOutletName(e.target.value)}
                    className={`w-full max-w-md h-9 px-space-base rounded-xl bg-surface-container-low border ${
                      errors.outlet ? 'border-error' : 'border-outline-variant/50'
                    } font-caption text-caption text-on-surface focus:outline-none focus:border-primary`}
                  >
                    <option value="">-- Choose Outlet --</option>
                    {availableOutlets.map((outlet) => (
                      <option key={outlet.id} value={outlet.name}>
                        {outlet.name}
                      </option>
                    ))}
                  </select>
                  {errors.outlet && (
                    <span className="text-error text-caption mt-0.5 block">{errors.outlet}</span>
                  )}
                </div>
              )}
            </div>

            {/* Success Alert Banner */}
            {showSuccess && (
              <div className="p-space-base rounded-xl bg-emerald-100 text-emerald-900 flex items-center gap-space-base animate-in fade-in duration-150">
                <span className="material-symbols-outlined text-[20px] text-emerald-700">check_circle</span>
                <div className="text-caption font-medium">
                  Service person successfully {isEditing ? 'updated' : 'registered and assigned to dispatch queue'}.
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Modal Footer */}
        <div className="px-space-lg py-space-base bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="h-9 px-space-lg rounded-xl border border-outline-variant/50 bg-surface hover:bg-surface-container-high font-body-medium text-body-medium text-on-surface transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="servicePersonForm"
            disabled={isSubmitting}
            className="h-9 px-space-lg rounded-xl bg-primary hover:bg-primary-container font-body-medium text-body-medium text-on-primary transition-colors flex items-center gap-space-xs shadow-sm disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isSubmitting ? 'sync' : 'check'}
            </span>
            <span>
              {isSubmitting
                ? 'Saving...'
                : isEditing
                ? 'Save Changes'
                : 'Create Service Person'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
