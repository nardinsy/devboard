import { useSortable } from '@dnd-kit/sortable';
import { UniqueIdentifier } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';

import { TaskCardContent } from './TaskCardContent';
import { Priority, Task } from '@/features/board/types';

const cardBorderVariants: Record<Priority, string> = {
  low: 'border border-green-600',
  medium: 'border border-amber-600',
  high: 'border border-red-600',
};

export const TaskCard = ({ id, task }: { id: UniqueIdentifier; task: Task }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(
        `w-full min-h-24 flex flex-col justify-between rounded-2xl p-2 bg-white shadow-sm cursor-grab active:cursor-grabbing ${isDragging ? 'z-10 shadow-md opacity-50' : ''}`,
        cardBorderVariants[task.priority]
      )}
    >
      <TaskCardContent task={task} />
    </li>
  );
};
