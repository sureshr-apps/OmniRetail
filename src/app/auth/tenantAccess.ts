import type { User } from '@/features/auth/services/AuthService';

export const TENANT_OPERATIONAL_CAPABILITIES = [
  'billing.read',
  'sales.read',
  'inventory.read',
  'products.read',
  'purchases.read',
  'suppliers.read',
  'customers.read',
  'expenses.read',
] as const;

export const TENANT_ADMIN_CAPABILITIES = [
  ...TENANT_OPERATIONAL_CAPABILITIES,
  'outlets.read',
  'employees.read',
  'service_persons.read',
] as const;

const TENANT_HOME_ROUTES = [
  { capability: 'billing.read', path: '/billing' },
  { capability: 'sales.read', path: '/sales' },
  { capability: 'inventory.read', path: '/inventory' },
  { capability: 'products.read', path: '/products' },
  { capability: 'purchases.read', path: '/purchases' },
  { capability: 'suppliers.read', path: '/suppliers' },
  { capability: 'customers.read', path: '/customers' },
  { capability: 'expenses.read', path: '/expenses' },
] as const;

export function hasRole(user: User | null, roleCode: string): boolean {
  return user?.roles.some((role) => role.code === roleCode) ?? false;
}

export function isOrganizationAdmin(user: User | null): boolean {
  return hasRole(user, 'organization.admin') && (user?.organizationIds.length ?? 0) > 0;
}

export function isMasterAdmin(user: User | null): boolean {
  return hasRole(user, 'master.admin');
}

export function getDefaultRoute(user: User | null): string {
  if (isOrganizationAdmin(user)) return '/billing';
  return TENANT_HOME_ROUTES.find(({ capability }) => user?.capabilities.includes(capability))?.path ?? '/overview';
}

export function canAccessTenantAdministration(user: User | null): boolean {
  return isOrganizationAdmin(user);
}

export function canAccessTenantOperationalModule(user: User | null, capability: string): boolean {
  return TENANT_OPERATIONAL_CAPABILITIES.includes(capability as (typeof TENANT_OPERATIONAL_CAPABILITIES)[number])
    && (isOrganizationAdmin(user) || user?.capabilities.includes(capability) === true);
}
