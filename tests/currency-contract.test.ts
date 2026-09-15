import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { DEFAULT_CURRENCY, SUPPORTED_CURRENCIES, formatCurrency } from '@/shared/utils/currency';

describe('India currency contract', () => {
  it('formats every amount as Indian rupees regardless of legacy currency data', () => {
    expect(DEFAULT_CURRENCY).toBe('INR (₹)');
    expect(formatCurrency(123456.78, 'USD ($)')).toBe('₹1,23,456.78');
    expect(SUPPORTED_CURRENCIES).toEqual([{ code: 'INR', label: 'INR (₹)', symbol: '₹' }]);
  });

  it('keeps product and inventory pricing labels in rupees', () => {
    const productTable = readFileSync(new URL('../src/features/products/components/ProductsTable.tsx', import.meta.url), 'utf8');
    const productDetails = readFileSync(new URL('../src/features/products/components/ProductDetailDrawer.tsx', import.meta.url), 'utf8');
    const inventoryTable = readFileSync(new URL('../src/features/inventory/components/InventoryTable.tsx', import.meta.url), 'utf8');
    const transactionDetails = readFileSync(new URL('../src/features/sales/components/TransactionDetailDrawer.tsx', import.meta.url), 'utf8');
    for (const source of [productTable, productDetails, inventoryTable, transactionDetails]) {
      expect(source).not.toMatch(/USD|US Dollar|dollar/i);
      expect(source).toContain('₹');
    }
  });

  it('forces license callables to persist the application currency', () => {
    const functionsSource = readFileSync(new URL('../functions/src/index.ts', import.meta.url), 'utf8');
    expect(functionsSource).toContain("const APPLICATION_CURRENCY = 'INR (₹)';");
    expect(functionsSource).toContain('const currency = APPLICATION_CURRENCY;');
    expect(functionsSource).toContain('currency: APPLICATION_CURRENCY');
    expect(functionsSource).not.toContain("typeof d.currency === 'string' ? d.currency.trim() : ''");
  });
});
