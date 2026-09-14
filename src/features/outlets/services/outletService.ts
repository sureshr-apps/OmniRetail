import {
  Outlet,
  OutletQuery,
  OutletQueryResult,
  CreateOutletInput,
  UpdateOutletInput,
  OutletStatus,
} from '../types';
import { getCurrentUserAuthorization, listTenantOutlets } from '@omniretail/sql-connect';
import { httpsCallable } from 'firebase/functions';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';
import { formatOutletCode } from '../utils/formatOutletCode';
import { assertCallableEntity } from '@/shared/utils/callableResponse';

export interface IOutletService {
  getAllOutlets(): Promise<Outlet[]>;
  getOutlets(query: OutletQuery): Promise<OutletQueryResult>;
  getOutlet(id: string): Promise<Outlet | null>;
  createOutlet(input: CreateOutletInput): Promise<Outlet>;
  updateOutlet(id: string, input: UpdateOutletInput): Promise<Outlet>;
  changeOutletStatus(id: string, status: OutletStatus): Promise<Outlet>;
  getAllActiveOutlets(): Promise<Outlet[]>;
}

type TenantOutletRow = Awaited<ReturnType<typeof listTenantOutlets>>['data']['outlets'][number];

interface OutletMutationResponse {
  id: string;
  outletCode: number;
  name: string;
  contactPerson: string;
  email: string | null;
  phone: string;
  address: string;
  status: string;
}

function mapTenantOutlet(row: TenantOutletRow | OutletMutationResponse): Outlet {
  return {
    id: row.id,
    outletCode: row.outletCode,
    name: row.name,
    contactPerson: row.contactPerson,
    contactEmail: row.email ?? '',
    phone: row.phone,
    address: row.address,
    status: row.status === 'ACTIVE' ? 'Active' : 'Inactive',
  };
}

const OUTLET_MUTATION_RESPONSE_KEYS: (keyof OutletMutationResponse)[] = [
  'id', 'outletCode', 'name', 'contactPerson', 'phone', 'address', 'status',
];

/**
 * Pure filter/sort/paginate derivation, shared by the server-fetch path here and
 * by pages that recompute a view locally after a mutation without refetching.
 */
export function deriveOutletView(all: Outlet[], query: OutletQuery): OutletQueryResult {
  let outlets = all;
  const search = query.search?.trim().toLowerCase() ?? '';
  if (search) outlets = outlets.filter((o) => `${formatOutletCode(o.outletCode)} ${o.name} ${o.phone} ${o.contactPerson}`.toLowerCase().includes(search));
  if (query.status && query.status !== 'All') outlets = outlets.filter((o) => o.status === query.status);
  const page = Math.max(1, query.page ?? 1);
  const pageSize = Math.max(1, query.pageSize ?? 10);
  const total = outlets.length;
  return {
    outlets: outlets.slice((page - 1) * pageSize, page * pageSize),
    total,
    activeCount: outlets.filter((o) => o.status === 'Active').length,
    inactiveCount: outlets.filter((o) => o.status === 'Inactive').length,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

class ProductionOutletService implements IOutletService {
  private async organizationId(): Promise<string> {
    const result = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect);
    const membership = result.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE');
    if (!membership) throw new Error('No active organization membership.');
    return membership.organization.id;
  }

  /** Full org-scoped, unfiltered/unpaginated set — the authoritative array pages hold in state. */
  async getAllOutlets(): Promise<Outlet[]> {
    const organizationId = await this.organizationId();
    const result = await listTenantOutlets(getFirebaseClientServices().dataConnect, { organizationId });
    return result.data.outlets.map(mapTenantOutlet);
  }

  async getOutlets(query: OutletQuery): Promise<OutletQueryResult> {
    return deriveOutletView(await this.getAllOutlets(), query);
  }

  async getOutlet(id: string): Promise<Outlet | null> {
    const all = await this.getAllOutlets();
    return all.find((o) => o.id === id || String(o.outletCode) === id || formatOutletCode(o.outletCode) === id) ?? null;
  }

  async createOutlet(input: CreateOutletInput): Promise<Outlet> {
    const organizationId = await this.organizationId();
    const callable = httpsCallable(getFirebaseClientServices().functions, 'createTenantOutlet');
    const response = await callable({
      organizationId,
      name: input.name,
      contactPerson: input.contactPerson,
      email: input.contactEmail,
      phone: input.phone,
      address: input.address,
      idempotencyKey: globalThis.crypto.randomUUID(),
    });
    const row = assertCallableEntity<OutletMutationResponse>(response.data, OUTLET_MUTATION_RESPONSE_KEYS, 'createOutlet');
    return mapTenantOutlet(row);
  }

  async updateOutlet(id: string, input: UpdateOutletInput): Promise<Outlet> {
    const organizationId = await this.organizationId();
    const response = await httpsCallable(getFirebaseClientServices().functions, 'updateTenantOutlet')({
      organizationId,
      id,
      ...input,
      requestId: globalThis.crypto.randomUUID(),
    });
    const row = assertCallableEntity<OutletMutationResponse>(response.data, OUTLET_MUTATION_RESPONSE_KEYS, 'updateOutlet');
    return mapTenantOutlet(row);
  }

  async changeOutletStatus(id: string, status: OutletStatus): Promise<Outlet> {
    const organizationId = await this.organizationId();
    const response = await httpsCallable(getFirebaseClientServices().functions, 'changeTenantOutletStatus')({
      organizationId,
      id,
      status: status === 'Active' ? 'ACTIVE' : 'INACTIVE',
      requestId: globalThis.crypto.randomUUID(),
    });
    const row = assertCallableEntity<OutletMutationResponse>(response.data, OUTLET_MUTATION_RESPONSE_KEYS, 'changeOutletStatus');
    return mapTenantOutlet(row);
  }

  async getAllActiveOutlets(): Promise<Outlet[]> {
    const result = await this.getOutlets({ status: 'Active', page: 1, pageSize: 1000 });
    return result.outlets;
  }
}

export const outletService: IOutletService = new ProductionOutletService();
