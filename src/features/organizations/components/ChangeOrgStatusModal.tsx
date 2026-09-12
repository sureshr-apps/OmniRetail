import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';
import { Modal } from '@/shared/components/Modal';
import { Button } from '@/shared/components/Button';
import { Organization, OrganizationStatus } from '../types';
import { organizationService } from '../services/OrganizationService';

export interface ChangeOrgStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  organization: Organization;
  targetStatus: OrganizationStatus; // 'suspended' or 'active'
  onSuccess: (updatedOrg: Organization) => void;
}

export function ChangeOrgStatusModal({
  isOpen,
  onClose,
  organization,
  targetStatus,
  onSuccess,
}: ChangeOrgStatusModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSuspending = targetStatus === 'suspended';
  const title = isSuspending
    ? `Suspend ${organization.name}?`
    : `Activate ${organization.name}?`;

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const updated = await organizationService.changeOrganizationStatus(
        organization.id,
        targetStatus
      );
      onSuccess(updated);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to update organization status. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => !isSubmitting && onClose()}
      title={title}
      maxWidth="md"
    >
      <div className="space-y-4">
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-md flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex items-start gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              isSuspending
                ? 'bg-rose-100 text-rose-600 border border-rose-200'
                : 'bg-emerald-100 text-emerald-600 border border-emerald-200'
            }`}
          >
            {isSuspending ? (
              <AlertTriangle className="w-5 h-5" />
            ) : (
              <CheckCircle2 className="w-5 h-5" />
            )}
          </div>

          <div className="space-y-2 text-xs text-text-secondary leading-relaxed">
            {isSuspending ? (
              <>
                <p>
                  You are about to suspend tenant business operations for{' '}
                  <strong className="text-text-primary font-semibold">
                    {organization.name}
                  </strong>{' '}
                  (<span className="font-mono">{organization.organizationCode || '—'}</span>).
                </p>
                <div className="bg-amber-50/70 border border-amber-200 rounded p-2.5 text-amber-900 text-[11px] space-y-1">
                  <p className="font-semibold">Operational Impacts of Suspension:</p>
                  <ul className="list-disc list-inside space-y-0.5 text-amber-800">
                    <li>Cashier authentication will be blocked across all active POS registers</li>
                    <li>Store data synchronization will be temporarily halted</li>
                    <li>Store managers and administrators will be locked out of store consoles</li>
                  </ul>
                </div>
                <p className="text-text-muted text-[11px]">
                  No sales data or tenant records will be deleted. You can reactivate this organization at any time.
                </p>
              </>
            ) : (
              <>
                <p>
                  You are about to reactivate tenant business operations for{' '}
                  <strong className="text-text-primary font-semibold">
                    {organization.name}
                  </strong>{' '}
                  (<span className="font-mono">{organization.organizationCode || '—'}</span>).
                </p>
                <p>
                  All associated store outlets, active POS registers, and administrator logins will immediately regain access to retail cloud services.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
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
            type="button"
            variant={isSuspending ? 'destructive' : 'primary'}
            onClick={handleConfirm}
            isLoading={isSubmitting}
            className="text-xs"
          >
            {isSuspending ? 'Suspend Organization' : 'Activate Organization'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
