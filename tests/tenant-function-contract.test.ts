import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const source = readFileSync(new URL('../functions/src/index.ts', import.meta.url), 'utf8');
const deploymentSource = readFileSync(new URL('../.github/workflows/firebase-deploy.yml', import.meta.url), 'utf8');
const connectorSource = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
const schemaMigrationSource = readFileSync(new URL('../scripts/drop-service-person-skills.mjs', import.meta.url), 'utf8');
const taxonomyMigrationSource = readFileSync(new URL('../scripts/migrate-product-taxonomy.mjs', import.meta.url), 'utf8');
const lifecycleRemovalSource = readFileSync(new URL('../scripts/drop-lifecycle-idempotency.mjs', import.meta.url), 'utf8');
const appUserColumnRemovalSource = readFileSync(new URL('../scripts/drop-app-user-legacy-columns.mjs', import.meta.url), 'utf8');
const tenantColumnRemovalSource = readFileSync(new URL('../scripts/drop-tenant-legacy-columns.mjs', import.meta.url), 'utf8');
const customerAddressColumnRemovalSource = readFileSync(new URL('../scripts/drop-customer-address-columns.mjs', import.meta.url), 'utf8');
const taxonomyIndexRemovalSource = readFileSync(new URL('../scripts/drop-product-taxonomy-helper-indexes.mjs', import.meta.url), 'utf8');
const cloudSqlMigrationHelperSource = readFileSync(new URL('../scripts/cloud-sql-migration-helpers.mjs', import.meta.url), 'utf8');
const dataConnectConfigSource = readFileSync(new URL('../dataconnect/dataconnect.yaml', import.meta.url), 'utf8');

describe('tenant callable contract', () => {
  it('allows callable requests from deployed Firebase Hosting origins', () => {
    expect(source).toContain("invoker: 'public'");
    expect(source).toContain('cors: [');
    expect(source).toContain("'https://omniretail.firebaseapp.com'");
    expect(source).toContain("'https://omniretail.web.app'");
    expect(source).toContain("'https://omniretail-60c71.firebaseapp.com'");
    expect(source).toContain("'https://omniretail-60c71.web.app'");
    expect(source).toContain("'http://localhost:3000'");
    expect(source).toContain("'http://localhost:5173'");
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

  it('uses compatible schema validation for production Data Connect migrations', () => {
    expect(dataConnectConfigSource).toContain('schemaValidation: "COMPATIBLE"');
  });

  it('deploys only the targets affected by the pushed commit, defaulting to everything when in doubt', () => {
    expect(deploymentSource).toContain('TARGETS="${{ steps.changes.outputs.targets }}"');
    expect(deploymentSource).toContain('targets=hosting,functions,dataconnect');
    expect(deploymentSource).toContain("scripts/(cloud-sql-migration-helpers|drop-app-user-legacy-columns|drop-tenant-legacy-columns|drop-lifecycle-idempotency|drop-service-person-skills|drop-customer-address-columns|migrate-product-taxonomy|drop-product-taxonomy-helper-indexes)\\.mjs");
    expect(deploymentSource).toContain("if: contains(steps.changes.outputs.targets, 'dataconnect')");
    expect(deploymentSource).toContain('deploy --project "$FIREBASE_PROJECT_ID" --only dataconnect --non-interactive --force');
    expect(deploymentSource).toContain('dataconnect:execute dataconnect/bootstrap_rbac.gql BootstrapPlatformRbac');
    expect(deploymentSource.indexOf('Deploy Data Connect schema and connectors')).toBeLessThan(deploymentSource.indexOf('dataconnect:execute dataconnect/bootstrap_rbac.gql BootstrapPlatformRbac'));
    expect(deploymentSource).toContain('dataconnect:execute dataconnect/bootstrap_rbac_permissions.gql BootstrapPlatformRbacPermissions');
    expect(deploymentSource.indexOf('BootstrapPlatformRbac')).toBeLessThan(deploymentSource.indexOf('BootstrapPlatformRbacPermissions'));
    expect(deploymentSource).toContain('--service omniretail-platform --location asia-south1');
    expect(deploymentSource).toContain('Remove retired Service Person and Product columns');
    expect(deploymentSource).toContain('node scripts/drop-service-person-skills.mjs');
    expect(deploymentSource).toContain('node scripts/migrate-product-taxonomy.mjs');
    expect(deploymentSource).toContain('node scripts/drop-lifecycle-idempotency.mjs');
    expect(deploymentSource).toContain('node scripts/drop-app-user-legacy-columns.mjs');
    expect(deploymentSource).toContain('node scripts/drop-tenant-legacy-columns.mjs');
    expect(deploymentSource).toContain('node scripts/drop-customer-address-columns.mjs');
    expect(deploymentSource).toContain('node scripts/drop-product-taxonomy-helper-indexes.mjs');
    expect(deploymentSource).toContain('Prepare Product category migration');
    expect(deploymentSource).toContain('Remove retired lifecycle, reconciliation, and audit storage');
    expect(deploymentSource.indexOf('Prepare Product category migration')).toBeLessThan(deploymentSource.indexOf('Deploy Data Connect schema and connectors'));
    expect(deploymentSource.indexOf('Remove retired lifecycle, reconciliation, and audit storage')).toBeLessThan(deploymentSource.indexOf('Deploy Data Connect schema and connectors'));
    expect(deploymentSource.indexOf('Remove retired customer address columns')).toBeLessThan(deploymentSource.indexOf('Deploy Data Connect schema and connectors'));
    expect(deploymentSource.indexOf('Remove unmanaged product taxonomy helper indexes')).toBeLessThan(deploymentSource.indexOf('Deploy Data Connect schema and connectors'));
    expect(cloudSqlMigrationHelperSource).toContain('GOOGLE_APPLICATION_CREDENTIALS');
    expect(cloudSqlMigrationHelperSource).toContain('client_email');
    expect(deploymentSource).toContain('--non-interactive --force');
    expect(schemaMigrationSource).toContain('DROP COLUMN IF EXISTS');
    expect(schemaMigrationSource).toContain('quoteIdentifier(\'created_at\')');
    expect(schemaMigrationSource).toContain('quoteIdentifier(\'updated_at\')');
    expect(schemaMigrationSource).toContain("quoteIdentifier('employee')");
    expect(schemaMigrationSource).toContain('quoteIdentifier(\'supplier_product_code\')');
    expect(schemaMigrationSource).toContain("quoteIdentifier('customer')");
    expect(schemaMigrationSource).toContain("quoteIdentifier('product')");
    expect(schemaMigrationSource).toContain('SET LOCAL ROLE');
    expect(schemaMigrationSource).toContain('await client.query(\'BEGIN\')');
    expect(schemaMigrationSource).toContain('await client.query(\'COMMIT\')');
    expect(lifecycleRemovalSource).toContain("quoteIdentifier('lifecycle_idempotency')");
    expect(lifecycleRemovalSource).toContain("quoteIdentifier('provisioning_reconciliation')");
    expect(lifecycleRemovalSource).toContain("quoteIdentifier('audit_event')");
    expect(lifecycleRemovalSource).toContain("quoteIdentifier('provisioning_attempt_status')");
    expect(lifecycleRemovalSource).toContain('DROP TABLE IF EXISTS');
    expect(lifecycleRemovalSource).toContain('DROP TYPE IF EXISTS');
    expect(lifecycleRemovalSource).toContain('await client.query(\'BEGIN\')');
    expect(lifecycleRemovalSource).toContain('await client.query(\'COMMIT\')');
    expect(taxonomyIndexRemovalSource).toContain('category_organizationId_lower_value_uidx');
    expect(taxonomyIndexRemovalSource).toContain('subcategory_categoryId_lower_value_uidx');
    expect(taxonomyIndexRemovalSource).toContain('DROP INDEX IF EXISTS');
    expect(taxonomyMigrationSource).toContain('legacy_category_name');
    expect(taxonomyMigrationSource).toContain('legacy_subcategory');
    expect(taxonomyMigrationSource).toContain('legacy_category_id');
    expect(taxonomyMigrationSource).toContain('CREATE TABLE IF NOT EXISTS');
    expect(taxonomyMigrationSource).not.toContain('category_organizationId_lower_value_uidx');
    expect(taxonomyMigrationSource).not.toContain('subcategory_categoryId_lower_value_uidx');
    expect(taxonomyMigrationSource).toContain('hasLegacyCategorySources');
    expect(taxonomyMigrationSource).toContain('cloud-sql-migration-helpers.mjs');
    expect(schemaMigrationSource).toContain('cloud-sql-migration-helpers.mjs');
    expect(taxonomyMigrationSource).toContain('ON CONFLICT');
    expect(taxonomyMigrationSource).toContain('ALTER TABLE');
    expect(taxonomyMigrationSource).toContain('category_id');
    expect(taxonomyMigrationSource).toContain('await client.query(\'BEGIN\')');
    expect(taxonomyMigrationSource).toContain('await client.query(\'COMMIT\')');
  });

  it('removes AppUser legacy columns with an idempotent transactional migration', () => {
    expect(appUserColumnRemovalSource).toContain("quoteIdentifier('app_user')");
    for (const column of ['last_login_at', 'created_at', 'updated_at']) {
      expect(appUserColumnRemovalSource).toContain(`quoteIdentifier('${column}')`);
    }
    expect(appUserColumnRemovalSource).toContain('DROP COLUMN IF EXISTS');
    expect(appUserColumnRemovalSource).toContain("await client.query('BEGIN')");
    expect(appUserColumnRemovalSource).toContain("await client.query('COMMIT')");
    expect(appUserColumnRemovalSource).toContain("await client.query('ROLLBACK')");
  });

  it('removes tenant legacy columns with an idempotent transactional migration', () => {
    for (const table of ['employee_outlet', 'service_person_outlet', 'product', 'supplier']) {
      expect(tenantColumnRemovalSource).toContain(`quoteIdentifier('${table}')`);
    }
    for (const column of ['image_url', 'created_at', 'updated_at', 'city', 'state', 'postal_code', 'country']) {
      expect(tenantColumnRemovalSource).toContain(`quoteIdentifier('${column}')`);
    }
    expect(tenantColumnRemovalSource).toContain('DROP COLUMN IF EXISTS');
    expect(tenantColumnRemovalSource).toContain("await client.query('BEGIN')");
    expect(tenantColumnRemovalSource).toContain("await client.query('COMMIT')");
    expect(tenantColumnRemovalSource).toContain("await client.query('ROLLBACK')");
  });

  it('removes retired customer address columns and makes email nullable transactionally', () => {
    expect(customerAddressColumnRemovalSource).toContain("quoteIdentifier('customer')");
    expect(customerAddressColumnRemovalSource).toContain("quoteIdentifier('email')");
    for (const column of ['city', 'state', 'postal_code', 'country']) {
      expect(customerAddressColumnRemovalSource).toContain(`quoteIdentifier('${column}')`);
    }
    expect(customerAddressColumnRemovalSource).toContain('ALTER COLUMN');
    expect(customerAddressColumnRemovalSource).toContain('DROP NOT NULL');
    expect(customerAddressColumnRemovalSource).toContain('DROP COLUMN IF EXISTS');
    expect(customerAddressColumnRemovalSource).toContain("await client.query('BEGIN')");
    expect(customerAddressColumnRemovalSource).toContain("await client.query('COMMIT')");
    expect(customerAddressColumnRemovalSource).toContain("await client.query('ROLLBACK')");
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

  it('accepts optional customer email while retaining server-side input validation', () => {
    const createCustomer = source.match(/export const createTenantCustomerRecord[\s\S]*?\n\}\);/)?.[0] ?? '';
    const updateCustomer = source.match(/export const updateTenantCustomerRecord[\s\S]*?\n\}\);/)?.[0] ?? '';
    for (const callable of [createCustomer, updateCustomer]) {
      expect(callable).toContain("const email = typeof d.email === 'string' ? d.email.trim().toLowerCase() || null : null");
      expect(callable).not.toContain('!email');
      expect(callable).not.toContain('const city =');
      expect(callable).not.toContain('const state =');
    }
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

  it('keeps administrator provisioning free of lifecycle and database audit state', () => {
    const start = source.indexOf('export const provisionOrganizationAdministrator = onCall');
    const end = source.indexOf('export const changeOrganizationAdministratorStatus = onCall', start);
    const provisioning = source.slice(start, end);
    expect(provisioning).not.toContain('idempotencyKey');
    expect(provisioning).not.toContain('LifecycleIdempotency');
    expect(provisioning).not.toContain('recordProvisioningReconciliation');
    expect(source).not.toContain('recordPasswordChangeAudit');
    expect(source).not.toContain('recordAdministratorSecurityEvent');
  });

  it('keeps license mutations transaction-backed without lifecycle idempotency inputs', () => {
    for (const callable of ['assignOrganizationLicense', 'changeOrganizationLicensePlan', 'modifyOrganizationCommercialTerms', 'renewOrganizationLicense']) {
      const start = source.indexOf(`export const ${callable} = onCall`);
      const end = source.indexOf('\nexport const ', start + 1);
      const handler = source.slice(start, end === -1 ? source.length : end);
      expect(handler).not.toContain('idempotencyKey');
      expect(handler).not.toContain('LifecycleIdempotency');
    }
  });

  it('validates optional employee DOB server-side before writing SQL', () => {
    expect(source).toContain("const dateOfBirth = typeof d.dateOfBirth === 'string' && d.dateOfBirth ? d.dateOfBirth : null");
    expect(source).toContain("const gender = typeof d.gender === 'string' ? d.gender.trim() || null : null");
    expect(source).toContain('gender, dateOfBirth');
    expect(source).not.toContain('createdAt: row.createdAt');
    expect(source).not.toContain('updatedAt: row.updatedAt');
    expect(source).toContain("dateOfBirth !== null && !/^\\d{4}-\\d{2}-\\d{2}$/.test(dateOfBirth)");
    expect(connectorSource).toContain('$dateOfBirth: Date');
    expect(connectorSource).toContain('dateOfBirth: $dateOfBirth');
    expect(connectorSource).toContain('address: $address');
    expect(connectorSource).toContain('notes: $notes');
  });

  it('exposes employee lifecycle callables with Auth synchronization', () => {
    expect(source).toContain('export const updateTenantEmployee = onCall');
    expect(source).toContain('export const updateTenantEmployeeLogin = onCall');
    expect(source).toContain('export const changeTenantEmployeeStatus = onCall');
    expect(source).toContain('changeTenantEmployeeStatusWithLoginTrusted');
    expect(source).toContain("disabled: status === 'INACTIVE' || current.loginAccess !== 'ENABLED'");
    expect(source).toContain('revokeRefreshTokens(targetUid)');
    expect(source).toContain("appUserStatus: status === 'ACTIVE' ? AppUserStatus.ACTIVE : AppUserStatus.INACTIVE");
    expect(source).toContain("if (allowLogin && current.employmentStatus !== 'ACTIVE') throw new Error('employee inactive');");
    expect(source).toContain("employee.loginAccess !== 'ENABLED'");
    expect(source).toContain('export const changeTenantEmployeeLoginAccess = onCall');
    expect(source).toContain('resolveTenantEmployeeIdentityTrusted');
    expect(source).toContain('revokeRefreshTokens(targetUid)');
    expect(source).not.toContain("uid = typeof d.firebaseUid");
    expect(source).toContain('changeTenantEmployeeLoginAccessTrusted');
    expect(source).toContain('provisionTenantEmployeeLoginTrusted');
    expect(source).toContain('updateTenantEmployeeLoginTrusted');
    expect(source).toContain('export const createTenantEmployeeProfile = onCall');
    expect(source).toContain('async function syncEmployeeOutletAssignment');
    expect(source).toContain('deleteTenantEmployeeOutletTrusted');
    expect(source).toContain('await syncEmployeeOutletAssignment({ organizationId, employeeId: id, assignmentScope, outletId, currentOutletIds });');
    expect(source).toContain('await syncEmployeeOutletAssignment({ organizationId, employeeId: id, assignmentScope, outletId, currentOutletIds: [] });');
    expect(connectorSource).toContain('mutation DeleteTenantEmployeeOutletTrusted');
  });

  it('exposes service-person lifecycle callables without employee login coupling', () => {
    expect(source).toContain('export const createTenantServicePerson = onCall');
    expect(source).toContain('export const updateTenantServicePerson = onCall');
    expect(source).toContain('export const changeTenantServicePersonStatus = onCall');
    expect(source).toContain('createTenantServicePersonTrusted');
    expect(source).toContain("const address = typeof d.address === 'string' ? d.address.trim() || null : null");
    expect(source).toContain('address, specialization');
    expect(source).toContain('const notes = typeof d.notes === \'string\' ? d.notes.trim() || null : null');
    expect(source).toContain('assignmentScope, notes });');
    expect(source).toContain('export const assignTenantEmployeeOutlet = onCall');
    expect(source).toContain('export const assignTenantServicePersonOutlet = onCall');
    expect(source).toContain('deleteTenantServicePersonOutletTrusted');
    expect(source).toContain('current.servicePersonOutlets_on_servicePerson.entries()');
    const deleteServicePersonSource = source.slice(source.indexOf('export const deleteTenantServicePerson = onCall'));
    expect(deleteServicePersonSource.indexOf('deleteTenantServicePersonOutletTrusted'))
      .toBeLessThan(deleteServicePersonSource.indexOf('deleteTenantServicePersonTrusted'));
    expect(source).toContain("const outletId = typeof d.outletId === 'string' ? d.outletId : ''");
    expect(source).toContain("if (assignmentScope === 'OUTLET') await assignTenantServicePersonOutletTrusted");
    expect(source).not.toContain('requestId: `${requestId}:outlet-assignment`');
    const updateServicePersonSource = source.slice(source.indexOf('export const updateTenantServicePerson = onCall'));
    expect(updateServicePersonSource.lastIndexOf('assignTenantServicePersonOutletTrusted({ organizationId, servicePersonId: id'))
      .toBeLessThan(updateServicePersonSource.lastIndexOf('getTenantServicePersonTrusted({ organizationId, id })'));
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
    expect(source).not.toContain('requestId: `${requestId}:subcategory`');
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
    expect(source).toContain("const taxId = typeof d.taxId === 'string' ? d.taxId.trim() || null : null");
    expect(source).not.toContain("const city = typeof d.city");
    expect(source).not.toContain('postalCode:');
    expect(source).not.toContain('country:');
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
