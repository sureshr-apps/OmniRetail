import { describe, expect, it } from 'vitest';
import { deriveSupplierView } from '@/features/suppliers/services/supplierService';
import { upsertById, removeById } from '@/shared/utils/listState';
import type { Supplier } from '@/features/suppliers/types';

const supplier = (overrides: Partial<Supplier> = {}): Supplier => ({
  id: 's1',
  supplierCode: 101,
  name: 'Apex Global Electronics',
  contactPerson: 'Marcus Vance',
  phone: '+15553829100',
  email: 'marcus@apexge.com',
  taxId: 'US-8829104',
  city: 'New York',
  category: 'Consumer Electronics',
  paymentTerms: 'Net 30 Days',
  creditLimit: 50000,
  status: 'Active',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  outstandingBalance: 0,
  pendingDeliveriesCount: 0,
  totalOrdersCount: 0,
  ...overrides,
});

describe('deriveSupplierView', () => {
  it('honors the active status filter after a mutation deactivates a row', () => {
    const all = [supplier({ id: 's1', status: 'Active' }), supplier({ id: 's2', status: 'Active' })];
    const afterDeactivation = upsertById(all, supplier({ id: all[0].id, status: 'Inactive' }));

    const filtered = deriveSupplierView(afterDeactivation, { status: 'Active', page: 1, pageSize: 10 });
    expect(filtered.items.map((s) => s.id)).toEqual(['s2']);
    expect(filtered.filteredCount).toBe(1);

    const unfiltered = deriveSupplierView(afterDeactivation, { status: 'ALL', page: 1, pageSize: 10 });
    expect(unfiltered.kpiSummary.activePartnerships).toBe(1);
  });

  it('honors the active search filter after a mutation renames a row out of the match', () => {
    const all = [supplier({ id: 's1', name: 'Downtown Supplies' }), supplier({ id: 's2', name: 'Uptown Supplies' })];
    const renamed = upsertById(all, { ...all[0], name: 'Riverside Supplies' });

    const view = deriveSupplierView(renamed, { search: 'downtown', page: 1, pageSize: 10 });
    expect(view.items).toHaveLength(0);
    expect(view.filteredCount).toBe(0);
  });

  it('keeps pagination correct: a new record appended by create lands on the right page', () => {
    const all = Array.from({ length: 10 }, (_, i) => supplier({ id: `s${i}`, supplierCode: i }));
    const withNew = upsertById(all, supplier({ id: 's10', supplierCode: 10, name: 'Newest' }));

    const page1 = deriveSupplierView(withNew, { page: 1, pageSize: 10 });
    const page2 = deriveSupplierView(withNew, { page: 2, pageSize: 10 });
    expect(page1.items).toHaveLength(10);
    expect(page2.items.map((s) => s.id)).toEqual(['s10']);
    expect(page2.filteredCount).toBe(11);
    expect(page2.totalPages).toBe(2);
  });

  it('recomputes totals/counts after a removal (hard delete domains)', () => {
    const all = [supplier({ id: 's1', status: 'Active' }), supplier({ id: 's2', status: 'Inactive' })];
    const afterDelete = removeById(all, 's2');
    const view = deriveSupplierView(afterDelete, { page: 1, pageSize: 10 });
    expect(view.filteredCount).toBe(1);
    expect(view.kpiSummary.activePartnerships).toBe(1);
  });

  it('does not blindly append: an upsert to an existing id replaces it in place rather than duplicating', () => {
    const all = [supplier({ id: 's1', name: 'Original' })];
    const updated = upsertById(all, supplier({ id: 's1', name: 'Updated' }));
    const view = deriveSupplierView(updated, { page: 1, pageSize: 10 });
    expect(view.items).toHaveLength(1);
    expect(view.items[0].name).toBe('Updated');
  });

  it('applies the category filter after a mutation moves a row out of the selected category', () => {
    const all = [
      supplier({ id: 's1', category: 'Consumer Electronics' }),
      supplier({ id: 's2', category: 'Apparel & Textiles' }),
    ];
    const recategorized = upsertById(all, supplier({ ...all[0], category: 'Office Supplies' }));

    const view = deriveSupplierView(recategorized, { category: 'Consumer Electronics', page: 1, pageSize: 10 });
    expect(view.items).toHaveLength(0);
  });
});
