import { closeCloudSqlMigrationClient, openCloudSqlMigrationClient, quoteIdentifier, requiredEnv } from './cloud-sql-migration-helpers.mjs';

const runtimeIamUser = requiredEnv('CLOUD_SQL_RUNTIME_IAM_USER');
const { client, pool, connector, ownerRole, schema } = await openCloudSqlMigrationClient();

try {
  await client.query('BEGIN');
  await client.query(`SET LOCAL ROLE ${quoteIdentifier(ownerRole)}`);
  const runtimeUser = quoteIdentifier(runtimeIamUser);
  await client.query(`GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE ON ALL TABLES IN SCHEMA ${schema} TO ${runtimeUser}`);
  await client.query(`GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA ${schema} TO ${runtimeUser}`);
  await client.query('COMMIT');
  console.log(`Granted Cloud SQL application write privileges to ${runtimeIamUser}.`);
} catch (error) {
  await client.query('ROLLBACK').catch(() => undefined);
  throw error;
} finally {
  await closeCloudSqlMigrationClient({ client, pool, connector });
}
