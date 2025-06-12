import { useEffect } from 'react';
import { Outlet} from 'react-router';
import { useAuthStore } from '../../store/useAuthStore';
import { LoaderCircle } from 'lucide-react';
import AuthNavbar from '../AuthNavbar';
import AdminSidebar from '../AdminSidebar';

export default function AdminAuthlayout() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

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

 if (authUser?.isAdmin) {
     return (
      <div className="min-h-screen flex flex-col">
        <AuthNavbar />
        <div className="flex flex-1 overflow-hidden">
          <aside className="w-64 min-h-screen flex-shrink-0 border-r border-gray-200">
            <AdminSidebar />
          </aside>
          <main className="flex-1 overflow-auto p-8">
            <Outlet />
          </main>
        </div>
      </div>
    );
 }else{
  return <div className='text-center text-2xl font-bold mt-10'>Restricted</div>
 }

}