import { useParams } from 'react-router-dom';
import { BoardContent } from '../components/BoardContent';
import { BoardHeader } from '../components/BoardHeader';
import { useBoard } from '../hooks/useBoard';
import NotFoundPage from '@/pages/NotFoundPage';
import { LoadingScreen } from '@/components/LoadingScreen';

const BoardPage = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const { data: board, isLoading, error } = useBoard(boardId ?? '');

  if (isLoading) return <LoadingScreen />;
  if (error || !board || !boardId) return <NotFoundPage />;

  return (
    <>
      <BoardHeader board={board} />
      <BoardContent boardId={boardId} />
    </>
  );
};

export default BoardPage;
