import { describe, expect, it } from 'vitest';
import { deriveServicePersonView } from '@/features/service-persons/services/servicePersonService';
import { upsertById, removeById } from '@/shared/utils/listState';
import type { ServicePerson } from '@/features/service-persons/types';

const servicePerson = (overrides: Partial<ServicePerson> = {}): ServicePerson => ({
  id: 'sp1',
  servicePersonCode: 101,
  firstName: 'Marcus',
  lastName: 'Vance',
  displayName: 'Marcus Vance',
  email: 'm.vance@omnitrade.internal',
  phone: '+919876543210',
  specialization: 'HVAC & Appliance Repair',
  assignmentScope: 'Entire Organization',
  status: 'Active',
  ...overrides,
});

describe('deriveServicePersonView', () => {
  it('honors the active status filter after a mutation deactivates a row', () => {
    const all = [servicePerson({ id: 'sp1', status: 'Active' }), servicePerson({ id: 'sp2', status: 'Active' })];
    const afterDeactivation = upsertById(all, servicePerson({ id: all[0].id, status: 'Inactive' }));

    const filtered = deriveServicePersonView(afterDeactivation, { status: 'Active', page: 1, pageSize: 10 });
    expect(filtered.servicePersons.map((sp) => sp.id)).toEqual(['sp2']);
    expect(filtered.total).toBe(1);

    const unfiltered = deriveServicePersonView(afterDeactivation, { status: 'All', page: 1, pageSize: 10 });
    expect(unfiltered.activeCount).toBe(1);
  });

  it('honors the active search filter after a mutation renames a row out of the match', () => {
    const all = [servicePerson({ id: 'sp1', displayName: 'Marcus Vance' }), servicePerson({ id: 'sp2', displayName: 'Elena Rostova' })];
    const renamed = upsertById(all, { ...all[0], displayName: 'Riverside Person' });

    const view = deriveServicePersonView(renamed, { search: 'marcus', page: 1, pageSize: 10 });
    expect(view.servicePersons).toHaveLength(0);
    expect(view.total).toBe(0);
  });

  it('honors the assignment scope filter', () => {
    const all = [
      servicePerson({ id: 'sp1', assignmentScope: 'Entire Organization' }),
      servicePerson({ id: 'sp2', assignmentScope: 'Specific Outlet' }),
    ];
    const view = deriveServicePersonView(all, { assignmentScope: 'Specific Outlet', page: 1, pageSize: 10 });
    expect(view.servicePersons.map((sp) => sp.id)).toEqual(['sp2']);
    expect(view.total).toBe(1);
  });

  it('honors the specialization filter, and treats "All" as no filter', () => {
    const all = [
      servicePerson({ id: 'sp1', specialization: 'HVAC & Appliance Repair' }),
      servicePerson({ id: 'sp2', specialization: 'Plumbing & Fixtures' }),
    ];
    const filtered = deriveServicePersonView(all, { specialization: 'Plumbing & Fixtures', page: 1, pageSize: 10 });
    expect(filtered.servicePersons.map((sp) => sp.id)).toEqual(['sp2']);

    const unfiltered = deriveServicePersonView(all, { specialization: 'All', page: 1, pageSize: 10 });
    expect(unfiltered.total).toBe(2);
  });

  it('keeps pagination correct: a new record appended by create lands on the right page', () => {
    const all = Array.from({ length: 10 }, (_, i) => servicePerson({ id: `sp${i}`, servicePersonCode: i }));
    const withNew = upsertById(all, servicePerson({ id: 'sp10', servicePersonCode: 10, displayName: 'Newest Person' }));

    const page1 = deriveServicePersonView(withNew, { page: 1, pageSize: 10 });
    const page2 = deriveServicePersonView(withNew, { page: 2, pageSize: 10 });
    expect(page1.servicePersons).toHaveLength(10);
    expect(page2.servicePersons.map((sp) => sp.id)).toEqual(['sp10']);
    expect(page2.total).toBe(11);
    expect(page2.totalPages).toBe(2);
  });

  it('recomputes totals/counts after a removal', () => {
    const all = [servicePerson({ id: 'sp1', status: 'Active' }), servicePerson({ id: 'sp2', status: 'Inactive' })];
    const afterDelete = removeById(all, 'sp2');
    const view = deriveServicePersonView(afterDelete, { page: 1, pageSize: 10 });
    expect(view.total).toBe(1);
    expect(view.activeCount).toBe(1);
  });

  it('does not blindly append: an upsert to an existing id replaces it in place rather than duplicating', () => {
    const all = [servicePerson({ id: 'sp1', displayName: 'Original Name' })];
    const updated = upsertById(all, servicePerson({ id: 'sp1', displayName: 'Updated Name' }));
    const view = deriveServicePersonView(updated, { page: 1, pageSize: 10 });
    expect(view.servicePersons).toHaveLength(1);
    expect(view.servicePersons[0].displayName).toBe('Updated Name');
  });
});
