import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
const source = readFileSync(new URL('../src/features/sales/services/salesService.ts', import.meta.url), 'utf8');
describe('tenant sales service adapter', () => { it('uses authenticated tenant sales reads', () => { expect(source).toContain('getCurrentUserAuthorization'); expect(source).toContain('listTenantSales'); expect(source).toContain('No active organization membership.'); expect(source).toContain('new ProductionSalesService()'); }); });
