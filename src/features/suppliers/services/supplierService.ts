import {
  Supplier,
  SupplierQuery,
  SupplierQueryResult,
  SuppliersKpiSummary,
  CreateSupplierInput,
  UpdateSupplierInput,
  SupplierPurchaseOrderSummary,
} from '../types';
import { getCurrentUserAuthorization, listTenantSuppliers } from '@omniretail/sql-connect';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';
import { httpsCallable } from 'firebase/functions';
import { assertCallableEntity } from '@/shared/utils/callableResponse';
import { formatSupplierCode } from '../utils/formatSupplierCode';

export interface ISupplierService {
  getAllSuppliers(): Promise<Supplier[]>;
  getSuppliers(query?: SupplierQuery): Promise<SupplierQueryResult>;
  getSupplierById(id: string): Promise<Supplier | null>;
  createSupplier(input: CreateSupplierInput): Promise<Supplier>;
  updateSupplier(id: string, input: UpdateSupplierInput): Promise<Supplier>;
  toggleSupplierStatus(id: string): Promise<Supplier>;
  deleteSupplier(id: string): Promise<void>;
  getCategories(): Promise<string[]>;
}

type TenantSupplierRow = Awaited<ReturnType<typeof listTenantSuppliers>>['data']['suppliers'][number];

interface SupplierMutationResponse {
  id: string;
  supplierCode: number;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  taxId?: string | null;
  address?: string | null;
  category: string;
  paymentTerms: string;
  creditLimit: number;
  status: string;
  notes?: string | null;
}

const SUPPLIER_MUTATION_RESPONSE_KEYS: (keyof SupplierMutationResponse)[] = [
  'id', 'supplierCode', 'name', 'contactPerson', 'phone', 'email',
  'category', 'paymentTerms', 'creditLimit', 'status',
];

function mapTenantSupplier(row: TenantSupplierRow | SupplierMutationResponse): Supplier {
  const purchases = 'supplierPurchases' in row ? row.supplierPurchases : [];
  return { id: row.id, supplierCode: row.supplierCode, name: row.name, contactPerson: row.contactPerson, phone: row.phone, email: row.email, taxId: row.taxId ?? undefined, address: row.address ?? undefined, category: row.category, paymentTerms: row.paymentTerms as Supplier['paymentTerms'], creditLimit: row.creditLimit, status: row.status === 'ACTIVE' ? 'Active' : 'Inactive', notes: row.notes ?? undefined, outstandingBalance: purchases.reduce((sum, purchase) => sum + purchase.outstandingAmount, 0), pendingDeliveriesCount: purchases.filter((purchase) => purchase.receiptStatus !== 'RECEIVED' && purchase.status !== 'CANCELLED').length, totalOrdersCount: purchases.length };
}

/**
 * Pure filter/sort/paginate derivation, shared by the server-fetch path here and
 * by pages that recompute a view locally after a mutation without refetching.
 */
export function deriveSupplierView(all: Supplier[], query: SupplierQuery = {}): SupplierQueryResult {
  const totalCount = all.length;
  let suppliers = [...all];
  const search = query.search?.trim().toLowerCase() ?? '';
  suppliers = suppliers.filter((s) => (!search || `${formatSupplierCode(s.supplierCode)} ${s.name} ${s.contactPerson} ${s.phone} ${s.email} ${s.taxId ?? ''} ${s.address ?? ''}`.toLowerCase().includes(search)) && (!query.status || query.status === 'ALL' || s.status === query.status) && (!query.category || s.category === query.category));
  const page = Math.max(1, query.page ?? 1);
  const pageSize = Math.max(1, query.pageSize ?? 10);
  const totalPages = Math.max(1, Math.ceil(suppliers.length / pageSize));
  const validPage = Math.min(page, totalPages);
  const active = suppliers.filter((s) => s.status === 'Active').length;
  const outstandingBalance = suppliers.reduce((sum, supplier) => sum + supplier.outstandingBalance, 0);
  const pendingDeliveries = suppliers.reduce((sum, supplier) => sum + supplier.pendingDeliveriesCount, 0);
  return {
    items: suppliers.slice((validPage - 1) * pageSize, validPage * pageSize),
    totalCount,
    filteredCount: suppliers.length,
    page: validPage,
    pageSize,
    totalPages,
    kpiSummary: {
      totalSuppliers: suppliers.length,
      totalSuppliersChangeText: '',
      activePartnerships: active,
      activePercentageText: suppliers.length ? `${Math.round((active / suppliers.length) * 100)}%` : '0%',
      outstandingBalance,
      outstandingDueText: outstandingBalance ? 'Across supplier accounts' : 'No outstanding balance',
      pendingDeliveries,
      pendingDeliveriesSubtext: pendingDeliveries ? 'Awaiting receipt' : 'No pending deliveries',
    },
  };
}

class ProductionSupplierService implements ISupplierService {
  private async organizationId(): Promise<string> { const auth = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect); const membership = auth.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE'); if (!membership) throw new Error('No active organization membership.'); return membership.organization.id; }

  /** Full org-scoped, unfiltered/unpaginated set — the authoritative array pages hold in state. */
  async getAllSuppliers(): Promise<Supplier[]> {
    const organizationId = await this.organizationId();
    const result = await listTenantSuppliers(getFirebaseClientServices().dataConnect, { organizationId });
    return result.data.suppliers.map(mapTenantSupplier);
  }

  async getSuppliers(query: SupplierQuery = {}): Promise<SupplierQueryResult> {
    return deriveSupplierView(await this.getAllSuppliers(), query);
  }
  async getSupplierById(id: string): Promise<Supplier | null> { return (await this.getAllSuppliers()).find((s) => s.id === id || String(s.supplierCode) === id || formatSupplierCode(s.supplierCode) === id) ?? null; }
  async getCategories(): Promise<string[]> { return Array.from(new Set((await this.getAllSuppliers()).map((s) => s.category))).sort(); }

  async createSupplier(input: CreateSupplierInput): Promise<Supplier> {
    const organizationId = await this.organizationId();
    const response = await httpsCallable(getFirebaseClientServices().functions, 'createTenantSupplierRecord')({
      organizationId,
      ...input,
      requestId: globalThis.crypto.randomUUID(),
    });
    const row = assertCallableEntity<SupplierMutationResponse>(response.data, SUPPLIER_MUTATION_RESPONSE_KEYS, 'createSupplier');
    return mapTenantSupplier(row);
  }

  async updateSupplier(id: string, input: UpdateSupplierInput): Promise<Supplier> {
    const current = await this.getSupplierById(id);
    if (!current) throw new Error('Supplier not found.');
    const organizationId = await this.organizationId();
    const response = await httpsCallable(getFirebaseClientServices().functions, 'updateTenantSupplierRecord')({
      organizationId,
      id,
      ...current,
      ...input,
      requestId: globalThis.crypto.randomUUID(),
    });
    const row = assertCallableEntity<SupplierMutationResponse>(response.data, SUPPLIER_MUTATION_RESPONSE_KEYS, 'updateSupplier');
    return mapTenantSupplier(row);
  }

  async toggleSupplierStatus(id: string): Promise<Supplier> {
    const current = await this.getSupplierById(id);
    if (!current) throw new Error('Supplier not found.');
    const organizationId = await this.organizationId();
    const response = await httpsCallable(getFirebaseClientServices().functions, 'changeTenantSupplierStatus')({
      organizationId,
      id,
      status: current.status === 'Active' ? 'INACTIVE' : 'ACTIVE',
      requestId: globalThis.crypto.randomUUID(),
    });
    const row = assertCallableEntity<SupplierMutationResponse>(response.data, SUPPLIER_MUTATION_RESPONSE_KEYS, 'toggleSupplierStatus');
    return mapTenantSupplier(row);
  }

  async deleteSupplier(id: string): Promise<void> {
    const organizationId = await this.organizationId();
    await httpsCallable(getFirebaseClientServices().functions, 'deleteTenantSupplier')({
      organizationId,
      id,
      requestId: globalThis.crypto.randomUUID(),
    });
  }
}

export const supplierService: ISupplierService = new ProductionSupplierService();
