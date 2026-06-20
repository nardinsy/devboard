import { TaskCard } from '@/features/tasks/components/card/TaskCard';
import { ColumnStatus, Task } from '../types';
import clsx from 'clsx';

const statusIconVariants: Record<ColumnStatus, string> = {
  'in-progress': 'bg-sky-300',
  'in-review': 'bg-orange-400',
  done: 'bg-green-500',
  todo: 'bg-gray-300',
};

const statusTitleVariants: Record<ColumnStatus, string> = {
  'in-progress': 'In Progress',
  'in-review': 'In Review',
  done: 'Done',
  todo: 'Todo',
};

export const BoardColumn = ({
  status,
  tasks,
  isLoading,
}: {
  status: ColumnStatus;
  tasks: Task[];
  isLoading: boolean;
}) => {
  const content =
    tasks.length === 0 ? (
      <div className="flex justify-center py-8 text-gray-400 text-sm">No task yet</div>
    ) : (
      <div className="space-y-2.5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    );

  return (
    <section className="flex flex-col gap-3 bg-neutral-100 rounded-xl p-3 min-w-72">
      <div className="flex items-center justify-between px-1 text-gray-800">
        <div className="flex items-center gap-2">
          <span className={clsx('w-2.5 h-2.5 rounded-full', statusIconVariants[status])} />
          <h2 className="text-sm font-medium text-gray-700">{statusTitleVariants[status]}</h2>
          <span className="text-sm text-gray-400 bg-white rounded-full px-2 py-0.5 border border-gray-200">
            {tasks.length}
          </span>
        </div>
        <button
          className="text-gray-400 hover:text-gray-600 hover:bg-white rounded-md p-1 transition-colors cursor-pointer"
          aria-label="Add task"
        >
          +
        </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-8 text-gray-400 text-sm">Loading ...</div>
      ) : (
        content
      )}
    </section>
  );
};
