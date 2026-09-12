import React, { useState } from 'react';
import { UserCheck, AlertCircle, Info, Shield } from 'lucide-react';
import { Modal } from '@/shared/components/Modal';
import { Input } from '@/shared/components/Input';
import { Label } from '@/shared/components/Label';
import { Button } from '@/shared/components/Button';
import { CreateAdminInput, OrganizationAdministrator } from '../types';
import { organizationAdminService } from '../services/OrganizationAdminService';

export interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizationId: string;
  organizationName: string;
  onSuccess: (newAdmin: OrganizationAdministrator) => void;
}

interface FormState {
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
}

const INITIAL_FORM: FormState = {
  name: '',
  username: '',
  email: '',
  phone: '',
};

export function AddAdminModal({
  isOpen,
  onClose,
  organizationId,
  organizationName,
  onSuccess,
}: AddAdminModalProps) {
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
      errs.name = 'Name is required.';
    }

    if (!form.username.trim()) {
      errs.username = 'System Username is required.';
    } else if (!/^[a-zA-Z0-9._-]{3,24}$/.test(form.username.trim())) {
      errs.username = 'Username must be 3-24 characters (letters, numbers, dot, underscore, hyphen).';
    }

    if (!form.email.trim()) {
      errs.email = 'Email Address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!form.phone.trim()) {
      errs.phone = 'Contact Phone Number is required.';
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
      const input: CreateAdminInput = {
        name: form.name.trim(),
        username: form.username.trim().toLowerCase(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      };

      const created = await organizationAdminService.createAdministrator(organizationId, input);
      resetForm();
      onSuccess(created);
      onClose();
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to create administrator. Please try again.');
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

  // Auto-suggest username from email if username is empty
  const handleEmailBlur = () => {
    if (!form.username && form.email) {
      const suggested = form.email.split('@')[0].replace(/[^a-zA-Z0-9._-]/g, '');
      if (suggested) {
        updateField('username', suggested);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Organization Administrator"
      description={`Provision a store manager or administrator login scoped to ${organizationName}.`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {submitError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-md flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{submitError}</span>
          </div>
        )}

        {/* Tenant Scope Callout */}
        <div className="bg-surface-subdued p-3 rounded-md border border-border-structural/70 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-text-secondary">Assigned Tenant Scope:</span>
            <span className="font-semibold text-text-primary">{organizationName}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <Label htmlFor="admin-name">
              Name <span className="text-critical">*</span>
            </Label>
            <Input
              id="admin-name"
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="e.g., Rohan Mehta"
              error={!!errors.name}
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-[11px] text-critical mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="admin-email">
                Email Address <span className="text-critical">*</span>
              </Label>
              <Input
                id="admin-email"
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                onBlur={handleEmailBlur}
                placeholder="e.g., rohan@punarva.com"
                error={!!errors.email}
                disabled={isSubmitting}
              />
              {errors.email && <p className="text-[11px] text-critical mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="admin-username">
                System Username <span className="text-critical">*</span>
              </Label>
              <Input
                id="admin-username"
                value={form.username}
                onChange={(e) => updateField('username', e.target.value)}
                placeholder="e.g., rmehta"
                error={!!errors.username}
                disabled={isSubmitting}
              />
              {errors.username && (
                <p className="text-[11px] text-critical mt-1">{errors.username}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="admin-phone">
              Mobile Contact Number <span className="text-critical">*</span>
            </Label>
            <Input
              id="admin-phone"
              value={form.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="e.g., +91 98201 99182"
              error={!!errors.phone}
              disabled={isSubmitting}
            />
            {errors.phone && <p className="text-[11px] text-critical mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Security Credential Setup Note */}
        <div className="bg-primary/5 p-3 rounded-md border border-primary/20 flex items-start gap-2.5 text-xs text-text-secondary">
          <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div className="text-[11px] leading-relaxed">
            <p className="font-semibold text-text-primary">Credential Activation</p>
            <p className="text-text-muted mt-0.5">
              Upon administrator creation, a secure activation link with temporary credential setup will be delivered to the provided email address. No plaintext passwords are generated or exposed in this interface.
            </p>
          </div>
        </div>

        {/* Actions */}
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
            {isSubmitting ? 'Creating Administrator...' : 'Create Administrator'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
