import React, { useState, useEffect } from 'react';
import { X, AlertCircle, ArrowUpRight, Store, Users, ArrowRight, Info } from 'lucide-react';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { Select } from '@/shared/components/Select';
import { Badge } from '@/shared/components/Badge';
import { LicensePlan } from '@/features/plans/types';
import { licensePlanService } from '@/features/plans/services/LicensePlanService';
import { SUPPORTED_CURRENCIES, formatCurrency } from '@/shared/utils/currency';
import { ChangePlanInput, OrganizationLicense } from '../types';
import { organizationLicenseService } from '../services/OrganizationLicenseService';

export interface ChangePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizationId: string;
  organizationName: string;
  currentLicense: OrganizationLicense;
  currentPlan: LicensePlan | null;
  onSuccess: (updatedLicense: OrganizationLicense) => void;
}

export function ChangePlanModal({
  isOpen,
  onClose,
  organizationId,
  organizationName,
  currentLicense,
  currentPlan,
  onSuccess,
}: ChangePlanModalProps) {
  const [higherPlans, setHigherPlans] = useState<LicensePlan[]>([]);
  const [selectedNewPlanId, setSelectedNewPlanId] = useState<string>('');
  const [newNegotiatedPrice, setNewNegotiatedPrice] = useState<string>('');
  const [currency, setCurrency] = useState<string>(currentLicense.currency || 'INR (₹)');

  const [isLoadingPlans, setIsLoadingPlans] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    setError(null);
    setIsSubmitting(false);
    setNewNegotiatedPrice('');
    setCurrency(currentLicense.currency || 'INR (₹)');

    const currentLevel = currentPlan ? currentPlan.level : 0;

    setIsLoadingPlans(true);
    licensePlanService
      .getActivePlans()
      .then((activePlans) => {
        // STRICT RULE: Only active plans with a strictly higher level are eligible
        const eligible = activePlans
          .filter((p) => p.level > currentLevel)
          .sort((a, b) => a.level - b.level);

        setHigherPlans(eligible);
        if (eligible.length > 0) {
          setSelectedNewPlanId(eligible[0].id);
        } else {
          setSelectedNewPlanId('');
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to load plans.');
      })
      .finally(() => {
        setIsLoadingPlans(false);
      });
  }, [isOpen, currentPlan, currentLicense]);

  if (!isOpen) return null;

  const selectedNewPlan = higherPlans.find((p) => p.id === selectedNewPlanId);
  const hasEligibleHigherPlan = higherPlans.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!hasEligibleHigherPlan || !selectedNewPlanId) {
      setError('Please select an eligible higher-tier License Plan.');
      return;
    }

    const priceNum = Number(newNegotiatedPrice);
    if (newNegotiatedPrice.trim() === '' || isNaN(priceNum) || priceNum < 0) {
      setError('Please enter a valid new negotiated price (0 or greater).');
      return;
    }

    if (!currency) {
      setError('Please select a commercial currency.');
      return;
    }

    setIsSubmitting(true);
    try {
      const input: ChangePlanInput = {
        newPlanId: selectedNewPlanId,
        newNegotiatedPrice: priceNum,
        currency,
      };
      const updatedLicense = await organizationLicenseService.changePlan(organizationId, input);
      onSuccess(updatedLicense);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to change plan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface-elevated rounded-lg border border-border-subdued shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-4 border-b border-border-subdued flex items-center justify-between bg-surface-subdued/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-text-primary">Change License Plan</h2>
              <p className="text-xs text-text-secondary truncate max-w-xs sm:max-w-sm">
                Upgrade agreement tier for <span className="font-semibold text-text-primary">{organizationName}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-text-muted hover:text-text-primary p-1 rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-md flex items-start gap-2 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Current vs New Plan Side-by-Side Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Current Plan Box */}
            <div className="p-3 bg-surface-subdued rounded-lg border border-border-subdued space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Current Plan
                </span>
                <Badge variant="neutral" className="text-[10px]">
                  Level {currentPlan?.level ?? 0}
                </Badge>
              </div>
              <div className="font-bold text-text-primary text-sm">
                {currentPlan?.name || 'Unassigned'}
              </div>
              <div className="space-y-1 text-[11px] text-text-secondary pt-1 border-t border-border-subdued">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Store className="w-3 h-3 text-text-muted" /> Stores:
                  </span>
                  <span className="font-semibold text-text-primary">{currentPlan?.maxStores ?? 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-text-muted" /> Users:
                  </span>
                  <span className="font-semibold text-text-primary">{currentPlan?.maxUsers ?? 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Current Price:</span>
                  <span className="font-medium text-text-primary">
                    {formatCurrency(currentLicense.negotiatedPrice, currentLicense.currency)}
                  </span>
                </div>
              </div>
            </div>

            {/* Target Upgrade Plan Box */}
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  Upgrade To
                </span>
                {selectedNewPlan && (
                  <Badge variant="success" className="text-[10px]">
                    Level {selectedNewPlan.level}
                  </Badge>
                )}
              </div>
              <div className="font-bold text-text-primary text-sm">
                {selectedNewPlan?.name || 'Select Plan'}
              </div>
              <div className="space-y-1 text-[11px] text-text-secondary pt-1 border-t border-primary/10">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Store className="w-3 h-3 text-primary" /> Stores:
                  </span>
                  <span className="font-semibold text-text-primary">
                    {selectedNewPlan ? selectedNewPlan.maxStores : '—'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-primary" /> Users:
                  </span>
                  <span className="font-semibold text-text-primary">
                    {selectedNewPlan ? selectedNewPlan.maxUsers : '—'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-primary font-medium">
                  <span>Term:</span>
                  <span>Preserved ({currentLicense.expiryDate})</span>
                </div>
              </div>
            </div>
          </div>

          {/* If No Higher Plan Available: State Handling */}
          {!isLoadingPlans && !hasEligibleHigherPlan ? (
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-xs">
                <Info className="w-4 h-4 text-amber-600 shrink-0" />
                <span>No higher active plan is currently available.</span>
              </div>
              <p className="text-[11px] text-amber-800 pl-6 leading-relaxed">
                This organization is already provisioned on the highest active plan level{' '}
                <strong className="font-semibold">
                  ({currentPlan?.name}, Level {currentPlan?.level})
                </strong>
                . Upgrades to lower or equal level plans are not permitted.
              </p>
            </div>
          ) : (
            <>
              {/* Select Eligible Upgrade Plan */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-primary">
                  Select Higher Plan <span className="text-critical">*</span>
                </label>
                {isLoadingPlans ? (
                  <div className="h-9 bg-surface-subdued rounded border border-border-structural flex items-center px-3 text-text-muted">
                    Checking eligible upgrade tiers...
                  </div>
                ) : (
                  <Select
                    value={selectedNewPlanId}
                    onChange={(e) => setSelectedNewPlanId(e.target.value)}
                    options={higherPlans.map((p) => ({
                      value: p.id,
                      label: `${p.name} (Level ${p.level} • ${p.maxStores} Stores • ${p.maxUsers} Users)`,
                    }))}
                    disabled={isSubmitting}
                  />
                )}
                <p className="text-[11px] text-text-muted">
                  Downgrades are not supported. Only plans with a higher tier level are offered.
                </p>
              </div>

              {/* Commercial Pricing Input */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="block text-xs font-semibold text-text-primary">
                    New Negotiated Price <span className="text-critical">*</span>
                  </label>
                  <Input
                    type="number"
                    min="0"
                    step="1"
                    placeholder="e.g. 195000"
                    value={newNegotiatedPrice}
                    onChange={(e) => setNewNegotiatedPrice(e.target.value)}
                    disabled={isSubmitting}
                    className="text-xs h-9"
                  />
                  <p className="text-[11px] text-text-muted">
                    Pricing is negotiated independently. Prices are not calculated automatically.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-primary">
                    Currency <span className="text-critical">*</span>
                  </label>
                  <Select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    options={SUPPORTED_CURRENCIES.map((c) => ({
                      value: c.label,
                      label: c.label,
                    }))}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </>
          )}

          {/* Actions */}
          <div className="pt-3 border-t border-border-subdued flex items-center justify-end gap-2.5">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmitting || !hasEligibleHigherPlan || !selectedNewPlanId}
            >
              {isSubmitting ? 'Upgrading Plan...' : 'Confirm Plan Upgrade'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
