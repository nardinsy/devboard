import { Board, ColumnStatus, Task, CreateTaskDto, UpdateTaskDto } from '@/features/board/types';

export interface IBoardRepository {
  getBoard: (boardId: string) => Promise<Board>;
  getTasks: (boardId: string) => Promise<Task[]>;
  createTask: (data: CreateTaskDto) => Promise<Task>;
  updateTask: (id: string, data: UpdateTaskDto) => Promise<Task>;
  moveTask: (id: string, status: ColumnStatus) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
  getUserBoards: (userId: string) => Promise<Board[]>;
}
