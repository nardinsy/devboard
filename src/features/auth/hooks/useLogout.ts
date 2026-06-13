import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authRepository } from '@/services';
import { useAuthStore } from '../store/auth.store';

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authRepository.logout(),
    onSuccess: () => {
      useAuthStore.getState().clearAuth();
      queryClient.clear();
    },
  });
};
