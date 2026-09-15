import { closeCloudSqlMigrationClient, openCloudSqlMigrationClient, quoteIdentifier } from './cloud-sql-migration-helpers.mjs';

const { client, pool, connector, ownerRole, schema } = await openCloudSqlMigrationClient();

try {
  await client.query('BEGIN');
  await client.query(`SET LOCAL ROLE ${quoteIdentifier(ownerRole)}`);
  // Existing inventory rows predate batch tracking. Preserve their aggregate
  // quantity in one explicit untracked batch so checkout can use the same FEFO
  // allocator for legacy and newly received stock.
  await client.query(`
    INSERT INTO ${schema}.${quoteIdentifier('inventory_batch')}
      (id, organization_id, outlet_id, product_id, batch_number, on_hand_qty)
    SELECT uuid_generate_v4(), s.organization_id, s.outlet_id, s.product_id,
      'UNTRACKED', s.on_hand_qty
    FROM ${schema}.${quoteIdentifier('inventory_stock')} s
    WHERE NOT EXISTS (
      SELECT 1
      FROM ${schema}.${quoteIdentifier('inventory_batch')} b
      WHERE b.organization_id = s.organization_id
        AND b.outlet_id = s.outlet_id
        AND b.product_id = s.product_id
    )
    ON CONFLICT (organization_id, outlet_id, product_id, batch_number) DO NOTHING
  `);
  await client.query('COMMIT');
  console.log('Backfilled legacy inventory quantities into untracked inventory batches.');
} catch (error) {
  await client.query('ROLLBACK').catch(() => undefined);
  throw error;
} finally {
  await closeCloudSqlMigrationClient({ client, pool, connector });
}
