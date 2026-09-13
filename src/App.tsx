/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from '@/app/context/AuthContext';
import { ProtectedRoute } from '@/app/routes/ProtectedRoute';
import { PublicRoute } from '@/app/routes/PublicRoute';
import { CapabilityRoute } from '@/app/routes/CapabilityRoute';
import { TenantAccessRoute } from '@/app/routes/TenantAccessRoute';
import { AppLayout } from '@/shared/layout/AppLayout';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { BillingPage } from '@/features/billing/pages/BillingPage';
import { SalesPage } from '@/features/sales/pages/SalesPage';
import { InventoryPage } from '@/features/inventory/pages/InventoryPage';
import { ProductsPage } from '@/features/products/pages/ProductsPage';
import { PurchasesPage } from '@/features/purchases/pages/PurchasesPage';
import { SuppliersPage } from '@/features/suppliers/pages/SuppliersPage';
import { CustomersPage } from '@/features/customers/pages/CustomersPage';
import { ExpensesPage } from '@/features/expenses/pages/ExpensesPage';
import { OutletMasterPage } from '@/features/outlets';
import { EmployeeMasterPage } from '@/features/employees';
import { ServicePersonMasterPage } from '@/features/service-persons';
import { OverviewPage } from '@/features/overview/pages/OverviewPage';
import { OrganizationsPage } from '@/features/organizations/pages/OrganizationsPage';
import { OrganizationDetailsPage } from '@/features/organizations/pages/OrganizationDetailsPage';
import { PlansPage } from '@/features/plans/pages/PlansPage';
import { ProfilePage } from '@/features/profile/pages/ProfilePage';
import { TenantAppLayout } from '@/shared/layout/TenantAppLayout';
import { getDefaultRoute } from '@/app/auth/tenantAccess';
import { useAuth } from '@/app/context/AuthContext';

function TenantRouteLayout() {
  return <TenantAppLayout />;
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

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
              <Route element={<CapabilityRoute capability="profile.read" />}>
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
