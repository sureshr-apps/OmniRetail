import { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } from 'firebase/data-connect';

export const AppUserStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
}

export const CustomerStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
}

export const CustomerType = {
  INDIVIDUAL: "INDIVIDUAL",
  BUSINESS: "BUSINESS",
}

export const EmploymentStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
}

export const ExpenseApprovalStatus = {
  DRAFT: "DRAFT",
  PENDING_APPROVAL: "PENDING_APPROVAL",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
}

export const ExpenseStatus = {
  ACTIVE: "ACTIVE",
  VOIDED: "VOIDED",
}

export const InventoryAdjustmentMode = {
  INCREASE: "INCREASE",
  DECREASE: "DECREASE",
  RECONCILE: "RECONCILE",
}

export const LicenseEventType = {
  ASSIGNED: "ASSIGNED",
  PLAN_CHANGED: "PLAN_CHANGED",
  COMMERCIAL_TERMS_MODIFIED: "COMMERCIAL_TERMS_MODIFIED",
  RENEWED: "RENEWED",
}

export const LicensePlanStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
}

export const LoginAccessStatus = {
  ENABLED: "ENABLED",
  DISABLED: "DISABLED",
}

export const MembershipStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
}

export const OrganizationStatus = {
  ACTIVE: "ACTIVE",
  SUSPENDED: "SUSPENDED",
}

export const OutletStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
}

export const ProductStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
}

export const ProductType = {
  STOCKABLE: "STOCKABLE",
  SERVICE: "SERVICE",
  CONSUMABLE: "CONSUMABLE",
}

export const ProvisioningAttemptStatus = {
  IN_PROGRESS: "IN_PROGRESS",
  SUCCEEDED: "SUCCEEDED",
  FAILED_RETRYABLE: "FAILED_RETRYABLE",
  FAILED_TERMINAL: "FAILED_TERMINAL",
  REQUIRES_RECONCILIATION: "REQUIRES_RECONCILIATION",
}

export const PurchasePaymentStatus = {
  PAID: "PAID",
  PARTIALLY_PAID: "PARTIALLY_PAID",
  UNPAID: "UNPAID",
}

export const PurchaseReceiptStatus = {
  PENDING: "PENDING",
  PARTIALLY_RECEIVED: "PARTIALLY_RECEIVED",
  RECEIVED: "RECEIVED",
}

export const PurchaseStatus = {
  ACTIVE: "ACTIVE",
  DRAFT: "DRAFT",
  CANCELLED: "CANCELLED",
}

export const SaleStatus = {
  COMPLETED: "COMPLETED",
  PARTIAL_REFUND: "PARTIAL_REFUND",
  REFUNDED: "REFUNDED",
  VOIDED: "VOIDED",
}

export const SaleTenderType = {
  VISA: "VISA",
  MASTERCARD: "MASTERCARD",
  APPLE_PAY: "APPLE_PAY",
  CASH: "CASH",
  SPLIT: "SPLIT",
  REVERSAL: "REVERSAL",
  NONE: "NONE",
}

export const SupplierStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
}

export const connectorConfig = {
  connector: 'master-admin',
  service: 'omniretail-platform',
  location: 'asia-south1'
};
export const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider()
  }
};
export const getCurrentUserAuthorizationRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCurrentUserAuthorization');
}
getCurrentUserAuthorizationRef.operationName = 'GetCurrentUserAuthorization';

export function getCurrentUserAuthorization(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getCurrentUserAuthorizationRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getUserAuthorizationByFirebaseUidRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserAuthorizationByFirebaseUid', inputVars);
}
getUserAuthorizationByFirebaseUidRef.operationName = 'GetUserAuthorizationByFirebaseUid';

export function getUserAuthorizationByFirebaseUid(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getUserAuthorizationByFirebaseUidRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const resolveUsernameLoginRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ResolveUsernameLogin', inputVars);
}
resolveUsernameLoginRef.operationName = 'ResolveUsernameLogin';

export function resolveUsernameLogin(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(resolveUsernameLoginRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const recordSuccessfulLoginRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordSuccessfulLogin', inputVars);
}
recordSuccessfulLoginRef.operationName = 'RecordSuccessfulLogin';

export function recordSuccessfulLogin(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(recordSuccessfulLoginRef(dcInstance, inputVars));
}

export const updateAppUserProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAppUserProfile', inputVars);
}
updateAppUserProfileRef.operationName = 'UpdateAppUserProfile';

export function updateAppUserProfile(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateAppUserProfileRef(dcInstance, inputVars));
}

export const recordPasswordChangeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordPasswordChange', inputVars);
}
recordPasswordChangeRef.operationName = 'RecordPasswordChange';

export function recordPasswordChange(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(recordPasswordChangeRef(dcInstance, inputVars));
}

export const getAppUserForBootstrapRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAppUserForBootstrap', inputVars);
}
getAppUserForBootstrapRef.operationName = 'GetAppUserForBootstrap';

export function getAppUserForBootstrap(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getAppUserForBootstrapRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const bootstrapMasterAdminRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'BootstrapMasterAdmin', inputVars);
}
bootstrapMasterAdminRef.operationName = 'BootstrapMasterAdmin';

export function bootstrapMasterAdmin(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(bootstrapMasterAdminRef(dcInstance, inputVars));
}

export const getCurrentAppUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCurrentAppUser');
}
getCurrentAppUserRef.operationName = 'GetCurrentAppUser';

export function getCurrentAppUser(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getCurrentAppUserRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getAppUserByFirebaseUidRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAppUserByFirebaseUid', inputVars);
}
getAppUserByFirebaseUidRef.operationName = 'GetAppUserByFirebaseUid';

export function getAppUserByFirebaseUid(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getAppUserByFirebaseUidRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listLicensePlansRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListLicensePlans');
}
listLicensePlansRef.operationName = 'ListLicensePlans';

export function listLicensePlans(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listLicensePlansRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listOrganizationLicensePlanAssignmentsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListOrganizationLicensePlanAssignments');
}
listOrganizationLicensePlanAssignmentsRef.operationName = 'ListOrganizationLicensePlanAssignments';

export function listOrganizationLicensePlanAssignments(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listOrganizationLicensePlanAssignmentsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getLicensePlanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLicensePlan', inputVars);
}
getLicensePlanRef.operationName = 'GetLicensePlan';

export function getLicensePlan(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getLicensePlanRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getLicensePlanTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLicensePlanTrusted', inputVars);
}
getLicensePlanTrustedRef.operationName = 'GetLicensePlanTrusted';

export function getLicensePlanTrusted(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getLicensePlanTrustedRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const createLicensePlanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateLicensePlan', inputVars);
}
createLicensePlanRef.operationName = 'CreateLicensePlan';

export function createLicensePlan(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createLicensePlanRef(dcInstance, inputVars));
}

export const updateLicensePlanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateLicensePlan', inputVars);
}
updateLicensePlanRef.operationName = 'UpdateLicensePlan';

export function updateLicensePlan(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateLicensePlanRef(dcInstance, inputVars));
}

export const changeLicensePlanStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeLicensePlanStatus', inputVars);
}
changeLicensePlanStatusRef.operationName = 'ChangeLicensePlanStatus';

export function changeLicensePlanStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeLicensePlanStatusRef(dcInstance, inputVars));
}

export const deleteLicensePlanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteLicensePlan', inputVars);
}
deleteLicensePlanRef.operationName = 'DeleteLicensePlan';

export function deleteLicensePlan(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteLicensePlanRef(dcInstance, inputVars));
}

export const getLicensePlanReferencesTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLicensePlanReferencesTrusted', inputVars);
}
getLicensePlanReferencesTrustedRef.operationName = 'GetLicensePlanReferencesTrusted';

export function getLicensePlanReferencesTrusted(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getLicensePlanReferencesTrustedRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const deleteLicensePlanTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteLicensePlanTrusted', inputVars);
}
deleteLicensePlanTrustedRef.operationName = 'DeleteLicensePlanTrusted';

export function deleteLicensePlanTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteLicensePlanTrustedRef(dcInstance, inputVars));
}

export const listOrganizationsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListOrganizations');
}
listOrganizationsRef.operationName = 'ListOrganizations';

export function listOrganizations(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listOrganizationsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getOrganizationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrganization', inputVars);
}
getOrganizationRef.operationName = 'GetOrganization';

export function getOrganization(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOrganizationRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getOrganizationTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrganizationTrusted', inputVars);
}
getOrganizationTrustedRef.operationName = 'GetOrganizationTrusted';

export function getOrganizationTrusted(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOrganizationTrustedRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listOrganizationAdministratorsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListOrganizationAdministrators', inputVars);
}
listOrganizationAdministratorsRef.operationName = 'ListOrganizationAdministrators';

export function listOrganizationAdministrators(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listOrganizationAdministratorsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getOrganizationAdministratorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrganizationAdministrator', inputVars);
}
getOrganizationAdministratorRef.operationName = 'GetOrganizationAdministrator';

export function getOrganizationAdministrator(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOrganizationAdministratorRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const provisionOrganizationAdministratorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ProvisionOrganizationAdministrator', inputVars);
}
provisionOrganizationAdministratorRef.operationName = 'ProvisionOrganizationAdministrator';

export function provisionOrganizationAdministrator(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(provisionOrganizationAdministratorRef(dcInstance, inputVars));
}

export const ensureAppUserRoleTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EnsureAppUserRoleTrusted', inputVars);
}
ensureAppUserRoleTrustedRef.operationName = 'EnsureAppUserRoleTrusted';

export function ensureAppUserRoleTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(ensureAppUserRoleTrustedRef(dcInstance, inputVars));
}

export const updateOrganizationAdministratorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateOrganizationAdministrator', inputVars);
}
updateOrganizationAdministratorRef.operationName = 'UpdateOrganizationAdministrator';

export function updateOrganizationAdministrator(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateOrganizationAdministratorRef(dcInstance, inputVars));
}

export const changeOrganizationAdministratorStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeOrganizationAdministratorStatus', inputVars);
}
changeOrganizationAdministratorStatusRef.operationName = 'ChangeOrganizationAdministratorStatus';

export function changeOrganizationAdministratorStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeOrganizationAdministratorStatusRef(dcInstance, inputVars));
}

export const resolveOrganizationAdministratorIdentityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ResolveOrganizationAdministratorIdentity', inputVars);
}
resolveOrganizationAdministratorIdentityRef.operationName = 'ResolveOrganizationAdministratorIdentity';

export function resolveOrganizationAdministratorIdentity(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(resolveOrganizationAdministratorIdentityRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const recordAdministratorSecurityEventRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordAdministratorSecurityEvent', inputVars);
}
recordAdministratorSecurityEventRef.operationName = 'RecordAdministratorSecurityEvent';

export function recordAdministratorSecurityEvent(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(recordAdministratorSecurityEventRef(dcInstance, inputVars));
}

export const getLifecycleIdempotencyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLifecycleIdempotency', inputVars);
}
getLifecycleIdempotencyRef.operationName = 'GetLifecycleIdempotency';

export function getLifecycleIdempotency(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getLifecycleIdempotencyRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getOrganizationLicenseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrganizationLicense', inputVars);
}
getOrganizationLicenseRef.operationName = 'GetOrganizationLicense';

export function getOrganizationLicense(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOrganizationLicenseRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getOrganizationLicenseTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrganizationLicenseTrusted', inputVars);
}
getOrganizationLicenseTrustedRef.operationName = 'GetOrganizationLicenseTrusted';

export function getOrganizationLicenseTrusted(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOrganizationLicenseTrustedRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getOrganizationLicenseHistoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrganizationLicenseHistory', inputVars);
}
getOrganizationLicenseHistoryRef.operationName = 'GetOrganizationLicenseHistory';

export function getOrganizationLicenseHistory(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOrganizationLicenseHistoryRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getOrganizationLicensePublicRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrganizationLicensePublic', inputVars);
}
getOrganizationLicensePublicRef.operationName = 'GetOrganizationLicensePublic';

export function getOrganizationLicensePublic(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOrganizationLicensePublicRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getOrganizationLicenseHistoryPublicRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrganizationLicenseHistoryPublic', inputVars);
}
getOrganizationLicenseHistoryPublicRef.operationName = 'GetOrganizationLicenseHistoryPublic';

export function getOrganizationLicenseHistoryPublic(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOrganizationLicenseHistoryPublicRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listOrganizationsTrustedRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListOrganizationsTrusted');
}
listOrganizationsTrustedRef.operationName = 'ListOrganizationsTrusted';

export function listOrganizationsTrusted(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listOrganizationsTrustedRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listOrganizationUsersForDeletionTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListOrganizationUsersForDeletionTrusted', inputVars);
}
listOrganizationUsersForDeletionTrustedRef.operationName = 'ListOrganizationUsersForDeletionTrusted';

export function listOrganizationUsersForDeletionTrusted(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listOrganizationUsersForDeletionTrustedRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const deleteOrganizationTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteOrganizationTrusted', inputVars);
}
deleteOrganizationTrustedRef.operationName = 'DeleteOrganizationTrusted';

export function deleteOrganizationTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteOrganizationTrustedRef(dcInstance, inputVars));
}

export const deleteAppUserTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteAppUserTrusted', inputVars);
}
deleteAppUserTrustedRef.operationName = 'DeleteAppUserTrusted';

export function deleteAppUserTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteAppUserTrustedRef(dcInstance, inputVars));
}

export const assignOrganizationLicenseTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AssignOrganizationLicenseTrusted', inputVars);
}
assignOrganizationLicenseTrustedRef.operationName = 'AssignOrganizationLicenseTrusted';

export function assignOrganizationLicenseTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(assignOrganizationLicenseTrustedRef(dcInstance, inputVars));
}

export const changeOrganizationLicensePlanTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeOrganizationLicensePlanTrusted', inputVars);
}
changeOrganizationLicensePlanTrustedRef.operationName = 'ChangeOrganizationLicensePlanTrusted';

export function changeOrganizationLicensePlanTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeOrganizationLicensePlanTrustedRef(dcInstance, inputVars));
}

export const modifyOrganizationCommercialTermsTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ModifyOrganizationCommercialTermsTrusted', inputVars);
}
modifyOrganizationCommercialTermsTrustedRef.operationName = 'ModifyOrganizationCommercialTermsTrusted';

export function modifyOrganizationCommercialTermsTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(modifyOrganizationCommercialTermsTrustedRef(dcInstance, inputVars));
}

export const renewOrganizationLicenseTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RenewOrganizationLicenseTrusted', inputVars);
}
renewOrganizationLicenseTrustedRef.operationName = 'RenewOrganizationLicenseTrusted';

export function renewOrganizationLicenseTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(renewOrganizationLicenseTrustedRef(dcInstance, inputVars));
}

export const claimLifecycleIdempotencyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ClaimLifecycleIdempotency', inputVars);
}
claimLifecycleIdempotencyRef.operationName = 'ClaimLifecycleIdempotency';

export function claimLifecycleIdempotency(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(claimLifecycleIdempotencyRef(dcInstance, inputVars));
}

export const completeLifecycleIdempotencyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CompleteLifecycleIdempotency', inputVars);
}
completeLifecycleIdempotencyRef.operationName = 'CompleteLifecycleIdempotency';

export function completeLifecycleIdempotency(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(completeLifecycleIdempotencyRef(dcInstance, inputVars));
}

export const recordProvisioningReconciliationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordProvisioningReconciliation', inputVars);
}
recordProvisioningReconciliationRef.operationName = 'RecordProvisioningReconciliation';

export function recordProvisioningReconciliation(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(recordProvisioningReconciliationRef(dcInstance, inputVars));
}

export const createOrganizationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateOrganization', inputVars);
}
createOrganizationRef.operationName = 'CreateOrganization';

export function createOrganization(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createOrganizationRef(dcInstance, inputVars));
}

export const updateOrganizationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateOrganization', inputVars);
}
updateOrganizationRef.operationName = 'UpdateOrganization';

export function updateOrganization(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateOrganizationRef(dcInstance, inputVars));
}

export const changeOrganizationStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeOrganizationStatus', inputVars);
}
changeOrganizationStatusRef.operationName = 'ChangeOrganizationStatus';

export function changeOrganizationStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeOrganizationStatusRef(dcInstance, inputVars));
}

export const listTenantOutletsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTenantOutlets', inputVars);
}
listTenantOutletsRef.operationName = 'ListTenantOutlets';

export function listTenantOutlets(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTenantOutletsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listTenantEmployeesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTenantEmployees', inputVars);
}
listTenantEmployeesRef.operationName = 'ListTenantEmployees';

export function listTenantEmployees(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTenantEmployeesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listTenantServicePersonsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTenantServicePersons', inputVars);
}
listTenantServicePersonsRef.operationName = 'ListTenantServicePersons';

export function listTenantServicePersons(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTenantServicePersonsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listTenantProductsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTenantProducts', inputVars);
}
listTenantProductsRef.operationName = 'ListTenantProducts';

export function listTenantProducts(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTenantProductsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listTenantInventoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTenantInventory', inputVars);
}
listTenantInventoryRef.operationName = 'ListTenantInventory';

export function listTenantInventory(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTenantInventoryRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listTenantCustomersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTenantCustomers', inputVars);
}
listTenantCustomersRef.operationName = 'ListTenantCustomers';

export function listTenantCustomers(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTenantCustomersRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listTenantSuppliersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTenantSuppliers', inputVars);
}
listTenantSuppliersRef.operationName = 'ListTenantSuppliers';

export function listTenantSuppliers(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTenantSuppliersRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listTenantPurchasesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTenantPurchases', inputVars);
}
listTenantPurchasesRef.operationName = 'ListTenantPurchases';

export function listTenantPurchases(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTenantPurchasesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listTenantExpensesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTenantExpenses', inputVars);
}
listTenantExpensesRef.operationName = 'ListTenantExpenses';

export function listTenantExpenses(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTenantExpensesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const createTenantExpenseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTenantExpense', inputVars);
}
createTenantExpenseRef.operationName = 'CreateTenantExpense';

export function createTenantExpense(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTenantExpenseRef(dcInstance, inputVars));
}

export const updateTenantExpenseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTenantExpense', inputVars);
}
updateTenantExpenseRef.operationName = 'UpdateTenantExpense';

export function updateTenantExpense(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateTenantExpenseRef(dcInstance, inputVars));
}

export const changeTenantExpenseApprovalRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeTenantExpenseApproval', inputVars);
}
changeTenantExpenseApprovalRef.operationName = 'ChangeTenantExpenseApproval';

export function changeTenantExpenseApproval(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeTenantExpenseApprovalRef(dcInstance, inputVars));
}

export const voidTenantExpenseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'VoidTenantExpense', inputVars);
}
voidTenantExpenseRef.operationName = 'VoidTenantExpense';

export function voidTenantExpense(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(voidTenantExpenseRef(dcInstance, inputVars));
}

export const listTenantSalesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTenantSales', inputVars);
}
listTenantSalesRef.operationName = 'ListTenantSales';

export function listTenantSales(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTenantSalesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const createTenantSaleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTenantSale', inputVars);
}
createTenantSaleRef.operationName = 'CreateTenantSale';

export function createTenantSale(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTenantSaleRef(dcInstance, inputVars));
}

export const addTenantSaleLineRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddTenantSaleLine', inputVars);
}
addTenantSaleLineRef.operationName = 'AddTenantSaleLine';

export function addTenantSaleLine(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(addTenantSaleLineRef(dcInstance, inputVars));
}

export const getTenantInventoryStockTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTenantInventoryStockTrusted', inputVars);
}
getTenantInventoryStockTrustedRef.operationName = 'GetTenantInventoryStockTrusted';

export function getTenantInventoryStockTrusted(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getTenantInventoryStockTrustedRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const voidTenantSaleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'VoidTenantSale', inputVars);
}
voidTenantSaleRef.operationName = 'VoidTenantSale';

export function voidTenantSale(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(voidTenantSaleRef(dcInstance, inputVars));
}

export const createTenantPurchaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTenantPurchase', inputVars);
}
createTenantPurchaseRef.operationName = 'CreateTenantPurchase';

export function createTenantPurchase(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTenantPurchaseRef(dcInstance, inputVars));
}

export const createTenantPurchaseLineRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTenantPurchaseLine', inputVars);
}
createTenantPurchaseLineRef.operationName = 'CreateTenantPurchaseLine';

export function createTenantPurchaseLine(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTenantPurchaseLineRef(dcInstance, inputVars));
}

export const changeTenantPurchaseStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeTenantPurchaseStatus', inputVars);
}
changeTenantPurchaseStatusRef.operationName = 'ChangeTenantPurchaseStatus';

export function changeTenantPurchaseStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeTenantPurchaseStatusRef(dcInstance, inputVars));
}

export const receiveTenantPurchaseLineRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReceiveTenantPurchaseLine', inputVars);
}
receiveTenantPurchaseLineRef.operationName = 'ReceiveTenantPurchaseLine';

export function receiveTenantPurchaseLine(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(receiveTenantPurchaseLineRef(dcInstance, inputVars));
}

export const createTenantSupplierRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTenantSupplier', inputVars);
}
createTenantSupplierRef.operationName = 'CreateTenantSupplier';

export function createTenantSupplier(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTenantSupplierRef(dcInstance, inputVars));
}

export const updateTenantSupplierRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTenantSupplier', inputVars);
}
updateTenantSupplierRef.operationName = 'UpdateTenantSupplier';

export function updateTenantSupplier(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateTenantSupplierRef(dcInstance, inputVars));
}

export const changeTenantSupplierStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeTenantSupplierStatus', inputVars);
}
changeTenantSupplierStatusRef.operationName = 'ChangeTenantSupplierStatus';

export function changeTenantSupplierStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeTenantSupplierStatusRef(dcInstance, inputVars));
}

export const createTenantCustomerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTenantCustomer', inputVars);
}
createTenantCustomerRef.operationName = 'CreateTenantCustomer';

export function createTenantCustomer(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTenantCustomerRef(dcInstance, inputVars));
}

export const updateTenantCustomerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTenantCustomer', inputVars);
}
updateTenantCustomerRef.operationName = 'UpdateTenantCustomer';

export function updateTenantCustomer(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateTenantCustomerRef(dcInstance, inputVars));
}

export const changeTenantCustomerStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeTenantCustomerStatus', inputVars);
}
changeTenantCustomerStatusRef.operationName = 'ChangeTenantCustomerStatus';

export function changeTenantCustomerStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeTenantCustomerStatusRef(dcInstance, inputVars));
}

export const createTenantProductRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTenantProduct', inputVars);
}
createTenantProductRef.operationName = 'CreateTenantProduct';

export function createTenantProduct(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTenantProductRef(dcInstance, inputVars));
}

export const updateTenantProductRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTenantProduct', inputVars);
}
updateTenantProductRef.operationName = 'UpdateTenantProduct';

export function updateTenantProduct(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateTenantProductRef(dcInstance, inputVars));
}

export const changeTenantProductStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeTenantProductStatus', inputVars);
}
changeTenantProductStatusRef.operationName = 'ChangeTenantProductStatus';

export function changeTenantProductStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeTenantProductStatusRef(dcInstance, inputVars));
}

export const adjustTenantInventoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdjustTenantInventory', inputVars);
}
adjustTenantInventoryRef.operationName = 'AdjustTenantInventory';

export function adjustTenantInventory(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adjustTenantInventoryRef(dcInstance, inputVars));
}

export const createTenantInventoryStockRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTenantInventoryStock', inputVars);
}
createTenantInventoryStockRef.operationName = 'CreateTenantInventoryStock';

export function createTenantInventoryStock(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTenantInventoryStockRef(dcInstance, inputVars));
}

export const getTenantMembershipTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTenantMembershipTrusted', inputVars);
}
getTenantMembershipTrustedRef.operationName = 'GetTenantMembershipTrusted';

export function getTenantMembershipTrusted(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getTenantMembershipTrustedRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const createTenantOutletRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTenantOutlet', inputVars);
}
createTenantOutletRef.operationName = 'CreateTenantOutlet';

export function createTenantOutlet(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTenantOutletRef(dcInstance, inputVars));
}

export const updateTenantOutletRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTenantOutlet', inputVars);
}
updateTenantOutletRef.operationName = 'UpdateTenantOutlet';

export function updateTenantOutlet(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateTenantOutletRef(dcInstance, inputVars));
}

export const changeTenantOutletStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeTenantOutletStatus', inputVars);
}
changeTenantOutletStatusRef.operationName = 'ChangeTenantOutletStatus';

export function changeTenantOutletStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeTenantOutletStatusRef(dcInstance, inputVars));
}

export const createTenantOutletTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTenantOutletTrusted', inputVars);
}
createTenantOutletTrustedRef.operationName = 'CreateTenantOutletTrusted';

export function createTenantOutletTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTenantOutletTrustedRef(dcInstance, inputVars));
}

export const updateTenantOutletTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTenantOutletTrusted', inputVars);
}
updateTenantOutletTrustedRef.operationName = 'UpdateTenantOutletTrusted';

export function updateTenantOutletTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateTenantOutletTrustedRef(dcInstance, inputVars));
}

export const changeTenantOutletStatusTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeTenantOutletStatusTrusted', inputVars);
}
changeTenantOutletStatusTrustedRef.operationName = 'ChangeTenantOutletStatusTrusted';

export function changeTenantOutletStatusTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeTenantOutletStatusTrustedRef(dcInstance, inputVars));
}

export const createTenantEmployeeProfileTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTenantEmployeeProfileTrusted', inputVars);
}
createTenantEmployeeProfileTrustedRef.operationName = 'CreateTenantEmployeeProfileTrusted';

export function createTenantEmployeeProfileTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTenantEmployeeProfileTrustedRef(dcInstance, inputVars));
}

export const provisionTenantEmployeeTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ProvisionTenantEmployeeTrusted', inputVars);
}
provisionTenantEmployeeTrustedRef.operationName = 'ProvisionTenantEmployeeTrusted';

export function provisionTenantEmployeeTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(provisionTenantEmployeeTrustedRef(dcInstance, inputVars));
}

export const updateTenantEmployeeTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTenantEmployeeTrusted', inputVars);
}
updateTenantEmployeeTrustedRef.operationName = 'UpdateTenantEmployeeTrusted';

export function updateTenantEmployeeTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateTenantEmployeeTrustedRef(dcInstance, inputVars));
}

export const changeTenantEmployeeStatusTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeTenantEmployeeStatusTrusted', inputVars);
}
changeTenantEmployeeStatusTrustedRef.operationName = 'ChangeTenantEmployeeStatusTrusted';

export function changeTenantEmployeeStatusTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeTenantEmployeeStatusTrustedRef(dcInstance, inputVars));
}

export const changeTenantEmployeeLoginAccessTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeTenantEmployeeLoginAccessTrusted', inputVars);
}
changeTenantEmployeeLoginAccessTrustedRef.operationName = 'ChangeTenantEmployeeLoginAccessTrusted';

export function changeTenantEmployeeLoginAccessTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeTenantEmployeeLoginAccessTrustedRef(dcInstance, inputVars));
}

export const createTenantServicePersonTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTenantServicePersonTrusted', inputVars);
}
createTenantServicePersonTrustedRef.operationName = 'CreateTenantServicePersonTrusted';

export function createTenantServicePersonTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTenantServicePersonTrustedRef(dcInstance, inputVars));
}

export const updateTenantServicePersonTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTenantServicePersonTrusted', inputVars);
}
updateTenantServicePersonTrustedRef.operationName = 'UpdateTenantServicePersonTrusted';

export function updateTenantServicePersonTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateTenantServicePersonTrustedRef(dcInstance, inputVars));
}

export const changeTenantServicePersonStatusTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeTenantServicePersonStatusTrusted', inputVars);
}
changeTenantServicePersonStatusTrustedRef.operationName = 'ChangeTenantServicePersonStatusTrusted';

export function changeTenantServicePersonStatusTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeTenantServicePersonStatusTrustedRef(dcInstance, inputVars));
}

export const assignTenantEmployeeOutletTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AssignTenantEmployeeOutletTrusted', inputVars);
}
assignTenantEmployeeOutletTrustedRef.operationName = 'AssignTenantEmployeeOutletTrusted';

export function assignTenantEmployeeOutletTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(assignTenantEmployeeOutletTrustedRef(dcInstance, inputVars));
}

export const assignTenantServicePersonOutletTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AssignTenantServicePersonOutletTrusted', inputVars);
}
assignTenantServicePersonOutletTrustedRef.operationName = 'AssignTenantServicePersonOutletTrusted';

export function assignTenantServicePersonOutletTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(assignTenantServicePersonOutletTrustedRef(dcInstance, inputVars));
}

