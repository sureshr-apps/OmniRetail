export type SupplierStatus = 'Active' | 'Inactive';

export type PaymentTerms =
  | 'Net 30 Days'
  | 'Net 15 Days'
  | 'Net 45 Days'
  | 'Net 60 Days'
  | 'Cash on Delivery (COD)'
  | 'Immediate Wire';

export type SupplierCategory =
  | 'Consumer Electronics'
  | 'Apparel & Textiles'
  | 'Beverages & Groceries'
  | 'Tools & Hardware'
  | 'Office Supplies'
  | 'Packaging & Shipping'
  | 'Leather & Accessories'
  | 'Point of Sale & Tech'
  | 'General Merchandise';

export interface SupplierPurchaseOrderSummary {
  id: string;
  purchaseNumber: string;
  poNumber: string;
  date: string;
  outletName: string;
  totalAmount: number;
  outstandingAmount: number;
  paymentStatus: 'PAID' | 'PARTIALLY_PAID' | 'UNPAID';
  receiptStatus: 'PENDING' | 'PARTIALLY_RECEIVED' | 'RECEIVED';
}

export interface Supplier {
  id: string;
  supplierCode: string; // e.g. SUP-101
  name: string; // e.g. Apex Global Electronics
  contactPerson: string; // e.g. Marcus Vance
  phone: string; // e.g. +1 (555) 382-9100
  email: string; // e.g. marcus@apexge.com
  taxId: string; // e.g. US-8829104
  address?: string;
  city: string; // e.g. New York, NY
  state?: string;
  postalCode?: string;
  country?: string;
  category: SupplierCategory;
  paymentTerms: PaymentTerms;
  creditLimit: number;
  status: SupplierStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  // Derived from purchases ledger
  outstandingBalance: number;
  pendingDeliveriesCount: number;
  totalOrdersCount: number;
  recentOrders?: SupplierPurchaseOrderSummary[];
}

export interface SuppliersKpiSummary {
  totalSuppliers: number;
  totalSuppliersChangeText: string;
  activePartnerships: number;
  activePercentageText: string;
  outstandingBalance: number;
  outstandingDueText: string;
  pendingDeliveries: number;
  pendingDeliveriesSubtext: string;
}

export interface SupplierQuery {
  search?: string;
  status?: 'ALL' | 'Active' | 'Inactive';
  city?: string;
  category?: string;
  page?: number;
  pageSize?: number;
}

export interface SupplierQueryResult {
  items: Supplier[];
  totalCount: number;
  filteredCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  kpiSummary: SuppliersKpiSummary;
}

export interface CreateSupplierInput {
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  taxId: string;
  category: SupplierCategory;
  paymentTerms: PaymentTerms;
  creditLimit: number;
  address?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country?: string;
  notes?: string;
}

export interface UpdateSupplierInput {
  name?: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  taxId?: string;
  category?: SupplierCategory;
  paymentTerms?: PaymentTerms;
  creditLimit?: number;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  notes?: string;
  status?: SupplierStatus;
}
