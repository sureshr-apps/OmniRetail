import { Connector, AuthTypes, IpAddressTypes } from '@google-cloud/cloud-sql-connector';
import { readFileSync } from 'node:fs';
import pg from 'pg';

const { Pool } = pg;

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function quoteIdentifier(value) {
  return `"${value.replaceAll('"', '""')}"`;
}

function authenticatedIamUser() {
  const credentialsPath = requiredEnv('GOOGLE_APPLICATION_CREDENTIALS');
  const credentials = JSON.parse(readFileSync(credentialsPath, 'utf8'));
  const email = credentials.client_email;
  if (typeof email !== 'string' || !email) {
    throw new Error('The configured Google credentials do not contain client_email.');
  }
  return email.replace(/\.gserviceaccount\.com$/, '');
}

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
const pool = new Pool({
  ...options,
  user: iamUser,
  database: databaseId,
});

const client = await pool.connect();
try {
  await client.query('BEGIN');
  await client.query(`SET LOCAL ROLE ${quoteIdentifier(ownerRole)}`);
  await client.query(
    `ALTER TABLE ${quoteIdentifier(schemaName)}.${quoteIdentifier('service_person')}
      DROP COLUMN IF EXISTS ${quoteIdentifier('skills')},
      DROP COLUMN IF EXISTS ${quoteIdentifier('created_at')},
      DROP COLUMN IF EXISTS ${quoteIdentifier('updated_at')}`,
  );
  await client.query('COMMIT');
  console.log('Removed retired service_person columns.');
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  client.release();
  await pool.end();
  await connector.close();
}
