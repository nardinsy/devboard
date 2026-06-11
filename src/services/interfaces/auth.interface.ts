import { AuthResponse, AuthTokens, LoginCredentials, User } from '@/features/auth/types'

export interface IAuthRepository {
  login: (credentials: LoginCredentials) => Promise<AuthResponse>
  logout: () => Promise<void>
  refreshToken: (token: string) => Promise<AuthTokens>
  getMe: () => Promise<User>
}
