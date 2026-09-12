import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;

export enum AppUserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
export enum LicenseEventType {
  ASSIGNED = "ASSIGNED",
  PLAN_CHANGED = "PLAN_CHANGED",
  COMMERCIAL_TERMS_MODIFIED = "COMMERCIAL_TERMS_MODIFIED",
  RENEWED = "RENEWED",
}
export enum LicensePlanStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
export enum MembershipStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
export enum OrganizationStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
}
export enum ProvisioningAttemptStatus {
  IN_PROGRESS = "IN_PROGRESS",
  SUCCEEDED = "SUCCEEDED",
  FAILED_RETRYABLE = "FAILED_RETRYABLE",
  FAILED_TERMINAL = "FAILED_TERMINAL",
  REQUIRES_RECONCILIATION = "REQUIRES_RECONCILIATION",
}

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

/** Generated Node Admin SDK operation action function for the 'GetCurrentUserAuthorization' Query. Allow users to execute without passing in DataConnect. */
export function getCurrentUserAuthorization(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<GetCurrentUserAuthorizationData>>;
/** Generated Node Admin SDK operation action function for the 'GetCurrentUserAuthorization' Query. Allow users to pass in custom DataConnect instances. */
export function getCurrentUserAuthorization(options?: OperationOptions): Promise<ExecuteOperationResponse<GetCurrentUserAuthorizationData>>;

/** Generated Node Admin SDK operation action function for the 'GetUserAuthorizationByFirebaseUid' Query. Allow users to execute without passing in DataConnect. */
export function getUserAuthorizationByFirebaseUid(dc: DataConnect, vars: GetUserAuthorizationByFirebaseUidVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetUserAuthorizationByFirebaseUidData>>;
/** Generated Node Admin SDK operation action function for the 'GetUserAuthorizationByFirebaseUid' Query. Allow users to pass in custom DataConnect instances. */
export function getUserAuthorizationByFirebaseUid(vars: GetUserAuthorizationByFirebaseUidVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetUserAuthorizationByFirebaseUidData>>;

/** Generated Node Admin SDK operation action function for the 'ResolveUsernameLogin' Query. Allow users to execute without passing in DataConnect. */
export function resolveUsernameLogin(dc: DataConnect, vars: ResolveUsernameLoginVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ResolveUsernameLoginData>>;
/** Generated Node Admin SDK operation action function for the 'ResolveUsernameLogin' Query. Allow users to pass in custom DataConnect instances. */
export function resolveUsernameLogin(vars: ResolveUsernameLoginVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ResolveUsernameLoginData>>;

/** Generated Node Admin SDK operation action function for the 'RecordSuccessfulLogin' Mutation. Allow users to execute without passing in DataConnect. */
export function recordSuccessfulLogin(dc: DataConnect, vars: RecordSuccessfulLoginVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RecordSuccessfulLoginData>>;
/** Generated Node Admin SDK operation action function for the 'RecordSuccessfulLogin' Mutation. Allow users to pass in custom DataConnect instances. */
export function recordSuccessfulLogin(vars: RecordSuccessfulLoginVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RecordSuccessfulLoginData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateAppUserProfile' Mutation. Allow users to execute without passing in DataConnect. */
export function updateAppUserProfile(dc: DataConnect, vars: UpdateAppUserProfileVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateAppUserProfileData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateAppUserProfile' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateAppUserProfile(vars: UpdateAppUserProfileVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateAppUserProfileData>>;

/** Generated Node Admin SDK operation action function for the 'RecordPasswordChange' Mutation. Allow users to execute without passing in DataConnect. */
export function recordPasswordChange(dc: DataConnect, vars: RecordPasswordChangeVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RecordPasswordChangeData>>;
/** Generated Node Admin SDK operation action function for the 'RecordPasswordChange' Mutation. Allow users to pass in custom DataConnect instances. */
export function recordPasswordChange(vars: RecordPasswordChangeVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RecordPasswordChangeData>>;

/** Generated Node Admin SDK operation action function for the 'GetAppUserForBootstrap' Query. Allow users to execute without passing in DataConnect. */
export function getAppUserForBootstrap(dc: DataConnect, vars: GetAppUserForBootstrapVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetAppUserForBootstrapData>>;
/** Generated Node Admin SDK operation action function for the 'GetAppUserForBootstrap' Query. Allow users to pass in custom DataConnect instances. */
export function getAppUserForBootstrap(vars: GetAppUserForBootstrapVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetAppUserForBootstrapData>>;

/** Generated Node Admin SDK operation action function for the 'BootstrapMasterAdmin' Mutation. Allow users to execute without passing in DataConnect. */
export function bootstrapMasterAdmin(dc: DataConnect, vars: BootstrapMasterAdminVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<BootstrapMasterAdminData>>;
/** Generated Node Admin SDK operation action function for the 'BootstrapMasterAdmin' Mutation. Allow users to pass in custom DataConnect instances. */
export function bootstrapMasterAdmin(vars: BootstrapMasterAdminVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<BootstrapMasterAdminData>>;

/** Generated Node Admin SDK operation action function for the 'GetCurrentAppUser' Query. Allow users to execute without passing in DataConnect. */
export function getCurrentAppUser(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<GetCurrentAppUserData>>;
/** Generated Node Admin SDK operation action function for the 'GetCurrentAppUser' Query. Allow users to pass in custom DataConnect instances. */
export function getCurrentAppUser(options?: OperationOptions): Promise<ExecuteOperationResponse<GetCurrentAppUserData>>;

/** Generated Node Admin SDK operation action function for the 'GetAppUserByFirebaseUid' Query. Allow users to execute without passing in DataConnect. */
export function getAppUserByFirebaseUid(dc: DataConnect, vars: GetAppUserByFirebaseUidVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetAppUserByFirebaseUidData>>;
/** Generated Node Admin SDK operation action function for the 'GetAppUserByFirebaseUid' Query. Allow users to pass in custom DataConnect instances. */
export function getAppUserByFirebaseUid(vars: GetAppUserByFirebaseUidVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetAppUserByFirebaseUidData>>;

/** Generated Node Admin SDK operation action function for the 'ListLicensePlans' Query. Allow users to execute without passing in DataConnect. */
export function listLicensePlans(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListLicensePlansData>>;
/** Generated Node Admin SDK operation action function for the 'ListLicensePlans' Query. Allow users to pass in custom DataConnect instances. */
export function listLicensePlans(options?: OperationOptions): Promise<ExecuteOperationResponse<ListLicensePlansData>>;

/** Generated Node Admin SDK operation action function for the 'ListOrganizationLicensePlanAssignments' Query. Allow users to execute without passing in DataConnect. */
export function listOrganizationLicensePlanAssignments(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListOrganizationLicensePlanAssignmentsData>>;
/** Generated Node Admin SDK operation action function for the 'ListOrganizationLicensePlanAssignments' Query. Allow users to pass in custom DataConnect instances. */
export function listOrganizationLicensePlanAssignments(options?: OperationOptions): Promise<ExecuteOperationResponse<ListOrganizationLicensePlanAssignmentsData>>;

/** Generated Node Admin SDK operation action function for the 'GetLicensePlan' Query. Allow users to execute without passing in DataConnect. */
export function getLicensePlan(dc: DataConnect, vars: GetLicensePlanVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetLicensePlanData>>;
/** Generated Node Admin SDK operation action function for the 'GetLicensePlan' Query. Allow users to pass in custom DataConnect instances. */
export function getLicensePlan(vars: GetLicensePlanVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetLicensePlanData>>;

/** Generated Node Admin SDK operation action function for the 'GetLicensePlanTrusted' Query. Allow users to execute without passing in DataConnect. */
export function getLicensePlanTrusted(dc: DataConnect, vars: GetLicensePlanTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetLicensePlanTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'GetLicensePlanTrusted' Query. Allow users to pass in custom DataConnect instances. */
export function getLicensePlanTrusted(vars: GetLicensePlanTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetLicensePlanTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'CreateLicensePlan' Mutation. Allow users to execute without passing in DataConnect. */
export function createLicensePlan(dc: DataConnect, vars: CreateLicensePlanVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateLicensePlanData>>;
/** Generated Node Admin SDK operation action function for the 'CreateLicensePlan' Mutation. Allow users to pass in custom DataConnect instances. */
export function createLicensePlan(vars: CreateLicensePlanVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateLicensePlanData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateLicensePlan' Mutation. Allow users to execute without passing in DataConnect. */
export function updateLicensePlan(dc: DataConnect, vars: UpdateLicensePlanVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateLicensePlanData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateLicensePlan' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateLicensePlan(vars: UpdateLicensePlanVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateLicensePlanData>>;

/** Generated Node Admin SDK operation action function for the 'ChangeLicensePlanStatus' Mutation. Allow users to execute without passing in DataConnect. */
export function changeLicensePlanStatus(dc: DataConnect, vars: ChangeLicensePlanStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeLicensePlanStatusData>>;
/** Generated Node Admin SDK operation action function for the 'ChangeLicensePlanStatus' Mutation. Allow users to pass in custom DataConnect instances. */
export function changeLicensePlanStatus(vars: ChangeLicensePlanStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeLicensePlanStatusData>>;

/** Generated Node Admin SDK operation action function for the 'ListOrganizations' Query. Allow users to execute without passing in DataConnect. */
export function listOrganizations(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListOrganizationsData>>;
/** Generated Node Admin SDK operation action function for the 'ListOrganizations' Query. Allow users to pass in custom DataConnect instances. */
export function listOrganizations(options?: OperationOptions): Promise<ExecuteOperationResponse<ListOrganizationsData>>;

/** Generated Node Admin SDK operation action function for the 'GetOrganization' Query. Allow users to execute without passing in DataConnect. */
export function getOrganization(dc: DataConnect, vars: GetOrganizationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationData>>;
/** Generated Node Admin SDK operation action function for the 'GetOrganization' Query. Allow users to pass in custom DataConnect instances. */
export function getOrganization(vars: GetOrganizationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationData>>;

/** Generated Node Admin SDK operation action function for the 'GetOrganizationTrusted' Query. Allow users to execute without passing in DataConnect. */
export function getOrganizationTrusted(dc: DataConnect, vars: GetOrganizationTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'GetOrganizationTrusted' Query. Allow users to pass in custom DataConnect instances. */
export function getOrganizationTrusted(vars: GetOrganizationTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'ListOrganizationAdministrators' Query. Allow users to execute without passing in DataConnect. */
export function listOrganizationAdministrators(dc: DataConnect, vars: ListOrganizationAdministratorsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListOrganizationAdministratorsData>>;
/** Generated Node Admin SDK operation action function for the 'ListOrganizationAdministrators' Query. Allow users to pass in custom DataConnect instances. */
export function listOrganizationAdministrators(vars: ListOrganizationAdministratorsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListOrganizationAdministratorsData>>;

/** Generated Node Admin SDK operation action function for the 'GetOrganizationAdministrator' Query. Allow users to execute without passing in DataConnect. */
export function getOrganizationAdministrator(dc: DataConnect, vars: GetOrganizationAdministratorVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationAdministratorData>>;
/** Generated Node Admin SDK operation action function for the 'GetOrganizationAdministrator' Query. Allow users to pass in custom DataConnect instances. */
export function getOrganizationAdministrator(vars: GetOrganizationAdministratorVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationAdministratorData>>;

/** Generated Node Admin SDK operation action function for the 'ProvisionOrganizationAdministrator' Mutation. Allow users to execute without passing in DataConnect. */
export function provisionOrganizationAdministrator(dc: DataConnect, vars: ProvisionOrganizationAdministratorVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ProvisionOrganizationAdministratorData>>;
/** Generated Node Admin SDK operation action function for the 'ProvisionOrganizationAdministrator' Mutation. Allow users to pass in custom DataConnect instances. */
export function provisionOrganizationAdministrator(vars: ProvisionOrganizationAdministratorVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ProvisionOrganizationAdministratorData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateOrganizationAdministrator' Mutation. Allow users to execute without passing in DataConnect. */
export function updateOrganizationAdministrator(dc: DataConnect, vars: UpdateOrganizationAdministratorVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateOrganizationAdministratorData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateOrganizationAdministrator' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateOrganizationAdministrator(vars: UpdateOrganizationAdministratorVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateOrganizationAdministratorData>>;

/** Generated Node Admin SDK operation action function for the 'ChangeOrganizationAdministratorStatus' Mutation. Allow users to execute without passing in DataConnect. */
export function changeOrganizationAdministratorStatus(dc: DataConnect, vars: ChangeOrganizationAdministratorStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeOrganizationAdministratorStatusData>>;
/** Generated Node Admin SDK operation action function for the 'ChangeOrganizationAdministratorStatus' Mutation. Allow users to pass in custom DataConnect instances. */
export function changeOrganizationAdministratorStatus(vars: ChangeOrganizationAdministratorStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeOrganizationAdministratorStatusData>>;

/** Generated Node Admin SDK operation action function for the 'ResolveOrganizationAdministratorIdentity' Query. Allow users to execute without passing in DataConnect. */
export function resolveOrganizationAdministratorIdentity(dc: DataConnect, vars: ResolveOrganizationAdministratorIdentityVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ResolveOrganizationAdministratorIdentityData>>;
/** Generated Node Admin SDK operation action function for the 'ResolveOrganizationAdministratorIdentity' Query. Allow users to pass in custom DataConnect instances. */
export function resolveOrganizationAdministratorIdentity(vars: ResolveOrganizationAdministratorIdentityVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ResolveOrganizationAdministratorIdentityData>>;

/** Generated Node Admin SDK operation action function for the 'RecordAdministratorSecurityEvent' Mutation. Allow users to execute without passing in DataConnect. */
export function recordAdministratorSecurityEvent(dc: DataConnect, vars: RecordAdministratorSecurityEventVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RecordAdministratorSecurityEventData>>;
/** Generated Node Admin SDK operation action function for the 'RecordAdministratorSecurityEvent' Mutation. Allow users to pass in custom DataConnect instances. */
export function recordAdministratorSecurityEvent(vars: RecordAdministratorSecurityEventVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RecordAdministratorSecurityEventData>>;

/** Generated Node Admin SDK operation action function for the 'GetLifecycleIdempotency' Query. Allow users to execute without passing in DataConnect. */
export function getLifecycleIdempotency(dc: DataConnect, vars: GetLifecycleIdempotencyVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetLifecycleIdempotencyData>>;
/** Generated Node Admin SDK operation action function for the 'GetLifecycleIdempotency' Query. Allow users to pass in custom DataConnect instances. */
export function getLifecycleIdempotency(vars: GetLifecycleIdempotencyVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetLifecycleIdempotencyData>>;

/** Generated Node Admin SDK operation action function for the 'GetOrganizationLicense' Query. Allow users to execute without passing in DataConnect. */
export function getOrganizationLicense(dc: DataConnect, vars: GetOrganizationLicenseVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationLicenseData>>;
/** Generated Node Admin SDK operation action function for the 'GetOrganizationLicense' Query. Allow users to pass in custom DataConnect instances. */
export function getOrganizationLicense(vars: GetOrganizationLicenseVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationLicenseData>>;

/** Generated Node Admin SDK operation action function for the 'GetOrganizationLicenseTrusted' Query. Allow users to execute without passing in DataConnect. */
export function getOrganizationLicenseTrusted(dc: DataConnect, vars: GetOrganizationLicenseTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationLicenseTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'GetOrganizationLicenseTrusted' Query. Allow users to pass in custom DataConnect instances. */
export function getOrganizationLicenseTrusted(vars: GetOrganizationLicenseTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationLicenseTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'GetOrganizationLicenseHistory' Query. Allow users to execute without passing in DataConnect. */
export function getOrganizationLicenseHistory(dc: DataConnect, vars: GetOrganizationLicenseHistoryVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationLicenseHistoryData>>;
/** Generated Node Admin SDK operation action function for the 'GetOrganizationLicenseHistory' Query. Allow users to pass in custom DataConnect instances. */
export function getOrganizationLicenseHistory(vars: GetOrganizationLicenseHistoryVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationLicenseHistoryData>>;

/** Generated Node Admin SDK operation action function for the 'GetOrganizationLicensePublic' Query. Allow users to execute without passing in DataConnect. */
export function getOrganizationLicensePublic(dc: DataConnect, vars: GetOrganizationLicensePublicVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationLicensePublicData>>;
/** Generated Node Admin SDK operation action function for the 'GetOrganizationLicensePublic' Query. Allow users to pass in custom DataConnect instances. */
export function getOrganizationLicensePublic(vars: GetOrganizationLicensePublicVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationLicensePublicData>>;

/** Generated Node Admin SDK operation action function for the 'GetOrganizationLicenseHistoryPublic' Query. Allow users to execute without passing in DataConnect. */
export function getOrganizationLicenseHistoryPublic(dc: DataConnect, vars: GetOrganizationLicenseHistoryPublicVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationLicenseHistoryPublicData>>;
/** Generated Node Admin SDK operation action function for the 'GetOrganizationLicenseHistoryPublic' Query. Allow users to pass in custom DataConnect instances. */
export function getOrganizationLicenseHistoryPublic(vars: GetOrganizationLicenseHistoryPublicVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetOrganizationLicenseHistoryPublicData>>;

/** Generated Node Admin SDK operation action function for the 'ListOrganizationsTrusted' Query. Allow users to execute without passing in DataConnect. */
export function listOrganizationsTrusted(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListOrganizationsTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'ListOrganizationsTrusted' Query. Allow users to pass in custom DataConnect instances. */
export function listOrganizationsTrusted(options?: OperationOptions): Promise<ExecuteOperationResponse<ListOrganizationsTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'AssignOrganizationLicenseTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function assignOrganizationLicenseTrusted(dc: DataConnect, vars: AssignOrganizationLicenseTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AssignOrganizationLicenseTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'AssignOrganizationLicenseTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function assignOrganizationLicenseTrusted(vars: AssignOrganizationLicenseTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AssignOrganizationLicenseTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'ChangeOrganizationLicensePlanTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function changeOrganizationLicensePlanTrusted(dc: DataConnect, vars: ChangeOrganizationLicensePlanTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeOrganizationLicensePlanTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'ChangeOrganizationLicensePlanTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function changeOrganizationLicensePlanTrusted(vars: ChangeOrganizationLicensePlanTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeOrganizationLicensePlanTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'ModifyOrganizationCommercialTermsTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function modifyOrganizationCommercialTermsTrusted(dc: DataConnect, vars: ModifyOrganizationCommercialTermsTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ModifyOrganizationCommercialTermsTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'ModifyOrganizationCommercialTermsTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function modifyOrganizationCommercialTermsTrusted(vars: ModifyOrganizationCommercialTermsTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ModifyOrganizationCommercialTermsTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'RenewOrganizationLicenseTrusted' Mutation. Allow users to execute without passing in DataConnect. */
export function renewOrganizationLicenseTrusted(dc: DataConnect, vars: RenewOrganizationLicenseTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RenewOrganizationLicenseTrustedData>>;
/** Generated Node Admin SDK operation action function for the 'RenewOrganizationLicenseTrusted' Mutation. Allow users to pass in custom DataConnect instances. */
export function renewOrganizationLicenseTrusted(vars: RenewOrganizationLicenseTrustedVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RenewOrganizationLicenseTrustedData>>;

/** Generated Node Admin SDK operation action function for the 'ClaimLifecycleIdempotency' Mutation. Allow users to execute without passing in DataConnect. */
export function claimLifecycleIdempotency(dc: DataConnect, vars: ClaimLifecycleIdempotencyVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ClaimLifecycleIdempotencyData>>;
/** Generated Node Admin SDK operation action function for the 'ClaimLifecycleIdempotency' Mutation. Allow users to pass in custom DataConnect instances. */
export function claimLifecycleIdempotency(vars: ClaimLifecycleIdempotencyVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ClaimLifecycleIdempotencyData>>;

/** Generated Node Admin SDK operation action function for the 'CompleteLifecycleIdempotency' Mutation. Allow users to execute without passing in DataConnect. */
export function completeLifecycleIdempotency(dc: DataConnect, vars: CompleteLifecycleIdempotencyVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CompleteLifecycleIdempotencyData>>;
/** Generated Node Admin SDK operation action function for the 'CompleteLifecycleIdempotency' Mutation. Allow users to pass in custom DataConnect instances. */
export function completeLifecycleIdempotency(vars: CompleteLifecycleIdempotencyVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CompleteLifecycleIdempotencyData>>;

/** Generated Node Admin SDK operation action function for the 'RecordProvisioningReconciliation' Mutation. Allow users to execute without passing in DataConnect. */
export function recordProvisioningReconciliation(dc: DataConnect, vars: RecordProvisioningReconciliationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RecordProvisioningReconciliationData>>;
/** Generated Node Admin SDK operation action function for the 'RecordProvisioningReconciliation' Mutation. Allow users to pass in custom DataConnect instances. */
export function recordProvisioningReconciliation(vars: RecordProvisioningReconciliationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RecordProvisioningReconciliationData>>;

/** Generated Node Admin SDK operation action function for the 'CreateOrganization' Mutation. Allow users to execute without passing in DataConnect. */
export function createOrganization(dc: DataConnect, vars: CreateOrganizationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateOrganizationData>>;
/** Generated Node Admin SDK operation action function for the 'CreateOrganization' Mutation. Allow users to pass in custom DataConnect instances. */
export function createOrganization(vars: CreateOrganizationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateOrganizationData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateOrganization' Mutation. Allow users to execute without passing in DataConnect. */
export function updateOrganization(dc: DataConnect, vars: UpdateOrganizationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateOrganizationData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateOrganization' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateOrganization(vars: UpdateOrganizationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateOrganizationData>>;

/** Generated Node Admin SDK operation action function for the 'ChangeOrganizationStatus' Mutation. Allow users to execute without passing in DataConnect. */
export function changeOrganizationStatus(dc: DataConnect, vars: ChangeOrganizationStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeOrganizationStatusData>>;
/** Generated Node Admin SDK operation action function for the 'ChangeOrganizationStatus' Mutation. Allow users to pass in custom DataConnect instances. */
export function changeOrganizationStatus(vars: ChangeOrganizationStatusVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ChangeOrganizationStatusData>>;

