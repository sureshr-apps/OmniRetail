export type ProvisionInput = { organizationId: string; username: string; email: string; displayName: string; phone: string; idempotencyKey: string };
export type ProvisionResult = { appUserId: string; organizationMembershipId: string; organizationId: string; username: string; displayName: string; email: string; phone: string; status: 'active' };
export interface ProvisionDeps { idempotency: { get(key:string): Promise<any>; claim(r:any): Promise<void>; complete(key:string,status:string,result?:ProvisionResult):Promise<void> }; auth: { create(input:any):Promise<{uid:string}>; compensate(uid:string):Promise<void> }; sql: { provision(input:any):Promise<{appUserId:string; organizationMembershipId:string}> }; reconcile: { record(input:any):Promise<void> }; }
export async function orchestrateProvision(input: ProvisionInput, deps: ProvisionDeps): Promise<ProvisionResult> {
  const normalized = { ...input, username: input.username.trim().toLowerCase(), email: input.email.trim().toLowerCase() };
  const fingerprint = `${normalized.organizationId}|${normalized.username}|${normalized.email}`;
  const prior = await deps.idempotency.get(normalized.idempotencyKey);
  if (prior) { if (prior.requestFingerprint !== fingerprint) throw new Error('idempotency key conflict'); if (prior.status === 'SUCCEEDED') return prior.result; if (prior.status === 'IN_PROGRESS') throw new Error('provisioning already in progress'); }
  else await deps.idempotency.claim({ key: normalized.idempotencyKey, requestFingerprint: fingerprint, status: 'IN_PROGRESS' });
  let uid: string | undefined;
  try {
    uid = (await deps.auth.create(normalized)).uid;
    const persisted = await deps.sql.provision({ ...normalized, firebaseUid: uid });
    const result: ProvisionResult = { ...persisted, organizationId: normalized.organizationId, username: normalized.username, displayName: normalized.displayName, email: normalized.email, phone: normalized.phone, status: 'active' };
    await deps.idempotency.complete(normalized.idempotencyKey, 'SUCCEEDED', result);
    return result;
  } catch (error) {
    if (uid) { try { await deps.auth.compensate(uid); } catch { await deps.reconcile.record({ idempotencyKey: normalized.idempotencyKey, firebaseUid: uid, errorClass: 'auth_compensation_failed' }); } }
    await deps.idempotency.complete(normalized.idempotencyKey, 'FAILED_RETRYABLE');
    throw new Error('Unable to provision the organization administrator.');
  }
}
