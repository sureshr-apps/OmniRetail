import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const app = { name: 'test-app' };
  const cacheProvider = { type: 'MEMORY' };
  const auth = {};
  const functions = {};
  const dataConnect = {};
  return {
    app,
    auth,
    functions,
    dataConnect,
    cacheProvider,
    connectorConfig: {
      connector: 'master-admin',
      service: 'omniretail-platform',
      location: 'asia-south1',
    },
    getDataConnect: vi.fn(() => dataConnect),
  };
});

vi.mock('firebase/app', () => ({
  getApps: () => [mocks.app],
  getApp: () => mocks.app,
  initializeApp: vi.fn(),
}));

vi.mock('firebase/app-check', () => ({
  ReCaptchaEnterpriseProvider: vi.fn(),
  initializeAppCheck: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  getAuth: () => mocks.auth,
  connectAuthEmulator: vi.fn(),
}));

vi.mock('firebase/functions', () => ({
  getFunctions: () => mocks.functions,
  connectFunctionsEmulator: vi.fn(),
}));

vi.mock('firebase/data-connect', () => ({
  getDataConnect: mocks.getDataConnect,
  connectDataConnectEmulator: vi.fn(),
}));

vi.mock('@omniretail/sql-connect', () => ({
  connectorConfig: mocks.connectorConfig,
  dataConnectSettings: {
    cacheSettings: { cacheProvider: mocks.cacheProvider },
  },
}));

import { getFirebaseClientServices } from '@/infrastructure/firebase/client';

describe('Firebase Data Connect cache configuration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('uses the generated cache provider with zero max age so post-mutation reads reach the server', () => {
    const services = getFirebaseClientServices();

    expect(services.dataConnect).toBe(mocks.dataConnect);
    expect(mocks.getDataConnect).toHaveBeenCalledWith(
      mocks.app,
      mocks.connectorConfig,
      {
        cacheSettings: {
          cacheProvider: mocks.cacheProvider,
          maxAgeSeconds: 0,
        },
      },
    );
  });
});
