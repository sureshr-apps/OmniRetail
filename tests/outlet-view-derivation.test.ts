import { describe, expect, it } from 'vitest';
import { deriveOutletView } from '@/features/outlets/services/outletService';
import { upsertById, removeById } from '@/shared/utils/listState';
import type { Outlet } from '@/features/outlets/types';

const outlet = (overrides: Partial<Outlet> = {}): Outlet => ({
  id: 'o1', outletCode: 1, name: 'Main Street', contactPerson: 'Alex',
  contactEmail: 'alex@example.com', phone: '+919876543210', address: '1 Main St', status: 'Active',
  ...overrides,
});

describe('deriveOutletView', () => {
  it('honors the active status filter after a mutation deactivates a row', () => {
    const all = [outlet({ id: 'o1', status: 'Active' }), outlet({ id: 'o2', status: 'Active' })];
    const afterDeactivation = upsertById(all, outlet({ id: all[0].id, status: 'Inactive' }));

    const filtered = deriveOutletView(afterDeactivation, { status: 'Active', page: 1, pageSize: 10 });
    expect(filtered.outlets.map((o) => o.id)).toEqual(['o2']);
    expect(filtered.total).toBe(1);

    const unfiltered = deriveOutletView(afterDeactivation, { status: 'All', page: 1, pageSize: 10 });
    expect(unfiltered.activeCount).toBe(1);
    expect(unfiltered.inactiveCount).toBe(1);
  });

  it('honors the active search filter after a mutation renames a row out of the match', () => {
    const all = [outlet({ id: 'o1', name: 'Downtown Branch' }), outlet({ id: 'o2', name: 'Uptown Branch' })];
    const renamed = upsertById(all, { ...all[0], name: 'Riverside Branch' });

    const view = deriveOutletView(renamed, { search: 'downtown', page: 1, pageSize: 10 });
    expect(view.outlets).toHaveLength(0);
    expect(view.total).toBe(0);
  });

  it('keeps pagination correct: a new record appended by create lands on the right page', () => {
    const all = Array.from({ length: 10 }, (_, i) => outlet({ id: `o${i}`, outletCode: i }));
    const withNew = upsertById(all, outlet({ id: 'o10', outletCode: 10, name: 'Newest' }));

    const page1 = deriveOutletView(withNew, { page: 1, pageSize: 10 });
    const page2 = deriveOutletView(withNew, { page: 2, pageSize: 10 });
    expect(page1.outlets).toHaveLength(10);
    expect(page2.outlets.map((o) => o.id)).toEqual(['o10']);
    expect(page2.total).toBe(11);
    expect(page2.totalPages).toBe(2);
  });

  it('recomputes totals/counts after a removal (hard delete domains)', () => {
    const all = [outlet({ id: 'o1', status: 'Active' }), outlet({ id: 'o2', status: 'Inactive' })];
    const afterDelete = removeById(all, 'o2');
    const view = deriveOutletView(afterDelete, { page: 1, pageSize: 10 });
    expect(view.total).toBe(1);
    expect(view.inactiveCount).toBe(0);
  });

  it('does not blindly append: an upsert to an existing id replaces it in place rather than duplicating', () => {
    const all = [outlet({ id: 'o1', name: 'Original' })];
    const updated = upsertById(all, outlet({ id: 'o1', name: 'Updated' }));
    const view = deriveOutletView(updated, { page: 1, pageSize: 10 });
    expect(view.outlets).toHaveLength(1);
    expect(view.outlets[0].name).toBe('Updated');
  });
});
