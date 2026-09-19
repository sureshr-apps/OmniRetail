import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { resolveExpenseActor } from '@/features/expenses/services/expenseService';

const page = readFileSync(new URL('../src/features/expenses/pages/ExpensesPage.tsx', import.meta.url), 'utf8');
const modal = readFileSync(new URL('../src/features/expenses/components/AddExpenseModal.tsx', import.meta.url), 'utf8');
const filters = readFileSync(new URL('../src/features/expenses/components/ExpensesFilterBar.tsx', import.meta.url), 'utf8');
const detail = readFileSync(new URL('../src/features/expenses/components/ExpenseDetailDrawer.tsx', import.meta.url), 'utf8');
const workflow = readFileSync(new URL('../src/features/expenses/components/WorkflowBanner.tsx', import.meta.url), 'utf8');
const service = readFileSync(new URL('../src/features/expenses/services/expenseService.ts', import.meta.url), 'utf8');

describe('expense UI production-data contract', () => {
  it('uses live outlets and employees instead of fixture options', () => {
    expect(page).toContain('outletService.getAllActiveOutlets()');
    expect(page).toContain('employeeService.getAllEmployees()');
    expect(modal).toContain('outlets.map');
    expect(modal).toContain('employees.map');
    expect(filters).toContain('outlets.map');
    for (const fixture of ['Downtown Flagship #04', 'Uptown Mall #12', 'Sarah Jenkins', 'Elena Rostova']) {
      expect(modal).not.toContain(fixture);
      expect(filters).not.toContain(fixture);
    }
  });

  it('does not prefill new expenses with demo records', () => {
    for (const fixture of ['EX-2024-092', '2024-10-25', 'Apex Packaging Co.', 'INV-APX-441', 'Thermal Paper Roll Refills', '250.0', '22.5']) {
      expect(modal).not.toContain(fixture);
    }
    expect(modal).toContain('getLocalDateInputValue');
    expect(page).not.toContain('allExpensesForKpi.length || 48');
    expect(page).not.toContain('EX-2024-090');
  });

  it('removes unsupported expense attachments and fake workflow fallbacks', () => {
    expect(modal).not.toContain('ATTACH TAX INVOICE');
    expect(modal).not.toContain('attachedFileName');
    expect(detail).not.toContain('SUPPORTING INVOICES');
    expect(detail).not.toContain('Certified Upload');
    expect(detail).not.toContain('Invoice_');
    expect(workflow).not.toContain('Tier-2 Manager Review');
    expect(workflow).not.toContain('DISPATCHED #04');
    expect(page).not.toContain('Sarah Jenkins (Store Mgr #04)');
    expect(page).not.toContain('Voucher lacks valid tax registration number');
  });

  it('persists the selected outlet and authenticated submitting user', () => {
    expect(service).toContain('outletId: input.outletId ?? null');
    expect(service).toContain("scope: input.scope ?? 'Outlet'");
    expect(service).toContain('submittedBy, requestId');
    expect(service).not.toContain('submittedBy: input.paidByEmployee');
    expect(resolveExpenseActor({ displayName: '  Asha Rao ', username: 'asha' })).toBe('Asha Rao');
    expect(resolveExpenseActor({ displayName: '', username: 'asha' })).toBe('asha');
    expect(() => resolveExpenseActor(undefined)).toThrow('Current user identity is unavailable.');
  });
});
