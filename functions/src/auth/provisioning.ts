import { provisioningFingerprint } from './idempotency.js';

export type ProvisionInput = {
  organizationId: string;
  username: string;
  email: string;
  displayName: string;
  phone: string;
  idempotencyKey: string;
};

export type ProvisionResult = {
  appUserId: string;
  organizationMembershipId: string;
  organizationId: string;
  username: string;
  displayName: string;
  email: string;
  phone: string;
  status: 'active';
};

export type ProvisioningStatus = 'IN_PROGRESS' | 'SUCCEEDED' | 'FAILED_RETRYABLE';

interface ProvisioningRecord {
  requestFingerprint: string;
  status: ProvisioningStatus;
  result?: ProvisionResult;
}

interface NormalizedProvisionInput extends ProvisionInput {
  username: string;
  email: string;
}

export interface ProvisionDeps {
  idempotency: {
    get(key: string): Promise<ProvisioningRecord | null | undefined>;
    claim(record: { key: string; requestFingerprint: string; status: 'IN_PROGRESS' }): Promise<void>;
    complete(key: string, status: ProvisioningStatus, result?: ProvisionResult): Promise<void>;
  };
  preflight(input: NormalizedProvisionInput): Promise<void>;
  auth: {
    create(input: NormalizedProvisionInput): Promise<{ uid: string }>;
    compensate(uid: string): Promise<void>;
  };
  sql: {
    provisionAndComplete(input: NormalizedProvisionInput & { firebaseUid: string }): Promise<ProvisionResult>;
  };
  reconcile: {
    record(input: {
      idempotencyKey: string;
      firebaseUid: string;
      errorClass: 'auth_compensation_failed';
    }): Promise<void>;
  };
}

export async function orchestrateProvision(input: ProvisionInput, deps: ProvisionDeps): Promise<ProvisionResult> {
  const normalized = { ...input, username: input.username.trim().toLowerCase(), email: input.email.trim().toLowerCase() };
  const fingerprint = provisioningFingerprint(
    normalized.organizationId,
    normalized.username,
    normalized.email,
  );
  const prior = await deps.idempotency.get(normalized.idempotencyKey);
  if (prior) {
    if (prior.requestFingerprint !== fingerprint) throw new Error('idempotency key conflict');
    if (prior.status === 'SUCCEEDED') {
      if (!prior.result) throw new Error('completed provisioning result is unavailable');
      return prior.result;
    }
    if (prior.status === 'IN_PROGRESS') throw new Error('provisioning already in progress');
  }

  await deps.preflight(normalized);
  if (!prior) {
    await deps.idempotency.claim({
      key: normalized.idempotencyKey,
      requestFingerprint: fingerprint,
      status: 'IN_PROGRESS',
    });
  }

  let uid: string | undefined;
  try {
    uid = (await deps.auth.create(normalized)).uid;
    return await deps.sql.provisionAndComplete({ ...normalized, firebaseUid: uid });
  } catch {
    // The transaction may have committed even if its response was lost. Re-read
    // the durable outcome before compensating the Firebase identity.
    const committed = await deps.idempotency.get(normalized.idempotencyKey).catch(() => undefined);
    if (committed?.requestFingerprint === fingerprint && committed.status === 'SUCCEEDED') {
      if (!committed.result) throw new Error('completed provisioning result is unavailable');
      return committed.result;
    }
    if (uid) {
      try {
        await deps.auth.compensate(uid);
      } catch {
        await deps.reconcile.record({
          idempotencyKey: normalized.idempotencyKey,
          firebaseUid: uid,
          errorClass: 'auth_compensation_failed',
        });
      }
    }
    await deps.idempotency.complete(normalized.idempotencyKey, 'FAILED_RETRYABLE');
    throw new Error('Unable to provision the organization administrator.');
  }
}
