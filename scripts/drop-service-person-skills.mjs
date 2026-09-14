import { Connector, AuthTypes, IpAddressTypes } from '@google-cloud/cloud-sql-connector';
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

const projectId = requiredEnv('FIREBASE_PROJECT_ID');
const iamUser = requiredEnv('CLOUD_SQL_IAM_USER');
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
    `ALTER TABLE ${quoteIdentifier(schemaName)}.${quoteIdentifier('service_person')} DROP COLUMN IF EXISTS ${quoteIdentifier('skills')}`,
  );
  await client.query('COMMIT');
  console.log('Removed the retired service_person.skills column.');
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  client.release();
  await pool.end();
  await connector.close();
}
