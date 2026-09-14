import React, { useState, useEffect } from 'react';
import { X, AlertCircle, ShieldCheck, Store, Users, Calendar, Coins } from 'lucide-react';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { Select } from '@/shared/components/Select';
import { Badge } from '@/shared/components/Badge';
import { LicensePlan } from '@/features/plans/types';
import { licensePlanService } from '@/features/plans/services/LicensePlanService';
import { SUPPORTED_CURRENCIES, formatCurrency } from '@/shared/utils/currency';
import { AssignLicenseInput, OrganizationLicense } from '../types';
import { organizationLicenseService } from '../services/OrganizationLicenseService';

export interface AssignLicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizationId: string;
  organizationName: string;
  onSuccess: (license: OrganizationLicense) => void | Promise<void>;
}

export function AssignLicenseModal({
  isOpen,
  onClose,
  organizationId,
  organizationName,
  onSuccess,
}: AssignLicenseModalProps) {
  const [plans, setPlans] = useState<LicensePlan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [negotiatedPrice, setNegotiatedPrice] = useState<string>('');
  const [currency, setCurrency] = useState<string>('INR (₹)');
  
  const [isLoadingPlans, setIsLoadingPlans] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load active plans & initialize default dates
  useEffect(() => {
    if (!isOpen) return;

    setError(null);
    setIsSubmitting(false);

    // Default dates: start today, expiry in 1 year
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    const nextYearStr = nextYear.toISOString().split('T')[0];

    setStartDate(todayStr);
    setExpiryDate(nextYearStr);
    setNegotiatedPrice('');
    setCurrency('INR (₹)');

    setIsLoadingPlans(true);
    licensePlanService
      .getActivePlans()
      .then((activePlans) => {
        setPlans(activePlans);
        if (activePlans.length > 0) {
          setSelectedPlanId(activePlans[0].id);
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to load active plans.');
      })
      .finally(() => {
        setIsLoadingPlans(false);
      });
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedPlan = plans.find((p) => p.id === selectedPlanId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!selectedPlanId) {
      setError('Please select an active License Plan.');
      return;
    }
    if (!startDate || !expiryDate) {
      setError('Start date and expiry date are required.');
      return;
    }
    if (new Date(expiryDate).getTime() <= new Date(startDate).getTime()) {
      setError('Expiry date must be strictly after the start date.');
      return;
    }
    const priceNum = Number(negotiatedPrice);
    if (negotiatedPrice.trim() === '' || isNaN(priceNum) || priceNum < 0) {
      setError('Please enter a valid negotiated price (0 or greater).');
      return;
    }
    if (!currency) {
      setError('Please select a commercial currency.');
      return;
    }

    setIsSubmitting(true);
    try {
      const input: AssignLicenseInput = {
        planId: selectedPlanId,
        startDate,
        expiryDate,
        negotiatedPrice: priceNum,
        currency,
      };
      const createdLicense = await organizationLicenseService.assignLicense(organizationId, input);
      await onSuccess(createdLicense);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to assign license.');
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
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-text-primary">Assign Organization License</h2>
              <p className="text-xs text-text-secondary truncate max-w-xs sm:max-w-sm">
                Provision license agreement for <span className="font-semibold text-text-primary">{organizationName}</span>
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

          {/* Plan Selection */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text-primary">
              Select License Plan <span className="text-critical">*</span>
            </label>
            {isLoadingPlans ? (
              <div className="h-9 bg-surface-subdued rounded border border-border-structural flex items-center px-3 text-text-muted">
                Loading active plans...
              </div>
            ) : (
              <Select
                value={selectedPlanId}
                onChange={(e) => setSelectedPlanId(e.target.value)}
                options={plans.map((p) => ({
                  value: p.id,
                  label: `${p.name} (Level ${p.level} • ${p.maxStores} Stores • ${p.maxUsers} Users)`,
                }))}
                disabled={isSubmitting || plans.length === 0}
              />
            )}
            <p className="text-[11px] text-text-muted">
              Only active plans are eligible for assignment. Plan entitlements cannot be modified at organization level.
            </p>
          </div>

          {/* Selected Plan Entitlements Display (Read-only) */}
          {selectedPlan && (
            <div className="bg-surface-subdued p-3.5 rounded-lg border border-border-structural/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Plan Entitlements (Read-Only)
                </span>
                <Badge variant="neutral" className="text-[10px]">
                  Level {selectedPlan.level}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-surface-elevated p-2 rounded border border-border-subdued flex items-center gap-2">
                  <Store className="w-3.5 h-3.5 text-primary shrink-0" />
                  <div>
                    <div className="text-[10px] text-text-muted">Maximum Stores</div>
                    <div className="text-xs font-bold text-text-primary">
                      {selectedPlan.maxStores} {selectedPlan.maxStores === 1 ? 'Store' : 'Stores'}
                    </div>
                  </div>
                </div>

                <div className="bg-surface-elevated p-2 rounded border border-border-subdued flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-primary shrink-0" />
                  <div>
                    <div className="text-[10px] text-text-muted">Maximum Users</div>
                    <div className="text-xs font-bold text-text-primary">
                      {selectedPlan.maxUsers} {selectedPlan.maxUsers === 1 ? 'User' : 'Users'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Validity Period */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-primary">
                Start Date <span className="text-critical">*</span>
              </label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                disabled={isSubmitting}
                className="text-xs h-9"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-primary">
                Expiry Date <span className="text-critical">*</span>
              </label>
              <Input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                disabled={isSubmitting}
                className="text-xs h-9"
              />
            </div>
          </div>

          {/* Commercial Terms */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-xs font-semibold text-text-primary">
                Negotiated Price <span className="text-critical">*</span>
              </label>
              <Input
                type="number"
                min="0"
                step="1"
                placeholder="e.g. 75000"
                value={negotiatedPrice}
                onChange={(e) => setNegotiatedPrice(e.target.value)}
                disabled={isSubmitting}
                className="text-xs h-9"
              />
              <p className="text-[11px] text-text-muted">
                Price negotiated independently for this agreement.
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
              disabled={isSubmitting || plans.length === 0}
            >
              {isSubmitting ? 'Assigning License...' : 'Assign License'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
