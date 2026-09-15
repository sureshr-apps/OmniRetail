import { closeCloudSqlMigrationClient, openCloudSqlMigrationClient, quoteIdentifier } from './cloud-sql-migration-helpers.mjs';

const { client, pool, connector, ownerRole, schema } = await openCloudSqlMigrationClient();

try {
  await client.query('BEGIN');
  await client.query(`SET LOCAL ROLE ${quoteIdentifier(ownerRole)}`);

  // Data Connect does not emit a table drop for this retired type, but the
  // enum is still referenced by the existing table. Remove both explicitly
  // before the generated schema migration attempts to reconcile the rest.
  await client.query(`DROP TABLE IF EXISTS ${schema}.${quoteIdentifier('lifecycle_idempotency')} CASCADE`);
  await client.query(`DROP TYPE IF EXISTS ${schema}.${quoteIdentifier('provisioning_attempt_status')}`);

  await client.query('COMMIT');
  console.log('Removed retired LifecycleIdempotency table and provisioning enum.');
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  await closeCloudSqlMigrationClient({ client, pool, connector });
}
