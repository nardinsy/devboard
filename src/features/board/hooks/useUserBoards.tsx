import { boardRepository } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const useUserBoards = (userId: string) => {
  return useQuery({
    queryKey: ['boards', 'user', userId],
    queryFn: () => boardRepository.getUserBoards(userId),
  });
};
