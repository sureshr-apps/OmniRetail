export type EmployeeStatus = 'Active' | 'Inactive';
export type LoginAccessStatus = 'Enabled' | 'Disabled';
export type AssignmentScope = 'Specific Outlets' | 'Entire Organization';

export type Designation =
  | 'Store Manager'
  | 'Assistant Manager'
  | 'Senior Cashier'
  | 'Cashier'
  | 'Sales Associate'
  | 'Inventory Specialist'
  | 'Visual Merchandiser'
  | 'Inventory Auditor'
  | 'Regional Operations Lead';

export type Department =
  | 'Retail Operations & Sales'
  | 'Cash & Billing'
  | 'Warehouse & Logistics'
  | 'Visual Merchandising'
  | 'Store Management'
  | 'Inventory & Audit';

export interface EmployeeActivity {
  id: string;
  title: string;
  timestamp: string;
  description: string;
  icon?: string;
  iconColor?: string;
}

export interface Employee {
  id: string;
  employeeCode: number;
  firstName: string;
  lastName: string;
  displayName: string;
  designation: Designation | string;
  department?: Department | string;
  phone: string;
  email: string;
  outletAssignment: string[]; // List of outlet names or IDs
  assignmentScope: AssignmentScope;
  employmentStatus: EmployeeStatus;
  loginAccess: LoginAccessStatus;
  avatarUrl?: string;
  gender?: string;
  dateOfBirth?: string;
  dateOfJoining?: string;
  address?: string;
  notes?: string;
  username?: string;
  permissionProfile?: string;
  terminalPinConfigured?: boolean;
  lastActiveSession?: string;
  createdAt: string;
  updatedAt: string;
  recentActivity?: EmployeeActivity[];
}

export interface EmployeeQuery {
  search?: string;
  status?: 'All' | EmployeeStatus;
  scope?: 'All' | AssignmentScope;
  loginAccess?: 'All' | LoginAccessStatus;
  outlet?: string;
  department?: string;
  page?: number;
  pageSize?: number;
}

export interface EmployeeQueryResult {
  employees: Employee[];
  total: number;
  activeCount: number;
  inactiveCount: number;
  loginEnabledCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CreateEmployeeInput {
  firstName: string;
  lastName: string;
  designation: string;
  department?: string;
  phone: string;
  gender?: string;
  dateOfBirth?: string;
  dateOfJoining?: string;
  address?: string;
  notes?: string;
  assignmentScope: AssignmentScope;
  outletAssignment: string[];
  allowLogin: boolean;
  username?: string;
  permissionProfile?: string;
  initialPassword?: string;
}

export interface UpdateEmployeeInput {
  firstName?: string;
  lastName?: string;
  designation?: string;
  department?: string;
  phone?: string;
  email?: string;
  gender?: string;
  dateOfBirth?: string;
  dateOfJoining?: string;
  address?: string;
  notes?: string;
  assignmentScope?: AssignmentScope;
  outletAssignment?: string[];
  username?: string;
  permissionProfile?: string;
}
