import { useMutation, useQueryClient } from '@tanstack/react-query';

import { boardRepository } from '@/services';
import { ColumnStatus } from '../types';

export const useUpdateColumnOrder = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: { status: ColumnStatus; taskIds: string[] }[]) =>
      boardRepository.updateColumnOrder(updates),

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', boardId] });
    },
  });
};
