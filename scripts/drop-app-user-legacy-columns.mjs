import { closeCloudSqlMigrationClient, openCloudSqlMigrationClient, quoteIdentifier } from './cloud-sql-migration-helpers.mjs';

const { client, pool, connector, ownerRole, schema } = await openCloudSqlMigrationClient();

try {
  await client.query('BEGIN');
  await client.query(`SET LOCAL ROLE ${quoteIdentifier(ownerRole)}`);
  await client.query(`
    ALTER TABLE ${schema}.${quoteIdentifier('app_user')}
      DROP COLUMN IF EXISTS ${quoteIdentifier('last_login_at')},
      DROP COLUMN IF EXISTS ${quoteIdentifier('created_at')},
      DROP COLUMN IF EXISTS ${quoteIdentifier('updated_at')}`,
  );
  await client.query('COMMIT');
  console.log('Removed retired AppUser login and timestamp columns.');
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  await closeCloudSqlMigrationClient({ client, pool, connector });
}
