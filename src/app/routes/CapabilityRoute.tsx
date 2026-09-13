import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/app/context/AuthContext';
import { getDefaultRoute } from '@/app/auth/tenantAccess';

export function CapabilityRoute({ capability }: { capability: string }) {
  const { user, hasCapability } = useAuth();
  return hasCapability(capability) ? <Outlet /> : <Navigate to={getDefaultRoute(user)} replace />;
}
