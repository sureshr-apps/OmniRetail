import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
const source = readFileSync(new URL('../src/features/purchases/services/purchaseService.ts', import.meta.url), 'utf8');
describe('tenant purchase service adapter', () => { it('uses tenant reads and production lifecycle actions', () => { expect(source).toContain('listTenantPurchases'); expect(source).toContain("'changeTenantPurchaseStatus'"); expect(source).toContain("'receiveTenantPurchaseLineRecord'"); expect(source).toContain('new ProductionPurchaseService()'); }); });
