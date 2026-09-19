import type { PoolClient } from 'pg';

export interface SqlPoolLike {
  connect(): Promise<PoolClient>;
}

export async function withSqlTransaction<T>(pool: SqlPoolLike, operation: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await operation(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK').catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}
