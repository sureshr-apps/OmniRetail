import { describe, expect, it } from 'vitest';
import { deriveEmployeeView } from '@/features/employees/services/employeeService';
import { upsertById, removeById } from '@/shared/utils/listState';
import type { Employee } from '@/features/employees/types';

const employee = (overrides: Partial<Employee> = {}): Employee => ({
  id: 'e1',
  employeeCode: 1001,
  firstName: 'Alex',
  lastName: 'Doe',
  displayName: 'Alex Doe',
  designation: 'Cashier',
  department: 'Cash & Billing',
  phone: '+919876543210',
  email: 'alex@example.com',
  outletAssignment: ['Main Street'],
  assignmentScope: 'Specific Outlets',
  employmentStatus: 'Active',
  loginAccess: 'Enabled',
  createdAt: '2023-01-15T08:00:00Z',
  updatedAt: '2023-01-15T08:00:00Z',
  ...overrides,
});

describe('deriveEmployeeView', () => {
  it('honors the active status filter after a mutation deactivates a row', () => {
    const all = [employee({ id: 'e1', employmentStatus: 'Active' }), employee({ id: 'e2', employmentStatus: 'Active' })];
    const afterDeactivation = upsertById(all, employee({ id: all[0].id, employmentStatus: 'Inactive' }));

    const filtered = deriveEmployeeView(afterDeactivation, { status: 'Active', page: 1, pageSize: 10 });
    expect(filtered.employees.map((e) => e.id)).toEqual(['e2']);
    expect(filtered.total).toBe(1);

    const unfiltered = deriveEmployeeView(afterDeactivation, { status: 'All', page: 1, pageSize: 10 });
    expect(unfiltered.activeCount).toBe(1);
    expect(unfiltered.inactiveCount).toBe(1);
  });

  it('honors the active search filter after a mutation renames a row out of the match', () => {
    const all = [employee({ id: 'e1', displayName: 'Downtown Manager' }), employee({ id: 'e2', displayName: 'Uptown Manager' })];
    const renamed = upsertById(all, { ...all[0], displayName: 'Riverside Manager' });

    const view = deriveEmployeeView(renamed, { search: 'downtown', page: 1, pageSize: 10 });
    expect(view.employees).toHaveLength(0);
    expect(view.total).toBe(0);
  });

  it('keeps pagination correct: a new record appended by create lands on the right page', () => {
    const all = Array.from({ length: 10 }, (_, i) => employee({ id: `e${i}`, employeeCode: i }));
    const withNew = upsertById(all, employee({ id: 'e10', employeeCode: 10, displayName: 'Newest Hire' }));

    const page1 = deriveEmployeeView(withNew, { page: 1, pageSize: 10 });
    const page2 = deriveEmployeeView(withNew, { page: 2, pageSize: 10 });
    expect(page1.employees).toHaveLength(10);
    expect(page2.employees.map((e) => e.id)).toEqual(['e10']);
    expect(page2.total).toBe(11);
    expect(page2.totalPages).toBe(2);
  });

  it('recomputes totals/counts after a removal (e.g. an offboarded profile)', () => {
    const all = [employee({ id: 'e1', employmentStatus: 'Active' }), employee({ id: 'e2', employmentStatus: 'Inactive' })];
    const afterDelete = removeById(all, 'e2');
    const view = deriveEmployeeView(afterDelete, { page: 1, pageSize: 10 });
    expect(view.total).toBe(1);
    expect(view.inactiveCount).toBe(0);
  });

  it('does not blindly append: an upsert to an existing id replaces it in place rather than duplicating', () => {
    const all = [employee({ id: 'e1', displayName: 'Original Name' })];
    const updated = upsertById(all, employee({ id: 'e1', displayName: 'Updated Name' }));
    const view = deriveEmployeeView(updated, { page: 1, pageSize: 10 });
    expect(view.employees).toHaveLength(1);
    expect(view.employees[0].displayName).toBe('Updated Name');
  });

  it('honors the login access filter after a mutation disables a row', () => {
    const all = [employee({ id: 'e1', loginAccess: 'Enabled' }), employee({ id: 'e2', loginAccess: 'Enabled' })];
    const afterDisable = upsertById(all, employee({ id: all[0].id, loginAccess: 'Disabled' }));

    const filtered = deriveEmployeeView(afterDisable, { loginAccess: 'Disabled', page: 1, pageSize: 10 });
    expect(filtered.employees.map((e) => e.id)).toEqual(['e1']);
    expect(filtered.loginEnabledCount).toBe(0);
  });

  it('honors the assignment scope filter after a mutation reassigns a row', () => {
    const all = [
      employee({ id: 'e1', assignmentScope: 'Specific Outlets' }),
      employee({ id: 'e2', assignmentScope: 'Specific Outlets' }),
    ];
    const reassigned = upsertById(all, employee({ id: all[0].id, assignmentScope: 'Entire Organization' }));

    const view = deriveEmployeeView(reassigned, { scope: 'Entire Organization', page: 1, pageSize: 10 });
    expect(view.employees.map((e) => e.id)).toEqual(['e1']);
    expect(view.total).toBe(1);
  });
});
