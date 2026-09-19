import type { User } from '@/features/auth/services/AuthService';
import { canAccessTenantAdministration, canAccessTenantOperationalModule } from '@/app/auth/tenantAccess';

export interface TenantNavItem {
  label: string;
  href: string;
  capability: string;
  administrationOnly?: boolean;
}

export const TENANT_NAVIGATION: readonly TenantNavItem[] = [
  { label: 'Billing / POS', href: '/billing', capability: 'billing.read' },
  { label: 'Sales', href: '/sales', capability: 'sales.read' },
  { label: 'Inventory', href: '/inventory', capability: 'inventory.read' },
  { label: 'Products', href: '/products', capability: 'products.read' },
  { label: 'Purchases', href: '/purchases', capability: 'purchases.read' },
  { label: 'Suppliers', href: '/suppliers', capability: 'suppliers.read' },
  { label: 'Customers', href: '/customers', capability: 'customers.read' },
  { label: 'Expenses', href: '/expenses', capability: 'expenses.read' },
  { label: 'Cash Management', href: '/cash-management', capability: 'cash.read' },
  { label: 'Outlet Master', href: '/outlets', capability: 'outlets.read', administrationOnly: true },
  { label: 'Employee Master', href: '/employees', capability: 'employees.read', administrationOnly: true },
  { label: 'Service Network', href: '/service-persons', capability: 'service_persons.read', administrationOnly: true },
];

export function getTenantNavigation(user: User | null): TenantNavItem[] {
  return TENANT_NAVIGATION.filter((item) => item.administrationOnly
    ? canAccessTenantAdministration(user)
    : canAccessTenantOperationalModule(user, item.capability));
}
