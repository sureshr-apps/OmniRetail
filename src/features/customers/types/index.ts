export type CustomerType = 'Individual' | 'Business';
export type CustomerStatus = 'Active' | 'Inactive';

export interface CustomerRecentOrder {
  orderId: string;
  date: string;
  store: string;
  amount: number;
}

export interface CustomerServiceTicket {
  ticketId: string;
  serviceType: string;
  status: 'Completed' | 'In Progress' | 'Pending';
}

export interface Customer {
  id: string;
  customerCode: number;
  type: CustomerType;
  name: string;
  phone: string;
  email: string;
  taxId?: string;
  address?: string;
  city: string;
  state: string;
  postalCode?: string;
  country?: string;
  creditLimit?: number;
  preferredContact?: 'Email & SMS' | 'Email Only' | 'SMS Text Only' | 'Phone Call';
  dateOfBirth?: string;
  gender?: string;
  status: CustomerStatus;
  notes?: string;
  totalPurchases: number;
  completedOrdersCount: number;
  balance: number;
  createdAt: string;
  updatedAt: string;
  recentOrders?: CustomerRecentOrder[];
  serviceHistory?: CustomerServiceTicket[];
  // POS compatibility properties
  tier?: string;
  points?: number;
  memberDiscount?: number;
}

export interface CreateCustomerInput {
  type: CustomerType;
  name: string;
  phone: string;
  email: string;
  taxId?: string;
  address?: string;
  city: string;
  state: string;
  postalCode?: string;
  country?: string;
  creditLimit?: number;
  preferredContact?: 'Email & SMS' | 'Email Only' | 'SMS Text Only' | 'Phone Call';
  dateOfBirth?: string;
  gender?: string;
  status?: CustomerStatus;
  notes?: string;
}

export interface UpdateCustomerInput {
  name?: string;
  type?: CustomerType;
  phone?: string;
  email?: string;
  taxId?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  creditLimit?: number;
  preferredContact?: 'Email & SMS' | 'Email Only' | 'SMS Text Only' | 'Phone Call';
  dateOfBirth?: string;
  gender?: string;
  status?: CustomerStatus;
  notes?: string;
}

export interface CustomerQuery {
  search?: string;
  status?: 'ALL' | CustomerStatus;
  type?: 'ALL' | CustomerType;
  city?: string;
  page: number;
  pageSize: number;
}

export interface CustomerQueryResult {
  items: Customer[];
  totalCount: number;
  filteredCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
