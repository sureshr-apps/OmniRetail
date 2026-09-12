import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export enum AppUserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
};

export enum LicenseEventType {
  ASSIGNED = "ASSIGNED",
  PLAN_CHANGED = "PLAN_CHANGED",
  COMMERCIAL_TERMS_MODIFIED = "COMMERCIAL_TERMS_MODIFIED",
  RENEWED = "RENEWED",
};

export enum LicensePlanStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
};

export enum MembershipStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
};

export enum OrganizationStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
};

export enum ProvisioningAttemptStatus {
  IN_PROGRESS = "IN_PROGRESS",
  SUCCEEDED = "SUCCEEDED",
  FAILED_RETRYABLE = "FAILED_RETRYABLE",
  FAILED_TERMINAL = "FAILED_TERMINAL",
  REQUIRES_RECONCILIATION = "REQUIRES_RECONCILIATION",
};



export interface AppUser_Key {
  id: UUIDString;
  __typename?: 'AppUser_Key';
}

export interface AssignOrganizationLicenseTrustedData {
  organizationLicense_insert: OrganizationLicense_Key;
  licenseHistory_insert: LicenseHistory_Key;
  auditEvent_insert: AuditEvent_Key;
}

export interface AssignOrganizationLicenseTrustedVariables {
  id: UUIDString;
  organizationId: UUIDString;
  planId: UUIDString;
  startDate: DateString;
  expiryDate: DateString;
  negotiatedPrice: number;
  currency: string;
  historyId: UUIDString;
  planCode: string;
  planName: string;
  planLevel: number;
  maxStores: number;
  maxUsers: number;
  auditId: UUIDString;
  actorFirebaseUid: string;
  requestId: string;
}

export interface AuditEvent_Key {
  id: UUIDString;
  __typename?: 'AuditEvent_Key';
}

export interface BootstrapMasterAdminData {
  appUser_upsert: AppUser_Key;
  userRole_upsert: UserRole_Key;
  auditEvent_upsert: AuditEvent_Key;
}

export interface BootstrapMasterAdminVariables {
  userId: UUIDString;
  firebaseUid: string;
  username: string;
  email: string;
  displayName: string;
  phone?: string | null;
  roleId: UUIDString;
  auditId: UUIDString;
  requestId: string;
}

export interface ChangeLicensePlanStatusData {
  licensePlan_update?: LicensePlan_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface ChangeLicensePlanStatusVariables {
  id: UUIDString;
  status: LicensePlanStatus;
  action: string;
  auditId: UUIDString;
  requestId: string;
}

export interface ChangeOrganizationAdministratorStatusData {
  appUser_update?: AppUser_Key | null;
  organizationMembership_update?: OrganizationMembership_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface ChangeOrganizationAdministratorStatusVariables {
  organizationId: UUIDString;
  userId: UUIDString;
  status: AppUserStatus;
  membershipStatus: MembershipStatus;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid?: string | null;
  action?: string | null;
}

export interface ChangeOrganizationLicensePlanTrustedData {
  organizationLicense_update?: OrganizationLicense_Key | null;
  licenseHistory_insert: LicenseHistory_Key;
  auditEvent_insert: AuditEvent_Key;
}

export interface ChangeOrganizationLicensePlanTrustedVariables {
  id: UUIDString;
  organizationId: UUIDString;
  planId: UUIDString;
  startDate: DateString;
  expiryDate: DateString;
  negotiatedPrice: number;
  currency: string;
  historyId: UUIDString;
  planCode: string;
  planName: string;
  planLevel: number;
  maxStores: number;
  maxUsers: number;
  auditId: UUIDString;
  actorFirebaseUid: string;
  requestId: string;
  changes?: unknown | null;
}

export interface ChangeOrganizationStatusData {
  organization_update?: Organization_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface ChangeOrganizationStatusVariables {
  id: UUIDString;
  status: OrganizationStatus;
  action: string;
  auditId: UUIDString;
  requestId: string;
}

export interface ClaimLifecycleIdempotencyData {
  lifecycleIdempotency_insert: LifecycleIdempotency_Key;
}

export interface ClaimLifecycleIdempotencyVariables {
  idempotencyKey: string;
  operationType: string;
  requestFingerprint: string;
}

export interface CompleteLifecycleIdempotencyData {
  lifecycleIdempotency_update?: LifecycleIdempotency_Key | null;
}

export interface CompleteLifecycleIdempotencyVariables {
  idempotencyKey: string;
  status: ProvisioningAttemptStatus;
  resultReference?: string | null;
}

export interface CreateLicensePlanData {
  licensePlan_insert: LicensePlan_Key;
  auditEvent_insert: AuditEvent_Key;
}

export interface CreateLicensePlanVariables {
  planCode: string;
  name: string;
  description?: string | null;
  level: number;
  maxStores: number;
  maxUsers: number;
  auditId: UUIDString;
  requestId: string;
}

export interface CreateOrganizationData {
  organization_insert: Organization_Key;
  auditEvent_insert: AuditEvent_Key;
}

export interface CreateOrganizationVariables {
  organizationCode: string;
  businessName: string;
  legalEntityName?: string | null;
  taxId?: string | null;
  primaryContactName: string;
  email: string;
  phone: string;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  timezone: string;
  currency: string;
  auditId: UUIDString;
  requestId: string;
}

export interface DeleteLicensePlanData {
  licensePlan_delete?: LicensePlan_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface DeleteLicensePlanTrustedData {
  licensePlan_delete?: LicensePlan_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface DeleteLicensePlanTrustedVariables {
  id: UUIDString;
  auditId: UUIDString;
  requestId: string;
  actorFirebaseUid: string;
}

export interface DeleteLicensePlanVariables {
  id: UUIDString;
  auditId: UUIDString;
  requestId: string;
}

export interface GetAppUserByFirebaseUidData {
  appUsers: ({
    id: UUIDString;
    firebaseUid: string;
    username: string;
    email: string;
    displayName: string;
    phone?: string | null;
    status: AppUserStatus;
  } & AppUser_Key)[];
}

export interface GetAppUserByFirebaseUidVariables {
  firebaseUid: string;
}

export interface GetAppUserForBootstrapData {
  appUsers: ({
    id: UUIDString;
    firebaseUid: string;
    username: string;
    email: string;
    displayName: string;
    phone?: string | null;
    status: AppUserStatus;
  } & AppUser_Key)[];
}

export interface GetAppUserForBootstrapVariables {
  firebaseUid: string;
}

export interface GetCurrentAppUserData {
  appUsers: ({
    id: UUIDString;
    firebaseUid: string;
    username: string;
    email: string;
    displayName: string;
    phone?: string | null;
    status: AppUserStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & AppUser_Key)[];
}

export interface GetCurrentUserAuthorizationData {
  appUsers: ({
    id: UUIDString;
    firebaseUid: string;
    username: string;
    email: string;
    displayName: string;
    phone?: string | null;
    status: AppUserStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    userRoles_on_user: ({
      role: {
        code: string;
        name: string;
        scope: RoleScope;
        rolePermissions_on_role: ({
          permission: {
            code: string;
          };
        })[];
      };
    })[];
  } & AppUser_Key)[];
}

export interface GetLicensePlanData {
  licensePlan?: {
    id: UUIDString;
    planCode: string;
    name: string;
    description?: string | null;
    level: number;
    maxStores: number;
    maxUsers: number;
    status: LicensePlanStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & LicensePlan_Key;
}

export interface GetLicensePlanReferencesTrustedData {
  organizationLicenses: ({
    id: UUIDString;
  } & OrganizationLicense_Key)[];
  licenseHistories: ({
    id: UUIDString;
  } & LicenseHistory_Key)[];
}

export interface GetLicensePlanReferencesTrustedVariables {
  id: UUIDString;
}

export interface GetLicensePlanTrustedData {
  licensePlan?: {
    id: UUIDString;
    planCode: string;
    name: string;
    description?: string | null;
    level: number;
    maxStores: number;
    maxUsers: number;
    status: LicensePlanStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & LicensePlan_Key;
}

export interface GetLicensePlanTrustedVariables {
  id: UUIDString;
}

export interface GetLicensePlanVariables {
  id: UUIDString;
}

export interface GetLifecycleIdempotencyData {
  lifecycleIdempotency?: {
    idempotencyKey: string;
    operationType: string;
    status: ProvisioningAttemptStatus;
    requestFingerprint: string;
    resultReference?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    completedAt?: TimestampString | null;
  } & LifecycleIdempotency_Key;
}

export interface GetLifecycleIdempotencyVariables {
  idempotencyKey: string;
}

export interface GetOrganizationAdministratorData {
  organizationMemberships: ({
    createdAt: TimestampString;
    status: MembershipStatus;
    user: {
      id: UUIDString;
      username: string;
      email: string;
      displayName: string;
      phone?: string | null;
      status: AppUserStatus;
      createdAt: TimestampString;
      updatedAt: TimestampString;
      lastLoginAt?: TimestampString | null;
    } & AppUser_Key;
  })[];
}

export interface GetOrganizationAdministratorVariables {
  organizationId: UUIDString;
  userId: UUIDString;
}

export interface GetOrganizationData {
  organization?: {
    id: UUIDString;
    organizationCode: string;
    businessName: string;
    legalEntityName?: string | null;
    taxId?: string | null;
    primaryContactName: string;
    email: string;
    phone: string;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    postalCode?: string | null;
    timezone: string;
    currency: string;
    status: OrganizationStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Organization_Key;
}

export interface GetOrganizationLicenseData {
  organizationLicenses: ({
    id: UUIDString;
    organization: {
      id: UUIDString;
    } & Organization_Key;
    plan: {
      id: UUIDString;
      planCode: string;
      name: string;
      level: number;
      maxStores: number;
      maxUsers: number;
      status: LicensePlanStatus;
    } & LicensePlan_Key;
    startDate: DateString;
    expiryDate: DateString;
    negotiatedPrice: number;
    currency: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & OrganizationLicense_Key)[];
}

export interface GetOrganizationLicenseHistoryData {
  licenseHistories: ({
    id: UUIDString;
    license: {
      id: UUIDString;
    } & OrganizationLicense_Key;
    organization: {
      id: UUIDString;
    } & Organization_Key;
    eventType: LicenseEventType;
    eventAt: TimestampString;
    plan: {
      id: UUIDString;
      planCode: string;
      name: string;
      level: number;
      maxStores: number;
      maxUsers: number;
    } & LicensePlan_Key;
    planCode: string;
    planName: string;
    planLevel: number;
    maxStores: number;
    maxUsers: number;
    startDate: DateString;
    expiryDate: DateString;
    negotiatedPrice: number;
    currency: string;
    changes?: unknown | null;
  } & LicenseHistory_Key)[];
}

export interface GetOrganizationLicenseHistoryPublicData {
  licenseHistories: ({
    id: UUIDString;
    license: {
      id: UUIDString;
    } & OrganizationLicense_Key;
    organization: {
      id: UUIDString;
    } & Organization_Key;
    eventType: LicenseEventType;
    eventAt: TimestampString;
    plan: {
      id: UUIDString;
      planCode: string;
      name: string;
      level: number;
      maxStores: number;
      maxUsers: number;
    } & LicensePlan_Key;
    planCode: string;
    planName: string;
    planLevel: number;
    maxStores: number;
    maxUsers: number;
    startDate: DateString;
    expiryDate: DateString;
    negotiatedPrice: number;
    currency: string;
    changes?: unknown | null;
  } & LicenseHistory_Key)[];
}

export interface GetOrganizationLicenseHistoryPublicVariables {
  organizationId: UUIDString;
}

export interface GetOrganizationLicenseHistoryVariables {
  organizationId: UUIDString;
}

export interface GetOrganizationLicensePublicData {
  organizationLicenses: ({
    id: UUIDString;
    organization: {
      id: UUIDString;
    } & Organization_Key;
    plan: {
      id: UUIDString;
      planCode: string;
      name: string;
      level: number;
      maxStores: number;
      maxUsers: number;
      status: LicensePlanStatus;
    } & LicensePlan_Key;
    startDate: DateString;
    expiryDate: DateString;
    negotiatedPrice: number;
    currency: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & OrganizationLicense_Key)[];
}

export interface GetOrganizationLicensePublicVariables {
  organizationId: UUIDString;
}

export interface GetOrganizationLicenseTrustedData {
  organizationLicenses: ({
    id: UUIDString;
    organization: {
      id: UUIDString;
    } & Organization_Key;
    plan: {
      id: UUIDString;
      planCode: string;
      name: string;
      level: number;
      maxStores: number;
      maxUsers: number;
      status: LicensePlanStatus;
    } & LicensePlan_Key;
    startDate: DateString;
    expiryDate: DateString;
    negotiatedPrice: number;
    currency: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & OrganizationLicense_Key)[];
}

export interface GetOrganizationLicenseTrustedVariables {
  organizationId: UUIDString;
}

export interface GetOrganizationLicenseVariables {
  organizationId: UUIDString;
}

export interface GetOrganizationTrustedData {
  organization?: {
    id: UUIDString;
    organizationCode: string;
    businessName: string;
    legalEntityName?: string | null;
    taxId?: string | null;
    primaryContactName: string;
    email: string;
    phone: string;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    postalCode?: string | null;
    timezone: string;
    currency: string;
    status: OrganizationStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Organization_Key;
}

export interface GetOrganizationTrustedVariables {
  id: UUIDString;
}

export interface GetOrganizationVariables {
  id: UUIDString;
}

export interface GetUserAuthorizationByFirebaseUidData {
  appUsers: ({
    id: UUIDString;
    firebaseUid: string;
    username: string;
    email: string;
    displayName: string;
    phone?: string | null;
    status: AppUserStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    userRoles_on_user: ({
      role: {
        code: string;
        name: string;
        scope: RoleScope;
        rolePermissions_on_role: ({
          permission: {
            code: string;
          };
        })[];
      };
    })[];
  } & AppUser_Key)[];
}

export interface GetUserAuthorizationByFirebaseUidVariables {
  firebaseUid: string;
}

export interface LicenseHistory_Key {
  id: UUIDString;
  __typename?: 'LicenseHistory_Key';
}

export interface LicensePlan_Key {
  id: UUIDString;
  __typename?: 'LicensePlan_Key';
}

export interface LifecycleIdempotency_Key {
  idempotencyKey: string;
  __typename?: 'LifecycleIdempotency_Key';
}

export interface ListLicensePlansData {
  licensePlans: ({
    id: UUIDString;
    planCode: string;
    name: string;
    description?: string | null;
    level: number;
    maxStores: number;
    maxUsers: number;
    status: LicensePlanStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & LicensePlan_Key)[];
}

export interface ListOrganizationAdministratorsData {
  organizationMemberships: ({
    createdAt: TimestampString;
    status: MembershipStatus;
    user: {
      id: UUIDString;
      username: string;
      email: string;
      displayName: string;
      phone?: string | null;
      status: AppUserStatus;
      createdAt: TimestampString;
      updatedAt: TimestampString;
      lastLoginAt?: TimestampString | null;
    } & AppUser_Key;
  })[];
}

export interface ListOrganizationAdministratorsVariables {
  organizationId: UUIDString;
}

export interface ListOrganizationLicensePlanAssignmentsData {
  organizationLicenses: ({
    plan: {
      id: UUIDString;
    } & LicensePlan_Key;
  })[];
}

export interface ListOrganizationsData {
  organizations: ({
    id: UUIDString;
    organizationCode: string;
    businessName: string;
    legalEntityName?: string | null;
    taxId?: string | null;
    primaryContactName: string;
    email: string;
    phone: string;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    postalCode?: string | null;
    timezone: string;
    currency: string;
    status: OrganizationStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Organization_Key)[];
}

export interface ListOrganizationsTrustedData {
  organizations: ({
    id: UUIDString;
    organizationCode: string;
    businessName: string;
    legalEntityName?: string | null;
    taxId?: string | null;
    primaryContactName: string;
    email: string;
    phone: string;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    postalCode?: string | null;
    timezone: string;
    currency: string;
    status: OrganizationStatus;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Organization_Key)[];
}

export interface ModifyOrganizationCommercialTermsTrustedData {
  organizationLicense_update?: OrganizationLicense_Key | null;
  licenseHistory_insert: LicenseHistory_Key;
  auditEvent_insert: AuditEvent_Key;
}

export interface ModifyOrganizationCommercialTermsTrustedVariables {
  id: UUIDString;
  organizationId: UUIDString;
  planId: UUIDString;
  startDate: DateString;
  expiryDate: DateString;
  negotiatedPrice: number;
  currency: string;
  historyId: UUIDString;
  planCode: string;
  planName: string;
  planLevel: number;
  maxStores: number;
  maxUsers: number;
  auditId: UUIDString;
  actorFirebaseUid: string;
  requestId: string;
  changes?: unknown | null;
}

export interface OrganizationLicense_Key {
  id: UUIDString;
  __typename?: 'OrganizationLicense_Key';
}

export interface OrganizationMembership_Key {
  organizationId: UUIDString;
  userId: UUIDString;
  __typename?: 'OrganizationMembership_Key';
}

export interface Organization_Key {
  id: UUIDString;
  __typename?: 'Organization_Key';
}

export interface Permission_Key {
  id: UUIDString;
  __typename?: 'Permission_Key';
}

export interface ProvisionOrganizationAdministratorData {
  appUser_insert: AppUser_Key;
  organizationMembership_insert: OrganizationMembership_Key;
  auditEvent_insert: AuditEvent_Key;
}

export interface ProvisionOrganizationAdministratorVariables {
  userId: UUIDString;
  firebaseUid: string;
  username: string;
  email: string;
  displayName: string;
  phone: string;
  organizationId: UUIDString;
  roleId: UUIDString;
  auditId: UUIDString;
  requestId: string;
}

export interface ProvisioningReconciliation_Key {
  id: UUIDString;
  __typename?: 'ProvisioningReconciliation_Key';
}

export interface RecordAdministratorSecurityEventData {
  auditEvent_insert: AuditEvent_Key;
}

export interface RecordAdministratorSecurityEventVariables {
  auditId: UUIDString;
  actorFirebaseUid: string;
  action: string;
  targetId: UUIDString;
  organizationId: UUIDString;
  requestId: string;
}

export interface RecordPasswordChangeData {
  auditEvent_insert: AuditEvent_Key;
}

export interface RecordPasswordChangeVariables {
  userId: UUIDString;
  auditId: UUIDString;
  requestId: string;
}

export interface RecordProvisioningReconciliationData {
  provisioningReconciliation_insert: ProvisioningReconciliation_Key;
}

export interface RecordProvisioningReconciliationVariables {
  idempotencyKey: string;
  firebaseUid: string;
  errorClass: string;
}

export interface RecordSuccessfulLoginData {
  appUser_update?: AppUser_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface RecordSuccessfulLoginVariables {
  userId: UUIDString;
  auditId: UUIDString;
  requestId: string;
}

export interface RenewOrganizationLicenseTrustedData {
  organizationLicense_update?: OrganizationLicense_Key | null;
  licenseHistory_insert: LicenseHistory_Key;
  auditEvent_insert: AuditEvent_Key;
}

export interface RenewOrganizationLicenseTrustedVariables {
  id: UUIDString;
  organizationId: UUIDString;
  planId: UUIDString;
  startDate: DateString;
  expiryDate: DateString;
  negotiatedPrice: number;
  currency: string;
  historyId: UUIDString;
  planCode: string;
  planName: string;
  planLevel: number;
  maxStores: number;
  maxUsers: number;
  auditId: UUIDString;
  actorFirebaseUid: string;
  requestId: string;
  changes?: unknown | null;
}

export interface ResolveOrganizationAdministratorIdentityData {
  organizationMembership?: {
    organizationId: UUIDString;
    userId: UUIDString;
    status: MembershipStatus;
    user: {
      id: UUIDString;
      firebaseUid: string;
      status: AppUserStatus;
      email: string;
    } & AppUser_Key;
  } & OrganizationMembership_Key;
}

export interface ResolveOrganizationAdministratorIdentityVariables {
  organizationId: UUIDString;
  appUserId: UUIDString;
}

export interface ResolveUsernameLoginData {
  appUsers: ({
    id: UUIDString;
    firebaseUid: string;
    email: string;
    status: AppUserStatus;
  } & AppUser_Key)[];
}

export interface ResolveUsernameLoginVariables {
  username: string;
}

export interface RolePermission_Key {
  roleId: UUIDString;
  permissionId: UUIDString;
  __typename?: 'RolePermission_Key';
}

export interface Role_Key {
  id: UUIDString;
  __typename?: 'Role_Key';
}

export interface UpdateAppUserProfileData {
  appUser_update?: AppUser_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface UpdateAppUserProfileVariables {
  userId: UUIDString;
  displayName: string;
  phone?: string | null;
  auditId: UUIDString;
  requestId: string;
}

export interface UpdateLicensePlanData {
  licensePlan_update?: LicensePlan_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface UpdateLicensePlanVariables {
  id: UUIDString;
  name: string;
  description?: string | null;
  level: number;
  maxStores: number;
  maxUsers: number;
  auditId: UUIDString;
  requestId: string;
}

export interface UpdateOrganizationAdministratorData {
  appUser_update?: AppUser_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface UpdateOrganizationAdministratorVariables {
  organizationId: UUIDString;
  userId: UUIDString;
  displayName: string;
  phone: string;
  auditId: UUIDString;
  requestId: string;
}

export interface UpdateOrganizationData {
  organization_update?: Organization_Key | null;
  auditEvent_insert: AuditEvent_Key;
}

export interface UpdateOrganizationVariables {
  id: UUIDString;
  businessName: string;
  legalEntityName?: string | null;
  taxId?: string | null;
  primaryContactName: string;
  email: string;
  phone: string;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  timezone: string;
  currency: string;
  auditId: UUIDString;
  requestId: string;
}

export interface UserRole_Key {
  userId: UUIDString;
  roleId: UUIDString;
  __typename?: 'UserRole_Key';
}

interface GetCurrentUserAuthorizationRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserAuthorizationData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentUserAuthorizationData, undefined>;
  operationName: string;
}
export const getCurrentUserAuthorizationRef: GetCurrentUserAuthorizationRef;

export function getCurrentUserAuthorization(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserAuthorizationData, undefined>;
export function getCurrentUserAuthorization(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserAuthorizationData, undefined>;

interface GetUserAuthorizationByFirebaseUidRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserAuthorizationByFirebaseUidVariables): QueryRef<GetUserAuthorizationByFirebaseUidData, GetUserAuthorizationByFirebaseUidVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserAuthorizationByFirebaseUidVariables): QueryRef<GetUserAuthorizationByFirebaseUidData, GetUserAuthorizationByFirebaseUidVariables>;
  operationName: string;
}
export const getUserAuthorizationByFirebaseUidRef: GetUserAuthorizationByFirebaseUidRef;

export function getUserAuthorizationByFirebaseUid(vars: GetUserAuthorizationByFirebaseUidVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserAuthorizationByFirebaseUidData, GetUserAuthorizationByFirebaseUidVariables>;
export function getUserAuthorizationByFirebaseUid(dc: DataConnect, vars: GetUserAuthorizationByFirebaseUidVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserAuthorizationByFirebaseUidData, GetUserAuthorizationByFirebaseUidVariables>;

interface ResolveUsernameLoginRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ResolveUsernameLoginVariables): QueryRef<ResolveUsernameLoginData, ResolveUsernameLoginVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ResolveUsernameLoginVariables): QueryRef<ResolveUsernameLoginData, ResolveUsernameLoginVariables>;
  operationName: string;
}
export const resolveUsernameLoginRef: ResolveUsernameLoginRef;

export function resolveUsernameLogin(vars: ResolveUsernameLoginVariables, options?: ExecuteQueryOptions): QueryPromise<ResolveUsernameLoginData, ResolveUsernameLoginVariables>;
export function resolveUsernameLogin(dc: DataConnect, vars: ResolveUsernameLoginVariables, options?: ExecuteQueryOptions): QueryPromise<ResolveUsernameLoginData, ResolveUsernameLoginVariables>;

interface RecordSuccessfulLoginRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordSuccessfulLoginVariables): MutationRef<RecordSuccessfulLoginData, RecordSuccessfulLoginVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RecordSuccessfulLoginVariables): MutationRef<RecordSuccessfulLoginData, RecordSuccessfulLoginVariables>;
  operationName: string;
}
export const recordSuccessfulLoginRef: RecordSuccessfulLoginRef;

export function recordSuccessfulLogin(vars: RecordSuccessfulLoginVariables): MutationPromise<RecordSuccessfulLoginData, RecordSuccessfulLoginVariables>;
export function recordSuccessfulLogin(dc: DataConnect, vars: RecordSuccessfulLoginVariables): MutationPromise<RecordSuccessfulLoginData, RecordSuccessfulLoginVariables>;

interface UpdateAppUserProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAppUserProfileVariables): MutationRef<UpdateAppUserProfileData, UpdateAppUserProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateAppUserProfileVariables): MutationRef<UpdateAppUserProfileData, UpdateAppUserProfileVariables>;
  operationName: string;
}
export const updateAppUserProfileRef: UpdateAppUserProfileRef;

export function updateAppUserProfile(vars: UpdateAppUserProfileVariables): MutationPromise<UpdateAppUserProfileData, UpdateAppUserProfileVariables>;
export function updateAppUserProfile(dc: DataConnect, vars: UpdateAppUserProfileVariables): MutationPromise<UpdateAppUserProfileData, UpdateAppUserProfileVariables>;

interface RecordPasswordChangeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordPasswordChangeVariables): MutationRef<RecordPasswordChangeData, RecordPasswordChangeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RecordPasswordChangeVariables): MutationRef<RecordPasswordChangeData, RecordPasswordChangeVariables>;
  operationName: string;
}
export const recordPasswordChangeRef: RecordPasswordChangeRef;

export function recordPasswordChange(vars: RecordPasswordChangeVariables): MutationPromise<RecordPasswordChangeData, RecordPasswordChangeVariables>;
export function recordPasswordChange(dc: DataConnect, vars: RecordPasswordChangeVariables): MutationPromise<RecordPasswordChangeData, RecordPasswordChangeVariables>;

interface GetAppUserForBootstrapRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAppUserForBootstrapVariables): QueryRef<GetAppUserForBootstrapData, GetAppUserForBootstrapVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAppUserForBootstrapVariables): QueryRef<GetAppUserForBootstrapData, GetAppUserForBootstrapVariables>;
  operationName: string;
}
export const getAppUserForBootstrapRef: GetAppUserForBootstrapRef;

export function getAppUserForBootstrap(vars: GetAppUserForBootstrapVariables, options?: ExecuteQueryOptions): QueryPromise<GetAppUserForBootstrapData, GetAppUserForBootstrapVariables>;
export function getAppUserForBootstrap(dc: DataConnect, vars: GetAppUserForBootstrapVariables, options?: ExecuteQueryOptions): QueryPromise<GetAppUserForBootstrapData, GetAppUserForBootstrapVariables>;

interface BootstrapMasterAdminRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: BootstrapMasterAdminVariables): MutationRef<BootstrapMasterAdminData, BootstrapMasterAdminVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: BootstrapMasterAdminVariables): MutationRef<BootstrapMasterAdminData, BootstrapMasterAdminVariables>;
  operationName: string;
}
export const bootstrapMasterAdminRef: BootstrapMasterAdminRef;

export function bootstrapMasterAdmin(vars: BootstrapMasterAdminVariables): MutationPromise<BootstrapMasterAdminData, BootstrapMasterAdminVariables>;
export function bootstrapMasterAdmin(dc: DataConnect, vars: BootstrapMasterAdminVariables): MutationPromise<BootstrapMasterAdminData, BootstrapMasterAdminVariables>;

interface GetCurrentAppUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentAppUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentAppUserData, undefined>;
  operationName: string;
}
export const getCurrentAppUserRef: GetCurrentAppUserRef;

export function getCurrentAppUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentAppUserData, undefined>;
export function getCurrentAppUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentAppUserData, undefined>;

interface GetAppUserByFirebaseUidRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAppUserByFirebaseUidVariables): QueryRef<GetAppUserByFirebaseUidData, GetAppUserByFirebaseUidVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAppUserByFirebaseUidVariables): QueryRef<GetAppUserByFirebaseUidData, GetAppUserByFirebaseUidVariables>;
  operationName: string;
}
export const getAppUserByFirebaseUidRef: GetAppUserByFirebaseUidRef;

export function getAppUserByFirebaseUid(vars: GetAppUserByFirebaseUidVariables, options?: ExecuteQueryOptions): QueryPromise<GetAppUserByFirebaseUidData, GetAppUserByFirebaseUidVariables>;
export function getAppUserByFirebaseUid(dc: DataConnect, vars: GetAppUserByFirebaseUidVariables, options?: ExecuteQueryOptions): QueryPromise<GetAppUserByFirebaseUidData, GetAppUserByFirebaseUidVariables>;

interface ListLicensePlansRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListLicensePlansData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListLicensePlansData, undefined>;
  operationName: string;
}
export const listLicensePlansRef: ListLicensePlansRef;

export function listLicensePlans(options?: ExecuteQueryOptions): QueryPromise<ListLicensePlansData, undefined>;
export function listLicensePlans(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListLicensePlansData, undefined>;

interface ListOrganizationLicensePlanAssignmentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListOrganizationLicensePlanAssignmentsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListOrganizationLicensePlanAssignmentsData, undefined>;
  operationName: string;
}
export const listOrganizationLicensePlanAssignmentsRef: ListOrganizationLicensePlanAssignmentsRef;

export function listOrganizationLicensePlanAssignments(options?: ExecuteQueryOptions): QueryPromise<ListOrganizationLicensePlanAssignmentsData, undefined>;
export function listOrganizationLicensePlanAssignments(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListOrganizationLicensePlanAssignmentsData, undefined>;

interface GetLicensePlanRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLicensePlanVariables): QueryRef<GetLicensePlanData, GetLicensePlanVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetLicensePlanVariables): QueryRef<GetLicensePlanData, GetLicensePlanVariables>;
  operationName: string;
}
export const getLicensePlanRef: GetLicensePlanRef;

export function getLicensePlan(vars: GetLicensePlanVariables, options?: ExecuteQueryOptions): QueryPromise<GetLicensePlanData, GetLicensePlanVariables>;
export function getLicensePlan(dc: DataConnect, vars: GetLicensePlanVariables, options?: ExecuteQueryOptions): QueryPromise<GetLicensePlanData, GetLicensePlanVariables>;

interface GetLicensePlanTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLicensePlanTrustedVariables): QueryRef<GetLicensePlanTrustedData, GetLicensePlanTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetLicensePlanTrustedVariables): QueryRef<GetLicensePlanTrustedData, GetLicensePlanTrustedVariables>;
  operationName: string;
}
export const getLicensePlanTrustedRef: GetLicensePlanTrustedRef;

export function getLicensePlanTrusted(vars: GetLicensePlanTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetLicensePlanTrustedData, GetLicensePlanTrustedVariables>;
export function getLicensePlanTrusted(dc: DataConnect, vars: GetLicensePlanTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetLicensePlanTrustedData, GetLicensePlanTrustedVariables>;

interface CreateLicensePlanRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateLicensePlanVariables): MutationRef<CreateLicensePlanData, CreateLicensePlanVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateLicensePlanVariables): MutationRef<CreateLicensePlanData, CreateLicensePlanVariables>;
  operationName: string;
}
export const createLicensePlanRef: CreateLicensePlanRef;

export function createLicensePlan(vars: CreateLicensePlanVariables): MutationPromise<CreateLicensePlanData, CreateLicensePlanVariables>;
export function createLicensePlan(dc: DataConnect, vars: CreateLicensePlanVariables): MutationPromise<CreateLicensePlanData, CreateLicensePlanVariables>;

interface UpdateLicensePlanRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateLicensePlanVariables): MutationRef<UpdateLicensePlanData, UpdateLicensePlanVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateLicensePlanVariables): MutationRef<UpdateLicensePlanData, UpdateLicensePlanVariables>;
  operationName: string;
}
export const updateLicensePlanRef: UpdateLicensePlanRef;

export function updateLicensePlan(vars: UpdateLicensePlanVariables): MutationPromise<UpdateLicensePlanData, UpdateLicensePlanVariables>;
export function updateLicensePlan(dc: DataConnect, vars: UpdateLicensePlanVariables): MutationPromise<UpdateLicensePlanData, UpdateLicensePlanVariables>;

interface ChangeLicensePlanStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeLicensePlanStatusVariables): MutationRef<ChangeLicensePlanStatusData, ChangeLicensePlanStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ChangeLicensePlanStatusVariables): MutationRef<ChangeLicensePlanStatusData, ChangeLicensePlanStatusVariables>;
  operationName: string;
}
export const changeLicensePlanStatusRef: ChangeLicensePlanStatusRef;

export function changeLicensePlanStatus(vars: ChangeLicensePlanStatusVariables): MutationPromise<ChangeLicensePlanStatusData, ChangeLicensePlanStatusVariables>;
export function changeLicensePlanStatus(dc: DataConnect, vars: ChangeLicensePlanStatusVariables): MutationPromise<ChangeLicensePlanStatusData, ChangeLicensePlanStatusVariables>;

interface DeleteLicensePlanRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteLicensePlanVariables): MutationRef<DeleteLicensePlanData, DeleteLicensePlanVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteLicensePlanVariables): MutationRef<DeleteLicensePlanData, DeleteLicensePlanVariables>;
  operationName: string;
}
export const deleteLicensePlanRef: DeleteLicensePlanRef;

export function deleteLicensePlan(vars: DeleteLicensePlanVariables): MutationPromise<DeleteLicensePlanData, DeleteLicensePlanVariables>;
export function deleteLicensePlan(dc: DataConnect, vars: DeleteLicensePlanVariables): MutationPromise<DeleteLicensePlanData, DeleteLicensePlanVariables>;

interface GetLicensePlanReferencesTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLicensePlanReferencesTrustedVariables): QueryRef<GetLicensePlanReferencesTrustedData, GetLicensePlanReferencesTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetLicensePlanReferencesTrustedVariables): QueryRef<GetLicensePlanReferencesTrustedData, GetLicensePlanReferencesTrustedVariables>;
  operationName: string;
}
export const getLicensePlanReferencesTrustedRef: GetLicensePlanReferencesTrustedRef;

export function getLicensePlanReferencesTrusted(vars: GetLicensePlanReferencesTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetLicensePlanReferencesTrustedData, GetLicensePlanReferencesTrustedVariables>;
export function getLicensePlanReferencesTrusted(dc: DataConnect, vars: GetLicensePlanReferencesTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetLicensePlanReferencesTrustedData, GetLicensePlanReferencesTrustedVariables>;

interface DeleteLicensePlanTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteLicensePlanTrustedVariables): MutationRef<DeleteLicensePlanTrustedData, DeleteLicensePlanTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteLicensePlanTrustedVariables): MutationRef<DeleteLicensePlanTrustedData, DeleteLicensePlanTrustedVariables>;
  operationName: string;
}
export const deleteLicensePlanTrustedRef: DeleteLicensePlanTrustedRef;

export function deleteLicensePlanTrusted(vars: DeleteLicensePlanTrustedVariables): MutationPromise<DeleteLicensePlanTrustedData, DeleteLicensePlanTrustedVariables>;
export function deleteLicensePlanTrusted(dc: DataConnect, vars: DeleteLicensePlanTrustedVariables): MutationPromise<DeleteLicensePlanTrustedData, DeleteLicensePlanTrustedVariables>;

interface ListOrganizationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListOrganizationsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListOrganizationsData, undefined>;
  operationName: string;
}
export const listOrganizationsRef: ListOrganizationsRef;

export function listOrganizations(options?: ExecuteQueryOptions): QueryPromise<ListOrganizationsData, undefined>;
export function listOrganizations(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListOrganizationsData, undefined>;

interface GetOrganizationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationVariables): QueryRef<GetOrganizationData, GetOrganizationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOrganizationVariables): QueryRef<GetOrganizationData, GetOrganizationVariables>;
  operationName: string;
}
export const getOrganizationRef: GetOrganizationRef;

export function getOrganization(vars: GetOrganizationVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationData, GetOrganizationVariables>;
export function getOrganization(dc: DataConnect, vars: GetOrganizationVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationData, GetOrganizationVariables>;

interface GetOrganizationTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationTrustedVariables): QueryRef<GetOrganizationTrustedData, GetOrganizationTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOrganizationTrustedVariables): QueryRef<GetOrganizationTrustedData, GetOrganizationTrustedVariables>;
  operationName: string;
}
export const getOrganizationTrustedRef: GetOrganizationTrustedRef;

export function getOrganizationTrusted(vars: GetOrganizationTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationTrustedData, GetOrganizationTrustedVariables>;
export function getOrganizationTrusted(dc: DataConnect, vars: GetOrganizationTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationTrustedData, GetOrganizationTrustedVariables>;

interface ListOrganizationAdministratorsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListOrganizationAdministratorsVariables): QueryRef<ListOrganizationAdministratorsData, ListOrganizationAdministratorsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListOrganizationAdministratorsVariables): QueryRef<ListOrganizationAdministratorsData, ListOrganizationAdministratorsVariables>;
  operationName: string;
}
export const listOrganizationAdministratorsRef: ListOrganizationAdministratorsRef;

export function listOrganizationAdministrators(vars: ListOrganizationAdministratorsVariables, options?: ExecuteQueryOptions): QueryPromise<ListOrganizationAdministratorsData, ListOrganizationAdministratorsVariables>;
export function listOrganizationAdministrators(dc: DataConnect, vars: ListOrganizationAdministratorsVariables, options?: ExecuteQueryOptions): QueryPromise<ListOrganizationAdministratorsData, ListOrganizationAdministratorsVariables>;

interface GetOrganizationAdministratorRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationAdministratorVariables): QueryRef<GetOrganizationAdministratorData, GetOrganizationAdministratorVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOrganizationAdministratorVariables): QueryRef<GetOrganizationAdministratorData, GetOrganizationAdministratorVariables>;
  operationName: string;
}
export const getOrganizationAdministratorRef: GetOrganizationAdministratorRef;

export function getOrganizationAdministrator(vars: GetOrganizationAdministratorVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationAdministratorData, GetOrganizationAdministratorVariables>;
export function getOrganizationAdministrator(dc: DataConnect, vars: GetOrganizationAdministratorVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationAdministratorData, GetOrganizationAdministratorVariables>;

interface ProvisionOrganizationAdministratorRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ProvisionOrganizationAdministratorVariables): MutationRef<ProvisionOrganizationAdministratorData, ProvisionOrganizationAdministratorVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ProvisionOrganizationAdministratorVariables): MutationRef<ProvisionOrganizationAdministratorData, ProvisionOrganizationAdministratorVariables>;
  operationName: string;
}
export const provisionOrganizationAdministratorRef: ProvisionOrganizationAdministratorRef;

export function provisionOrganizationAdministrator(vars: ProvisionOrganizationAdministratorVariables): MutationPromise<ProvisionOrganizationAdministratorData, ProvisionOrganizationAdministratorVariables>;
export function provisionOrganizationAdministrator(dc: DataConnect, vars: ProvisionOrganizationAdministratorVariables): MutationPromise<ProvisionOrganizationAdministratorData, ProvisionOrganizationAdministratorVariables>;

interface UpdateOrganizationAdministratorRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateOrganizationAdministratorVariables): MutationRef<UpdateOrganizationAdministratorData, UpdateOrganizationAdministratorVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateOrganizationAdministratorVariables): MutationRef<UpdateOrganizationAdministratorData, UpdateOrganizationAdministratorVariables>;
  operationName: string;
}
export const updateOrganizationAdministratorRef: UpdateOrganizationAdministratorRef;

export function updateOrganizationAdministrator(vars: UpdateOrganizationAdministratorVariables): MutationPromise<UpdateOrganizationAdministratorData, UpdateOrganizationAdministratorVariables>;
export function updateOrganizationAdministrator(dc: DataConnect, vars: UpdateOrganizationAdministratorVariables): MutationPromise<UpdateOrganizationAdministratorData, UpdateOrganizationAdministratorVariables>;

interface ChangeOrganizationAdministratorStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeOrganizationAdministratorStatusVariables): MutationRef<ChangeOrganizationAdministratorStatusData, ChangeOrganizationAdministratorStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ChangeOrganizationAdministratorStatusVariables): MutationRef<ChangeOrganizationAdministratorStatusData, ChangeOrganizationAdministratorStatusVariables>;
  operationName: string;
}
export const changeOrganizationAdministratorStatusRef: ChangeOrganizationAdministratorStatusRef;

export function changeOrganizationAdministratorStatus(vars: ChangeOrganizationAdministratorStatusVariables): MutationPromise<ChangeOrganizationAdministratorStatusData, ChangeOrganizationAdministratorStatusVariables>;
export function changeOrganizationAdministratorStatus(dc: DataConnect, vars: ChangeOrganizationAdministratorStatusVariables): MutationPromise<ChangeOrganizationAdministratorStatusData, ChangeOrganizationAdministratorStatusVariables>;

interface ResolveOrganizationAdministratorIdentityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ResolveOrganizationAdministratorIdentityVariables): QueryRef<ResolveOrganizationAdministratorIdentityData, ResolveOrganizationAdministratorIdentityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ResolveOrganizationAdministratorIdentityVariables): QueryRef<ResolveOrganizationAdministratorIdentityData, ResolveOrganizationAdministratorIdentityVariables>;
  operationName: string;
}
export const resolveOrganizationAdministratorIdentityRef: ResolveOrganizationAdministratorIdentityRef;

export function resolveOrganizationAdministratorIdentity(vars: ResolveOrganizationAdministratorIdentityVariables, options?: ExecuteQueryOptions): QueryPromise<ResolveOrganizationAdministratorIdentityData, ResolveOrganizationAdministratorIdentityVariables>;
export function resolveOrganizationAdministratorIdentity(dc: DataConnect, vars: ResolveOrganizationAdministratorIdentityVariables, options?: ExecuteQueryOptions): QueryPromise<ResolveOrganizationAdministratorIdentityData, ResolveOrganizationAdministratorIdentityVariables>;

interface RecordAdministratorSecurityEventRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordAdministratorSecurityEventVariables): MutationRef<RecordAdministratorSecurityEventData, RecordAdministratorSecurityEventVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RecordAdministratorSecurityEventVariables): MutationRef<RecordAdministratorSecurityEventData, RecordAdministratorSecurityEventVariables>;
  operationName: string;
}
export const recordAdministratorSecurityEventRef: RecordAdministratorSecurityEventRef;

export function recordAdministratorSecurityEvent(vars: RecordAdministratorSecurityEventVariables): MutationPromise<RecordAdministratorSecurityEventData, RecordAdministratorSecurityEventVariables>;
export function recordAdministratorSecurityEvent(dc: DataConnect, vars: RecordAdministratorSecurityEventVariables): MutationPromise<RecordAdministratorSecurityEventData, RecordAdministratorSecurityEventVariables>;

interface GetLifecycleIdempotencyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLifecycleIdempotencyVariables): QueryRef<GetLifecycleIdempotencyData, GetLifecycleIdempotencyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetLifecycleIdempotencyVariables): QueryRef<GetLifecycleIdempotencyData, GetLifecycleIdempotencyVariables>;
  operationName: string;
}
export const getLifecycleIdempotencyRef: GetLifecycleIdempotencyRef;

export function getLifecycleIdempotency(vars: GetLifecycleIdempotencyVariables, options?: ExecuteQueryOptions): QueryPromise<GetLifecycleIdempotencyData, GetLifecycleIdempotencyVariables>;
export function getLifecycleIdempotency(dc: DataConnect, vars: GetLifecycleIdempotencyVariables, options?: ExecuteQueryOptions): QueryPromise<GetLifecycleIdempotencyData, GetLifecycleIdempotencyVariables>;

interface GetOrganizationLicenseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationLicenseVariables): QueryRef<GetOrganizationLicenseData, GetOrganizationLicenseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOrganizationLicenseVariables): QueryRef<GetOrganizationLicenseData, GetOrganizationLicenseVariables>;
  operationName: string;
}
export const getOrganizationLicenseRef: GetOrganizationLicenseRef;

export function getOrganizationLicense(vars: GetOrganizationLicenseVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicenseData, GetOrganizationLicenseVariables>;
export function getOrganizationLicense(dc: DataConnect, vars: GetOrganizationLicenseVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicenseData, GetOrganizationLicenseVariables>;

interface GetOrganizationLicenseTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationLicenseTrustedVariables): QueryRef<GetOrganizationLicenseTrustedData, GetOrganizationLicenseTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOrganizationLicenseTrustedVariables): QueryRef<GetOrganizationLicenseTrustedData, GetOrganizationLicenseTrustedVariables>;
  operationName: string;
}
export const getOrganizationLicenseTrustedRef: GetOrganizationLicenseTrustedRef;

export function getOrganizationLicenseTrusted(vars: GetOrganizationLicenseTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicenseTrustedData, GetOrganizationLicenseTrustedVariables>;
export function getOrganizationLicenseTrusted(dc: DataConnect, vars: GetOrganizationLicenseTrustedVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicenseTrustedData, GetOrganizationLicenseTrustedVariables>;

interface GetOrganizationLicenseHistoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationLicenseHistoryVariables): QueryRef<GetOrganizationLicenseHistoryData, GetOrganizationLicenseHistoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOrganizationLicenseHistoryVariables): QueryRef<GetOrganizationLicenseHistoryData, GetOrganizationLicenseHistoryVariables>;
  operationName: string;
}
export const getOrganizationLicenseHistoryRef: GetOrganizationLicenseHistoryRef;

export function getOrganizationLicenseHistory(vars: GetOrganizationLicenseHistoryVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicenseHistoryData, GetOrganizationLicenseHistoryVariables>;
export function getOrganizationLicenseHistory(dc: DataConnect, vars: GetOrganizationLicenseHistoryVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicenseHistoryData, GetOrganizationLicenseHistoryVariables>;

interface GetOrganizationLicensePublicRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationLicensePublicVariables): QueryRef<GetOrganizationLicensePublicData, GetOrganizationLicensePublicVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOrganizationLicensePublicVariables): QueryRef<GetOrganizationLicensePublicData, GetOrganizationLicensePublicVariables>;
  operationName: string;
}
export const getOrganizationLicensePublicRef: GetOrganizationLicensePublicRef;

export function getOrganizationLicensePublic(vars: GetOrganizationLicensePublicVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicensePublicData, GetOrganizationLicensePublicVariables>;
export function getOrganizationLicensePublic(dc: DataConnect, vars: GetOrganizationLicensePublicVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicensePublicData, GetOrganizationLicensePublicVariables>;

interface GetOrganizationLicenseHistoryPublicRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationLicenseHistoryPublicVariables): QueryRef<GetOrganizationLicenseHistoryPublicData, GetOrganizationLicenseHistoryPublicVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOrganizationLicenseHistoryPublicVariables): QueryRef<GetOrganizationLicenseHistoryPublicData, GetOrganizationLicenseHistoryPublicVariables>;
  operationName: string;
}
export const getOrganizationLicenseHistoryPublicRef: GetOrganizationLicenseHistoryPublicRef;

export function getOrganizationLicenseHistoryPublic(vars: GetOrganizationLicenseHistoryPublicVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicenseHistoryPublicData, GetOrganizationLicenseHistoryPublicVariables>;
export function getOrganizationLicenseHistoryPublic(dc: DataConnect, vars: GetOrganizationLicenseHistoryPublicVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationLicenseHistoryPublicData, GetOrganizationLicenseHistoryPublicVariables>;

interface ListOrganizationsTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListOrganizationsTrustedData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListOrganizationsTrustedData, undefined>;
  operationName: string;
}
export const listOrganizationsTrustedRef: ListOrganizationsTrustedRef;

export function listOrganizationsTrusted(options?: ExecuteQueryOptions): QueryPromise<ListOrganizationsTrustedData, undefined>;
export function listOrganizationsTrusted(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListOrganizationsTrustedData, undefined>;

interface AssignOrganizationLicenseTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignOrganizationLicenseTrustedVariables): MutationRef<AssignOrganizationLicenseTrustedData, AssignOrganizationLicenseTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AssignOrganizationLicenseTrustedVariables): MutationRef<AssignOrganizationLicenseTrustedData, AssignOrganizationLicenseTrustedVariables>;
  operationName: string;
}
export const assignOrganizationLicenseTrustedRef: AssignOrganizationLicenseTrustedRef;

export function assignOrganizationLicenseTrusted(vars: AssignOrganizationLicenseTrustedVariables): MutationPromise<AssignOrganizationLicenseTrustedData, AssignOrganizationLicenseTrustedVariables>;
export function assignOrganizationLicenseTrusted(dc: DataConnect, vars: AssignOrganizationLicenseTrustedVariables): MutationPromise<AssignOrganizationLicenseTrustedData, AssignOrganizationLicenseTrustedVariables>;

interface ChangeOrganizationLicensePlanTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeOrganizationLicensePlanTrustedVariables): MutationRef<ChangeOrganizationLicensePlanTrustedData, ChangeOrganizationLicensePlanTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ChangeOrganizationLicensePlanTrustedVariables): MutationRef<ChangeOrganizationLicensePlanTrustedData, ChangeOrganizationLicensePlanTrustedVariables>;
  operationName: string;
}
export const changeOrganizationLicensePlanTrustedRef: ChangeOrganizationLicensePlanTrustedRef;

export function changeOrganizationLicensePlanTrusted(vars: ChangeOrganizationLicensePlanTrustedVariables): MutationPromise<ChangeOrganizationLicensePlanTrustedData, ChangeOrganizationLicensePlanTrustedVariables>;
export function changeOrganizationLicensePlanTrusted(dc: DataConnect, vars: ChangeOrganizationLicensePlanTrustedVariables): MutationPromise<ChangeOrganizationLicensePlanTrustedData, ChangeOrganizationLicensePlanTrustedVariables>;

interface ModifyOrganizationCommercialTermsTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ModifyOrganizationCommercialTermsTrustedVariables): MutationRef<ModifyOrganizationCommercialTermsTrustedData, ModifyOrganizationCommercialTermsTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ModifyOrganizationCommercialTermsTrustedVariables): MutationRef<ModifyOrganizationCommercialTermsTrustedData, ModifyOrganizationCommercialTermsTrustedVariables>;
  operationName: string;
}
export const modifyOrganizationCommercialTermsTrustedRef: ModifyOrganizationCommercialTermsTrustedRef;

export function modifyOrganizationCommercialTermsTrusted(vars: ModifyOrganizationCommercialTermsTrustedVariables): MutationPromise<ModifyOrganizationCommercialTermsTrustedData, ModifyOrganizationCommercialTermsTrustedVariables>;
export function modifyOrganizationCommercialTermsTrusted(dc: DataConnect, vars: ModifyOrganizationCommercialTermsTrustedVariables): MutationPromise<ModifyOrganizationCommercialTermsTrustedData, ModifyOrganizationCommercialTermsTrustedVariables>;

interface RenewOrganizationLicenseTrustedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RenewOrganizationLicenseTrustedVariables): MutationRef<RenewOrganizationLicenseTrustedData, RenewOrganizationLicenseTrustedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RenewOrganizationLicenseTrustedVariables): MutationRef<RenewOrganizationLicenseTrustedData, RenewOrganizationLicenseTrustedVariables>;
  operationName: string;
}
export const renewOrganizationLicenseTrustedRef: RenewOrganizationLicenseTrustedRef;

export function renewOrganizationLicenseTrusted(vars: RenewOrganizationLicenseTrustedVariables): MutationPromise<RenewOrganizationLicenseTrustedData, RenewOrganizationLicenseTrustedVariables>;
export function renewOrganizationLicenseTrusted(dc: DataConnect, vars: RenewOrganizationLicenseTrustedVariables): MutationPromise<RenewOrganizationLicenseTrustedData, RenewOrganizationLicenseTrustedVariables>;

interface ClaimLifecycleIdempotencyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ClaimLifecycleIdempotencyVariables): MutationRef<ClaimLifecycleIdempotencyData, ClaimLifecycleIdempotencyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ClaimLifecycleIdempotencyVariables): MutationRef<ClaimLifecycleIdempotencyData, ClaimLifecycleIdempotencyVariables>;
  operationName: string;
}
export const claimLifecycleIdempotencyRef: ClaimLifecycleIdempotencyRef;

export function claimLifecycleIdempotency(vars: ClaimLifecycleIdempotencyVariables): MutationPromise<ClaimLifecycleIdempotencyData, ClaimLifecycleIdempotencyVariables>;
export function claimLifecycleIdempotency(dc: DataConnect, vars: ClaimLifecycleIdempotencyVariables): MutationPromise<ClaimLifecycleIdempotencyData, ClaimLifecycleIdempotencyVariables>;

interface CompleteLifecycleIdempotencyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CompleteLifecycleIdempotencyVariables): MutationRef<CompleteLifecycleIdempotencyData, CompleteLifecycleIdempotencyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CompleteLifecycleIdempotencyVariables): MutationRef<CompleteLifecycleIdempotencyData, CompleteLifecycleIdempotencyVariables>;
  operationName: string;
}
export const completeLifecycleIdempotencyRef: CompleteLifecycleIdempotencyRef;

export function completeLifecycleIdempotency(vars: CompleteLifecycleIdempotencyVariables): MutationPromise<CompleteLifecycleIdempotencyData, CompleteLifecycleIdempotencyVariables>;
export function completeLifecycleIdempotency(dc: DataConnect, vars: CompleteLifecycleIdempotencyVariables): MutationPromise<CompleteLifecycleIdempotencyData, CompleteLifecycleIdempotencyVariables>;

interface RecordProvisioningReconciliationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordProvisioningReconciliationVariables): MutationRef<RecordProvisioningReconciliationData, RecordProvisioningReconciliationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RecordProvisioningReconciliationVariables): MutationRef<RecordProvisioningReconciliationData, RecordProvisioningReconciliationVariables>;
  operationName: string;
}
export const recordProvisioningReconciliationRef: RecordProvisioningReconciliationRef;

export function recordProvisioningReconciliation(vars: RecordProvisioningReconciliationVariables): MutationPromise<RecordProvisioningReconciliationData, RecordProvisioningReconciliationVariables>;
export function recordProvisioningReconciliation(dc: DataConnect, vars: RecordProvisioningReconciliationVariables): MutationPromise<RecordProvisioningReconciliationData, RecordProvisioningReconciliationVariables>;

interface CreateOrganizationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrganizationVariables): MutationRef<CreateOrganizationData, CreateOrganizationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateOrganizationVariables): MutationRef<CreateOrganizationData, CreateOrganizationVariables>;
  operationName: string;
}
export const createOrganizationRef: CreateOrganizationRef;

export function createOrganization(vars: CreateOrganizationVariables): MutationPromise<CreateOrganizationData, CreateOrganizationVariables>;
export function createOrganization(dc: DataConnect, vars: CreateOrganizationVariables): MutationPromise<CreateOrganizationData, CreateOrganizationVariables>;

interface UpdateOrganizationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateOrganizationVariables): MutationRef<UpdateOrganizationData, UpdateOrganizationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateOrganizationVariables): MutationRef<UpdateOrganizationData, UpdateOrganizationVariables>;
  operationName: string;
}
export const updateOrganizationRef: UpdateOrganizationRef;

export function updateOrganization(vars: UpdateOrganizationVariables): MutationPromise<UpdateOrganizationData, UpdateOrganizationVariables>;
export function updateOrganization(dc: DataConnect, vars: UpdateOrganizationVariables): MutationPromise<UpdateOrganizationData, UpdateOrganizationVariables>;

interface ChangeOrganizationStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ChangeOrganizationStatusVariables): MutationRef<ChangeOrganizationStatusData, ChangeOrganizationStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ChangeOrganizationStatusVariables): MutationRef<ChangeOrganizationStatusData, ChangeOrganizationStatusVariables>;
  operationName: string;
}
export const changeOrganizationStatusRef: ChangeOrganizationStatusRef;

export function changeOrganizationStatus(vars: ChangeOrganizationStatusVariables): MutationPromise<ChangeOrganizationStatusData, ChangeOrganizationStatusVariables>;
export function changeOrganizationStatus(dc: DataConnect, vars: ChangeOrganizationStatusVariables): MutationPromise<ChangeOrganizationStatusData, ChangeOrganizationStatusVariables>;

