import { describe, expect, it, vi } from 'vitest';
import { createPurchaseInTransaction, type PurchaseCreationInput } from '../functions/src/purchaseCreation';
import { withSqlTransaction } from '../functions/src/sqlTransaction';
import type { PoolClient } from 'pg';

const input = (overrides: Partial<PurchaseCreationInput> = {}): PurchaseCreationInput => ({
  organizationId: 'org-1', purchaseNumber: 'PO-1', purchaseDate: '2026-09-19', supplierId: 'supplier-1',
  outletId: 'outlet-1', scope: 'outlet', paymentTerms: 'Immediate', subtotal: 100, shippingFee: 0,
  handlingFee: 0, tax: 5, totalAmount: 105, amountPaid: 0, outstandingAmount: 105,
  paymentStatus: 'UNPAID', receiptStatus: 'PENDING', status: 'ACTIVE', createdBy: 'Asha',
  lines: [{ productId: 'product-1', quantity: 2, unitCost: 50, discountPercent: 0, taxRate: 5, taxAmount: 5, lineTotal: 100 }],
  ...overrides,
});

function fakeClient(options: { failOnLine?: boolean } = {}) {
  const queryTexts: string[] = [];
  const client = {
    query: vi.fn(async (text: string, params?: unknown[]) => {
      queryTexts.push(text);
      if (text === 'BEGIN' || text === 'COMMIT' || text === 'ROLLBACK') return { rowCount: 0, rows: [] };
      if (text.includes('FROM "supplier"')) return { rowCount: 1, rows: [{ id: 'supplier-1', status: 'ACTIVE' }] };
      if (text.includes('FROM "outlet"')) return { rowCount: 1, rows: [{ id: 'outlet-1', status: 'ACTIVE' }] };
      if (text.includes('FROM "product"')) {
        const ids = (params?.[1] as string[] | undefined) ?? ['product-1'];
        return { rowCount: ids.length, rows: ids.map((id) => ({ id, status: 'ACTIVE' })) };
      }
      if (options.failOnLine && text.includes('INSERT INTO "purchase_line"')) throw new Error('line insert failed');
      return { rowCount: 1, rows: [] };
    }),
    release: vi.fn(),
  } as unknown as PoolClient;
  return { client, queryTexts };
}

describe('purchase creation transaction', () => {
  it('writes the purchase header and every line on the same transaction client', async () => {
    const { client, queryTexts } = fakeClient();
    const result = await createPurchaseInTransaction(client, input({ lines: [
      input().lines[0],
      { ...input().lines[0], productId: 'product-2' },
    ] }));

    expect(result.lineIds).toHaveLength(2);
    expect(queryTexts.filter((text) => text.includes('INSERT INTO "purchase"'))).toHaveLength(1);
    expect(queryTexts.filter((text) => text.includes('INSERT INTO "purchase_line"'))).toHaveLength(2);
  });

  it('rejects invalid lines before writing a header', async () => {
    const { client, queryTexts } = fakeClient();
    await expect(createPurchaseInTransaction(client, input({ lines: [
      input().lines[0],
      { ...input().lines[0], quantity: 0 },
    ] }))).rejects.toThrow('invalid line');
    expect(queryTexts).toHaveLength(0);
  });

  it('rolls back the header when a later line insert fails', async () => {
    const { client, queryTexts } = fakeClient({ failOnLine: true });
    const pool = { connect: async () => client };
    await expect(withSqlTransaction(pool, (transactionClient) => createPurchaseInTransaction(transactionClient, input())))
      .rejects.toThrow('line insert failed');
    expect(queryTexts).toContain('BEGIN');
    expect(queryTexts).toContain('ROLLBACK');
    expect(queryTexts).not.toContain('COMMIT');
    expect(client.release).toHaveBeenCalledOnce();
  });
});
