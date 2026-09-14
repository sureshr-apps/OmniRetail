import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const source = readFileSync(new URL('../functions/src/index.ts', import.meta.url), 'utf8');
const deploymentSource = readFileSync(new URL('../.github/workflows/firebase-deploy.yml', import.meta.url), 'utf8');

describe('tenant callable contract', () => {
  it('allows callable requests from deployed Firebase Hosting origins', () => {
    expect(source).toContain("invoker: 'public'");
    expect(source).toContain('cors: [');
    expect(source).toContain("'https://omniretail.firebaseapp.com'");
    expect(source).toContain("'https://omniretail.web.app'");
    expect(source).toContain("'https://omniretail-60c71.firebaseapp.com'");
    expect(source).toContain("'https://omniretail-60c71.web.app'");
  });

  it('uses function source as the public-invoker authority without serial IAM rebinding', () => {
    expect(deploymentSource).not.toContain('gcloud functions list --v2');
    expect(deploymentSource).not.toContain('gcloud run services add-iam-policy-binding');
    expect(deploymentSource).toContain('npx --yes firebase-tools@15.30.0 deploy');
  });

  it('caches dependencies and cancels obsolete deployment runs', () => {
    expect(deploymentSource).toContain('cache: npm');
    expect(deploymentSource).toContain('functions/package-lock.json');
    expect(deploymentSource).toContain('cancel-in-progress: true');
  });

  it('deploys the intentional Data Connect outlet contract migration with force', () => {
    expect(deploymentSource).toContain('--only hosting,functions,dataconnect --non-interactive --force');
    expect(deploymentSource).not.toContain('dataconnect:sql:migrate');
  });

  it('exposes the outlet create callable with server-side authorization and idempotency checks', () => {
    expect(source).toContain('export const createTenantOutlet = onCall');
    expect(source).toContain("requireCapability(caller, 'outlets.read')");
    expect(source).toContain("membership.role.code !== 'organization.admin'");
    expect(source).toContain('createTenantOutletTrusted');
    expect(source).toContain('idempotencyKey');
    expect(source).not.toContain('async function nextTenantOutletCode()');
    expect(source).not.toContain('listTenantOutletCodesTrusted');
    expect(source).toContain('created.data.query?.outlet');
    expect(source).toContain('function outletCreationFailure(error: unknown): HttpsError');
    expect(source).toContain("new HttpsError('invalid-argument', 'Some outlet details are invalid.')");
  });

  it('exposes update and status callables with organization-admin scope checks and return the canonical outlet', () => {
    expect(source).toContain('export const updateTenantOutlet = onCall');
    expect(source).toContain('export const changeTenantOutletStatus = onCall');
    expect(source).toContain('requireOrganizationAdmin(actorFirebaseUid, organizationId)');
    expect(source).toContain('getTenantOutletTrusted({ organizationId, id })');
    expect(source).toContain('function mapTrustedOutletRow(row:');
  });

  it('provisions employee login through Firebase Auth and trusted SQL', () => {
    expect(source).toContain('export const provisionTenantEmployee = onCall');
    expect(source).toContain('provisionTenantEmployeeTrusted');
    expect(source).toContain("requireOrganizationAdmin(actorFirebaseUid, organizationId)");
    expect(source).toContain("getAuth().createUser({ email, password:");
  });

  it('exposes employee lifecycle callables with Auth synchronization', () => {
    expect(source).toContain('export const updateTenantEmployee = onCall');
    expect(source).toContain('export const changeTenantEmployeeStatus = onCall');
    expect(source).toContain('export const changeTenantEmployeeLoginAccess = onCall');
    expect(source).toContain('resolveTenantEmployeeIdentityTrusted');
    expect(source).toContain('revokeRefreshTokens(targetUid)');
    expect(source).not.toContain("uid = typeof d.firebaseUid");
    expect(source).toContain('changeTenantEmployeeLoginAccessTrusted');
    expect(source).toContain('export const createTenantEmployeeProfile = onCall');
  });

  it('exposes service-person lifecycle callables without employee login coupling', () => {
    expect(source).toContain('export const createTenantServicePerson = onCall');
    expect(source).toContain('export const updateTenantServicePerson = onCall');
    expect(source).toContain('export const changeTenantServicePersonStatus = onCall');
    expect(source).toContain('createTenantServicePersonTrusted');
    expect(source).toContain('export const assignTenantEmployeeOutlet = onCall');
    expect(source).toContain('export const assignTenantServicePersonOutlet = onCall');
  });

  it('exposes tenant product and inventory write boundaries', () => {
    expect(source).toContain('export const createTenantProductRecord = onCall');
    expect(source).toContain("requireOrganizationCapability(actor, organizationId, 'products.read')");
    expect(source).toContain('createTenantProduct({ id: randomUUID(), organizationId, productCode');
    expect(source).toContain('function productCreationFailure(error: unknown): HttpsError');
    expect(source).toContain("new HttpsError('already-exists'");
    expect(source).toContain("new HttpsError('invalid-argument'");
    expect(source).toContain('export const updateTenantProductRecord = onCall');
    expect(source).toContain('export const changeTenantProductStatus = onCall');
    expect(source).toContain('export const adjustTenantInventoryStock = onCall');
    expect(source).toContain("requireOrganizationCapability(actor, organizationId, 'inventory.read')");
    expect(source).toContain('adjustTenantInventory({ organizationId, outletId, productId');
  });

  it('exposes an organization-scoped customer creation boundary', () => {
    expect(source).toContain('export const createTenantCustomerRecord = onCall');
    expect(source).toContain("requireOrganizationCapability(actor, organizationId, 'customers.read')");
    expect(source).toContain('createTenantCustomer({ id: randomUUID(), organizationId, customerCode');
    expect(source).toContain('export const updateTenantCustomerRecord = onCall');
    expect(source).toContain('export const changeTenantCustomerStatus = onCall');
  });

  it('exposes an organization-scoped supplier creation boundary', () => {
    expect(source).toContain('export const createTenantSupplierRecord = onCall');
    expect(source).toContain("requireOrganizationCapability(actor, organizationId, 'suppliers.read')");
    expect(source).toContain('createTenantSupplier({ id: randomUUID(), organizationId, supplierCode');
    expect(source).toContain('export const changeTenantSupplierStatus = onCall');
    expect(source).toContain('export const updateTenantSupplierRecord = onCall');
    expect(source).toContain('updateTenantSupplier({ organizationId, id');
  });

  it('exposes an organization-scoped purchase creation boundary', () => {
    expect(source).toContain('export const createTenantPurchaseRecord = onCall');
    expect(source).toContain("requireOrganizationCapability(actor, organizationId, 'purchases.read')");
    expect(source).toContain('createTenantPurchase({ organizationId, purchaseNumber');
  });

  it('exposes a tenant purchase status boundary', () => {
    expect(source).toContain('export const changeTenantPurchaseStatus = onCall');
    expect(source).toContain('changeTenantPurchaseStatusSql({ organizationId, id');
  });

  it('exposes a tenant purchase receiving boundary', () => {
    expect(source).toContain('export const receiveTenantPurchaseLineRecord = onCall');
    expect(source).toContain('receiveTenantPurchaseLine({ organizationId, purchaseId, lineId');
    expect(source).toContain('batchNumber: typeof d.batchNumber');
  });

  it('exposes an organization-scoped expense creation boundary', () => {
    expect(source).toContain('export const createTenantExpenseRecord = onCall');
    expect(source).toContain("requireOrganizationCapability(actor, organizationId, 'expenses.read')");
    expect(source).toContain('createTenantExpense({ organizationId, expenseNumber');
  });

  it('exposes expense approval and void boundaries', () => {
    expect(source).toContain('export const changeTenantExpenseApprovalStatus = onCall');
    expect(source).toContain('changeTenantExpenseApproval({ organizationId, id');
    expect(source).toContain('export const voidTenantExpenseRecord = onCall');
    expect(source).toContain('voidTenantExpense({ organizationId, id');
  });

  it('exposes the tenant sale completion boundary', () => {
    expect(source).toContain('export const completeTenantSale = onCall');
    expect(source).toContain("requireOrganizationCapability(actor, organizationId, 'sales.read')");
    expect(source).toContain('createTenantSale({ organizationId, outletId, receiptNumber');
  });

  it('exposes tenant-validated sale line persistence', () => {
    expect(source).toContain('export const addTenantSaleLineRecord = onCall');
    expect(source).toContain('addTenantSaleLine({ organizationId, saleId, outletId, productId');
    expect(source).toContain('getTenantInventoryStockTrusted');
    expect(source).toContain('insufficient stock');
  });

  it('exposes tenant-scoped held-order persistence for the POS cart', () => {
    expect(source).toContain('export const listTenantHeldOrders = onCall');
    expect(source).toContain('export const createTenantHeldOrder = onCall');
    expect(source).toContain('export const deleteTenantHeldOrder = onCall');
    expect(source).toContain('heldOrdersCollection(organizationId)');
  });

  it('exposes the production inventory creation boundary', () => {
    expect(source).toContain('export const createTenantInventoryStockRecord = onCall');
    expect(source).toContain('createTenantInventoryStock');
    expect(source).toContain("requireOrganizationCapability(actor, organizationId, 'inventory.read')");
  });

  it('treats organization administrators as authorized for tenant operational capabilities', () => {
    expect(source).toContain("role.code === 'organization.admin'");
    expect(source).toContain("tenantOperationalCapabilities.has(capability)");
    expect(source).toContain("membership.role.code === 'organization.admin'");
  });
});
