import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
const source = readFileSync(new URL('../src/features/purchases/services/purchaseService.ts', import.meta.url), 'utf8');
const modal = readFileSync(new URL('../src/features/purchases/components/CreatePurchaseModal.tsx', import.meta.url), 'utf8');
const functions = readFileSync(new URL('../functions/src/index.ts', import.meta.url), 'utf8');

describe('tenant purchase service adapter', () => {
  it('uses tenant reads and production lifecycle actions', () => {
    expect(source).toContain('listTenantPurchases');
    expect(source).toContain("'changeTenantPurchaseStatus'");
    expect(source).toContain("'receiveTenantPurchaseLineRecord'");
    expect(source).toContain('new ProductionPurchaseService()');
  });

  it('sends the selected purchase status and payment status to the callable', () => {
    expect(source).toContain('paymentStatus: input.paymentOption');
    expect(source).toContain('status: input.status.toUpperCase()');
    expect(source).toContain('input.outletId ? candidate.id === input.outletId');
  });

  it('initializes production supplier and outlet choices instead of fixture ids', () => {
    expect(modal).toContain('suppliers[0]?.id ?? \'\'');
    expect(modal).toContain('outlets[0]?.id ?? \'\'');
    expect(modal).not.toContain('sup-101');
    expect(modal).not.toContain('Downtown Flagship #04');
  });

  it('persists draft and active purchase statuses and rejects empty purchases', () => {
    expect(functions).toContain("const status = d.status === 'DRAFT' || d.status === 'ACTIVE' ? d.status : ''");
    expect(functions).toContain('status, createdBy');
    expect(functions).toContain('lines.length === 0');
    expect(modal).toContain('Add at least one product line before saving the purchase.');
  });
});
