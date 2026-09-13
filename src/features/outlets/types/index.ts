export type OutletStatus = 'Active' | 'Inactive';

export type OutletType =
  | 'Flagship'
  | 'Mall Kiosk / Annex'
  | 'High-Street Outlet'
  | 'Regional Flagship'
  | 'Seasonal Pop-up'
  | 'Warehouse Store'
  | 'Standard Retail';

export interface OutletActivity {
  id: string;
  title: string;
  timestamp: string;
  description: string;
}

export interface Outlet {
  id: string;
  outletCode: string;
  name: string;
  description?: string;
  type?: OutletType | string;
  contactPerson: string;
  contactEmail: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode?: string;
  country: string;
  timezone?: string;
  currency?: string;
  registerCount: number;
  employeeCount: number;
  status: OutletStatus;
  createdAt: string;
  updatedAt: string;
  recentActivity?: OutletActivity[];
}

export interface OutletQuery {
  search?: string;
  status?: 'All' | 'Active' | 'Inactive';
  city?: string;
  page?: number;
  pageSize?: number;
}

export interface CreateOutletInput {
  name: string;
  description?: string;
  type?: string;
  contactPerson: string;
  contactEmail?: string;
  phone: string;
  address?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country?: string;
  timezone?: string;
  currency?: string;
  registerCount?: number;
  status?: OutletStatus;
}

export interface UpdateOutletInput {
  name?: string;
  description?: string;
  type?: string;
  contactPerson?: string;
  contactEmail?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  timezone?: string;
  currency?: string;
  registerCount?: number;
  status?: OutletStatus;
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
