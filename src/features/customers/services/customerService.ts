import {
  Customer,
  CreateCustomerInput,
  UpdateCustomerInput,
  CustomerQuery,
  CustomerQueryResult,
  CustomerStatus,
  CustomerRecentOrder,
} from '../types';
import { getCurrentUserAuthorization, listTenantCustomers, listTenantCustomerPurchaseHistory } from '@omniretail/sql-connect';
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
  deleteCustomer(id: string): Promise<void>;
  getAllCustomers(): Promise<Customer[]>;
  getRecentPurchases(customerId: string): Promise<CustomerRecentOrder[]>;
}

type TenantCustomerRow = Awaited<ReturnType<typeof listTenantCustomers>>['data']['customers'][number];

interface CustomerMutationResponse {
  id: string;
  customerCode: number;
  type: string;
  name: string;
  phone: string;
  email: string | null;
  taxId: string | null;
  address: string | null;
  creditLimit: number | null;
  dateOfBirth: string | null;
  gender: string | null;
  status: string;
  notes: string | null;
  documentType: string | null;
  documentValue: string | null;
}

function mapTenantCustomer(row: TenantCustomerRow | CustomerMutationResponse): Customer {
  const sales = 'customerSales' in row ? row.customerSales : [];
  const completedSales = sales.filter((sale) => sale.status === 'COMPLETED');
  return { id: row.id, customerCode: row.customerCode, type: row.type === 'BUSINESS' ? 'Business' : 'Individual', name: row.name, phone: row.phone, email: row.email ?? undefined, taxId: row.taxId ?? undefined, documentType: row.documentType ?? undefined, documentValue: row.documentValue ?? undefined, address: row.address ?? undefined, creditLimit: row.creditLimit ?? undefined, dateOfBirth: row.dateOfBirth ?? undefined, gender: row.gender ?? undefined, status: row.status === 'ACTIVE' ? 'Active' : 'Inactive', notes: row.notes ?? undefined, totalPurchases: completedSales.reduce((sum, sale) => sum + sale.totalNet, 0), completedOrdersCount: completedSales.length, balance: 0 };
}

const CUSTOMER_MUTATION_RESPONSE_KEYS: (keyof CustomerMutationResponse)[] = [
  'id', 'customerCode', 'type', 'name', 'phone', 'status',
];

/**
 * Pure filter/sort/paginate derivation, shared by the server-fetch path here and
 * by pages that recompute a view locally after a mutation without refetching.
 */
export function deriveCustomerView(all: Customer[], query: CustomerQuery): CustomerQueryResult {
  const search = query.search?.trim().toLowerCase() ?? '';
  const customers = all.filter((customer) => (!search || `${formatCustomerCode(customer.customerCode)} ${customer.name} ${customer.phone} ${customer.email ?? ''}`.toLowerCase().includes(search)) && (!query.status || query.status === 'ALL' || customer.status === query.status) && (!query.type || query.type === 'ALL' || customer.type === query.type));
  const page = Math.max(1, query.page);
  const pageSize = Math.max(1, query.pageSize);
  const totalPages = Math.max(1, Math.ceil(customers.length / pageSize));
  const validPage = Math.min(page, totalPages);
  return { items: customers.slice((validPage - 1) * pageSize, validPage * pageSize), totalCount: all.length, filteredCount: customers.length, page: validPage, pageSize, totalPages };
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
  async getRecentPurchases(customerId: string): Promise<CustomerRecentOrder[]> {
    const organizationId = await this.organizationId();
    const result = await listTenantCustomerPurchaseHistory(getFirebaseClientServices().dataConnect, { organizationId, customerId });
    return result.data.sales.map((sale) => ({
      orderId: sale.receiptNumber,
      date: new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeZone: 'Asia/Kolkata' }).format(new Date(sale.saleTimestamp)),
      store: sale.outlet?.name ?? 'Organization-wide',
      amount: sale.totalNet,
    }));
  }
  async getCustomer(id: string): Promise<Customer | null> { return (await this.getAllCustomers()).find((customer) => customer.id === id || String(customer.customerCode) === id || formatCustomerCode(customer.customerCode) === id) ?? null; }
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

  async deleteCustomer(id: string): Promise<void> {
    const organizationId = await this.organizationId();
    await httpsCallable(getFirebaseClientServices().functions, 'deleteTenantCustomer')({
      organizationId,
      id,
      requestId: globalThis.crypto.randomUUID(),
    });
  }
}

export const customerService: ICustomerService = new ProductionCustomerService();
