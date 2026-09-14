export type ServicePersonStatus = 'Active' | 'Inactive';

export type ServicePersonScope = 'Entire Organization' | 'Specific Outlet';

export type ServicePersonSpecialization =
  | 'HVAC & Appliance Repair'
  | 'Electronics & POS Hardware'
  | 'Plumbing & Fixtures'
  | 'IT & Network Setup'
  | string;

export interface OpenServiceJob {
  id: string;
  title: string;
  outletName: string;
  assignedTimeAgo: string;
  status: 'In Progress' | 'Pending Parts' | 'Scheduled' | 'Completed';
}

export interface ServicePersonTimelineEvent {
  id: string;
  title: string;
  timestamp: string;
  isPrimary?: boolean;
}

export interface ServicePerson {
  id: string;
  servicePersonCode: number; // e.g. 101 (displayed as SVC-101)
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  phone: string;
  specialization: ServicePersonSpecialization;
  assignmentScope: ServicePersonScope;
  outletId?: string;
  outletName?: string;
  status: ServicePersonStatus;
  avatarUrl?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  yearsOfExperience?: number;
  notes?: string;
  openJobsCount?: number;
  openJobs?: OpenServiceJob[];
  timelineEvents?: ServicePersonTimelineEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface ServicePersonQuery {
  search?: string;
  status?: 'All' | ServicePersonStatus;
  assignmentScope?: 'All' | ServicePersonScope;
  specialization?: string;
  outletName?: string;
  page?: number;
  pageSize?: number;
}

export interface ServicePersonQueryResult {
  servicePersons: ServicePerson[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  activeCount: number;
}

export interface CreateServicePersonInput {
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  specialization?: string;
  assignmentScope: ServicePersonScope;
  outletId?: string;
  outletName?: string;
  status?: ServicePersonStatus;
  address?: string;
  city?: string;
  postalCode?: string;
  yearsOfExperience?: number;
  notes?: string;
}

export interface UpdateServicePersonInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  specialization?: string;
  assignmentScope?: ServicePersonScope;
  outletId?: string;
  outletName?: string;
  status?: ServicePersonStatus;
  address?: string;
  city?: string;
  postalCode?: string;
  yearsOfExperience?: number;
  notes?: string;
}
