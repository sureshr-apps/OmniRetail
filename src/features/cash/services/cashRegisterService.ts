import { getCurrentUserAuthorization } from '@omniretail/sql-connect';
import { httpsCallable } from 'firebase/functions';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';
import { CashMovementType, CashRegisterSnapshot, DenominationCount } from '../types';

interface CallableSnapshotResponse extends CashRegisterSnapshot {
  success: boolean;
  organizationId: string;
  outletId: string;
}

interface CallableSummaryResponse {
  success: boolean;
  summaries: CashRegisterSnapshot['history'];
}

async function organizationId(): Promise<string> {
  const authorization = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect);
  const membership = authorization.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE');
  if (!membership) throw new Error('No active organization membership.');
  return membership.organization.id;
}

function callSnapshot(name: string, payload: Record<string, unknown>): Promise<CashRegisterSnapshot> {
  return httpsCallable<Record<string, unknown>, CallableSnapshotResponse>(getFirebaseClientServices().functions, name)(payload)
    .then((response) => response.data);
}

export const cashRegisterService = {
  getSnapshot: async (outletId: string, businessDate = undefined as string | undefined) => {
    const orgId = await organizationId();
    return callSnapshot('getTenantCashRegisterSummary', { organizationId: orgId, outletId, ...(businessDate ? { businessDate } : {}) });
  },

  listSummaries: async (outletId: string, startDate: string, endDate: string) => {
    const orgId = await organizationId();
    const response = await httpsCallable<Record<string, unknown>, CallableSummaryResponse>(getFirebaseClientServices().functions, 'listTenantCashRegisterSummaries')({ organizationId: orgId, outletId, startDate, endDate });
    return response.data.summaries;
  },

  open: async (outletId: string, openingCounts: DenominationCount[], openingNote: string) => {
    const orgId = await organizationId();
    return callSnapshot('openTenantCashRegister', { organizationId: orgId, outletId, openingCounts, openingNote: openingNote.trim() || null, requestId: globalThis.crypto.randomUUID() });
  },

  recordMovement: async (outletId: string, movementType: CashMovementType, amount: number, reason: string, note: string) => {
    const orgId = await organizationId();
    return callSnapshot('recordTenantCashMovement', { organizationId: orgId, outletId, movementType, amount, reason: reason.trim(), note: note.trim() || null, requestId: globalThis.crypto.randomUUID() });
  },

  close: async (outletId: string, closingCounts: DenominationCount[], closingNote: string) => {
    const orgId = await organizationId();
    return callSnapshot('closeTenantCashRegister', { organizationId: orgId, outletId, closingCounts, closingNote: closingNote.trim() || null, requestId: globalThis.crypto.randomUUID() });
  },
};
