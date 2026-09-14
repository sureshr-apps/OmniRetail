import { beforeEach, describe, expect, it } from 'vitest';
import { vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  dataConnect: {},
  functions: {},
  getCurrentUserAuthorization: vi.fn(),
  listTenantEmployees: vi.fn(),
  httpsCallable: vi.fn(),
}));

vi.mock('@omniretail/sql-connect', () => ({
  getCurrentUserAuthorization: mocks.getCurrentUserAuthorization,
  listTenantEmployees: mocks.listTenantEmployees,
}));
vi.mock('@/infrastructure/firebase/client', () => ({
  getFirebaseClientServices: () => ({ dataConnect: mocks.dataConnect, functions: mocks.functions }),
}));
vi.mock('firebase/functions', () => ({ httpsCallable: mocks.httpsCallable }));

import { employeeService } from '@/features/employees/services/employeeService';
import { MalformedCallableResponseError } from '@/shared/utils/callableResponse';

const employeeRow = (overrides: Record<string, unknown> = {}) => ({
  id: 'employee-1',
  employeeCode: 1001,
  fullName: 'Alex Doe',
  email: 'alex@example.com',
  phone: '+919876543210',
  designation: 'Cashier',
  department: 'Cash & Billing',
  dateOfJoining: '2023-01-15',
  assignmentScope: 'OUTLET',
  employmentStatus: 'ACTIVE',
  loginAccess: 'ENABLED',
  createdAt: '2023-01-15T08:00:00Z',
  updatedAt: '2023-01-15T08:00:00Z',
  user: { id: 'user-1', username: 'alex.doe', email: 'alex@example.com' },
  employeeOutlets_on_employee: [{ outlet: { id: 'outlet-1', outletCode: 1, name: 'Main Street' } }],
  ...overrides,
});

const createInput = {
  firstName: 'Jordan',
  lastName: 'Lee',
  designation: 'Cashier',
  phone: '+919876543210',
  email: 'jordan@example.com',
  assignmentScope: 'Specific Outlets' as const,
  outletAssignment: ['Main Street'],
  allowLogin: false,
};

beforeEach(() => {
  vi.clearAllMocks();
  mocks.getCurrentUserAuthorization.mockResolvedValue({
    data: { appUsers: [{ organizationMemberships_on_user: [{ status: 'ACTIVE', organization: { id: 'org-1' } }] }] },
  });
  mocks.listTenantEmployees.mockResolvedValue({ data: { employees: [employeeRow()] } });
});

describe('employeeService mutations return the canonical entity directly', () => {
  it('createEmployee returns the enriched entity from the callable, with no follow-up list query', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', ...employeeRow({ id: 'employee-2', employeeCode: 1002, fullName: 'Jordan Lee' }) },
    }));
    const created = await employeeService.createEmployee(createInput);
    expect(created).toMatchObject({ id: 'employee-2', employeeCode: 1002, displayName: 'Jordan Lee' });
    expect(mocks.listTenantEmployees).not.toHaveBeenCalled();
  });

  it('updateEmployee returns the enriched entity from the callable, with no follow-up list query after the mutation', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', ...employeeRow({ fullName: 'Renamed Employee' }) },
    }));
    const updated = await employeeService.updateEmployee('employee-1', { firstName: 'Renamed', lastName: 'Employee' });
    expect(updated.displayName).toBe('Renamed Employee');
    // One call to fetch the current record to merge partial input, none afterward.
    expect(mocks.listTenantEmployees).toHaveBeenCalledTimes(1);
  });

  it('changeEmployeeStatus returns the enriched entity from the callable, with no follow-up list query', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', ...employeeRow({ employmentStatus: 'INACTIVE' }) },
    }));
    const updated = await employeeService.changeEmployeeStatus('employee-1', 'Inactive');
    expect(updated.employmentStatus).toBe('Inactive');
    expect(mocks.listTenantEmployees).not.toHaveBeenCalled();
  });

  it('changeLoginAccess returns the enriched entity from the callable, with no follow-up list query', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', ...employeeRow({ loginAccess: 'DISABLED' }) },
    }));
    const updated = await employeeService.changeLoginAccess('employee-1', 'Disabled');
    expect(updated.loginAccess).toBe('Disabled');
    expect(mocks.listTenantEmployees).not.toHaveBeenCalled();
  });

  it('rejects a malformed create response instead of returning a partial entity', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({ data: { success: true, organizationId: 'org-1', id: 'employee-2' } }));
    await expect(employeeService.createEmployee(createInput)).rejects.toBeInstanceOf(MalformedCallableResponseError);
  });

  it('propagates a failed mutation without touching any local/service state', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockRejectedValue(new Error('permission-denied')));
    await expect(employeeService.changeEmployeeStatus('employee-1', 'Inactive')).rejects.toThrow('permission-denied');
    expect(mocks.listTenantEmployees).not.toHaveBeenCalled();
  });

  it('applying the same mutation response twice does not duplicate the employee (idempotent upsert)', async () => {
    mocks.httpsCallable.mockReturnValue(vi.fn().mockResolvedValue({
      data: { success: true, organizationId: 'org-1', ...employeeRow({ fullName: 'Renamed Employee' }) },
    }));
    const first = await employeeService.updateEmployee('employee-1', { firstName: 'Renamed', lastName: 'Employee' });
    const second = await employeeService.updateEmployee('employee-1', { firstName: 'Renamed', lastName: 'Employee' });
    expect(first).toEqual(second);
  });
});

describe('employeeService.getAllEmployees', () => {
  it('fetches the full org-scoped set for pages to hold and derive views from', async () => {
    const employees = await employeeService.getAllEmployees();
    expect(employees).toHaveLength(1);
    expect(employees[0].employeeCode).toBe(1001);
  });
});
