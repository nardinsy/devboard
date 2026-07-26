import { MockAuthRepository } from './mock/auth.mock';
import { IAuthRepository } from './interfaces/auth.interface';
import { IBoardRepository } from './interfaces/board.interface';
import { MockBoardRepository } from './mock/board.mock';
import { DUMMY_BOARD, DUMMY_TASKS } from './mock/mock-data';

export const authRepository: IAuthRepository = new MockAuthRepository();
export const boardRepository: IBoardRepository = new MockBoardRepository(DUMMY_BOARD, DUMMY_TASKS);
