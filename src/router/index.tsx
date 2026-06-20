import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/router/ProtectedRoute';
import { PUBLIC_ROUTES, ROUTES, PROTECTED_ROUTES } from './routes';
import PublicRoute from './PublicRoute';
import RootRedirect from './RootRedirect';
import { LoadingScreen } from '@/components/LoadingScreen';

const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const BoardPage = lazy(() => import('@/features/board/pages/BoardPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export function AppRouter() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path={PUBLIC_ROUTES.LOGIN} element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path={PROTECTED_ROUTES.BOARD} element={<BoardPage />} />
        </Route>

        <Route path={ROUTES.ROOT} element={<RootRedirect />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
