/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/app/context/AuthContext';
import { ProtectedRoute } from '@/app/routes/ProtectedRoute';
import { PublicRoute } from '@/app/routes/PublicRoute';
import { CapabilityRoute } from '@/app/routes/CapabilityRoute';
import { TenantAccessRoute } from '@/app/routes/TenantAccessRoute';
import { AppLayout } from '@/shared/layout/AppLayout';
import { TenantAppLayout } from '@/shared/layout/TenantAppLayout';
import { getDefaultRoute, isTenantUser } from '@/app/auth/tenantAccess';
import { useAuth } from '@/app/context/AuthContext';

const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage').then(({ LoginPage }) => ({ default: LoginPage })));
const BillingPage = lazy(() => import('@/features/billing/pages/BillingPage').then(({ BillingPage }) => ({ default: BillingPage })));
const SalesPage = lazy(() => import('@/features/sales/pages/SalesPage').then(({ SalesPage }) => ({ default: SalesPage })));
const InventoryPage = lazy(() => import('@/features/inventory/pages/InventoryPage').then(({ InventoryPage }) => ({ default: InventoryPage })));
const ProductsPage = lazy(() => import('@/features/products/pages/ProductsPage').then(({ ProductsPage }) => ({ default: ProductsPage })));
const PurchasesPage = lazy(() => import('@/features/purchases/pages/PurchasesPage').then(({ PurchasesPage }) => ({ default: PurchasesPage })));
const SuppliersPage = lazy(() => import('@/features/suppliers/pages/SuppliersPage').then(({ SuppliersPage }) => ({ default: SuppliersPage })));
const CustomersPage = lazy(() => import('@/features/customers/pages/CustomersPage').then(({ CustomersPage }) => ({ default: CustomersPage })));
const ExpensesPage = lazy(() => import('@/features/expenses/pages/ExpensesPage').then(({ ExpensesPage }) => ({ default: ExpensesPage })));
const OutletMasterPage = lazy(() => import('@/features/outlets/pages/OutletMasterPage').then(({ OutletMasterPage }) => ({ default: OutletMasterPage })));
const EmployeeMasterPage = lazy(() => import('@/features/employees/pages/EmployeeMasterPage').then(({ EmployeeMasterPage }) => ({ default: EmployeeMasterPage })));
const ServicePersonMasterPage = lazy(() => import('@/features/service-persons/pages/ServicePersonMasterPage').then(({ ServicePersonMasterPage }) => ({ default: ServicePersonMasterPage })));
const OverviewPage = lazy(() => import('@/features/overview/pages/OverviewPage').then(({ OverviewPage }) => ({ default: OverviewPage })));
const OrganizationsPage = lazy(() => import('@/features/organizations/pages/OrganizationsPage').then(({ OrganizationsPage }) => ({ default: OrganizationsPage })));
const OrganizationDetailsPage = lazy(() => import('@/features/organizations/pages/OrganizationDetailsPage').then(({ OrganizationDetailsPage }) => ({ default: OrganizationDetailsPage })));
const PlansPage = lazy(() => import('@/features/plans/pages/PlansPage').then(({ PlansPage }) => ({ default: PlansPage })));
const ProfilePage = lazy(() => import('@/features/profile/pages/ProfilePage').then(({ ProfilePage }) => ({ default: ProfilePage })));

function TenantRouteLayout() {
  return <TenantAppLayout />;
}

function ProfileRouteLayout() {
  const { user } = useAuth();
  return isTenantUser(user) ? <TenantAppLayout /> : <AppLayout />;
}

function TenantPlaceholderPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center text-text-muted">
      This workspace is not available yet.
    </div>
  );
}

function HomeRoute() {
  const { user } = useAuth();
  return <Navigate to={getDefaultRoute(user)} replace />;
}

function RouteFallback() {
  return <div className="min-h-screen bg-background" aria-label="Loading page" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomeRoute />} />

            {/* Tenant/store routes are protected by tenant membership and capability checks. */}
            <Route element={<TenantRouteLayout />}>
              <Route element={<TenantAccessRoute capability="billing.read" />}>
                <Route path="/billing" element={<BillingPage />} />
              </Route>
              <Route path="/pos" element={<Navigate to="/billing" replace />} />
              <Route path="/dashboard" element={<TenantPlaceholderPage />} />
              <Route element={<TenantAccessRoute capability="sales.read" />}><Route path="/sales" element={<SalesPage />} /></Route>
              <Route element={<TenantAccessRoute capability="inventory.read" />}><Route path="/inventory" element={<InventoryPage />} /></Route>
              <Route element={<TenantAccessRoute capability="products.read" />}><Route path="/products" element={<ProductsPage />} /></Route>
              <Route element={<TenantAccessRoute capability="purchases.read" />}><Route path="/purchases" element={<PurchasesPage />} /></Route>
              <Route element={<TenantAccessRoute capability="suppliers.read" />}><Route path="/suppliers" element={<SuppliersPage />} /></Route>
              <Route element={<TenantAccessRoute capability="customers.read" />}><Route path="/customers" element={<CustomersPage />} /></Route>
              <Route element={<TenantAccessRoute capability="expenses.read" />}><Route path="/expenses" element={<ExpensesPage />} /></Route>
              <Route path="/reports" element={<TenantPlaceholderPage />} />
              <Route element={<TenantAccessRoute capability="outlets.read" administrationOnly />}><Route path="/outlets" element={<OutletMasterPage />} /></Route>
              <Route element={<TenantAccessRoute capability="employees.read" administrationOnly />}><Route path="/employees" element={<EmployeeMasterPage />} /></Route>
              <Route element={<TenantAccessRoute capability="service_persons.read" administrationOnly />}><Route path="/service-persons" element={<ServicePersonMasterPage />} /></Route>
              <Route path="/settings" element={<TenantPlaceholderPage />} />
            </Route>

            <Route element={<AppLayout />}>
              <Route element={<CapabilityRoute capability="overview.read" />}>
                <Route path="/overview" element={<OverviewPage />} />
              </Route>
              <Route element={<CapabilityRoute capability="organizations.read" />}>
                <Route path="/organizations" element={<OrganizationsPage />} />
                <Route path="/organizations/:organizationId" element={<OrganizationDetailsPage />} />
                <Route path="/organizations/:organizationId/:tab" element={<OrganizationDetailsPage />} />
              </Route>
              <Route element={<CapabilityRoute capability="plans.read" />}>
                <Route path="/plans" element={<PlansPage />} />
              </Route>
            </Route>
            <Route element={<ProfileRouteLayout />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
