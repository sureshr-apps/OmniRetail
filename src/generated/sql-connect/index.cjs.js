const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } = require('firebase/data-connect');

const AppUserStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
}
exports.AppUserStatus = AppUserStatus;

const LicenseEventType = {
  ASSIGNED: "ASSIGNED",
  PLAN_CHANGED: "PLAN_CHANGED",
  COMMERCIAL_TERMS_MODIFIED: "COMMERCIAL_TERMS_MODIFIED",
  RENEWED: "RENEWED",
}
exports.LicenseEventType = LicenseEventType;

const LicensePlanStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
}
exports.LicensePlanStatus = LicensePlanStatus;

const MembershipStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
}
exports.MembershipStatus = MembershipStatus;

const OrganizationStatus = {
  ACTIVE: "ACTIVE",
  SUSPENDED: "SUSPENDED",
}
exports.OrganizationStatus = OrganizationStatus;

const ProvisioningAttemptStatus = {
  IN_PROGRESS: "IN_PROGRESS",
  SUCCEEDED: "SUCCEEDED",
  FAILED_RETRYABLE: "FAILED_RETRYABLE",
  FAILED_TERMINAL: "FAILED_TERMINAL",
  REQUIRES_RECONCILIATION: "REQUIRES_RECONCILIATION",
}
exports.ProvisioningAttemptStatus = ProvisioningAttemptStatus;

const connectorConfig = {
  connector: 'master-admin',
  service: 'omniretail-platform',
  location: 'asia-south1'
};
exports.connectorConfig = connectorConfig;
const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider()
  }
};
exports.dataConnectSettings = dataConnectSettings;

const getCurrentUserAuthorizationRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCurrentUserAuthorization');
}
getCurrentUserAuthorizationRef.operationName = 'GetCurrentUserAuthorization';
exports.getCurrentUserAuthorizationRef = getCurrentUserAuthorizationRef;

exports.getCurrentUserAuthorization = function getCurrentUserAuthorization(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getCurrentUserAuthorizationRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getUserAuthorizationByFirebaseUidRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserAuthorizationByFirebaseUid', inputVars);
}
getUserAuthorizationByFirebaseUidRef.operationName = 'GetUserAuthorizationByFirebaseUid';
exports.getUserAuthorizationByFirebaseUidRef = getUserAuthorizationByFirebaseUidRef;

exports.getUserAuthorizationByFirebaseUid = function getUserAuthorizationByFirebaseUid(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getUserAuthorizationByFirebaseUidRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const resolveUsernameLoginRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ResolveUsernameLogin', inputVars);
}
resolveUsernameLoginRef.operationName = 'ResolveUsernameLogin';
exports.resolveUsernameLoginRef = resolveUsernameLoginRef;

exports.resolveUsernameLogin = function resolveUsernameLogin(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(resolveUsernameLoginRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const recordSuccessfulLoginRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordSuccessfulLogin', inputVars);
}
recordSuccessfulLoginRef.operationName = 'RecordSuccessfulLogin';
exports.recordSuccessfulLoginRef = recordSuccessfulLoginRef;

exports.recordSuccessfulLogin = function recordSuccessfulLogin(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(recordSuccessfulLoginRef(dcInstance, inputVars));
}
;

const updateAppUserProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAppUserProfile', inputVars);
}
updateAppUserProfileRef.operationName = 'UpdateAppUserProfile';
exports.updateAppUserProfileRef = updateAppUserProfileRef;

exports.updateAppUserProfile = function updateAppUserProfile(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateAppUserProfileRef(dcInstance, inputVars));
}
;

const recordPasswordChangeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordPasswordChange', inputVars);
}
recordPasswordChangeRef.operationName = 'RecordPasswordChange';
exports.recordPasswordChangeRef = recordPasswordChangeRef;

exports.recordPasswordChange = function recordPasswordChange(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(recordPasswordChangeRef(dcInstance, inputVars));
}
;

const getAppUserForBootstrapRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAppUserForBootstrap', inputVars);
}
getAppUserForBootstrapRef.operationName = 'GetAppUserForBootstrap';
exports.getAppUserForBootstrapRef = getAppUserForBootstrapRef;

exports.getAppUserForBootstrap = function getAppUserForBootstrap(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getAppUserForBootstrapRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const bootstrapMasterAdminRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'BootstrapMasterAdmin', inputVars);
}
bootstrapMasterAdminRef.operationName = 'BootstrapMasterAdmin';
exports.bootstrapMasterAdminRef = bootstrapMasterAdminRef;

exports.bootstrapMasterAdmin = function bootstrapMasterAdmin(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(bootstrapMasterAdminRef(dcInstance, inputVars));
}
;

const getCurrentAppUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCurrentAppUser');
}
getCurrentAppUserRef.operationName = 'GetCurrentAppUser';
exports.getCurrentAppUserRef = getCurrentAppUserRef;

exports.getCurrentAppUser = function getCurrentAppUser(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getCurrentAppUserRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getAppUserByFirebaseUidRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAppUserByFirebaseUid', inputVars);
}
getAppUserByFirebaseUidRef.operationName = 'GetAppUserByFirebaseUid';
exports.getAppUserByFirebaseUidRef = getAppUserByFirebaseUidRef;

exports.getAppUserByFirebaseUid = function getAppUserByFirebaseUid(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getAppUserByFirebaseUidRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listLicensePlansRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListLicensePlans');
}
listLicensePlansRef.operationName = 'ListLicensePlans';
exports.listLicensePlansRef = listLicensePlansRef;

exports.listLicensePlans = function listLicensePlans(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listLicensePlansRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listOrganizationLicensePlanAssignmentsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListOrganizationLicensePlanAssignments');
}
listOrganizationLicensePlanAssignmentsRef.operationName = 'ListOrganizationLicensePlanAssignments';
exports.listOrganizationLicensePlanAssignmentsRef = listOrganizationLicensePlanAssignmentsRef;

exports.listOrganizationLicensePlanAssignments = function listOrganizationLicensePlanAssignments(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listOrganizationLicensePlanAssignmentsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getLicensePlanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLicensePlan', inputVars);
}
getLicensePlanRef.operationName = 'GetLicensePlan';
exports.getLicensePlanRef = getLicensePlanRef;

exports.getLicensePlan = function getLicensePlan(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getLicensePlanRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getLicensePlanTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLicensePlanTrusted', inputVars);
}
getLicensePlanTrustedRef.operationName = 'GetLicensePlanTrusted';
exports.getLicensePlanTrustedRef = getLicensePlanTrustedRef;

exports.getLicensePlanTrusted = function getLicensePlanTrusted(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getLicensePlanTrustedRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createLicensePlanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateLicensePlan', inputVars);
}
createLicensePlanRef.operationName = 'CreateLicensePlan';
exports.createLicensePlanRef = createLicensePlanRef;

exports.createLicensePlan = function createLicensePlan(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createLicensePlanRef(dcInstance, inputVars));
}
;

const updateLicensePlanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateLicensePlan', inputVars);
}
updateLicensePlanRef.operationName = 'UpdateLicensePlan';
exports.updateLicensePlanRef = updateLicensePlanRef;

exports.updateLicensePlan = function updateLicensePlan(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateLicensePlanRef(dcInstance, inputVars));
}
;

const changeLicensePlanStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeLicensePlanStatus', inputVars);
}
changeLicensePlanStatusRef.operationName = 'ChangeLicensePlanStatus';
exports.changeLicensePlanStatusRef = changeLicensePlanStatusRef;

exports.changeLicensePlanStatus = function changeLicensePlanStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeLicensePlanStatusRef(dcInstance, inputVars));
}
;

const listOrganizationsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListOrganizations');
}
listOrganizationsRef.operationName = 'ListOrganizations';
exports.listOrganizationsRef = listOrganizationsRef;

exports.listOrganizations = function listOrganizations(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listOrganizationsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getOrganizationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrganization', inputVars);
}
getOrganizationRef.operationName = 'GetOrganization';
exports.getOrganizationRef = getOrganizationRef;

exports.getOrganization = function getOrganization(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOrganizationRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getOrganizationTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrganizationTrusted', inputVars);
}
getOrganizationTrustedRef.operationName = 'GetOrganizationTrusted';
exports.getOrganizationTrustedRef = getOrganizationTrustedRef;

exports.getOrganizationTrusted = function getOrganizationTrusted(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOrganizationTrustedRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listOrganizationAdministratorsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListOrganizationAdministrators', inputVars);
}
listOrganizationAdministratorsRef.operationName = 'ListOrganizationAdministrators';
exports.listOrganizationAdministratorsRef = listOrganizationAdministratorsRef;

exports.listOrganizationAdministrators = function listOrganizationAdministrators(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listOrganizationAdministratorsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getOrganizationAdministratorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrganizationAdministrator', inputVars);
}
getOrganizationAdministratorRef.operationName = 'GetOrganizationAdministrator';
exports.getOrganizationAdministratorRef = getOrganizationAdministratorRef;

exports.getOrganizationAdministrator = function getOrganizationAdministrator(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOrganizationAdministratorRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const provisionOrganizationAdministratorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ProvisionOrganizationAdministrator', inputVars);
}
provisionOrganizationAdministratorRef.operationName = 'ProvisionOrganizationAdministrator';
exports.provisionOrganizationAdministratorRef = provisionOrganizationAdministratorRef;

exports.provisionOrganizationAdministrator = function provisionOrganizationAdministrator(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(provisionOrganizationAdministratorRef(dcInstance, inputVars));
}
;

const updateOrganizationAdministratorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateOrganizationAdministrator', inputVars);
}
updateOrganizationAdministratorRef.operationName = 'UpdateOrganizationAdministrator';
exports.updateOrganizationAdministratorRef = updateOrganizationAdministratorRef;

exports.updateOrganizationAdministrator = function updateOrganizationAdministrator(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateOrganizationAdministratorRef(dcInstance, inputVars));
}
;

const changeOrganizationAdministratorStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeOrganizationAdministratorStatus', inputVars);
}
changeOrganizationAdministratorStatusRef.operationName = 'ChangeOrganizationAdministratorStatus';
exports.changeOrganizationAdministratorStatusRef = changeOrganizationAdministratorStatusRef;

exports.changeOrganizationAdministratorStatus = function changeOrganizationAdministratorStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeOrganizationAdministratorStatusRef(dcInstance, inputVars));
}
;

const resolveOrganizationAdministratorIdentityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ResolveOrganizationAdministratorIdentity', inputVars);
}
resolveOrganizationAdministratorIdentityRef.operationName = 'ResolveOrganizationAdministratorIdentity';
exports.resolveOrganizationAdministratorIdentityRef = resolveOrganizationAdministratorIdentityRef;

exports.resolveOrganizationAdministratorIdentity = function resolveOrganizationAdministratorIdentity(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(resolveOrganizationAdministratorIdentityRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const recordAdministratorSecurityEventRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordAdministratorSecurityEvent', inputVars);
}
recordAdministratorSecurityEventRef.operationName = 'RecordAdministratorSecurityEvent';
exports.recordAdministratorSecurityEventRef = recordAdministratorSecurityEventRef;

exports.recordAdministratorSecurityEvent = function recordAdministratorSecurityEvent(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(recordAdministratorSecurityEventRef(dcInstance, inputVars));
}
;

const getLifecycleIdempotencyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLifecycleIdempotency', inputVars);
}
getLifecycleIdempotencyRef.operationName = 'GetLifecycleIdempotency';
exports.getLifecycleIdempotencyRef = getLifecycleIdempotencyRef;

exports.getLifecycleIdempotency = function getLifecycleIdempotency(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getLifecycleIdempotencyRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getOrganizationLicenseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrganizationLicense', inputVars);
}
getOrganizationLicenseRef.operationName = 'GetOrganizationLicense';
exports.getOrganizationLicenseRef = getOrganizationLicenseRef;

exports.getOrganizationLicense = function getOrganizationLicense(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOrganizationLicenseRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getOrganizationLicenseTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrganizationLicenseTrusted', inputVars);
}
getOrganizationLicenseTrustedRef.operationName = 'GetOrganizationLicenseTrusted';
exports.getOrganizationLicenseTrustedRef = getOrganizationLicenseTrustedRef;

exports.getOrganizationLicenseTrusted = function getOrganizationLicenseTrusted(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOrganizationLicenseTrustedRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getOrganizationLicenseHistoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrganizationLicenseHistory', inputVars);
}
getOrganizationLicenseHistoryRef.operationName = 'GetOrganizationLicenseHistory';
exports.getOrganizationLicenseHistoryRef = getOrganizationLicenseHistoryRef;

exports.getOrganizationLicenseHistory = function getOrganizationLicenseHistory(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOrganizationLicenseHistoryRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getOrganizationLicensePublicRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrganizationLicensePublic', inputVars);
}
getOrganizationLicensePublicRef.operationName = 'GetOrganizationLicensePublic';
exports.getOrganizationLicensePublicRef = getOrganizationLicensePublicRef;

exports.getOrganizationLicensePublic = function getOrganizationLicensePublic(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOrganizationLicensePublicRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getOrganizationLicenseHistoryPublicRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrganizationLicenseHistoryPublic', inputVars);
}
getOrganizationLicenseHistoryPublicRef.operationName = 'GetOrganizationLicenseHistoryPublic';
exports.getOrganizationLicenseHistoryPublicRef = getOrganizationLicenseHistoryPublicRef;

exports.getOrganizationLicenseHistoryPublic = function getOrganizationLicenseHistoryPublic(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOrganizationLicenseHistoryPublicRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listOrganizationsTrustedRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListOrganizationsTrusted');
}
listOrganizationsTrustedRef.operationName = 'ListOrganizationsTrusted';
exports.listOrganizationsTrustedRef = listOrganizationsTrustedRef;

exports.listOrganizationsTrusted = function listOrganizationsTrusted(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listOrganizationsTrustedRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const assignOrganizationLicenseTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AssignOrganizationLicenseTrusted', inputVars);
}
assignOrganizationLicenseTrustedRef.operationName = 'AssignOrganizationLicenseTrusted';
exports.assignOrganizationLicenseTrustedRef = assignOrganizationLicenseTrustedRef;

exports.assignOrganizationLicenseTrusted = function assignOrganizationLicenseTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(assignOrganizationLicenseTrustedRef(dcInstance, inputVars));
}
;

const changeOrganizationLicensePlanTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeOrganizationLicensePlanTrusted', inputVars);
}
changeOrganizationLicensePlanTrustedRef.operationName = 'ChangeOrganizationLicensePlanTrusted';
exports.changeOrganizationLicensePlanTrustedRef = changeOrganizationLicensePlanTrustedRef;

exports.changeOrganizationLicensePlanTrusted = function changeOrganizationLicensePlanTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeOrganizationLicensePlanTrustedRef(dcInstance, inputVars));
}
;

const modifyOrganizationCommercialTermsTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ModifyOrganizationCommercialTermsTrusted', inputVars);
}
modifyOrganizationCommercialTermsTrustedRef.operationName = 'ModifyOrganizationCommercialTermsTrusted';
exports.modifyOrganizationCommercialTermsTrustedRef = modifyOrganizationCommercialTermsTrustedRef;

exports.modifyOrganizationCommercialTermsTrusted = function modifyOrganizationCommercialTermsTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(modifyOrganizationCommercialTermsTrustedRef(dcInstance, inputVars));
}
;

const renewOrganizationLicenseTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RenewOrganizationLicenseTrusted', inputVars);
}
renewOrganizationLicenseTrustedRef.operationName = 'RenewOrganizationLicenseTrusted';
exports.renewOrganizationLicenseTrustedRef = renewOrganizationLicenseTrustedRef;

exports.renewOrganizationLicenseTrusted = function renewOrganizationLicenseTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(renewOrganizationLicenseTrustedRef(dcInstance, inputVars));
}
;

const claimLifecycleIdempotencyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ClaimLifecycleIdempotency', inputVars);
}
claimLifecycleIdempotencyRef.operationName = 'ClaimLifecycleIdempotency';
exports.claimLifecycleIdempotencyRef = claimLifecycleIdempotencyRef;

exports.claimLifecycleIdempotency = function claimLifecycleIdempotency(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(claimLifecycleIdempotencyRef(dcInstance, inputVars));
}
;

const completeLifecycleIdempotencyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CompleteLifecycleIdempotency', inputVars);
}
completeLifecycleIdempotencyRef.operationName = 'CompleteLifecycleIdempotency';
exports.completeLifecycleIdempotencyRef = completeLifecycleIdempotencyRef;

exports.completeLifecycleIdempotency = function completeLifecycleIdempotency(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(completeLifecycleIdempotencyRef(dcInstance, inputVars));
}
;

const recordProvisioningReconciliationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordProvisioningReconciliation', inputVars);
}
recordProvisioningReconciliationRef.operationName = 'RecordProvisioningReconciliation';
exports.recordProvisioningReconciliationRef = recordProvisioningReconciliationRef;

exports.recordProvisioningReconciliation = function recordProvisioningReconciliation(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(recordProvisioningReconciliationRef(dcInstance, inputVars));
}
;

const createOrganizationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateOrganization', inputVars);
}
createOrganizationRef.operationName = 'CreateOrganization';
exports.createOrganizationRef = createOrganizationRef;

exports.createOrganization = function createOrganization(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createOrganizationRef(dcInstance, inputVars));
}
;

const updateOrganizationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateOrganization', inputVars);
}
updateOrganizationRef.operationName = 'UpdateOrganization';
exports.updateOrganizationRef = updateOrganizationRef;

exports.updateOrganization = function updateOrganization(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateOrganizationRef(dcInstance, inputVars));
}
;

const changeOrganizationStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeOrganizationStatus', inputVars);
}
changeOrganizationStatusRef.operationName = 'ChangeOrganizationStatus';
exports.changeOrganizationStatusRef = changeOrganizationStatusRef;

exports.changeOrganizationStatus = function changeOrganizationStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeOrganizationStatusRef(dcInstance, inputVars));
}
;
