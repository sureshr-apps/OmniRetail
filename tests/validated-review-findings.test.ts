import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { deriveInventoryView } from '@/features/inventory/services/inventoryService';
import { derivePurchaseView } from '@/features/purchases/services/purchaseService';
import { deriveSalesView } from '@/features/sales/services/salesService';
import { deriveOrganizationView } from '@/features/organizations/services/OrganizationService';

const file = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

describe('validated review findings', () => {
  it('keeps customer values while changing type and only guards the untouched credit default', () => {
    const source = file('src/features/customers/components/AddCustomerModal.tsx');
    expect(source).toContain('const creditLimitTouched = useRef(false);');
    expect(source).toContain('if (isOpen && !creditLimitTouched.current)');
    expect(source).not.toContain('[isOpen, type, name, phone');
  });

  it('does not reset expense fields when employee options or parent props change', () => {
    const source = file('src/features/expenses/components/AddExpenseModal.tsx');
    expect(source).toContain('}, [expenseToEdit, isOpen]);');
    expect(source).not.toContain('}, [currentUserName, employees, expenseToEdit, isOpen]);');
    expect(source).toContain('if (isOpen && !expenseToEdit && !paidByEmployee)');
  });

  it('memoizes auth handlers and the context value without changing token subscription behavior', () => {
    const source = file('src/app/context/AuthContext.tsx');
    expect(source).toContain('const login = useCallback');
    expect(source).toContain('const logout = useCallback');
    expect(source).toContain('const contextValue = useMemo');
    expect(source).toContain('authService.subscribe');
  });

  it('loads Service Person and Expenses collections once and derives local views', () => {
    const servicePersonPage = file('src/features/service-persons/pages/ServicePersonMasterPage.tsx');
    const expensePage = file('src/features/expenses/pages/ExpensesPage.tsx');
    expect(servicePersonPage.match(/servicePersonService\.getAllServicePersons\(\)/g)).toHaveLength(1);
    expect(servicePersonPage).not.toContain('getSpecializations');
    expect(servicePersonPage).toContain('const specializations = useMemo');
    expect(expensePage.match(/expenseService\.getAllExpenses\(\)/g)).toHaveLength(1);
    expect(expensePage).toContain('deriveExpenseView');
  });

  it('keeps the organization detail transient state tied to the route organization', () => {
    const source = file('src/features/organizations/pages/OrganizationDetailsPage.tsx');
    expect(source).toContain('organizationService.getOrganization(organizationId)');
    expect(source).toContain('organizationAdminService.getAdministrators(organizationId)');
    expect(source).toContain('setIsEditModalOpen(false)');
    expect(source).toContain('setStatusTarget(null)');
  });

  it('uses local zero-safe derivations for empty collections', () => {
    expect(deriveInventoryView([], { page: 1, pageSize: 25 }).totalCount).toBe(0);
    expect(derivePurchaseView([], { page: 1, pageSize: 10 }).totalCount).toBe(0);
    expect(deriveSalesView([], { dateRange: 'today', channel: 'All Channels (Unified)', paymentMethod: 'All Tender Methods', status: 'All Statuses', cashier: 'All Personnel', searchQuery: '', page: 1, pageSize: 25 }).totalCount).toBe(0);
    expect(deriveOrganizationView([], { search: '', organizationStatus: 'all', licenseStatus: 'all', page: 1, pageSize: 8 }).total).toBe(0);
    expect(file('src/features/products/pages/ProductsPage.tsx')).toContain('totalCount={data.totalCount ?? 0}');
    expect(file('src/features/purchases/pages/PurchasesPage.tsx')).toContain('activeCount={data?.totalCount ?? 0}');
  });

  it('caps POS search results and keeps stable INR presentation components', () => {
    const search = file('src/features/billing/components/ProductSearchArea.tsx');
    expect(search).toContain('filteredProducts.slice(0, 50)');
    expect(search).toContain('visibleProducts');
    expect(file('src/shared/utils/currency.ts')).toContain('INR_FORMATTER');
    expect(file('src/features/billing/components/OrderItemsTable.tsx')).toContain('React.memo');
    expect(file('src/features/billing/components/TotalsPanel.tsx')).toContain('React.memo');
  });

  it('uses local mutation reconciliation for the planned pages', () => {
    for (const path of [
      'src/features/inventory/pages/InventoryPage.tsx',
      'src/features/purchases/pages/PurchasesPage.tsx',
      'src/features/expenses/pages/ExpensesPage.tsx',
      'src/features/organizations/components/OrganizationAdministratorsTab.tsx',
    ]) {
      expect(file(path)).toContain('upsertById');
    }
    expect(file('src/features/inventory/pages/InventoryPage.tsx')).not.toContain('await loadData()');
    expect(file('src/features/purchases/pages/PurchasesPage.tsx')).not.toContain('await loadLedger()');
    expect(file('src/features/expenses/pages/ExpensesPage.tsx')).not.toContain('await loadExpenses()');
    const inventoryService = file('src/features/inventory/services/inventoryService.ts');
    const inventoryPage = file('src/features/inventory/pages/InventoryPage.tsx');
    expect(inventoryService).toContain('currentItem?: InventoryItem');
    expect(inventoryService).toContain('currentItem) return { ...currentItem');
    expect(inventoryService).toContain('currentItem?: InventoryItem');
    expect(inventoryPage).toContain('inventoryService.adjustStock(input, currentItem)');
    expect(inventoryPage).toContain('inventoryService.addInventoryUnits({ ...input, outletId: tenantOutlet.selectedOutletId }, currentItem)');
  });
});
