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

  it('keeps employee login access separate from employee identity', () => {
    expect(schema).toMatch(/user: AppUser/);
    expect(schema).toMatch(/loginAccess: LoginAccessStatus!/);
    expect(schema).toMatch(/enum LoginAccessStatus[\s\S]*ENABLED[\s\S]*DISABLED/);
  });

  it('defines explicit outlet assignment joins for employees and service persons', () => {
    expect(schema).toContain('type EmployeeOutlet @table(key: ["employee", "outlet"])');
    expect(schema).toContain('type ServicePersonOutlet @table(key: ["servicePerson", "outlet"])');
  });

  it('defines tenant-scoped product catalogue and inventory stock entities', () => {
    expect(schema).toMatch(/enum ProductStatus[\s\S]*ACTIVE[\s\S]*INACTIVE/);
    expect(schema).toMatch(/type Product @table[\s\S]*organization: Organization![\s\S]*sku: String! @unique/);
    expect(schema).toMatch(/type InventoryStock @table\(key: \["organization", "outlet", "product"\]\)/);
    expect(schema).toMatch(/type InventoryStock[\s\S]*outlet: Outlet![\s\S]*product: Product!/);
  });

  it('defines an organization-scoped customer master', () => {
    expect(schema).toMatch(/enum CustomerStatus[\s\S]*ACTIVE[\s\S]*INACTIVE/);
    expect(schema).toMatch(/type Customer @table[\s\S]*organization: Organization![\s\S]*customerCode: String! @unique/);
  });

  it('defines an organization-scoped supplier master', () => {
    expect(schema).toMatch(/enum SupplierStatus[\s\S]*ACTIVE[\s\S]*INACTIVE/);
    expect(schema).toMatch(/type Supplier @table[\s\S]*organization: Organization![\s\S]*supplierCode: String! @unique/);
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
    for (const operation of ['ListTenantOutlets', 'ListTenantEmployees', 'ListTenantServicePersons', 'ListTenantProducts', 'ListTenantInventory', 'ListTenantCustomers', 'ListTenantSuppliers', 'ListTenantPurchases', 'GetTenantMembershipTrusted', 'CreateTenantOutlet', 'UpdateTenantOutlet', 'ChangeTenantOutletStatus', 'CreateTenantOutletTrusted', 'UpdateTenantOutletTrusted', 'ChangeTenantOutletStatusTrusted', 'CreateTenantEmployeeProfileTrusted', 'ProvisionTenantEmployeeTrusted', 'UpdateTenantEmployeeTrusted', 'ChangeTenantEmployeeStatusTrusted', 'ChangeTenantEmployeeLoginAccessTrusted', 'CreateTenantServicePersonTrusted', 'UpdateTenantServicePersonTrusted', 'ChangeTenantServicePersonStatusTrusted', 'AssignTenantEmployeeOutletTrusted', 'AssignTenantServicePersonOutletTrusted']) {
      expect(connector).toContain(operation);
    }
  });

  it('allows organization admins to read the product catalogue', () => {
    const connector = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
    const productsQuery = connector.match(/query ListTenantProducts[\s\S]*?\n}\n/);

    expect(productsQuery?.[0]).toContain('this[0].role.code == \'organization.admin\'');
    expect(productsQuery?.[0]).toContain('rp.permission.code == \'products.read\'');
  });
});
