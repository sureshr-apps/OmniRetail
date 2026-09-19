import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
const source = readFileSync(new URL('../src/features/billing/services/checkoutService.ts', import.meta.url), 'utf8');
const cartSource = readFileSync(new URL('../src/features/billing/hooks/useBillingCart.ts', import.meta.url), 'utf8');
const customerModalSource = readFileSync(new URL('../src/features/billing/components/CustomerModal.tsx', import.meta.url), 'utf8');
const billingPageSource = readFileSync(new URL('../src/features/billing/pages/BillingPage.tsx', import.meta.url), 'utf8');
const orderHeaderSource = readFileSync(new URL('../src/features/billing/components/OrderHeader.tsx', import.meta.url), 'utf8');
describe('tenant checkout service', () => { it('resolves tenant context through the session authorization cache and sends the complete cart through one callable', () => { expect(source).toContain('getCachedCurrentUserAuthorization'); expect(source).toContain('listTenantOutlets'); expect(source).toContain("'completeTenantCheckout'"); expect(source).toContain('customerId'); expect(source).toContain('lines'); expect(source).not.toContain("'addTenantSaleLineRecord'"); expect(source).not.toContain("'voidTenantSaleRecord'"); }); });
it('loads the billing catalog from the tenant product service', () => { expect(cartSource).toContain("productService.getProducts"); expect(cartSource).toContain('setCatalogProducts'); });
it('loads the Billing customer picker from the tenant customer service', () => { expect(customerModalSource).toContain('customerService.getCustomers'); expect(customerModalSource).not.toContain('MOCK_CUSTOMERS'); });
it('does not expose a Billing quick-add or sample-cart action', () => { expect(billingPageSource).not.toContain('onQuickAddFirstItem'); expect(billingPageSource).not.toContain('const firstProduct = filteredProducts[0]'); expect(billingPageSource).not.toContain('INITIAL_CART_ITEMS.forEach'); });

it('uses the active user and outlet in the billing order header with no promotional default', () => {
  expect(orderHeaderSource).toContain('useAuth');
  expect(orderHeaderSource).toContain('useTenantOutlet');
  expect(orderHeaderSource).toContain("registerId = 'REG-01'");
  expect(orderHeaderSource).not.toContain('Sarah J.');
  expect(orderHeaderSource).not.toContain('Downtown Terminal');
  expect(cartSource).toContain('useState<number>(0)');
  expect(cartSource).not.toContain('useState<number>(5.00)');
});
it('starts the POS session without mock cart or held-order state', () => { expect(cartSource).toContain('useState<CartItem[]>([])'); expect(cartSource).toContain('useState<HeldOrder[]>([])'); expect(cartSource).not.toContain("from '../services/mockData'"); });
