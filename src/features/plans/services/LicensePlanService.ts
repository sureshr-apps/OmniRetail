import {
  LicensePlan,
  CreatePlanInput,
  UpdatePlanInput,
  PlanQuery,
  PlanStatus,
} from '../types';
import { mockDelay } from '@/shared/utils/mockDelay';

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

const DEFAULT_PLANS: LicensePlan[] = [
  {
    id: 'PLN-001-STARTER',
    name: 'Starter',
    description: 'Essential capacity for smaller retail businesses',
    level: 1,
    maxStores: 1,
    maxUsers: 5,
    status: 'active',
    createdAt: '2024-10-12',
    updatedAt: '2024-10-12',
    assignedOrganizationsCount: 14,
    assignedTenantsCount: 14,
  },
  {
    id: 'PLN-002-PROFESSIONAL',
    name: 'Professional',
    description: 'For growing multi-store retail businesses requiring coordinated multi-outlet operations',
    level: 2,
    maxStores: 5,
    maxUsers: 25,
    status: 'active',
    createdAt: '2024-11-02',
    updatedAt: '2024-11-02',
    assignedOrganizationsCount: 142,
    assignedTenantsCount: 142,
  },
  {
    id: 'PLN-003-ENTERPRISE',
    name: 'Enterprise',
    description: 'Higher capacity for larger retail operations and multi-tier logistics',
    level: 3,
    maxStores: 20,
    maxUsers: 100,
    status: 'active',
    createdAt: '2024-09-18',
    updatedAt: '2024-09-18',
    assignedOrganizationsCount: 18,
    assignedTenantsCount: 18,
  },
  {
    id: 'PLN-000-LEGACY',
    name: 'Legacy Standard',
    description: 'Archived single-outlet tier for grandfathered accounts',
    level: 0,
    maxStores: 1,
    maxUsers: 3,
    status: 'inactive',
    createdAt: '2024-08-04',
    updatedAt: '2024-08-04',
    assignedOrganizationsCount: 2,
    assignedTenantsCount: 2,
  },
];

class MockLicensePlanService implements ILicensePlanService {
  private plans: LicensePlan[] = [...DEFAULT_PLANS];

  async getPlans(query?: PlanQuery): Promise<LicensePlan[]> {
    await mockDelay(300);

    let result = [...this.plans];

    if (query?.status && query.status !== 'all') {
      result = result.filter((p) => p.status === query.status);
    }

    if (query?.level !== undefined && query.level !== 'all') {
      const levelNum = Number(query.level);
      result = result.filter((p) => p.level === levelNum);
    }

    if (query?.search?.trim()) {
      const q = query.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q)
      );
    }

    // Sort by level ascending (or highest first depending on standard hierarchy)
    result.sort((a, b) => a.level - b.level);

    return result;
  }

  async getActivePlans(): Promise<LicensePlan[]> {
    return this.getPlans({ status: 'active' });
  }

  async getPlan(id: string): Promise<LicensePlan | null> {
    await mockDelay(150);
    const plan = this.plans.find((p) => p.id === id);
    return plan ? { ...plan } : null;
  }

  async isLevelTaken(level: number, excludePlanId?: string): Promise<boolean> {
    return this.plans.some((p) => p.level === level && p.id !== excludePlanId);
  }

  async createPlan(input: CreatePlanInput): Promise<LicensePlan> {
    await mockDelay(400);

    // Validation checks
    if (!input.name?.trim()) {
      throw new Error('Plan Name is required.');
    }
    if (input.level === undefined || isNaN(input.level) || input.level < 0) {
      throw new Error('Plan Level is required and must be a non-negative whole number.');
    }
    if (!input.maxStores || input.maxStores < 1) {
      throw new Error('Maximum Stores must be a positive whole number.');
    }
    if (!input.maxUsers || input.maxUsers < 1) {
      throw new Error('Maximum Users must be a positive whole number.');
    }

    // Check unique level
    const levelExists = this.plans.some((p) => p.level === input.level);
    if (levelExists) {
      throw new Error(`Plan Level ${input.level} is already assigned to another plan. Plan levels must be unique.`);
    }

    const today = new Date().toISOString().split('T')[0];
    const generatedId = `PLN-${String(this.plans.length + 1).padStart(3, '0')}-${input.name
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 10) || 'TIER'}`;

    const newPlan: LicensePlan = {
      id: generatedId,
      name: input.name.trim(),
      description: input.description?.trim() || '',
      level: Math.floor(input.level),
      maxStores: Math.floor(input.maxStores),
      maxUsers: Math.floor(input.maxUsers),
      status: 'active', // default to Active
      createdAt: today,
      updatedAt: today,
      assignedOrganizationsCount: 0,
      assignedTenantsCount: 0,
    };

    this.plans.push(newPlan);
    return { ...newPlan };
  }

  async updatePlan(id: string, input: UpdatePlanInput): Promise<LicensePlan> {
    await mockDelay(400);

    const index = this.plans.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Plan with ID ${id} not found.`);
    }

    if (!input.name?.trim()) {
      throw new Error('Plan Name is required.');
    }
    if (input.level === undefined || isNaN(input.level) || input.level < 0) {
      throw new Error('Plan Level is required and must be a non-negative whole number.');
    }
    if (!input.maxStores || input.maxStores < 1) {
      throw new Error('Maximum Stores must be a positive whole number.');
    }
    if (!input.maxUsers || input.maxUsers < 1) {
      throw new Error('Maximum Users must be a positive whole number.');
    }

    // Check unique level among other plans
    const levelConflict = this.plans.some((p) => p.level === input.level && p.id !== id);
    if (levelConflict) {
      throw new Error(`Plan Level ${input.level} is already assigned to another plan. Plan levels must be unique.`);
    }

    const today = new Date().toISOString().split('T')[0];
    const updatedPlan: LicensePlan = {
      ...this.plans[index],
      name: input.name.trim(),
      description: input.description?.trim() || '',
      level: Math.floor(input.level),
      maxStores: Math.floor(input.maxStores),
      maxUsers: Math.floor(input.maxUsers),
      updatedAt: today,
    };

    this.plans[index] = updatedPlan;
    return { ...updatedPlan };
  }

  async changePlanStatus(id: string, status: PlanStatus): Promise<LicensePlan> {
    await mockDelay(350);

    const index = this.plans.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Plan with ID ${id} not found.`);
    }

    const today = new Date().toISOString().split('T')[0];
    this.plans[index] = {
      ...this.plans[index],
      status,
      updatedAt: today,
    };

    return { ...this.plans[index] };
  }

  async resetToDefaults(): Promise<LicensePlan[]> {
    await mockDelay(300);
    this.plans = [...DEFAULT_PLANS];
    return [...this.plans];
  }
}

export const licensePlanService = new MockLicensePlanService();
