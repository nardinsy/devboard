import { AuthResponse, AuthTokens, LoginCredentials, User } from '@/features/auth/types';
import { IAuthRepository } from '../interfaces/auth.interface';

type MockUser = User & { password: string };
const DUMMY_USERS: MockUser[] = [
  {
    id: '1',
    name: 'User-1',
    role: 'admin',
    email: 'admin@devboard.com',
    password: '123',
  },
  {
    id: '2',
    name: 'User-2',
    role: 'member',
    email: 'member@devboard.com',
    password: '123',
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockAuthRepository implements IAuthRepository {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const user = DUMMY_USERS.find((user) => user.email === credentials.email);
    if (!user || user.password !== credentials.password) {
      throw new Error('Invalid email or password');
    }

    const res: AuthResponse = {
      user: { email: user.email, id: user.id, name: user.name, role: user.role },
      tokens: {
        accessToken: `mock_access_${user.id}_${Date.now()}`,
        refreshToken: `mock_refresh_${user.id}_${Date.now()}`,
      },
    };
    await delay(500);
    return res;
  }

  async logout(): Promise<void> {
    await delay(500);
  }

  async refreshToken(token: string): Promise<AuthTokens> {
    await delay(500);
    const match = token.match(/mock_(?:access|refresh)_(\d+)_/);
    const userId = match?.[1];

    if (!userId) throw new Error('Invalid token');
    return {
      accessToken: `mock_access_${userId}_${Date.now()}`,
      refreshToken: `mock_refresh_${userId}_${Date.now()}`,
    };
  }

  async getMe(): Promise<User> {
    await delay(500);
    return {
      id: DUMMY_USERS[0].id,
      email: DUMMY_USERS[0].email,
      name: DUMMY_USERS[0].name,
      role: DUMMY_USERS[0].role,
    };
  }
}
