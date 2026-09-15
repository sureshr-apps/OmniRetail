/**
 * Currency utilities for formatting negotiated license pricing and commercial agreements.
 */

export interface CurrencyOption {
  code: string;
  label: string;
  symbol: string;
}

export const DEFAULT_CURRENCY = 'INR (₹)';

export const SUPPORTED_CURRENCIES: CurrencyOption[] = [
  { code: 'INR', label: DEFAULT_CURRENCY, symbol: '₹' },
];

/**
 * Format an amount with its currency code/symbol.
 * e.g., formatCurrency(72000, 'INR (₹)') => '₹72,000'
 */
export function formatCurrency(amount: number | null | undefined, _currency: string = DEFAULT_CURRENCY): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '—';
  }

  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
}
