import { describe, expect, it } from 'vitest';
import { deriveCustomerView } from '@/features/customers/services/customerService';
import { upsertById, removeById } from '@/shared/utils/listState';
import type { Customer } from '@/features/customers/types';

const customer = (overrides: Partial<Customer> = {}): Customer => ({
  id: 'c1', customerCode: 1, type: 'Individual', name: 'Jane Doe',
  phone: '+919876543210', email: 'jane@example.com',
  status: 'Active', totalPurchases: 0, completedOrdersCount: 0, balance: 0,
  ...overrides,
});

describe('deriveCustomerView', () => {
  it('honors the active status filter after a mutation deactivates a row', () => {
    const all = [customer({ id: 'c1', status: 'Active' }), customer({ id: 'c2', status: 'Active' })];
    const afterDeactivation = upsertById(all, customer({ id: all[0].id, status: 'Inactive' }));

    const filtered = deriveCustomerView(afterDeactivation, { status: 'Active', page: 1, pageSize: 10 });
    expect(filtered.items.map((c) => c.id)).toEqual(['c2']);
    expect(filtered.filteredCount).toBe(1);

    const unfiltered = deriveCustomerView(afterDeactivation, { status: 'ALL', page: 1, pageSize: 10 });
    expect(unfiltered.filteredCount).toBe(2);
  });

  it('honors the active search filter after a mutation renames a row out of the match', () => {
    const all = [customer({ id: 'c1', name: 'Downtown Traders' }), customer({ id: 'c2', name: 'Uptown Traders' })];
    const renamed = upsertById(all, { ...all[0], name: 'Riverside Traders' });

    const view = deriveCustomerView(renamed, { search: 'downtown', page: 1, pageSize: 10 });
    expect(view.items).toHaveLength(0);
    expect(view.filteredCount).toBe(0);
  });

  it('honors the type filter (Business vs Individual)', () => {
    const all = [customer({ id: 'c1', type: 'Individual' }), customer({ id: 'c2', type: 'Business' })];
    const view = deriveCustomerView(all, { type: 'Business', page: 1, pageSize: 10 });
    expect(view.items.map((c) => c.id)).toEqual(['c2']);
  });

  it('includes customers without email in search derivation', () => {
    const all = [customer({ id: 'c1', email: undefined }), customer({ id: 'c2', email: 'jane@example.com' })];
    const view = deriveCustomerView(all, { search: 'jane@example.com', page: 1, pageSize: 10 });
    expect(view.items.map((c) => c.id)).toEqual(['c2']);
  });

  it('keeps pagination correct: a new record appended by create lands on the right page', () => {
    const all = Array.from({ length: 10 }, (_, i) => customer({ id: `c${i}`, customerCode: i }));
    const withNew = upsertById(all, customer({ id: 'c10', customerCode: 10, name: 'Newest' }));

    const page1 = deriveCustomerView(withNew, { page: 1, pageSize: 10 });
    const page2 = deriveCustomerView(withNew, { page: 2, pageSize: 10 });
    expect(page1.items).toHaveLength(10);
    expect(page2.items.map((c) => c.id)).toEqual(['c10']);
    expect(page2.filteredCount).toBe(11);
    expect(page2.totalPages).toBe(2);
  });

  it('recomputes totals after a removal (hard delete domains)', () => {
    const all = [customer({ id: 'c1', status: 'Active' }), customer({ id: 'c2', status: 'Inactive' })];
    const afterDelete = removeById(all, 'c2');
    const view = deriveCustomerView(afterDelete, { page: 1, pageSize: 10 });
    expect(view.filteredCount).toBe(1);
  });

  it('does not blindly append: an upsert to an existing id replaces it in place rather than duplicating', () => {
    const all = [customer({ id: 'c1', name: 'Original' })];
    const updated = upsertById(all, customer({ id: 'c1', name: 'Updated' }));
    const view = deriveCustomerView(updated, { page: 1, pageSize: 10 });
    expect(view.items).toHaveLength(1);
    expect(view.items[0].name).toBe('Updated');
  });
});
