const { validateAdminArgs } = require('firebase-admin/data-connect');

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
  serviceId: 'omniretail-platform',
  location: 'asia-south1'
};
exports.connectorConfig = connectorConfig;

function getCurrentUserAuthorization(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetCurrentUserAuthorization', undefined, inputOpts);
}
exports.getCurrentUserAuthorization = getCurrentUserAuthorization;

function getUserAuthorizationByFirebaseUid(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetUserAuthorizationByFirebaseUid', inputVars, inputOpts);
}
exports.getUserAuthorizationByFirebaseUid = getUserAuthorizationByFirebaseUid;

function resolveUsernameLogin(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ResolveUsernameLogin', inputVars, inputOpts);
}
exports.resolveUsernameLogin = resolveUsernameLogin;

function recordSuccessfulLogin(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('RecordSuccessfulLogin', inputVars, inputOpts);
}
exports.recordSuccessfulLogin = recordSuccessfulLogin;

function updateAppUserProfile(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpdateAppUserProfile', inputVars, inputOpts);
}
exports.updateAppUserProfile = updateAppUserProfile;

function recordPasswordChange(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('RecordPasswordChange', inputVars, inputOpts);
}
exports.recordPasswordChange = recordPasswordChange;

function getAppUserForBootstrap(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetAppUserForBootstrap', inputVars, inputOpts);
}
exports.getAppUserForBootstrap = getAppUserForBootstrap;

function bootstrapMasterAdmin(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('BootstrapMasterAdmin', inputVars, inputOpts);
}
exports.bootstrapMasterAdmin = bootstrapMasterAdmin;

function getCurrentAppUser(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetCurrentAppUser', undefined, inputOpts);
}
exports.getCurrentAppUser = getCurrentAppUser;

function getAppUserByFirebaseUid(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetAppUserByFirebaseUid', inputVars, inputOpts);
}
exports.getAppUserByFirebaseUid = getAppUserByFirebaseUid;

function listLicensePlans(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListLicensePlans', undefined, inputOpts);
}
exports.listLicensePlans = listLicensePlans;

function listOrganizationLicensePlanAssignments(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListOrganizationLicensePlanAssignments', undefined, inputOpts);
}
exports.listOrganizationLicensePlanAssignments = listOrganizationLicensePlanAssignments;

function getLicensePlan(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetLicensePlan', inputVars, inputOpts);
}
exports.getLicensePlan = getLicensePlan;

function getLicensePlanTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetLicensePlanTrusted', inputVars, inputOpts);
}
exports.getLicensePlanTrusted = getLicensePlanTrusted;

function createLicensePlan(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateLicensePlan', inputVars, inputOpts);
}
exports.createLicensePlan = createLicensePlan;

function updateLicensePlan(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpdateLicensePlan', inputVars, inputOpts);
}
exports.updateLicensePlan = updateLicensePlan;

function changeLicensePlanStatus(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('ChangeLicensePlanStatus', inputVars, inputOpts);
}
exports.changeLicensePlanStatus = changeLicensePlanStatus;

function listOrganizations(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListOrganizations', undefined, inputOpts);
}
exports.listOrganizations = listOrganizations;

function getOrganization(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetOrganization', inputVars, inputOpts);
}
exports.getOrganization = getOrganization;

function getOrganizationTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetOrganizationTrusted', inputVars, inputOpts);
}
exports.getOrganizationTrusted = getOrganizationTrusted;

function listOrganizationAdministrators(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListOrganizationAdministrators', inputVars, inputOpts);
}
exports.listOrganizationAdministrators = listOrganizationAdministrators;

function getOrganizationAdministrator(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetOrganizationAdministrator', inputVars, inputOpts);
}
exports.getOrganizationAdministrator = getOrganizationAdministrator;

function provisionOrganizationAdministrator(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('ProvisionOrganizationAdministrator', inputVars, inputOpts);
}
exports.provisionOrganizationAdministrator = provisionOrganizationAdministrator;

function updateOrganizationAdministrator(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpdateOrganizationAdministrator', inputVars, inputOpts);
}
exports.updateOrganizationAdministrator = updateOrganizationAdministrator;

function changeOrganizationAdministratorStatus(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('ChangeOrganizationAdministratorStatus', inputVars, inputOpts);
}
exports.changeOrganizationAdministratorStatus = changeOrganizationAdministratorStatus;

function resolveOrganizationAdministratorIdentity(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ResolveOrganizationAdministratorIdentity', inputVars, inputOpts);
}
exports.resolveOrganizationAdministratorIdentity = resolveOrganizationAdministratorIdentity;

function recordAdministratorSecurityEvent(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('RecordAdministratorSecurityEvent', inputVars, inputOpts);
}
exports.recordAdministratorSecurityEvent = recordAdministratorSecurityEvent;

function getLifecycleIdempotency(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetLifecycleIdempotency', inputVars, inputOpts);
}
exports.getLifecycleIdempotency = getLifecycleIdempotency;

function getOrganizationLicense(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetOrganizationLicense', inputVars, inputOpts);
}
exports.getOrganizationLicense = getOrganizationLicense;

function getOrganizationLicenseTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetOrganizationLicenseTrusted', inputVars, inputOpts);
}
exports.getOrganizationLicenseTrusted = getOrganizationLicenseTrusted;

function getOrganizationLicenseHistory(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetOrganizationLicenseHistory', inputVars, inputOpts);
}
exports.getOrganizationLicenseHistory = getOrganizationLicenseHistory;

function getOrganizationLicensePublic(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetOrganizationLicensePublic', inputVars, inputOpts);
}
exports.getOrganizationLicensePublic = getOrganizationLicensePublic;

function getOrganizationLicenseHistoryPublic(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetOrganizationLicenseHistoryPublic', inputVars, inputOpts);
}
exports.getOrganizationLicenseHistoryPublic = getOrganizationLicenseHistoryPublic;

function listOrganizationsTrusted(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListOrganizationsTrusted', undefined, inputOpts);
}
exports.listOrganizationsTrusted = listOrganizationsTrusted;

function assignOrganizationLicenseTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('AssignOrganizationLicenseTrusted', inputVars, inputOpts);
}
exports.assignOrganizationLicenseTrusted = assignOrganizationLicenseTrusted;

function changeOrganizationLicensePlanTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('ChangeOrganizationLicensePlanTrusted', inputVars, inputOpts);
}
exports.changeOrganizationLicensePlanTrusted = changeOrganizationLicensePlanTrusted;

function modifyOrganizationCommercialTermsTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('ModifyOrganizationCommercialTermsTrusted', inputVars, inputOpts);
}
exports.modifyOrganizationCommercialTermsTrusted = modifyOrganizationCommercialTermsTrusted;

function renewOrganizationLicenseTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('RenewOrganizationLicenseTrusted', inputVars, inputOpts);
}
exports.renewOrganizationLicenseTrusted = renewOrganizationLicenseTrusted;

function claimLifecycleIdempotency(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('ClaimLifecycleIdempotency', inputVars, inputOpts);
}
exports.claimLifecycleIdempotency = claimLifecycleIdempotency;

function completeLifecycleIdempotency(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CompleteLifecycleIdempotency', inputVars, inputOpts);
}
exports.completeLifecycleIdempotency = completeLifecycleIdempotency;

function recordProvisioningReconciliation(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('RecordProvisioningReconciliation', inputVars, inputOpts);
}
exports.recordProvisioningReconciliation = recordProvisioningReconciliation;

function createOrganization(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateOrganization', inputVars, inputOpts);
}
exports.createOrganization = createOrganization;

function updateOrganization(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpdateOrganization', inputVars, inputOpts);
}
exports.updateOrganization = updateOrganization;

function changeOrganizationStatus(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('ChangeOrganizationStatus', inputVars, inputOpts);
}
exports.changeOrganizationStatus = changeOrganizationStatus;

