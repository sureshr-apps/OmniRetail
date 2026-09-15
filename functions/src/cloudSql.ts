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

export async function getCloudSqlPool(): Promise<CloudSqlResources> {
  if (!poolPromise) {
    poolPromise = (async () => {
      const connector = new Connector();
      const options = await connector.getOptions({
        instanceConnectionName: `${projectId()}:asia-south1:omniretail-sql`,
        ipType: IpAddressTypes.PUBLIC,
        authType: AuthTypes.IAM,
      });
      const iamUser = process.env.CLOUD_SQL_IAM_USER || `${projectId()}@appspot`;
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
