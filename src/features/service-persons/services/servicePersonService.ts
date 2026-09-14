import {
  ServicePerson,
  ServicePersonStatus,
  ServicePersonQuery,
  ServicePersonQueryResult,
  CreateServicePersonInput,
  UpdateServicePersonInput,
} from '../types';
import { getCurrentUserAuthorization, listTenantServicePersons } from '@omniretail/sql-connect';
import { httpsCallable } from 'firebase/functions';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';
import { assertCallableEntity } from '@/shared/utils/callableResponse';
import { formatServicePersonCode } from '../utils/formatServicePersonCode';

export interface IServicePersonService {
  getAllServicePersons(): Promise<ServicePerson[]>;
  getServicePersons(query: ServicePersonQuery): Promise<ServicePersonQueryResult>;
  getServicePerson(id: string): Promise<ServicePerson | null>;
  createServicePerson(input: CreateServicePersonInput): Promise<ServicePerson>;
  updateServicePerson(id: string, input: UpdateServicePersonInput): Promise<ServicePerson>;
  changeServicePersonStatus(id: string, status: ServicePersonStatus): Promise<ServicePerson>;
  deleteServicePerson(id: string): Promise<void>;
  getSpecializations(): Promise<string[]>;
  getActiveCount(): Promise<number>;
}

type TenantServicePersonRow = Awaited<ReturnType<typeof listTenantServicePersons>>['data']['servicePeople'][number];

interface ServicePersonMutationResponse {
  id: string;
  servicePersonCode: number;
  fullName: string;
  email: string | null;
  phone: string;
  specialization: string | null;
  yearsOfExperience: number | null;
  assignmentScope: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  servicePersonOutlets_on_servicePerson: { outlet: { id: string; outletCode: number; name: string } }[];
}

const SERVICE_PERSON_MUTATION_RESPONSE_KEYS: (keyof ServicePersonMutationResponse)[] = [
  'id', 'servicePersonCode', 'fullName', 'phone', 'specialization', 'assignmentScope', 'status', 'createdAt', 'updatedAt',
  'servicePersonOutlets_on_servicePerson',
];

function mapTenantServicePerson(row: TenantServicePersonRow | ServicePersonMutationResponse): ServicePerson {
  const names = row.fullName.trim().split(/\s+/);
  return {
    id: row.id,
    servicePersonCode: row.servicePersonCode,
    firstName: names[0] ?? row.fullName,
    lastName: names.slice(1).join(' '),
    displayName: row.fullName,
    email: row.email ?? '',
    phone: row.phone,
    specialization: row.specialization ?? '',
    assignmentScope: row.assignmentScope === 'ORGANIZATION' ? 'Entire Organization' : 'Specific Outlet',
    outletId: row.servicePersonOutlets_on_servicePerson[0]?.outlet.id,
    outletName: row.servicePersonOutlets_on_servicePerson[0]?.outlet.name ?? 'Organization-wide',
    status: row.status === 'ACTIVE' ? 'Active' : 'Inactive',
    yearsOfExperience: row.yearsOfExperience ?? undefined,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    openJobs: [],
    openJobsCount: 0,
    timelineEvents: [],
  };
}

/**
 * Pure filter/sort/paginate derivation, shared by the server-fetch path here and
 * by pages that recompute a view locally after a mutation without refetching.
 */
export function deriveServicePersonView(all: ServicePerson[], query: ServicePersonQuery): ServicePersonQueryResult {
  let rows = all;
  const search = query.search?.trim().toLowerCase() ?? '';
  if (search) {
    rows = rows.filter((row) => `${formatServicePersonCode(row.servicePersonCode)} ${row.displayName} ${row.phone} ${row.specialization}`.toLowerCase().includes(search));
  }
  if (query.status && query.status !== 'All') rows = rows.filter((row) => row.status === query.status);
  if (query.assignmentScope && query.assignmentScope !== 'All') rows = rows.filter((row) => row.assignmentScope === query.assignmentScope);
  if (query.specialization && query.specialization !== 'All') rows = rows.filter((row) => row.specialization === query.specialization);
  const page = Math.max(1, query.page ?? 1);
  const pageSize = Math.max(1, query.pageSize ?? 10);
  const total = rows.length;
  return {
    servicePersons: rows.slice((page - 1) * pageSize, page * pageSize),
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
    activeCount: rows.filter((row) => row.status === 'Active').length,
  };
}

class ProductionServicePersonService implements IServicePersonService {
  private async organizationId(): Promise<string> {
    const result = await getCurrentUserAuthorization(getFirebaseClientServices().dataConnect);
    const membership = result.data.appUsers[0]?.organizationMemberships_on_user.find((item) => item.status === 'ACTIVE');
    if (!membership) throw new Error('No active organization membership.');
    return membership.organization.id;
  }

  /** Full org-scoped, unfiltered/unpaginated set — the authoritative array pages hold in state. */
  async getAllServicePersons(): Promise<ServicePerson[]> {
    const organizationId = await this.organizationId();
    const result = await listTenantServicePersons(getFirebaseClientServices().dataConnect, { organizationId });
    return result.data.servicePeople.map(mapTenantServicePerson);
  }

  async getServicePersons(query: ServicePersonQuery): Promise<ServicePersonQueryResult> {
    return deriveServicePersonView(await this.getAllServicePersons(), query);
  }

  async getServicePerson(id: string): Promise<ServicePerson | null> {
    const all = await this.getAllServicePersons();
    return all.find((row) => row.id === id || String(row.servicePersonCode) === id || formatServicePersonCode(row.servicePersonCode) === id) ?? null;
  }

  async createServicePerson(input: CreateServicePersonInput): Promise<ServicePerson> {
    const organizationId = await this.organizationId();
    const callable = httpsCallable(getFirebaseClientServices().functions, 'createTenantServicePerson');
    const response = await callable({
      organizationId,
      fullName: `${input.firstName.trim()} ${input.lastName.trim()}`.trim(),
      email: input.email,
      phone: input.phone,
      specialization: input.specialization,
      yearsOfExperience: input.yearsOfExperience,
      assignmentScope: input.assignmentScope === 'Entire Organization' ? 'ORGANIZATION' : 'OUTLET',
      requestId: globalThis.crypto.randomUUID(),
    });
    const row = assertCallableEntity<ServicePersonMutationResponse>(response.data, SERVICE_PERSON_MUTATION_RESPONSE_KEYS, 'createServicePerson');
    return mapTenantServicePerson(row);
  }

  async updateServicePerson(id: string, input: UpdateServicePersonInput): Promise<ServicePerson> {
    const organizationId = await this.organizationId();
    const response = await httpsCallable(getFirebaseClientServices().functions, 'updateTenantServicePerson')({
      organizationId,
      id,
      fullName: `${input.firstName ?? ''} ${input.lastName ?? ''}`.trim(),
      email: input.email,
      phone: input.phone,
      specialization: input.specialization,
      yearsOfExperience: input.yearsOfExperience,
      assignmentScope: input.assignmentScope === 'Entire Organization' ? 'ORGANIZATION' : 'OUTLET',
      requestId: globalThis.crypto.randomUUID(),
    });
    const row = assertCallableEntity<ServicePersonMutationResponse>(response.data, SERVICE_PERSON_MUTATION_RESPONSE_KEYS, 'updateServicePerson');
    return mapTenantServicePerson(row);
  }

  async changeServicePersonStatus(id: string, status: ServicePersonStatus): Promise<ServicePerson> {
    const organizationId = await this.organizationId();
    const response = await httpsCallable(getFirebaseClientServices().functions, 'changeTenantServicePersonStatus')({
      organizationId,
      id,
      status: status === 'Active' ? 'ACTIVE' : 'INACTIVE',
      requestId: globalThis.crypto.randomUUID(),
    });
    const row = assertCallableEntity<ServicePersonMutationResponse>(response.data, SERVICE_PERSON_MUTATION_RESPONSE_KEYS, 'changeServicePersonStatus');
    return mapTenantServicePerson(row);
  }

  async deleteServicePerson(id: string): Promise<void> {
    const organizationId = await this.organizationId();
    await httpsCallable(getFirebaseClientServices().functions, 'deleteTenantServicePerson')({
      organizationId,
      id,
      requestId: globalThis.crypto.randomUUID(),
    });
  }

  async getSpecializations(): Promise<string[]> {
    return Array.from(new Set((await this.getAllServicePersons()).map((row) => row.specialization).filter(Boolean))).sort();
  }

  async getActiveCount(): Promise<number> {
    return (await this.getAllServicePersons()).filter((row) => row.status === 'Active').length;
  }
}

export const servicePersonService: IServicePersonService = new ProductionServicePersonService();
