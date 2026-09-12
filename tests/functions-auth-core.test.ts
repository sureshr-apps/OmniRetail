import { describe, expect, it, vi } from 'vitest';
import {
  authenticateUsername,
  GENERIC_AUTH_ERROR,
  toAuthorizedUser,
  type UsernameLoginDependencies,
} from '../functions/src/auth/core';
import { deterministicUuid } from '../functions/src/auth/bootstrap';
import { LoginRateLimiter } from '../functions/src/auth/rateLimit';

function dependencies(overrides: Partial<UsernameLoginDependencies> = {}): UsernameLoginDependencies {
  return {
    resolveUsername: vi.fn().mockResolvedValue({ firebaseUid: 'uid-1', email: 'admin@example.com', status: 'ACTIVE' }),
    verifyPassword: vi.fn().mockResolvedValue({ idToken: 'short-lived-id-token' }),
    verifyCredential: vi.fn().mockResolvedValue({ uid: 'uid-1', emailVerified: true }),
    createCustomToken: vi.fn().mockResolvedValue('custom-token'),
    ...overrides,
  };
}

describe('trusted username authentication', () => {
  it('returns only a custom token after Firebase verifies the password and UID', async () => {
    const deps = dependencies();
    const result = await authenticateUsername(deps, { username: 'Platform.Admin', password: 'secret' });
    expect(result).toEqual({ customToken: 'custom-token' });
    expect(result).not.toHaveProperty('email');
    expect(deps.resolveUsername).toHaveBeenCalledWith('platform.admin');
    expect(deps.verifyPassword).toHaveBeenCalledWith('admin@example.com', 'secret');
  });

  it.each([
    ['missing username', { resolveUsername: vi.fn().mockResolvedValue(null) }],
    ['inactive user', { resolveUsername: vi.fn().mockResolvedValue({ firebaseUid: 'uid-1', email: 'admin@example.com', status: 'INACTIVE' }) }],
    ['UID mismatch', { verifyCredential: vi.fn().mockResolvedValue({ uid: 'other', emailVerified: true }) }],
    ['invalid password', { verifyPassword: vi.fn().mockRejectedValue(new Error('INVALID_PASSWORD')) }],
  ])('uses the same generic failure for %s', async (_label, override) => {
    await expect(authenticateUsername(dependencies(override), { username: 'admin', password: 'wrong' }))
      .rejects.toThrow(GENERIC_AUTH_ERROR);
  });
});

it('flattens Master Admin roles into a stable capability set', () => {
  const user = toAuthorizedUser({
    id: 'user-id', firebaseUid: 'uid-1', username: 'admin', email: 'admin@example.com',
    displayName: 'Admin', phone: null, status: 'ACTIVE',
    userRoles_on_user: [{ role: {
      code: 'platform.master_admin', name: 'Master Admin', scope: 'PLATFORM',
      rolePermissions_on_role: [
        { permission: { code: 'organizations.read' } },
        { permission: { code: 'overview.read' } },
        { permission: { code: 'overview.read' } },
      ],
    } }],
  });
  expect(user.capabilities).toEqual(['organizations.read', 'overview.read']);
});

it('uses deterministic identifiers for idempotent bootstrap auditing', () => {
  const first = deterministicUuid('bootstrap-master-admin:uid-1');
  expect(deterministicUuid('bootstrap-master-admin:uid-1')).toBe(first);
  expect(deterministicUuid('bootstrap-master-admin:uid-2')).not.toBe(first);
  expect(first).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
});

it('bounds repeated login attempts per hashed IP and username bucket', () => {
  const limiter = new LoginRateLimiter(2, 1000);
  expect(limiter.consume('127.0.0.1', 'admin', 0)).toBe(true);
  expect(limiter.consume('127.0.0.1', 'admin', 1)).toBe(true);
  expect(limiter.consume('127.0.0.1', 'admin', 2)).toBe(false);
  expect(limiter.consume('127.0.0.1', 'admin', 1001)).toBe(true);
});
