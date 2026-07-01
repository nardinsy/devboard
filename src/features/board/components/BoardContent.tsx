import { UniqueIdentifier } from '@dnd-kit/core';
import clsx from 'clsx';

import { useTasks } from '../hooks/useTasks';
import { BoardColumns } from './BoardColumns';
import { ColumnStatus, Task } from '../types';

export const BoardContent = ({ boardId }: { boardId: string }) => {
  const { data: tasks, error, isLoading, dataUpdatedAt } = useTasks(boardId);
  // TODO fix this mess
  const todoTasks = tasks?.filter((task) => task.status === 'todo');
  const inProgressTasks = tasks?.filter((task) => task.status === 'in-progress');
  const inReviewTasks = tasks?.filter((task) => task.status === 'in-review');
  const doneTasks = tasks?.filter((task) => task.status === 'done');

  const boardData: { id: UniqueIdentifier; status: ColumnStatus; tasks: Task[] }[] = [
    {
      id: 'todo',
      status: 'todo',
      tasks: todoTasks ?? [],
    },
    {
      id: 'in-progress',
      status: 'in-progress',
      tasks: inProgressTasks ?? [],
    },
    {
      id: 'in-review',
      status: 'in-review',
      tasks: inReviewTasks ?? [],
    },
    {
      id: 'done',
      status: 'done',
      tasks: doneTasks ?? [],
    },
  ];

  return (
    <div className="relative">
      {error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/40 backdrop-blur-xs">
          <div className="w-1/4 text-center bg-white border border-red-200 rounded-xl px-6 py-16 shadow-2xl">
            <p className="text-red-600 text-lg mb-2">Failed to load tasks</p>
            <button
              onClick={() => window.location.reload()}
              className="text-lg text-blue-600 cursor-pointer"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <section
        className={clsx(
          'overflow-x-scroll h-screen flex flex-row gap-2 px-2 md:justify-center py-2',
          error && 'pointer-events-none'
        )}
      >
        <BoardColumns key={dataUpdatedAt} isLoading={isLoading} columnsData={boardData} />
      </section>
    </div>
  );
};
