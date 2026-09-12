import React, { useState, useEffect } from 'react';
import { AlertCircle, Lock, UserCheck } from 'lucide-react';
import { Modal } from '@/shared/components/Modal';
import { Input } from '@/shared/components/Input';
import { Label } from '@/shared/components/Label';
import { Button } from '@/shared/components/Button';
import { OrganizationAdministrator, UpdateAdminInput } from '../types';
import { organizationAdminService } from '../services/OrganizationAdminService';

export interface EditAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizationId: string;
  admin: OrganizationAdministrator;
  onSuccess: (updatedAdmin: OrganizationAdministrator) => void | Promise<void>;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

export function EditAdminModal({
  isOpen,
  onClose,
  organizationId,
  admin,
  onSuccess,
}: EditAdminModalProps) {
  const [form, setForm] = useState<FormState>({
    name: admin.name,
    email: admin.email,
    phone: admin.phone,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setForm({
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
      });
      setErrors({});
      setSubmitError(null);
    }
  }, [isOpen, admin]);

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!form.name.trim()) {
      errs.name = 'Name is required.';
    }

    if (!form.email.trim()) {
      errs.email = 'Email Address is required.';
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
      const input: UpdateAdminInput = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      };

      const updated = await organizationAdminService.updateAdministrator(
        organizationId,
        admin.id,
        input
      );
      await onSuccess(updated);
      onClose();
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to update administrator. Please try again.');
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
      title="Edit Administrator Profile"
      description="Update profile details and communication information for this tenant administrator."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {submitError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-md flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{submitError}</span>
          </div>
        )}

        {/* Read-only Identifiers */}
        <div className="bg-surface-subdued p-3 rounded-md border border-border-structural/70 space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Administrator account:</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">System Username:</span>
            <div className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-text-muted" />
              <span className="font-mono font-semibold text-text-primary">@{admin.username}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <Label htmlFor="edit-admin-name">
              Name <span className="text-critical">*</span>
            </Label>
            <Input
              id="edit-admin-name"
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              error={!!errors.name}
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-[11px] text-critical mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="edit-admin-email">
              Email Address <span className="text-[10px] text-text-muted font-normal">(read-only)</span>
            </Label>
            <Input
              id="edit-admin-email"
              type="email"
              value={form.email}
              readOnly
              disabled={isSubmitting}
            />
            <p className="text-[11px] text-text-muted mt-1">Email changes are not supported because this is the Firebase sign-in identity.</p>
          </div>

          <div>
            <Label htmlFor="edit-admin-phone">
              Mobile Contact Number <span className="text-critical">*</span>
            </Label>
            <Input
              id="edit-admin-phone"
              value={form.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              error={!!errors.phone}
              disabled={isSubmitting}
            />
            {errors.phone && <p className="text-[11px] text-critical mt-1">{errors.phone}</p>}
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
            {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
