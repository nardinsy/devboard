import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ColumnStatus } from '@/features/board/types';
import { newTaskSchema, NewTaskFormData } from '../schemas';

export const useNewTaskForm = ({ boardId, status }: { boardId: string; status: ColumnStatus }) => {
  return useForm<NewTaskFormData>({
    resolver: zodResolver(newTaskSchema),
    defaultValues: {
      boardId,
      title: '',
      description: '',
      label: 'feature',
      priority: 'low',
      status,
      dueDate: '',
    },
  });
};
