import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/app/context/AuthContext';
import { canAccessTenantAdministration, canAccessTenantOperationalModule } from '@/app/auth/tenantAccess';

interface TenantAccessRouteProps {
  capability: string;
  administrationOnly?: boolean;
}

export function TenantAccessRoute({ capability, administrationOnly = false }: TenantAccessRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null;
  const allowed = administrationOnly
    ? canAccessTenantAdministration(user)
    : canAccessTenantOperationalModule(user, capability);

  return allowed ? <Outlet /> : <Navigate to="/overview" state={{ from: location }} replace />;
}
