export const INR_DENOMINATIONS = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1] as const;

export type CashRegisterStatus = 'OPEN' | 'CLOSED' | 'AUTO_CLOSED' | 'NOT_OPEN';
export type CashMovementType = 'CASH_IN' | 'CASH_OUT';

export interface DenominationCount {
  denomination: number;
  quantity: number;
}

export interface CashRegisterSummary {
  sessionId: string | null;
  outletId: string;
  registerCode: string;
  businessDate: string;
  status: CashRegisterStatus;
  openingCash: number;
  carryForwardAmount: number;
  cashSales: number;
  cashRefunds: number;
  cashIn: number;
  cashOut: number;
  expectedCash: number;
  actualCash: number | null;
  variance: number | null;
  openedBy: string | null;
  openedAt: string | null;
  closedBy: string | null;
  closedAt: string | null;
  openingNote: string | null;
  closingNote: string | null;
}

export interface CashRegisterMovement {
  id: string;
  movementType: string;
  amount: number;
  sourceType: string | null;
  sourceId: string | null;
  reason: string | null;
  note: string | null;
  actorFirebaseUid: string;
  createdAt: string;
}

export interface CashRegisterSnapshot {
  summary: CashRegisterSummary;
  movements: CashRegisterMovement[];
  history: CashRegisterSummary[];
}

export function getIndiaBusinessDate(date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export function formatINR(value: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(value || 0);
}
