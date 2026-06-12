import { useMutation } from '@tanstack/react-query';

import { authRepository } from '@/services';
import { useAuthStore } from '../store/auth.store';
import { LoginCredentials } from '../types';

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authRepository.login(credentials),

    onSuccess: (data) => {
      useAuthStore.getState().setAuth(data.user, data.tokens);
    },
  });
};
