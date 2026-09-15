import { AuthTypes, Connector, IpAddressTypes } from '@google-cloud/cloud-sql-connector';
import pg from 'pg';

const { Pool } = pg;

export interface CloudSqlResources {
  pool: pg.Pool;
  connector: Connector;
}

let poolPromise: Promise<CloudSqlResources> | undefined;

function projectId(): string {
  const value = process.env.GCLOUD_PROJECT || process.env.GCP_PROJECT || process.env.FIREBASE_PROJECT_ID;
  if (!value) throw new Error('Cloud project is not configured.');
  return value;
}

/**
 * Cloud SQL for PostgreSQL stores service-account IAM users without the
 * `.gserviceaccount.com` suffix. Keep this conversion in one place so the
 * connector username and the Cloud SQL IAM user cannot drift apart.
 */
export function cloudSqlIamUserFromServiceAccount(serviceAccountEmail: string): string {
  const normalized = serviceAccountEmail.trim().toLowerCase();
  if (!normalized) throw new Error('Cloud SQL service account is not configured.');
  return normalized.replace(/\.gserviceaccount\.com$/, '');
}

function cloudSqlIamUser(): string {
  const value = process.env.CLOUD_SQL_IAM_USER?.trim().toLowerCase();
  if (!value) {
    throw new Error('Cloud SQL IAM database user is not configured.');
  }
  return cloudSqlIamUserFromServiceAccount(value);
}

export async function getCloudSqlPool(): Promise<CloudSqlResources> {
  if (!poolPromise) {
    poolPromise = (async () => {
      const iamUser = cloudSqlIamUser();
      const connector = new Connector();
      const options = await connector.getOptions({
        instanceConnectionName: `${projectId()}:asia-south1:omniretail-sql`,
        ipType: IpAddressTypes.PUBLIC,
        authType: AuthTypes.IAM,
      });
      const pool = new Pool({
        ...options,
        user: iamUser,
        database: process.env.CLOUD_SQL_DATABASE || 'omniretail',
        max: 5,
      });
      return { pool, connector };
    })();
  }
  return poolPromise;
}
