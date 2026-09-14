import { Connector, AuthTypes, IpAddressTypes } from '@google-cloud/cloud-sql-connector';
import { readFileSync } from 'node:fs';
import pg from 'pg';

const { Pool } = pg;

export function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export function quoteIdentifier(value) {
  return `"${value.replaceAll('"', '""')}"`;
}

function authenticatedIamUser() {
  const credentialsPath = requiredEnv('GOOGLE_APPLICATION_CREDENTIALS');
  const credentials = JSON.parse(readFileSync(credentialsPath, 'utf8'));
  if (typeof credentials.client_email !== 'string' || !credentials.client_email) {
    throw new Error('The configured Google credentials do not contain client_email.');
  }
  return credentials.client_email.replace(/\.gserviceaccount\.com$/, '');
}

export async function openCloudSqlMigrationClient() {
  const projectId = requiredEnv('FIREBASE_PROJECT_ID');
  const iamUser = process.env.CLOUD_SQL_IAM_USER ?? authenticatedIamUser();
  const region = process.env.CLOUD_SQL_REGION ?? 'asia-south1';
  const instanceId = process.env.CLOUD_SQL_INSTANCE ?? 'omniretail-sql';
  const databaseId = process.env.CLOUD_SQL_DATABASE ?? 'omniretail';
  const schemaName = process.env.CLOUD_SQL_SCHEMA ?? 'public';
  const ownerRole = `firebaseowner_${databaseId}_${schemaName}`;
  const connector = new Connector();
  const options = await connector.getOptions({
    instanceConnectionName: `${projectId}:${region}:${instanceId}`,
    ipType: IpAddressTypes.PUBLIC,
    authType: AuthTypes.IAM,
  });
  const pool = new Pool({ ...options, user: iamUser, database: databaseId });
  const client = await pool.connect();
  return { client, pool, connector, schemaName, schema: quoteIdentifier(schemaName), ownerRole };
}

export async function closeCloudSqlMigrationClient({ client, pool, connector }) {
  client.release();
  await pool.end();
  await connector.close();
}
