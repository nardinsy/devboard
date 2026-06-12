import axios from 'axios';
import type { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

import { useAuthStore } from '@/features/auth/store/auth.store';
import { authRepository } from '@/services';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10_000,
});

apiClient.interceptors.request.use((config) => {
  const tokens = useAuthStore.getState().tokens;
  if (tokens) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status !== 401) return Promise.reject(error);

    // if we already retried once, give up
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (originalRequest._retry) return Promise.reject(error);
    originalRequest._retry = true;

    try {
      const tokens = useAuthStore.getState().tokens;
      if (!tokens?.refreshToken) {
        useAuthStore.getState().clearAuth();
        return Promise.reject(error);
      }

      const newTokens = await authRepository.refreshToken(tokens.refreshToken);
      useAuthStore.getState().setTokens(newTokens);
      originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
      return apiClient(originalRequest);
    } catch {
      useAuthStore.getState().clearAuth();
      window.location.href = '/login';
      return Promise.reject(error);
    }
  }
);
