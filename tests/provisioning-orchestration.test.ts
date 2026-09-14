import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { orchestrateProvision, type ProvisionDeps } from '../functions/src/auth/provisioning';
import { provisioningFingerprint } from '../functions/src/auth/idempotency';

function fakes(sqlFail = false, compensationFail = false) {
  const state: any = { records: new Map(), preflight: 0, auth: 0, sql: 0, compensate: 0, reconcile: [], completions: [] };
  const deps: ProvisionDeps = {
    idempotency: { async get(k) { return state.records.get(k); }, async claim(r) { state.records.set(r.key, { ...r }); }, async complete(k,status,result) { state.completions.push(status); const r=state.records.get(k); state.records.set(k,{...r,status,result}); } },
    async preflight() { state.preflight++; },
    auth: { async create() { state.auth++; return { uid: `uid-${state.auth}` }; }, async compensate() { state.compensate++; if (compensationFail) throw new Error('failed'); } },
    sql: { async provisionAndComplete(data) { state.sql++; if (sqlFail) throw new Error('sql'); const result = { appUserId: 'appuser-789', organizationMembershipId: 'membership-456', organizationId: data.organizationId, username: data.username, displayName: data.displayName, email: data.email, phone: data.phone, status: 'active' as const }; const record=state.records.get(data.idempotencyKey); state.records.set(data.idempotencyKey,{...record,status:'SUCCEEDED',result}); return result; } },
    reconcile: { async record(r) { state.reconcile.push(r); } },
  };
  return { state, deps };
}
const input = { organizationId:'org', username:' User ', email:'USER@EXAMPLE.COM', displayName:'User', phone:'1', idempotencyKey:'idem-12345678' };

describe('provisioning orchestration', () => {
  it('defines organization-admin role assignment in the transactional SQL mutation', () => {
    const schema = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
    const mutation = schema.slice(schema.indexOf('mutation ProvisionOrganizationAdministrator'), schema.indexOf('mutation EnsureAppUserRoleTrusted'));
    expect(mutation).toContain('organizationMembership_insert');
    expect(mutation).toContain('userRole_upsert(data: { userId: $userId, roleId: $roleId })');
    expect(mutation).toContain('lifecycleIdempotency_update');
    expect(mutation).toContain('status: SUCCEEDED');
  });

  it('creates once and safely replays using AppUser and membership IDs', async () => { const {state,deps}=fakes(); const first=await orchestrateProvision(input,deps); const second=await orchestrateProvision(input,deps); expect(first.appUserId).toBe('appuser-789'); expect(first.organizationMembershipId).toBe('membership-456'); expect(JSON.stringify(second)).not.toContain('uid-1'); expect(second).toEqual(first); expect(state.preflight).toBe(1); expect(state.auth).toBe(1); expect(state.sql).toBe(1); expect(state.records.get(input.idempotencyKey).status).toBe('SUCCEEDED'); expect(JSON.stringify(second)).not.toMatch(/password|token|credential|actionCode/i); });
  it('rejects fingerprint conflicts and in-progress retries', async () => { const {deps}=fakes(); await orchestrateProvision(input,deps); await expect(orchestrateProvision({...input,email:'other@example.com'},deps)).rejects.toThrow('idempotency key conflict'); const x=fakes(); await x.deps.idempotency.claim({key:input.idempotencyKey,requestFingerprint:provisioningFingerprint('org', 'user', 'user@example.com'),status:'IN_PROGRESS'}); await expect(orchestrateProvision(input,x.deps)).rejects.toThrow('in progress'); expect(x.state.auth).toBe(0); });
  it('compensates SQL failure and records failed compensation', async () => { const x=fakes(true); await expect(orchestrateProvision(input,x.deps)).rejects.toThrow('Unable'); expect(x.state.auth).toBe(1); expect(x.state.compensate).toBe(1); expect(x.state.records.get(input.idempotencyKey).status).toBe('FAILED_RETRYABLE'); const y=fakes(true,true); await expect(orchestrateProvision(input,y.deps)).rejects.toThrow(); expect(y.state.reconcile[0]).toEqual({idempotencyKey:input.idempotencyKey,firebaseUid:'uid-1',errorClass:'auth_compensation_failed'}); });
  it('has no separate successful idempotency completion step', async () => {
    const { state, deps } = fakes();
    deps.idempotency.complete = async (_key, status) => {
      if (status === 'SUCCEEDED') throw new Error('idempotency store unavailable');
    };

    await expect(orchestrateProvision(input, deps)).resolves.toMatchObject({ appUserId: 'appuser-789' });
    expect(state.sql).toBe(1);
    expect(state.compensate).toBe(0);
    expect(state.reconcile).toEqual([]);
  });

  it('recovers a committed result when the transactional response is lost', async () => {
    const { state, deps } = fakes();
    const provisionAndComplete = deps.sql.provisionAndComplete;
    deps.sql.provisionAndComplete = async data => {
      await provisionAndComplete(data);
      throw new Error('response lost');
    };

    await expect(orchestrateProvision(input, deps)).resolves.toMatchObject({ appUserId: 'appuser-789' });
    expect(state.compensate).toBe(0);
    expect(state.completions).toEqual([]);
  });
});
