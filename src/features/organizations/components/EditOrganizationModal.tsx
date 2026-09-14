import React, { useState, useEffect } from 'react';
import { Building2, AlertCircle, Lock } from 'lucide-react';
import { Modal } from '@/shared/components/Modal';
import { Input } from '@/shared/components/Input';
import { Label } from '@/shared/components/Label';
import { Button } from '@/shared/components/Button';
import { Select } from '@/shared/components/Select';
import { Organization, UpdateOrganizationInput } from '../types';
import { organizationService } from '../services/OrganizationService';

export interface EditOrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  organization: Organization;
  onSuccess: (updatedOrg: Organization) => void | Promise<void>;
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

export function EditOrganizationModal({
  isOpen,
  onClose,
  organization,
  onSuccess,
}: EditOrganizationModalProps) {
  const [form, setForm] = useState<FormState>({
    name: organization.name,
    legalEntityName: organization.legalEntityName,
    taxId: organization.taxId,
    primaryContactName: organization.contactInfo.primaryContactName || organization.primaryAdmin?.name || '',
    email: organization.contactInfo.email || organization.primaryAdmin?.email || '',
    phone: organization.contactInfo.phone || organization.primaryAdmin?.phone || '',
    address: organization.contactInfo.address || '',
    city: organization.contactInfo.city || '',
    state: organization.contactInfo.state || '',
    timezone: organization.timezone || 'Asia/Kolkata (IST)',
    currency: organization.currency || 'INR (₹)',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setForm({
        name: organization.name,
        legalEntityName: organization.legalEntityName,
        taxId: organization.taxId,
        primaryContactName: organization.contactInfo.primaryContactName || organization.primaryAdmin?.name || '',
        email: organization.contactInfo.email || organization.primaryAdmin?.email || '',
        phone: organization.contactInfo.phone || organization.primaryAdmin?.phone || '',
        address: organization.contactInfo.address || '',
        city: organization.contactInfo.city || '',
        state: organization.contactInfo.state || '',
        timezone: organization.timezone || 'Asia/Kolkata (IST)',
        currency: organization.currency || 'INR (₹)',
      });
      setErrors({});
      setSubmitError(null);
    }
  }, [isOpen, organization]);

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
      const input: UpdateOrganizationInput = {
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

      const updated = await organizationService.updateOrganization(organization.id, input);
      await onSuccess(updated);
      onClose();
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to update organization details.');
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
      onClose={() => !isSubmitting && onClose()}
      title="Edit Organization Profile"
      description="Modify registration and business operational settings. System Organization ID remains permanent and immutable."
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {submitError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-md flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{submitError}</span>
          </div>
        )}

        {/* Immutable Organization ID Header Banner */}
        <div className="bg-surface-subdued px-3.5 py-2.5 rounded-md border border-border-structural/70 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-text-muted" />
            <span className="text-text-secondary font-medium">Organization ID:</span>
            <span className="font-mono font-bold text-text-primary px-1.5 py-0.5 rounded bg-surface-elevated border border-border-structural">
              {organization.organizationCode || '—'}
            </span>
          </div>
          <span className="text-[11px] text-text-muted">System identifier (Immutable)</span>
        </div>

        {/* Organization Details */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-text-primary uppercase tracking-wider mb-2.5 pb-1 border-b border-border-subdued">
            <Building2 className="w-3.5 h-3.5 text-primary" />
            <span>Business Entity Details</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <Label htmlFor="edit-org-name">
                Business / Organization Name <span className="text-critical">*</span>
              </Label>
              <Input
                id="edit-org-name"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="e.g., Punarva Fashion Hub"
                error={!!errors.name}
                disabled={isSubmitting}
              />
              {errors.name && <p className="text-[11px] text-critical mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="edit-legal-name">Legal Entity Name</Label>
              <Input
                id="edit-legal-name"
                value={form.legalEntityName}
                onChange={(e) => updateField('legalEntityName', e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <Label htmlFor="edit-tax-id">Tax Identification / GSTIN</Label>
              <Input
                id="edit-tax-id"
                value={form.taxId}
                onChange={(e) => updateField('taxId', e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        {/* Primary Contact */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-text-primary uppercase tracking-wider mb-2.5 pb-1 border-b border-border-subdued">
            <span>Primary Operational Contact</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <Label htmlFor="edit-contact-name">
                Primary Contact Name <span className="text-critical">*</span>
              </Label>
              <Input
                id="edit-contact-name"
                value={form.primaryContactName}
                onChange={(e) => updateField('primaryContactName', e.target.value)}
                error={!!errors.primaryContactName}
                disabled={isSubmitting}
              />
              {errors.primaryContactName && (
                <p className="text-[11px] text-critical mt-1">{errors.primaryContactName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="edit-contact-email">
                Contact Email Address <span className="text-critical">*</span>
              </Label>
              <Input
                id="edit-contact-email"
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                error={!!errors.email}
                disabled={isSubmitting}
              />
              {errors.email && <p className="text-[11px] text-critical mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="edit-contact-phone">
                Contact Phone Number <span className="text-critical">*</span>
              </Label>
              <Input
                id="edit-contact-phone"
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                error={!!errors.phone}
                disabled={isSubmitting}
              />
              {errors.phone && <p className="text-[11px] text-critical mt-1">{errors.phone}</p>}
            </div>
          </div>
        </div>

        {/* Address and Localization */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-text-primary uppercase tracking-wider mb-2.5 pb-1 border-b border-border-subdued">
            <span>Location & Regional Configuration</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-3">
              <Label htmlFor="edit-address">Headquarters Address</Label>
              <Input
                id="edit-address"
                value={form.address}
                onChange={(e) => updateField('address', e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <Label htmlFor="edit-city">City</Label>
              <Input
                id="edit-city"
                value={form.city}
                onChange={(e) => updateField('city', e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <Label htmlFor="edit-state">State / Province</Label>
              <Input
                id="edit-state"
                value={form.state}
                onChange={(e) => updateField('state', e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <Label htmlFor="edit-currency">Base Currency</Label>
              <Select
                id="edit-currency"
                options={CURRENCY_OPTIONS}
                value={form.currency}
                onChange={(e) => updateField('currency', e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div className="sm:col-span-3">
              <Label htmlFor="edit-timezone">Store Timezone</Label>
              <Select
                id="edit-timezone"
                options={TIMEZONE_OPTIONS}
                value={form.timezone}
                onChange={(e) => updateField('timezone', e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border-subdued">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
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
            {isSubmitting ? 'Saving Changes...' : 'Save Organization Changes'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
