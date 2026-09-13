import {
  Outlet,
  OutletQuery,
  OutletQueryResult,
  CreateOutletInput,
  UpdateOutletInput,
  OutletStatus,
} from '../types';
import { getCurrentUserAuthorization, listTenantOutlets } from '@omniretail/sql-connect';
import { QueryFetchPolicy } from 'firebase/data-connect';
import { httpsCallable } from 'firebase/functions';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';

export interface IOutletService {
  getOutlets(query: OutletQuery): Promise<OutletQueryResult>;
  getOutlet(id: string): Promise<Outlet | null>;
  createOutlet(input: CreateOutletInput): Promise<Outlet>;
  updateOutlet(id: string, input: UpdateOutletInput): Promise<Outlet>;
  changeOutletStatus(id: string, status: OutletStatus): Promise<Outlet>;
  getAllActiveOutlets(): Promise<Outlet[]>;
}

type TenantOutletRow = Awaited<ReturnType<typeof listTenantOutlets>>['data']['outlets'][number];

function mapTenantOutlet(row: TenantOutletRow): Outlet {
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

class ProductionOutletService implements IOutletService {
  private async organizationId(): Promise<string> {
    const result = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect);
    const membership = result.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE');
    if (!membership) throw new Error('No active organization membership.');
    return membership.organization.id;
  }

  async getOutlets(query: OutletQuery): Promise<OutletQueryResult> {
    const organizationId = await this.organizationId();
    const result = await listTenantOutlets(
      getFirebaseClientServices().dataConnect,
      { organizationId },
      { fetchPolicy: QueryFetchPolicy.SERVER_ONLY },
    );
    let outlets = result.data.outlets.map(mapTenantOutlet);
    const search = query.search?.trim().toLowerCase() ?? '';
    if (search) outlets = outlets.filter((o) => `${o.outletCode} ${o.name} ${o.phone} ${o.contactPerson}`.toLowerCase().includes(search));
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

  async getOutlet(id: string): Promise<Outlet | null> {
    const result = await this.getOutlets({ page: 1, pageSize: 1000 });
    return result.outlets.find((o) => o.id === id || o.outletCode === id) ?? null;
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
    const responseData = response.data as { outletCode?: unknown };
    const returnedOutletCode = typeof responseData.outletCode === 'string' ? responseData.outletCode : '';
    const created = await this.getOutlets({ page: 1, pageSize: 1000 });
    const found = created.outlets.find((o) => o.outletCode === returnedOutletCode);
    if (!found) throw new Error('Outlet was created but could not be loaded.');
    return found;
  }

  async updateOutlet(id: string, input: UpdateOutletInput): Promise<Outlet> {
    const organizationId = await this.organizationId();
    await httpsCallable(getFirebaseClientServices().functions, 'updateTenantOutlet')({
      organizationId,
      id,
      ...input,
      requestId: globalThis.crypto.randomUUID(),
    });
    const updated = await this.getOutlet(id);
    if (!updated) throw new Error('Outlet was updated but could not be loaded.');
    return updated;
  }

  async changeOutletStatus(id: string, status: OutletStatus): Promise<Outlet> {
    const organizationId = await this.organizationId();
    await httpsCallable(getFirebaseClientServices().functions, 'changeTenantOutletStatus')({
      organizationId,
      id,
      status: status === 'Active' ? 'ACTIVE' : 'INACTIVE',
      requestId: globalThis.crypto.randomUUID(),
    });
    const updated = await this.getOutlet(id);
    if (!updated) throw new Error('Outlet status was changed but could not be loaded.');
    return updated;
  }

  async getAllActiveOutlets(): Promise<Outlet[]> {
    const result = await this.getOutlets({ status: 'Active', page: 1, pageSize: 1000 });
    return result.outlets;
  }
}

export const outletService: IOutletService = new ProductionOutletService();
