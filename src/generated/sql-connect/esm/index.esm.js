import { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } from 'firebase/data-connect';

export const AppUserStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
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

export const MembershipStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
}

export const OrganizationStatus = {
  ACTIVE: "ACTIVE",
  SUSPENDED: "SUSPENDED",
}

export const ProvisioningAttemptStatus = {
  IN_PROGRESS: "IN_PROGRESS",
  SUCCEEDED: "SUCCEEDED",
  FAILED_RETRYABLE: "FAILED_RETRYABLE",
  FAILED_TERMINAL: "FAILED_TERMINAL",
  REQUIRES_RECONCILIATION: "REQUIRES_RECONCILIATION",
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

