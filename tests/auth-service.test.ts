import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  auth: { currentUser: null as any, authStateReady: vi.fn().mockResolvedValue(undefined) },
  functions: {},
  signInWithEmailAndPassword: vi.fn(),
  signInWithCustomToken: vi.fn(),
  signOut: vi.fn().mockResolvedValue(undefined),
  onIdTokenChanged: vi.fn(),
  reauthenticateWithCredential: vi.fn().mockResolvedValue(undefined),
  updatePassword: vi.fn().mockResolvedValue(undefined),
  emailCredential: vi.fn(() => ({ providerId: 'password' })),
  callables: new Map<string, ReturnType<typeof vi.fn>>(),
}));

vi.mock('firebase/auth', () => ({
  EmailAuthProvider: { credential: mocks.emailCredential },
  onIdTokenChanged: mocks.onIdTokenChanged,
  reauthenticateWithCredential: mocks.reauthenticateWithCredential,
  signInWithCustomToken: mocks.signInWithCustomToken,
  signInWithEmailAndPassword: mocks.signInWithEmailAndPassword,
  signOut: mocks.signOut,
  updatePassword: mocks.updatePassword,
}));

vi.mock('firebase/functions', () => ({
  httpsCallable: vi.fn((_functions, name: string) => mocks.callables.get(name)),
}));

vi.mock('@/infrastructure/firebase/client', () => ({
  getFirebaseClientServices: () => ({ auth: mocks.auth, functions: mocks.functions }),
}));

import { FirebaseAuthService, GENERIC_AUTH_ERROR } from '@/features/auth/services/AuthService';

const firebaseUser = { uid: 'uid-1', email: 'admin@example.com', emailVerified: true };
const authorizedUser = {
  id: 'user-1', firebaseUid: 'uid-1', username: 'admin', email: 'admin@example.com',
  displayName: 'Platform Admin', phone: null,
  roles: [{ code: 'platform.master_admin', name: 'Master Admin', scope: 'PLATFORM' }],
  capabilities: ['overview.read', 'profile.change_password', 'profile.update'],
};

describe('FirebaseAuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.auth.currentUser = null;
    mocks.callables.clear();
    mocks.callables.set('bootstrapAuthenticatedUser', vi.fn().mockResolvedValue({ data: authorizedUser }));
    mocks.callables.set('usernameLogin', vi.fn().mockResolvedValue({ data: { customToken: 'custom-token' } }));
    mocks.callables.set('recordPasswordChange', vi.fn().mockResolvedValue({ data: { recorded: true } }));
    mocks.signInWithEmailAndPassword.mockResolvedValue({ user: firebaseUser });
    mocks.signInWithCustomToken.mockResolvedValue({ user: firebaseUser });
    mocks.signOut.mockResolvedValue(undefined);
  });

  it('authenticates an email directly with Firebase and loads AppUser authorization', async () => {
    const user = await new FirebaseAuthService().login({ username: 'admin@example.com', password: 'secret' });
    expect(mocks.signInWithEmailAndPassword).toHaveBeenCalledWith(mocks.auth, 'admin@example.com', 'secret');
    expect(user.capabilities).toContain('overview.read');
  });

  it('uses the username bridge without receiving an email mapping', async () => {
    await new FirebaseAuthService().login({ username: 'admin', password: 'secret' });
    expect(mocks.callables.get('usernameLogin')).toHaveBeenCalledWith({ username: 'admin', password: 'secret' });
    expect(mocks.signInWithCustomToken).toHaveBeenCalledWith(mocks.auth, 'custom-token');
  });

  it('signs out and returns a generic error for invalid credentials or missing AppUser', async () => {
    mocks.signInWithEmailAndPassword.mockRejectedValue(new Error('auth/wrong-password'));
    await expect(new FirebaseAuthService().login({ username: 'admin@example.com', password: 'wrong' }))
      .rejects.toThrow(GENERIC_AUTH_ERROR);
    expect(mocks.signOut).toHaveBeenCalled();

    mocks.signInWithEmailAndPassword.mockResolvedValue({ user: firebaseUser });
    mocks.callables.set('bootstrapAuthenticatedUser', vi.fn().mockRejectedValue(new Error('missing AppUser')));
    await expect(new FirebaseAuthService().login({ username: 'admin@example.com', password: 'secret' }))
      .rejects.toThrow(GENERIC_AUTH_ERROR);
  });

  it('allows an unverified Firebase identity when application authorization succeeds', async () => {
    mocks.signInWithEmailAndPassword.mockResolvedValue({ user: { ...firebaseUser, emailVerified: false } });
    const result = await new FirebaseAuthService().login({ username: 'admin@example.com', password: 'secret' });
    expect(result.id).toBe('user-1');
    expect(mocks.signOut).not.toHaveBeenCalled();
  });

  it('restores an authorized session and logs out through Firebase', async () => {
    mocks.auth.currentUser = firebaseUser;
    const service = new FirebaseAuthService();
    expect((await service.getCurrentUser())?.username).toBe('admin');
    await service.logout();
    expect(mocks.signOut).toHaveBeenCalledWith(mocks.auth);
  });

  it('reauthenticates before changing the password and records an audit event', async () => {
    mocks.auth.currentUser = firebaseUser;
    await new FirebaseAuthService().changePassword({ currentPassword: 'old-secret', newPassword: 'new-secret' });
    expect(mocks.emailCredential).toHaveBeenCalledWith('admin@example.com', 'old-secret');
    expect(mocks.reauthenticateWithCredential).toHaveBeenCalled();
    expect(mocks.updatePassword).toHaveBeenCalledWith(firebaseUser, 'new-secret');
    expect(mocks.callables.get('recordPasswordChange')).toHaveBeenCalledWith({});
  });
});
