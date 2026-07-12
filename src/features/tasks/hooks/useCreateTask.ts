import { useMutation, useQueryClient } from '@tanstack/react-query';

import { boardRepository } from '@/services';
import { CreateTaskDto } from '@/features/tasks/types';
import { toast } from 'sonner';

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskDto) => boardRepository.createTask(data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks', data.boardId] });
    },
    onError: () => toast.error('Failed to create task. Please try again.'),
  });
};
