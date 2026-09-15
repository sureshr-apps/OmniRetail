import { closeCloudSqlMigrationClient, openCloudSqlMigrationClient, quoteIdentifier } from './cloud-sql-migration-helpers.mjs';

const { client, pool, connector, ownerRole, schema } = await openCloudSqlMigrationClient();
try {
  await client.query('BEGIN');
  await client.query(`SET LOCAL ROLE ${quoteIdentifier(ownerRole)}`);
  await client.query(
    `ALTER TABLE ${schema}.${quoteIdentifier('customer')}
      ALTER COLUMN ${quoteIdentifier('email')} DROP NOT NULL,
      DROP COLUMN IF EXISTS ${quoteIdentifier('city')},
      DROP COLUMN IF EXISTS ${quoteIdentifier('state')},
      DROP COLUMN IF EXISTS ${quoteIdentifier('postal_code')},
      DROP COLUMN IF EXISTS ${quoteIdentifier('country')}`,
  );
  await client.query('COMMIT');
  console.log('Removed retired customer address columns and made email optional.');
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  await closeCloudSqlMigrationClient({ client, pool, connector });
}
