import React, { useState, useEffect } from 'react';
import { X, AlertCircle, RefreshCw, Store, Users, Calendar, Coins } from 'lucide-react';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { Select } from '@/shared/components/Select';
import { Badge } from '@/shared/components/Badge';
import { LicensePlan } from '@/features/plans/types';
import { licensePlanService } from '@/features/plans/services/LicensePlanService';
import { SUPPORTED_CURRENCIES, formatCurrency } from '@/shared/utils/currency';
import { RenewLicenseInput, OrganizationLicense } from '../types';
import { organizationLicenseService } from '../services/OrganizationLicenseService';

export interface RenewLicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizationId: string;
  organizationName: string;
  currentLicense: OrganizationLicense;
  currentPlan: LicensePlan | null;
  onSuccess: (updatedLicense: OrganizationLicense) => void | Promise<void>;
}

export function RenewLicenseModal({
  isOpen,
  onClose,
  organizationId,
  organizationName,
  currentLicense,
  currentPlan,
  onSuccess,
}: RenewLicenseModalProps) {
  const [eligiblePlans, setEligiblePlans] = useState<LicensePlan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [newStartDate, setNewStartDate] = useState<string>('');
  const [newExpiryDate, setNewExpiryDate] = useState<string>('');
  const [negotiatedPrice, setNegotiatedPrice] = useState<string>('');
  const [currency, setCurrency] = useState<string>('INR (₹)');

  const [isLoadingPlans, setIsLoadingPlans] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    setError(null);
    setIsSubmitting(false);

    // Calculate default new start date: day after current expiry date
    let calculatedStart = '';
    let calculatedExpiry = '';

    if (currentLicense.expiryDate) {
      const [year, month, day] = currentLicense.expiryDate.split('-').map(Number);
      // Use UTC calendar arithmetic so the displayed date cannot shift backward
      // when local time (for example IST) is converted to an ISO date.
      const nextDay = new Date(Date.UTC(year, month - 1, day + 1));
      calculatedStart = nextDay.toISOString().split('T')[0];

      const nextYear = new Date(nextDay);
      nextYear.setUTCFullYear(nextYear.getUTCFullYear() + 1);
      calculatedExpiry = nextYear.toISOString().split('T')[0];
    } else {
      const today = new Date();
      calculatedStart = today.toISOString().split('T')[0];
      const nextYear = new Date(today);
      nextYear.setUTCFullYear(nextYear.getUTCFullYear() + 1);
      calculatedExpiry = nextYear.toISOString().split('T')[0];
    }

    setNewStartDate(calculatedStart);
    setNewExpiryDate(calculatedExpiry);
    setNegotiatedPrice(String(currentLicense.negotiatedPrice));
    setCurrency(currentLicense.currency || 'INR (₹)');

    const currentLevel = currentPlan ? currentPlan.level : 0;

    setIsLoadingPlans(true);
    licensePlanService
      .getActivePlans()
      .then((activePlans) => {
        // Renewal rule: can keep same plan or move to a higher active plan. No downgrades.
        const eligible = activePlans
          .filter((p) => p.level >= currentLevel)
          .sort((a, b) => a.level - b.level);

        setEligiblePlans(eligible);

        // Pre-select current plan if active, or lowest eligible
        const currentInEligible = eligible.find((p) => p.id === currentLicense.planId);
        if (currentInEligible) {
          setSelectedPlanId(currentInEligible.id);
        } else if (eligible.length > 0) {
          setSelectedPlanId(eligible[0].id);
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to load plans for renewal.');
      })
      .finally(() => {
        setIsLoadingPlans(false);
      });
  }, [isOpen, currentLicense, currentPlan]);

  if (!isOpen) return null;

  const selectedPlan = eligiblePlans.find((p) => p.id === selectedPlanId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedPlanId) {
      setError('Please select a license plan for renewal.');
      return;
    }

    if (!newStartDate || !newExpiryDate) {
      setError('New start date and expiry date are required.');
      return;
    }

    if (new Date(newExpiryDate).getTime() <= new Date(newStartDate).getTime()) {
      setError('New expiry date must be strictly after the new start date.');
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
      const input: RenewLicenseInput = {
        planId: selectedPlanId,
        newStartDate,
        newExpiryDate,
        negotiatedPrice: priceNum,
        currency,
      };
      const renewed = await organizationLicenseService.renewLicense(organizationId, input);
      await onSuccess(renewed);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to renew license.');
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
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-text-primary">Renew License Agreement</h2>
              <p className="text-xs text-text-secondary truncate max-w-xs sm:max-w-sm">
                Provision new period for <span className="font-semibold text-text-primary">{organizationName}</span>
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

          {/* Current Agreement Summary */}
          <div className="p-3 bg-surface-subdued rounded-lg border border-border-subdued flex items-center justify-between">
            <div>
              <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider">
                Current Agreement
              </div>
              <div className="text-xs font-semibold text-text-primary mt-0.5">
                {currentPlan?.name || 'Current Plan'}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider">
                Current Expiry
              </div>
              <div className="font-mono text-xs font-semibold text-text-primary mt-0.5">
                {currentLicense.expiryDate}
              </div>
            </div>
          </div>

          {/* Plan Selection */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text-primary">
              Renewal Plan <span className="text-critical">*</span>
            </label>
            {isLoadingPlans ? (
              <div className="h-9 bg-surface-subdued rounded border border-border-structural flex items-center px-3 text-text-muted">
                Loading renewal plans...
              </div>
            ) : (
              <Select
                value={selectedPlanId}
                onChange={(e) => setSelectedPlanId(e.target.value)}
                options={eligiblePlans.map((p) => ({
                  value: p.id,
                  label: `${p.name} (Level ${p.level} • ${p.maxStores} Stores • ${p.maxUsers} Users)${
                    p.id === currentLicense.planId ? ' — Current Plan' : ' — Upgrade'
                  }`,
                }))}
                disabled={isSubmitting}
              />
            )}
            <p className="text-[11px] text-text-muted">
              Plans with lower levels than the current tier are not permitted during renewal.
            </p>
          </div>

          {/* Selected Plan Entitlements Display (Read-Only) */}
          {selectedPlan && (
            <div className="bg-surface-subdued p-3 rounded-lg border border-border-structural/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Renewed Entitlements (Read-Only)
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

          {/* New Validity Period */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-primary">
                New Start Date <span className="text-critical">*</span>
              </label>
              <Input
                type="date"
                value={newStartDate}
                onChange={(e) => setNewStartDate(e.target.value)}
                disabled={isSubmitting}
                className="text-xs h-9"
              />
              <p className="text-[10px] text-text-muted">
                Defaults to the day after current expiry.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-primary">
                New Expiry Date <span className="text-critical">*</span>
              </label>
              <Input
                type="date"
                value={newExpiryDate}
                onChange={(e) => setNewExpiryDate(e.target.value)}
                disabled={isSubmitting}
                className="text-xs h-9"
              />
              <p className="text-[10px] text-text-muted">
                Must be strictly after the new start date.
              </p>
            </div>
          </div>

          {/* Negotiated Price & Currency */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-xs font-semibold text-text-primary">
                Negotiated Renewal Price <span className="text-critical">*</span>
              </label>
              <Input
                type="number"
                min="0"
                step="1"
                placeholder="e.g. 85000"
                value={negotiatedPrice}
                onChange={(e) => setNegotiatedPrice(e.target.value)}
                disabled={isSubmitting}
                className="text-xs h-9"
              />
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
              disabled={isSubmitting || !selectedPlanId}
            >
              {isSubmitting ? 'Renewing Agreement...' : 'Confirm Renewal'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
