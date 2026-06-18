import { TaskCard } from '@/features/tasks/components/card/TaskCard';
import { Task } from '../types';

const tasks: Task[] = [
  {
    id: 'task-1',
    title:
      'If your component grows to need this kind of logic, clsx keeps the template clean and readable. For a single, predictable class like yours, the object lookup is simpler, faster, and dependency-free',
    description: 'Description',
    priority: 'low',
    label: 'feature',
    status: 'in-progress',
    assigneeId: '1',
    boardId: 'board-1',
    createdAt: '2026-06-01T09:00:00Z',
    dueDate: '2026-06-20T09:00:00Z',
  },
  {
    id: 'task-2',
    title: 'Implement drag and drop',
    description: 'Description',
    priority: 'medium',
    label: 'perf',
    status: 'in-review',
    assigneeId: '1',
    boardId: 'board-1',
    createdAt: '2026-06-01T09:00:00Z',
    dueDate: '2026-06-20T09:00:00Z',
  },
  {
    id: 'task-3',
    title: 'Write API documentation',
    description: 'Description',
    priority: 'high',
    label: 'docs',
    status: 'done',
    assigneeId: '1',
    boardId: 'board-1',
    createdAt: '2026-06-01T09:00:00Z',
    dueDate: '2026-06-20T09:00:00Z',
  },
  {
    id: 'task-4',
    title: 'Fix search performance bug',
    description: 'Description',
    priority: 'low',
    label: 'bug',
    status: 'todo',
    assigneeId: '1',
    boardId: 'board-1',
    createdAt: '2026-06-01T09:00:00Z',
    dueDate: '2026-06-20T09:00:00Z',
  },
];

const BoardPage = () => {
  return (
    // <div className="min-h-screen flex flex-col items-center justify-center">
    //   <h1 className="text-2xl font-semibold text-gray-600">Board — Phase 3 coming soon</h1>
    // </div>
    <div className="ml-96 space-y-6">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default BoardPage;
