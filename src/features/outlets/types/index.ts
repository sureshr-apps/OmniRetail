export type OutletStatus = 'Active' | 'Inactive';

export interface OutletActivity {
  id: string;
  title: string;
  timestamp: string;
  description: string;
}

export interface Outlet {
  id: string;
  outletCode: number;
  name: string;
  contactPerson: string;
  contactEmail: string;
  phone: string;
  address: string;
  status: OutletStatus;
  recentActivity?: OutletActivity[];
}

export interface OutletQuery {
  search?: string;
  status?: 'All' | OutletStatus;
  page?: number;
  pageSize?: number;
}

export interface CreateOutletInput {
  name: string;
  contactPerson: string;
  contactEmail?: string;
  phone: string;
  address: string;
}

export interface UpdateOutletInput {
  name?: string;
  contactPerson?: string;
  contactEmail?: string;
  phone?: string;
  address?: string;
}

export interface OutletQueryResult {
  outlets: Outlet[];
  total: number;
  activeCount: number;
  inactiveCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
