import { useAuthStore } from '@/features/auth/store/auth.store';
import { useUserBoards } from '@/features/board/hooks/useUserBoards';
import { Navigate } from 'react-router-dom';
import { ROUTE_BUILDERS } from './routes';

const RootRedirect = () => {
  // TODO: as I don't have dashboard page I use this component as a root page
  const userId = useAuthStore((state) => state.user?.id) as string;
  const { data: board, isLoading } = useUserBoards(userId);

  if (isLoading) return null;
  if (!board) return null;

  return <Navigate to={ROUTE_BUILDERS.board(board[0].id)} replace />;
};

export default RootRedirect;
