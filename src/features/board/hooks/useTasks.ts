import { useQuery } from '@tanstack/react-query';

import { boardRepository } from '@/services';

export const useTasks = (id: string) => {
  return useQuery({
    queryKey: ['tasks', id],
    queryFn: () => boardRepository.getTasks(id),
  });
};
