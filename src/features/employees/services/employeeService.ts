import {
  Employee,
  EmployeeActivity,
  EmployeeQuery,
  EmployeeQueryResult,
  CreateEmployeeInput,
  UpdateEmployeeInput,
  EmployeeStatus,
  LoginAccessStatus,
} from '../types';
import { getCurrentUserAuthorization, listTenantEmployees } from '@omniretail/sql-connect';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';
import { httpsCallable } from 'firebase/functions';
import { assertCallableEntity } from '@/shared/utils/callableResponse';
import { formatEmployeeCode } from '../utils/formatEmployeeCode';

export interface IEmployeeService {
  getAllEmployees(): Promise<Employee[]>;
  getEmployees(query: EmployeeQuery): Promise<EmployeeQueryResult>;
  getEmployee(id: string): Promise<Employee | null>;
  createEmployee(input: CreateEmployeeInput): Promise<Employee>;
  updateEmployee(id: string, input: UpdateEmployeeInput): Promise<Employee>;
  changeEmployeeStatus(id: string, status: EmployeeStatus): Promise<Employee>;
  changeLoginAccess(id: string, access: LoginAccessStatus): Promise<Employee>;
  deleteEmployee(id: string): Promise<void>;
  getDepartments(): Promise<string[]>;
  getDesignations(): Promise<string[]>;
}

type TenantEmployeeRow = Awaited<ReturnType<typeof listTenantEmployees>>['data']['employees'][number];

interface EmployeeMutationResponse {
  id: string;
  employeeCode: number;
  fullName: string;
  email: string | null;
  phone: string;
  designation: string;
  department: string | null;
  dateOfBirth: string | null;
  dateOfJoining: string;
  address: string | null;
  notes: string | null;
  assignmentScope: string;
  employmentStatus: string;
  loginAccess: string;
  createdAt: string;
  updatedAt: string;
  user: { id: string; username: string; email: string; employeeMemberships?: { role: { code: string } }[]; employeeTrustedMemberships?: { role: { code: string } }[] } | null;
  employeeOutlets_on_employee: { outlet: { id: string; outletCode: number; name: string } }[];
}

const EMPLOYEE_MUTATION_RESPONSE_KEYS: (keyof EmployeeMutationResponse)[] = [
  'id', 'employeeCode', 'fullName', 'phone', 'designation', 'dateOfJoining',
  'assignmentScope', 'employmentStatus', 'loginAccess', 'createdAt', 'updatedAt',
  'employeeOutlets_on_employee',
];

/**
 * Pure filter/sort/paginate derivation, shared by the server-fetch path here and
 * by pages that recompute a view locally after a mutation without refetching.
 */
export function deriveEmployeeView(all: Employee[], query: EmployeeQuery): EmployeeQueryResult {
  let rows = all;
  const search = query.search?.trim().toLowerCase() ?? '';
  if (search) rows = rows.filter((row) => `${formatEmployeeCode(row.employeeCode)} ${row.displayName} ${row.email} ${row.phone} ${row.designation}`.toLowerCase().includes(search));
  if (query.status && query.status !== 'All') rows = rows.filter((row) => row.employmentStatus === query.status);
  if (query.scope && query.scope !== 'All') rows = rows.filter((row) => row.assignmentScope === query.scope);
  if (query.loginAccess && query.loginAccess !== 'All') rows = rows.filter((row) => row.loginAccess === query.loginAccess);
  if (query.outlet) rows = rows.filter((row) => row.outletAssignment.includes(query.outlet!));
  if (query.department) rows = rows.filter((row) => row.department === query.department);
  const page = Math.max(1, query.page ?? 1);
  const pageSize = Math.max(1, query.pageSize ?? 10);
  const total = rows.length;
  return {
    employees: rows.slice((page - 1) * pageSize, page * pageSize),
    total,
    activeCount: rows.filter((row) => row.employmentStatus === 'Active').length,
    inactiveCount: rows.filter((row) => row.employmentStatus === 'Inactive').length,
    loginEnabledCount: rows.filter((row) => row.loginAccess === 'Enabled').length,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

class ProductionEmployeeService implements IEmployeeService {
  private async organizationId(): Promise<string> { const result = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect); const membership = result.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE'); if (!membership) throw new Error('No active organization membership.'); return membership.organization.id; }
  private map(row: TenantEmployeeRow | EmployeeMutationResponse): Employee { const names = row.fullName.trim().split(/\s+/); const memberships = row.user && ('employeeTrustedMemberships' in row.user ? row.user.employeeTrustedMemberships : row.user.employeeMemberships); const permissionProfile = memberships?.[0]?.role.code === 'organization.admin' ? 'Admin' : memberships?.[0]?.role.code === 'organization.employee' ? 'User' : undefined; return { id: row.id, employeeCode: row.employeeCode, firstName: names[0] ?? row.fullName, lastName: names.slice(1).join(' '), displayName: row.fullName, designation: row.designation, department: row.department ?? undefined, phone: row.phone, email: row.email ?? row.user?.email ?? '', outletAssignment: row.employeeOutlets_on_employee.map((item) => item.outlet.name), assignmentScope: row.assignmentScope === 'ORGANIZATION' ? 'Entire Organization' : 'Specific Outlets', employmentStatus: row.employmentStatus === 'ACTIVE' ? 'Active' : 'Inactive', loginAccess: row.loginAccess === 'ENABLED' ? 'Enabled' : 'Disabled', username: row.user?.username, permissionProfile, dateOfBirth: row.dateOfBirth ?? undefined, dateOfJoining: row.dateOfJoining, address: row.address ?? undefined, notes: row.notes ?? undefined, createdAt: row.createdAt, updatedAt: row.updatedAt, recentActivity: [] }; }

  /** Full org-scoped, unfiltered/unpaginated set — the authoritative array pages hold in state. */
  public async getAllEmployees(): Promise<Employee[]> { const organizationId = await this.organizationId(); const result = await listTenantEmployees(getFirebaseClientServices().dataConnect, { organizationId }); return result.data.employees.map((row) => this.map(row)); }
  public async getEmployees(query: EmployeeQuery): Promise<EmployeeQueryResult> { return deriveEmployeeView(await this.getAllEmployees(), query); }
  public async getEmployee(id: string): Promise<Employee | null> { const all = await this.getAllEmployees(); return all.find((row) => row.id === id || String(row.employeeCode) === id || formatEmployeeCode(row.employeeCode) === id) ?? null; }
  public async getDepartments(): Promise<string[]> { return Array.from(new Set((await this.getAllEmployees()).map((employee) => employee.department).filter(Boolean))).sort(); }
  public async getDesignations(): Promise<string[]> { return Array.from(new Set((await this.getAllEmployees()).map((employee) => employee.designation).filter(Boolean))).sort(); }

  public async createEmployee(input: CreateEmployeeInput): Promise<Employee> {
    const organizationId = await this.organizationId();
    const fullName = `${input.firstName.trim()} ${input.lastName.trim()}`.trim();
    const payload = {
      organizationId,
      fullName,
      phone: input.phone.trim(),
      designation: input.designation.trim(),
      department: input.department?.trim(),
      dateOfBirth: input.dateOfBirth || null,
      dateOfJoining: input.dateOfJoining || new Date().toISOString().slice(0, 10),
      address: input.address?.trim() || null,
      notes: input.notes?.trim() || null,
      assignmentScope: input.assignmentScope === 'Entire Organization' ? 'ORGANIZATION' : 'OUTLET',
      requestId: globalThis.crypto.randomUUID(),
    };
    const response = input.allowLogin
      ? await httpsCallable(getFirebaseClientServices().functions, 'provisionTenantEmployee')({ ...payload, username: input.username?.trim().toLowerCase() ?? '', permissionProfile: input.permissionProfile ?? 'User', initialPassword: input.initialPassword ?? '' })
      : await httpsCallable(getFirebaseClientServices().functions, 'createTenantEmployeeProfile')(payload);
    const row = assertCallableEntity<EmployeeMutationResponse>(response.data, EMPLOYEE_MUTATION_RESPONSE_KEYS, 'createEmployee');
    return this.map(row);
  }

  public async updateEmployee(id: string, input: UpdateEmployeeInput): Promise<Employee> {
    const organizationId = await this.organizationId();
    const current = await this.getEmployee(id);
    if (!current) throw new Error('Employee not found.');
    const response = await httpsCallable(getFirebaseClientServices().functions, 'updateTenantEmployee')({
      organizationId,
      id,
      fullName: `${input.firstName ?? current.firstName} ${input.lastName ?? current.lastName}`.trim(),
      email: input.email ?? current.email,
      phone: input.phone ?? current.phone,
      designation: input.designation ?? current.designation,
      department: input.department ?? current.department,
      dateOfBirth: input.dateOfBirth ?? current.dateOfBirth ?? null,
      dateOfJoining: input.dateOfJoining ?? current.dateOfJoining,
      address: input.address ?? current.address ?? null,
      notes: input.notes ?? current.notes ?? null,
      assignmentScope: (input.assignmentScope ?? current.assignmentScope) === 'Entire Organization' ? 'ORGANIZATION' : 'OUTLET',
      requestId: globalThis.crypto.randomUUID(),
    });
    const row = assertCallableEntity<EmployeeMutationResponse>(response.data, EMPLOYEE_MUTATION_RESPONSE_KEYS, 'updateEmployee');
    if (typeof input.allowLogin !== 'boolean') return this.map(row);
    const loginResponse = await httpsCallable(getFirebaseClientServices().functions, 'updateTenantEmployeeLogin')({
      organizationId,
      employeeId: id,
      allowLogin: input.allowLogin,
      username: input.username?.trim().toLowerCase() ?? '',
      permissionProfile: input.permissionProfile,
      initialPassword: input.initialPassword ?? '',
      requestId: globalThis.crypto.randomUUID(),
    });
    const loginRow = assertCallableEntity<EmployeeMutationResponse>(loginResponse.data, EMPLOYEE_MUTATION_RESPONSE_KEYS, 'updateEmployeeLogin');
    return this.map(loginRow);
  }

  public async changeEmployeeStatus(id: string, status: EmployeeStatus): Promise<Employee> {
    const organizationId = await this.organizationId();
    const response = await httpsCallable(getFirebaseClientServices().functions, 'changeTenantEmployeeStatus')({
      organizationId,
      id,
      status: status === 'Active' ? 'ACTIVE' : 'INACTIVE',
      requestId: globalThis.crypto.randomUUID(),
    });
    const row = assertCallableEntity<EmployeeMutationResponse>(response.data, EMPLOYEE_MUTATION_RESPONSE_KEYS, 'changeEmployeeStatus');
    return this.map(row);
  }

  public async changeLoginAccess(id: string, access: LoginAccessStatus): Promise<Employee> {
    const organizationId = await this.organizationId();
    const response = await httpsCallable(getFirebaseClientServices().functions, 'changeTenantEmployeeLoginAccess')({
      organizationId,
      id,
      loginAccess: access === 'Enabled' ? 'ENABLED' : 'DISABLED',
      requestId: globalThis.crypto.randomUUID(),
    });
    const row = assertCallableEntity<EmployeeMutationResponse>(response.data, EMPLOYEE_MUTATION_RESPONSE_KEYS, 'changeLoginAccess');
    return this.map(row);
  }

  public async deleteEmployee(id: string): Promise<void> {
    const organizationId = await this.organizationId();
    await httpsCallable(getFirebaseClientServices().functions, 'deleteTenantEmployee')({
      organizationId,
      id,
      requestId: globalThis.crypto.randomUUID(),
    });
  }
}

export const employeeService: IEmployeeService = new ProductionEmployeeService();
