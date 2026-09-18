import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getCurrentMonthDateRange } from '@/features/purchases/utils/dateRange';

const page = readFileSync(new URL('../src/features/purchases/pages/PurchasesPage.tsx', import.meta.url), 'utf8');
const toolbar = readFileSync(new URL('../src/features/purchases/components/PurchasesFilterToolbar.tsx', import.meta.url), 'utf8');
const service = readFileSync(new URL('../src/features/purchases/services/purchaseService.ts', import.meta.url), 'utf8');

describe('purchase filter controls', () => {
  it('defaults the date range to the current month using local calendar dates', () => {
    expect(getCurrentMonthDateRange(new Date(2026, 8, 18))).toEqual({ start: '2026-09-01', end: '2026-09-30' });
  });

  it('uses a selectable from/to date range instead of a period dropdown', () => {
    expect(toolbar).toContain('Date Range');
    expect(toolbar.match(/type="date"/g)).toHaveLength(2);
    expect(toolbar).toContain('flex h-9 items-center');
    expect(toolbar).toContain('block w-full h-9');
    expect(toolbar).toContain('appearance-none h-9');
    expect(toolbar).toContain('dateRangeStart');
    expect(toolbar).toContain('dateRangeEnd');
    expect(toolbar).not.toContain('datePeriod');
    expect(toolbar).not.toContain('Period:');
    expect(toolbar).not.toContain('Status: Active (Exclude Cancelled)');
    expect(page).toContain('customStartDate: dateRangeStart');
    expect(page).toContain('customEndDate: dateRangeEnd');
    expect(page).not.toContain('purchaseStatus');
    expect(service).not.toContain('query.purchaseStatus');
  });

  it('keeps active tags only for explicit outlet, supplier, and payment filters', () => {
    expect(toolbar).toContain('hasActiveConstraints');
    expect(toolbar).toContain('Outlet: {selectedOutlet}');
    expect(toolbar).toContain('Supplier: {selectedSupplier}');
    expect(toolbar).toContain('Payment:');
  });
});
