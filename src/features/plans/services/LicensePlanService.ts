import { changeLicensePlanStatus, createLicensePlan, getLicensePlan, listLicensePlans, listOrganizationLicensePlanAssignments, updateLicensePlan, LicensePlanStatus } from '@omniretail/sql-connect';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';
import { LicensePlan, CreatePlanInput, UpdatePlanInput, PlanQuery, PlanStatus } from '../types';

export interface ILicensePlanService {
  getPlans(query?: PlanQuery): Promise<LicensePlan[]>;
  getActivePlans(): Promise<LicensePlan[]>;
  getPlan(id: string): Promise<LicensePlan | null>;
  createPlan(input: CreatePlanInput): Promise<LicensePlan>;
  updatePlan(id: string, input: UpdatePlanInput): Promise<LicensePlan>;
  changePlanStatus(id: string, status: PlanStatus): Promise<LicensePlan>;
  isLevelTaken(level: number, excludePlanId?: string): Promise<boolean>;
  resetToDefaults(): Promise<LicensePlan[]>;
}

type Row = { id: string; planCode: string; name: string; description?: string | null; level: number; maxStores: number; maxUsers: number; status: LicensePlanStatus; createdAt: string; updatedAt: string };
const defaults: CreatePlanInput[] = [
  { name: 'Starter', description: 'Essential capacity for smaller retail businesses', level: 1, maxStores: 1, maxUsers: 5 },
  { name: 'Professional', description: 'For growing multi-store retail businesses requiring coordinated multi-outlet operations', level: 2, maxStores: 5, maxUsers: 25 },
  { name: 'Enterprise', description: 'Higher capacity for larger retail operations and multi-tier logistics', level: 3, maxStores: 20, maxUsers: 100 },
];
function mapRow(row: Row): LicensePlan { return { id: row.id, planCode: row.planCode, name: row.name, description: row.description ?? '', level: row.level, maxStores: row.maxStores, maxUsers: row.maxUsers, status: row.status.toLowerCase() as PlanStatus, createdAt: row.createdAt.slice(0, 10), updatedAt: row.updatedAt.slice(0, 10) }; }
function validate(input: CreatePlanInput | UpdatePlanInput): void {
  if (!input.name?.trim()) throw new Error('Plan Name is required.');
  if (!Number.isInteger(input.level) || input.level <= 0) throw new Error('Plan Level must be a positive whole number.');
  if (!Number.isInteger(input.maxStores) || input.maxStores <= 0) throw new Error('Maximum Stores must be a positive whole number.');
  if (!Number.isInteger(input.maxUsers) || input.maxUsers <= 0) throw new Error('Maximum Users must be a positive whole number.');
}
function safeError(error: unknown, fallback: string): Error { const message = error instanceof Error ? error.message : ''; if (/already exists|unique|duplicate|conflict/i.test(message)) return new Error('A plan with that level or identifier already exists.'); if (/permission|unauthenticated|forbidden|unauthorized/i.test(message)) return new Error('You do not have permission to manage plans.'); if (/not found/i.test(message)) return new Error('Plan not found.'); return new Error(fallback); }
const newUuid = (): string => globalThis.crypto.randomUUID();
function planCode(name: string): string { return `PLN-${newUuid().replaceAll('-', '').slice(0, 12).toUpperCase()}-${name.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10) || 'PLAN'}`; }

class SqlLicensePlanService implements ILicensePlanService {
  private async rows(): Promise<LicensePlan[]> { try { const services = getFirebaseClientServices(); const [plansResult, assignmentsResult] = await Promise.all([listLicensePlans(services.dataConnect), listOrganizationLicensePlanAssignments(services.dataConnect)]); const counts = assignmentsResult.data.organizationLicenses.reduce<Record<string, number>>((result, license) => { const planId = license.plan.id; result[planId] = (result[planId] ?? 0) + 1; return result; }, {}); return plansResult.data.licensePlans.map((row) => ({ ...mapRow(row as Row), assignedOrganizationsCount: counts[row.id] ?? 0 })); } catch (error) { throw safeError(error, 'Unable to load plans.'); } }
  async getPlans(query?: PlanQuery): Promise<LicensePlan[]> { let result = await this.rows(); if (query?.status && query.status !== 'all') result = result.filter((p) => p.status === query.status); if (query?.level !== undefined && query.level !== 'all') result = result.filter((p) => p.level === Number(query.level)); const search = query?.search?.trim().toLowerCase(); if (search) result = result.filter((p) => `${p.planCode ?? ''} ${p.name} ${p.description}`.toLowerCase().includes(search)); return result.sort((a, b) => a.level - b.level); }
  async getActivePlans(): Promise<LicensePlan[]> { return this.getPlans({ status: 'active' }); }
  async getPlan(id: string): Promise<LicensePlan | null> { try { const result = await getLicensePlan(getFirebaseClientServices().dataConnect, { id }); return result.data.licensePlan ? mapRow(result.data.licensePlan as Row) : null; } catch (error) { throw safeError(error, 'Unable to load the plan.'); } }
  async isLevelTaken(level: number, excludePlanId?: string): Promise<boolean> { return (await this.rows()).some((plan) => plan.level === level && plan.id !== excludePlanId); }
  async createPlan(input: CreatePlanInput): Promise<LicensePlan> { validate(input); try { const code = planCode(input.name); const result = await createLicensePlan(getFirebaseClientServices().dataConnect, { planCode: code, name: input.name.trim(), description: input.description?.trim() || null, level: input.level, maxStores: input.maxStores, maxUsers: input.maxUsers, auditId: newUuid(), requestId: newUuid() }); const created = await this.getPlan(result.data.licensePlan_insert.id); if (created) return created; throw new Error('created plan not found'); } catch (error) { throw safeError(error, 'Unable to create the plan.'); } }
  async updatePlan(id: string, input: UpdatePlanInput): Promise<LicensePlan> { validate(input); try { await updateLicensePlan(getFirebaseClientServices().dataConnect, { id, name: input.name.trim(), description: input.description?.trim() || null, level: input.level, maxStores: input.maxStores, maxUsers: input.maxUsers, auditId: newUuid(), requestId: newUuid() }); const updated = await this.getPlan(id); if (!updated) throw new Error('not found'); return updated; } catch (error) { throw safeError(error, 'Unable to update the plan.'); } }
  async changePlanStatus(id: string, status: PlanStatus): Promise<LicensePlan> { try { await changeLicensePlanStatus(getFirebaseClientServices().dataConnect, { id, status: status.toUpperCase() as LicensePlanStatus, action: `plans.${status === 'active' ? 'activated' : 'deactivated'}`, auditId: newUuid(), requestId: newUuid() }); const updated = await this.getPlan(id); if (!updated) throw new Error('not found'); return updated; } catch (error) { throw safeError(error, 'Unable to change the plan status.'); } }
  async resetToDefaults(): Promise<LicensePlan[]> { const current = await this.rows(); for (const input of defaults) if (!current.some((p) => p.level === input.level)) await this.createPlan(input); return this.rows(); }
}
export const licensePlanService: ILicensePlanService = new SqlLicensePlanService();
