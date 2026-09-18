import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { listInventoryMovementHistory } from '../functions/src/inventoryMovements';

const service = readFileSync(new URL('../src/features/inventory/services/inventoryService.ts', import.meta.url), 'utf8');
const modal = readFileSync(new URL('../src/features/inventory/components/StockAuditHistoryModal.tsx', import.meta.url), 'utf8');
const page = readFileSync(new URL('../src/features/inventory/pages/InventoryPage.tsx', import.meta.url), 'utf8');
const functions = readFileSync(new URL('../functions/src/index.ts', import.meta.url), 'utf8');

describe('production inventory movement history', () => {
  it('reads tenant-scoped movement rows from the existing inventory ledger', async () => {
    const calls: Array<{ sql: string; params?: readonly unknown[] }> = [];
    const client = {
      query: async (sql: string, params?: readonly unknown[]) => {
        calls.push({ sql, params });
        return {
          rowCount: 1,
          rows: [{
            id: 'movement-1',
            mode: 'DECREASE',
            quantity: '2',
            previous_qty: '10',
            new_qty: '8',
            reason_code: 'SALE',
            audit_note: 'POS-1001 / sale-1',
            actor_firebase_uid: 'firebase-user-1',
            created_at: '2026-09-18 10:00:00+05:30',
            batch_number: 'BATCH-1',
          }],
        };
      },
    } as any;

    await expect(listInventoryMovementHistory(client, {
      organizationId: 'org-1',
      outletId: 'outlet-1',
      productId: 'product-1',
    })).resolves.toEqual([{
      id: 'movement-1',
      mode: 'DECREASE',
      quantity: 2,
      previousQty: 10,
      newQty: 8,
      reasonCode: 'SALE',
      auditNote: 'POS-1001 / sale-1',
      actorFirebaseUid: 'firebase-user-1',
      createdAt: '2026-09-18 10:00:00+05:30',
      batchNumber: 'BATCH-1',
    }]);
    expect(calls[0].sql).toContain('FROM "inventory_movement"');
    expect(calls[0].sql).toContain('ORDER BY im.created_at DESC, im.id DESC');
    expect(calls[0].params).toEqual(['org-1', 'outlet-1', 'product-1', 50]);
  });

  it('uses the callable history path and never falls back to fixture movements', () => {
    expect(functions).toContain('export const listTenantInventoryMovementHistory = onCall');
    expect(functions).toContain('listInventoryMovementHistory(client');
    expect(service).toContain("'listTenantInventoryMovementHistory'");
    expect(page).toContain('inventoryService.getMovementHistory(item)');
    expect(modal).toContain('No stock movements recorded for this item.');
    expect(modal).not.toContain('DEF-1');
    expect(modal).not.toContain('Sale Receipt #POS-9812');
  });
});
