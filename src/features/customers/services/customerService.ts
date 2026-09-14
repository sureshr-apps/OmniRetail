import {
  Customer,
  CreateCustomerInput,
  UpdateCustomerInput,
  CustomerQuery,
  CustomerQueryResult,
  CustomerStatus,
} from '../types';
import { getCurrentUserAuthorization, listTenantCustomers } from '@omniretail/sql-connect';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';
import { httpsCallable } from 'firebase/functions';
import { assertCallableEntity } from '@/shared/utils/callableResponse';
import { formatCustomerCode } from '../utils/formatCustomerCode';

export interface ICustomerService {
  getCustomers(query: CustomerQuery): Promise<CustomerQueryResult>;
  getCustomer(id: string): Promise<Customer | null>;
  createCustomer(input: CreateCustomerInput): Promise<Customer>;
  updateCustomer(id: string, input: UpdateCustomerInput): Promise<Customer>;
  changeCustomerStatus(id: string, status: CustomerStatus): Promise<Customer>;
  getCities(): Promise<string[]>;
  getAllCustomers(): Promise<Customer[]>;
}

type TenantCustomerRow = Awaited<ReturnType<typeof listTenantCustomers>>['data']['customers'][number];

interface CustomerMutationResponse {
  id: string;
  customerCode: number;
  type: string;
  name: string;
  phone: string;
  email: string;
  taxId: string | null;
  address: string | null;
  city: string;
  state: string;
  postalCode: string | null;
  country: string | null;
  creditLimit: number | null;
  preferredContact: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

function mapTenantCustomer(row: TenantCustomerRow | CustomerMutationResponse): Customer {
  return { id: row.id, customerCode: row.customerCode, type: row.type === 'BUSINESS' ? 'Business' : 'Individual', name: row.name, phone: row.phone, email: row.email, taxId: row.taxId ?? undefined, address: row.address ?? undefined, city: row.city, state: row.state, postalCode: row.postalCode ?? undefined, country: row.country ?? undefined, creditLimit: row.creditLimit ?? undefined, preferredContact: row.preferredContact as Customer['preferredContact'], dateOfBirth: row.dateOfBirth ?? undefined, gender: row.gender ?? undefined, status: row.status === 'ACTIVE' ? 'Active' : 'Inactive', notes: row.notes ?? undefined, totalPurchases: 0, completedOrdersCount: 0, balance: 0, createdAt: row.createdAt, updatedAt: row.updatedAt };
}

const CUSTOMER_MUTATION_RESPONSE_KEYS: (keyof CustomerMutationResponse)[] = [
  'id', 'customerCode', 'type', 'name', 'phone', 'email', 'city', 'state', 'status', 'createdAt', 'updatedAt',
];

/**
 * Pure filter/sort/paginate derivation, shared by the server-fetch path here and
 * by pages that recompute a view locally after a mutation without refetching.
 */
export function deriveCustomerView(all: Customer[], query: CustomerQuery): CustomerQueryResult {
  const search = query.search?.trim().toLowerCase() ?? '';
  const customers = all.filter((customer) => (!search || `${formatCustomerCode(customer.customerCode)} ${customer.name} ${customer.phone} ${customer.email}`.toLowerCase().includes(search)) && (!query.status || query.status === 'ALL' || customer.status === query.status) && (!query.type || query.type === 'ALL' || customer.type === query.type) && (!query.city || customer.city === query.city));
  const page = Math.max(1, query.page);
  const pageSize = Math.max(1, query.pageSize);
  const totalPages = Math.max(1, Math.ceil(customers.length / pageSize));
  const validPage = Math.min(page, totalPages);
  return { items: customers.slice((validPage - 1) * pageSize, validPage * pageSize), totalCount: customers.length, filteredCount: customers.length, page: validPage, pageSize, totalPages };
}

class ProductionCustomerService implements ICustomerService {
  private async organizationId(): Promise<string> { const auth = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect); const membership = auth.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE'); if (!membership) throw new Error('No active organization membership.'); return membership.organization.id; }

  /** Full org-scoped, unfiltered/unpaginated set — the authoritative array pages hold in state. */
  async getAllCustomers(): Promise<Customer[]> {
    const organizationId = await this.organizationId();
    const result = await listTenantCustomers(getFirebaseClientServices().dataConnect, { organizationId });
    return result.data.customers.map(mapTenantCustomer);
  }

  async getCustomers(query: CustomerQuery): Promise<CustomerQueryResult> {
    return deriveCustomerView(await this.getAllCustomers(), query);
  }
  async getCustomer(id: string): Promise<Customer | null> { return (await this.getAllCustomers()).find((customer) => customer.id === id || String(customer.customerCode) === id || formatCustomerCode(customer.customerCode) === id) ?? null; }
  async getCities(): Promise<string[]> { return Array.from(new Set((await this.getAllCustomers()).map((customer) => customer.state ? `${customer.city}, ${customer.state}` : customer.city))).sort(); }
  async createCustomer(input: CreateCustomerInput): Promise<Customer> {
    const organizationId = await this.organizationId();
    const response = await httpsCallable(getFirebaseClientServices().functions, 'createTenantCustomerRecord')({
      organizationId,
      ...input,
      type: input.type === 'Business' ? 'BUSINESS' : 'INDIVIDUAL',
      requestId: globalThis.crypto.randomUUID(),
    });
    const row = assertCallableEntity<CustomerMutationResponse>(response.data, CUSTOMER_MUTATION_RESPONSE_KEYS, 'createCustomer');
    return mapTenantCustomer(row);
  }
  async updateCustomer(id: string, input: UpdateCustomerInput): Promise<Customer> {
    const current = await this.getCustomer(id);
    if (!current) throw new Error('Customer not found.');
    const organizationId = await this.organizationId();
    const response = await httpsCallable(getFirebaseClientServices().functions, 'updateTenantCustomerRecord')({
      organizationId,
      id,
      ...current,
      ...input,
      type: (input.type ?? current.type) === 'Business' ? 'BUSINESS' : 'INDIVIDUAL',
      requestId: globalThis.crypto.randomUUID(),
    });
    const row = assertCallableEntity<CustomerMutationResponse>(response.data, CUSTOMER_MUTATION_RESPONSE_KEYS, 'updateCustomer');
    return mapTenantCustomer(row);
  }
  async changeCustomerStatus(id: string, status: CustomerStatus): Promise<Customer> {
    const organizationId = await this.organizationId();
    const response = await httpsCallable(getFirebaseClientServices().functions, 'changeTenantCustomerStatus')({
      organizationId,
      id,
      status: status === 'Active' ? 'ACTIVE' : 'INACTIVE',
      requestId: globalThis.crypto.randomUUID(),
    });
    const row = assertCallableEntity<CustomerMutationResponse>(response.data, CUSTOMER_MUTATION_RESPONSE_KEYS, 'changeCustomerStatus');
    return mapTenantCustomer(row);
  }
}

export const customerService: ICustomerService = new ProductionCustomerService();
