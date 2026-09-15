import { closeCloudSqlMigrationClient, openCloudSqlMigrationClient, quoteIdentifier } from './cloud-sql-migration-helpers.mjs';

const { client, pool, connector, schemaName, ownerRole, schema } = await openCloudSqlMigrationClient();

async function hasColumn(tableName, columnName) {
  const result = await client.query(
    `SELECT 1 FROM information_schema.columns WHERE table_schema = $1 AND table_name = $2 AND column_name = $3`,
    [schemaName, tableName, columnName],
  );
  return result.rowCount > 0;
}

try {
  await client.query('BEGIN');
  await client.query(`SET LOCAL ROLE ${quoteIdentifier(ownerRole)}`);

  await client.query(`
    CREATE TABLE IF NOT EXISTS ${schema}.${quoteIdentifier('category')} (
      ${quoteIdentifier('id')} uuid NOT NULL DEFAULT uuid_generate_v4(),
      ${quoteIdentifier('organization_id')} uuid NOT NULL,
      ${quoteIdentifier('value')} text NOT NULL,
      PRIMARY KEY (${quoteIdentifier('id')}),
      CONSTRAINT ${quoteIdentifier('category_organization_id_fkey')}
        FOREIGN KEY (${quoteIdentifier('organization_id')}) REFERENCES ${schema}.${quoteIdentifier('organization')} (${quoteIdentifier('id')}) ON DELETE CASCADE
    )`);
  await client.query(`CREATE INDEX IF NOT EXISTS ${quoteIdentifier('category_organizationId_idx')} ON ${schema}.${quoteIdentifier('category')} (${quoteIdentifier('organization_id')})`);
  await client.query(`CREATE UNIQUE INDEX IF NOT EXISTS ${quoteIdentifier('category_organizationId_value_uidx')} ON ${schema}.${quoteIdentifier('category')} (${quoteIdentifier('organization_id')}, ${quoteIdentifier('value')})`);

  await client.query(`
    CREATE TABLE IF NOT EXISTS ${schema}.${quoteIdentifier('subcategory')} (
      ${quoteIdentifier('id')} uuid NOT NULL DEFAULT uuid_generate_v4(),
      ${quoteIdentifier('category_id')} uuid NOT NULL,
      ${quoteIdentifier('value')} text NOT NULL,
      PRIMARY KEY (${quoteIdentifier('id')}),
      CONSTRAINT ${quoteIdentifier('subcategory_category_id_fkey')}
        FOREIGN KEY (${quoteIdentifier('category_id')}) REFERENCES ${schema}.${quoteIdentifier('category')} (${quoteIdentifier('id')}) ON DELETE CASCADE
    )`);
  await client.query(`CREATE INDEX IF NOT EXISTS ${quoteIdentifier('subcategory_categoryId_idx')} ON ${schema}.${quoteIdentifier('subcategory')} (${quoteIdentifier('category_id')})`);
  await client.query(`CREATE UNIQUE INDEX IF NOT EXISTS ${quoteIdentifier('subcategory_categoryId_value_uidx')} ON ${schema}.${quoteIdentifier('subcategory')} (${quoteIdentifier('category_id')}, ${quoteIdentifier('value')})`);

  if (await hasColumn('product', 'category_name') && !(await hasColumn('product', 'legacy_category_name'))) {
    await client.query(`ALTER TABLE ${schema}.${quoteIdentifier('product')} RENAME COLUMN ${quoteIdentifier('category_name')} TO ${quoteIdentifier('legacy_category_name')}`);
  }
  if (await hasColumn('product', 'subcategory') && !(await hasColumn('product', 'legacy_subcategory'))) {
    await client.query(`ALTER TABLE ${schema}.${quoteIdentifier('product')} RENAME COLUMN ${quoteIdentifier('subcategory')} TO ${quoteIdentifier('legacy_subcategory')}`);
  }

  // Only rename the legacy category-id column when a legacy source column is
  // present. On a second run all legacy columns have been removed, so the
  // canonical category_id column must be left untouched.
  const hasLegacyCategorySources = await hasColumn('product', 'legacy_category_name') || await hasColumn('product', 'legacy_subcategory');
  if (hasLegacyCategorySources && await hasColumn('product', 'category_id') && !(await hasColumn('product', 'legacy_category_id'))) {
    await client.query(`ALTER TABLE ${schema}.${quoteIdentifier('product')} RENAME COLUMN ${quoteIdentifier('category_id')} TO ${quoteIdentifier('legacy_category_id')}`);
  }

  if (!(await hasColumn('product', 'category_id'))) {
    await client.query(`ALTER TABLE ${schema}.${quoteIdentifier('product')} ADD COLUMN ${quoteIdentifier('category_id')} uuid`);
  }
  if (!(await hasColumn('product', 'subcategory_id'))) {
    await client.query(`ALTER TABLE ${schema}.${quoteIdentifier('product')} ADD COLUMN ${quoteIdentifier('subcategory_id')} uuid`);
  }

  if (await hasColumn('product', 'legacy_category_name')) {
    await client.query(`
      INSERT INTO ${schema}.${quoteIdentifier('category')} (${quoteIdentifier('organization_id')}, ${quoteIdentifier('value')})
      SELECT DISTINCT p.${quoteIdentifier('organization_id')}, COALESCE(NULLIF(BTRIM(p.${quoteIdentifier('legacy_category_name')}), ''), 'General')
      FROM ${schema}.${quoteIdentifier('product')} p
      ON CONFLICT (${quoteIdentifier('organization_id')}, ${quoteIdentifier('value')}) DO NOTHING`);
    await client.query(`
      INSERT INTO ${schema}.${quoteIdentifier('subcategory')} (${quoteIdentifier('category_id')}, ${quoteIdentifier('value')})
      SELECT DISTINCT c.${quoteIdentifier('id')}, BTRIM(p.${quoteIdentifier('legacy_subcategory')})
      FROM ${schema}.${quoteIdentifier('product')} p
      JOIN ${schema}.${quoteIdentifier('category')} c
        ON c.${quoteIdentifier('organization_id')} = p.${quoteIdentifier('organization_id')}
       AND c.${quoteIdentifier('value')} = COALESCE(NULLIF(BTRIM(p.${quoteIdentifier('legacy_category_name')}), ''), 'General')
      WHERE NULLIF(BTRIM(p.${quoteIdentifier('legacy_subcategory')}), '') IS NOT NULL
      ON CONFLICT (${quoteIdentifier('category_id')}, ${quoteIdentifier('value')}) DO NOTHING`);
    await client.query(`
      UPDATE ${schema}.${quoteIdentifier('product')} p
      SET ${quoteIdentifier('category_id')} = c.${quoteIdentifier('id')}
      FROM ${schema}.${quoteIdentifier('category')} c
      WHERE p.${quoteIdentifier('category_id')} IS NULL
        AND c.${quoteIdentifier('organization_id')} = p.${quoteIdentifier('organization_id')}
        AND c.${quoteIdentifier('value')} = COALESCE(NULLIF(BTRIM(p.${quoteIdentifier('legacy_category_name')}), ''), 'General')`);
    await client.query(`
      UPDATE ${schema}.${quoteIdentifier('product')} p
      SET ${quoteIdentifier('subcategory_id')} = s.${quoteIdentifier('id')}
      FROM ${schema}.${quoteIdentifier('category')} c
      JOIN ${schema}.${quoteIdentifier('subcategory')} s ON s.${quoteIdentifier('category_id')} = c.${quoteIdentifier('id')}
      WHERE p.${quoteIdentifier('subcategory_id')} IS NULL
        AND c.${quoteIdentifier('organization_id')} = p.${quoteIdentifier('organization_id')}
        AND c.${quoteIdentifier('value')} = COALESCE(NULLIF(BTRIM(p.${quoteIdentifier('legacy_category_name')}), ''), 'General')
        AND s.${quoteIdentifier('value')} = BTRIM(p.${quoteIdentifier('legacy_subcategory')})`);

    for (const legacyColumn of ['legacy_category_id', 'legacy_category_name', 'legacy_subcategory']) {
      if (await hasColumn('product', legacyColumn)) {
        await client.query(`ALTER TABLE ${schema}.${quoteIdentifier('product')} DROP COLUMN ${quoteIdentifier(legacyColumn)}`);
      }
    }
  }

  await client.query('COMMIT');
  console.log('Prepared Product category and subcategory masters and backfilled existing products.');
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  await closeCloudSqlMigrationClient({ client, pool, connector });
}
