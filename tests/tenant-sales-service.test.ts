import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { matchesSalesFilter } from '@/features/sales/services/salesService';
import type { SalesTransaction } from '@/features/sales/types';
const source = readFileSync(new URL('../src/features/sales/services/salesService.ts', import.meta.url), 'utf8');
const pageSource = readFileSync(new URL('../src/features/sales/pages/SalesPage.tsx', import.meta.url), 'utf8');
const filterSource = readFileSync(new URL('../src/features/sales/components/SalesFilterBar.tsx', import.meta.url), 'utf8');
const headerSource = readFileSync(new URL('../src/features/sales/components/SalesHeader.tsx', import.meta.url), 'utf8');
describe('tenant sales service adapter', () => {
  it('uses authenticated tenant sales reads', () => { expect(source).toContain('getCurrentUserAuthorization'); expect(source).toContain('listTenantSales'); expect(source).toContain('No active organization membership.'); expect(source).toContain('new ProductionSalesService()'); });

  it('uses the selected outlet register expected cash for the drawer KPI', () => {
    expect(source).toContain('cashDrawerBalance: 0');
    expect(source).not.toContain('cashDrawerBalance: cashTotal');
    expect(pageSource).toContain('cashRegisterService.getSnapshot(selectedOutletId)');
    expect(pageSource).toContain('snapshot.summary.expectedCash');
  });

  it('labels Today from the current date and keeps the sales header generic', () => {
    expect(filterSource).toContain("toLocaleDateString(undefined, { month: 'short', day: 'numeric' })");
    expect(filterSource).not.toContain('Oct 28');
    expect(headerSource).toContain('POS Terminal');
    expect(headerSource).not.toContain('POS Terminal ·');
    expect(headerSource).not.toContain('Flagship Store #04');
  });

  it('shows transactions from the current local calendar day in the Today filter', () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0).toISOString();
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 12, 0, 0).toISOString();
    const transaction = (timestamp: string) => ({
      id: timestamp,
      receiptNumber: 'R-1',
      source: 'Data Connect',
      timestamp,
      displayDate: '',
      displayTime: '',
      customer: { name: 'Walk-in' },
      staff: { id: 'u1', name: 'Asha' },
      channel: 'POS',
      terminalId: 'POS-01',
      terminalName: 'POS-01',
      items: [],
      itemsSummary: '',
      skuSummary: '',
      tender: { type: 'cash', label: 'CASH' },
      tax: 0,
      taxLabel: '',
      discount: 0,
      discountLabel: '',
      subtotal: 10,
      totalNet: 10,
      status: 'COMPLETED',
    } as SalesTransaction);
    const query = { dateRange: 'today' as const, channel: 'All Channels (Unified)', paymentMethod: 'All Tender Methods', status: 'All Statuses', cashier: 'All Personnel', searchQuery: '', page: 1, pageSize: 25 };

    expect(matchesSalesFilter(transaction(today), query)).toBe(true);
    expect(matchesSalesFilter(transaction(yesterday), query)).toBe(false);
  });
});
