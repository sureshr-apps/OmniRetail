/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/app/context/AuthContext';
import { ProtectedRoute } from '@/app/routes/ProtectedRoute';
import { PublicRoute } from '@/app/routes/PublicRoute';
import { CapabilityRoute } from '@/app/routes/CapabilityRoute';
import { AppLayout } from '@/shared/layout/AppLayout';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { OverviewPage } from '@/features/overview/pages/OverviewPage';
import { OrganizationsPage } from '@/features/organizations/pages/OrganizationsPage';
import { OrganizationDetailsPage } from '@/features/organizations/pages/OrganizationDetailsPage';
import { PlansPage } from '@/features/plans/pages/PlansPage';
import { ProfilePage } from '@/features/profile/pages/ProfilePage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Navigate to="/overview" replace />} />
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

