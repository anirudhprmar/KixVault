import { useEffect } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { LoaderCircle } from 'lucide-react';

export default function AdminAuthlayout() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/discover";

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderCircle className="size-10 animate-spin" />
      </div>
    );
  }

  if (authUser.isAdmin) {
    return <Navigate to={from} replace />;
  }

  // Simplified layout that just renders the auth forms
  return <Outlet />;
}