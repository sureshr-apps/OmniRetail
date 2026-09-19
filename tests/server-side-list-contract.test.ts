import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

const connector = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
const workflow = readFileSync(new URL('../.github/workflows/firebase-deploy.yml', import.meta.url), 'utf8');
const indexes = readFileSync(new URL('../scripts/add-operational-list-indexes.mjs', import.meta.url), 'utf8');
const pages = {
  organizations: readFileSync(new URL('../src/features/organizations/pages/OrganizationsPage.tsx', import.meta.url), 'utf8'),
  sales: readFileSync(new URL('../src/features/sales/pages/SalesPage.tsx', import.meta.url), 'utf8'),
  inventory: readFileSync(new URL('../src/features/inventory/pages/InventoryPage.tsx', import.meta.url), 'utf8'),
  purchases: readFileSync(new URL('../src/features/purchases/pages/PurchasesPage.tsx', import.meta.url), 'utf8'),
  expenses: readFileSync(new URL('../src/features/expenses/pages/ExpensesPage.tsx', import.meta.url), 'utf8'),
};

describe('server-side list query contract', () => {
  it('defines bounded page and count queries for the operational ledgers', () => {
    for (const operation of ['ListOrganizationsPage', 'ListTenantSalesPage', 'ListTenantInventoryPage', 'ListTenantPurchasesPage', 'ListTenantExpensesPage']) {
      expect(connector).toContain(`query ${operation}`);
    }
    expect(connector).toContain('offset: $offset, limit: $limit');
    expect(connector).toContain('organizationsCount: organizations');
    expect(connector).toContain('salesCount: sales');
    expect(connector).toContain('inventoryCount: inventoryStocks');
    expect(connector).toContain('purchasesCount: purchases');
    expect(connector).toContain('expensesCount: expenses');
  });

  it('does not have the five list pages load the full collection for their initial ledger data', () => {
    expect(pages.organizations).toContain('organizationService.getOrganizations');
    expect(pages.sales).toContain('salesService.getSales');
    expect(pages.inventory).toContain('inventoryService.getInventory');
    expect(pages.purchases).toContain('purchaseService.getPurchases');
    expect(pages.expenses).toContain('expenseService.getExpenses');
    expect(pages.organizations).not.toContain('organizationService.getAllOrganizations()');
    expect(pages.sales).not.toContain('salesService.getAllSales()');
    expect(pages.inventory).not.toContain('inventoryService.getAllInventory()');
    expect(pages.purchases).not.toContain('purchaseService.getAllPurchases()');
    expect(pages.expenses).not.toContain('expenseService.getAllExpenses()');
  });

  it('deploys idempotent indexes with Data Connect changes', () => {
    expect(indexes).toContain('CREATE INDEX IF NOT EXISTS');
    for (const indexName of ['organization_created_at_id_idx', 'sale_organization_timestamp_id_idx', 'purchase_organization_date_id_idx', 'expense_organization_date_id_idx', 'inventory_stock_organization_outlet_updated_at_idx', 'product_organization_name_id_idx']) {
      expect(indexes).toContain(indexName);
    }
    expect(workflow).toContain('add-operational-list-indexes');
    expect(workflow).toContain('node scripts/add-operational-list-indexes.mjs');
  });
});
