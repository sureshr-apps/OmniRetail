import { randomUUID } from 'node:crypto';
import pg from 'pg';
import { getCloudSqlPool } from './cloudSql.js';

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
  tax: number;
  discount: number;
  subtotal: number;
  totalNet: number;
  lines: CheckoutLineInput[];
}

export const SALE_INSERT_SQL = 'INSERT INTO "sale" (id, organization_id, outlet_id, receipt_number, sale_timestamp, customer_id, customer_name, staff_name, channel, terminal_id, tender_type, tax, discount, subtotal, total_net, status, created_at) VALUES ($1, $2, $3, $4, NOW(), $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, \'COMPLETED\', NOW())';

export function buildSaleInsertQuery(input: CheckoutInput, saleId: string): { text: string; values: unknown[] } {
  return {
    text: SALE_INSERT_SQL,
    values: [saleId, input.organizationId, input.outletId, input.receiptNumber, input.customerId, input.customerName, input.staffName, input.channel, input.terminalId, input.tenderType, input.tax, input.discount, input.subtotal, input.totalNet],
  };
}

export function isStockTrackedProduct(type: unknown): boolean {
  return String(type).toUpperCase() === 'STOCKABLE';
}

export function validateCheckoutInput(input: CheckoutInput): void {
  if (!input.organizationId || !input.outletId || !input.receiptNumber || !input.customerName || !input.staffName || !input.terminalId) throw new Error('invalid input');
  if (!input.lines.length) throw new Error('The checkout must contain at least one line.');
  for (const line of input.lines) {
    if (!line.itemName || !Number.isFinite(line.quantity) || line.quantity <= 0 || !Number.isFinite(line.unitPrice) || line.unitPrice < 0 || !Number.isFinite(line.subtotal) || line.subtotal < 0) throw new Error('invalid line');
    if (Math.abs(line.subtotal - line.quantity * line.unitPrice) > 0.01) throw new Error('line total does not match quantity and unit price');
  }
  for (const value of [input.tax, input.discount, input.subtotal, input.totalNet]) if (!Number.isFinite(value) || value < 0) throw new Error('invalid totals');
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
    const saleInsert = buildSaleInsertQuery(input, saleId);
    await client.query(saleInsert.text, saleInsert.values);
    for (const line of input.lines) {
      let productId: string | null = line.productId;
      if (productId) {
        const product = await client.query('SELECT id, type FROM "product" WHERE id = $1 AND organization_id = $2 FOR SHARE', [productId, input.organizationId]);
        if (!product.rowCount) throw new Error('Product is not in this organization.');
        if (isStockTrackedProduct(product.rows[0].type)) {
          const stock = await client.query('SELECT on_hand_qty FROM "inventory_stock" WHERE organization_id = $1 AND outlet_id = $2 AND product_id = $3 FOR UPDATE', [input.organizationId, input.outletId, productId]);
          if (!stock.rowCount || Number(stock.rows[0].on_hand_qty) < line.quantity) throw new Error(`Insufficient stock for ${line.itemName}.`);
          await client.query('UPDATE "inventory_stock" SET on_hand_qty = on_hand_qty - $1, updated_at = NOW() WHERE organization_id = $2 AND outlet_id = $3 AND product_id = $4', [line.quantity, input.organizationId, input.outletId, productId]);
        }
      }
      await client.query('INSERT INTO "sale_line" (id, sale_id, product_id, item_name, quantity, unit_price, subtotal) VALUES ($1, $2, $3, $4, $5, $6, $7)', [randomUUID(), saleId, productId, line.itemName, line.quantity, line.unitPrice, line.subtotal]);
    }
    await client.query('COMMIT');
    return { saleId };
  } catch (error) {
    await client.query('ROLLBACK').catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}
