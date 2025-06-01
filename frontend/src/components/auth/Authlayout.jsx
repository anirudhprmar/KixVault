import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useAuthStore } from '../../store/useAuthStore';
import { LoaderCircle } from 'lucide-react';
import AuthNavbar from '../AuthNavbar';

export default function Authlayout() {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderCircle className="size-10 animate-spin" />
      </div>
    );
  }

  // Simplified layout that just renders the auth forms
  return (<div >
      <AuthNavbar/>
      <main>
        <Outlet />
      </main>
  </div>) 
}