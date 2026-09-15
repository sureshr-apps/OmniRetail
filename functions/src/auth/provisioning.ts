export type ProvisionInput = {
  organizationId: string;
  username: string;
  email: string;
  displayName: string;
  phone: string;
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

interface NormalizedProvisionInput extends ProvisionInput {
  username: string;
  email: string;
}

export interface ProvisionDeps {
  preflight(input: NormalizedProvisionInput): Promise<void>;
  auth: {
    create(input: NormalizedProvisionInput): Promise<{ uid: string }>;
    compensate(uid: string): Promise<void>;
  };
  sql: {
    provision(input: NormalizedProvisionInput & { firebaseUid: string }): Promise<ProvisionResult>;
  };
}

export async function orchestrateProvision(input: ProvisionInput, deps: ProvisionDeps): Promise<ProvisionResult> {
  const normalized = { ...input, username: input.username.trim().toLowerCase(), email: input.email.trim().toLowerCase() };
  await deps.preflight(normalized);

  let uid: string | undefined;
  try {
    uid = (await deps.auth.create(normalized)).uid;
    return await deps.sql.provision({ ...normalized, firebaseUid: uid });
  } catch (error) {
    if (uid) {
      try {
        await deps.auth.compensate(uid);
      } catch {
        console.error('Firebase Auth compensation failed', {
          operation: 'organization_administrator_provisioning',
          organizationId: normalized.organizationId,
          errorClass: 'auth_compensation_failed',
        });
      }
    }
    throw error instanceof Error ? error : new Error('Unable to provision the organization administrator.');
  }
}
