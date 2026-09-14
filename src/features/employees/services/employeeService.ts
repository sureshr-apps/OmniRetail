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
  dateOfJoining: string;
  assignmentScope: string;
  employmentStatus: string;
  loginAccess: string;
  createdAt: string;
  updatedAt: string;
  user: { id: string; username: string; email: string } | null;
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
  private map(row: TenantEmployeeRow | EmployeeMutationResponse): Employee { const names = row.fullName.trim().split(/\s+/); return { id: row.id, employeeCode: row.employeeCode, firstName: names[0] ?? row.fullName, lastName: names.slice(1).join(' '), displayName: row.fullName, designation: row.designation, department: row.department ?? undefined, phone: row.phone, email: row.email ?? row.user?.email ?? '', outletAssignment: row.employeeOutlets_on_employee.map((item) => item.outlet.name), assignmentScope: row.assignmentScope === 'ORGANIZATION' ? 'Entire Organization' : 'Specific Outlets', employmentStatus: row.employmentStatus === 'ACTIVE' ? 'Active' : 'Inactive', loginAccess: row.loginAccess === 'ENABLED' ? 'Enabled' : 'Disabled', username: row.user?.username, dateOfJoining: row.dateOfJoining, createdAt: row.createdAt, updatedAt: row.updatedAt, recentActivity: [] }; }

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
      email: input.email.trim().toLowerCase(),
      phone: input.phone.trim(),
      designation: input.designation.trim(),
      department: input.department?.trim(),
      dateOfJoining: input.dateOfJoining || new Date().toISOString().slice(0, 10),
      assignmentScope: input.assignmentScope === 'Entire Organization' ? 'ORGANIZATION' : 'OUTLET',
      requestId: globalThis.crypto.randomUUID(),
    };
    const response = input.allowLogin
      ? await httpsCallable(getFirebaseClientServices().functions, 'provisionTenantEmployee')({ ...payload, username: input.username?.trim().toLowerCase() ?? '' })
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
      dateOfJoining: input.dateOfJoining ?? current.dateOfJoining,
      assignmentScope: (input.assignmentScope ?? current.assignmentScope) === 'Entire Organization' ? 'ORGANIZATION' : 'OUTLET',
      requestId: globalThis.crypto.randomUUID(),
    });
    const row = assertCallableEntity<EmployeeMutationResponse>(response.data, EMPLOYEE_MUTATION_RESPONSE_KEYS, 'updateEmployee');
    return this.map(row);
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
}

export const employeeService: IEmployeeService = new ProductionEmployeeService();
