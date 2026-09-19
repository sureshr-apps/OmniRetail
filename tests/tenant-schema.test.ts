import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const schema = readFileSync(new URL('../dataconnect/schema/schema.gql', import.meta.url), 'utf8');

describe('tenant Data Connect foundation schema', () => {
  it('defines organization-scoped outlet, employee, and service-person entities', () => {
    expect(schema).toMatch(/type Outlet @table[\s\S]*organization: Organization!/);
    expect(schema).toMatch(/type Employee @table[\s\S]*organization: Organization!/);
    expect(schema).toMatch(/type ServicePerson @table[\s\S]*organization: Organization!/);
    expect(schema).toMatch(/enum OutletStatus[\s\S]*ACTIVE[\s\S]*INACTIVE/);
  });

  it('keeps the outlet schema India-only and single-register by design', () => {
    const outlet = schema.match(/type Outlet @table[\s\S]*?\n}\n\ntype Employee/)?.[0] ?? '';
    expect(outlet).toContain('outletCode: Int! @col(dataType: "serial") @unique');
    expect(outlet).toContain('status: OutletStatus! @default(value: ACTIVE)');
    for (const removedColumn of ['city:', 'state:', 'postalCode:', 'country:', 'registerCount:', 'timezone:', 'currency:', 'createdAt:', 'updatedAt:']) {
      expect(outlet).not.toContain(removedColumn);
    }
  });

  it('keeps employee login access separate from employee identity', () => {
    expect(schema).toMatch(/user: AppUser/);
    expect(schema).toMatch(/loginAccess: LoginAccessStatus!/);
    expect(schema).toMatch(/enum LoginAccessStatus[\s\S]*ENABLED[\s\S]*DISABLED/);
  });

  it('stores employee gender, DOB, address, and notes as optional fields without timestamps', () => {
    const employee = schema.match(/type Employee @table[\s\S]*?\n}\n\ntype EmployeeOutlet/)?.[0] ?? '';
    expect(employee).toContain('gender: String');
    expect(employee).toContain('dateOfBirth: Date');
    expect(employee).toContain('address: String');
    expect(employee).toContain('notes: String');
    expect(employee).not.toContain('city:');
    expect(employee).not.toContain('state:');
    expect(employee).not.toContain('postalCode:');
    expect(employee).not.toContain('createdAt:');
    expect(employee).not.toContain('updatedAt:');
  });

  it('keeps employee Firebase identities behind the trusted connector boundary', () => {
    const connector = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
    const employeeList = connector.match(/query ListTenantEmployees[\s\S]*?(?=\nquery ListTenantServicePersons)/)?.[0] ?? '';
    const identityLookup = connector.match(/query ResolveTenantEmployeeIdentityTrusted[\s\S]*?(?=\nmutation CreateTenantOutlet)/)?.[0] ?? '';

    expect(employeeList).not.toContain('user { id username email firebaseUid }');
    expect(identityLookup).toContain('@auth(level: NO_ACCESS)');
    expect(identityLookup).toContain('user { id firebaseUid }');
  });

  it('removes retired login and timestamp columns from AppUser', () => {
    const appUser = schema.match(/type AppUser @table[\s\S]*?\n}\n\ntype Outlet/)?.[0] ?? '';
    const connector = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');

    expect(appUser).toContain('firebaseUid: String!');
    for (const removedField of ['lastLoginAt', 'createdAt', 'updatedAt']) {
      expect(appUser).not.toContain(`${removedField}:`);
    }
    expect(connector).not.toContain('lastLoginAt');
    expect(connector).not.toContain('lastLoginAt_expr');
    const appUserUpdates = connector.match(/appUser_update[\s\S]*?data:\s*\{[\s\S]*?\}\)/g) ?? [];
    for (const update of appUserUpdates) expect(update).not.toMatch(/\bcreatedAt\b|\bupdatedAt\b|_expr/);
    expect(connector).not.toMatch(/user \{[^}]*\bcreatedAt\b/);
    expect(connector).not.toMatch(/user \{[^}]*\bupdatedAt\b/);
    expect(connector).not.toContain('RecordSuccessfulLogin');
  });

  it('defines explicit outlet assignment joins for employees and service persons', () => {
    const employeeOutlet = schema.match(/type EmployeeOutlet @table[\s\S]*?\n}\n\ntype ServicePerson/)?.[0] ?? '';
    const servicePersonOutlet = schema.match(/type ServicePersonOutlet @table[\s\S]*?\n}\n\ntype Category/)?.[0] ?? '';
    expect(employeeOutlet).toContain('type EmployeeOutlet @table(key: ["employee", "outlet"])');
    expect(servicePersonOutlet).toContain('type ServicePersonOutlet @table(key: ["servicePerson", "outlet"])');
    expect(employeeOutlet).not.toContain('createdAt:');
    expect(servicePersonOutlet).not.toContain('createdAt:');
  });

  it('defines tenant-scoped product catalogue and inventory stock entities', () => {
    expect(schema).toMatch(/enum ProductStatus[\s\S]*ACTIVE[\s\S]*INACTIVE/);
    expect(schema).toMatch(/type Category @table[\s\S]*organization: Organization![\s\S]*value: String!/);
    expect(schema).toMatch(/type Subcategory @table[\s\S]*category: Category![\s\S]*value: String!/);
    expect(schema).toContain('type Product @table @unique(fields: ["organization", "sku"]) @unique(fields: ["organization", "barcode"])');
    expect(schema).toMatch(/type Product @table[\s\S]*organization: Organization![\s\S]*sku: String!/);
    expect(schema).toMatch(/type Product @table[\s\S]*category: Category![\s\S]*subcategory: Subcategory/);
    expect(schema).toMatch(/type InventoryStock @table\(key: \["organization", "outlet", "product"\]\)/);
    expect(schema).toMatch(/type InventoryStock[\s\S]*outlet: Outlet![\s\S]*product: Product!/);
  });

  it('defines batch-level inventory and sale/purchase allocation records while retaining aggregate stock', () => {
    expect(schema).toMatch(/type InventoryBatch @table[\s\S]*organization: Organization![\s\S]*outlet: Outlet![\s\S]*product: Product![\s\S]*batchNumber: String![\s\S]*expiryDate: Date[\s\S]*onHandQty: Float!/);
    expect(schema).toMatch(/type PurchaseLine @table[\s\S]*batchNumber: String[\s\S]*mfgDate: Date[\s\S]*expiryDate: Date/);
    expect(schema).toMatch(/type PurchaseLineBatchAllocation @table[\s\S]*purchaseLine: PurchaseLine![\s\S]*inventoryBatch: InventoryBatch![\s\S]*quantity: Float!/);
    expect(schema).toMatch(/type SaleLineBatchAllocation @table[\s\S]*saleLine: SaleLine![\s\S]*inventoryBatch: InventoryBatch![\s\S]*quantity: Float![\s\S]*refundedQty: Float!/);
    expect(schema).toMatch(/type InventoryMovement @table[\s\S]*inventoryBatch: InventoryBatch[\s\S]*requestId: String! @unique/);
    expect(schema).toMatch(/type InventoryStock @table\(key: \["organization", "outlet", "product"\]\)/);
  });

  it('defines one outlet-scoped register session per IST business date with cash audit tables', () => {
    expect(schema).toMatch(/enum CashRegisterSessionStatus[\s\S]*OPEN[\s\S]*CLOSED[\s\S]*AUTO_CLOSED/);
    expect(schema).toMatch(/enum CashRegisterMovementType[\s\S]*OPENING[\s\S]*SALE[\s\S]*REFUND[\s\S]*CASH_IN[\s\S]*CASH_OUT/);
    expect(schema).toMatch(/type CashRegisterSession @table @unique\(fields: \["organization", "outlet", "businessDate"\]\)[\s\S]*openingAmount: Float!/);
    expect(schema).toMatch(/type CashRegisterMovement @table @unique\(fields: \["organization", "requestId"\]\)[\s\S]*session: CashRegisterSession![\s\S]*amount: Float![\s\S]*actorFirebaseUid: String![\s\S]*requestId: String!/);
    expect(schema).toMatch(/type CashRegisterCount @table @unique\(fields: \["session", "countType", "denomination"\]\)[\s\S]*quantity: Int![\s\S]*amount: Float!/);
  });

  it('removes the retired supplier part-code field from Product storage and connectors', () => {
    const product = schema.match(/type Product @table[^\{]*\{[\s\S]*?\n\}/)?.[0] ?? '';
    const connector = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
    const productOperations = connector.match(/(?:query|mutation) (?:ListTenantProducts|CreateTenantProduct|UpdateTenantProduct|GetTenantProductTrusted)[\s\S]*?(?=\n(?:query|mutation) |$)/g) ?? [];

    expect(product).not.toContain('supplierProductCode');
    expect(productOperations.length).toBe(4);
    for (const operation of productOperations) {
      expect(operation).not.toMatch(/\bsupplierProductCode\b|\$supplierProductCode\b/);
    }
  });

  it('does not keep denormalized category values on Product', () => {
    const product = schema.match(/type Product @table[^\{]*\{[\s\S]*?\n\}/)?.[0] ?? '';
    expect(product).not.toMatch(/categoryId:|categoryName:|subcategory: String/);
  });

  it('removes retired Product timestamps and image storage', () => {
    const product = schema.match(/type Product @table[^\{]*\{[\s\S]*?\n\}/)?.[0] ?? '';
    const connector = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
    const productOperations = connector.match(/(?:query|mutation) (?:ListTenantProducts|CreateTenantProduct|UpdateTenantProduct|ChangeTenantProductStatus|GetTenantProductTrusted)[\s\S]*?(?=\n(?:query|mutation) |$)/g) ?? [];
    expect(product).not.toContain('imageUrl:');
    expect(product).not.toContain('openingStock:');
    expect(product).not.toContain('openingStoreOutlet:');
    expect(product).not.toContain('createdAt:');
    expect(productOperations.length).toBe(5);
    for (const operation of productOperations) expect(operation).not.toMatch(/\bimageUrl\b|\$imageUrl\b|\bupdatedAt\b|updatedAt_expr/);
    for (const operation of productOperations) expect(operation).not.toContain('createdAt');
  });

  it('defines an organization-scoped customer master', () => {
    expect(schema).toMatch(/enum CustomerStatus[\s\S]*ACTIVE[\s\S]*INACTIVE/);
    expect(schema).toMatch(/type Customer @table[\s\S]*organization: Organization![\s\S]*customerCode: Int! @col\(dataType: "serial"\) @unique/);
    const customer = schema.match(/type Customer @table \{[\s\S]*?\n\}/)?.[0] ?? '';
    expect(customer).toContain('documentType: String');
    expect(customer).toContain('documentValue: String');
    expect(customer).toContain('email: String');
    for (const removedColumn of ['city:', 'state:', 'postalCode:', 'country:']) {
      expect(customer).not.toContain(removedColumn);
    }
    expect(customer).not.toContain('createdAt');
    expect(customer).not.toContain('updatedAt');
  });

  it('keeps customer purchase history production-backed and removes retired customer detail sections', () => {
    const connector = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
    expect(connector).toContain('ListTenantCustomerPurchaseHistory');
    expect(connector).toContain('customer: { id: { eq: $customerId } }');
    expect(connector).toContain('documentType documentValue');
    const customerOperations = connector.match(/(?:query|mutation) (?:ListTenantCustomers|ListTenantCustomerPurchaseHistory|CreateTenantCustomer|UpdateTenantCustomer|ChangeTenantCustomerStatus|GetTenantCustomerTrusted)[\s\S]*?(?=\n(?:query|mutation) |$)/g) ?? [];
    for (const operation of customerOperations) {
      expect(operation).not.toMatch(/\bcreatedAt\b|\bupdatedAt\b|updatedAt_expr/);
      expect(operation).not.toMatch(/\bcity\b|\bstate\b|\bpostalCode\b|\bcountry\b/);
    }
    const customerMutations = customerOperations.filter((operation) => /CreateTenantCustomer|UpdateTenantCustomer/.test(operation)).join('\n');
    expect(customerMutations).toContain('$email: String,');
    expect(customerMutations).not.toContain('$email: String!');
    const drawer = readFileSync(new URL('../src/features/customers/components/CustomerDetailDrawer.tsx', import.meta.url), 'utf8');
    expect(drawer).not.toContain('Service & Alteration History');
    expect(drawer).not.toContain('ORD-8942');
  });

  it('defines an organization-scoped supplier master', () => {
    expect(schema).toMatch(/enum SupplierStatus[\s\S]*ACTIVE[\s\S]*INACTIVE/);
    expect(schema).toMatch(/type Supplier @table[\s\S]*organization: Organization![\s\S]*supplierCode: Int! @col\(dataType: "serial"\) @unique/);
    const supplier = schema.match(/type Supplier @table \{[\s\S]*?\n\}/)?.[0] ?? '';
    expect(supplier).toContain('taxId: String');
    expect(supplier).toContain('address: String');
    expect(supplier).toContain('category: String!');
    for (const removedColumn of ['city:', 'state:', 'postalCode:', 'country:']) expect(supplier).not.toContain(removedColumn);
    expect(supplier).not.toContain('createdAt:');
    expect(supplier).not.toContain('updatedAt:');
  });

  it('removes retired Supplier timestamps from connectors and writes', () => {
    const connector = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
    const supplierOperations = connector.match(/(?:query|mutation) (?:ListTenantSuppliers|CreateTenantSupplier|UpdateTenantSupplier|ChangeTenantSupplierStatus|GetTenantSupplierTrusted)[\s\S]*?(?=\n(?:query|mutation) |$)/g) ?? [];
    expect(supplierOperations.length).toBe(5);
    for (const operation of supplierOperations) expect(operation).not.toMatch(/\bcreatedAt\b|\bupdatedAt\b|updatedAt_expr/);
    for (const operation of supplierOperations) expect(operation).not.toMatch(/\bcity\b|\bstate\b|\bpostalCode\b|\bcountry\b/);
    const supplierMutations = supplierOperations.filter((operation) => /CreateTenantSupplier|UpdateTenantSupplier/.test(operation)).join('\n');
    expect(supplierMutations).toContain('$taxId: String');
  });

  it('defines purchase headers and product lines for tenant purchasing', () => {
    expect(schema).toMatch(/type Purchase @table[\s\S]*organization: Organization![\s\S]*supplier: Supplier!/);
    expect(schema).toMatch(/type PurchaseLine @table[\s\S]*purchase: Purchase![\s\S]*product: Product!/);
    expect(schema).toContain('enum PurchaseReceiptStatus');
    expect(schema).toMatch(/enum PurchaseStatus[\s\S]*ACTIVE[\s\S]*DRAFT[\s\S]*CANCELLED[\s\S]*CLOSED/);
  });

  it('defines a purchase payment ledger for subsequent supplier settlements', () => {
    expect(schema).toMatch(/type PurchasePayment @table[\s\S]*purchase: Purchase![\s\S]*amount: Float![\s\S]*paymentDate: Date![\s\S]*paymentMethod: String![\s\S]*requestId: String! @unique/);
    const connector = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
    expect(connector).toContain('paymentHistory: purchasePayments_on_purchase');
    expect(connector).toContain('paymentDate paymentMethod reference notes recordedBy createdAt');
  });

  it('defines a separate supplier refund ledger without rewriting the original payment', () => {
    expect(schema).toMatch(/type PurchaseRefund @table[\s\S]*organization: Organization![\s\S]*purchase: Purchase![\s\S]*supplier: Supplier![\s\S]*amount: Float![\s\S]*refundDate: Date![\s\S]*refundMethod: String![\s\S]*requestId: String! @unique/);
    expect(schema).toContain('reference: String');
    expect(schema).toContain('notes: String');
    expect(schema).toContain('recordedBy: String!');
  });

  it('defines an organization-scoped expense ledger', () => {
    expect(schema).toMatch(/type Expense @table @unique\(fields: \["organization", "expenseNumber"\]\)/);
    expect(schema).toContain('enum ExpenseApprovalStatus');
  });

  it('defines tenant sales transactions and line items', () => {
    expect(schema).toMatch(/type Sale @table @unique\(fields: \["organization", "receiptNumber"\]\)/);
    expect(schema).toMatch(/type SaleLine @table[\s\S]*sale: Sale![\s\S]*product: Product/);
    expect(schema).toContain('itemName: String');
  });

  it('defines connector operations for tenant-scoped master reads and outlet writes', () => {
    const connector = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
    for (const operation of ['ListTenantOutlets', 'ListTenantEmployees', 'ListTenantServicePersons', 'ListTenantCategories', 'ListTenantProducts', 'ListTenantInventory', 'ListTenantCustomers', 'ListTenantSuppliers', 'ListTenantPurchases', 'GetTenantMembershipTrusted', 'CreateTenantOutlet', 'UpdateTenantOutlet', 'ChangeTenantOutletStatus', 'CreateTenantOutletTrusted', 'UpdateTenantOutletTrusted', 'ChangeTenantOutletStatusTrusted', 'DeleteTenantOutletTrusted', 'CreateTenantEmployeeProfileTrusted', 'ProvisionTenantEmployeeTrusted', 'ProvisionTenantEmployeeLoginTrusted', 'UpdateTenantEmployeeTrusted', 'UpdateTenantEmployeeLoginTrusted', 'ChangeTenantEmployeeStatusTrusted', 'ChangeTenantEmployeeLoginAccessTrusted', 'DeleteTenantEmployeeTrusted', 'CreateTenantServicePersonTrusted', 'UpdateTenantServicePersonTrusted', 'ChangeTenantServicePersonStatusTrusted', 'DeleteTenantServicePersonTrusted', 'AssignTenantEmployeeOutletTrusted', 'DeleteTenantEmployeeOutletTrusted', 'AssignTenantServicePersonOutletTrusted', 'DeleteTenantCustomerTrusted', 'DeleteTenantSupplierTrusted', 'DeleteTenantProductTrusted', 'CreateTenantCategoryTrusted', 'CreateTenantSubcategoryTrusted', 'UpdateTenantCategoryTrusted', 'UpdateTenantSubcategoryTrusted', 'DeleteTenantCategoryTrusted', 'DeleteTenantSubcategoryTrusted']) {
      expect(connector).toContain(operation);
    }
  });

  it('allows operational employees to load outlet context without exposing Outlet Master access', () => {
    const connector = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
    const outletQuery = connector.match(/query ListTenantOutlets[\s\S]*?(?=\nquery ListTenantEmployees)/)?.[0] ?? '';

    expect(outletQuery).toContain("this[0].role.code == 'organization.employee'");
    expect(outletQuery).toContain("this[0].role.code == 'organization.admin'");
    expect(outletQuery).toContain("rp.permission.code == 'outlets.read'");
    expect(outletQuery).toContain('user: { firebaseUid: { eq_expr: "auth.uid" } }');
    expect(outletQuery).toContain('status: { eq: ACTIVE }');

    const navigation = readFileSync(new URL('../src/app/navigation/tenantNavigation.ts', import.meta.url), 'utf8');
    expect(navigation).toContain("capability: 'outlets.read', administrationOnly: true");
  });

  it('does not define retired lifecycle, reconciliation, or database audit storage', () => {
    const schemaSource = readFileSync(new URL('../dataconnect/schema/schema.gql', import.meta.url), 'utf8');
    const connector = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
    expect(schemaSource).not.toContain('type LifecycleIdempotency');
    expect(schemaSource).not.toContain('enum ProvisioningAttemptStatus');
    expect(schemaSource).not.toContain('type ProvisioningReconciliation');
    expect(schemaSource).not.toContain('type AuditEvent');
    expect(connector).not.toContain('LifecycleIdempotency');
    expect(connector).not.toContain('lifecycleIdempotency');
    expect(connector).not.toContain('ProvisioningReconciliation');
    expect(connector).not.toContain('auditEvent_');
  });

  it('uses a targeted level query for plan uniqueness validation', () => {
    const connector = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
    expect(connector).toContain('query IsLicensePlanLevelTaken($level: Int!)');
    expect(connector).toContain('licensePlans(where: { level: { eq: $level } }, limit: 100) { id }');
    expect(readFileSync(new URL('../src/features/plans/services/LicensePlanService.ts', import.meta.url), 'utf8')).toContain('isLicensePlanLevelTaken');
  });

  it('includes employee profile fields in reads and trusted write operations', () => {
    const connector = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
    const employeeOperations = connector.match(/(?:query ListTenantEmployees|mutation CreateTenantEmployeeProfileTrusted|mutation ProvisionTenantEmployeeTrusted|mutation UpdateTenantEmployeeTrusted|query GetTenantEmployeeTrusted)[\s\S]*?(?=\n(?:query|mutation) |$)/g)?.join('\n') ?? '';
    for (const field of ['gender', 'dateOfBirth', 'address', 'notes']) expect(employeeOperations).toContain(field);
    expect(employeeOperations).not.toMatch(/\bcreatedAt\b|\bupdatedAt\b|updatedAt_expr/);
  });

  it('guards tenant master deletes against linked operational history', () => {
    const connector = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
    expect(connector).toContain('employeeOutlets(where: { employee: { id: { eq: $id } } }');
    expect(connector).toContain('servicePersonOutlets(where: { servicePerson: { id: { eq: $id } } }');
    expect(connector).toContain('sales(where: { customer: { id: { eq: $id } } }');
    expect(connector).toContain('purchases(where: { supplier: { id: { eq: $id } } }');
    expect(connector).toContain('inventoryStocks(where: { product: { id: { eq: $id } } }');
    expect(connector).toContain('purchaseLines(where: { product: { id: { eq: $id } } }');
    expect(connector).toContain('saleLines(where: { product: { id: { eq: $id } } }');
    expect(connector).toContain('subcategories(where: { category: { id: { eq: $id } } }');
    expect(connector).toContain('products(where: { category: { id: { eq: $id } }');
    expect(connector).toContain('products(where: { subcategory: { id: { eq: $id } }');
  });

  it('defines employee outlet join mutations for assignment persistence', () => {
    const connector = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
    expect(connector).toContain('employeeOutlet_upsert(data: { employeeId: $employeeId outletId: $outletId })');
    expect(connector).toContain('employeeOutlet_delete(key: { employeeId: $employeeId outletId: $outletId })');
  });

  it('synchronizes employee status with linked application login status', () => {
    const connector = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
    expect(connector).toContain('mutation ChangeTenantEmployeeStatusWithLoginTrusted');
    expect(connector).toContain('appUser_update(id: $userId, data: { status: $appUserStatus })');
    expect(connector).toContain('employee_update(id: $id, data: { employmentStatus: $status })');
  });

  it('keeps Service Person storage aligned with the supported form fields', () => {
    const schema = readFileSync(new URL('../dataconnect/schema/schema.gql', import.meta.url), 'utf8');
    const servicePerson = schema.match(/type ServicePerson @table \{[\s\S]*?\n\}/)?.[0] ?? '';
    expect(servicePerson).toContain('specialization: String');
    expect(servicePerson).toContain('notes: String');
    expect(servicePerson).toContain('address: String');
    expect(servicePerson).not.toContain('specialization: String!');
    expect(servicePerson).not.toContain('skills');
    expect(servicePerson).not.toContain('createdAt');
    expect(servicePerson).not.toContain('updatedAt');
  });

  it('persists Service Person notes without reintroducing removed timestamps', () => {
    const connector = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
    const servicePersonOperations = connector.match(/(?:query|mutation) (?:ListTenantServicePersons|CreateTenantServicePersonTrusted|UpdateTenantServicePersonTrusted|ChangeTenantServicePersonStatusTrusted|GetTenantServicePersonTrusted|DeleteTenantServicePersonOutletTrusted)[\s\S]*?(?=\n(?:query|mutation) |$)/g) ?? [];
    expect(servicePersonOperations.length).toBe(6);
    for (const operation of servicePersonOperations) {
      expect(operation).not.toMatch(/\bcreatedAt\b|\bupdatedAt\b|updatedAt_expr/);
    }
    expect(servicePersonOperations.find((operation) => operation.includes('CreateTenantServicePersonTrusted'))).toContain('notes: $notes');
    expect(servicePersonOperations.find((operation) => operation.includes('UpdateTenantServicePersonTrusted'))).toContain('notes: $notes');
    expect(servicePersonOperations.find((operation) => operation.includes('CreateTenantServicePersonTrusted'))).toContain('address: $address');
    expect(servicePersonOperations.find((operation) => operation.includes('UpdateTenantServicePersonTrusted'))).toContain('address: $address');
    expect(servicePersonOperations.find((operation) => operation.includes('DeleteTenantServicePersonOutletTrusted'))).toContain('servicePersonOutlet_delete');
  });

  it('allows organization admins to read the product catalogue', () => {
    const connector = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
    const productsQuery = connector.match(/query ListTenantProducts[\s\S]*?\n}\n/);

    expect(productsQuery?.[0]).toContain('this[0].role.code == \'organization.admin\'');
    expect(productsQuery?.[0]).toContain('rp.permission.code == \'products.read\'');
  });

  it('does not expose removed outlet fields through tenant connectors', () => {
    const connector = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
    const outletOperations = connector.match(/(?:query|mutation) (?:ListTenantOutlets|CreateTenantOutlet|UpdateTenantOutlet|CreateTenantOutletTrusted|UpdateTenantOutletTrusted|DeleteTenantOutletTrusted)[\s\S]*?(?=\n(?:query|mutation) |$)/g) ?? [];
    expect(outletOperations.length).toBe(6);
    for (const operation of outletOperations) {
      for (const removedField of ['city', 'state', 'postalCode', 'country', 'registerCount', 'timezone', 'currency', 'createdAt', 'updatedAt']) {
        expect(operation).not.toMatch(new RegExp(`\\$${removedField}\\b|\\b${removedField}:`));
      }
    }
    expect(outletOperations.find((operation) => operation.includes('CreateTenantOutletTrusted'))).toContain('status: ACTIVE');
    expect(outletOperations.find((operation) => operation.includes('CreateTenantOutletTrusted'))).not.toContain('$outletCode');
  });
});
