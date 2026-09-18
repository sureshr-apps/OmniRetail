import { randomUUID } from 'node:crypto';
import type { PoolClient } from 'pg';

export interface InventoryBatchRow {
  id: string;
  batchNumber: string;
  mfgDate: string | null;
  expiryDate: string | null;
  onHandQty: number;
  receivedAt: string | null;
}

export interface BatchAllocation {
  batchId: string;
  batchNumber: string;
  quantity: number;
  expiryDate: string | null;
}

export interface InventoryBatchInput {
  organizationId: string;
  outletId: string;
  productId: string;
  quantity: number;
  batchNumber?: string | null;
  mfgDate?: string | null;
  expiryDate?: string | null;
  requestId: string;
  actorFirebaseUid: string;
  reasonCode?: string;
  auditNote?: string | null;
}

export class InventoryStockError extends Error {
  readonly code: 'INVALID_BATCH' | 'INSUFFICIENT_STOCK' | 'PRODUCT_NOT_STOCK_TRACKED' | 'STALE_STOCK' | 'DUPLICATE_BATCH';

  constructor(code: InventoryStockError['code'], message: string) {
    super(message);
    this.name = 'InventoryStockError';
    this.code = code;
  }
}

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
const EPSILON = 0.000001;

export function isStockTrackedProduct(type: unknown): boolean {
  const normalized = String(type).toUpperCase();
  return normalized === 'STOCKABLE' || normalized === 'CONSUMABLE';
}

export function todayInIndia(now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const values = Object.fromEntries(parts.filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function isValidDateOnly(value: string | null | undefined): boolean {
  if (value == null || value === '') return true;
  if (!DATE_ONLY.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return parsed.toISOString().slice(0, 10) === value;
}

export function validateBatchDates(
  mfgDate: string | null | undefined,
  expiryDate: string | null | undefined,
  today = todayInIndia(),
): void {
  if (!isValidDateOnly(mfgDate) || !isValidDateOnly(expiryDate)) {
    throw new InventoryStockError('INVALID_BATCH', 'Manufacturing and expiry dates must use YYYY-MM-DD format.');
  }
  if (mfgDate && expiryDate && mfgDate > expiryDate) {
    throw new InventoryStockError('INVALID_BATCH', 'Manufacturing date cannot be after the expiry date.');
  }
  if (mfgDate && mfgDate > today) {
    throw new InventoryStockError('INVALID_BATCH', 'Manufacturing date cannot be in the future.');
  }
  if (expiryDate && expiryDate < today) {
    throw new InventoryStockError('INVALID_BATCH', 'Expired stock cannot be added to inventory.');
  }
}

export function resolveBatchNumber(
  batchNumber: string | null | undefined,
  expiryDate: string | null | undefined,
  idFactory: () => string = randomUUID,
): string {
  const normalized = batchNumber?.trim().toUpperCase();
  if (normalized) return normalized;
  return expiryDate ? `AUTO-${idFactory().replaceAll('-', '').slice(0, 24).toUpperCase()}` : 'UNTRACKED';
}

function compareNullableDate(a: string | null, b: string | null): number {
  if (a && b) return a.localeCompare(b);
  if (a) return -1;
  if (b) return 1;
  return 0;
}

export function sortBatchesForAllocation(batches: readonly InventoryBatchRow[]): InventoryBatchRow[] {
  return [...batches].sort((a, b) =>
    compareNullableDate(a.expiryDate, b.expiryDate)
    || (a.receivedAt ?? '').localeCompare(b.receivedAt ?? '')
    || a.id.localeCompare(b.id),
  );
}

export function allocateBatches(
  batches: readonly InventoryBatchRow[],
  quantity: number,
  asOf = todayInIndia(),
  includeExpired = false,
): BatchAllocation[] {
  if (!Number.isFinite(quantity) || quantity <= 0) {
    throw new InventoryStockError('INVALID_BATCH', 'Inventory quantity must be greater than zero.');
  }
  const eligible = sortBatchesForAllocation(batches).filter((batch) =>
    Number.isFinite(batch.onHandQty) && batch.onHandQty > EPSILON && (includeExpired || !batch.expiryDate || batch.expiryDate >= asOf),
  );
  const available = eligible.reduce((sum, batch) => sum + batch.onHandQty, 0);
  if (available + EPSILON < quantity) {
    throw new InventoryStockError('INSUFFICIENT_STOCK', `Only ${Math.max(0, available)} saleable units are available.`);
  }
  let remaining = quantity;
  return eligible.flatMap((batch) => {
    if (remaining <= EPSILON) return [];
    const allocated = Math.min(batch.onHandQty, remaining);
    remaining -= allocated;
    return [{ batchId: batch.id, batchNumber: batch.batchNumber, quantity: allocated, expiryDate: batch.expiryDate }];
  });
}

export function operationRequestId(base: string, suffix: string): string {
  const safeBase = base.replace(/[^A-Za-z0-9._:-]/g, '-').slice(0, 110);
  return `${safeBase}-${suffix}`.slice(0, 128);
}

async function loadProduct(client: PoolClient, organizationId: string, productId: string): Promise<{ id: string; type: string; reorderLevel: number }> {
  const result = await client.query(
    'SELECT id, type, COALESCE(reorder_level, 0) AS reorder_level FROM "product" WHERE id = $1 AND organization_id = $2 AND status = \'ACTIVE\' FOR SHARE',
    [productId, organizationId],
  );
  if (!result.rowCount) throw new InventoryStockError('PRODUCT_NOT_STOCK_TRACKED', 'Product is not active in this organization.');
  const product = result.rows[0];
  if (!isStockTrackedProduct(product.type)) throw new InventoryStockError('PRODUCT_NOT_STOCK_TRACKED', 'Service products cannot be added to inventory.');
  return { id: product.id, type: product.type, reorderLevel: Number(product.reorder_level) || 0 };
}

async function ensureActiveOutlet(client: PoolClient, organizationId: string, outletId: string): Promise<void> {
  const result = await client.query(
    'SELECT id FROM "outlet" WHERE id = $1 AND organization_id = $2 AND status = \'ACTIVE\' FOR SHARE',
    [outletId, organizationId],
  );
  if (!result.rowCount) throw new InventoryStockError('INVALID_BATCH', 'Outlet is not active in this organization.');
}

async function loadOrCreateInventoryStock(
  client: PoolClient,
  organizationId: string,
  outletId: string,
  productId: string,
  reorderLevel: number,
): Promise<{ onHandQty: number; reorderLevel: number; overstockThreshold: number }> {
  let result = await client.query(
    'SELECT on_hand_qty, reorder_level, overstock_threshold FROM "inventory_stock" WHERE organization_id = $1 AND outlet_id = $2 AND product_id = $3 FOR UPDATE',
    [organizationId, outletId, productId],
  );
  if (!result.rowCount) {
    const overstockThreshold = Math.max(100, reorderLevel * 10);
    await client.query(
      'INSERT INTO "inventory_stock" (organization_id, outlet_id, product_id, on_hand_qty, reorder_level, overstock_threshold, updated_at) VALUES ($1, $2, $3, 0, $4, $5, NOW()) ON CONFLICT (organization_id, outlet_id, product_id) DO NOTHING',
      [organizationId, outletId, productId, reorderLevel, overstockThreshold],
    );
    result = await client.query(
      'SELECT on_hand_qty, reorder_level, overstock_threshold FROM "inventory_stock" WHERE organization_id = $1 AND outlet_id = $2 AND product_id = $3 FOR UPDATE',
      [organizationId, outletId, productId],
    );
  }
  if (!result.rowCount) throw new Error('Inventory record could not be initialized.');
  return {
    onHandQty: Number(result.rows[0].on_hand_qty),
    reorderLevel: Number(result.rows[0].reorder_level),
    overstockThreshold: Number(result.rows[0].overstock_threshold),
  };
}

async function loadOrCreateBatch(
  client: PoolClient,
  input: { organizationId: string; outletId: string; productId: string; batchNumber: string; mfgDate: string | null; expiryDate: string | null },
): Promise<InventoryBatchRow> {
  let result = await client.query(
    'SELECT id, batch_number, mfg_date::text, expiry_date::text, on_hand_qty, received_at::text FROM "inventory_batch" WHERE organization_id = $1 AND outlet_id = $2 AND product_id = $3 AND batch_number = $4 FOR UPDATE',
    [input.organizationId, input.outletId, input.productId, input.batchNumber],
  );
  if (result.rowCount) {
    const existing = result.rows[0];
    if (input.expiryDate && existing.expiry_date && input.expiryDate !== existing.expiry_date) {
      throw new InventoryStockError('DUPLICATE_BATCH', `Batch ${input.batchNumber} already exists with a different expiry date.`);
    }
    if (input.mfgDate && existing.mfg_date && input.mfgDate !== existing.mfg_date) {
      throw new InventoryStockError('DUPLICATE_BATCH', `Batch ${input.batchNumber} already exists with a different manufacturing date.`);
    }
    if ((input.expiryDate && !existing.expiry_date) || (input.mfgDate && !existing.mfg_date)) {
      await client.query(
        'UPDATE "inventory_batch" SET mfg_date = COALESCE(mfg_date, $2), expiry_date = COALESCE(expiry_date, $3) WHERE id = $1',
        [existing.id, input.mfgDate, input.expiryDate],
      );
      existing.mfg_date = existing.mfg_date ?? input.mfgDate;
      existing.expiry_date = existing.expiry_date ?? input.expiryDate;
    }
    return {
      id: existing.id,
      batchNumber: existing.batch_number,
      mfgDate: existing.mfg_date,
      expiryDate: existing.expiry_date,
      onHandQty: Number(existing.on_hand_qty),
      receivedAt: existing.received_at,
    };
  }
  const id = randomUUID();
  await client.query(
    'INSERT INTO "inventory_batch" (id, organization_id, outlet_id, product_id, batch_number, mfg_date, expiry_date, on_hand_qty, received_at) VALUES ($1, $2, $3, $4, $5, $6, $7, 0, NOW())',
    [id, input.organizationId, input.outletId, input.productId, input.batchNumber, input.mfgDate, input.expiryDate],
  );
  return { id, batchNumber: input.batchNumber, mfgDate: input.mfgDate, expiryDate: input.expiryDate, onHandQty: 0, receivedAt: null };
}

async function insertMovement(
  client: PoolClient,
  input: { organizationId: string; outletId: string; productId: string; batchId?: string; mode: 'INCREASE' | 'DECREASE' | 'RECONCILE'; quantity: number; previousQty: number; newQty: number; reasonCode: string; auditNote?: string | null; actorFirebaseUid: string; requestId: string },
): Promise<void> {
  await client.query(
    'INSERT INTO "inventory_movement" (organization_id, outlet_id, product_id, inventory_batch_id, mode, quantity, previous_qty, new_qty, reason_code, audit_note, actor_firebase_uid, request_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW())',
    [input.organizationId, input.outletId, input.productId, input.batchId ?? null, input.mode, input.quantity, input.previousQty, input.newQty, input.reasonCode, input.auditNote ?? null, input.actorFirebaseUid, input.requestId],
  );
}

async function loadBatchesForUpdate(client: PoolClient, organizationId: string, outletId: string, productId: string, aggregateQty: number): Promise<InventoryBatchRow[]> {
  let result = await client.query(
    'SELECT id, batch_number, mfg_date::text, expiry_date::text, on_hand_qty, received_at::text FROM "inventory_batch" WHERE organization_id = $1 AND outlet_id = $2 AND product_id = $3 FOR UPDATE',
    [organizationId, outletId, productId],
  );
  if (!result.rowCount) {
    const id = randomUUID();
    await client.query(
      'INSERT INTO "inventory_batch" (id, organization_id, outlet_id, product_id, batch_number, on_hand_qty, received_at) VALUES ($1, $2, $3, $4, \'UNTRACKED\', $5, NOW())',
      [id, organizationId, outletId, productId, aggregateQty],
    );
    result = await client.query(
      'SELECT id, batch_number, mfg_date::text, expiry_date::text, on_hand_qty, received_at::text FROM "inventory_batch" WHERE organization_id = $1 AND outlet_id = $2 AND product_id = $3 FOR UPDATE',
      [organizationId, outletId, productId],
    );
  }
  return result.rows.map((row) => ({ id: row.id, batchNumber: row.batch_number, mfgDate: row.mfg_date, expiryDate: row.expiry_date, onHandQty: Number(row.on_hand_qty), receivedAt: row.received_at }));
}

export async function addInventoryUnits(client: PoolClient, input: InventoryBatchInput): Promise<{ newQty: number; batchNumber: string; batchId: string }> {
  if (!Number.isFinite(input.quantity) || input.quantity <= 0) throw new InventoryStockError('INVALID_BATCH', 'Inventory quantity must be greater than zero.');
  const mfgDate = input.mfgDate || null;
  const expiryDate = input.expiryDate || null;
  validateBatchDates(mfgDate, expiryDate);
  await ensureActiveOutlet(client, input.organizationId, input.outletId);
  const product = await loadProduct(client, input.organizationId, input.productId);
  const stock = await loadOrCreateInventoryStock(client, input.organizationId, input.outletId, input.productId, product.reorderLevel);
  const batchNumber = resolveBatchNumber(input.batchNumber, expiryDate);
  const batch = await loadOrCreateBatch(client, { organizationId: input.organizationId, outletId: input.outletId, productId: input.productId, batchNumber, mfgDate, expiryDate });
  await client.query('UPDATE "inventory_batch" SET on_hand_qty = on_hand_qty + $2 WHERE id = $1', [batch.id, input.quantity]);
  const newQty = stock.onHandQty + input.quantity;
  await client.query('UPDATE "inventory_stock" SET on_hand_qty = $4, updated_at = NOW() WHERE organization_id = $1 AND outlet_id = $2 AND product_id = $3', [input.organizationId, input.outletId, input.productId, newQty]);
  await insertMovement(client, { organizationId: input.organizationId, outletId: input.outletId, productId: input.productId, batchId: batch.id, mode: 'INCREASE', quantity: input.quantity, previousQty: stock.onHandQty, newQty, reasonCode: input.reasonCode ?? 'STOCK_RECEIPT', auditNote: input.auditNote, actorFirebaseUid: input.actorFirebaseUid, requestId: input.requestId });
  return { newQty, batchNumber, batchId: batch.id };
}

export async function createInventoryStockRecord(client: PoolClient, input: InventoryBatchInput & { reorderLevel: number; overstockThreshold: number }): Promise<{ newQty: number; batchNumber: string; batchId: string }> {
  if (!Number.isFinite(input.quantity) || input.quantity < 0) throw new InventoryStockError('INVALID_BATCH', 'Inventory quantity cannot be negative.');
  validateBatchDates(input.mfgDate || null, input.expiryDate || null);
  await ensureActiveOutlet(client, input.organizationId, input.outletId);
  await loadProduct(client, input.organizationId, input.productId);
  const existing = await client.query('SELECT on_hand_qty FROM "inventory_stock" WHERE organization_id = $1 AND outlet_id = $2 AND product_id = $3 FOR UPDATE', [input.organizationId, input.outletId, input.productId]);
  if (existing.rowCount) throw new InventoryStockError('DUPLICATE_BATCH', 'Inventory is already configured for this product and outlet.');
  await client.query('INSERT INTO "inventory_stock" (organization_id, outlet_id, product_id, on_hand_qty, reorder_level, overstock_threshold, updated_at) VALUES ($1, $2, $3, $4, $5, $6, NOW())', [input.organizationId, input.outletId, input.productId, input.quantity, input.reorderLevel, input.overstockThreshold]);
  const batchNumber = resolveBatchNumber(input.batchNumber, input.expiryDate);
  const batch = await loadOrCreateBatch(client, { organizationId: input.organizationId, outletId: input.outletId, productId: input.productId, batchNumber, mfgDate: input.mfgDate || null, expiryDate: input.expiryDate || null });
  if (input.quantity > 0) await client.query('UPDATE "inventory_batch" SET on_hand_qty = $2 WHERE id = $1', [batch.id, input.quantity]);
  if (input.quantity > 0) await insertMovement(client, { organizationId: input.organizationId, outletId: input.outletId, productId: input.productId, batchId: batch.id, mode: 'RECONCILE', quantity: input.quantity, previousQty: 0, newQty: input.quantity, reasonCode: input.reasonCode ?? 'OPENING_STOCK', auditNote: input.auditNote ?? 'Initial inventory record created', actorFirebaseUid: input.actorFirebaseUid, requestId: input.requestId });
  return { newQty: input.quantity, batchNumber, batchId: batch.id };
}

export async function consumeInventoryForSale(client: PoolClient, input: { organizationId: string; outletId: string; productId: string; quantity: number; saleId: string; saleLineId: string; receiptNumber: string; requestId: string; actorFirebaseUid: string; itemName: string }): Promise<BatchAllocation[]> {
  if (!Number.isFinite(input.quantity) || input.quantity <= 0) throw new InventoryStockError('INVALID_BATCH', 'Sale quantity must be greater than zero.');
  const product = await loadProduct(client, input.organizationId, input.productId);
  const stockResult = await client.query('SELECT on_hand_qty FROM "inventory_stock" WHERE organization_id = $1 AND outlet_id = $2 AND product_id = $3 FOR UPDATE', [input.organizationId, input.outletId, input.productId]);
  if (!stockResult.rowCount) throw new InventoryStockError('INSUFFICIENT_STOCK', `No inventory record exists for ${input.itemName}.`);
  const aggregateQty = Number(stockResult.rows[0].on_hand_qty);
  if (aggregateQty + EPSILON < input.quantity) throw new InventoryStockError('INSUFFICIENT_STOCK', `Insufficient stock for ${input.itemName}.`);
  const batches = await loadBatchesForUpdate(client, input.organizationId, input.outletId, input.productId, aggregateQty);
  const allocations = allocateBatches(batches, input.quantity);
  const newQty = aggregateQty - input.quantity;
  let movementPreviousQty = aggregateQty;
  for (const [index, allocation] of allocations.entries()) {
    await client.query('UPDATE "inventory_batch" SET on_hand_qty = on_hand_qty - $2 WHERE id = $1 AND on_hand_qty >= $2', [allocation.batchId, allocation.quantity]);
    await client.query('INSERT INTO "sale_line_batch_allocation" (sale_line_id, inventory_batch_id, quantity, refunded_qty) VALUES ($1, $2, $3, 0)', [input.saleLineId, allocation.batchId, allocation.quantity]);
    const movementNewQty = movementPreviousQty - allocation.quantity;
    await insertMovement(client, { organizationId: input.organizationId, outletId: input.outletId, productId: product.id, batchId: allocation.batchId, mode: 'DECREASE', quantity: allocation.quantity, previousQty: movementPreviousQty, newQty: movementNewQty, reasonCode: 'SALE', auditNote: `${input.receiptNumber} / ${input.saleId}`, actorFirebaseUid: input.actorFirebaseUid, requestId: operationRequestId(input.requestId, `SALE-${index + 1}`) });
    movementPreviousQty = movementNewQty;
  }
  await client.query('UPDATE "inventory_stock" SET on_hand_qty = $4, updated_at = NOW() WHERE organization_id = $1 AND outlet_id = $2 AND product_id = $3', [input.organizationId, input.outletId, input.productId, newQty]);
  return allocations;
}

export async function persistSaleLineWithInventory(client: PoolClient, input: { organizationId: string; saleId: string; outletId: string; productId: string; itemName: string; quantity: number; unitPrice: number; subtotal: number; requestId: string; actorFirebaseUid: string }): Promise<{ saleLineId: string; allocations: BatchAllocation[] }> {
  const saleResult = await client.query('SELECT receipt_number, status FROM "sale" WHERE id = $1 AND organization_id = $2 AND outlet_id = $3 FOR SHARE', [input.saleId, input.organizationId, input.outletId]);
  if (!saleResult.rowCount) throw new InventoryStockError('INVALID_BATCH', 'Sale is not in this organization or outlet.');
  if (saleResult.rows[0].status === 'VOIDED') throw new InventoryStockError('INVALID_BATCH', 'Cannot add a line to a voided sale.');
  const product = await loadProduct(client, input.organizationId, input.productId);
  const saleLineId = randomUUID();
  await client.query('INSERT INTO "sale_line" (id, sale_id, product_id, item_name, quantity, unit_price, subtotal) VALUES ($1, $2, $3, $4, $5, $6, $7)', [saleLineId, input.saleId, input.productId, input.itemName, input.quantity, input.unitPrice, input.subtotal]);
  const allocations = isStockTrackedProduct(product.type)
    ? await consumeInventoryForSale(client, { organizationId: input.organizationId, outletId: input.outletId, productId: input.productId, quantity: input.quantity, saleId: input.saleId, saleLineId, receiptNumber: saleResult.rows[0].receipt_number, requestId: input.requestId, actorFirebaseUid: input.actorFirebaseUid, itemName: input.itemName })
    : [];
  return { saleLineId, allocations };
}

export async function receiveInventoryForPurchase(client: PoolClient, input: { organizationId: string; purchaseId: string; lineId: string; outletId?: string; productId?: string; quantityReceived: number; batchNumber?: string | null; mfgDate?: string | null; expiryDate?: string | null; requestId: string; actorFirebaseUid: string }): Promise<{ newReceivedQty: number; newStockQty: number; batchNumber: string; batchId: string; receiptStatus: 'PENDING' | 'PARTIALLY_RECEIVED' | 'RECEIVED' }> {
  if (!Number.isFinite(input.quantityReceived) || input.quantityReceived <= 0) throw new InventoryStockError('INVALID_BATCH', 'Received quantity must be greater than zero.');
  const lineResult = await client.query('SELECT pl.quantity_ordered, pl.quantity_received, pl.product_id, p.organization_id, p.outlet_id, p.status FROM "purchase_line" pl JOIN "purchase" p ON p.id = pl.purchase_id WHERE pl.id = $1 AND pl.purchase_id = $2 AND p.organization_id = $3 FOR UPDATE', [input.lineId, input.purchaseId, input.organizationId]);
  if (!lineResult.rowCount) throw new InventoryStockError('INVALID_BATCH', 'Purchase line is not valid for this organization.');
  const line = lineResult.rows[0];
  const purchaseStatus = String(line.status).toUpperCase();
  if (purchaseStatus === 'CLOSED' || purchaseStatus === 'CANCELLED') throw new InventoryStockError('INVALID_BATCH', 'This purchase is closed and cannot receive additional stock.');
  const productId = String(line.product_id);
  const outletId = line.outlet_id ? String(line.outlet_id) : '';
  if (!outletId) throw new InventoryStockError('INVALID_BATCH', 'Purchase is not assigned to an outlet for stock inward.');
  const currentReceived = Number(line.quantity_received);
  const ordered = Number(line.quantity_ordered);
  const newReceivedQty = currentReceived + input.quantityReceived;
  if (newReceivedQty > ordered + EPSILON) throw new InventoryStockError('INVALID_BATCH', 'Received quantity cannot exceed the ordered quantity.');
  await ensureActiveOutlet(client, input.organizationId, outletId);
  const product = await loadProduct(client, input.organizationId, productId);
  const stock = await loadOrCreateInventoryStock(client, input.organizationId, outletId, productId, product.reorderLevel);
  const mfgDate = input.mfgDate || null;
  const expiryDate = input.expiryDate || null;
  validateBatchDates(mfgDate, expiryDate);
  const batchNumber = resolveBatchNumber(input.batchNumber, expiryDate);
  const batch = await loadOrCreateBatch(client, { organizationId: input.organizationId, outletId, productId, batchNumber, mfgDate, expiryDate });
  await client.query('UPDATE "inventory_batch" SET on_hand_qty = on_hand_qty + $2 WHERE id = $1', [batch.id, input.quantityReceived]);
  const newStockQty = stock.onHandQty + input.quantityReceived;
  await client.query('UPDATE "inventory_stock" SET on_hand_qty = $4, updated_at = NOW() WHERE organization_id = $1 AND outlet_id = $2 AND product_id = $3', [input.organizationId, outletId, productId, newStockQty]);
  await client.query('UPDATE "purchase_line" SET quantity_received = $2, batch_number = $3, mfg_date = $4, expiry_date = $5 WHERE id = $1', [input.lineId, newReceivedQty, batchNumber, mfgDate, expiryDate]);
  await client.query('INSERT INTO "purchase_line_batch_allocation" (purchase_line_id, inventory_batch_id, quantity) VALUES ($1, $2, $3) ON CONFLICT (purchase_line_id, inventory_batch_id) DO UPDATE SET quantity = purchase_line_batch_allocation.quantity + EXCLUDED.quantity', [input.lineId, batch.id, input.quantityReceived]);
  const purchaseTotals = await client.query('SELECT COUNT(*) FILTER (WHERE quantity_received >= quantity_ordered) AS received_lines, COUNT(*) AS total_lines FROM "purchase_line" WHERE purchase_id = $1', [input.purchaseId]);
  const totals = purchaseTotals.rows[0];
  const receiptStatus = Number(totals.received_lines) === Number(totals.total_lines) ? 'RECEIVED' : 'PARTIALLY_RECEIVED';
  await client.query('UPDATE "purchase" SET receipt_status = $2, batch_number = $3, mfg_date = $4, expiry_date = $5, updated_at = NOW() WHERE id = $1', [input.purchaseId, receiptStatus, batchNumber, mfgDate, expiryDate]);
  await insertMovement(client, { organizationId: input.organizationId, outletId, productId, batchId: batch.id, mode: 'INCREASE', quantity: input.quantityReceived, previousQty: stock.onHandQty, newQty: newStockQty, reasonCode: 'PURCHASE_RECEIPT', auditNote: input.purchaseId, actorFirebaseUid: input.actorFirebaseUid, requestId: input.requestId });
  return { newReceivedQty, newStockQty, batchNumber, batchId: batch.id, receiptStatus };
}

export async function reverseSaleInventory(client: PoolClient, input: { organizationId: string; saleId: string; reason: string; requestId: string; actorFirebaseUid: string }): Promise<{ restoredQty: number }> {
  const saleResult = await client.query('SELECT id, outlet_id, status FROM "sale" WHERE id = $1 AND organization_id = $2 FOR UPDATE', [input.saleId, input.organizationId]);
  if (!saleResult.rowCount) throw new InventoryStockError('INVALID_BATCH', 'Sale is not in this organization.');
  if (saleResult.rows[0].status === 'VOIDED') throw new InventoryStockError('INVALID_BATCH', 'Sale is already voided.');
  const outletId = saleResult.rows[0].outlet_id;
  const allocations = await client.query('SELECT a.id, a.sale_line_id, a.inventory_batch_id, a.quantity, a.refunded_qty, sl.product_id, b.batch_number FROM "sale_line_batch_allocation" a JOIN "sale_line" sl ON sl.id = a.sale_line_id JOIN "inventory_batch" b ON b.id = a.inventory_batch_id WHERE sl.sale_id = $1 ORDER BY a.inventory_batch_id, a.id FOR UPDATE', [input.saleId]);
  let restoredQty = 0;
  for (const [index, allocation] of allocations.rows.entries()) {
    const remaining = Number(allocation.quantity) - Number(allocation.refunded_qty ?? 0);
    if (remaining <= EPSILON) continue;
    await client.query('UPDATE "inventory_batch" SET on_hand_qty = on_hand_qty + $2 WHERE id = $1', [allocation.inventory_batch_id, remaining]);
    const stock = await loadOrCreateInventoryStock(client, input.organizationId, outletId, allocation.product_id, 0);
    const newQty = stock.onHandQty + remaining;
    await client.query('UPDATE "inventory_stock" SET on_hand_qty = $4, updated_at = NOW() WHERE organization_id = $1 AND outlet_id = $2 AND product_id = $3', [input.organizationId, outletId, allocation.product_id, newQty]);
    await client.query('UPDATE "sale_line_batch_allocation" SET refunded_qty = quantity WHERE id = $1', [allocation.id]);
    await insertMovement(client, { organizationId: input.organizationId, outletId, productId: allocation.product_id, batchId: allocation.inventory_batch_id, mode: 'INCREASE', quantity: remaining, previousQty: stock.onHandQty, newQty, reasonCode: 'SALE_VOID', auditNote: `${input.saleId}: ${input.reason}`, actorFirebaseUid: input.actorFirebaseUid, requestId: operationRequestId(input.requestId, `VOID-${index + 1}`) });
    restoredQty += remaining;
  }
  // Restore any stock-tracked legacy lines that do not have allocation rows.
  // This also handles a sale containing a mix of migrated and newly allocated lines.
  const legacyLines = await client.query('SELECT sl.product_id, sl.quantity, p.type FROM "sale_line" sl JOIN "product" p ON p.id = sl.product_id WHERE sl.sale_id = $1 AND sl.product_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM "sale_line_batch_allocation" a WHERE a.sale_line_id = sl.id)', [input.saleId]);
  if (legacyLines.rowCount) {
    for (const [index, line] of legacyLines.rows.entries()) {
      if (!isStockTrackedProduct(line.type)) continue;
      const stock = await loadOrCreateInventoryStock(client, input.organizationId, outletId, line.product_id, 0);
      const batch = await loadOrCreateBatch(client, { organizationId: input.organizationId, outletId, productId: line.product_id, batchNumber: 'UNTRACKED', mfgDate: null, expiryDate: null });
      const quantity = Number(line.quantity);
      await client.query('UPDATE "inventory_batch" SET on_hand_qty = on_hand_qty + $2 WHERE id = $1', [batch.id, quantity]);
      const newQty = stock.onHandQty + quantity;
      await client.query('UPDATE "inventory_stock" SET on_hand_qty = $4, updated_at = NOW() WHERE organization_id = $1 AND outlet_id = $2 AND product_id = $3', [input.organizationId, outletId, line.product_id, newQty]);
      await insertMovement(client, { organizationId: input.organizationId, outletId, productId: line.product_id, batchId: batch.id, mode: 'INCREASE', quantity, previousQty: stock.onHandQty, newQty, reasonCode: 'SALE_VOID_LEGACY', auditNote: `${input.saleId}: ${input.reason}`, actorFirebaseUid: input.actorFirebaseUid, requestId: operationRequestId(input.requestId, `LEGACY-${index + 1}`) });
      restoredQty += quantity;
    }
  }
  await client.query('UPDATE "sale" SET status = \'VOIDED\' WHERE id = $1', [input.saleId]);
  return { restoredQty };
}

export async function adjustInventoryWithBatches(client: PoolClient, input: { organizationId: string; outletId: string; productId: string; mode: 'INCREASE' | 'DECREASE' | 'RECONCILE'; quantity: number; expectedPreviousQty?: number; requestId: string; actorFirebaseUid: string; reasonCode: string; auditNote?: string | null }): Promise<{ newQty: number }> {
  if (!Number.isFinite(input.quantity) || input.quantity < 0) throw new InventoryStockError('INVALID_BATCH', 'Adjustment quantity is invalid.');
  await ensureActiveOutlet(client, input.organizationId, input.outletId);
  const product = await loadProduct(client, input.organizationId, input.productId);
  const stock = await loadOrCreateInventoryStock(client, input.organizationId, input.outletId, input.productId, product.reorderLevel);
  if (input.expectedPreviousQty !== undefined && Math.abs(input.expectedPreviousQty - stock.onHandQty) > EPSILON) throw new InventoryStockError('STALE_STOCK', 'Inventory changed while this adjustment was open. Refresh and try again.');
  const targetQty = input.mode === 'INCREASE' ? stock.onHandQty + input.quantity : input.mode === 'DECREASE' ? stock.onHandQty - input.quantity : input.quantity;
  if (targetQty < -EPSILON) throw new InventoryStockError('INSUFFICIENT_STOCK', 'Adjustment cannot reduce inventory below zero.');
  const delta = targetQty - stock.onHandQty;
  if (delta > EPSILON) {
    await addInventoryUnits(client, { organizationId: input.organizationId, outletId: input.outletId, productId: input.productId, quantity: delta, batchNumber: 'UNTRACKED', requestId: input.requestId, actorFirebaseUid: input.actorFirebaseUid, reasonCode: input.reasonCode, auditNote: input.auditNote });
  } else if (delta < -EPSILON) {
    const batches = await loadBatchesForUpdate(client, input.organizationId, input.outletId, input.productId, stock.onHandQty);
    const allocations = allocateBatches(batches, Math.abs(delta), todayInIndia(), true);
    let movementPreviousQty = stock.onHandQty;
    for (const [index, allocation] of allocations.entries()) {
      await client.query('UPDATE "inventory_batch" SET on_hand_qty = on_hand_qty - $2 WHERE id = $1', [allocation.batchId, allocation.quantity]);
      const movementNewQty = movementPreviousQty - allocation.quantity;
      await insertMovement(client, { organizationId: input.organizationId, outletId: input.outletId, productId: input.productId, batchId: allocation.batchId, mode: 'DECREASE', quantity: allocation.quantity, previousQty: movementPreviousQty, newQty: movementNewQty, reasonCode: input.reasonCode, auditNote: input.auditNote, actorFirebaseUid: input.actorFirebaseUid, requestId: operationRequestId(input.requestId, `ADJUST-${index + 1}`) });
      movementPreviousQty = movementNewQty;
    }
    await client.query('UPDATE "inventory_stock" SET on_hand_qty = $4, updated_at = NOW() WHERE organization_id = $1 AND outlet_id = $2 AND product_id = $3', [input.organizationId, input.outletId, input.productId, targetQty]);
  } else {
    await insertMovement(client, { organizationId: input.organizationId, outletId: input.outletId, productId: input.productId, mode: 'RECONCILE', quantity: 0, previousQty: stock.onHandQty, newQty: stock.onHandQty, reasonCode: input.reasonCode, auditNote: input.auditNote, actorFirebaseUid: input.actorFirebaseUid, requestId: input.requestId });
  }
  return { newQty: Math.max(0, targetQty) };
}
