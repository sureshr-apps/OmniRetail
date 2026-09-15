import { closeCloudSqlMigrationClient, openCloudSqlMigrationClient, quoteIdentifier } from './cloud-sql-migration-helpers.mjs';

const { client, pool, connector, ownerRole, schema } = await openCloudSqlMigrationClient();

try {
  await client.query('BEGIN');
  await client.query(`SET LOCAL ROLE ${quoteIdentifier(ownerRole)}`);
  await client.query(`DROP INDEX IF EXISTS ${schema}.${quoteIdentifier('category_organizationId_lower_value_uidx')}`);
  await client.query(`DROP INDEX IF EXISTS ${schema}.${quoteIdentifier('subcategory_categoryId_lower_value_uidx')}`);
  await client.query('COMMIT');
  console.log('Removed unmanaged product taxonomy helper indexes before Data Connect deployment.');
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  await closeCloudSqlMigrationClient({ client, pool, connector });
}
