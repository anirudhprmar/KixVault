import { Navigate, Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { LoaderCircle } from 'lucide-react';

export default function ProtectedRoute() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()
  const location = useLocation()

  useEffect(() => {
      checkAuth()
  }, [ checkAuth])

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="size-10 animate-spin" />
      </div>
    )
  }
 
  

  if (!authUser) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}