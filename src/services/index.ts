import { MockAuthRepository } from './mock/auth.mock';
import { IAuthRepository } from './interfaces/auth.interface';

export const authRepository: IAuthRepository = new MockAuthRepository();
