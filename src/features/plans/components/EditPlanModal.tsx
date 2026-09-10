import React, { useState, useEffect } from 'react';
import { X, Check, Store, Users, Info, History, ShieldAlert } from 'lucide-react';
import { licensePlanService } from '../services/LicensePlanService';
import { LicensePlan, PlanFormErrors } from '../types';
import { Input } from '@/shared/components/Input';
import { Label } from '@/shared/components/Label';
import { Button } from '@/shared/components/Button';
import { Badge } from '@/shared/components/Badge';

interface EditPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: LicensePlan | null;
  onSuccess: (updatedPlan: LicensePlan) => void;
}

export function EditPlanModal({ isOpen, onClose, plan, onSuccess }: EditPlanModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState<number>(1);
  const [maxStores, setMaxStores] = useState<string>('1');
  const [maxUsers, setMaxUsers] = useState<string>('5');
  const [errors, setErrors] = useState<PlanFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (plan) {
      setName(plan.name);
      setDescription(plan.description || '');
      setLevel(plan.level);
      setMaxStores(String(plan.maxStores));
      setMaxUsers(String(plan.maxUsers));
      setErrors({});
    }
  }, [plan]);

  if (!isOpen || !plan) return null;

  const validate = async (): Promise<boolean> => {
    const errs: PlanFormErrors = {};

    if (!name.trim()) {
      errs.name = 'Plan Name is required.';
    }

    const levelNum = Number(level);
    if (isNaN(levelNum) || levelNum < 0 || !Number.isInteger(levelNum)) {
      errs.level = 'Plan Level must be a non-negative whole number.';
    } else {
      const isTaken = await licensePlanService.isLevelTaken(levelNum, plan.id);
      if (isTaken) {
        errs.level = `Plan Level ${levelNum} is already assigned to another plan. Plan levels must be unique.`;
      }
    }

    const storesNum = Number(maxStores);
    if (!maxStores.trim() || isNaN(storesNum) || storesNum <= 0 || !Number.isInteger(storesNum)) {
      errs.maxStores = 'Maximum Stores must be a positive whole number (at least 1).';
    }

    const usersNum = Number(maxUsers);
    if (!maxUsers.trim() || isNaN(usersNum) || usersNum <= 0 || !Number.isInteger(usersNum)) {
      errs.maxUsers = 'Maximum Users must be a positive whole number (at least 1).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const isValid = await validate();
    if (!isValid) return;

    try {
      setIsSubmitting(true);
      const updated = await licensePlanService.updatePlan(plan.id, {
        name: name.trim(),
        description: description.trim(),
        level: Number(level),
        maxStores: Number(maxStores),
        maxUsers: Number(maxUsers),
      });

      onSuccess(updated);
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update plan.';
      setErrors((prev) => ({ ...prev, general: msg }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-inverse-surface/65 backdrop-blur-[3px] transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centered Modal Dialog */}
      <div className="relative w-full max-w-[700px] bg-surface-elevated rounded-xl shadow-2xl border border-border-subdued z-10 flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-surface-subdued border-b border-border-subdued flex items-start justify-between">
          <div className="flex flex-col gap-1 pr-4">
            <div className="flex items-center gap-2 mb-0.5">
              <Badge
                variant={plan.status === 'active' ? 'success' : 'neutral'}
                withDot
                className="font-bold tracking-wide uppercase text-[10px]"
              >
                {plan.status === 'active' ? 'ACTIVE PLAN' : 'INACTIVE PLAN'}
              </Badge>
              <span className="text-text-muted text-xs">•</span>
              <span className="text-xs font-mono text-text-secondary">
                PLN-ID: #{plan.id}
              </span>
            </div>
            <h2 className="text-lg font-bold text-text-primary tracking-tight leading-tight">
              Edit Plan — {plan.name}
            </h2>
            <p className="text-xs text-text-secondary">
              Update capacity parameters and operational thresholds for this plan tier.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {/* Informational Notice Banner */}
            <div className="p-3.5 rounded-lg bg-blue-50/80 border border-blue-200 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                <Info className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-0.5 text-text-primary">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                  Plan Quota Impact Advisory
                </span>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Changes to plan limits may affect organizations currently assigned to this plan. Existing quotas will update according to plan policy.
                </p>
              </div>
            </div>

            {errors.general && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
                {errors.general}
              </div>
            )}

            {/* Section 1: Plan Information */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-1 border-b border-border-subdued">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <h3 className="text-sm font-semibold text-text-primary">Plan Information</h3>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">
                  Section 01
                </span>
              </div>

              {/* Plan Name */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor="edit-plan-name" className="text-xs font-semibold uppercase tracking-wider">
                    Plan Name <span className="text-critical">*</span>
                  </Label>
                  <span className="text-[10px] text-text-muted">
                    Visible across directory & reports
                  </span>
                </div>
                <Input
                  id="edit-plan-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  error={!!errors.name}
                />
                {errors.name && <p className="text-[11px] text-critical">{errors.name}</p>}
              </div>

              {/* Description */}
              <div className="space-y-1">
                <Label htmlFor="edit-plan-desc" className="text-xs font-semibold uppercase tracking-wider">
                  Description
                </Label>
                <textarea
                  id="edit-plan-desc"
                  rows={2}
                  className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border-subdued rounded-md text-text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none shadow-xs"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <span className="text-[11px] text-text-muted block">
                  Summarizes target organization scale and operational profile.
                </span>
              </div>

              {/* Plan Level */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor="edit-plan-level" className="text-xs font-semibold uppercase tracking-wider">
                    Plan Level <span className="text-critical">*</span>
                  </Label>
                  <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
                    Plan Level
                  </span>
                </div>
                <select
                  id="edit-plan-level"
                  value={level}
                  onChange={(e) => {
                    setLevel(Number(e.target.value));
                    if (errors.level) setErrors((prev) => ({ ...prev, level: undefined }));
                  }}
                  className="w-full h-9 px-3 bg-surface-elevated border border-border-subdued rounded-md text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all cursor-pointer shadow-xs"
                >
                  <option value={0}>Level 0 — Inactive / Archived</option>
                  <option value={1}>Level 1</option>
                  <option value={2}>Level 2</option>
                  <option value={3}>Level 3</option>
                  <option value={4}>Level 4</option>
                  <option value={5}>Level 5</option>
                  <option value={6}>Level 6</option>
                </select>
                {errors.level ? (
                  <p className="text-[11px] text-critical">{errors.level}</p>
                ) : (
                  <p className="text-[11px] text-text-muted">
                    Determines the upgrade order of plans. Higher levels represent higher-capacity plans.
                  </p>
                )}
              </div>
            </div>

            {/* Section 2: Usage Limits (Grouped container) */}
            <div className="p-4 bg-surface-subdued rounded-xl border border-border-subdued space-y-4">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <h3 className="text-sm font-semibold text-text-primary">Usage Limits</h3>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">
                    Section 02
                  </span>
                </div>
                <p className="text-[11px] text-text-secondary">
                  These limits define baseline operational quotas for all assigned organizations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Maximum Stores */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="edit-max-stores" className="text-xs font-semibold uppercase tracking-wider">
                      Maximum Stores <span className="text-critical">*</span>
                    </Label>
                    <span className="text-[10px] font-mono text-primary font-bold">Store Limit</span>
                  </div>
                  <div className="relative">
                    <Store className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                    <input
                      id="edit-max-stores"
                      type="number"
                      min="1"
                      className="w-full h-9 pl-9 pr-3 text-xs font-mono font-semibold bg-surface-elevated border border-border-subdued rounded-lg text-text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-xs"
                      value={maxStores}
                      onChange={(e) => {
                        setMaxStores(e.target.value);
                        if (errors.maxStores)
                          setErrors((prev) => ({ ...prev, maxStores: undefined }));
                      }}
                      required
                    />
                  </div>
                  {errors.maxStores ? (
                    <p className="text-[10px] text-critical">{errors.maxStores}</p>
                  ) : (
                    <p className="text-[10px] text-text-muted">
                      Controls physical and digital stores permitted per organization.
                    </p>
                  )}
                </div>

                {/* Maximum Users */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="edit-max-users" className="text-xs font-semibold uppercase tracking-wider">
                      Maximum Users <span className="text-critical">*</span>
                    </Label>
                    <span className="text-[10px] font-mono text-primary font-bold">User Limit</span>
                  </div>
                  <div className="relative">
                    <Users className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                    <input
                      id="edit-max-users"
                      type="number"
                      min="1"
                      className="w-full h-9 pl-9 pr-3 text-xs font-mono font-semibold bg-surface-elevated border border-border-subdued rounded-lg text-text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-xs"
                      value={maxUsers}
                      onChange={(e) => {
                        setMaxUsers(e.target.value);
                        if (errors.maxUsers)
                          setErrors((prev) => ({ ...prev, maxUsers: undefined }));
                      }}
                      required
                    />
                  </div>
                  {errors.maxUsers ? (
                    <p className="text-[10px] text-critical">{errors.maxUsers}</p>
                  ) : (
                    <p className="text-[10px] text-text-muted">
                      Governs registered staff, manager, and administrator accounts.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Status Notice */}
            <div className="p-3 rounded-lg bg-surface-subdued border border-border-subdued flex items-start gap-3">
              <div className="w-6 h-6 rounded-md bg-surface-elevated flex items-center justify-center text-primary shrink-0 mt-0.5 border border-border-subdued">
                <ShieldAlert className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-text-primary">Current Status:</span>
                  <Badge
                    variant={plan.status === 'active' ? 'success' : 'neutral'}
                    withDot
                    className="text-[10px] font-bold"
                  >
                    {plan.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <p className="text-[11px] text-text-secondary">
                  To change availability for new organizations, use the {plan.status === 'active' ? 'Deactivate' : 'Activate'} action in the plan actions menu.
                </p>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-3 bg-surface-subdued border-t border-border-subdued flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Left: Audit Trail Stamp */}
            <div className="flex items-center gap-1.5 text-text-muted text-xs">
              <History className="w-4 h-4 text-text-muted" />
              <span>
                Last updated <strong className="text-text-primary font-medium">{plan.updatedAt}</strong> by Platform Admin
              </span>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
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
                type="submit"
                variant="primary"
                size="sm"
                isLoading={isSubmitting}
                className="gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save Changes</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
