import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import {
  ReCaptchaEnterpriseProvider,
  initializeAppCheck,
} from 'firebase/app-check';
import { Auth, connectAuthEmulator, getAuth } from 'firebase/auth';
import {
  Functions,
  connectFunctionsEmulator,
  getFunctions,
} from 'firebase/functions';
import {
  DataConnect,
  connectDataConnectEmulator,
  getDataConnect,
} from 'firebase/data-connect';
import { connectorConfig, dataConnectSettings } from '@omniretail/sql-connect';

export interface FirebaseClientServices {
  app: FirebaseApp;
  auth: Auth;
  functions: Functions;
  dataConnect: DataConnect;
}

let services: FirebaseClientServices | undefined;
let emulatorsConnected = false;

function requiredEnvironmentValue(name: keyof ImportMetaEnv): string {
  const value = import.meta.env[name];
  if (!value || value === 'replace-me') {
    throw new Error(`Missing Firebase configuration: ${name}`);
  }
  return value;
}

/**
 * Initializes Firebase lazily so Phase 1 can retain the existing mock runtime.
 * Phase 2 will call this from the authentication composition root.
 */
export function getFirebaseClientServices(): FirebaseClientServices {
  if (services) return services;

  const app = getApps().length
    ? getApp()
    : initializeApp({
        apiKey: requiredEnvironmentValue('VITE_FIREBASE_API_KEY'),
        authDomain: requiredEnvironmentValue('VITE_FIREBASE_AUTH_DOMAIN'),
        projectId: requiredEnvironmentValue('VITE_FIREBASE_PROJECT_ID'),
        storageBucket: requiredEnvironmentValue('VITE_FIREBASE_STORAGE_BUCKET'),
        messagingSenderId: requiredEnvironmentValue(
          'VITE_FIREBASE_MESSAGING_SENDER_ID'
        ),
        appId: requiredEnvironmentValue('VITE_FIREBASE_APP_ID'),
      });

  const appCheckSiteKey = import.meta.env.VITE_FIREBASE_APP_CHECK_SITE_KEY;
  if (appCheckSiteKey && appCheckSiteKey !== 'replace-me') {
    initializeAppCheck(app, {
      provider: new ReCaptchaEnterpriseProvider(appCheckSiteKey),
      isTokenAutoRefreshEnabled: true,
    });
  }

  const auth = getAuth(app);
  const functions = getFunctions(app, 'asia-south1');
  // Mutations now return the full canonical entity and the UI applies it to
  // local state directly (see src/shared/utils/listState.ts), so correctness no
  // longer depends on an imperative read racing the cache. A short, explicit
  // max age just bounds cross-tab/cross-user staleness for this back-office
  // master data (outlets, employees, products, customers, suppliers,
  // organizations, plans, administrators) instead of leaving the SDK's default
  // (effectively unbounded) cache in place. Purchases/Sales/Inventory are more
  // concurrency-sensitive and are unaffected by this value today.
  const dataConnect = getDataConnect(app, connectorConfig, {
    cacheSettings: {
      ...dataConnectSettings.cacheSettings,
      maxAgeSeconds: 30,
    },
  });

  if (import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true' && !emulatorsConnected) {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', {
      disableWarnings: true,
    });
    connectFunctionsEmulator(functions, '127.0.0.1', 5001);
    connectDataConnectEmulator(dataConnect, '127.0.0.1', 9399);
    emulatorsConnected = true;
  }

  services = { app, auth, functions, dataConnect };
  return services;
}
