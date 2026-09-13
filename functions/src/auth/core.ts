export const GENERIC_AUTH_ERROR = 'Unable to sign in with the provided credentials.';

export interface AuthorizationRecord {
  id: string;
  firebaseUid: string;
  username: string;
  email: string;
  displayName: string;
  phone?: string | null;
  status: string;
  userRoles_on_user: Array<{
    role: {
      code: string;
      name: string;
      scope: string;
      rolePermissions_on_role: Array<{ permission: { code: string } }>;
    };
  }>;
  organizationMemberships_on_user?: Array<{
    organization: { id: string };
    role: {
      code: string;
      name: string;
      scope: string;
      rolePermissions_on_role?: Array<{ permission: { code: string } }>;
    };
    status: string;
  }>;
}

export interface AuthorizedUser {
  id: string;
  firebaseUid: string;
  username: string;
  email: string;
  displayName: string;
  phone: string | null;
  roles: Array<{ code: string; name: string; scope: string }>;
  capabilities: string[];
  organizationIds: string[];
}

export function normalizeUsername(value: unknown): string {
  if (typeof value !== 'string') return '';
  const normalized = value.trim().toLowerCase();
  return /^[a-z0-9][a-z0-9._-]{2,63}$/.test(normalized) ? normalized : '';
}

export function normalizePassword(value: unknown): string {
  if (typeof value !== 'string' || value.length < 1 || value.length > 4096) return '';
  return value;
}

export function toAuthorizedUser(record: AuthorizationRecord): AuthorizedUser {
  const activeMemberships = (record.organizationMemberships_on_user ?? [])
    .filter((membership) => membership.status === 'ACTIVE');
  const roleRecords = [
    ...record.userRoles_on_user.map(({ role }) => role),
    ...activeMemberships.map(({ role }) => role),
  ];
  const roles = Array.from(new Map(roleRecords.map((role) => [role.code, {
    code: role.code,
    name: role.name,
    scope: role.scope,
  }])).values());
  const capabilities = Array.from(new Set(
    roleRecords.flatMap((role) =>
      (role.rolePermissions_on_role ?? []).map(({ permission }) => permission.code)
    )
  )).sort();

  return {
    id: record.id,
    firebaseUid: record.firebaseUid,
    username: record.username,
    email: record.email,
    displayName: record.displayName,
    phone: record.phone ?? null,
    roles,
    capabilities,
    organizationIds: Array.from(new Set((record.organizationMemberships_on_user ?? [])
      .filter((membership) => membership.status === 'ACTIVE')
      .map((membership) => membership.organization.id))).sort(),
  };
}

interface UsernameIdentity {
  firebaseUid: string;
  email: string;
  status: string;
}

interface VerifiedCredential {
  uid: string;
  emailVerified: boolean;
}

export interface UsernameLoginDependencies {
  resolveUsername(username: string): Promise<UsernameIdentity | null>;
  verifyPassword(email: string, password: string): Promise<{ idToken: string }>;
  verifyCredential(idToken: string): Promise<VerifiedCredential>;
  createCustomToken(uid: string): Promise<string>;
}

export async function authenticateUsername(
  dependencies: UsernameLoginDependencies,
  input: { username: unknown; password: unknown }
): Promise<{ customToken: string }> {
  const username = normalizeUsername(input.username);
  const password = normalizePassword(input.password);
  if (!username || !password) throw new Error(GENERIC_AUTH_ERROR);

  try {
    const identity = await dependencies.resolveUsername(username);
    if (!identity || identity.status !== 'ACTIVE') throw new Error(GENERIC_AUTH_ERROR);

    const passwordResult = await dependencies.verifyPassword(identity.email, password);
    const verified = await dependencies.verifyCredential(passwordResult.idToken);
    if (verified.uid !== identity.firebaseUid) {
      throw new Error(GENERIC_AUTH_ERROR);
    }

    return { customToken: await dependencies.createCustomToken(verified.uid) };
  } catch {
    throw new Error(GENERIC_AUTH_ERROR);
  }
}
