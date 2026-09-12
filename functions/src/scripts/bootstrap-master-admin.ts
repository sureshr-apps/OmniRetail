import { randomUUID } from 'node:crypto';
import process from 'node:process';
import { applicationDefault, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth, type UserRecord } from 'firebase-admin/auth';
import {
  bootstrapMasterAdmin,
  getAppUserForBootstrap,
} from '@omniretail/sql-connect-admin';
import { deterministicUuid } from '../auth/bootstrap.js';

const MASTER_ADMIN_ROLE_ID = '00000000-0000-4000-8000-000000000001';

function argument(name: string, required = true): string | undefined {
  const index = process.argv.indexOf(`--${name}`);
  const value = index >= 0 ? process.argv[index + 1]?.trim() : undefined;
  if (required && !value) throw new Error(`Missing required --${name} value.`);
  return value;
}

async function readPassword(): Promise<string> {
  const environmentPassword = process.env.OMNIRETAIL_BOOTSTRAP_PASSWORD;
  if (environmentPassword) return environmentPassword;
  if (!process.stdin.isTTY) {
    throw new Error('Set OMNIRETAIL_BOOTSTRAP_PASSWORD or run in an interactive terminal.');
  }

  process.stdout.write('Initial password: ');
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  return new Promise((resolve, reject) => {
    let password = '';
    const cleanup = () => {
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
    };
    const onData = (character: string) => {
      if (character === '\u0003') {
        cleanup();
        process.stdout.write('\n');
        reject(new Error('Bootstrap cancelled.'));
      } else if (character === '\r' || character === '\n') {
        cleanup();
        process.stdout.write('\n');
        resolve(password);
      } else if (character === '\u007f' || character === '\b') {
        password = password.slice(0, -1);
      } else {
        password += character;
      }
    };
    process.stdin.on('data', onData);
  });
}

async function firebasePasswordSignIn(apiKey: string, email: string, password: string): Promise<string> {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${encodeURIComponent(apiKey)}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    }
  );
  const result = await response.json() as { idToken?: unknown };
  if (!response.ok || typeof result.idToken !== 'string') {
    throw new Error('Firebase could not verify the supplied email and password.');
  }
  return result.idToken;
}

async function sendVerificationEmail(apiKey: string, idToken: string): Promise<void> {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${encodeURIComponent(apiKey)}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ requestType: 'VERIFY_EMAIL', idToken }),
    }
  );
  if (!response.ok) throw new Error('Firebase could not send the verification email.');
}

async function findOrCreateFirebaseUser(
  email: string,
  displayName: string,
  password: string
): Promise<{ user: UserRecord; created: boolean }> {
  const auth = getAuth();
  try {
    return { user: await auth.getUserByEmail(email), created: false };
  } catch (error) {
    if ((error as { code?: string }).code !== 'auth/user-not-found') throw error;
    const user = await auth.createUser({ email, password, displayName, emailVerified: false });
    return { user, created: true };
  }
}

async function main(): Promise<void> {
  const email = argument('email')!.toLowerCase();
  const username = argument('username')!.toLowerCase();
  const displayName = argument('display-name')!;
  const phone = argument('phone', false) ?? null;
  const projectId = process.env.OMNIRETAIL_FIREBASE_PROJECT_ID;
  const apiKey = process.env.OMNIRETAIL_WEB_API_KEY;
  if (!projectId || !apiKey) {
    throw new Error('OMNIRETAIL_FIREBASE_PROJECT_ID and OMNIRETAIL_WEB_API_KEY are required.');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('A valid email is required.');
  if (!/^[a-z0-9][a-z0-9._-]{2,63}$/.test(username)) throw new Error('Username format is invalid.');

  const password = await readPassword();
  if (password.length < 8) throw new Error('Password must contain at least 8 characters.');
  if (!getApps().length) initializeApp({ credential: applicationDefault(), projectId });

  const { user: firebaseUser, created } = await findOrCreateFirebaseUser(email, displayName, password);
  const existing = (await getAppUserForBootstrap({ firebaseUid: firebaseUser.uid })).data.appUsers[0];
  const userId = existing?.id ?? randomUUID();
  const auditId = deterministicUuid(`bootstrap-master-admin:${firebaseUser.uid}`);

  await bootstrapMasterAdmin({
    userId,
    firebaseUid: firebaseUser.uid,
    username,
    email,
    displayName,
    phone,
    roleId: MASTER_ADMIN_ROLE_ID,
    auditId,
    requestId: `bootstrap-master-admin:${firebaseUser.uid}`,
  });

  if (!firebaseUser.emailVerified) {
    const idToken = await firebasePasswordSignIn(apiKey, email, password);
    await sendVerificationEmail(apiKey, idToken);
  }

  process.stdout.write(
    `${created ? 'Created' : 'Updated'} Master Admin ${username}. ` +
    `${firebaseUser.emailVerified ? 'Email is already verified.' : 'Verification email sent; email verification is optional for application access.'}\n`
  );
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : 'Bootstrap failed.'}\n`);
  process.exitCode = 1;
});
