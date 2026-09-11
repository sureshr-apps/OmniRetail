import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/app/context/AuthContext';

export function CapabilityRoute({ capability }: { capability: string }) {
  const { hasCapability } = useAuth();
  return hasCapability(capability) ? <Outlet /> : <Navigate to="/overview" replace />;
}
