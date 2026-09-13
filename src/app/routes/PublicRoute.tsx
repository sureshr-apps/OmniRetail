import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/app/context/AuthContext';
import { getDefaultRoute } from '@/app/auth/tenantAccess';

export function PublicRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-surface-main">
      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  // If user is already authenticated, redirect them away from public routes (like login)
  if (user) {
    const from = location.state?.from?.pathname || getDefaultRoute(user);
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
}
