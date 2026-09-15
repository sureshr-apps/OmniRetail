import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { orchestrateProvision, type ProvisionDeps } from '../functions/src/auth/provisioning';

function fakes(sqlFail = false, compensationFail = false) {
  const state: any = { preflight: 0, auth: 0, sql: 0, compensate: 0, reconcile: [] };
  const deps: ProvisionDeps = {
    async preflight() { state.preflight++; },
    auth: {
      async create() { state.auth++; return { uid: `uid-${state.auth}` }; },
      async compensate() { state.compensate++; if (compensationFail) throw new Error('failed'); },
    },
    sql: {
      async provision(data) {
        state.sql++;
        if (sqlFail) throw new Error('sql');
        return {
          appUserId: 'appuser-789',
          organizationMembershipId: 'membership-456',
          organizationId: data.organizationId,
          username: data.username,
          displayName: data.displayName,
          email: data.email,
          phone: data.phone,
          status: 'active' as const,
        };
      },
    },
    reconcile: { async record(record) { state.reconcile.push(record); } },
  };
  return { state, deps };
}

const input = { organizationId: 'org', username: ' User ', email: 'USER@EXAMPLE.COM', displayName: 'User', phone: '1' };

describe('organization administrator provisioning', () => {
  it('keeps administrator creation in the trusted database transaction', () => {
    const schema = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
    const mutation = schema.slice(schema.indexOf('mutation ProvisionOrganizationAdministrator'), schema.indexOf('mutation EnsureAppUserRoleTrusted'));
    expect(mutation).toContain('organizationMembership_insert');
    expect(mutation).toContain('userRole_upsert(data: { userId: $userId, roleId: $roleId })');
    expect(mutation).not.toContain('LifecycleIdempotency');
    expect(mutation).not.toContain('lifecycleIdempotency');
  });

  it('creates Firebase Auth first and then provisions the database records', async () => {
    const { state, deps } = fakes();
    const result = await orchestrateProvision(input, deps);
    expect(result.appUserId).toBe('appuser-789');
    expect(state.preflight).toBe(1);
    expect(state.auth).toBe(1);
    expect(state.sql).toBe(1);
    expect(state.compensate).toBe(0);
  });

  it('compensates Firebase Auth when database provisioning fails', async () => {
    const { state, deps } = fakes(true);
    await expect(orchestrateProvision(input, deps)).rejects.toThrow('sql');
    expect(state.auth).toBe(1);
    expect(state.compensate).toBe(1);
    expect(state.reconcile).toEqual([]);
  });

  it('records reconciliation when Firebase cleanup also fails', async () => {
    const { state, deps } = fakes(true, true);
    await expect(orchestrateProvision(input, deps)).rejects.toThrow('sql');
    expect(state.reconcile).toEqual([{ idempotencyKey: 'org:uid-1', firebaseUid: 'uid-1', errorClass: 'auth_compensation_failed' }]);
  });
});
