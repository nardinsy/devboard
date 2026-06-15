import { MockAuthRepository } from './mock/auth.mock';
import { IAuthRepository } from './interfaces/auth.interface';
import { IBoardRepository } from './interfaces/board.interface';
import { MockBoardRepository } from './mock/board.mock';

export const authRepository: IAuthRepository = new MockAuthRepository();
export const boardRepository: IBoardRepository = new MockBoardRepository();
