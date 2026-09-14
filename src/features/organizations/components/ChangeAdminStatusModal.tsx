import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';
import { Modal } from '@/shared/components/Modal';
import { Button } from '@/shared/components/Button';
import { AdminStatus, OrganizationAdministrator } from '../types';
import { organizationAdminService } from '../services/OrganizationAdminService';

export interface ChangeAdminStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizationId: string;
  organizationName: string;
  admin: OrganizationAdministrator;
  targetStatus: AdminStatus; // 'active' or 'inactive'
  onSuccess: (updatedAdmin: OrganizationAdministrator) => void | Promise<void>;
}

export function ChangeAdminStatusModal({
  isOpen,
  onClose,
  organizationId,
  organizationName,
  admin,
  targetStatus,
  onSuccess,
}: ChangeAdminStatusModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isDeactivating = targetStatus === 'inactive';
  const title = isDeactivating
    ? `Deactivate ${admin.name} from ${organizationName}?`
    : `Activate ${admin.name} for ${organizationName}?`;

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const updated = await organizationAdminService.changeAdministratorStatus(
        organizationId,
        admin.id,
        targetStatus
      );
      await onSuccess(updated);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to update administrator status. Please try again.');
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
              isDeactivating
                ? 'bg-amber-100 text-amber-600 border border-amber-200'
                : 'bg-emerald-100 text-emerald-600 border border-emerald-200'
            }`}
          >
            {isDeactivating ? (
              <AlertTriangle className="w-5 h-5" />
            ) : (
              <CheckCircle2 className="w-5 h-5" />
            )}
          </div>

          <div className="space-y-2 text-xs text-text-secondary leading-relaxed">
            {isDeactivating ? (
              <>
                <p>
                  You are about to deactivate administrator access for{' '}
                  <strong className="text-text-primary font-semibold">{admin.name}</strong> (
                  <span className="font-mono">{admin.username}</span>) at{' '}
                  <strong className="text-text-primary font-semibold">{organizationName}</strong>.
                </p>
                <div className="bg-amber-50/70 border border-amber-200 rounded p-2.5 text-amber-900 text-[11px] space-y-1">
                  <p className="font-semibold">Access Revocation:</p>
                  <ul className="list-disc list-inside space-y-0.5 text-amber-800">
                    <li>This administrator will be blocked from logging into the tenant portal</li>
                    <li>Active browser and mobile sessions will be terminated</li>
                    <li>Historical audit activity and configuration logs will be preserved</li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <p>
                  You are about to reactivate administrator privileges for{' '}
                  <strong className="text-text-primary font-semibold">{admin.name}</strong> (
                  <span className="font-mono">{admin.username}</span>) at{' '}
                  <strong className="text-text-primary font-semibold">{organizationName}</strong>.
                </p>
                <p>
                  This administrator will immediately be permitted to sign into the store management console using their existing credentials.
                </p>
              </>
            )}
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
            type="button"
            variant={isDeactivating ? 'destructive' : 'primary'}
            onClick={handleConfirm}
            isLoading={isSubmitting}
            className="text-xs"
          >
            {isDeactivating ? 'Deactivate Administrator' : 'Activate Administrator'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
