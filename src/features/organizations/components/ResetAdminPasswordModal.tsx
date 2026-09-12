import React, { useState } from 'react';
import { KeyRound, CheckCircle2, AlertCircle } from 'lucide-react';
import { Input } from '@/shared/components/Input';
import { Modal } from '@/shared/components/Modal';
import { Button } from '@/shared/components/Button';
import { OrganizationAdministrator } from '../types';
import { organizationAdminService } from '../services/OrganizationAdminService';

export interface ResetAdminPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizationId: string;
  organizationName: string;
  admin: OrganizationAdministrator;
}

export function ResetAdminPasswordModal({
  isOpen,
  onClose,
  organizationId,
  organizationName,
  admin,
}: ResetAdminPasswordModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialPassword, setInitialPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [result, setResult] = useState<{
    message: string;
  } | null>(null);

  const handleClose = () => {
    if (!isSubmitting) {
      setResult(null);
      setError(null);
      setInitialPassword('');
      setConfirmPassword('');
      onClose();
    }
  };

  const handleReset = async () => {
    if (initialPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (initialPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await organizationAdminService.resetPassword(organizationId, admin.id, initialPassword);
      setInitialPassword('');
      setConfirmPassword('');
      setResult({
        message: res.message,
      });
    } catch (err: any) {
      setError(err.message || 'Failed to dispatch password reset. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Reset Password for ${admin.name}?`}
      maxWidth="md"
    >
      <div className="space-y-4">
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-md flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {!result ? (
          <>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 border border-blue-200 flex items-center justify-center shrink-0">
                <KeyRound className="w-5 h-5" />
              </div>

              <div className="space-y-2 text-xs text-text-secondary leading-relaxed">
                <p>
                  You are initiating a password reset for{' '}
                  <strong className="text-text-primary font-semibold">{admin.name}</strong> (
                  <span className="font-mono">{admin.username}</span>) at{' '}
                  <strong className="text-text-primary font-semibold">{organizationName}</strong>.
                </p>
                <div className="bg-surface-subdued border border-border-structural/80 rounded p-2.5 space-y-1 text-text-muted text-[11px]">
                  <p className="font-semibold text-text-primary">Initial password:</p>
                  <p>This sets the Firebase password directly. The password is not stored or shown after submission.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="text-xs font-semibold text-text-primary">Initial password<Input type="password" value={initialPassword} onChange={(e) => setInitialPassword(e.target.value)} disabled={isSubmitting} autoComplete="new-password" /></label>
              <label className="text-xs font-semibold text-text-primary">Confirm password<Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={isSubmitting} autoComplete="new-password" /></label>
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
                type="button"
                variant="primary"
                onClick={handleReset}
                isLoading={isSubmitting}
                className="text-xs"
              >
                Set Initial Password
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-4 py-1">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 text-xs">
                <h4 className="font-semibold text-text-primary">Password Reset Dispatched</h4>
                <p className="text-text-secondary leading-relaxed">{result.message}</p>
              </div>
            </div>

            <div className="flex items-center justify-end pt-2 border-t border-border-subdued">
              <Button type="button" variant="primary" onClick={handleClose} className="text-xs">
                Done
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
