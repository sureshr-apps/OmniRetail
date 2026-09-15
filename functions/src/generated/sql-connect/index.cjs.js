const { validateAdminArgs } = require('firebase-admin/data-connect');

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

function deleteLicensePlan(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('DeleteLicensePlan', inputVars, inputOpts);
}
exports.deleteLicensePlan = deleteLicensePlan;

function getLicensePlanReferencesTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetLicensePlanReferencesTrusted', inputVars, inputOpts);
}
exports.getLicensePlanReferencesTrusted = getLicensePlanReferencesTrusted;

function deleteLicensePlanTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('DeleteLicensePlanTrusted', inputVars, inputOpts);
}
exports.deleteLicensePlanTrusted = deleteLicensePlanTrusted;

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

function ensureAppUserRoleTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('EnsureAppUserRoleTrusted', inputVars, inputOpts);
}
exports.ensureAppUserRoleTrusted = ensureAppUserRoleTrusted;

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

function getOrganizationAdministratorTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetOrganizationAdministratorTrusted', inputVars, inputOpts);
}
exports.getOrganizationAdministratorTrusted = getOrganizationAdministratorTrusted;

function resolveOrganizationAdministratorIdentity(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ResolveOrganizationAdministratorIdentity', inputVars, inputOpts);
}
exports.resolveOrganizationAdministratorIdentity = resolveOrganizationAdministratorIdentity;

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

function listOrganizationUsersForDeletionTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListOrganizationUsersForDeletionTrusted', inputVars, inputOpts);
}
exports.listOrganizationUsersForDeletionTrusted = listOrganizationUsersForDeletionTrusted;

function deleteOrganizationTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('DeleteOrganizationTrusted', inputVars, inputOpts);
}
exports.deleteOrganizationTrusted = deleteOrganizationTrusted;

function deleteAppUserTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('DeleteAppUserTrusted', inputVars, inputOpts);
}
exports.deleteAppUserTrusted = deleteAppUserTrusted;

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

function listTenantOutlets(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListTenantOutlets', inputVars, inputOpts);
}
exports.listTenantOutlets = listTenantOutlets;

function listTenantEmployees(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListTenantEmployees', inputVars, inputOpts);
}
exports.listTenantEmployees = listTenantEmployees;

function listTenantServicePersons(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListTenantServicePersons', inputVars, inputOpts);
}
exports.listTenantServicePersons = listTenantServicePersons;

function listTenantCategories(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListTenantCategories', inputVars, inputOpts);
}
exports.listTenantCategories = listTenantCategories;

function listTenantProducts(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListTenantProducts', inputVars, inputOpts);
}
exports.listTenantProducts = listTenantProducts;

function listTenantInventory(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListTenantInventory', inputVars, inputOpts);
}
exports.listTenantInventory = listTenantInventory;

function listTenantCustomers(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListTenantCustomers', inputVars, inputOpts);
}
exports.listTenantCustomers = listTenantCustomers;

function listTenantCustomerPurchaseHistory(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListTenantCustomerPurchaseHistory', inputVars, inputOpts);
}
exports.listTenantCustomerPurchaseHistory = listTenantCustomerPurchaseHistory;

function listTenantSuppliers(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListTenantSuppliers', inputVars, inputOpts);
}
exports.listTenantSuppliers = listTenantSuppliers;

function listTenantPurchases(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListTenantPurchases', inputVars, inputOpts);
}
exports.listTenantPurchases = listTenantPurchases;

function listTenantExpenses(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListTenantExpenses', inputVars, inputOpts);
}
exports.listTenantExpenses = listTenantExpenses;

function createTenantExpense(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateTenantExpense', inputVars, inputOpts);
}
exports.createTenantExpense = createTenantExpense;

function updateTenantExpense(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpdateTenantExpense', inputVars, inputOpts);
}
exports.updateTenantExpense = updateTenantExpense;

function changeTenantExpenseApproval(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('ChangeTenantExpenseApproval', inputVars, inputOpts);
}
exports.changeTenantExpenseApproval = changeTenantExpenseApproval;

function voidTenantExpense(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('VoidTenantExpense', inputVars, inputOpts);
}
exports.voidTenantExpense = voidTenantExpense;

function listTenantSales(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListTenantSales', inputVars, inputOpts);
}
exports.listTenantSales = listTenantSales;

function createTenantSale(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateTenantSale', inputVars, inputOpts);
}
exports.createTenantSale = createTenantSale;

function addTenantSaleLine(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('AddTenantSaleLine', inputVars, inputOpts);
}
exports.addTenantSaleLine = addTenantSaleLine;

function getTenantInventoryStockTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetTenantInventoryStockTrusted', inputVars, inputOpts);
}
exports.getTenantInventoryStockTrusted = getTenantInventoryStockTrusted;

function voidTenantSale(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('VoidTenantSale', inputVars, inputOpts);
}
exports.voidTenantSale = voidTenantSale;

function createTenantPurchase(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateTenantPurchase', inputVars, inputOpts);
}
exports.createTenantPurchase = createTenantPurchase;

function createTenantPurchaseLine(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateTenantPurchaseLine', inputVars, inputOpts);
}
exports.createTenantPurchaseLine = createTenantPurchaseLine;

function changeTenantPurchaseStatus(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('ChangeTenantPurchaseStatus', inputVars, inputOpts);
}
exports.changeTenantPurchaseStatus = changeTenantPurchaseStatus;

function receiveTenantPurchaseLine(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('ReceiveTenantPurchaseLine', inputVars, inputOpts);
}
exports.receiveTenantPurchaseLine = receiveTenantPurchaseLine;

function createTenantSupplier(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateTenantSupplier', inputVars, inputOpts);
}
exports.createTenantSupplier = createTenantSupplier;

function updateTenantSupplier(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpdateTenantSupplier', inputVars, inputOpts);
}
exports.updateTenantSupplier = updateTenantSupplier;

function changeTenantSupplierStatus(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('ChangeTenantSupplierStatus', inputVars, inputOpts);
}
exports.changeTenantSupplierStatus = changeTenantSupplierStatus;

function getTenantSupplierTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetTenantSupplierTrusted', inputVars, inputOpts);
}
exports.getTenantSupplierTrusted = getTenantSupplierTrusted;

function createTenantCustomer(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateTenantCustomer', inputVars, inputOpts);
}
exports.createTenantCustomer = createTenantCustomer;

function updateTenantCustomer(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpdateTenantCustomer', inputVars, inputOpts);
}
exports.updateTenantCustomer = updateTenantCustomer;

function changeTenantCustomerStatus(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('ChangeTenantCustomerStatus', inputVars, inputOpts);
}
exports.changeTenantCustomerStatus = changeTenantCustomerStatus;

function getTenantCustomerTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetTenantCustomerTrusted', inputVars, inputOpts);
}
exports.getTenantCustomerTrusted = getTenantCustomerTrusted;

function listTenantCategoriesTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListTenantCategoriesTrusted', inputVars, inputOpts);
}
exports.listTenantCategoriesTrusted = listTenantCategoriesTrusted;

function createTenantCategoryTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateTenantCategoryTrusted', inputVars, inputOpts);
}
exports.createTenantCategoryTrusted = createTenantCategoryTrusted;

function createTenantSubcategoryTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateTenantSubcategoryTrusted', inputVars, inputOpts);
}
exports.createTenantSubcategoryTrusted = createTenantSubcategoryTrusted;

function createTenantProduct(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateTenantProduct', inputVars, inputOpts);
}
exports.createTenantProduct = createTenantProduct;

function updateTenantProduct(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpdateTenantProduct', inputVars, inputOpts);
}
exports.updateTenantProduct = updateTenantProduct;

function changeTenantProductStatus(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('ChangeTenantProductStatus', inputVars, inputOpts);
}
exports.changeTenantProductStatus = changeTenantProductStatus;

function getTenantProductTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetTenantProductTrusted', inputVars, inputOpts);
}
exports.getTenantProductTrusted = getTenantProductTrusted;

function adjustTenantInventory(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('AdjustTenantInventory', inputVars, inputOpts);
}
exports.adjustTenantInventory = adjustTenantInventory;

function createTenantInventoryStock(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateTenantInventoryStock', inputVars, inputOpts);
}
exports.createTenantInventoryStock = createTenantInventoryStock;

function getTenantMembershipTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetTenantMembershipTrusted', inputVars, inputOpts);
}
exports.getTenantMembershipTrusted = getTenantMembershipTrusted;

function resolveTenantEmployeeIdentityTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ResolveTenantEmployeeIdentityTrusted', inputVars, inputOpts);
}
exports.resolveTenantEmployeeIdentityTrusted = resolveTenantEmployeeIdentityTrusted;

function createTenantOutlet(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateTenantOutlet', inputVars, inputOpts);
}
exports.createTenantOutlet = createTenantOutlet;

function updateTenantOutlet(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpdateTenantOutlet', inputVars, inputOpts);
}
exports.updateTenantOutlet = updateTenantOutlet;

function changeTenantOutletStatus(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('ChangeTenantOutletStatus', inputVars, inputOpts);
}
exports.changeTenantOutletStatus = changeTenantOutletStatus;

function createTenantOutletTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateTenantOutletTrusted', inputVars, inputOpts);
}
exports.createTenantOutletTrusted = createTenantOutletTrusted;

function updateTenantOutletTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpdateTenantOutletTrusted', inputVars, inputOpts);
}
exports.updateTenantOutletTrusted = updateTenantOutletTrusted;

function changeTenantOutletStatusTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('ChangeTenantOutletStatusTrusted', inputVars, inputOpts);
}
exports.changeTenantOutletStatusTrusted = changeTenantOutletStatusTrusted;

function deleteTenantOutletTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('DeleteTenantOutletTrusted', inputVars, inputOpts);
}
exports.deleteTenantOutletTrusted = deleteTenantOutletTrusted;

function deleteTenantEmployeeTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('DeleteTenantEmployeeTrusted', inputVars, inputOpts);
}
exports.deleteTenantEmployeeTrusted = deleteTenantEmployeeTrusted;

function deleteTenantServicePersonTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('DeleteTenantServicePersonTrusted', inputVars, inputOpts);
}
exports.deleteTenantServicePersonTrusted = deleteTenantServicePersonTrusted;

function deleteTenantServicePersonOutletTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('DeleteTenantServicePersonOutletTrusted', inputVars, inputOpts);
}
exports.deleteTenantServicePersonOutletTrusted = deleteTenantServicePersonOutletTrusted;

function deleteTenantCustomerTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('DeleteTenantCustomerTrusted', inputVars, inputOpts);
}
exports.deleteTenantCustomerTrusted = deleteTenantCustomerTrusted;

function deleteTenantSupplierTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('DeleteTenantSupplierTrusted', inputVars, inputOpts);
}
exports.deleteTenantSupplierTrusted = deleteTenantSupplierTrusted;

function deleteTenantProductTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('DeleteTenantProductTrusted', inputVars, inputOpts);
}
exports.deleteTenantProductTrusted = deleteTenantProductTrusted;

function deleteTenantCategoryTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('DeleteTenantCategoryTrusted', inputVars, inputOpts);
}
exports.deleteTenantCategoryTrusted = deleteTenantCategoryTrusted;

function deleteTenantSubcategoryTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('DeleteTenantSubcategoryTrusted', inputVars, inputOpts);
}
exports.deleteTenantSubcategoryTrusted = deleteTenantSubcategoryTrusted;

function getTenantOutletTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetTenantOutletTrusted', inputVars, inputOpts);
}
exports.getTenantOutletTrusted = getTenantOutletTrusted;

function createTenantEmployeeProfileTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateTenantEmployeeProfileTrusted', inputVars, inputOpts);
}
exports.createTenantEmployeeProfileTrusted = createTenantEmployeeProfileTrusted;

function provisionTenantEmployeeTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('ProvisionTenantEmployeeTrusted', inputVars, inputOpts);
}
exports.provisionTenantEmployeeTrusted = provisionTenantEmployeeTrusted;

function provisionTenantEmployeeLoginTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('ProvisionTenantEmployeeLoginTrusted', inputVars, inputOpts);
}
exports.provisionTenantEmployeeLoginTrusted = provisionTenantEmployeeLoginTrusted;

function updateTenantEmployeeLoginTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpdateTenantEmployeeLoginTrusted', inputVars, inputOpts);
}
exports.updateTenantEmployeeLoginTrusted = updateTenantEmployeeLoginTrusted;

function updateTenantEmployeeTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpdateTenantEmployeeTrusted', inputVars, inputOpts);
}
exports.updateTenantEmployeeTrusted = updateTenantEmployeeTrusted;

function changeTenantEmployeeStatusTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('ChangeTenantEmployeeStatusTrusted', inputVars, inputOpts);
}
exports.changeTenantEmployeeStatusTrusted = changeTenantEmployeeStatusTrusted;

function changeTenantEmployeeLoginAccessTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('ChangeTenantEmployeeLoginAccessTrusted', inputVars, inputOpts);
}
exports.changeTenantEmployeeLoginAccessTrusted = changeTenantEmployeeLoginAccessTrusted;

function getTenantEmployeeTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetTenantEmployeeTrusted', inputVars, inputOpts);
}
exports.getTenantEmployeeTrusted = getTenantEmployeeTrusted;

function createTenantServicePersonTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateTenantServicePersonTrusted', inputVars, inputOpts);
}
exports.createTenantServicePersonTrusted = createTenantServicePersonTrusted;

function updateTenantServicePersonTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpdateTenantServicePersonTrusted', inputVars, inputOpts);
}
exports.updateTenantServicePersonTrusted = updateTenantServicePersonTrusted;

function changeTenantServicePersonStatusTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('ChangeTenantServicePersonStatusTrusted', inputVars, inputOpts);
}
exports.changeTenantServicePersonStatusTrusted = changeTenantServicePersonStatusTrusted;

function getTenantServicePersonTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetTenantServicePersonTrusted', inputVars, inputOpts);
}
exports.getTenantServicePersonTrusted = getTenantServicePersonTrusted;

function assignTenantEmployeeOutletTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('AssignTenantEmployeeOutletTrusted', inputVars, inputOpts);
}
exports.assignTenantEmployeeOutletTrusted = assignTenantEmployeeOutletTrusted;

function deleteTenantEmployeeOutletTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('DeleteTenantEmployeeOutletTrusted', inputVars, inputOpts);
}
exports.deleteTenantEmployeeOutletTrusted = deleteTenantEmployeeOutletTrusted;

function assignTenantServicePersonOutletTrusted(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('AssignTenantServicePersonOutletTrusted', inputVars, inputOpts);
}
exports.assignTenantServicePersonOutletTrusted = assignTenantServicePersonOutletTrusted;

