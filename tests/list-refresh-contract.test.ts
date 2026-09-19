import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const root = new URL('../src/features/', import.meta.url);
const read = (path: string) => readFileSync(new URL(path, root), 'utf8');

function section(source: string, start: string, end: string): string {
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end, startIndex + start.length);
  expect(startIndex, `Missing section start: ${start}`).toBeGreaterThanOrEqual(0);
  expect(endIndex, `Missing section end: ${end}`).toBeGreaterThan(startIndex);
  return source.slice(startIndex, endIndex);
}

describe('post-mutation list refresh contracts', () => {
  it('removes the deprecated Employee Master More Filters control and modal wiring', () => {
    const page = read('employees/pages/EmployeeMasterPage.tsx');
    const filterBar = read('employees/components/EmployeeFilterBar.tsx');
    expect(page).not.toContain('EmployeeMoreFiltersModal');
    expect(page).not.toContain('departmentFilter');
    expect(page).not.toContain('getDepartments');
    expect(filterBar).not.toContain('More Filters');
    expect(filterBar).not.toContain('onOpenMoreFilters');
  });

  it.each([
    ['purchase create', 'purchases/pages/PurchasesPage.tsx', 'const handleCreatePurchase', 'const handleCancelPurchase'],
    ['purchase cancel', 'purchases/pages/PurchasesPage.tsx', 'const handleCancelPurchase', 'const handleReceiveStock'],
    ['purchase receipt', 'purchases/pages/PurchasesPage.tsx', 'const handleReceiveStock', 'return ('],
    ['expense create', 'expenses/pages/ExpensesPage.tsx', 'const handleCreateExpense', 'const handleUpdateExpense'],
    ['expense update', 'expenses/pages/ExpensesPage.tsx', 'const handleUpdateExpense', 'const handleOpenEditExpense'],
    ['expense void', 'expenses/pages/ExpensesPage.tsx', 'const handleConfirmVoid', 'const handleApproveExpense'],
    ['expense approval', 'expenses/pages/ExpensesPage.tsx', 'const handleApproveExpense', 'const handleRejectExpense'],
    ['expense rejection', 'expenses/pages/ExpensesPage.tsx', 'const handleRejectExpense', 'const handleFilterPending'],
  ])('%s reconciles its visible list locally before completing', (_name, path, start, end) => {
    const handler = section(read(path), start, end);
    expect(handler).toContain('upsertById(');
    expect(handler).not.toMatch(/await load(Ledger|Expenses)\(/);
  });

  it.each([
    ['stock adjustment', 'const handleConfirmAdjustment', 'const handleAdjustSelected'],
    ['inventory product creation', 'const handleCreateProduct', 'return ('],
  ])('%s reconciles inventory locally', (_name, start, end) => {
    const handler = section(read('inventory/pages/InventoryPage.tsx'), start, end);
    expect(handler).toContain('upsertById(');
    expect(handler).not.toContain('await loadData()');
  });

  it.each([
    ['overview organization creation', 'const handleAddOrgSuccess', 'const handleRenewSuccess'],
    ['overview license renewal', 'const handleRenewSuccess', 'const getPlanIcon'],
  ])('%s waits for overview data to reload', (_name, start, end) => {
    const handler = section(read('overview/pages/OverviewPage.tsx'), start, end);
    expect(handler).toMatch(/const \w+ = async/);
    expect(handler).toContain('await loadData()');
  });

  it('adds a newly created organization to the held directory without refetching', () => {
    const source = read('organizations/pages/OrganizationsPage.tsx');
    const handler = section(source, 'const handleOrgCreated', 'const isFiltered');
    expect(handler).toContain('upsertById(current, newOrg)');
    expect(handler).not.toContain('await fetchOrganizations');
  });

  it.each([
    'organizations/components/OrganizationAdministratorsTab.tsx',
    'organizations/components/OrganizationLicenseTab.tsx',
    'plans/pages/PlansPage.tsx',
  ])('does not use delayed duplicate queries as a cache workaround in %s', (path) => {
    expect(read(path)).not.toContain('new Promise((resolve) => setTimeout(resolve, 350))');
  });

  it.each([
    ['outlet create', 'outlets/pages/OutletMasterPage.tsx', 'const handleCreateOutlet', 'const handleUpdateOutlet', 'loadData('],
    ['outlet update', 'outlets/pages/OutletMasterPage.tsx', 'const handleUpdateOutlet', 'const handleViewDetails', 'loadData('],
    ['outlet status', 'outlets/pages/OutletMasterPage.tsx', 'const handleConfirmStatusChange', 'const hasActiveFilters', 'loadData('],
    ['employee create', 'employees/pages/EmployeeMasterPage.tsx', 'const handleCreateEmployee', 'const handleUpdateEmployee', 'loadData('],
    ['employee update', 'employees/pages/EmployeeMasterPage.tsx', 'const handleUpdateEmployee', 'const handlePromptToggleStatus', 'loadData('],
    ['employee status', 'employees/pages/EmployeeMasterPage.tsx', 'const handleConfirmStatusChange', 'const handleExportCsv', 'loadData('],
    ['service person save', 'service-persons/pages/ServicePersonMasterPage.tsx', 'const handleModalSubmit', 'const handleViewPerson', 'loadData('],
    ['service person status', 'service-persons/pages/ServicePersonMasterPage.tsx', 'const handleConfirmToggleStatus', 'return (', 'loadData('],
    ['supplier create', 'suppliers/pages/SuppliersPage.tsx', 'const handleAddSupplier', 'const handleUpdateSupplier', 'loadDirectory('],
    ['supplier update', 'suppliers/pages/SuppliersPage.tsx', 'const handleUpdateSupplier', 'const handleToggleStatus', 'loadDirectory('],
    ['supplier status', 'suppliers/pages/SuppliersPage.tsx', 'const handleToggleStatus', 'const handleNewPurchaseOrder', 'loadDirectory('],
    ['product create', 'products/pages/ProductsPage.tsx', 'const handleCreateProduct', 'const handleUpdateProduct', 'loadCatalogue('],
    ['product update', 'products/pages/ProductsPage.tsx', 'const handleUpdateProduct', 'const handleToggleStatus', 'loadCatalogue('],
    ['product status', 'products/pages/ProductsPage.tsx', 'const handleToggleStatus', 'const handleDuplicateProduct', 'loadCatalogue('],
    ['product duplicate', 'products/pages/ProductsPage.tsx', 'const handleDuplicateProduct', 'const handleNavigateToInventory', 'loadCatalogue('],
    ['customer create', 'customers/pages/CustomersPage.tsx', 'const handleCreateCustomer', 'const handleUpdateCustomer', 'loadData('],
    ['customer update', 'customers/pages/CustomersPage.tsx', 'const handleUpdateCustomer', 'const handleToggleStatusConfirm', 'loadData('],
    ['customer status', 'customers/pages/CustomersPage.tsx', 'const handleToggleStatusConfirm', 'return (', 'loadData('],
  ])('%s applies the mutation response to local state directly, with no post-mutation list reload', (_name, path, start, end, staleRefreshCall) => {
    const handler = section(read(path), start, end);
    expect(handler).toMatch(/upsertById\(prev,/);
    expect(handler).not.toContain(`await ${staleRefreshCall}`);
  });

  it.each([
    ['outlet', 'outlets/pages/OutletMasterPage.tsx', 'outlet.id', 'const handleRefresh'],
    ['employee', 'employees/pages/EmployeeMasterPage.tsx', 'employee.id', 'const handlePromptToggleStatus'],
    ['service person', 'service-persons/pages/ServicePersonMasterPage.tsx', 'person.id', 'const handleInitiateToggleStatus'],
    ['customer', 'customers/pages/CustomersPage.tsx', 'customer.id', 'const handleToggleStatusConfirm'],
    ['supplier', 'suppliers/pages/SuppliersPage.tsx', 'supplier.id', 'const handleToggleStatus'],
    ['product', 'products/pages/ProductsPage.tsx', 'product.id', 'const handleDuplicateProduct'],
  ])('%s delete removes the confirmed record locally without a list reload', (_name, path, recordExpression, endMarker) => {
    const handler = section(read(path), 'const deleteConfirmation', endMarker);
    expect(handler).toContain(`removeById(prev, ${recordExpression})`);
    expect(handler).not.toContain('await loadData(');
    expect(handler).not.toContain('await loadDirectory(');
    expect(handler).not.toContain('await loadCatalogue(');
  });

  it.each([
    'organizations/components/AddOrganizationModal.tsx',
    'organizations/components/EditOrganizationModal.tsx',
    'organizations/components/ChangeOrgStatusModal.tsx',
    'organizations/components/AddAdminModal.tsx',
    'organizations/components/EditAdminModal.tsx',
    'organizations/components/ChangeAdminStatusModal.tsx',
    'licenses/components/AssignLicenseModal.tsx',
    'licenses/components/ChangePlanModal.tsx',
    'licenses/components/ModifyCommercialTermsModal.tsx',
    'licenses/components/RenewLicenseModal.tsx',
    'plans/components/AddPlanModal.tsx',
    'plans/components/EditPlanModal.tsx',
    'plans/components/DeactivatePlanModal.tsx',
  ])('waits for parent list reconciliation before closing %s', (path) => {
    const source = read(path);
    expect(source).toMatch(/onSuccess: \([^)]*\) => void \| Promise<void>/);
    expect(source).toMatch(/await onSuccess\(/);
  });
});
