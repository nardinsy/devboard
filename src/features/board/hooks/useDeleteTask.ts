import { useMutation, useQueryClient } from '@tanstack/react-query';

import { boardRepository } from '@/services';

export const useDeleteTask = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => boardRepository.deleteTask(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', boardId] });
    },
  });
};
