import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
const source = readFileSync(new URL('../src/features/sales/services/salesService.ts', import.meta.url), 'utf8');
const pageSource = readFileSync(new URL('../src/features/sales/pages/SalesPage.tsx', import.meta.url), 'utf8');
describe('tenant sales service adapter', () => {
  it('uses authenticated tenant sales reads', () => { expect(source).toContain('getCurrentUserAuthorization'); expect(source).toContain('listTenantSales'); expect(source).toContain('No active organization membership.'); expect(source).toContain('new ProductionSalesService()'); });

  it('uses the selected outlet register expected cash for the drawer KPI', () => {
    expect(source).toContain('cashDrawerBalance: 0');
    expect(source).not.toContain('cashDrawerBalance: cashTotal');
    expect(pageSource).toContain('cashRegisterService.getSnapshot(selectedOutletId)');
    expect(pageSource).toContain('snapshot.summary.expectedCash');
  });
});
