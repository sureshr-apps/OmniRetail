import { DerivedLicenseStatus } from '../licenses/types';

export type OrganizationStatus = 'active' | 'suspended';

export type LicenseStatus = DerivedLicenseStatus;

export type LicensePlan = string;

export interface PrimaryAdminSummary {
  name: string;
  email: string;
  phone?: string;
  username?: string;
}

export interface BusinessContactInfo {
  primaryContactName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export interface Organization {
  id: string; // e.g., ORG-88219
  organizationCode?: string; // human-facing organization code
  name: string; // e.g., Punarva Fashion Hub
  legalEntityName: string;
  taxId: string;
  primaryAdmin?: PrimaryAdminSummary;
  licensePlan: LicensePlan;
  licenseStatus: LicenseStatus;
  licenseExpiryDate: string; // YYYY-MM-DD
  status: OrganizationStatus;
  createdDate: string; // YYYY-MM-DD
  contactInfo: BusinessContactInfo;
  timezone: string;
  currency: string;
  allowedStores?: number;
  activeStores?: number;
  posRegisters?: number;
}

export interface CreateOrganizationInput {
  name: string;
  legalEntityName?: string;
  taxId?: string;
  primaryContactName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  currency?: string;
  timezone?: string;
}

export interface UpdateOrganizationInput {
  name: string;
  legalEntityName?: string;
  taxId?: string;
  primaryContactName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  currency?: string;
  timezone?: string;
}

export type AdminStatus = 'active' | 'inactive';

export interface OrganizationAdministrator {
  id: string; // e.g., ADM-10291
  organizationId: string; // e.g., ORG-88219
  name: string;
  username: string;
  email: string;
  phone: string;
  status: AdminStatus;
  createdAt: string; // YYYY-MM-DD
  lastLoginAt: string | null; // e.g., '2026-09-08 14:22 IST' or null
}

export interface CreateAdminInput {
  name: string;
  username: string;
  email: string;
  phone: string;
}

export interface UpdateAdminInput {
  name: string;
  email: string;
  phone: string;
}

export interface OrganizationQuery {
  search?: string;
  organizationStatus?: OrganizationStatus | 'all';
  licenseStatus?: LicenseStatus | 'all';
  page: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
