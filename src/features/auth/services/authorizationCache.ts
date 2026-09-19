import { getCurrentUserAuthorization } from '@omniretail/sql-connect';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';

type AuthorizationResult = Awaited<ReturnType<typeof getCurrentUserAuthorization>>;

let cachedUid: string | null = null;
let cachedAuthorization: Promise<AuthorizationResult> | null = null;

export function getCachedCurrentUserAuthorization(): Promise<AuthorizationResult> {
  const { auth, dataConnect } = getFirebaseClientServices();
  const uid = auth?.currentUser?.uid ?? null;
  if (!uid) return getCurrentUserAuthorization(dataConnect);
  if (cachedUid !== uid || !cachedAuthorization) {
    cachedUid = uid;
    cachedAuthorization = getCurrentUserAuthorization(dataConnect).catch((error) => {
      invalidateAuthorizationCache();
      throw error;
    });
  }
  return cachedAuthorization;
}

export function invalidateAuthorizationCache(): void {
  cachedUid = null;
  cachedAuthorization = null;
}
