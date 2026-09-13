import {
  Customer,
  CreateCustomerInput,
  UpdateCustomerInput,
  CustomerQuery,
  CustomerQueryResult,
  CustomerStatus,
} from '../types';
import { INITIAL_CUSTOMERS } from './mockCustomers';
import { getCurrentUserAuthorization, listTenantCustomers } from '@omniretail/sql-connect';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';
import { httpsCallable } from 'firebase/functions';

const STORAGE_KEY = 'omni_customers_master_v1';

function getStoredCustomers(): Customer[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to read customers from localStorage', e);
  }
  return [...INITIAL_CUSTOMERS];
}

function persistCustomers(customers: Customer[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
  } catch (e) {
    console.error('Failed to save customers to localStorage', e);
  }
}

export interface ICustomerService {
  getCustomers(query: CustomerQuery): Promise<CustomerQueryResult>;
  getCustomer(id: string): Promise<Customer | null>;
  createCustomer(input: CreateCustomerInput): Promise<Customer>;
  updateCustomer(id: string, input: UpdateCustomerInput): Promise<Customer>;
  changeCustomerStatus(id: string, status: CustomerStatus): Promise<Customer>;
  getCities(): Promise<string[]>;
  getAllCustomers(): Promise<Customer[]>;
  getNextCustomerCode(): Promise<string>;
}

class MockCustomerServiceImpl implements ICustomerService {
  private customers: Customer[];

  constructor() {
    this.customers = getStoredCustomers();
  }

  private delay<T>(value: T, ms = 180): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(value), ms));
  }

  async getAllCustomers(): Promise<Customer[]> {
    return this.delay([...this.customers]);
  }

  async getCities(): Promise<string[]> {
    const cities = new Set<string>();
    this.customers.forEach((c) => {
      if (c.city && c.state) {
        cities.add(`${c.city}, ${c.state}`);
      } else if (c.city) {
        cities.add(c.city);
      }
    });
    return this.delay(Array.from(cities).sort());
  }

  async getNextCustomerCode(): Promise<string> {
    const existingCodes = this.customers
      .map((c) => {
        const match = c.customerCode.match(/CUST-(\d+)/i);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter((n) => !isNaN(n));
    const maxNum = existingCodes.length > 0 ? Math.max(...existingCodes) : 105;
    return this.delay(`CUST-${maxNum + 1}`);
  }

  async getCustomers(query: CustomerQuery): Promise<CustomerQueryResult> {
    let result = [...this.customers];

    // 1. Search filter: Customer name, customer code, phone, email, taxId
    if (query.search && query.search.trim()) {
      const q = query.search.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.customerCode.toLowerCase().includes(q) ||
          c.phone.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          (c.taxId && c.taxId.toLowerCase().includes(q))
      );
    }

    // 2. Status filter
    if (query.status && query.status !== 'ALL') {
      result = result.filter((c) => c.status === query.status);
    }

    // 3. Type filter
    if (query.type && query.type !== 'ALL') {
      result = result.filter((c) => c.type === query.type);
    }

    // 4. City filter
    if (query.city && query.city !== 'ALL') {
      const targetCity = query.city.toLowerCase();
      result = result.filter((c) => {
        const fullCity = `${c.city}, ${c.state}`.toLowerCase();
        return fullCity === targetCity || c.city.toLowerCase() === targetCity;
      });
    }

    const filteredCount = result.length;
    const totalPages = Math.ceil(filteredCount / query.pageSize) || 1;
    const validPage = Math.min(Math.max(1, query.page), totalPages);

    const startIndex = (validPage - 1) * query.pageSize;
    const paginatedItems = result.slice(startIndex, startIndex + query.pageSize);

    return this.delay({
      items: paginatedItems,
      totalCount: this.customers.length,
      filteredCount,
      page: validPage,
      pageSize: query.pageSize,
      totalPages,
    });
  }

  async getCustomer(id: string): Promise<Customer | null> {
    const found = this.customers.find((c) => c.id === id);
    return this.delay(found ? { ...found } : null);
  }

  async createCustomer(input: CreateCustomerInput): Promise<Customer> {
    const code = await this.getNextCustomerCode();
    const id = `cust-${Date.now()}`;
    const now = new Date().toISOString();

    const newCustomer: Customer = {
      id,
      customerCode: code,
      type: input.type,
      name: input.name.trim(),
      phone: input.phone.trim(),
      email: input.email.trim(),
      taxId: input.taxId ? input.taxId.trim() : undefined,
      address: input.address ? input.address.trim() : undefined,
      city: input.city.trim(),
      state: input.state.trim().toUpperCase(),
      postalCode: input.postalCode ? input.postalCode.trim() : undefined,
      country: input.country || 'United States',
      creditLimit: input.creditLimit || (input.type === 'Business' ? 5000 : 1500),
      preferredContact: input.preferredContact || 'Email & SMS',
      dateOfBirth: input.dateOfBirth,
      gender: input.gender,
      status: input.status || 'Active',
      notes: input.notes,
      totalPurchases: 0,
      completedOrdersCount: 0,
      balance: 0,
      createdAt: now,
      updatedAt: now,
      tier: input.type === 'Business' ? 'General Wholesale' : 'Bronze Member',
      points: 0,
      memberDiscount: 0,
      recentOrders: [],
      serviceHistory: [],
    };

    // Prepend new customer
    this.customers = [newCustomer, ...this.customers];
    persistCustomers(this.customers);
    return this.delay(newCustomer);
  }

  async updateCustomer(id: string, input: UpdateCustomerInput): Promise<Customer> {
    const index = this.customers.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error(`Customer with ID ${id} not found`);
    }

    const current = this.customers[index];
    const updated: Customer = {
      ...current,
      name: input.name !== undefined ? input.name.trim() : current.name,
      type: input.type !== undefined ? input.type : current.type,
      phone: input.phone !== undefined ? input.phone.trim() : current.phone,
      email: input.email !== undefined ? input.email.trim() : current.email,
      taxId: input.taxId !== undefined ? input.taxId.trim() : current.taxId,
      address: input.address !== undefined ? input.address.trim() : current.address,
      city: input.city !== undefined ? input.city.trim() : current.city,
      state: input.state !== undefined ? input.state.trim().toUpperCase() : current.state,
      postalCode: input.postalCode !== undefined ? input.postalCode.trim() : current.postalCode,
      country: input.country !== undefined ? input.country : current.country,
      creditLimit: input.creditLimit !== undefined ? input.creditLimit : current.creditLimit,
      preferredContact: input.preferredContact !== undefined ? input.preferredContact : current.preferredContact,
      dateOfBirth: input.dateOfBirth !== undefined ? input.dateOfBirth : current.dateOfBirth,
      gender: input.gender !== undefined ? input.gender : current.gender,
      status: input.status !== undefined ? input.status : current.status,
      notes: input.notes !== undefined ? input.notes : current.notes,
      updatedAt: new Date().toISOString(),
      // Keep immutable fields untouched: id, customerCode, createdAt, totalPurchases, balance
    };

    this.customers[index] = updated;
    persistCustomers(this.customers);
    return this.delay(updated);
  }

  async changeCustomerStatus(id: string, status: CustomerStatus): Promise<Customer> {
    const index = this.customers.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error(`Customer with ID ${id} not found`);
    }

    const updated: Customer = {
      ...this.customers[index],
      status,
      updatedAt: new Date().toISOString(),
    };

    this.customers[index] = updated;
    persistCustomers(this.customers);
    return this.delay(updated);
  }
}

type TenantCustomerRow = Awaited<ReturnType<typeof listTenantCustomers>>['data']['customers'][number];

function mapTenantCustomer(row: TenantCustomerRow): Customer {
  return { id: row.id, customerCode: row.customerCode, type: row.type === 'BUSINESS' ? 'Business' : 'Individual', name: row.name, phone: row.phone, email: row.email, taxId: row.taxId ?? undefined, address: row.address ?? undefined, city: row.city, state: row.state, postalCode: row.postalCode ?? undefined, country: row.country ?? undefined, creditLimit: row.creditLimit ?? undefined, preferredContact: row.preferredContact as Customer['preferredContact'], dateOfBirth: row.dateOfBirth ?? undefined, gender: row.gender ?? undefined, status: row.status === 'ACTIVE' ? 'Active' : 'Inactive', notes: row.notes ?? undefined, totalPurchases: 0, completedOrdersCount: 0, balance: 0, createdAt: row.createdAt, updatedAt: row.updatedAt };
}

class ProductionCustomerService extends MockCustomerServiceImpl {
  private async all(): Promise<Customer[]> {
    const auth = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect);
    const membership = auth.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE');
    if (!membership) throw new Error('No active organization membership.');
    const result = await listTenantCustomers(getFirebaseClientServices().dataConnect, { organizationId: membership.organization.id });
    return result.data.customers.map(mapTenantCustomer);
  }

  override async getAllCustomers(): Promise<Customer[]> { return this.all(); }
  override async getCustomers(query: CustomerQuery): Promise<CustomerQueryResult> {
    let customers = await this.all(); const search = query.search?.trim().toLowerCase() ?? '';
    customers = customers.filter((customer) => (!search || `${customer.customerCode} ${customer.name} ${customer.phone} ${customer.email}`.toLowerCase().includes(search)) && (!query.status || query.status === 'ALL' || customer.status === query.status) && (!query.type || query.type === 'ALL' || customer.type === query.type) && (!query.city || customer.city === query.city));
    const page = Math.max(1, query.page); const pageSize = Math.max(1, query.pageSize); const totalPages = Math.max(1, Math.ceil(customers.length / pageSize)); const validPage = Math.min(page, totalPages);
    return { items: customers.slice((validPage - 1) * pageSize, validPage * pageSize), totalCount: customers.length, filteredCount: customers.length, page: validPage, pageSize, totalPages };
  }
  override async getCustomer(id: string): Promise<Customer | null> { return (await this.all()).find((customer) => customer.id === id || customer.customerCode === id) ?? null; }
  private async organizationId(): Promise<string> { const auth = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect); const membership = auth.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE'); if (!membership) throw new Error('No active organization membership.'); return membership.organization.id; }
  override async createCustomer(input: CreateCustomerInput): Promise<Customer> { const organizationId = await this.organizationId(); const customerCode = `CUST-${Date.now().toString().slice(-6)}`; await httpsCallable(getFirebaseClientServices().functions, 'createTenantCustomerRecord')({ organizationId, customerCode, ...input, type: input.type === 'Business' ? 'BUSINESS' : 'INDIVIDUAL', requestId: globalThis.crypto.randomUUID() }); const created = (await this.all()).find((customer) => customer.customerCode === customerCode); if (!created) throw new Error('Customer was created but could not be loaded.'); return created; }
  override async updateCustomer(id: string, input: UpdateCustomerInput): Promise<Customer> { const current = await this.getCustomer(id); if (!current) throw new Error('Customer not found.'); const organizationId = await this.organizationId(); await httpsCallable(getFirebaseClientServices().functions, 'updateTenantCustomerRecord')({ organizationId, id, ...current, ...input, type: (input.type ?? current.type) === 'Business' ? 'BUSINESS' : 'INDIVIDUAL', requestId: globalThis.crypto.randomUUID() }); const updated = await this.getCustomer(id); if (!updated) throw new Error('Customer was updated but could not be loaded.'); return updated; }
  override async changeCustomerStatus(id: string, status: CustomerStatus): Promise<Customer> { const organizationId = await this.organizationId(); await httpsCallable(getFirebaseClientServices().functions, 'changeTenantCustomerStatus')({ organizationId, id, status: status === 'Active' ? 'ACTIVE' : 'INACTIVE', requestId: globalThis.crypto.randomUUID() }); const updated = await this.getCustomer(id); if (!updated) throw new Error('Customer status was changed but could not be loaded.'); return updated; }
}

export const customerService: ICustomerService = new ProductionCustomerService();
