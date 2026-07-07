import { useMutation, useQueryClient } from '@tanstack/react-query';

import { boardRepository } from '@/services';
import { CreateTaskDto } from '@/features/tasks/types';

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskDto) => boardRepository.createTask(data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks', data.boardId] });
    },
  });
};
