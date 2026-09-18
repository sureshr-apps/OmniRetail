import type { PoolClient } from 'pg';

export interface InventoryMovementHistoryInput {
  organizationId: string;
  outletId: string;
  productId: string;
  limit?: number;
}

export interface InventoryMovementHistoryRow {
  id: string;
  mode: 'INCREASE' | 'DECREASE' | 'RECONCILE';
  quantity: number;
  previousQty: number;
  newQty: number;
  reasonCode: string;
  auditNote: string | null;
  actorFirebaseUid: string;
  createdAt: string;
  batchNumber: string | null;
}

export async function listInventoryMovementHistory(
  client: PoolClient,
  input: InventoryMovementHistoryInput,
): Promise<InventoryMovementHistoryRow[]> {
  const limit = Math.min(100, Math.max(1, Math.floor(input.limit ?? 50)));
  const result = await client.query(
    `SELECT im.id, im.mode, im.quantity, im.previous_qty, im.new_qty,
            im.reason_code, im.audit_note, im.actor_firebase_uid,
            im.created_at::text, ib.batch_number
       FROM "inventory_movement" im
       LEFT JOIN "inventory_batch" ib ON ib.id = im.inventory_batch_id
      WHERE im.organization_id = $1
        AND im.outlet_id = $2
        AND im.product_id = $3
      ORDER BY im.created_at DESC, im.id DESC
      LIMIT $4`,
    [input.organizationId, input.outletId, input.productId, limit],
  );

  return result.rows.map((row) => ({
    id: String(row.id),
    mode: String(row.mode).toUpperCase() as InventoryMovementHistoryRow['mode'],
    quantity: Number(row.quantity),
    previousQty: Number(row.previous_qty),
    newQty: Number(row.new_qty),
    reasonCode: String(row.reason_code),
    auditNote: row.audit_note == null ? null : String(row.audit_note),
    actorFirebaseUid: String(row.actor_firebase_uid),
    createdAt: String(row.created_at),
    batchNumber: row.batch_number == null ? null : String(row.batch_number),
  }));
}
