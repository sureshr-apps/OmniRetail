import { closeCloudSqlMigrationClient, openCloudSqlMigrationClient, quoteIdentifier } from './cloud-sql-migration-helpers.mjs';

const { client, pool, connector, ownerRole, schema } = await openCloudSqlMigrationClient();
try {
  await client.query('BEGIN');
  await client.query(`SET LOCAL ROLE ${quoteIdentifier(ownerRole)}`);
  await client.query(
    `ALTER TABLE ${schema}.${quoteIdentifier('customer')}
      ALTER COLUMN ${quoteIdentifier('email')} DROP NOT NULL,
      ADD COLUMN IF NOT EXISTS ${quoteIdentifier('city')} text,
      ADD COLUMN IF NOT EXISTS ${quoteIdentifier('state')} text,
      ADD COLUMN IF NOT EXISTS ${quoteIdentifier('postal_code')} text,
      ADD COLUMN IF NOT EXISTS ${quoteIdentifier('country')} text`,
  );
  await client.query('COMMIT');
  console.log('Prepared customer schema compatibility columns for connector deployment.');
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  await closeCloudSqlMigrationClient({ client, pool, connector });
}
