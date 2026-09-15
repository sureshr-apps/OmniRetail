import React, { useState, useEffect } from 'react';
import { X, AlertCircle, Coins, ArrowRight } from 'lucide-react';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { Select } from '@/shared/components/Select';
import { DEFAULT_CURRENCY, SUPPORTED_CURRENCIES, formatCurrency } from '@/shared/utils/currency';
import { ModifyCommercialTermsInput, OrganizationLicense } from '../types';
import { organizationLicenseService } from '../services/OrganizationLicenseService';

export interface ModifyCommercialTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizationId: string;
  organizationName: string;
  currentLicense: OrganizationLicense;
  onSuccess: (updatedLicense: OrganizationLicense) => void | Promise<void>;
}

export function ModifyCommercialTermsModal({
  isOpen,
  onClose,
  organizationId,
  organizationName,
  currentLicense,
  onSuccess,
}: ModifyCommercialTermsModalProps) {
  const [negotiatedPrice, setNegotiatedPrice] = useState<string>('');
  const [currency, setCurrency] = useState<string>('INR (₹)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setError(null);
    setIsSubmitting(false);
    setNegotiatedPrice(String(currentLicense.negotiatedPrice));
    setCurrency('INR (₹)');
  }, [isOpen, currentLicense]);

  if (!isOpen) return null;

  const currentPriceNum = currentLicense.negotiatedPrice;
  const currentCurrencyVal = DEFAULT_CURRENCY;
  const newPriceNum = Number(negotiatedPrice);
  const hasChanges =
    (!isNaN(newPriceNum) && newPriceNum !== currentPriceNum) ||
    currency !== currentCurrencyVal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (negotiatedPrice.trim() === '' || isNaN(newPriceNum) || newPriceNum < 0) {
      setError('Please enter a valid negotiated price (0 or greater).');
      return;
    }

    if (!currency) {
      setError('Please select a currency.');
      return;
    }

    setIsSubmitting(true);
    try {
      const input: ModifyCommercialTermsInput = {
        negotiatedPrice: newPriceNum,
        currency,
      };
      const updatedLicense = await organizationLicenseService.modifyCommercialTerms(
        organizationId,
        input
      );
      await onSuccess(updatedLicense);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to update commercial terms.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface-elevated rounded-lg border border-border-subdued shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-4 border-b border-border-subdued flex items-center justify-between bg-surface-subdued/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-text-primary">Modify Commercial Terms</h2>
              <p className="text-xs text-text-secondary truncate max-w-xs">
                Negotiated pricing agreement for <span className="font-semibold text-text-primary">{organizationName}</span>
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

          {/* Scope Note */}
          <div className="p-3 bg-surface-subdued rounded-lg border border-border-subdued text-text-secondary text-[11px] leading-relaxed">
            Modifying commercial terms updates the negotiated rate agreement for this organization.
            Plan entitlements (Stores, Users) and validity dates (Start & Expiry) remain unchanged.
          </div>

          {/* Current vs Proposed Preview */}
          {hasChanges && (
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Proposed Change Preview
              </span>
              <div className="flex items-center gap-2 font-medium text-xs text-text-primary">
                <span className="line-through text-text-muted">
                  {formatCurrency(currentPriceNum, currentCurrencyVal)}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
                <span className="font-bold text-text-primary">
                  {formatCurrency(newPriceNum, currency)}
                </span>
              </div>
            </div>
          )}

          {/* Editable Pricing Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-xs font-semibold text-text-primary">
                Negotiated Price <span className="text-critical">*</span>
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
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving Terms...' : 'Save Terms'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
