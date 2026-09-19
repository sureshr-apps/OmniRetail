import { closeCloudSqlMigrationClient, openCloudSqlMigrationClient, quoteIdentifier } from './cloud-sql-migration-helpers.mjs';

const { client, pool, connector, ownerRole, schema } = await openCloudSqlMigrationClient();

const indexes = [
  ['organization_created_at_id_idx', 'organization', ['created_at DESC', 'id ASC']],
  ['sale_organization_timestamp_id_idx', 'sale', ['organization_id', 'sale_timestamp DESC', 'id DESC']],
  ['purchase_organization_date_id_idx', 'purchase', ['organization_id', 'purchase_date DESC', 'id DESC']],
  ['expense_organization_date_id_idx', 'expense', ['organization_id', 'expense_date DESC', 'id DESC']],
  ['inventory_stock_organization_outlet_updated_at_idx', 'inventory_stock', ['organization_id', 'outlet_id', 'updated_at DESC']],
  ['product_organization_name_id_idx', 'product', ['organization_id', 'name ASC', 'id ASC']],
];

try {
  await client.query('BEGIN');
  await client.query(`SET LOCAL ROLE ${quoteIdentifier(ownerRole)}`);
  for (const [name, table, columns] of indexes) {
    const definition = columns.map((column) => {
      const [columnName, direction] = column.split(' ');
      return `${quoteIdentifier(columnName)}${direction ? ` ${direction}` : ''}`;
    }).join(', ');
    await client.query(`CREATE INDEX IF NOT EXISTS ${quoteIdentifier(name)} ON ${schema}.${quoteIdentifier(table)} (${definition})`);
  }
  await client.query('COMMIT');
  console.log(`Ensured ${indexes.length} operational list indexes.`);
} catch (error) {
  await client.query('ROLLBACK').catch(() => undefined);
  throw error;
} finally {
  await closeCloudSqlMigrationClient({ client, pool, connector });
}
