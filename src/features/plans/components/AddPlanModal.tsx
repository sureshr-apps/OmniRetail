import React, { useState } from 'react';
import { X, Check, Store, Users, Info, ShieldCheck } from 'lucide-react';
import { licensePlanService } from '../services/LicensePlanService';
import { LicensePlan, PlanFormErrors } from '../types';
import { Input } from '@/shared/components/Input';
import { Label } from '@/shared/components/Label';
import { Button } from '@/shared/components/Button';

interface AddPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newPlan: LicensePlan) => void;
}

export function AddPlanModal({ isOpen, onClose, onSuccess }: AddPlanModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState<number>(4);
  const [maxStores, setMaxStores] = useState<string>('5');
  const [maxUsers, setMaxUsers] = useState<string>('25');
  const [errors, setErrors] = useState<PlanFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validate = async (): Promise<boolean> => {
    const errs: PlanFormErrors = {};

    if (!name.trim()) {
      errs.name = 'Plan Name is required.';
    }

    const levelNum = Number(level);
    if (isNaN(levelNum) || levelNum < 0 || !Number.isInteger(levelNum)) {
      errs.level = 'Plan Level must be a non-negative whole number.';
    } else {
      const isTaken = await licensePlanService.isLevelTaken(levelNum);
      if (isTaken) {
        errs.level = `Plan Level ${levelNum} is already assigned to an existing plan. Plan levels must be unique.`;
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
      const newPlan = await licensePlanService.createPlan({
        name: name.trim(),
        description: description.trim(),
        level: Number(level),
        maxStores: Number(maxStores),
        maxUsers: Number(maxUsers),
      });

      onSuccess(newPlan);
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create plan.';
      setErrors((prev) => ({ ...prev, general: msg }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-[640px] bg-surface-elevated rounded-xl shadow-2xl border border-border-subdued z-10 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 pt-5 pb-4 flex items-start justify-between bg-surface-elevated border-b border-border-subdued">
          <div className="flex flex-col gap-0.5 pr-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary">
                Capacity Configuration
              </span>
            </div>
            <h2 className="text-lg font-bold text-text-primary tracking-tight mt-0.5">
              Add Plan
            </h2>
            <p className="text-xs text-text-secondary leading-relaxed">
              Create a plan to define the store and user limits available to organizations.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-subdued transition-colors focus:outline-none"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="px-6 py-5 flex-1 overflow-y-auto space-y-6">
            {errors.general && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
                {errors.general}
              </div>
            )}

            {/* Section 1: Plan Information */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-1 border-b border-border-subdued">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Section 1
                  </span>
                  <span className="text-text-muted text-xs">/</span>
                  <h3 className="text-sm font-semibold text-text-primary">Plan Information</h3>
                </div>
                <span className="text-[11px] text-text-muted">* Required parameters</span>
              </div>

              {/* Plan Name */}
              <div className="space-y-1">
                <Label htmlFor="plan-name">
                  Plan Name <span className="text-critical font-bold">*</span>
                </Label>
                <Input
                  id="plan-name"
                  type="text"
                  placeholder="e.g., Professional"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  error={!!errors.name}
                  autoFocus
                />
                {errors.name ? (
                  <p className="text-[11px] text-critical">{errors.name}</p>
                ) : (
                  <p className="text-[11px] text-text-muted">
                    A unique name for this plan.
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1">
                <Label htmlFor="plan-desc">Description</Label>
                <textarea
                  id="plan-desc"
                  rows={2}
                  className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border-subdued rounded-md text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none shadow-xs"
                  placeholder="e.g., Designed for growing multi-store retail businesses requiring coordinated multi-outlet operations."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <p className="text-[11px] text-text-muted">
                  Short description explaining the intended operational capacity of this plan.
                </p>
              </div>

              {/* Plan Level */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor="plan-level">
                    Plan Level <span className="text-critical font-bold">*</span>
                  </Label>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-primary">
                    Plan Level
                  </span>
                </div>
                <div className="relative">
                  <select
                    id="plan-level"
                    value={level}
                    onChange={(e) => {
                      setLevel(Number(e.target.value));
                      if (errors.level) setErrors((prev) => ({ ...prev, level: undefined }));
                    }}
                    className="w-full h-9 px-3 bg-surface-elevated border border-border-subdued rounded-md text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all cursor-pointer shadow-xs"
                  >
                    <option value={1}>Level 1</option>
                    <option value={2}>Level 2</option>
                    <option value={3}>Level 3</option>
                    <option value={4}>Level 4</option>
                    <option value={5}>Level 5</option>
                    <option value={6}>Level 6</option>
                  </select>
                </div>
                {errors.level ? (
                  <p className="text-[11px] text-critical">{errors.level}</p>
                ) : (
                  <p className="text-[11px] text-text-muted">
                    Determines the upgrade order of plans. Higher levels represent higher-capacity plans.
                  </p>
                )}
              </div>
            </div>

            {/* Section 2: Usage Limits */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 pb-1 border-b border-border-subdued">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Section 2
                </span>
                <span className="text-text-muted text-xs">/</span>
                <h3 className="text-sm font-semibold text-text-primary">Usage Limits</h3>
              </div>

              <div className="bg-surface-subdued/70 rounded-lg p-3.5 space-y-3 border border-border-subdued">
                <div className="flex items-start gap-2.5 p-2 bg-primary/10 rounded-md text-primary text-xs">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-tight text-text-primary">
                    These limits will apply to all organizations assigned this plan upon license provisioning.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Maximum Stores */}
                  <div className="bg-surface-elevated p-3 rounded-lg border border-border-subdued space-y-1 shadow-xs">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="max-stores" className="text-xs font-semibold">
                        Maximum Stores <span className="text-critical font-bold">*</span>
                      </Label>
                      <Store className="w-4 h-4 text-text-muted" />
                    </div>
                    <div className="relative mt-1">
                      <input
                        id="max-stores"
                        type="number"
                        min="1"
                        placeholder="e.g. 5"
                        value={maxStores}
                        onChange={(e) => {
                          setMaxStores(e.target.value);
                          if (errors.maxStores)
                            setErrors((prev) => ({ ...prev, maxStores: undefined }));
                        }}
                        className="w-full h-8 pl-3 pr-14 text-xs font-mono bg-surface-elevated border border-border-subdued rounded text-text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        required
                      />
                      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-text-muted font-medium">
                        Stores
                      </span>
                    </div>
                    {errors.maxStores ? (
                      <p className="text-[10px] text-critical">{errors.maxStores}</p>
                    ) : (
                      <span className="text-[10px] text-text-muted block">
                        Maximum provisioned retail outlets.
                      </span>
                    )}
                  </div>

                  {/* Maximum Users */}
                  <div className="bg-surface-elevated p-3 rounded-lg border border-border-subdued space-y-1 shadow-xs">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="max-users" className="text-xs font-semibold">
                        Maximum Users <span className="text-critical font-bold">*</span>
                      </Label>
                      <Users className="w-4 h-4 text-text-muted" />
                    </div>
                    <div className="relative mt-1">
                      <input
                        id="max-users"
                        type="number"
                        min="1"
                        placeholder="e.g. 25"
                        value={maxUsers}
                        onChange={(e) => {
                          setMaxUsers(e.target.value);
                          if (errors.maxUsers)
                            setErrors((prev) => ({ ...prev, maxUsers: undefined }));
                        }}
                        className="w-full h-8 pl-3 pr-16 text-xs font-mono bg-surface-elevated border border-border-subdued rounded text-text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        required
                      />
                      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-text-muted font-medium">
                        Accounts
                      </span>
                    </div>
                    {errors.maxUsers ? (
                      <p className="text-[10px] text-critical">{errors.maxUsers}</p>
                    ) : (
                      <span className="text-[10px] text-text-muted block">
                        Total staff and manager seats across all stores.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-3 bg-surface-subdued border-t border-border-subdued flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-text-secondary self-start sm:self-center">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
              <span className="text-[11px]">
                New plans are set to Active by default upon creation.
              </span>
            </div>
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
                <span>Create Plan</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
