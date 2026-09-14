import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const source = readFileSync(new URL('../functions/src/index.ts', import.meta.url), 'utf8');
const deploymentSource = readFileSync(new URL('../.github/workflows/firebase-deploy.yml', import.meta.url), 'utf8');
const connectorSource = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
const schemaMigrationSource = readFileSync(new URL('../scripts/drop-service-person-skills.mjs', import.meta.url), 'utf8');
const taxonomyMigrationSource = readFileSync(new URL('../scripts/migrate-product-taxonomy.mjs', import.meta.url), 'utf8');
const cloudSqlMigrationHelperSource = readFileSync(new URL('../scripts/cloud-sql-migration-helpers.mjs', import.meta.url), 'utf8');

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
    expect(deploymentSource).toContain('npx --no-install firebase-tools deploy');
  });

  it('caches dependencies and cancels obsolete deployment runs', () => {
    expect(deploymentSource).toContain('cache: npm');
    expect(deploymentSource).toContain('functions/package-lock.json');
    expect(deploymentSource).toContain('cancel-in-progress: true');
  });

  it('deploys only the targets affected by the pushed commit, defaulting to everything when in doubt', () => {
    expect(deploymentSource).toContain('--only "${{ steps.changes.outputs.targets }}" --non-interactive --force');
    expect(deploymentSource).toContain('targets=hosting,functions,dataconnect');
    expect(deploymentSource).toContain("scripts/(cloud-sql-migration-helpers|drop-service-person-skills|migrate-product-taxonomy)\\.mjs");
    expect(deploymentSource).toContain("if: contains(steps.changes.outputs.targets, 'dataconnect')");
    expect(deploymentSource).toContain('dataconnect:sql:migrate');
    expect(deploymentSource).toContain('experiments:disable fdcapimigration');
    expect(deploymentSource).toContain('--service omniretail-platform --location asia-south1');
    expect(deploymentSource).toContain('Remove retired Service Person and Product columns');
    expect(deploymentSource).toContain('node scripts/drop-service-person-skills.mjs');
    expect(deploymentSource).toContain('node scripts/migrate-product-taxonomy.mjs');
    expect(deploymentSource).toContain('Prepare Product category migration');
    expect(deploymentSource.indexOf('Prepare Product category migration')).toBeLessThan(deploymentSource.indexOf('Migrate Data Connect SQL schema'));
    expect(cloudSqlMigrationHelperSource).toContain('GOOGLE_APPLICATION_CREDENTIALS');
    expect(cloudSqlMigrationHelperSource).toContain('client_email');
    expect(deploymentSource).toContain('--non-interactive --force');
    expect(schemaMigrationSource).toContain('DROP COLUMN IF EXISTS');
    expect(schemaMigrationSource).toContain('quoteIdentifier(\'created_at\')');
    expect(schemaMigrationSource).toContain('quoteIdentifier(\'updated_at\')');
    expect(schemaMigrationSource).toContain('quoteIdentifier(\'supplier_product_code\')');
    expect(schemaMigrationSource).toContain("quoteIdentifier('customer')");
    expect(schemaMigrationSource).toContain("quoteIdentifier('product')");
    expect(schemaMigrationSource).toContain('SET LOCAL ROLE');
    expect(schemaMigrationSource).toContain('await client.query(\'BEGIN\')');
    expect(schemaMigrationSource).toContain('await client.query(\'COMMIT\')');
    expect(taxonomyMigrationSource).toContain('legacy_category_name');
    expect(taxonomyMigrationSource).toContain('legacy_subcategory');
    expect(taxonomyMigrationSource).toContain('legacy_category_id');
    expect(taxonomyMigrationSource).toContain('CREATE TABLE IF NOT EXISTS');
    expect(taxonomyMigrationSource).toContain('category_organizationId_lower_value_uidx');
    expect(taxonomyMigrationSource).toContain('subcategory_categoryId_lower_value_uidx');
    expect(taxonomyMigrationSource).toContain('hasLegacyCategorySources');
    expect(taxonomyMigrationSource).toContain('cloud-sql-migration-helpers.mjs');
    expect(schemaMigrationSource).toContain('cloud-sql-migration-helpers.mjs');
    expect(taxonomyMigrationSource).toContain('ON CONFLICT');
    expect(taxonomyMigrationSource).toContain('ALTER TABLE');
    expect(taxonomyMigrationSource).toContain('category_id');
    expect(taxonomyMigrationSource).toContain('await client.query(\'BEGIN\')');
    expect(taxonomyMigrationSource).toContain('await client.query(\'COMMIT\')');
  });

  it('exposes the outlet create callable with server-side authorization and idempotency checks', () => {
    expect(source).toContain('export const createTenantOutlet = onCall');
    expect(source).toContain("requireCapability(caller, 'outlets.read')");
    expect(source).toContain("membership.role.code !== 'organization.admin'");
    expect(source).toContain('createTenantOutletTrusted');
    expect(source).toContain('idempotencyKey');
    expect(source).not.toContain('async function nextTenantOutletCode()');
    expect(source).not.toContain('listTenantOutletCodesTrusted');
    expect(source).toContain('getTenantOutletTrusted({ organizationId, id })');
    expect(source).toContain('function outletCreationFailure(error: unknown): HttpsError');
    expect(source).toContain("new HttpsError('invalid-argument', 'Some outlet details are invalid.')");
  });

  it('exposes update and status callables with organization-admin scope checks and return the canonical outlet', () => {
    expect(source).toContain('export const updateTenantOutlet = onCall');
    expect(source).toContain('export const changeTenantOutletStatus = onCall');
    expect(source).toContain('requireOrganizationAdmin(actorFirebaseUid, organizationId)');
    expect(source).toContain('getTenantOutletTrusted({ organizationId, id })');
    expect(source).toContain('function mapTrustedOutletRow(row:');
    expect(source).toContain('email: typeof d.email === \'string\' ? d.email.trim().toLowerCase() || null : null');
  });

  it('exposes a guarded organization-admin outlet delete callable', () => {
    expect(source).toContain('export const deleteTenantOutlet = onCall');
    expect(source).toContain('deleteTenantOutletTrusted');
    expect(source).toContain("requireOrganizationAdmin(actorFirebaseUid, organizationId)");
    expect(connectorSource).toContain('mutation DeleteTenantOutletTrusted');
    expect(connectorSource).toContain('Outlet has sales history and cannot be deleted.');
  });

  it('exposes guarded organization-admin delete callables for tenant masters', () => {
    for (const entity of ['Employee', 'ServicePerson', 'Customer', 'Supplier', 'Product']) {
      expect(source).toContain(`export const deleteTenant${entity} = onCall`);
      expect(source).toContain(`deleteTenant${entity}Trusted`);
      expect(source).toContain('requireOrganizationAdmin(actorFirebaseUid, organizationId)');
      expect(connectorSource).toContain(`mutation DeleteTenant${entity}Trusted`);
    }
    expect(source).toContain('employee login must be disabled before deletion');
    expect(source).toContain('deleteAppUserTrusted');
    expect(source).toContain('getAuth().deleteUser(employee.user.firebaseUid)');
    expect(connectorSource).toContain("this[0].loginAccess == 'DISABLED'");
    expect(connectorSource).toContain('Employee login access must be disabled before deletion.');
    expect(connectorSource).toContain('Product has sales history and cannot be deleted.');
  });

  it('exposes guarded organization-admin taxonomy delete callables', () => {
    expect(source).toContain('export const deleteTenantCategory = onCall');
    expect(source).toContain('export const deleteTenantSubcategory = onCall');
    expect(source).toContain('deleteTenantCategoryTrusted');
    expect(source).toContain('deleteTenantSubcategoryTrusted');
    expect(source).toContain("This category has linked subcategories or products and cannot be deleted.");
    expect(source).toContain("This subcategory has linked products and cannot be deleted.");
    expect(connectorSource).toContain('mutation DeleteTenantCategoryTrusted');
    expect(connectorSource).toContain('mutation DeleteTenantSubcategoryTrusted');
    expect(connectorSource).toContain('Category has subcategories and cannot be deleted.');
    expect(connectorSource).toContain('Subcategory has linked products and cannot be deleted.');
  });

  it('provisions employee login through Firebase Auth and trusted SQL', () => {
    expect(source).toContain('export const provisionTenantEmployee = onCall');
    expect(source).toContain('provisionTenantEmployeeTrusted');
    expect(source).toContain("requireOrganizationAdmin(actorFirebaseUid, organizationId)");
    expect(source).toContain("getAuth().createUser({ email, password:");
    expect(source).toContain('function employeeAuthEmail(username: string)');
    expect(source).toContain('const initialPassword = typeof d.initialPassword === \'string\' ? d.initialPassword : \'\'');
    expect(source).toContain("permissionProfile === 'Admin' ? '00000000-0000-4000-8000-000000000002'");
    const start = source.indexOf('export const provisionTenantEmployee = onCall');
    const end = source.indexOf('export const createTenantEmployeeProfile = onCall', start);
    const provisioningHandler = source.slice(start, end);
    expect(provisioningHandler).not.toContain("sendManagedPasswordEmail(email, 'PASSWORD_RESET');");
    expect(provisioningHandler).not.toContain('phoneNumber: phone');
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
    expect(source).toContain('const notes = typeof d.notes === \'string\' ? d.notes.trim() || null : null');
    expect(source).toContain('notes, auditId: randomUUID()');
    expect(source).toContain('export const assignTenantEmployeeOutlet = onCall');
    expect(source).toContain('export const assignTenantServicePersonOutlet = onCall');
    expect(source).toContain("const outletId = typeof d.outletId === 'string' ? d.outletId : ''");
    expect(source).toContain("if (assignmentScope === 'OUTLET') await assignTenantServicePersonOutletTrusted");
    expect(source.indexOf('assignTenantServicePersonOutletTrusted({ organizationId, servicePersonId: id'))
      .toBeLessThan(source.indexOf('getTenantServicePersonTrusted({ organizationId, id })'));
    expect(source).not.toContain('skills: typeof d.skills');
    expect(source).not.toContain("!specialization ||");
  });

  it('exposes tenant product and inventory write boundaries', () => {
    expect(source).toContain('export const createTenantProductRecord = onCall');
    expect(source).toContain("requireOrganizationCapability(actor, organizationId, 'products.read')");
    expect(source).toContain('await createTenantProduct({ id, organizationId, ...productData, ...taxonomy');
    expect(source).not.toContain('d.productCode');
    expect(source).not.toContain('supplierProductCode');
    expect(source).toContain('getTenantProductTrusted({ organizationId, id })');
    expect(source).toContain('function productCreationFailure(error: unknown): HttpsError');
    expect(source).toContain("new HttpsError('already-exists'");
    expect(source).toContain("new HttpsError('invalid-argument'");
    expect(source).toContain('export const updateTenantProductRecord = onCall');
    expect(source).toContain('resolveProductTaxonomy');
    expect(source).toContain('createTenantCategoryTrusted');
    expect(source).toContain('createTenantSubcategoryTrusted');
    expect(source).toContain('requestId: `${requestId}:subcategory`');
    expect(source).not.toContain('createTenantCategoryTrusted({ id: randomUUID(), organizationId, value: categoryName.trim(), auditId: randomUUID(), requestId: randomUUID()');
    expect(source).toContain('export const changeTenantProductStatus = onCall');
    expect(source).toContain('export const adjustTenantInventoryStock = onCall');
    expect(source).toContain("requireOrganizationCapability(actor, organizationId, 'inventory.read')");
    expect(source).toContain('adjustTenantInventory({ organizationId, outletId, productId');
  });

  it('exposes an organization-scoped customer creation boundary', () => {
    expect(source).toContain('export const createTenantCustomerRecord = onCall');
    expect(source).toContain("requireOrganizationCapability(actor, organizationId, 'customers.read')");
    expect(source).toContain('await createTenantCustomer({ id, organizationId, type, name');
    expect(source).not.toContain('d.customerCode');
    expect(source).toContain('export const updateTenantCustomerRecord = onCall');
    expect(source).toContain('export const changeTenantCustomerStatus = onCall');
  });

  it('exposes an organization-scoped supplier creation boundary', () => {
    expect(source).toContain('export const createTenantSupplierRecord = onCall');
    expect(source).toContain("requireOrganizationCapability(actor, organizationId, 'suppliers.read')");
    expect(source).toContain('await createTenantSupplier({ id, organizationId, name, contactPerson');
    expect(source).not.toContain('d.supplierCode');
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

  it('never embeds a same-transaction read-back query in a create mutation (Data Connect does not read your own writes there)', () => {
    // Regression guard: a `query { <table>(key: { id: $id }) { ... } }` placed after an
    // `_insert` in the same @transaction mutation does NOT see the just-inserted row at
    // runtime (verified against the live deployed backend), even though it validates fine
    // through local schema codegen and passes callable-response unit tests that mock the
    // SDK. Every create path must instead call a separate trusted `Get<Entity>Trusted`
    // query after the insert commits, exactly like the update/status-change paths already
    // do (see functions/src/index.ts and the GetTenant*Trusted queries in identity.gql).
    expect(connectorSource).not.toMatch(/query \{ \w+\(key: \{ id: \$id \}\)/);
  });

  it('reads back every newly created entity via a separate trusted query instead of an embedded one', () => {
    expect(source).toContain('getTenantEmployeeTrusted({ organizationId, id })');
    expect(source).toContain('getTenantEmployeeTrusted({ organizationId, id: employeeId })');
    expect(source).toContain('getTenantServicePersonTrusted({ organizationId, id })');
    expect(source).toContain('getTenantCustomerTrusted({ organizationId, id })');
    expect(source).toContain('getTenantSupplierTrusted({ organizationId, id })');
  });

  it('treats organization administrators as authorized for tenant operational capabilities', () => {
    expect(source).toContain("role.code === 'organization.admin'");
    expect(source).toContain("tenantOperationalCapabilities.has(capability)");
    expect(source).toContain("membership.role.code === 'organization.admin'");
  });
});
