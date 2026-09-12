import React, { useState } from 'react';
import { Building2, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { Modal } from '@/shared/components/Modal';
import { Input } from '@/shared/components/Input';
import { Label } from '@/shared/components/Label';
import { Button } from '@/shared/components/Button';
import { Select } from '@/shared/components/Select';
import { CreateOrganizationInput, Organization } from '../types';
import { organizationService } from '../services/OrganizationService';

export interface AddOrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (createdOrg: Organization) => void;
}

interface FormState {
  name: string;
  legalEntityName: string;
  taxId: string;
  primaryContactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  timezone: string;
  currency: string;
}

interface FormErrors {
  name?: string;
  primaryContactName?: string;
  email?: string;
  phone?: string;
}

const INITIAL_FORM: FormState = {
  name: '',
  legalEntityName: '',
  taxId: '',
  primaryContactName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  timezone: 'Asia/Kolkata (IST)',
  currency: 'INR (₹)',
};

const TIMEZONE_OPTIONS = [
  { value: 'Asia/Kolkata (IST)', label: 'Asia/Kolkata (IST) - UTC+05:30' },
  { value: 'America/Chicago (CST)', label: 'America/Chicago (CST) - UTC-06:00' },
  { value: 'America/New_York (EST)', label: 'America/New_York (EST) - UTC-05:00' },
  { value: 'Europe/London (GMT)', label: 'Europe/London (GMT) - UTC+00:00' },
  { value: 'Asia/Dubai (GST)', label: 'Asia/Dubai (GST) - UTC+04:00' },
  { value: 'Asia/Singapore (SGT)', label: 'Asia/Singapore (SGT) - UTC+08:00' },
];

const CURRENCY_OPTIONS = [
  { value: 'INR (₹)', label: 'INR (₹) - Indian Rupee' },
  { value: 'USD ($)', label: 'USD ($) - US Dollar' },
  { value: 'EUR (€)', label: 'EUR (€) - Euro' },
  { value: 'GBP (£)', label: 'GBP (£) - British Pound' },
  { value: 'AED (د.إ)', label: 'AED (د.إ) - UAE Dirham' },
];

export function AddOrganizationModal({ isOpen, onClose, onSuccess }: AddOrganizationModalProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setSubmitError(null);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!form.name.trim()) {
      errs.name = 'Business / Organization Name is required.';
    }

    if (!form.primaryContactName.trim()) {
      errs.primaryContactName = 'Primary Contact Name is required.';
    }

    if (!form.email.trim()) {
      errs.email = 'Contact Email Address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!form.phone.trim()) {
      errs.phone = 'Contact Phone Number is required.';
    } else if (!/^\+[1-9]\d{7,14}$/.test(form.phone.trim())) {
      errs.phone = 'Enter a valid international phone number, for example +919876543210.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const input: CreateOrganizationInput = {
        name: form.name.trim(),
        legalEntityName: form.legalEntityName.trim() || undefined,
        taxId: form.taxId.trim() || undefined,
        primaryContactName: form.primaryContactName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim() || undefined,
        city: form.city.trim() || undefined,
        state: form.state.trim() || undefined,
        timezone: form.timezone,
        currency: form.currency,
      };

      const createdOrg = await organizationService.createOrganization(input);
      resetForm();
      onSuccess(createdOrg);
      onClose();
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to create organization. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Organization"
      description="Register a new retail business tenant onto the OmniRetail platform. Organization ID is generated automatically."
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {submitError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-md flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{submitError}</span>
          </div>
        )}

        {/* Section: Organization Profile */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-text-primary uppercase tracking-wider mb-2.5 pb-1 border-b border-border-subdued">
            <Building2 className="w-3.5 h-3.5 text-primary" />
            <span>Organization Profile</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <Label htmlFor="org-name">
                Business / Organization Name <span className="text-critical">*</span>
              </Label>
              <Input
                id="org-name"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="e.g., Punarva Fashion Hub"
                error={!!errors.name}
                disabled={isSubmitting}
              />
              {errors.name && <p className="text-[11px] text-critical mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="legal-name">Legal Entity Name</Label>
              <Input
                id="legal-name"
                value={form.legalEntityName}
                onChange={(e) => updateField('legalEntityName', e.target.value)}
                placeholder="e.g., Punarva Retail Holdings Pvt Ltd"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <Label htmlFor="tax-id">Tax Identification / GSTIN / VAT</Label>
              <Input
                id="tax-id"
                value={form.taxId}
                onChange={(e) => updateField('taxId', e.target.value)}
                placeholder="e.g., GSTIN 27AABCP8821F1Z8"
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        {/* Section: Primary Operational Contact */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-text-primary uppercase tracking-wider mb-2.5 pb-1 border-b border-border-subdued">
            <span>Primary Operational Contact</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <Label htmlFor="contact-name">
                Primary Contact Name <span className="text-critical">*</span>
              </Label>
              <Input
                id="contact-name"
                value={form.primaryContactName}
                onChange={(e) => updateField('primaryContactName', e.target.value)}
                placeholder="e.g., Priya Patel"
                error={!!errors.primaryContactName}
                disabled={isSubmitting}
              />
              {errors.primaryContactName && (
                <p className="text-[11px] text-critical mt-1">{errors.primaryContactName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="contact-email">
                Contact Email Address <span className="text-critical">*</span>
              </Label>
              <Input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="e.g., priya@punarva.com"
                error={!!errors.email}
                disabled={isSubmitting}
              />
              {errors.email && <p className="text-[11px] text-critical mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="contact-phone">
                Contact Phone Number <span className="text-critical">*</span>
              </Label>
              <Input
                id="contact-phone"
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="e.g., +91 98201 44552"
                error={!!errors.phone}
                disabled={isSubmitting}
              />
              {errors.phone && <p className="text-[11px] text-critical mt-1">{errors.phone}</p>}
            </div>
          </div>
        </div>

        {/* Section: Location & Financial Settings */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-text-primary uppercase tracking-wider mb-2.5 pb-1 border-b border-border-subdued">
            <span>Location & Regional Settings</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-3">
              <Label htmlFor="headquarters-address">Headquarters Address</Label>
              <Input
                id="headquarters-address"
                value={form.address}
                onChange={(e) => updateField('address', e.target.value)}
                placeholder="e.g., 742 Brigade Road, 4th Floor"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={form.city}
                onChange={(e) => updateField('city', e.target.value)}
                placeholder="e.g., Bengaluru"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <Label htmlFor="state">State / Province</Label>
              <Input
                id="state"
                value={form.state}
                onChange={(e) => updateField('state', e.target.value)}
                placeholder="e.g., Karnataka"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <Label htmlFor="currency">Base Currency</Label>
              <Select
                id="currency"
                options={CURRENCY_OPTIONS}
                value={form.currency}
                onChange={(e) => updateField('currency', e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div className="sm:col-span-3">
              <Label htmlFor="timezone">Primary Store Timezone</Label>
              <Select
                id="timezone"
                options={TIMEZONE_OPTIONS}
                value={form.timezone}
                onChange={(e) => updateField('timezone', e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        {/* Auto ID Information Box */}
        <div className="bg-surface-subdued p-3 rounded-md border border-border-structural/60 flex items-start gap-2.5 text-xs text-text-secondary">
          <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-text-primary">System Identification & Setup</p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-text-muted">
              An immutable Organization ID (format: <span className="font-mono text-text-primary font-medium">ORG-XXXXX</span>) will be automatically generated. Administrator credentials and licensing tiers can be provisioned after organization onboarding.
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border-subdued">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-xs"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            className="text-xs"
          >
            {isSubmitting ? 'Creating Organization...' : 'Save & Create Organization'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
