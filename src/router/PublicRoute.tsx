import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { DEFAULT_REDIRECT } from './routes';

const PublicRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated ? <Navigate to={DEFAULT_REDIRECT} replace /> : <Outlet />;
};

export default PublicRoute;
