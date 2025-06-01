import { Navigate, Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { LoaderCircle } from 'lucide-react';

export default function ProtectedRoute() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const location = useLocation();

  // Check auth status when component mounts
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Show loading spinner while checking auth
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="size-10 animate-spin" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!authUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render protected routes if authenticated
  return <Outlet />;
}