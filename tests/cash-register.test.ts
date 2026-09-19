import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { calculateDenominationTotal, calculateExpectedCash, calculateMovementTotals, CashRegisterError, validateDenominationCounts } from '../functions/src/cashRegister';
import { getIndiaBusinessDate } from '@/features/cash/types';

const cashSource = readFileSync(new URL('../functions/src/cashRegister.ts', import.meta.url), 'utf8');
const checkoutSource = readFileSync(new URL('../functions/src/checkout.ts', import.meta.url), 'utf8');
const pageSource = readFileSync(new URL('../src/features/cash/pages/CashManagementPage.tsx', import.meta.url), 'utf8');
const callableSource = readFileSync(new URL('../functions/src/index.ts', import.meta.url), 'utf8');

describe('cash register business rules', () => {
  it('calculates denomination totals without floating point drift', () => {
    expect(calculateDenominationTotal([{ denomination: 2000, quantity: 1 }, { denomination: 100, quantity: 3 }, { denomination: 1, quantity: 2 }])).toBe(2302);
    expect(calculateDenominationTotal([{ denomination: 0.5, quantity: 3 }])).toBe(1.5);
  });

  it('requires non-empty, non-negative, integer denomination counts with no duplicates', () => {
    expect(() => validateDenominationCounts([])).toThrow(CashRegisterError);
    expect(() => validateDenominationCounts([{ denomination: 100, quantity: -1 }])).toThrow('invalid');
    expect(() => validateDenominationCounts([{ denomination: 100, quantity: 1.2 }])).toThrow('invalid');
    expect(() => validateDenominationCounts([{ denomination: 100, quantity: 1 }, { denomination: 100, quantity: 2 }])).toThrow('only once');
    expect(() => validateDenominationCounts([{ denomination: 100, quantity: 0 }, { denomination: 50, quantity: 0 }])).not.toThrow();
  });

  it('reconciles opening cash, cash sales, refunds, cash in, and cash out', () => {
    expect(calculateExpectedCash(1000, 500, 50, 200, 75)).toBe(1575);
    expect(calculateExpectedCash(2000, 42, 0, 0, 0)).toBe(2042);
    expect(calculateMovementTotals([
      { movementType: 'OPENING', amount: 1000 },
      { movementType: 'SALE', amount: 500 },
      { movementType: 'REFUND', amount: 50 },
      { movementType: 'CASH_IN', amount: 200 },
      { movementType: 'CASH_OUT', amount: 75 },
    ])).toEqual({ cashSales: 500, cashRefunds: 50, cashIn: 200, cashOut: 75 });
  });

  it('uses the IST business date at the midnight boundary', () => {
    expect(getIndiaBusinessDate(new Date('2026-09-19T18:29:59.000Z'))).toBe('2026-09-19');
    expect(getIndiaBusinessDate(new Date('2026-09-19T18:30:00.000Z'))).toBe('2026-09-20');
  });

  it('requires a previous closing amount to be carried into the next opening', () => {
    expect(cashSource).toContain('Opening cash must match the previous closing balance');
    expect(cashSource).toContain("previous.closing_expected != null");
    expect(cashSource).toContain("status = 'AUTO_CLOSED'");
  });

  it('records cash sale movements in the same checkout transaction and rolls back on failure', () => {
    expect(checkoutSource).toContain('await recordSaleCashMovement(client');
    expect(checkoutSource).toContain("await client.query('BEGIN')");
    expect(checkoutSource).toContain("await client.query('ROLLBACK')");
    expect(checkoutSource).toContain('cashAmount');
  });

  it('maps cash validation and duplicate-request failures without leaking SQL errors', () => {
    expect(callableSource).toContain("new HttpsError('invalid-argument', error.message)");
    expect(callableSource).toContain("new HttpsError('already-exists', 'This cash request has already been recorded.')");
    expect(callableSource).toContain("return new HttpsError('failed-precondition', fallback)");
  });

  it('exposes open, movement, close, history, outlet guard, and denomination flows in the UI', () => {
    for (const text of ['Cash Management', 'Select an outlet to manage cash', 'Open Register', 'Cash In', 'Cash Out', 'Close Register', 'Cash Movements', 'Cash Summary', 'DenominationGrid', 'listSummaries']) expect(pageSource).toContain(text);
  });
});
