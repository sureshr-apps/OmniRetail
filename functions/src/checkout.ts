import { randomUUID } from 'node:crypto';
import { getCloudSqlPool } from './cloudSql.js';
import { consumeInventoryForSale, isStockTrackedProduct, operationRequestId } from './inventoryBatches.js';
import { recordSaleCashMovement } from './cashRegister.js';

export { isStockTrackedProduct } from './inventoryBatches.js';

export interface CheckoutLineInput {
  productId: string | null;
  itemName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface CheckoutInput {
  organizationId: string;
  outletId: string;
  customerId: string | null;
  receiptNumber: string;
  customerName: string;
  staffName: string;
  channel: string;
  terminalId: string;
  tenderType: string;
  cashAmount?: number;
  tax: number;
  discount: number;
  subtotal: number;
  totalNet: number;
  lines: CheckoutLineInput[];
  requestId?: string;
  actorFirebaseUid?: string;
}

export const SALE_INSERT_SQL = 'INSERT INTO "sale" (id, organization_id, outlet_id, receipt_number, sale_timestamp, customer_id, customer_name, staff_name, channel, terminal_id, tender_type, tax, discount, subtotal, total_net, status, created_at) VALUES ($1, $2, $3, $4, NOW(), $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, \'COMPLETED\', NOW())';

export function buildSaleInsertQuery(input: CheckoutInput, saleId: string): { text: string; values: unknown[] } {
  return {
    text: SALE_INSERT_SQL,
    values: [saleId, input.organizationId, input.outletId, input.receiptNumber, input.customerId, input.customerName, input.staffName, input.channel, input.terminalId, input.tenderType, input.tax, input.discount, input.subtotal, input.totalNet],
  };
}

export function validateCheckoutInput(input: CheckoutInput): void {
  if (!input.organizationId || !input.outletId || !input.receiptNumber || !input.customerName || !input.staffName || !input.terminalId) throw new Error('invalid input');
  if (!input.lines.length) throw new Error('The checkout must contain at least one line.');
  for (const line of input.lines) {
    if (!line.itemName || !Number.isFinite(line.quantity) || line.quantity <= 0 || !Number.isFinite(line.unitPrice) || line.unitPrice < 0 || !Number.isFinite(line.subtotal) || line.subtotal < 0) throw new Error('invalid line');
    if (Math.abs(line.subtotal - line.quantity * line.unitPrice) > 0.01) throw new Error('line total does not match quantity and unit price');
  }
  const cashAmount = input.cashAmount ?? (input.tenderType === 'CASH' ? input.totalNet : input.tenderType === 'SPLIT' ? input.totalNet / 2 : 0);
  for (const value of [input.tax, input.discount, input.subtotal, input.totalNet, cashAmount]) if (!Number.isFinite(value) || value < 0) throw new Error('invalid totals');
  if (cashAmount > input.totalNet + 0.01) throw new Error('cash amount cannot exceed the sale total');
  const lineSubtotal = input.lines.reduce((sum, line) => sum + line.subtotal, 0);
  if (Math.abs(input.subtotal - lineSubtotal) > 0.01 || Math.abs(input.totalNet - (input.subtotal - input.discount + input.tax)) > 0.01) throw new Error('checkout totals do not reconcile');
}

export async function persistCheckout(input: CheckoutInput): Promise<{ saleId: string }> {
  validateCheckoutInput(input);
  const { pool } = await getCloudSqlPool();
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const outlet = await client.query('SELECT id FROM "outlet" WHERE id = $1 AND organization_id = $2 AND status = \'ACTIVE\' FOR SHARE', [input.outletId, input.organizationId]);
    if (!outlet.rowCount) throw new Error('Outlet is not active in this organization.');
    if (input.customerId) {
      const customer = await client.query('SELECT id FROM "customer" WHERE id = $1 AND organization_id = $2 FOR SHARE', [input.customerId, input.organizationId]);
      if (!customer.rowCount) throw new Error('Customer is not in this organization.');
    }
    const saleId = randomUUID();
    const productIds = [...new Set(input.lines.flatMap((line) => line.productId ? [line.productId] : []))];
    const productsById = new Map<string, { id: string; type: string; status: string }>();
    if (productIds.length) {
      const products = await client.query<{ id: string; type: string; status: string }>(
        'SELECT id, type, status FROM "product" WHERE id = ANY($1::uuid[]) AND organization_id = $2 FOR SHARE',
        [productIds, input.organizationId],
      );
      products.rows.forEach((product) => productsById.set(String(product.id), product));
      if (productsById.size !== productIds.length || productIds.some((id) => productsById.get(id)?.status !== 'ACTIVE')) {
        throw new Error('Product is not active in this organization.');
      }
    }
    const saleInsert = buildSaleInsertQuery(input, saleId);
    await client.query(saleInsert.text, saleInsert.values);
    for (const [lineIndex, line] of input.lines.entries()) {
      let productId: string | null = line.productId;
      if (productId) {
        const product = productsById.get(productId);
        if (!product) throw new Error('Product is not active in this organization.');
        const saleLineId = randomUUID();
        await client.query('INSERT INTO "sale_line" (id, sale_id, product_id, item_name, quantity, refunded_qty, unit_price, subtotal) VALUES ($1, $2, $3, $4, $5, 0, $6, $7)', [saleLineId, saleId, productId, line.itemName, line.quantity, line.unitPrice, line.subtotal]);
        if (isStockTrackedProduct(product.type)) {
          await consumeInventoryForSale(client, { organizationId: input.organizationId, outletId: input.outletId, productId, quantity: line.quantity, saleId, saleLineId, receiptNumber: input.receiptNumber, requestId: operationRequestId(input.requestId ?? randomUUID(), `LINE-${lineIndex + 1}`), actorFirebaseUid: input.actorFirebaseUid ?? input.staffName, itemName: line.itemName });
        }
        continue;
      }
      await client.query('INSERT INTO "sale_line" (id, sale_id, product_id, item_name, quantity, refunded_qty, unit_price, subtotal) VALUES ($1, $2, $3, $4, $5, 0, $6, $7)', [randomUUID(), saleId, productId, line.itemName, line.quantity, line.unitPrice, line.subtotal]);
    }
    await recordSaleCashMovement(client, {
      organizationId: input.organizationId,
      outletId: input.outletId,
      cashAmount: input.cashAmount ?? (input.tenderType === 'CASH' ? input.totalNet : input.tenderType === 'SPLIT' ? input.totalNet / 2 : 0),
      saleId,
      receiptNumber: input.receiptNumber,
      actorFirebaseUid: input.actorFirebaseUid ?? input.staffName,
      requestId: input.requestId ?? randomUUID(),
    });
    await client.query('COMMIT');
    return { saleId };
  } catch (error) {
    await client.query('ROLLBACK').catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}
