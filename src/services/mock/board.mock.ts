import { Board, ColumnStatus, CreateTaskDto, Task, UpdateTaskDto } from '@/features/board/types';
import { IBoardRepository } from '../interfaces/board.interface';

let DUMMY_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Setup CI/CD pipeline',
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
  {
    id: 'task-5',
    title: 'Auth token refresh logic',
    description: 'Description',
    priority: 'high',
    label: 'perf',
    status: 'done',
    assigneeId: '1',
    boardId: 'board-1',
    createdAt: '2026-06-01T09:00:00Z',
    dueDate: '2026-06-20T09:00:00Z',
  },
  {
    id: 'task-6',
    title: 'Add dark mode support',
    description: 'Description',
    priority: 'low',
    label: 'docs',
    status: 'in-progress',
    assigneeId: '1',
    boardId: 'board-1',
    createdAt: '2026-06-01T09:00:00Z',
    dueDate: '2026-06-20T09:00:00Z',
  },
  {
    id: 'task-7',
    title: 'Write unit tests for auth',
    description: 'Description',
    priority: 'medium',
    label: 'docs',
    status: 'in-review',
    assigneeId: '1',
    boardId: 'board-1',
    createdAt: '2026-06-01T09:00:00Z',
    dueDate: '2026-06-20T09:00:00Z',
  },
  {
    id: 'task-8',
    title: 'Fix mobile layout issues',
    description: 'Description',
    priority: 'high',
    label: 'bug',
    status: 'todo',
    assigneeId: '1',
    boardId: 'board-1',
    createdAt: '2026-06-01T09:00:00Z',
    dueDate: '2026-06-20T09:00:00Z',
  },
];

const DUMMY_BOARD: Board = {
  id: 'board-1',
  title: 'Project-1',
  columns: [
    { id: 'col-1', title: 'Todo', status: 'todo', taskIds: ['task-4', 'task-8'] },
    { id: 'col-2', title: 'In Progress', status: 'in-progress', taskIds: ['task-1', 'task-6'] },
    { id: 'col-3', title: 'In Review', status: 'in-review', taskIds: ['task-2', 'task-7'] },
    { id: 'col-4', title: 'Done', status: 'done', taskIds: ['task-3', 'task-5'] },
  ],
  createdAt: '2026-06-01T09:00:00Z',
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const addToBoard = (status: ColumnStatus, taskId: string) => {
  const index = DUMMY_BOARD.columns.findIndex((col) => col.status === status);
  DUMMY_BOARD.columns[index].taskIds.push(taskId);
};

const deleteFromBoard = (status: ColumnStatus, taskId: string) => {
  const index = DUMMY_BOARD.columns.findIndex((col) => col.status === status);
  DUMMY_BOARD.columns[index].taskIds = DUMMY_BOARD.columns[index].taskIds.filter(
    (task) => task !== taskId
  );
};

const createTaskFromDto = (dto: CreateTaskDto, assigneeId: string = '1'): Task => {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    assigneeId,
    ...dto,
  };
};

export class MockBoardRepository implements IBoardRepository {
  async createTask(data: CreateTaskDto): Promise<Task> {
    const task = createTaskFromDto(data);
    DUMMY_TASKS.push(task);

    addToBoard(task.status, task.id);

    await delay(500);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const task = DUMMY_TASKS.find((task) => task.id === id);
    if (!task) throw new Error('Task not found');
    deleteFromBoard(task.status, id);
    DUMMY_TASKS = DUMMY_TASKS.filter((task) => task.id !== id);

    await delay(500);
  }

  async getBoard(boardId: string): Promise<Board> {
    if (DUMMY_BOARD.id !== boardId) throw new Error('Board not found');

    await delay(500);
    return DUMMY_BOARD;
  }

  async getTasks(boardId: string): Promise<Task[]> {
    await delay(500);
    return DUMMY_TASKS.filter((task) => task.boardId === boardId);
  }

  async moveTask(id: string, status: ColumnStatus): Promise<Task> {
    const index = DUMMY_TASKS.findIndex((task) => id === task.id);
    if (index === -1) throw new Error('Please try again');

    const oldStatus = DUMMY_TASKS[index].status;
    deleteFromBoard(oldStatus, id);
    addToBoard(status, id);
    DUMMY_TASKS[index].status = status;

    await delay(500);
    return DUMMY_TASKS[index];
  }

  async updateTask(id: string, data: UpdateTaskDto): Promise<Task> {
    const index = DUMMY_TASKS.findIndex((task) => id === task.id);
    if (index === -1) throw new Error('Not found');
    DUMMY_TASKS[index] = { ...DUMMY_TASKS[index], ...data };

    await delay(500);
    return DUMMY_TASKS[index];
  }
}
