const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } = require('firebase/data-connect');

const AppUserStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
}
exports.AppUserStatus = AppUserStatus;

const CustomerStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
}
exports.CustomerStatus = CustomerStatus;

const CustomerType = {
  INDIVIDUAL: "INDIVIDUAL",
  BUSINESS: "BUSINESS",
}
exports.CustomerType = CustomerType;

const EmploymentStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
}
exports.EmploymentStatus = EmploymentStatus;

const ExpenseApprovalStatus = {
  DRAFT: "DRAFT",
  PENDING_APPROVAL: "PENDING_APPROVAL",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
}
exports.ExpenseApprovalStatus = ExpenseApprovalStatus;

const ExpenseStatus = {
  ACTIVE: "ACTIVE",
  VOIDED: "VOIDED",
}
exports.ExpenseStatus = ExpenseStatus;

const InventoryAdjustmentMode = {
  INCREASE: "INCREASE",
  DECREASE: "DECREASE",
  RECONCILE: "RECONCILE",
}
exports.InventoryAdjustmentMode = InventoryAdjustmentMode;

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

const LoginAccessStatus = {
  ENABLED: "ENABLED",
  DISABLED: "DISABLED",
}
exports.LoginAccessStatus = LoginAccessStatus;

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

const OutletStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
}
exports.OutletStatus = OutletStatus;

const ProductStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
}
exports.ProductStatus = ProductStatus;

const ProductType = {
  STOCKABLE: "STOCKABLE",
  SERVICE: "SERVICE",
  CONSUMABLE: "CONSUMABLE",
}
exports.ProductType = ProductType;

const ProvisioningAttemptStatus = {
  IN_PROGRESS: "IN_PROGRESS",
  SUCCEEDED: "SUCCEEDED",
  FAILED_RETRYABLE: "FAILED_RETRYABLE",
  FAILED_TERMINAL: "FAILED_TERMINAL",
  REQUIRES_RECONCILIATION: "REQUIRES_RECONCILIATION",
}
exports.ProvisioningAttemptStatus = ProvisioningAttemptStatus;

const PurchasePaymentStatus = {
  PAID: "PAID",
  PARTIALLY_PAID: "PARTIALLY_PAID",
  UNPAID: "UNPAID",
}
exports.PurchasePaymentStatus = PurchasePaymentStatus;

const PurchaseReceiptStatus = {
  PENDING: "PENDING",
  PARTIALLY_RECEIVED: "PARTIALLY_RECEIVED",
  RECEIVED: "RECEIVED",
}
exports.PurchaseReceiptStatus = PurchaseReceiptStatus;

const PurchaseStatus = {
  ACTIVE: "ACTIVE",
  DRAFT: "DRAFT",
  CANCELLED: "CANCELLED",
}
exports.PurchaseStatus = PurchaseStatus;

const SaleStatus = {
  COMPLETED: "COMPLETED",
  PARTIAL_REFUND: "PARTIAL_REFUND",
  REFUNDED: "REFUNDED",
  VOIDED: "VOIDED",
}
exports.SaleStatus = SaleStatus;

const SaleTenderType = {
  VISA: "VISA",
  MASTERCARD: "MASTERCARD",
  APPLE_PAY: "APPLE_PAY",
  CASH: "CASH",
  SPLIT: "SPLIT",
  REVERSAL: "REVERSAL",
  NONE: "NONE",
}
exports.SaleTenderType = SaleTenderType;

const SupplierStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
}
exports.SupplierStatus = SupplierStatus;

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

const deleteLicensePlanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteLicensePlan', inputVars);
}
deleteLicensePlanRef.operationName = 'DeleteLicensePlan';
exports.deleteLicensePlanRef = deleteLicensePlanRef;

exports.deleteLicensePlan = function deleteLicensePlan(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteLicensePlanRef(dcInstance, inputVars));
}
;

const getLicensePlanReferencesTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLicensePlanReferencesTrusted', inputVars);
}
getLicensePlanReferencesTrustedRef.operationName = 'GetLicensePlanReferencesTrusted';
exports.getLicensePlanReferencesTrustedRef = getLicensePlanReferencesTrustedRef;

exports.getLicensePlanReferencesTrusted = function getLicensePlanReferencesTrusted(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getLicensePlanReferencesTrustedRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const deleteLicensePlanTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteLicensePlanTrusted', inputVars);
}
deleteLicensePlanTrustedRef.operationName = 'DeleteLicensePlanTrusted';
exports.deleteLicensePlanTrustedRef = deleteLicensePlanTrustedRef;

exports.deleteLicensePlanTrusted = function deleteLicensePlanTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteLicensePlanTrustedRef(dcInstance, inputVars));
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

const ensureAppUserRoleTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EnsureAppUserRoleTrusted', inputVars);
}
ensureAppUserRoleTrustedRef.operationName = 'EnsureAppUserRoleTrusted';
exports.ensureAppUserRoleTrustedRef = ensureAppUserRoleTrustedRef;

exports.ensureAppUserRoleTrusted = function ensureAppUserRoleTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(ensureAppUserRoleTrustedRef(dcInstance, inputVars));
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

const listOrganizationUsersForDeletionTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListOrganizationUsersForDeletionTrusted', inputVars);
}
listOrganizationUsersForDeletionTrustedRef.operationName = 'ListOrganizationUsersForDeletionTrusted';
exports.listOrganizationUsersForDeletionTrustedRef = listOrganizationUsersForDeletionTrustedRef;

exports.listOrganizationUsersForDeletionTrusted = function listOrganizationUsersForDeletionTrusted(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listOrganizationUsersForDeletionTrustedRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const deleteOrganizationTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteOrganizationTrusted', inputVars);
}
deleteOrganizationTrustedRef.operationName = 'DeleteOrganizationTrusted';
exports.deleteOrganizationTrustedRef = deleteOrganizationTrustedRef;

exports.deleteOrganizationTrusted = function deleteOrganizationTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteOrganizationTrustedRef(dcInstance, inputVars));
}
;

const deleteAppUserTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteAppUserTrusted', inputVars);
}
deleteAppUserTrustedRef.operationName = 'DeleteAppUserTrusted';
exports.deleteAppUserTrustedRef = deleteAppUserTrustedRef;

exports.deleteAppUserTrusted = function deleteAppUserTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteAppUserTrustedRef(dcInstance, inputVars));
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

const listTenantOutletsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTenantOutlets', inputVars);
}
listTenantOutletsRef.operationName = 'ListTenantOutlets';
exports.listTenantOutletsRef = listTenantOutletsRef;

exports.listTenantOutlets = function listTenantOutlets(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTenantOutletsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listTenantEmployeesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTenantEmployees', inputVars);
}
listTenantEmployeesRef.operationName = 'ListTenantEmployees';
exports.listTenantEmployeesRef = listTenantEmployeesRef;

exports.listTenantEmployees = function listTenantEmployees(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTenantEmployeesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listTenantServicePersonsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTenantServicePersons', inputVars);
}
listTenantServicePersonsRef.operationName = 'ListTenantServicePersons';
exports.listTenantServicePersonsRef = listTenantServicePersonsRef;

exports.listTenantServicePersons = function listTenantServicePersons(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTenantServicePersonsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listTenantProductsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTenantProducts', inputVars);
}
listTenantProductsRef.operationName = 'ListTenantProducts';
exports.listTenantProductsRef = listTenantProductsRef;

exports.listTenantProducts = function listTenantProducts(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTenantProductsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listTenantInventoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTenantInventory', inputVars);
}
listTenantInventoryRef.operationName = 'ListTenantInventory';
exports.listTenantInventoryRef = listTenantInventoryRef;

exports.listTenantInventory = function listTenantInventory(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTenantInventoryRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listTenantCustomersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTenantCustomers', inputVars);
}
listTenantCustomersRef.operationName = 'ListTenantCustomers';
exports.listTenantCustomersRef = listTenantCustomersRef;

exports.listTenantCustomers = function listTenantCustomers(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTenantCustomersRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listTenantSuppliersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTenantSuppliers', inputVars);
}
listTenantSuppliersRef.operationName = 'ListTenantSuppliers';
exports.listTenantSuppliersRef = listTenantSuppliersRef;

exports.listTenantSuppliers = function listTenantSuppliers(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTenantSuppliersRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listTenantPurchasesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTenantPurchases', inputVars);
}
listTenantPurchasesRef.operationName = 'ListTenantPurchases';
exports.listTenantPurchasesRef = listTenantPurchasesRef;

exports.listTenantPurchases = function listTenantPurchases(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTenantPurchasesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listTenantExpensesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTenantExpenses', inputVars);
}
listTenantExpensesRef.operationName = 'ListTenantExpenses';
exports.listTenantExpensesRef = listTenantExpensesRef;

exports.listTenantExpenses = function listTenantExpenses(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTenantExpensesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createTenantExpenseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTenantExpense', inputVars);
}
createTenantExpenseRef.operationName = 'CreateTenantExpense';
exports.createTenantExpenseRef = createTenantExpenseRef;

exports.createTenantExpense = function createTenantExpense(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTenantExpenseRef(dcInstance, inputVars));
}
;

const updateTenantExpenseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTenantExpense', inputVars);
}
updateTenantExpenseRef.operationName = 'UpdateTenantExpense';
exports.updateTenantExpenseRef = updateTenantExpenseRef;

exports.updateTenantExpense = function updateTenantExpense(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateTenantExpenseRef(dcInstance, inputVars));
}
;

const changeTenantExpenseApprovalRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeTenantExpenseApproval', inputVars);
}
changeTenantExpenseApprovalRef.operationName = 'ChangeTenantExpenseApproval';
exports.changeTenantExpenseApprovalRef = changeTenantExpenseApprovalRef;

exports.changeTenantExpenseApproval = function changeTenantExpenseApproval(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeTenantExpenseApprovalRef(dcInstance, inputVars));
}
;

const voidTenantExpenseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'VoidTenantExpense', inputVars);
}
voidTenantExpenseRef.operationName = 'VoidTenantExpense';
exports.voidTenantExpenseRef = voidTenantExpenseRef;

exports.voidTenantExpense = function voidTenantExpense(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(voidTenantExpenseRef(dcInstance, inputVars));
}
;

const listTenantSalesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTenantSales', inputVars);
}
listTenantSalesRef.operationName = 'ListTenantSales';
exports.listTenantSalesRef = listTenantSalesRef;

exports.listTenantSales = function listTenantSales(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listTenantSalesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createTenantSaleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTenantSale', inputVars);
}
createTenantSaleRef.operationName = 'CreateTenantSale';
exports.createTenantSaleRef = createTenantSaleRef;

exports.createTenantSale = function createTenantSale(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTenantSaleRef(dcInstance, inputVars));
}
;

const addTenantSaleLineRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddTenantSaleLine', inputVars);
}
addTenantSaleLineRef.operationName = 'AddTenantSaleLine';
exports.addTenantSaleLineRef = addTenantSaleLineRef;

exports.addTenantSaleLine = function addTenantSaleLine(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(addTenantSaleLineRef(dcInstance, inputVars));
}
;

const getTenantInventoryStockTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTenantInventoryStockTrusted', inputVars);
}
getTenantInventoryStockTrustedRef.operationName = 'GetTenantInventoryStockTrusted';
exports.getTenantInventoryStockTrustedRef = getTenantInventoryStockTrustedRef;

exports.getTenantInventoryStockTrusted = function getTenantInventoryStockTrusted(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getTenantInventoryStockTrustedRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const voidTenantSaleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'VoidTenantSale', inputVars);
}
voidTenantSaleRef.operationName = 'VoidTenantSale';
exports.voidTenantSaleRef = voidTenantSaleRef;

exports.voidTenantSale = function voidTenantSale(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(voidTenantSaleRef(dcInstance, inputVars));
}
;

const createTenantPurchaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTenantPurchase', inputVars);
}
createTenantPurchaseRef.operationName = 'CreateTenantPurchase';
exports.createTenantPurchaseRef = createTenantPurchaseRef;

exports.createTenantPurchase = function createTenantPurchase(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTenantPurchaseRef(dcInstance, inputVars));
}
;

const createTenantPurchaseLineRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTenantPurchaseLine', inputVars);
}
createTenantPurchaseLineRef.operationName = 'CreateTenantPurchaseLine';
exports.createTenantPurchaseLineRef = createTenantPurchaseLineRef;

exports.createTenantPurchaseLine = function createTenantPurchaseLine(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTenantPurchaseLineRef(dcInstance, inputVars));
}
;

const changeTenantPurchaseStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeTenantPurchaseStatus', inputVars);
}
changeTenantPurchaseStatusRef.operationName = 'ChangeTenantPurchaseStatus';
exports.changeTenantPurchaseStatusRef = changeTenantPurchaseStatusRef;

exports.changeTenantPurchaseStatus = function changeTenantPurchaseStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeTenantPurchaseStatusRef(dcInstance, inputVars));
}
;

const receiveTenantPurchaseLineRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReceiveTenantPurchaseLine', inputVars);
}
receiveTenantPurchaseLineRef.operationName = 'ReceiveTenantPurchaseLine';
exports.receiveTenantPurchaseLineRef = receiveTenantPurchaseLineRef;

exports.receiveTenantPurchaseLine = function receiveTenantPurchaseLine(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(receiveTenantPurchaseLineRef(dcInstance, inputVars));
}
;

const createTenantSupplierRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTenantSupplier', inputVars);
}
createTenantSupplierRef.operationName = 'CreateTenantSupplier';
exports.createTenantSupplierRef = createTenantSupplierRef;

exports.createTenantSupplier = function createTenantSupplier(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTenantSupplierRef(dcInstance, inputVars));
}
;

const updateTenantSupplierRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTenantSupplier', inputVars);
}
updateTenantSupplierRef.operationName = 'UpdateTenantSupplier';
exports.updateTenantSupplierRef = updateTenantSupplierRef;

exports.updateTenantSupplier = function updateTenantSupplier(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateTenantSupplierRef(dcInstance, inputVars));
}
;

const changeTenantSupplierStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeTenantSupplierStatus', inputVars);
}
changeTenantSupplierStatusRef.operationName = 'ChangeTenantSupplierStatus';
exports.changeTenantSupplierStatusRef = changeTenantSupplierStatusRef;

exports.changeTenantSupplierStatus = function changeTenantSupplierStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeTenantSupplierStatusRef(dcInstance, inputVars));
}
;

const createTenantCustomerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTenantCustomer', inputVars);
}
createTenantCustomerRef.operationName = 'CreateTenantCustomer';
exports.createTenantCustomerRef = createTenantCustomerRef;

exports.createTenantCustomer = function createTenantCustomer(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTenantCustomerRef(dcInstance, inputVars));
}
;

const updateTenantCustomerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTenantCustomer', inputVars);
}
updateTenantCustomerRef.operationName = 'UpdateTenantCustomer';
exports.updateTenantCustomerRef = updateTenantCustomerRef;

exports.updateTenantCustomer = function updateTenantCustomer(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateTenantCustomerRef(dcInstance, inputVars));
}
;

const changeTenantCustomerStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeTenantCustomerStatus', inputVars);
}
changeTenantCustomerStatusRef.operationName = 'ChangeTenantCustomerStatus';
exports.changeTenantCustomerStatusRef = changeTenantCustomerStatusRef;

exports.changeTenantCustomerStatus = function changeTenantCustomerStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeTenantCustomerStatusRef(dcInstance, inputVars));
}
;

const createTenantProductRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTenantProduct', inputVars);
}
createTenantProductRef.operationName = 'CreateTenantProduct';
exports.createTenantProductRef = createTenantProductRef;

exports.createTenantProduct = function createTenantProduct(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTenantProductRef(dcInstance, inputVars));
}
;

const updateTenantProductRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTenantProduct', inputVars);
}
updateTenantProductRef.operationName = 'UpdateTenantProduct';
exports.updateTenantProductRef = updateTenantProductRef;

exports.updateTenantProduct = function updateTenantProduct(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateTenantProductRef(dcInstance, inputVars));
}
;

const changeTenantProductStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeTenantProductStatus', inputVars);
}
changeTenantProductStatusRef.operationName = 'ChangeTenantProductStatus';
exports.changeTenantProductStatusRef = changeTenantProductStatusRef;

exports.changeTenantProductStatus = function changeTenantProductStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeTenantProductStatusRef(dcInstance, inputVars));
}
;

const adjustTenantInventoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdjustTenantInventory', inputVars);
}
adjustTenantInventoryRef.operationName = 'AdjustTenantInventory';
exports.adjustTenantInventoryRef = adjustTenantInventoryRef;

exports.adjustTenantInventory = function adjustTenantInventory(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adjustTenantInventoryRef(dcInstance, inputVars));
}
;

const getTenantMembershipTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTenantMembershipTrusted', inputVars);
}
getTenantMembershipTrustedRef.operationName = 'GetTenantMembershipTrusted';
exports.getTenantMembershipTrustedRef = getTenantMembershipTrustedRef;

exports.getTenantMembershipTrusted = function getTenantMembershipTrusted(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getTenantMembershipTrustedRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createTenantOutletRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTenantOutlet', inputVars);
}
createTenantOutletRef.operationName = 'CreateTenantOutlet';
exports.createTenantOutletRef = createTenantOutletRef;

exports.createTenantOutlet = function createTenantOutlet(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTenantOutletRef(dcInstance, inputVars));
}
;

const updateTenantOutletRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTenantOutlet', inputVars);
}
updateTenantOutletRef.operationName = 'UpdateTenantOutlet';
exports.updateTenantOutletRef = updateTenantOutletRef;

exports.updateTenantOutlet = function updateTenantOutlet(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateTenantOutletRef(dcInstance, inputVars));
}
;

const changeTenantOutletStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeTenantOutletStatus', inputVars);
}
changeTenantOutletStatusRef.operationName = 'ChangeTenantOutletStatus';
exports.changeTenantOutletStatusRef = changeTenantOutletStatusRef;

exports.changeTenantOutletStatus = function changeTenantOutletStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeTenantOutletStatusRef(dcInstance, inputVars));
}
;

const createTenantOutletTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTenantOutletTrusted', inputVars);
}
createTenantOutletTrustedRef.operationName = 'CreateTenantOutletTrusted';
exports.createTenantOutletTrustedRef = createTenantOutletTrustedRef;

exports.createTenantOutletTrusted = function createTenantOutletTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTenantOutletTrustedRef(dcInstance, inputVars));
}
;

const updateTenantOutletTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTenantOutletTrusted', inputVars);
}
updateTenantOutletTrustedRef.operationName = 'UpdateTenantOutletTrusted';
exports.updateTenantOutletTrustedRef = updateTenantOutletTrustedRef;

exports.updateTenantOutletTrusted = function updateTenantOutletTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateTenantOutletTrustedRef(dcInstance, inputVars));
}
;

const changeTenantOutletStatusTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeTenantOutletStatusTrusted', inputVars);
}
changeTenantOutletStatusTrustedRef.operationName = 'ChangeTenantOutletStatusTrusted';
exports.changeTenantOutletStatusTrustedRef = changeTenantOutletStatusTrustedRef;

exports.changeTenantOutletStatusTrusted = function changeTenantOutletStatusTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeTenantOutletStatusTrustedRef(dcInstance, inputVars));
}
;

const createTenantEmployeeProfileTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTenantEmployeeProfileTrusted', inputVars);
}
createTenantEmployeeProfileTrustedRef.operationName = 'CreateTenantEmployeeProfileTrusted';
exports.createTenantEmployeeProfileTrustedRef = createTenantEmployeeProfileTrustedRef;

exports.createTenantEmployeeProfileTrusted = function createTenantEmployeeProfileTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTenantEmployeeProfileTrustedRef(dcInstance, inputVars));
}
;

const provisionTenantEmployeeTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ProvisionTenantEmployeeTrusted', inputVars);
}
provisionTenantEmployeeTrustedRef.operationName = 'ProvisionTenantEmployeeTrusted';
exports.provisionTenantEmployeeTrustedRef = provisionTenantEmployeeTrustedRef;

exports.provisionTenantEmployeeTrusted = function provisionTenantEmployeeTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(provisionTenantEmployeeTrustedRef(dcInstance, inputVars));
}
;

const updateTenantEmployeeTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTenantEmployeeTrusted', inputVars);
}
updateTenantEmployeeTrustedRef.operationName = 'UpdateTenantEmployeeTrusted';
exports.updateTenantEmployeeTrustedRef = updateTenantEmployeeTrustedRef;

exports.updateTenantEmployeeTrusted = function updateTenantEmployeeTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateTenantEmployeeTrustedRef(dcInstance, inputVars));
}
;

const changeTenantEmployeeStatusTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeTenantEmployeeStatusTrusted', inputVars);
}
changeTenantEmployeeStatusTrustedRef.operationName = 'ChangeTenantEmployeeStatusTrusted';
exports.changeTenantEmployeeStatusTrustedRef = changeTenantEmployeeStatusTrustedRef;

exports.changeTenantEmployeeStatusTrusted = function changeTenantEmployeeStatusTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeTenantEmployeeStatusTrustedRef(dcInstance, inputVars));
}
;

const changeTenantEmployeeLoginAccessTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeTenantEmployeeLoginAccessTrusted', inputVars);
}
changeTenantEmployeeLoginAccessTrustedRef.operationName = 'ChangeTenantEmployeeLoginAccessTrusted';
exports.changeTenantEmployeeLoginAccessTrustedRef = changeTenantEmployeeLoginAccessTrustedRef;

exports.changeTenantEmployeeLoginAccessTrusted = function changeTenantEmployeeLoginAccessTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeTenantEmployeeLoginAccessTrustedRef(dcInstance, inputVars));
}
;

const createTenantServicePersonTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTenantServicePersonTrusted', inputVars);
}
createTenantServicePersonTrustedRef.operationName = 'CreateTenantServicePersonTrusted';
exports.createTenantServicePersonTrustedRef = createTenantServicePersonTrustedRef;

exports.createTenantServicePersonTrusted = function createTenantServicePersonTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTenantServicePersonTrustedRef(dcInstance, inputVars));
}
;

const updateTenantServicePersonTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTenantServicePersonTrusted', inputVars);
}
updateTenantServicePersonTrustedRef.operationName = 'UpdateTenantServicePersonTrusted';
exports.updateTenantServicePersonTrustedRef = updateTenantServicePersonTrustedRef;

exports.updateTenantServicePersonTrusted = function updateTenantServicePersonTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateTenantServicePersonTrustedRef(dcInstance, inputVars));
}
;

const changeTenantServicePersonStatusTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ChangeTenantServicePersonStatusTrusted', inputVars);
}
changeTenantServicePersonStatusTrustedRef.operationName = 'ChangeTenantServicePersonStatusTrusted';
exports.changeTenantServicePersonStatusTrustedRef = changeTenantServicePersonStatusTrustedRef;

exports.changeTenantServicePersonStatusTrusted = function changeTenantServicePersonStatusTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(changeTenantServicePersonStatusTrustedRef(dcInstance, inputVars));
}
;

const assignTenantEmployeeOutletTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AssignTenantEmployeeOutletTrusted', inputVars);
}
assignTenantEmployeeOutletTrustedRef.operationName = 'AssignTenantEmployeeOutletTrusted';
exports.assignTenantEmployeeOutletTrustedRef = assignTenantEmployeeOutletTrustedRef;

exports.assignTenantEmployeeOutletTrusted = function assignTenantEmployeeOutletTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(assignTenantEmployeeOutletTrustedRef(dcInstance, inputVars));
}
;

const assignTenantServicePersonOutletTrustedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AssignTenantServicePersonOutletTrusted', inputVars);
}
assignTenantServicePersonOutletTrustedRef.operationName = 'AssignTenantServicePersonOutletTrusted';
exports.assignTenantServicePersonOutletTrustedRef = assignTenantServicePersonOutletTrustedRef;

exports.assignTenantServicePersonOutletTrusted = function assignTenantServicePersonOutletTrusted(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(assignTenantServicePersonOutletTrustedRef(dcInstance, inputVars));
}
;
