import { closeCloudSqlMigrationClient, openCloudSqlMigrationClient, quoteIdentifier } from './cloud-sql-migration-helpers.mjs';

const { client, pool, connector, ownerRole, schema } = await openCloudSqlMigrationClient();

try {
  await client.query('BEGIN');
  await client.query(`SET LOCAL ROLE ${quoteIdentifier(ownerRole)}`);

  // Data Connect does not emit table drops for these retired types. Remove
  // them explicitly before the generated schema migration reconciles the rest.
  await client.query(`DROP TABLE IF EXISTS ${schema}.${quoteIdentifier('lifecycle_idempotency')} CASCADE`);
  await client.query(`DROP TABLE IF EXISTS ${schema}.${quoteIdentifier('provisioning_reconciliation')} CASCADE`);
  await client.query(`DROP TABLE IF EXISTS ${schema}.${quoteIdentifier('audit_event')} CASCADE`);
  await client.query(`DROP TYPE IF EXISTS ${schema}.${quoteIdentifier('provisioning_attempt_status')}`);

  await client.query('COMMIT');
  console.log('Removed retired lifecycle, provisioning reconciliation, and audit event tables.');
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  await closeCloudSqlMigrationClient({ client, pool, connector });
}
