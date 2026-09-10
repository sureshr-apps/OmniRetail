/**
 * Organization License domain types and service contracts.
 * 
 * Rules:
 * - Plans define entitlements (Maximum Stores, Maximum Users).
 * - Organization License defines which Plan an organization has, for what period, and at what negotiated price.
 * - Max Stores and Max Users cannot be overridden at organization level.
 * - Plans do NOT have fixed prices; prices are negotiated independently per organization agreement.
 * - License status is derived from start date and expiry date, never manually selected.
 * - History stores plan snapshots at event time. Historical records must not be affected by later plan edits.
 */

import { LicensePlan } from '@/features/plans/types';

export type DerivedLicenseStatus =
  | 'not_assigned'
  | 'not_yet_active'
  | 'active'
  | 'expiring_soon'
  | 'expired';

export interface OrganizationLicense {
  id: string;
  organizationId: string;
  planId: string;
  startDate: string; // YYYY-MM-DD
  expiryDate: string; // YYYY-MM-DD
  negotiatedPrice: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export type LicenseEventType =
  | 'assigned'
  | 'plan_changed'
  | 'commercial_terms_modified'
  | 'renewed';

export interface PlanSnapshot {
  planId: string;
  planName: string;
  planLevel: number;
  maxStores: number;
  maxUsers: number;
}

export interface LicenseChangeDiff {
  field: string;
  label: string;
  from: string | number;
  to: string | number;
}

export interface OrganizationLicenseHistory {
  id: string;
  organizationId: string;
  eventType: LicenseEventType;
  eventAt: string; // ISO 8601 string
  planSnapshot: PlanSnapshot;
  startDate: string;
  expiryDate: string;
  negotiatedPrice: number;
  currency: string;
  changes?: LicenseChangeDiff[];
}

export interface AssignLicenseInput {
  planId: string;
  startDate: string;
  expiryDate: string;
  negotiatedPrice: number;
  currency: string;
}

export interface ChangePlanInput {
  newPlanId: string;
  newNegotiatedPrice: number;
  currency: string;
}

export interface ModifyCommercialTermsInput {
  negotiatedPrice: number;
  currency: string;
}

export interface RenewLicenseInput {
  planId: string;
  newStartDate: string;
  newExpiryDate: string;
  negotiatedPrice: number;
  currency: string;
}

export interface EnrichedOrganizationLicense {
  license: OrganizationLicense | null;
  plan: LicensePlan | null;
  status: DerivedLicenseStatus;
}

export type LicenseWithPlan = EnrichedOrganizationLicense;
