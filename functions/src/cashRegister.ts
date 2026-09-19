import { randomUUID } from 'node:crypto';
import type { PoolClient } from 'pg';
import { todayInIndia } from './inventoryBatches.js';

export const REGISTER_CODE = 'REG-01';
const EPSILON = 0.000001;

export type CashMovementType = 'CASH_IN' | 'CASH_OUT';
export type CashRegisterSessionStatus = 'OPEN' | 'CLOSED' | 'AUTO_CLOSED';

export interface DenominationCount {
  denomination: number;
  quantity: number;
}

export interface CashRegisterSummary {
  sessionId: string | null;
  outletId: string;
  registerCode: string;
  businessDate: string;
  status: CashRegisterSessionStatus | 'NOT_OPEN';
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

export interface CashRegisterMovementRecord {
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
  movements: CashRegisterMovementRecord[];
  history: CashRegisterSummary[];
}

export class CashRegisterError extends Error {
  readonly code:
    | 'INVALID_INPUT'
    | 'OUTLET_NOT_FOUND'
    | 'REGISTER_ALREADY_OPEN'
    | 'REGISTER_NOT_OPEN'
    | 'REGISTER_ALREADY_CLOSED'
    | 'INVALID_MOVEMENT'
    | 'INVALID_DENOMINATION_COUNT';

  constructor(code: CashRegisterError['code'], message: string) {
    super(message);
    this.name = 'CashRegisterError';
    this.code = code;
  }
}

function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateDenominationTotal(counts: readonly DenominationCount[]): number {
  return roundCurrency(counts.reduce((total, count) => total + count.denomination * count.quantity, 0));
}

export function validateDenominationCounts(counts: readonly DenominationCount[]): void {
  if (!counts.length) throw new CashRegisterError('INVALID_DENOMINATION_COUNT', 'Enter at least one cash denomination.');
  for (const count of counts) {
    if (!Number.isFinite(count.denomination) || count.denomination <= 0 || !Number.isFinite(count.quantity) || !Number.isInteger(count.quantity) || count.quantity < 0) {
      throw new CashRegisterError('INVALID_DENOMINATION_COUNT', 'Cash denomination counts are invalid.');
    }
  }
  const uniqueDenominations = new Set(counts.map((count) => count.denomination));
  if (uniqueDenominations.size !== counts.length) throw new CashRegisterError('INVALID_DENOMINATION_COUNT', 'Each denomination can be entered only once.');
}

export function calculateExpectedCash(openingCash: number, cashSales: number, cashRefunds: number, cashIn: number, cashOut: number): number {
  return roundCurrency(openingCash + cashSales - cashRefunds + cashIn - cashOut);
}

export function calculateMovementTotals(rows: readonly { movementType: string; amount: number }[]): Pick<CashRegisterSummary, 'cashSales' | 'cashRefunds' | 'cashIn' | 'cashOut'> {
  return rows.reduce((totals, row) => {
    const amount = Math.max(0, Number(row.amount) || 0);
    if (row.movementType === 'SALE') totals.cashSales += amount;
    else if (row.movementType === 'REFUND') totals.cashRefunds += amount;
    else if (row.movementType === 'CASH_IN') totals.cashIn += amount;
    else if (row.movementType === 'CASH_OUT') totals.cashOut += amount;
    return totals;
  }, { cashSales: 0, cashRefunds: 0, cashIn: 0, cashOut: 0 });
}

function assertNonNegativeAmount(amount: number, message: string): number {
  if (!Number.isFinite(amount) || amount < 0) throw new CashRegisterError('INVALID_INPUT', message);
  return roundCurrency(amount);
}

function validateBusinessDate(value: string): void {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new CashRegisterError('INVALID_INPUT', 'Business date must use YYYY-MM-DD format.');
  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (parsed.toISOString().slice(0, 10) !== value) throw new CashRegisterError('INVALID_INPUT', 'Business date is invalid.');
}

async function assertActiveOutlet(client: PoolClient, organizationId: string, outletId: string): Promise<void> {
  const result = await client.query(
    'SELECT id FROM "outlet" WHERE id = $1 AND organization_id = $2 AND status = \'ACTIVE\' FOR SHARE',
    [outletId, organizationId],
  );
  if (!result.rowCount) throw new CashRegisterError('OUTLET_NOT_FOUND', 'The selected outlet is not active in this organization.');
}

async function autoCloseStaleSessions(client: PoolClient, organizationId: string, outletId: string, businessDate: string): Promise<void> {
  const stale = await client.query(
    `SELECT id, opening_amount
       FROM "cash_register_session"
      WHERE organization_id = $1 AND outlet_id = $2 AND business_date < $3 AND status = 'OPEN'
      FOR UPDATE`,
    [organizationId, outletId, businessDate],
  );
  for (const session of stale.rows) {
    const totals = await client.query(
      `SELECT
          COALESCE(SUM(CASE WHEN movement_type = 'SALE' THEN amount ELSE 0 END), 0) AS cash_sales,
          COALESCE(SUM(CASE WHEN movement_type = 'REFUND' THEN amount ELSE 0 END), 0) AS cash_refunds,
          COALESCE(SUM(CASE WHEN movement_type = 'CASH_IN' THEN amount ELSE 0 END), 0) AS cash_in,
          COALESCE(SUM(CASE WHEN movement_type = 'CASH_OUT' THEN amount ELSE 0 END), 0) AS cash_out
         FROM "cash_register_movement"
        WHERE session_id = $1`,
      [session.id],
    );
    const row = totals.rows[0];
    const expected = calculateExpectedCash(Number(session.opening_amount), Number(row.cash_sales), Number(row.cash_refunds), Number(row.cash_in), Number(row.cash_out));
    await client.query(
      `UPDATE "cash_register_session"
          SET status = 'AUTO_CLOSED', closing_expected = $2, closing_actual = $2, variance = 0,
              closed_by = 'SYSTEM', closed_at = NOW()
        WHERE id = $1`,
      [session.id, expected],
    );
  }
}

async function loadSession(client: PoolClient, organizationId: string, outletId: string, businessDate: string, lock = false): Promise<any | null> {
  const result = await client.query(
    `SELECT id, register_code, business_date::text, status, opening_amount,
            closing_expected, closing_actual, variance, opened_by, opened_at::text,
            closed_by, closed_at::text, opening_note, closing_note
       FROM "cash_register_session"
      WHERE organization_id = $1 AND outlet_id = $2 AND business_date = $3
      LIMIT 1${lock ? ' FOR UPDATE' : ''}`,
    [organizationId, outletId, businessDate],
  );
  return result.rows[0] ?? null;
}

async function loadPreviousSession(client: PoolClient, organizationId: string, outletId: string, businessDate: string): Promise<any | null> {
  const result = await client.query(
    `SELECT id, register_code, business_date::text, status, opening_amount,
            closing_expected, closing_actual, variance, opened_by, opened_at::text,
            closed_by, closed_at::text, opening_note, closing_note
       FROM "cash_register_session"
      WHERE organization_id = $1 AND outlet_id = $2 AND business_date < $3
      ORDER BY business_date DESC
      LIMIT 1`,
    [organizationId, outletId, businessDate],
  );
  return result.rows[0] ?? null;
}

async function movementTotalsForSession(client: PoolClient, sessionId: string): Promise<Pick<CashRegisterSummary, 'cashSales' | 'cashRefunds' | 'cashIn' | 'cashOut'>> {
  const result = await client.query(
    `SELECT movement_type, amount
       FROM "cash_register_movement"
      WHERE session_id = $1`,
    [sessionId],
  );
  return calculateMovementTotals(result.rows.map((row) => ({ movementType: String(row.movement_type), amount: Number(row.amount) })));
}

function mapSessionSummary(
  session: any | null,
  outletId: string,
  businessDate: string,
  carryForwardAmount: number,
  totals: Pick<CashRegisterSummary, 'cashSales' | 'cashRefunds' | 'cashIn' | 'cashOut'>,
): CashRegisterSummary {
  const openingCash = session ? Number(session.opening_amount) : 0;
  const expectedCash = session ? calculateExpectedCash(openingCash, totals.cashSales, totals.cashRefunds, totals.cashIn, totals.cashOut) : 0;
  return {
    sessionId: session?.id ?? null,
    outletId,
    registerCode: session?.register_code ?? REGISTER_CODE,
    businessDate: session?.business_date ?? businessDate,
    status: session?.status ?? 'NOT_OPEN',
    openingCash: roundCurrency(openingCash),
    carryForwardAmount: roundCurrency(carryForwardAmount),
    cashSales: roundCurrency(totals.cashSales),
    cashRefunds: roundCurrency(totals.cashRefunds),
    cashIn: roundCurrency(totals.cashIn),
    cashOut: roundCurrency(totals.cashOut),
    expectedCash: roundCurrency(session?.closing_expected == null ? expectedCash : Number(session.closing_expected)),
    actualCash: session?.closing_actual == null ? null : roundCurrency(Number(session.closing_actual)),
    variance: session?.variance == null ? null : roundCurrency(Number(session.variance)),
    openedBy: session?.opened_by ?? null,
    openedAt: session?.opened_at ?? null,
    closedBy: session?.closed_by ?? null,
    closedAt: session?.closed_at ?? null,
    openingNote: session?.opening_note ?? null,
    closingNote: session?.closing_note ?? null,
  };
}

async function loadHistory(client: PoolClient, organizationId: string, outletId: string, startDate: string, endDate: string): Promise<CashRegisterSummary[]> {
  const result = await client.query(
    `SELECT id, register_code, business_date::text, status, opening_amount,
            closing_expected, closing_actual, variance, opened_by, opened_at::text,
            closed_by, closed_at::text, opening_note, closing_note
       FROM "cash_register_session"
      WHERE organization_id = $1 AND outlet_id = $2 AND business_date >= $3 AND business_date <= $4
      ORDER BY business_date DESC`,
    [organizationId, outletId, startDate, endDate],
  );
  const summaries: CashRegisterSummary[] = [];
  for (const session of result.rows) {
    const totals = await movementTotalsForSession(client, session.id);
    summaries.push(mapSessionSummary(session, outletId, String(session.business_date), Number(session.opening_amount), totals));
  }
  return summaries;
}

async function loadMovements(client: PoolClient, sessionId: string): Promise<CashRegisterMovementRecord[]> {
  const result = await client.query(
    `SELECT id, movement_type, amount, source_type, source_id, reason, note,
            actor_firebase_uid, created_at::text
       FROM "cash_register_movement"
      WHERE session_id = $1
      ORDER BY created_at DESC, id DESC
      LIMIT 100`,
    [sessionId],
  );
  return result.rows.map((row) => ({
    id: String(row.id),
    movementType: String(row.movement_type),
    amount: roundCurrency(Number(row.amount)),
    sourceType: row.source_type == null ? null : String(row.source_type),
    sourceId: row.source_id == null ? null : String(row.source_id),
    reason: row.reason == null ? null : String(row.reason),
    note: row.note == null ? null : String(row.note),
    actorFirebaseUid: String(row.actor_firebase_uid),
    createdAt: String(row.created_at),
  }));
}

export async function getCashRegisterSnapshot(
  client: PoolClient,
  input: { organizationId: string; outletId: string; businessDate?: string },
): Promise<CashRegisterSnapshot> {
  const businessDate = input.businessDate ?? todayInIndia();
  validateBusinessDate(businessDate);
  await assertActiveOutlet(client, input.organizationId, input.outletId);
  await autoCloseStaleSessions(client, input.organizationId, input.outletId, businessDate);
  const session = await loadSession(client, input.organizationId, input.outletId, businessDate);
  const previous = await loadPreviousSession(client, input.organizationId, input.outletId, businessDate);
  let carryForwardAmount = 0;
  if (previous) {
    if (previous.closing_expected != null) {
      carryForwardAmount = Number(previous.closing_expected);
    } else {
      const previousTotals = await movementTotalsForSession(client, previous.id);
      carryForwardAmount = calculateExpectedCash(previous.opening_amount, previousTotals.cashSales, previousTotals.cashRefunds, previousTotals.cashIn, previousTotals.cashOut);
    }
  }
  const totals = session ? await movementTotalsForSession(client, session.id) : { cashSales: 0, cashRefunds: 0, cashIn: 0, cashOut: 0 };
  const summary = mapSessionSummary(session, input.outletId, businessDate, carryForwardAmount, totals);
  return { summary, movements: session ? await loadMovements(client, session.id) : [], history: await loadHistory(client, input.organizationId, input.outletId, businessDate.slice(0, 8) + '01', businessDate) };
}

export async function listCashRegisterSummaries(
  client: PoolClient,
  input: { organizationId: string; outletId: string; startDate: string; endDate: string },
): Promise<CashRegisterSummary[]> {
  validateBusinessDate(input.startDate);
  validateBusinessDate(input.endDate);
  if (input.startDate > input.endDate) throw new CashRegisterError('INVALID_INPUT', 'Cash summary start date cannot be after the end date.');
  await assertActiveOutlet(client, input.organizationId, input.outletId);
  await autoCloseStaleSessions(client, input.organizationId, input.outletId, todayInIndia());
  return loadHistory(client, input.organizationId, input.outletId, input.startDate, input.endDate);
}

export async function openCashRegister(
  client: PoolClient,
  input: { organizationId: string; outletId: string; businessDate?: string; openingCounts: DenominationCount[]; actorFirebaseUid: string; openingNote?: string | null; requestId: string },
): Promise<CashRegisterSnapshot> {
  const businessDate = input.businessDate ?? todayInIndia();
  validateBusinessDate(businessDate);
  validateDenominationCounts(input.openingCounts);
  if (!input.organizationId || !input.outletId || !input.actorFirebaseUid || !input.requestId) throw new CashRegisterError('INVALID_INPUT', 'Register opening details are incomplete.');
  const openingAmount = calculateDenominationTotal(input.openingCounts);
  await assertActiveOutlet(client, input.organizationId, input.outletId);
  await autoCloseStaleSessions(client, input.organizationId, input.outletId, businessDate);
  const existing = await loadSession(client, input.organizationId, input.outletId, businessDate, true);
  if (existing) throw new CashRegisterError(existing.status === 'OPEN' ? 'REGISTER_ALREADY_OPEN' : 'REGISTER_ALREADY_CLOSED', 'This register already has a session for today.');
  const previous = await loadPreviousSession(client, input.organizationId, input.outletId, businessDate);
  if (previous?.closing_expected != null && Math.abs(openingAmount - Number(previous.closing_expected)) > EPSILON) {
    throw new CashRegisterError('INVALID_DENOMINATION_COUNT', `Opening cash must match the previous closing balance of ${Number(previous.closing_expected).toFixed(2)}.`);
  }
  const sessionId = randomUUID();
  await client.query(
    `INSERT INTO "cash_register_session"
      (id, organization_id, outlet_id, register_code, business_date, status,
       opening_amount, opened_by, opened_at, opening_note)
     VALUES ($1, $2, $3, $4, $5, 'OPEN', $6, $7, NOW(), $8)`,
    [sessionId, input.organizationId, input.outletId, REGISTER_CODE, businessDate, openingAmount, input.actorFirebaseUid, input.openingNote?.trim() || null],
  );
  for (const count of input.openingCounts) {
    await client.query(
      `INSERT INTO "cash_register_count" (id, session_id, count_type, denomination, quantity, amount, created_at)
       VALUES ($1, $2, 'OPENING', $3, $4, $5, NOW())`,
      [randomUUID(), sessionId, count.denomination, count.quantity, roundCurrency(count.denomination * count.quantity)],
    );
  }
  await client.query(
    `INSERT INTO "cash_register_movement"
      (id, organization_id, outlet_id, session_id, movement_type, amount,
       source_type, reason, note, actor_firebase_uid, request_id, created_at)
     VALUES ($1, $2, $3, $4, 'OPENING', $5, 'REGISTER_SESSION', 'Opening cash', $6, $7, $8, NOW())`,
    [randomUUID(), input.organizationId, input.outletId, sessionId, openingAmount, input.openingNote?.trim() || null, input.actorFirebaseUid, input.requestId],
  );
  return getCashRegisterSnapshot(client, input);
}

export async function recordCashMovement(
  client: PoolClient,
  input: { organizationId: string; outletId: string; businessDate?: string; movementType: CashMovementType; amount: number; reason: string; note?: string | null; actorFirebaseUid: string; requestId: string },
): Promise<CashRegisterSnapshot> {
  const businessDate = input.businessDate ?? todayInIndia();
  validateBusinessDate(businessDate);
  const amount = assertNonNegativeAmount(input.amount, 'Cash movement amount is invalid.');
  if (amount <= EPSILON || !input.reason.trim() || !input.actorFirebaseUid || !input.requestId) throw new CashRegisterError('INVALID_MOVEMENT', 'Cash movement details are incomplete.');
  await assertActiveOutlet(client, input.organizationId, input.outletId);
  await autoCloseStaleSessions(client, input.organizationId, input.outletId, businessDate);
  const session = await loadSession(client, input.organizationId, input.outletId, businessDate, true);
  if (!session || session.status !== 'OPEN') throw new CashRegisterError('REGISTER_NOT_OPEN', 'Open the register before recording cash movements.');
  await client.query(
    `INSERT INTO "cash_register_movement"
      (id, organization_id, outlet_id, session_id, movement_type, amount,
       reason, note, actor_firebase_uid, request_id, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())`,
    [randomUUID(), input.organizationId, input.outletId, session.id, input.movementType, amount, input.reason.trim(), input.note?.trim() || null, input.actorFirebaseUid, input.requestId],
  );
  return getCashRegisterSnapshot(client, input);
}

export async function closeCashRegister(
  client: PoolClient,
  input: { organizationId: string; outletId: string; businessDate?: string; closingCounts: DenominationCount[]; actorFirebaseUid: string; closingNote?: string | null; requestId: string },
): Promise<CashRegisterSnapshot> {
  const businessDate = input.businessDate ?? todayInIndia();
  validateBusinessDate(businessDate);
  validateDenominationCounts(input.closingCounts);
  if (!input.organizationId || !input.outletId || !input.actorFirebaseUid || !input.requestId) throw new CashRegisterError('INVALID_INPUT', 'Register closing details are incomplete.');
  await assertActiveOutlet(client, input.organizationId, input.outletId);
  const session = await loadSession(client, input.organizationId, input.outletId, businessDate, true);
  if (!session) throw new CashRegisterError('REGISTER_NOT_OPEN', 'There is no open register session for today.');
  if (session.status !== 'OPEN') throw new CashRegisterError('REGISTER_ALREADY_CLOSED', 'This register session is already closed.');
  const totals = await movementTotalsForSession(client, session.id);
  const expectedCash = calculateExpectedCash(Number(session.opening_amount), totals.cashSales, totals.cashRefunds, totals.cashIn, totals.cashOut);
  const actualCash = calculateDenominationTotal(input.closingCounts);
  const variance = roundCurrency(actualCash - expectedCash);
  for (const count of input.closingCounts) {
    await client.query(
      `INSERT INTO "cash_register_count" (id, session_id, count_type, denomination, quantity, amount, created_at)
       VALUES ($1, $2, 'CLOSING', $3, $4, $5, NOW())`,
      [randomUUID(), session.id, count.denomination, count.quantity, roundCurrency(count.denomination * count.quantity)],
    );
  }
  await client.query(
    `UPDATE "cash_register_session"
        SET status = 'CLOSED', closing_expected = $2, closing_actual = $3, variance = $4,
            closed_by = $5, closed_at = NOW(), closing_note = $6
      WHERE id = $1`,
    [session.id, expectedCash, actualCash, variance, input.actorFirebaseUid, input.closingNote?.trim() || null],
  );
  return getCashRegisterSnapshot(client, input);
}

export async function recordSaleCashMovement(
  client: PoolClient,
  input: { organizationId: string; outletId: string; cashAmount: number; saleId: string; receiptNumber: string; actorFirebaseUid: string; requestId: string },
): Promise<void> {
  const amount = assertNonNegativeAmount(input.cashAmount, 'Cash payment amount is invalid.');
  const businessDate = todayInIndia();
  const session = await loadSession(client, input.organizationId, input.outletId, businessDate, true);
  if (!session || session.status !== 'OPEN') throw new CashRegisterError('REGISTER_NOT_OPEN', 'Open the register before completing a sale.');
  if (amount <= EPSILON) return;
  await client.query(
    `INSERT INTO "cash_register_movement"
      (id, organization_id, outlet_id, session_id, movement_type, amount,
       source_type, source_id, reason, actor_firebase_uid, request_id, created_at)
     VALUES ($1, $2, $3, $4, 'SALE', $5, 'SALE', $6, $7, $8, $9, NOW())`,
    [randomUUID(), input.organizationId, input.outletId, session.id, amount, input.saleId, `Cash sale ${input.receiptNumber}`, input.actorFirebaseUid, `${input.requestId}-CASH`],
  );
}
