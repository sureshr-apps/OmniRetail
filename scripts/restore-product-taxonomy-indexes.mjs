import { closeCloudSqlMigrationClient, openCloudSqlMigrationClient, quoteIdentifier } from './cloud-sql-migration-helpers.mjs';

const { client, pool, connector, schema } = await openCloudSqlMigrationClient();

try {
  await client.query('BEGIN');
  await client.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS ${quoteIdentifier('category_organizationId_lower_value_uidx')}
    ON ${schema}.${quoteIdentifier('category')}
    (${quoteIdentifier('organization_id')}, LOWER(BTRIM(${quoteIdentifier('value')})))`);
  await client.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS ${quoteIdentifier('subcategory_categoryId_lower_value_uidx')}
    ON ${schema}.${quoteIdentifier('subcategory')}
    (${quoteIdentifier('category_id')}, LOWER(BTRIM(${quoteIdentifier('value')})))`);
  await client.query('COMMIT');
  console.log('Restored case-insensitive product taxonomy uniqueness indexes.');
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  await closeCloudSqlMigrationClient({ client, pool, connector });
}
