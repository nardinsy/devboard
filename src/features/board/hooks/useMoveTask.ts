import { useMutation, useQueryClient } from '@tanstack/react-query';

import { boardRepository } from '@/services';
import { ColumnStatus } from '../types';

export const useMoveTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ColumnStatus }) =>
      boardRepository.moveTask(id, status),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks', data.boardId] });
    },
  });
};
