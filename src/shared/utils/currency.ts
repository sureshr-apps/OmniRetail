/**
 * Currency utilities for formatting negotiated license pricing and commercial agreements.
 */

export interface CurrencyOption {
  code: string;
  label: string;
  symbol: string;
}

export const SUPPORTED_CURRENCIES: CurrencyOption[] = [
  { code: 'INR', label: 'INR (₹)', symbol: '₹' },
  { code: 'USD', label: 'USD ($)', symbol: '$' },
  { code: 'EUR', label: 'EUR (€)', symbol: '€' },
  { code: 'GBP', label: 'GBP (£)', symbol: '£' },
  { code: 'AED', label: 'AED (د.إ)', symbol: 'د.إ' },
  { code: 'SGD', label: 'SGD ($)', symbol: 'S$' },
];

/**
 * Format an amount with its currency code/symbol.
 * e.g., formatCurrency(72000, 'INR (₹)') => '₹72,000'
 */
export function formatCurrency(amount: number | null | undefined, currency: string = 'INR'): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '—';
  }

  // Extract clean 3-letter currency code (e.g. 'INR' from 'INR (₹)' or 'USD ($)')
  const cleanCode = currency.split(/[\s(]/)[0].trim().toUpperCase() || 'INR';

  try {
    return new Intl.NumberFormat(cleanCode === 'INR' ? 'en-IN' : 'en-US', {
      style: 'currency',
      currency: cleanCode,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
}
