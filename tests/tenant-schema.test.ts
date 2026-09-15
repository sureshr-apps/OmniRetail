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

  it('defines explicit outlet assignment joins for employees and service persons', () => {
    expect(schema).toContain('type EmployeeOutlet @table(key: ["employee", "outlet"])');
    expect(schema).toContain('type ServicePersonOutlet @table(key: ["servicePerson", "outlet"])');
  });

  it('defines tenant-scoped product catalogue and inventory stock entities', () => {
    expect(schema).toMatch(/enum ProductStatus[\s\S]*ACTIVE[\s\S]*INACTIVE/);
    expect(schema).toMatch(/type Category @table[\s\S]*organization: Organization![\s\S]*value: String!/);
    expect(schema).toMatch(/type Subcategory @table[\s\S]*category: Category![\s\S]*value: String!/);
    expect(schema).toMatch(/type Product @table[\s\S]*organization: Organization![\s\S]*sku: String! @unique/);
    expect(schema).toMatch(/type Product @table[\s\S]*category: Category![\s\S]*subcategory: Subcategory/);
    expect(schema).toMatch(/type InventoryStock @table\(key: \["organization", "outlet", "product"\]\)/);
    expect(schema).toMatch(/type InventoryStock[\s\S]*outlet: Outlet![\s\S]*product: Product!/);
  });

  it('removes the retired supplier part-code field from Product storage and connectors', () => {
    const product = schema.match(/type Product @table \{[\s\S]*?\n\}/)?.[0] ?? '';
    const connector = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
    const productOperations = connector.match(/(?:query|mutation) (?:ListTenantProducts|CreateTenantProduct|UpdateTenantProduct|GetTenantProductTrusted)[\s\S]*?(?=\n(?:query|mutation) |$)/g) ?? [];

    expect(product).not.toContain('supplierProductCode');
    expect(productOperations.length).toBe(4);
    for (const operation of productOperations) {
      expect(operation).not.toMatch(/\bsupplierProductCode\b|\$supplierProductCode\b/);
    }
  });

  it('does not keep denormalized category values on Product', () => {
    const product = schema.match(/type Product @table \{[\s\S]*?\n\}/)?.[0] ?? '';
    expect(product).not.toMatch(/categoryId:|categoryName:|subcategory: String/);
  });

  it('defines an organization-scoped customer master', () => {
    expect(schema).toMatch(/enum CustomerStatus[\s\S]*ACTIVE[\s\S]*INACTIVE/);
    expect(schema).toMatch(/type Customer @table[\s\S]*organization: Organization![\s\S]*customerCode: Int! @col\(dataType: "serial"\) @unique/);
    const customer = schema.match(/type Customer @table \{[\s\S]*?\n\}/)?.[0] ?? '';
    expect(customer).toContain('documentType: String');
    expect(customer).toContain('documentValue: String');
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
    }
    const drawer = readFileSync(new URL('../src/features/customers/components/CustomerDetailDrawer.tsx', import.meta.url), 'utf8');
    expect(drawer).not.toContain('Service & Alteration History');
    expect(drawer).not.toContain('ORD-8942');
  });

  it('defines an organization-scoped supplier master', () => {
    expect(schema).toMatch(/enum SupplierStatus[\s\S]*ACTIVE[\s\S]*INACTIVE/);
    expect(schema).toMatch(/type Supplier @table[\s\S]*organization: Organization![\s\S]*supplierCode: Int! @col\(dataType: "serial"\) @unique/);
  });

  it('defines purchase headers and product lines for tenant purchasing', () => {
    expect(schema).toMatch(/type Purchase @table[\s\S]*organization: Organization![\s\S]*supplier: Supplier!/);
    expect(schema).toMatch(/type PurchaseLine @table[\s\S]*purchase: Purchase![\s\S]*product: Product!/);
    expect(schema).toContain('enum PurchaseReceiptStatus');
  });

  it('defines an organization-scoped expense ledger', () => {
    expect(schema).toMatch(/type Expense @table[\s\S]*organization: Organization![\s\S]*expenseNumber: String! @unique/);
    expect(schema).toContain('enum ExpenseApprovalStatus');
  });

  it('defines tenant sales transactions and line items', () => {
    expect(schema).toMatch(/type Sale @table[\s\S]*organization: Organization![\s\S]*receiptNumber: String! @unique/);
    expect(schema).toMatch(/type SaleLine @table[\s\S]*sale: Sale![\s\S]*product: Product!/);
  });

  it('defines connector operations for tenant-scoped master reads and outlet writes', () => {
    const connector = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
    for (const operation of ['ListTenantOutlets', 'ListTenantEmployees', 'ListTenantServicePersons', 'ListTenantCategories', 'ListTenantProducts', 'ListTenantInventory', 'ListTenantCustomers', 'ListTenantSuppliers', 'ListTenantPurchases', 'GetTenantMembershipTrusted', 'CreateTenantOutlet', 'UpdateTenantOutlet', 'ChangeTenantOutletStatus', 'CreateTenantOutletTrusted', 'UpdateTenantOutletTrusted', 'ChangeTenantOutletStatusTrusted', 'DeleteTenantOutletTrusted', 'CreateTenantEmployeeProfileTrusted', 'ProvisionTenantEmployeeTrusted', 'ProvisionTenantEmployeeLoginTrusted', 'UpdateTenantEmployeeTrusted', 'UpdateTenantEmployeeLoginTrusted', 'ChangeTenantEmployeeStatusTrusted', 'ChangeTenantEmployeeLoginAccessTrusted', 'DeleteTenantEmployeeTrusted', 'CreateTenantServicePersonTrusted', 'UpdateTenantServicePersonTrusted', 'ChangeTenantServicePersonStatusTrusted', 'DeleteTenantServicePersonTrusted', 'AssignTenantEmployeeOutletTrusted', 'DeleteTenantEmployeeOutletTrusted', 'AssignTenantServicePersonOutletTrusted', 'DeleteTenantCustomerTrusted', 'DeleteTenantSupplierTrusted', 'DeleteTenantProductTrusted', 'DeleteTenantCategoryTrusted', 'DeleteTenantSubcategoryTrusted']) {
      expect(connector).toContain(operation);
    }
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
