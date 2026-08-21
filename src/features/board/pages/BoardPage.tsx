import { useParams, useSearchParams } from 'react-router-dom';

import { useBoard } from '../hooks/useBoard';
import NotFoundPage from '@/pages/NotFoundPage';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Modal } from '@/components/Modal';
import { NewTaskForm } from '@/features/tasks/components/NewTaskForm';
import { BoardContent } from '../components/BoardContent';
import { BoardHeader } from '../components/BoardHeader';
import { ColumnStatus } from '../types';
import { useCallback } from 'react';

const BoardPage = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: board, isLoading, error } = useBoard(boardId ?? '');

  const showModal = !!searchParams.get('createTask');

  const handleCloseModal = useCallback(() => {
    setSearchParams((searchParams) => {
      searchParams.delete('createTask');
      return searchParams;
    });
  }, [setSearchParams]);

  if (isLoading) return <LoadingScreen />;
  if (error || !board || !boardId) return <NotFoundPage />;

  return (
    <>
      <BoardHeader board={board} />
      <BoardContent boardId={boardId} />
      {showModal && (
        <Modal onClose={handleCloseModal} title="Create a new task">
          <NewTaskForm
            boardId={boardId}
            status={searchParams.get('createTask') as ColumnStatus}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </>
  );
};

export default BoardPage;
