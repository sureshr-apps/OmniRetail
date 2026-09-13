import {
  Supplier,
  SupplierQuery,
  SupplierQueryResult,
  SuppliersKpiSummary,
  CreateSupplierInput,
  UpdateSupplierInput,
  SupplierPurchaseOrderSummary,
} from '../types';
import { INITIAL_SUPPLIERS } from './mockSuppliers';
import { INITIAL_PURCHASES } from '@/features/purchases/services/mockData';
import { getCurrentUserAuthorization, listTenantSuppliers } from '@omniretail/sql-connect';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';
import { httpsCallable } from 'firebase/functions';

export interface ISupplierService {
  getSuppliers(query?: SupplierQuery): Promise<SupplierQueryResult>;
  getSupplierById(id: string): Promise<Supplier | null>;
  createSupplier(input: CreateSupplierInput): Promise<Supplier>;
  updateSupplier(id: string, input: UpdateSupplierInput): Promise<Supplier>;
  toggleSupplierStatus(id: string): Promise<Supplier>;
  getCities(): Promise<string[]>;
  getCategories(): Promise<string[]>;
}

class MockSupplierService implements ISupplierService {
  private suppliers: Supplier[] = [...INITIAL_SUPPLIERS];

  // Helper to retrieve associated purchase orders from purchases ledger
  private getSupplierRecentOrders(supplier: Supplier): SupplierPurchaseOrderSummary[] {
    const matched = INITIAL_PURCHASES.filter(
      (p) =>
        p.supplierId === supplier.id ||
        p.supplierName.toLowerCase() === supplier.name.toLowerCase()
    );

    if (matched.length > 0) {
      return matched.map((p) => ({
        id: p.id,
        purchaseNumber: p.purchaseNumber,
        poNumber: p.purchaseOrderNumber || `PO-${p.purchaseNumber.replace('PUR-', '')}`,
        date: p.date,
        outletName: p.outletName,
        totalAmount: p.totalAmount,
        outstandingAmount: p.outstandingAmount,
        paymentStatus: p.paymentStatus,
        receiptStatus: p.receiptStatus,
      }));
    }

    // Default realistic recent orders for suppliers with pending deliveries
    if (supplier.pendingDeliveriesCount > 0) {
      return [
        {
          id: `po-${supplier.id}-1`,
          purchaseNumber: `PUR-2024-${supplier.supplierCode.replace('SUP-', '')}1`,
          poNumber: `PO-2024-${supplier.supplierCode.replace('SUP-', '')}1`,
          date: 'Oct 24, 2024',
          outletName: 'Downtown Flagship #04',
          totalAmount: supplier.outstandingBalance || 4850.0,
          outstandingAmount: supplier.outstandingBalance || 4850.0,
          paymentStatus: supplier.outstandingBalance > 0 ? 'PARTIALLY_PAID' : 'PAID',
          receiptStatus: 'PENDING',
        },
        {
          id: `po-${supplier.id}-2`,
          purchaseNumber: `PUR-2024-${supplier.supplierCode.replace('SUP-', '')}2`,
          poNumber: `PO-2024-${supplier.supplierCode.replace('SUP-', '')}2`,
          date: 'Oct 15, 2024',
          outletName: 'Uptown Mall #12',
          totalAmount: 3200.0,
          outstandingAmount: 0,
          paymentStatus: 'PAID',
          receiptStatus: 'RECEIVED',
        },
      ];
    }

    return [
      {
        id: `po-${supplier.id}-prev`,
        purchaseNumber: `PUR-2024-${supplier.supplierCode.replace('SUP-', '')}0`,
        poNumber: `PO-2024-${supplier.supplierCode.replace('SUP-', '')}0`,
        date: 'Oct 08, 2024',
        outletName: 'Downtown Flagship #04',
        totalAmount: 2450.0,
        outstandingAmount: 0,
        paymentStatus: 'PAID',
        receiptStatus: 'RECEIVED',
      },
    ];
  }

  private calculateKpis(allSuppliers: Supplier[]): SuppliersKpiSummary {
    const totalSuppliers = allSuppliers.length;
    const activePartnerships = allSuppliers.filter((s) => s.status === 'Active').length;
    const activeRate = totalSuppliers > 0 ? ((activePartnerships / totalSuppliers) * 100).toFixed(1) : '0';

    const outstandingBalance = allSuppliers.reduce((acc, curr) => acc + curr.outstandingBalance, 0);
    const pendingDeliveries = allSuppliers.reduce((acc, curr) => acc + curr.pendingDeliveriesCount, 0);

    return {
      totalSuppliers,
      totalSuppliersChangeText: '+3 added this month',
      activePartnerships,
      activePercentageText: `${activeRate}% active rate`,
      outstandingBalance,
      outstandingDueText: 'Due in 14 days',
      pendingDeliveries,
      pendingDeliveriesSubtext: '2 arriving today',
    };
  }

  async getSuppliers(query?: SupplierQuery): Promise<SupplierQueryResult> {
    // Quick simulated latency for snappy UI
    await new Promise((r) => setTimeout(r, 40));

    let filtered = [...this.suppliers];

    // Filter by status
    if (query?.status && query.status !== 'ALL') {
      filtered = filtered.filter((s) => s.status === query.status);
    }

    // Filter by city
    if (query?.city && query.city !== 'All Cities' && query.city !== 'ALL') {
      filtered = filtered.filter((s) => s.city.toLowerCase() === query.city!.toLowerCase());
    }

    // Filter by category
    if (query?.category && query.category !== 'All Categories' && query.category !== 'ALL') {
      filtered = filtered.filter((s) => s.category.toLowerCase() === query.category!.toLowerCase());
    }

    // Search query
    if (query?.search && query.search.trim().length > 0) {
      const q = query.search.toLowerCase().trim();
      filtered = filtered.filter((s) => {
        return (
          s.name.toLowerCase().includes(q) ||
          s.supplierCode.toLowerCase().includes(q) ||
          s.contactPerson.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.phone.toLowerCase().includes(q) ||
          s.taxId.toLowerCase().includes(q) ||
          s.city.toLowerCase().includes(q) ||
          (s.notes && s.notes.toLowerCase().includes(q))
        );
      });
    }

    const totalCount = this.suppliers.length;
    const filteredCount = filtered.length;
    const page = query?.page || 1;
    const pageSize = query?.pageSize || 10;
    const totalPages = Math.ceil(filteredCount / pageSize) || 1;

    const startIndex = (page - 1) * pageSize;
    const items = filtered.slice(startIndex, startIndex + pageSize).map((s) => ({
      ...s,
      recentOrders: this.getSupplierRecentOrders(s),
    }));

    const kpiSummary = this.calculateKpis(this.suppliers);

    return {
      items,
      totalCount,
      filteredCount,
      page,
      pageSize,
      totalPages,
      kpiSummary,
    };
  }

  async getSupplierById(id: string): Promise<Supplier | null> {
    await new Promise((r) => setTimeout(r, 20));
    const found = this.suppliers.find((s) => s.id === id || s.supplierCode === id);
    if (!found) return null;
    return {
      ...found,
      recentOrders: this.getSupplierRecentOrders(found),
    };
  }

  async createSupplier(input: CreateSupplierInput): Promise<Supplier> {
    await new Promise((r) => setTimeout(r, 50));

    // Next sequential numeric code
    const existingNums = this.suppliers
      .map((s) => parseInt(s.supplierCode.replace('SUP-', ''), 10))
      .filter((n) => !isNaN(n));
    const maxNum = existingNums.length > 0 ? Math.max(...existingNums) : 100;
    const nextCode = `SUP-${maxNum + 1}`;
    const newId = `sup-${maxNum + 1}`;

    const newSupplier: Supplier = {
      id: newId,
      supplierCode: nextCode,
      name: input.name.trim(),
      contactPerson: input.contactPerson.trim(),
      phone: input.phone.trim(),
      email: input.email.trim(),
      taxId: input.taxId.trim(),
      address: input.address?.trim() || '',
      city: input.city.trim(),
      state: input.state?.trim() || '',
      postalCode: input.postalCode?.trim() || '',
      country: input.country?.trim() || 'United States',
      category: input.category,
      paymentTerms: input.paymentTerms,
      creditLimit: Number(input.creditLimit) || 10000,
      status: 'Active',
      notes: input.notes?.trim() || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      outstandingBalance: 0,
      pendingDeliveriesCount: 0,
      totalOrdersCount: 0,
    };

    this.suppliers.unshift(newSupplier);
    return newSupplier;
  }

  async updateSupplier(id: string, input: UpdateSupplierInput): Promise<Supplier> {
    await new Promise((r) => setTimeout(r, 50));
    const index = this.suppliers.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new Error(`Supplier with id ${id} not found.`);
    }

    const current = this.suppliers[index];
    const updated: Supplier = {
      ...current,
      name: input.name !== undefined ? input.name.trim() : current.name,
      contactPerson: input.contactPerson !== undefined ? input.contactPerson.trim() : current.contactPerson,
      phone: input.phone !== undefined ? input.phone.trim() : current.phone,
      email: input.email !== undefined ? input.email.trim() : current.email,
      taxId: input.taxId !== undefined ? input.taxId.trim() : current.taxId,
      category: input.category || current.category,
      paymentTerms: input.paymentTerms || current.paymentTerms,
      creditLimit: input.creditLimit !== undefined ? Number(input.creditLimit) : current.creditLimit,
      address: input.address !== undefined ? input.address.trim() : current.address,
      city: input.city !== undefined ? input.city.trim() : current.city,
      state: input.state !== undefined ? input.state.trim() : current.state,
      postalCode: input.postalCode !== undefined ? input.postalCode.trim() : current.postalCode,
      country: input.country !== undefined ? input.country.trim() : current.country,
      notes: input.notes !== undefined ? input.notes.trim() : current.notes,
      status: input.status !== undefined ? input.status : current.status,
      updatedAt: new Date().toISOString(),
    };

    this.suppliers[index] = updated;
    return updated;
  }

  async toggleSupplierStatus(id: string): Promise<Supplier> {
    await new Promise((r) => setTimeout(r, 40));
    const supplier = this.suppliers.find((s) => s.id === id);
    if (!supplier) {
      throw new Error(`Supplier with id ${id} not found.`);
    }

    supplier.status = supplier.status === 'Active' ? 'Inactive' : 'Active';
    supplier.updatedAt = new Date().toISOString();
    return { ...supplier };
  }

  async getCities(): Promise<string[]> {
    const citiesSet = new Set(this.suppliers.map((s) => s.city));
    return Array.from(citiesSet).sort();
  }

  async getCategories(): Promise<string[]> {
    const catsSet = new Set(this.suppliers.map((s) => s.category));
    return Array.from(catsSet).sort();
  }
}

type TenantSupplierRow = Awaited<ReturnType<typeof listTenantSuppliers>>['data']['suppliers'][number];

function mapTenantSupplier(row: TenantSupplierRow): Supplier {
  return { id: row.id, supplierCode: row.supplierCode, name: row.name, contactPerson: row.contactPerson, phone: row.phone, email: row.email, taxId: row.taxId, address: row.address ?? undefined, city: row.city, state: row.state ?? undefined, postalCode: row.postalCode ?? undefined, country: row.country ?? undefined, category: row.category as Supplier['category'], paymentTerms: row.paymentTerms as Supplier['paymentTerms'], creditLimit: row.creditLimit, status: row.status === 'ACTIVE' ? 'Active' : 'Inactive', notes: row.notes ?? undefined, createdAt: row.createdAt, updatedAt: row.updatedAt, outstandingBalance: 0, pendingDeliveriesCount: 0, totalOrdersCount: 0 };
}

class ProductionSupplierService extends MockSupplierService {
  private async organizationId(): Promise<string> { const auth = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect); const membership = auth.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE'); if (!membership) throw new Error('No active organization membership.'); return membership.organization.id; }
  private async all(): Promise<Supplier[]> {
    const auth = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect); const membership = auth.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE'); if (!membership) throw new Error('No active organization membership.');
    const result = await listTenantSuppliers(getFirebaseClientServices().dataConnect, { organizationId: membership.organization.id }); return result.data.suppliers.map(mapTenantSupplier);
  }
  override async getSuppliers(query: SupplierQuery = {}): Promise<SupplierQueryResult> { let suppliers = await this.all(); const search = query.search?.trim().toLowerCase() ?? ''; suppliers = suppliers.filter((s) => (!search || `${s.supplierCode} ${s.name} ${s.contactPerson} ${s.phone} ${s.email}`.toLowerCase().includes(search)) && (!query.status || query.status === 'ALL' || s.status === query.status) && (!query.city || s.city === query.city) && (!query.category || s.category === query.category)); const page = Math.max(1, query.page ?? 1); const pageSize = Math.max(1, query.pageSize ?? 10); const totalPages = Math.max(1, Math.ceil(suppliers.length / pageSize)); const validPage = Math.min(page, totalPages); const active = suppliers.filter((s) => s.status === 'Active').length; return { items: suppliers.slice((validPage - 1) * pageSize, validPage * pageSize), totalCount: suppliers.length, filteredCount: suppliers.length, page: validPage, pageSize, totalPages, kpiSummary: { totalSuppliers: suppliers.length, totalSuppliersChangeText: '', activePartnerships: active, activePercentageText: suppliers.length ? `${Math.round(active / suppliers.length * 100)}%` : '0%', outstandingBalance: 0, outstandingDueText: '', pendingDeliveries: 0, pendingDeliveriesSubtext: '' } }; }
  override async getSupplierById(id: string): Promise<Supplier | null> { return (await this.all()).find((s) => s.id === id || s.supplierCode === id) ?? null; }
  override async getCities(): Promise<string[]> { return Array.from(new Set((await this.all()).map((s) => s.city))).sort(); }
  override async getCategories(): Promise<string[]> { return Array.from(new Set((await this.all()).map((s) => s.category))).sort(); }
  override async createSupplier(input: CreateSupplierInput): Promise<Supplier> { const organizationId = await this.organizationId(); const supplierCode = `SUP-${Date.now().toString().slice(-6)}`; await httpsCallable(getFirebaseClientServices().functions, 'createTenantSupplierRecord')({ organizationId, supplierCode, ...input, requestId: globalThis.crypto.randomUUID() }); const created = (await this.all()).find((supplier) => supplier.supplierCode === supplierCode); if (!created) throw new Error('Supplier was created but could not be loaded.'); return created; }
  override async updateSupplier(id: string, input: UpdateSupplierInput): Promise<Supplier> { const current = await this.getSupplierById(id); if (!current) throw new Error('Supplier not found.'); const organizationId = await this.organizationId(); await httpsCallable(getFirebaseClientServices().functions, 'updateTenantSupplierRecord')({ organizationId, id, ...current, ...input, requestId: globalThis.crypto.randomUUID() }); const updated = await this.getSupplierById(id); if (!updated) throw new Error('Supplier was updated but could not be loaded.'); return updated; }
  override async toggleSupplierStatus(id: string): Promise<Supplier> { const current = await this.getSupplierById(id); if (!current) throw new Error('Supplier not found.'); const organizationId = await this.organizationId(); await httpsCallable(getFirebaseClientServices().functions, 'changeTenantSupplierStatus')({ organizationId, id, status: current.status === 'Active' ? 'INACTIVE' : 'ACTIVE', requestId: globalThis.crypto.randomUUID() }); const updated = await this.getSupplierById(id); if (!updated) throw new Error('Supplier status was changed but could not be loaded.'); return updated; }
}

export const supplierService: ISupplierService = new ProductionSupplierService();
