import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/app/context/AuthContext';

export function PublicRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-surface-main">
      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  // If user is already authenticated, redirect them away from public routes (like login)
  if (user) {
    return <Navigate to="/overview" replace />;
  }

  return <Outlet />;
}
