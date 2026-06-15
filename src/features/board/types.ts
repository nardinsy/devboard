export type Priority = 'low' | 'medium' | 'high';
export type Label = 'feature' | 'bug' | 'docs' | 'perf';
export type ColumnStatus = 'todo' | 'in-progress' | 'in-review' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  label: Label;
  status: ColumnStatus;
  assigneeId: string;
  boardId: string;
  createdAt: string;
  dueDate?: string;
}

export interface Column {
  id: string;
  title: string;
  status: ColumnStatus;
  taskIds: string[];
}

export interface Board {
  id: string;
  title: string;
  columns: Column[];
  createdAt: string;
}

export interface CreateTaskDto {
  title: string;
  priority: Priority;
  label: Label;
  status: ColumnStatus;
  boardId: string;
  description?: string;
  dueDate?: string;
}

export type UpdateTaskDto = Partial<Omit<Task, 'id' | 'createdAt'>>;
