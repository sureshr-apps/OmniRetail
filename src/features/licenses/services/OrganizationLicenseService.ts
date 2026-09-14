import { getOrganizationLicensePublic as getOrganizationLicense, getOrganizationLicenseHistoryPublic as getOrganizationLicenseHistory } from '@omniretail/sql-connect';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';
import { httpsCallable } from 'firebase/functions';
import { OrganizationLicense, OrganizationLicenseHistory, AssignLicenseInput, ChangePlanInput, ModifyCommercialTermsInput, RenewLicenseInput, EnrichedOrganizationLicense } from '../types';
import { calculateLicenseStatus } from '../utils/licenseStatus';
import { licensePlanService } from '@/features/plans/services/LicensePlanService';

export interface IOrganizationLicenseService {
  getCurrentLicense(organizationId: string): Promise<OrganizationLicense | null>;
  getLicenseWithPlan(organizationId: string): Promise<EnrichedOrganizationLicense>;
  getLicenseHistory(organizationId: string): Promise<OrganizationLicenseHistory[]>;
  assignLicense(organizationId: string, input: AssignLicenseInput): Promise<OrganizationLicense>;
  changePlan(organizationId: string, input: ChangePlanInput): Promise<OrganizationLicense>;
  modifyCommercialTerms(organizationId: string, input: ModifyCommercialTermsInput): Promise<OrganizationLicense>;
  renewLicense(organizationId: string, input: RenewLicenseInput): Promise<OrganizationLicense>;
}
const services = () => getFirebaseClientServices(); const uuid = () => globalThis.crypto.randomUUID();
class ProductionOrganizationLicenseService implements IOrganizationLicenseService {
  async getCurrentLicense(organizationId: string) { const r = await getOrganizationLicense(services().dataConnect, { organizationId }); const x = r.data.organizationLicenses[0]; return x ? { id: x.id, organizationId: x.organization.id, planId: x.plan.id, startDate: x.startDate, expiryDate: x.expiryDate, negotiatedPrice: x.negotiatedPrice, currency: x.currency, createdAt: x.createdAt, updatedAt: x.updatedAt } : null; }
  async getLicenseWithPlan(organizationId: string) { const license = await this.getCurrentLicense(organizationId); if (!license) return { license: null, plan: null, status: 'not_assigned' as const }; const plan = await licensePlanService.getPlan(license.planId); return { license, plan, status: calculateLicenseStatus(license) }; }
  async getLicenseHistory(organizationId: string) { const r = await getOrganizationLicenseHistory(services().dataConnect, { organizationId }); return r.data.licenseHistories.map(x => ({ id: x.id, organizationId: x.organization.id, eventType: x.eventType.toLowerCase() as OrganizationLicenseHistory['eventType'], eventAt: x.eventAt, planSnapshot: { planId: x.planCode, planName: x.planName, planLevel: x.planLevel, maxStores: x.maxStores, maxUsers: x.maxUsers }, startDate: x.startDate, expiryDate: x.expiryDate, negotiatedPrice: x.negotiatedPrice, currency: x.currency, changes: (x.changes as OrganizationLicenseHistory['changes']) ?? undefined })); }
  async assignLicense(organizationId: string, input: AssignLicenseInput) {
    const call = httpsCallable<typeof input & { organizationId: string; idempotencyKey: string }, { licenseId: string; organizationId: string; planId: string; startDate: string; expiryDate: string; negotiatedPrice: number; currency: string }>(services().functions, 'assignOrganizationLicense');
    const result = await call({ organizationId, ...input, idempotencyKey: uuid() });
    const x = result.data;
    return { id: x.licenseId, organizationId: x.organizationId, planId: x.planId, startDate: x.startDate, expiryDate: x.expiryDate, negotiatedPrice: x.negotiatedPrice, currency: x.currency, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  }
  async changePlan(organizationId: string, input: ChangePlanInput) { await httpsCallable(services().functions, 'changeOrganizationLicensePlan')({ organizationId, targetPlanId: input.newPlanId, negotiatedPrice: input.newNegotiatedPrice, currency: input.currency, idempotencyKey: uuid() }); const x = await this.getCurrentLicense(organizationId); if (!x) throw new Error('Unable to load the updated license.'); return x; }
  async modifyCommercialTerms(organizationId: string, input: ModifyCommercialTermsInput) { await httpsCallable(services().functions, 'modifyOrganizationCommercialTerms')({ organizationId, ...input, idempotencyKey: uuid() }); const x = await this.getCurrentLicense(organizationId); if (!x) throw new Error('Unable to load the updated license.'); return x; }
  async renewLicense(organizationId: string, input: RenewLicenseInput) { await httpsCallable(services().functions, 'renewOrganizationLicense')({ organizationId, ...input, idempotencyKey: uuid() }); const x = await this.getCurrentLicense(organizationId); if (!x) throw new Error('Unable to load the renewed license.'); return x; }
}
export const organizationLicenseService: IOrganizationLicenseService = new ProductionOrganizationLicenseService();
