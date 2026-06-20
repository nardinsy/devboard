import { useQuery } from '@tanstack/react-query';

import { boardRepository } from '@/services';

export const useBoard = (id: string) => {
  return useQuery({
    queryKey: ['board', id],
    queryFn: () => boardRepository.getBoard(id),
    enabled: !!id,
  });
};
