import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowDownToLine, ArrowUpFromLine, Banknote, CalendarDays, CheckCircle2, CircleDollarSign, LockKeyhole, RefreshCw, WalletCards } from 'lucide-react';
import { useTenantOutlet } from '@/app/context/TenantOutletContext';
import { Modal } from '@/shared/components/Modal';
import { cashRegisterService } from '../services/cashRegisterService';
import { CashMovementType, CashRegisterMovement, CashRegisterSnapshot, CashRegisterSummary, formatINR, getIndiaBusinessDate, INR_DENOMINATIONS } from '../types';

type CashTab = 'current' | 'movements' | 'summary';

function emptyCounts(): Record<number, string> {
  return Object.fromEntries(INR_DENOMINATIONS.map((denomination) => [denomination, ''])) as Record<number, string>;
}

function toCounts(values: Record<number, string>) {
  return INR_DENOMINATIONS.map((denomination) => ({ denomination, quantity: Number(values[denomination] || 0) }));
}

function dateTime(value: string | null): string {
  return value ? new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' }).format(new Date(value)) : '—';
}

function statusLabel(status: CashRegisterSummary['status']): string {
  return status === 'AUTO_CLOSED' ? 'Auto-closed' : status === 'NOT_OPEN' ? 'Not opened' : status[0] + status.slice(1).toLowerCase();
}

function SummaryMetric({ label, value, tone = 'default' }: { label: string; value: string; tone?: 'default' | 'positive' | 'negative' }) {
  return <div className="rounded-lg border border-border-subdued bg-surface-elevated p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">{label}</p>
    <p className={`mt-2 text-xl font-semibold ${tone === 'positive' ? 'text-green-700' : tone === 'negative' ? 'text-red-700' : 'text-text-primary'}`}>{value}</p>
  </div>;
}

function DenominationGrid({ values, onChange, label }: { values: Record<number, string>; onChange: (denomination: number, value: string) => void; label: string }) {
  return <fieldset>
    <legend className="mb-3 text-sm font-semibold text-text-primary">{label}</legend>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {INR_DENOMINATIONS.map((denomination) => <label key={denomination} className="text-xs font-medium text-text-secondary">
        <span className="mb-1 block">₹{denomination}</span>
        <input type="number" min="0" step="1" inputMode="numeric" value={values[denomination]} onChange={(event) => onChange(denomination, event.target.value)} className="h-10 w-full rounded-md border border-border-subdued bg-surface-subdued px-3 text-sm text-text-primary focus:border-primary focus:outline-none" aria-label={`${label} ₹${denomination} count`} />
      </label>)}
    </div>
  </fieldset>;
}

function RegisterStateBanner({ summary }: { summary: CashRegisterSummary }) {
  const open = summary.status === 'OPEN';
  const closed = summary.status === 'CLOSED' || summary.status === 'AUTO_CLOSED';
  return <div className={`flex flex-wrap items-center justify-between gap-3 rounded-lg border px-4 py-3 ${open ? 'border-green-200 bg-green-50' : closed ? 'border-sky-200 bg-sky-50' : 'border-amber-200 bg-amber-50'}`}>
    <div className="flex items-center gap-3">
      <div className={`rounded-full p-2 ${open ? 'bg-green-100 text-green-700' : closed ? 'bg-sky-100 text-sky-700' : 'bg-amber-100 text-amber-700'}`}><WalletCards className="h-4 w-4" /></div>
      <div><p className="text-sm font-semibold text-text-primary">{summary.registerCode} · {statusLabel(summary.status)}</p><p className="text-xs text-text-secondary">Business date {summary.businessDate} · one register per outlet</p></div>
    </div>
    <p className="text-sm font-semibold text-text-primary">Expected cash {formatINR(summary.expectedCash)}</p>
  </div>;
}

export function CashManagementPage() {
  const outletSelection = useTenantOutlet();
  const selectedOutletId = outletSelection?.selectedOutletId ?? null;
  const [tab, setTab] = useState<CashTab>('current');
  const [snapshot, setSnapshot] = useState<CashRegisterSnapshot | null>(null);
  const [history, setHistory] = useState<CashRegisterSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isCloseModal, setIsCloseModal] = useState(false);
  const [movementType, setMovementType] = useState<CashMovementType>('CASH_IN');
  const [isMovementModal, setIsMovementModal] = useState(false);
  const [openingCounts, setOpeningCounts] = useState<Record<number, string>>(emptyCounts);
  const [closingCounts, setClosingCounts] = useState<Record<number, string>>(emptyCounts);
  const [openingNote, setOpeningNote] = useState('');
  const [closingNote, setClosingNote] = useState('');
  const [movementAmount, setMovementAmount] = useState('');
  const [movementReason, setMovementReason] = useState('');
  const [movementNote, setMovementNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [startDate, setStartDate] = useState(() => getIndiaBusinessDate().slice(0, 8) + '01');
  const [endDate, setEndDate] = useState(() => getIndiaBusinessDate());

  const loadSnapshot = useCallback(async () => {
    if (!selectedOutletId) { setSnapshot(null); return; }
    setIsLoading(true); setError(null);
    try { setSnapshot(await cashRegisterService.getSnapshot(selectedOutletId)); }
    catch (loadError) { setError(loadError instanceof Error ? loadError.message : 'Unable to load the cash register.'); }
    finally { setIsLoading(false); }
  }, [selectedOutletId]);

  const loadHistory = useCallback(async () => {
    if (!selectedOutletId) { setHistory([]); return; }
    try { setHistory(await cashRegisterService.listSummaries(selectedOutletId, startDate, endDate)); }
    catch (loadError) { setError(loadError instanceof Error ? loadError.message : 'Unable to load cash summary.'); }
  }, [endDate, selectedOutletId, startDate]);

  useEffect(() => { void loadSnapshot(); }, [loadSnapshot]);
  useEffect(() => { if (tab === 'summary') void loadHistory(); }, [loadHistory, tab]);

  const current = snapshot?.summary ?? null;
  const openingTotal = useMemo(() => toCounts(openingCounts).reduce((sum, item) => sum + item.denomination * item.quantity, 0), [openingCounts]);
  const closingTotal = useMemo(() => toCounts(closingCounts).reduce((sum, item) => sum + item.denomination * item.quantity, 0), [closingCounts]);

  async function refreshAfter(action: () => Promise<CashRegisterSnapshot>) {
    setIsSaving(true); setError(null);
    try { setSnapshot(await action()); setIsOpenModal(false); setIsCloseModal(false); setIsMovementModal(false); setOpeningCounts(emptyCounts()); setClosingCounts(emptyCounts()); setOpeningNote(''); setClosingNote(''); setMovementAmount(''); setMovementReason(''); setMovementNote(''); if (tab === 'summary') await loadHistory(); }
    catch (saveError) { setError(saveError instanceof Error ? saveError.message : 'Unable to save the cash register change.'); }
    finally { setIsSaving(false); }
  }

  async function submitMovement(event: React.FormEvent) {
    event.preventDefault();
    if (!selectedOutletId) return;
    await refreshAfter(() => cashRegisterService.recordMovement(selectedOutletId, movementType, Number(movementAmount), movementReason, movementNote));
  }

  if (!selectedOutletId) return <div className="mx-auto max-w-4xl py-10"><div className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-center"><CircleDollarSign className="mx-auto h-8 w-8 text-amber-700" /><h1 className="mt-3 text-lg font-semibold text-text-primary">Select an outlet to manage cash</h1><p className="mt-1 text-sm text-text-secondary">Choose the active outlet from the header before opening or reviewing its register.</p></div></div>;

  return <div className="flex min-w-0 flex-col gap-5">
    <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Store operations</p><h1 className="mt-1 text-2xl font-semibold text-text-primary">Cash Management</h1><p className="mt-1 text-sm text-text-secondary">Opening cash, cash movements, and end-of-day register reconciliation for {outletSelection?.selectedOutlet?.name ?? 'the selected outlet'}.</p></div><button type="button" onClick={() => void loadSnapshot()} disabled={isLoading} className="inline-flex items-center gap-2 rounded-md border border-border-subdued bg-surface-elevated px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface-subdued disabled:opacity-50"><RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />Refresh</button></div>
    {error && <div role="alert" className="flex items-center justify-between gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"><span>{error}</span><button type="button" className="font-semibold underline" onClick={() => setError(null)}>Dismiss</button></div>}
    {snapshot && <RegisterStateBanner summary={snapshot.summary} />}
    <div className="flex flex-wrap gap-1 border-b border-border-subdued"><button type="button" onClick={() => setTab('current')} className={`border-b-2 px-4 py-2 text-sm font-semibold ${tab === 'current' ? 'border-primary text-primary' : 'border-transparent text-text-secondary'}`}>Current Register</button><button type="button" onClick={() => setTab('movements')} className={`border-b-2 px-4 py-2 text-sm font-semibold ${tab === 'movements' ? 'border-primary text-primary' : 'border-transparent text-text-secondary'}`}>Cash Movements</button><button type="button" onClick={() => setTab('summary')} className={`border-b-2 px-4 py-2 text-sm font-semibold ${tab === 'summary' ? 'border-primary text-primary' : 'border-transparent text-text-secondary'}`}>Cash Summary</button></div>

    {current && tab === 'current' && <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><SummaryMetric label="Opening cash" value={formatINR(current.openingCash)} /><SummaryMetric label="Cash sales" value={formatINR(current.cashSales)} tone="positive" /><SummaryMetric label="Cash in / out" value={`${formatINR(current.cashIn)} / ${formatINR(current.cashOut)}`} /><SummaryMetric label="Expected cash" value={formatINR(current.expectedCash)} /></div>
      <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]"><section className="rounded-lg border border-border-subdued bg-surface-elevated p-5"><div className="flex items-start justify-between gap-3"><div><h2 className="font-semibold text-text-primary">Register controls</h2><p className="mt-1 text-sm text-text-secondary">The register is shared by the outlet for this IST business date.</p></div><Banknote className="h-5 w-5 text-primary" /></div><div className="mt-5 flex flex-wrap gap-2">{current.status === 'NOT_OPEN' && <button type="button" onClick={() => setIsOpenModal(true)} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"><ArrowUpFromLine className="h-4 w-4" />Open Register</button>}{current.status === 'OPEN' && <><button type="button" onClick={() => { setMovementType('CASH_IN'); setIsMovementModal(true); }} className="inline-flex items-center gap-2 rounded-md border border-green-300 bg-green-50 px-4 py-2 text-sm font-semibold text-green-800"><ArrowDownToLine className="h-4 w-4" />Cash In</button><button type="button" onClick={() => { setMovementType('CASH_OUT'); setIsMovementModal(true); }} className="inline-flex items-center gap-2 rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-800"><ArrowUpFromLine className="h-4 w-4" />Cash Out</button><button type="button" onClick={() => setIsCloseModal(true)} className="inline-flex items-center gap-2 rounded-md border border-border-subdued bg-surface-subdued px-4 py-2 text-sm font-semibold text-text-primary"><LockKeyhole className="h-4 w-4" />Close Register</button></>}{(current.status === 'CLOSED' || current.status === 'AUTO_CLOSED') && <div className="inline-flex items-center gap-2 rounded-md bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800"><CheckCircle2 className="h-4 w-4" />Register closed for today</div>}</div>{current.carryForwardAmount > 0 && current.status === 'NOT_OPEN' && <p className="mt-4 rounded-md bg-surface-subdued px-3 py-2 text-xs text-text-secondary">Previous closing balance to carry forward: <strong>{formatINR(current.carryForwardAmount)}</strong>. Enter the physical denominations at opening; any difference is recorded in the opening note.</p>}</section><section className="rounded-lg border border-border-subdued bg-surface-elevated p-5"><h2 className="font-semibold text-text-primary">Reconciliation</h2><dl className="mt-4 space-y-3 text-sm"><div className="flex justify-between"><dt className="text-text-secondary">Actual counted</dt><dd className="font-semibold text-text-primary">{current.actualCash == null ? 'Not closed' : formatINR(current.actualCash)}</dd></div><div className="flex justify-between"><dt className="text-text-secondary">Variance</dt><dd className={`font-semibold ${current.variance && current.variance < 0 ? 'text-red-700' : 'text-green-700'}`}>{current.variance == null ? 'Not closed' : formatINR(current.variance)}</dd></div><div className="flex justify-between"><dt className="text-text-secondary">Last closed</dt><dd className="text-right font-semibold text-text-primary">{dateTime(current.closedAt)}</dd></div></dl></section></div>
    </>}

    {snapshot && tab === 'movements' && <section className="rounded-lg border border-border-subdued bg-surface-elevated"><div className="flex items-center justify-between border-b border-border-subdued px-5 py-4"><div><h2 className="font-semibold text-text-primary">Cash movement ledger</h2><p className="mt-1 text-xs text-text-secondary">Sales, refunds, opening cash, and manual cash-in/out entries for today.</p></div>{current?.status === 'OPEN' && <button type="button" onClick={() => setIsMovementModal(true)} className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white">Add movement</button>}</div><MovementTable movements={snapshot.movements} /></section>}

    {tab === 'summary' && <section className="rounded-lg border border-border-subdued bg-surface-elevated"><div className="flex flex-wrap items-end justify-between gap-4 border-b border-border-subdued px-5 py-4"><div><h2 className="font-semibold text-text-primary">Daily cash summary</h2><p className="mt-1 text-xs text-text-secondary">Closed and open register sessions for the selected outlet.</p></div><div className="flex flex-wrap items-end gap-2"><label className="text-xs font-medium text-text-secondary">From<input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} className="mt-1 block h-9 rounded-md border border-border-subdued px-2 text-sm text-text-primary" /></label><label className="text-xs font-medium text-text-secondary">To<input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} className="mt-1 block h-9 rounded-md border border-border-subdued px-2 text-sm text-text-primary" /></label><button type="button" onClick={() => void loadHistory()} className="h-9 rounded-md bg-primary px-3 text-sm font-semibold text-white">Apply</button></div></div><SummaryTable summaries={history} /></section>}

    <Modal isOpen={isOpenModal} onClose={() => !isSaving && setIsOpenModal(false)} title="Open register" description="Count the physical opening cash by denomination. Billing records cash amounts only; denomination counts are captured here."><form onSubmit={(event) => { event.preventDefault(); if (selectedOutletId) void refreshAfter(() => cashRegisterService.open(selectedOutletId, toCounts(openingCounts), openingNote)); }} className="space-y-5"><DenominationGrid label="Opening denominations" values={openingCounts} onChange={(denomination, value) => setOpeningCounts((currentValues) => ({ ...currentValues, [denomination]: value }))} /><div className="rounded-md bg-surface-subdued px-3 py-2 text-sm text-text-secondary">Opening total: <strong className="text-text-primary">{formatINR(openingTotal)}</strong></div><label className="block text-sm font-medium text-text-secondary">Note<textarea value={openingNote} onChange={(event) => setOpeningNote(event.target.value)} rows={3} className="mt-1 w-full rounded-md border border-border-subdued px-3 py-2 text-sm text-text-primary" placeholder="Optional opening note" /></label><button disabled={isSaving} className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50">{isSaving ? 'Opening…' : 'Open register'}</button></form></Modal>
    <Modal isOpen={isCloseModal} onClose={() => !isSaving && setIsCloseModal(false)} title="Close register" description="Count the physical cash at close. Expected cash is calculated from opening cash, cash sales, refunds, and cash movements."><form onSubmit={(event) => { event.preventDefault(); if (selectedOutletId) void refreshAfter(() => cashRegisterService.close(selectedOutletId, toCounts(closingCounts), closingNote)); }} className="space-y-5"><DenominationGrid label="Closing denominations" values={closingCounts} onChange={(denomination, value) => setClosingCounts((currentValues) => ({ ...currentValues, [denomination]: value }))} /><div className="rounded-md bg-surface-subdued px-3 py-2 text-sm text-text-secondary">Counted total: <strong className="text-text-primary">{formatINR(closingTotal)}</strong></div><label className="block text-sm font-medium text-text-secondary">Note<textarea value={closingNote} onChange={(event) => setClosingNote(event.target.value)} rows={3} className="mt-1 w-full rounded-md border border-border-subdued px-3 py-2 text-sm text-text-primary" placeholder="Optional closing note" /></label><button disabled={isSaving} className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50">{isSaving ? 'Closing…' : 'Close register'}</button></form></Modal>
    <Modal isOpen={isMovementModal} onClose={() => !isSaving && setIsMovementModal(false)} title={movementType === 'CASH_IN' ? 'Record cash in' : 'Record cash out'} description="Record every manual addition or removal so the register can be reconciled without changing the sale ledger."><form onSubmit={submitMovement} className="space-y-4"><label className="block text-sm font-medium text-text-secondary">Amount (₹)<input required type="number" min="0.01" step="0.01" value={movementAmount} onChange={(event) => setMovementAmount(event.target.value)} className="mt-1 h-10 w-full rounded-md border border-border-subdued px-3 text-sm text-text-primary" /></label><label className="block text-sm font-medium text-text-secondary">Reason<input required value={movementReason} onChange={(event) => setMovementReason(event.target.value)} className="mt-1 h-10 w-full rounded-md border border-border-subdued px-3 text-sm text-text-primary" placeholder="e.g. Petty cash top-up" /></label><label className="block text-sm font-medium text-text-secondary">Note<textarea value={movementNote} onChange={(event) => setMovementNote(event.target.value)} rows={3} className="mt-1 w-full rounded-md border border-border-subdued px-3 py-2 text-sm text-text-primary" placeholder="Optional note" /></label><button disabled={isSaving} className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50">{isSaving ? 'Saving…' : `Save ${movementType === 'CASH_IN' ? 'cash in' : 'cash out'}`}</button></form></Modal>
  </div>;
}

function MovementTable({ movements }: { movements: CashRegisterMovement[] }) {
  if (!movements.length) return <div className="p-8 text-center text-sm text-text-secondary">No cash movements recorded for this register yet.</div>;
  return <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-surface-subdued text-xs uppercase tracking-wide text-text-muted"><tr><th className="px-5 py-3">Type</th><th className="px-5 py-3">Amount</th><th className="px-5 py-3">Reason</th><th className="px-5 py-3">Time</th></tr></thead><tbody className="divide-y divide-border-subdued">{movements.map((movement) => <tr key={movement.id}><td className="px-5 py-3 font-semibold text-text-primary">{movement.movementType.replace('_', ' ')}</td><td className={`px-5 py-3 font-semibold ${movement.movementType === 'CASH_OUT' || movement.movementType === 'REFUND' ? 'text-red-700' : 'text-green-700'}`}>{formatINR(movement.amount)}</td><td className="px-5 py-3 text-text-secondary">{movement.reason ?? '—'}{movement.note && <span className="block text-xs text-text-muted">{movement.note}</span>}</td><td className="whitespace-nowrap px-5 py-3 text-text-secondary">{dateTime(movement.createdAt)}</td></tr>)}</tbody></table></div>;
}

function SummaryTable({ summaries }: { summaries: CashRegisterSummary[] }) {
  if (!summaries.length) return <div className="p-8 text-center text-sm text-text-secondary">No register sessions found for this date range.</div>;
  return <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-surface-subdued text-xs uppercase tracking-wide text-text-muted"><tr><th className="px-5 py-3">Date</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Opening</th><th className="px-5 py-3">Cash sales</th><th className="px-5 py-3">Expected</th><th className="px-5 py-3">Actual</th><th className="px-5 py-3">Variance</th></tr></thead><tbody className="divide-y divide-border-subdued">{summaries.map((summary) => <tr key={summary.sessionId ?? summary.businessDate}><td className="px-5 py-3 font-semibold text-text-primary">{summary.businessDate}</td><td className="px-5 py-3 text-text-secondary">{statusLabel(summary.status)}</td><td className="px-5 py-3 text-text-secondary">{formatINR(summary.openingCash)}</td><td className="px-5 py-3 text-text-secondary">{formatINR(summary.cashSales)}</td><td className="px-5 py-3 font-semibold text-text-primary">{formatINR(summary.expectedCash)}</td><td className="px-5 py-3 text-text-secondary">{summary.actualCash == null ? '—' : formatINR(summary.actualCash)}</td><td className={`px-5 py-3 font-semibold ${summary.variance && summary.variance < 0 ? 'text-red-700' : 'text-green-700'}`}>{summary.variance == null ? '—' : formatINR(summary.variance)}</td></tr>)}</tbody></table></div>;
}
