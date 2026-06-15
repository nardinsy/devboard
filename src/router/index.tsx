import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '@/router/ProtectedRoute';
import { DEFAULT_REDIRECT, PROTECTED_ROUTES, PUBLIC_ROUTES, ROUTES } from './routes';
import PublicRoute from './PublicRoute';

const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const BoardPage = lazy(() => import('@/features/board/pages/BoardPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export function AppRouter() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-gray-400">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path={PUBLIC_ROUTES.LOGIN} element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path={DEFAULT_REDIRECT} element={<BoardPage />} />
        </Route>

        <Route path={ROUTES.ROOT} element={<Navigate to={PROTECTED_ROUTES.BOARD} replace />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
