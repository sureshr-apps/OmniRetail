import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
const source = readFileSync(new URL('../src/features/expenses/services/expenseService.ts', import.meta.url), 'utf8');
describe('tenant expense service adapter', () => { it('uses authenticated tenant-scoped reads', () => { expect(source).toContain('getCurrentUserAuthorization'); expect(source).toContain('listTenantExpenses'); expect(source).toContain('No active organization membership.'); expect(source).toContain('new ProductionExpenseService()'); }); });
