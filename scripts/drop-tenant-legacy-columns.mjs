import { closeCloudSqlMigrationClient, openCloudSqlMigrationClient, quoteIdentifier } from './cloud-sql-migration-helpers.mjs';

const { client, pool, connector, ownerRole, schema } = await openCloudSqlMigrationClient();

try {
  await client.query('BEGIN');
  await client.query(`SET LOCAL ROLE ${quoteIdentifier(ownerRole)}`);
  await client.query(`ALTER TABLE ${schema}.${quoteIdentifier('employee_outlet')} DROP COLUMN IF EXISTS ${quoteIdentifier('created_at')}`);
  await client.query(`ALTER TABLE ${schema}.${quoteIdentifier('service_person_outlet')} DROP COLUMN IF EXISTS ${quoteIdentifier('created_at')}`);
  await client.query(`ALTER TABLE ${schema}.${quoteIdentifier('product')}
    DROP COLUMN IF EXISTS ${quoteIdentifier('image_url')},
    DROP COLUMN IF EXISTS ${quoteIdentifier('created_at')},
    DROP COLUMN IF EXISTS ${quoteIdentifier('updated_at')}`);
  await client.query(`ALTER TABLE ${schema}.${quoteIdentifier('supplier')}
    ALTER COLUMN ${quoteIdentifier('tax_id')} DROP NOT NULL`);
  await client.query(`ALTER TABLE ${schema}.${quoteIdentifier('supplier')}
    DROP COLUMN IF EXISTS ${quoteIdentifier('created_at')},
    DROP COLUMN IF EXISTS ${quoteIdentifier('updated_at')},
    DROP COLUMN IF EXISTS ${quoteIdentifier('city')},
    DROP COLUMN IF EXISTS ${quoteIdentifier('state')},
    DROP COLUMN IF EXISTS ${quoteIdentifier('postal_code')},
    DROP COLUMN IF EXISTS ${quoteIdentifier('country')}`);
  await client.query('COMMIT');
  console.log('Removed retired tenant legacy columns.');
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  await closeCloudSqlMigrationClient({ client, pool, connector });
}
