import {
  EmailAuthProvider,
  User as FirebaseUser,
  onIdTokenChanged,
  reauthenticateWithCredential,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';

export const GENERIC_AUTH_ERROR = 'Unable to sign in with the provided credentials.';
const callableOptions = { limitedUseAppCheckTokens: true };

export interface ApplicationRole {
  code: string;
  name: string;
  scope: string;
}

export interface User {
  id: string;
  firebaseUid: string;
  name: string;
  displayName: string;
  email: string;
  username: string;
  phone: string | null;
  roles: ApplicationRole[];
  capabilities: string[];
  organizationIds: string[];
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface ProfileUpdate {
  displayName: string;
  phone: string;
}

export interface PasswordChange {
  currentPassword: string;
  newPassword: string;
}

export interface IAuthService {
  login(credentials: LoginCredentials): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  subscribe(listener: (user: User | null) => void): () => void;
  updateProfile(update: ProfileUpdate): Promise<User>;
  changePassword(change: PasswordChange): Promise<void>;
}

interface AuthorizedUserResponse {
  id: string;
  firebaseUid: string;
  username: string;
  email: string;
  displayName: string;
  phone: string | null;
  roles: ApplicationRole[];
  capabilities: string[];
  organizationIds?: string[];
}

function toUser(response: AuthorizedUserResponse): User {
  return { ...response, name: response.displayName, organizationIds: response.organizationIds ?? [] };
}

function isEmailIdentifier(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateAuthorizationResponse(value: unknown): AuthorizedUserResponse {
  const candidate = value as Partial<AuthorizedUserResponse> | null;
  if (
    !candidate ||
    typeof candidate.id !== 'string' ||
    typeof candidate.firebaseUid !== 'string' ||
    typeof candidate.username !== 'string' ||
    typeof candidate.email !== 'string' ||
    typeof candidate.displayName !== 'string' ||
    !Array.isArray(candidate.roles) ||
    !Array.isArray(candidate.capabilities)
  ) {
    throw new Error(GENERIC_AUTH_ERROR);
  }
  return candidate as AuthorizedUserResponse;
}

export class FirebaseAuthService implements IAuthService {
  private readonly bootstrapRequests = new Map<string, Promise<User>>();

  private async bootstrap(firebaseUser: FirebaseUser): Promise<User> {
    const existing = this.bootstrapRequests.get(firebaseUser.uid);
    if (existing) return existing;
    const request = this.bootstrapUser(firebaseUser).finally(() => this.bootstrapRequests.delete(firebaseUser.uid));
    this.bootstrapRequests.set(firebaseUser.uid, request);
    return request;
  }

  private async bootstrapUser(firebaseUser: FirebaseUser): Promise<User> {
    const { functions } = getFirebaseClientServices();
    const bootstrapUser = httpsCallable<Record<string, never>, AuthorizedUserResponse>(
      functions,
      'bootstrapAuthenticatedUser',
      callableOptions
    );
    const result = await bootstrapUser({});
    const authorized = validateAuthorizationResponse(result.data);
    if (authorized.firebaseUid !== firebaseUser.uid) throw new Error(GENERIC_AUTH_ERROR);
    return toUser(authorized);
  }

  async login(credentials: LoginCredentials): Promise<User> {
    const identifier = credentials.username.trim();
    const password = credentials.password;
    const { auth, functions } = getFirebaseClientServices();

    try {
      const credential = isEmailIdentifier(identifier)
        ? await signInWithEmailAndPassword(auth, identifier, password)
        : await (async () => {
            const loginByUsername = httpsCallable<
              { username: string; password: string },
              { customToken: string }
            >(functions, 'usernameLogin', callableOptions);
            const response = await loginByUsername({ username: identifier, password });
            if (!response.data?.customToken) throw new Error(GENERIC_AUTH_ERROR);
            return signInWithCustomToken(auth, response.data.customToken);
          })();

      return await this.bootstrap(credential.user);
    } catch {
      await signOut(auth).catch(() => undefined);
      throw new Error(GENERIC_AUTH_ERROR);
    }
  }

  async logout(): Promise<void> {
    await signOut(getFirebaseClientServices().auth);
  }

  async getCurrentUser(): Promise<User | null> {
    const { auth } = getFirebaseClientServices();
    await auth.authStateReady();
    if (!auth.currentUser) return null;
    try {
      return await this.bootstrap(auth.currentUser);
    } catch {
      await signOut(auth).catch(() => undefined);
      return null;
    }
  }

  subscribe(listener: (user: User | null) => void): () => void {
    const { auth } = getFirebaseClientServices();
    let revision = 0;
    return onIdTokenChanged(auth, async (firebaseUser) => {
      const currentRevision = ++revision;
      if (!firebaseUser) {
        listener(null);
        return;
      }
      try {
        const user = await this.bootstrap(firebaseUser);
        if (currentRevision === revision) listener(user);
      } catch {
        await signOut(auth).catch(() => undefined);
        if (currentRevision === revision) listener(null);
      }
    });
  }

  async updateProfile(update: ProfileUpdate): Promise<User> {
    const updateCurrentUserProfile = httpsCallable<ProfileUpdate, AuthorizedUserResponse>(
      getFirebaseClientServices().functions,
      'updateCurrentUserProfile',
      callableOptions
    );
    const result = await updateCurrentUserProfile(update);
    return toUser(validateAuthorizationResponse(result.data));
  }

  async changePassword(change: PasswordChange): Promise<void> {
    const { auth, functions } = getFirebaseClientServices();
    const firebaseUser = auth.currentUser;
    if (!firebaseUser?.email) throw new Error('Unable to change password.');

    try {
      const credential = EmailAuthProvider.credential(firebaseUser.email, change.currentPassword);
      await reauthenticateWithCredential(firebaseUser, credential);
      await updatePassword(firebaseUser, change.newPassword);
      const recordAudit = httpsCallable<Record<string, never>, { recorded: boolean }>(
        functions,
        'recordPasswordChange',
        callableOptions
      );
      await recordAudit({});
    } catch {
      throw new Error('Unable to change password. Check your current password and try again.');
    }
  }
}

export const authService: IAuthService = new FirebaseAuthService();
