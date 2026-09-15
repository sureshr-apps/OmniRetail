import { randomUUID } from 'node:crypto';
import { getCloudSqlPool } from './cloudSql.js';

export const PRODUCT_BATCH_MAX_SIZE = 50;
export const PRODUCT_TEXT_MAX_LENGTH = 128;
export const PRODUCT_DESCRIPTION_MAX_LENGTH = 2000;

export interface ProductBatchFields {
  name: string;
  brand: string;
  categoryName: string;
  subcategoryName: string | null;
  type: 'STOCKABLE' | 'SERVICE' | 'CONSUMABLE';
  sku: string;
  barcode: string | null;
  hsnCode: string | null;
  unitOfMeasure: string | null;
  sellingPrice: number;
  mrp: number | null;
  cost: number | null;
  minSellingPrice: number | null;
  discountAllowed: boolean;
  taxCategory: string | null;
  reorderLevel: number | null;
  reorderQuantity: number | null;
  primarySupplier: string | null;
  description: string | null;
}

export interface CreatedProductRecord {
  id: string;
  productCode: number;
  name: string;
  brand: string;
  category: { id: string; value: string };
  subcategory: { id: string; value: string } | null;
  type: ProductBatchFields['type'];
  sku: string;
  barcode: string | null;
  hsnCode: string | null;
  unitOfMeasure: string | null;
  sellingPrice: number;
  mrp: number | null;
  cost: number | null;
  minSellingPrice: number | null;
  discountAllowed: boolean;
  taxCategory: string | null;
  status: 'ACTIVE';
  reorderLevel: number | null;
  reorderQuantity: number | null;
  primarySupplier: string | null;
  description: string | null;
}

function normalizeTaxonomyValue(value: string): string {
  return value.trim().toLocaleLowerCase('en-US');
}

export function validateProductFields(fields: ProductBatchFields): void {
  const shortTextValues = [
    fields.name,
    fields.brand,
    fields.categoryName,
    fields.subcategoryName,
    fields.sku,
    fields.barcode,
    fields.hsnCode,
    fields.unitOfMeasure,
    fields.taxCategory,
    fields.primarySupplier,
  ];
  if (shortTextValues.some((value) => value !== null && value.length > PRODUCT_TEXT_MAX_LENGTH)
    || (fields.description?.length ?? 0) > PRODUCT_DESCRIPTION_MAX_LENGTH) {
    throw new Error('invalid input');
  }
}

function validateBatch(inputs: ProductBatchFields[]): void {
  if (!inputs.length || inputs.length > PRODUCT_BATCH_MAX_SIZE) throw new Error('invalid input');
  const skus = new Set<string>();
  const barcodes = new Set<string>();
  for (const input of inputs) {
    validateProductFields(input);
    const sku = input.sku.toLocaleLowerCase('en-US');
    if (skus.has(sku)) throw new Error('duplicate SKU in request');
    skus.add(sku);
    if (input.barcode) {
      const barcode = input.barcode.toLocaleLowerCase('en-US');
      if (barcodes.has(barcode)) throw new Error('duplicate barcode in request');
      barcodes.add(barcode);
    }
  }
}

async function lockTaxonomy(client: import('pg').PoolClient, key: string): Promise<void> {
  await client.query('SELECT pg_advisory_xact_lock(hashtext($1))', [key]);
}

async function resolveCategory(client: import('pg').PoolClient, organizationId: string, value: string): Promise<{ id: string; value: string }> {
  const normalized = normalizeTaxonomyValue(value);
  await lockTaxonomy(client, `category:${organizationId}:${normalized}`);
  let result = await client.query<{ id: string; value: string }>(
    'SELECT id, value FROM "category" WHERE organization_id = $1 AND lower(value) = lower($2) ORDER BY id LIMIT 1 FOR UPDATE',
    [organizationId, normalized],
  );
  if (!result.rowCount) {
    await client.query(
      'INSERT INTO "category" (id, organization_id, value) VALUES ($1, $2, $3) ON CONFLICT (organization_id, value) DO NOTHING',
      [randomUUID(), organizationId, normalized],
    );
    result = await client.query<{ id: string; value: string }>(
      'SELECT id, value FROM "category" WHERE organization_id = $1 AND lower(value) = lower($2) ORDER BY id LIMIT 1 FOR UPDATE',
      [organizationId, normalized],
    );
  }
  if (!result.rowCount) throw new Error('category could not be created');
  return result.rows[0];
}

async function resolveSubcategory(client: import('pg').PoolClient, categoryId: string, value: string): Promise<{ id: string; value: string } | null> {
  if (!value) return null;
  const normalized = normalizeTaxonomyValue(value);
  await lockTaxonomy(client, `subcategory:${categoryId}:${normalized}`);
  let result = await client.query<{ id: string; value: string }>(
    'SELECT id, value FROM "subcategory" WHERE category_id = $1 AND lower(value) = lower($2) ORDER BY id LIMIT 1 FOR UPDATE',
    [categoryId, normalized],
  );
  if (!result.rowCount) {
    await client.query(
      'INSERT INTO "subcategory" (id, category_id, value) VALUES ($1, $2, $3) ON CONFLICT (category_id, value) DO NOTHING',
      [randomUUID(), categoryId, normalized],
    );
    result = await client.query<{ id: string; value: string }>(
      'SELECT id, value FROM "subcategory" WHERE category_id = $1 AND lower(value) = lower($2) ORDER BY id LIMIT 1 FOR UPDATE',
      [categoryId, normalized],
    );
  }
  if (!result.rowCount) throw new Error('subcategory could not be created');
  return result.rows[0];
}

async function loadCreatedProduct(client: import('pg').PoolClient, organizationId: string, id: string): Promise<CreatedProductRecord> {
  const result = await client.query<Record<string, unknown>>(
    `SELECT p.id, p.product_code, p.name, p.brand, p.type, p.sku, p.barcode, p.hsn_code, p.unit_of_measure,
            p.selling_price, p.mrp, p.cost, p.min_selling_price, p.discount_allowed, p.tax_category, p.status,
            p.reorder_level, p.reorder_quantity, p.primary_supplier, p.description,
            c.id AS category_id, c.value AS category_value, s.id AS subcategory_id, s.value AS subcategory_value
       FROM "product" p
       JOIN "category" c ON c.id = p.category_id
       LEFT JOIN "subcategory" s ON s.id = p.subcategory_id
      WHERE p.id = $1 AND p.organization_id = $2`,
    [id, organizationId],
  );
  if (!result.rowCount) throw new Error('product not found after creation');
  const row = result.rows[0];
  return {
    id: String(row.id),
    productCode: Number(row.product_code),
    name: String(row.name),
    brand: String(row.brand),
    category: { id: String(row.category_id), value: String(row.category_value) },
    subcategory: row.subcategory_id ? { id: String(row.subcategory_id), value: String(row.subcategory_value) } : null,
    type: String(row.type).toUpperCase() as ProductBatchFields['type'],
    sku: String(row.sku),
    barcode: row.barcode == null ? null : String(row.barcode),
    hsnCode: row.hsn_code == null ? null : String(row.hsn_code),
    unitOfMeasure: row.unit_of_measure == null ? null : String(row.unit_of_measure),
    sellingPrice: Number(row.selling_price),
    mrp: row.mrp == null ? null : Number(row.mrp),
    cost: row.cost == null ? null : Number(row.cost),
    minSellingPrice: row.min_selling_price == null ? null : Number(row.min_selling_price),
    discountAllowed: Boolean(row.discount_allowed),
    taxCategory: row.tax_category == null ? null : String(row.tax_category),
    status: 'ACTIVE',
    reorderLevel: row.reorder_level == null ? null : Number(row.reorder_level),
    reorderQuantity: row.reorder_quantity == null ? null : Number(row.reorder_quantity),
    primarySupplier: row.primary_supplier == null ? null : String(row.primary_supplier),
    description: row.description == null ? null : String(row.description),
  };
}

export async function persistProductBatchInTransaction(
  client: import('pg').PoolClient,
  organizationId: string,
  inputs: ProductBatchFields[],
): Promise<CreatedProductRecord[]> {
  validateBatch(inputs);
  const created: CreatedProductRecord[] = [];
  for (const input of inputs) {
    const category = await resolveCategory(client, organizationId, input.categoryName);
    const subcategory = await resolveSubcategory(client, category.id, input.subcategoryName ?? '');
    const id = randomUUID();
    await client.query(
      `INSERT INTO "product" (
        id, organization_id, name, brand, category_id, subcategory_id, type, sku, barcode, hsn_code,
        unit_of_measure, selling_price, mrp, cost, min_selling_price, discount_allowed, tax_category,
        status, reorder_level, reorder_quantity, primary_supplier, description
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, 'ACTIVE', $18, $19, $20, $21)`,
      [
        id, organizationId, input.name, input.brand, category.id, subcategory?.id ?? null, input.type, input.sku,
        input.barcode, input.hsnCode, input.unitOfMeasure, input.sellingPrice, input.mrp, input.cost,
        input.minSellingPrice, input.discountAllowed, input.taxCategory, input.reorderLevel, input.reorderQuantity,
        input.primarySupplier, input.description,
      ],
    );
    created.push(await loadCreatedProduct(client, organizationId, id));
  }
  return created;
}

export async function persistProductBatch(organizationId: string, inputs: ProductBatchFields[]): Promise<CreatedProductRecord[]> {
  const { pool } = await getCloudSqlPool();
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const created = await persistProductBatchInTransaction(client, organizationId, inputs);
    await client.query('COMMIT');
    return created;
  } catch (error) {
    await client.query('ROLLBACK').catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}
