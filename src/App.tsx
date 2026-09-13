/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from '@/app/context/AuthContext';
import { ProtectedRoute } from '@/app/routes/ProtectedRoute';
import { PublicRoute } from '@/app/routes/PublicRoute';
import { CapabilityRoute } from '@/app/routes/CapabilityRoute';
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

function TenantRouteLayout() {
  return <Outlet />;
}

function TenantPlaceholderPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center text-text-muted">
      This workspace is not available yet.
    </div>
  );
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
            <Route path="/" element={<Navigate to="/overview" replace />} />

            {/* Tenant/Store UI routes. These remain authentication-protected
                until tenant membership/capability enforcement is introduced. */}
            <Route element={<TenantRouteLayout />}>
              <Route path="/billing" element={<BillingPage />} />
              <Route path="/pos" element={<Navigate to="/billing" replace />} />
              <Route path="/dashboard" element={<TenantPlaceholderPage />} />
              <Route path="/sales" element={<SalesPage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/purchases" element={<PurchasesPage />} />
              <Route path="/suppliers" element={<SuppliersPage />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/expenses" element={<ExpensesPage />} />
              <Route path="/reports" element={<TenantPlaceholderPage />} />
              <Route path="/outlets" element={<OutletMasterPage />} />
              <Route path="/employees" element={<EmployeeMasterPage />} />
              <Route path="/service-persons" element={<ServicePersonMasterPage />} />
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
