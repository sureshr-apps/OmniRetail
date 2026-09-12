/**
 * Domain model and service contracts for License Plans.
 * 
 * Rules:
 * - Plans define capacity limits ONLY: Maximum Stores and Maximum Users.
 * - Plans do NOT have pricing, currencies, discounts, or billing cycles.
 * - Plan level defines upgrade/progression hierarchy.
 * - Internal ID is immutable.
 */

export type PlanStatus = 'active' | 'inactive';

export interface LicensePlan {
  id: string;
  /** Human-facing plan identifier; the UUID `id` remains internal. */
  planCode?: string;
  name: string;
  description: string;
  level: number;
  maxStores: number;
  maxUsers: number;
  status: PlanStatus;
  createdAt: string;
  updatedAt: string;
  assignedOrganizationsCount?: number;
  assignedTenantsCount?: number; // Kept for backward compatibility
}

export interface CreatePlanInput {
  name: string;
  description?: string;
  level: number;
  maxStores: number;
  maxUsers: number;
}

export interface UpdatePlanInput {
  name: string;
  description?: string;
  level: number;
  maxStores: number;
  maxUsers: number;
}

export interface PlanQuery {
  search?: string;
  status?: 'all' | 'active' | 'inactive';
  level?: 'all' | number;
}

export interface PlanFormErrors {
  name?: string;
  level?: string;
  maxStores?: string;
  maxUsers?: string;
  general?: string;
}
