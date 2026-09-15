import { describe, expect, it } from 'vitest';
import { deriveProductView } from '@/features/products/services/productService';
import { upsertById, removeById } from '@/shared/utils/listState';
import type { Product } from '@/features/products/types';

const product = (overrides: Partial<Product> = {}): Product => ({
  id: 'p1',
  productCode: 1001,
  name: 'Classic Tee',
  brand: 'Acme',
  categoryId: 'apparel',
  categoryName: 'Apparel',
  type: 'stockable',
  sku: 'AP-TEE-001',
  sellingPrice: 499,
  status: 'active',
  ...overrides,
});

describe('deriveProductView', () => {
  it('honors the active status filter after a mutation deactivates a row', () => {
    const all = [
      product({ id: 'p1', status: 'active' }),
      product({ id: 'p2', status: 'active', sku: 'AP-TEE-002', productCode: 1002 }),
    ];
    const afterDeactivation = upsertById(all, product({ id: 'p1', status: 'inactive' }));

    const filtered = deriveProductView(afterDeactivation, { status: 'ACTIVE', page: 1, pageSize: 10 });
    expect(filtered.items.map((p) => p.id)).toEqual(['p2']);
    expect(filtered.filteredCount).toBe(1);

    const unfiltered = deriveProductView(afterDeactivation, { status: 'ALL', page: 1, pageSize: 10 });
    expect(unfiltered.totalCount).toBe(2);
    expect(unfiltered.filteredCount).toBe(2);
  });

  it('honors the active search filter after a mutation renames a row out of the match', () => {
    const all = [
      product({ id: 'p1', name: 'Downtown Jacket', sku: 'AP-JKT-001', productCode: 1001 }),
      product({ id: 'p2', name: 'Uptown Jacket', sku: 'AP-JKT-002', productCode: 1002 }),
    ];
    const renamed = upsertById(all, { ...all[0], name: 'Riverside Jacket' });

    const view = deriveProductView(renamed, { search: 'downtown', page: 1, pageSize: 10 });
    expect(view.items).toHaveLength(0);
    expect(view.filteredCount).toBe(0);
  });

  it('keeps pagination correct: a new record appended by create lands on the right page', () => {
    const all = Array.from({ length: 10 }, (_, i) => product({ id: `p${i}`, productCode: 1000 + i, sku: `SKU-${i}` }));
    const withNew = upsertById(all, product({ id: 'p10', productCode: 1010, sku: 'SKU-10', name: 'Newest' }));

    const page1 = deriveProductView(withNew, { page: 1, pageSize: 10 });
    const page2 = deriveProductView(withNew, { page: 2, pageSize: 10 });
    expect(page1.items).toHaveLength(10);
    expect(page2.items.map((p) => p.id)).toEqual(['p10']);
    expect(page2.filteredCount).toBe(11);
    expect(page2.totalPages).toBe(2);
  });

  it('recomputes totals/counts after a removal (hard delete domains)', () => {
    const all = [
      product({ id: 'p1', status: 'active' }),
      product({ id: 'p2', status: 'inactive', sku: 'AP-TEE-002', productCode: 1002 }),
    ];
    const afterDelete = removeById(all, 'p2');
    const view = deriveProductView(afterDelete, { page: 1, pageSize: 10 });
    expect(view.filteredCount).toBe(1);
    expect(view.kpis.totalCatalogued).toBe(1);
  });

  it('does not blindly append: an upsert to an existing id replaces it in place rather than duplicating', () => {
    const all = [product({ id: 'p1', name: 'Original' })];
    const updated = upsertById(all, product({ id: 'p1', name: 'Updated' }));
    const view = deriveProductView(updated, { page: 1, pageSize: 10 });
    expect(view.items).toHaveLength(1);
    expect(view.items[0].name).toBe('Updated');
  });
});
