import { useState } from 'react';
import { X, Archive, ShieldCheck, Info } from 'lucide-react';
import { licensePlanService } from '../services/LicensePlanService';
import { LicensePlan } from '../types';
import { Button } from '@/shared/components/Button';

interface DeactivatePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: LicensePlan | null;
  onSuccess: (updatedPlan: LicensePlan) => void | Promise<void>;
}

export function DeactivatePlanModal({
  isOpen,
  onClose,
  plan,
  onSuccess,
}: DeactivatePlanModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !plan) return null;

  const handleDeactivate = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      const updated = await licensePlanService.changePlanStatus(plan.id, 'inactive');
      await onSuccess(updated);
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to deactivate plan.';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-[480px] bg-surface-elevated rounded-xl shadow-2xl border border-border-subdued z-10 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 pt-6 pb-3 flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-border-subdued text-slate-700">
              <Archive className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-[10px] text-text-muted">
                <span className="uppercase tracking-wider font-bold">Plan Status Modification</span>
                <span>•</span>
                <span className="font-mono text-text-secondary">{plan.planCode || '—'}</span>
              </div>
              <h2 className="text-base font-bold text-text-primary">
                Deactivate {plan.name}?
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-subdued transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="px-6 py-3 space-y-4">
          <p className="text-xs text-text-secondary leading-relaxed">
            This plan will no longer be available for new license assignments. Existing organizations using this plan will not be changed.
          </p>

          {/* Details Summary Card */}
          <div className="bg-surface-subdued rounded-lg p-3.5 border border-border-subdued space-y-2.5">
            <div className="flex items-center justify-between pb-1 border-b border-border-subdued">
              <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider">
                Target Plan
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-text-primary">{plan.name}</span>
                <span className="px-1.5 py-0.5 rounded bg-surface-elevated text-text-secondary text-[10px] font-mono border border-border-subdued">
                  Level {plan.level}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between py-0.5">
              <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider">
                Assigned Organizations
              </span>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-text-primary font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                <span>{plan.assignedOrganizationsCount ?? '—'} organizations</span>
              </div>
            </div>

            <div className="pt-1 space-y-0.5">
              <div className="flex items-center gap-1.5 text-text-primary text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Entitlement Impact: None</span>
              </div>
              <p className="text-[11px] text-text-secondary pl-5 leading-relaxed">
                All active organizations retain their {plan.maxStores} {plan.maxStores === 1 ? 'Store' : 'Stores'} & {plan.maxUsers} Users capacity until explicitly migrated.
              </p>
            </div>
          </div>

          {/* Notice info */}
          <div className="flex items-center gap-2 p-2.5 bg-surface-subdued rounded border border-border-subdued text-text-secondary">
            <Info className="w-4 h-4 text-primary shrink-0" />
            <span className="text-[11px]">
              You can reactivate this plan catalog entry at any point without downtime.
            </span>
          </div>

          {error && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded text-xs text-rose-700">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-surface-subdued border-t border-border-subdued flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 text-text-muted text-[10px] uppercase tracking-wider font-medium">
            <span className="px-1.5 py-0.5 rounded bg-surface-elevated font-mono text-[10px] text-text-primary border border-border-subdued">
              ESC
            </span>
            <span>to dismiss</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleDeactivate}
              isLoading={isSubmitting}
              className="gap-1.5 bg-slate-900 hover:bg-slate-800 text-white border-transparent"
            >
              <Archive className="w-4 h-4" />
              <span>Deactivate Plan</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
