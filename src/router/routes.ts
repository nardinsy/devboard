export const PUBLIC_ROUTES = {
  LOGIN: '/login',
} as const;

export const PROTECTED_ROUTES = {
  BOARD: '/board/:boardId',
} as const;

export const ROUTES = {
  ROOT: '/',
  ...PUBLIC_ROUTES,
  ...PROTECTED_ROUTES,
} as const;

export const publicRoutesArray = Object.values(PUBLIC_ROUTES);
export const protectedRoutesArray = Object.values(PROTECTED_ROUTES);

export const DEFAULT_REDIRECT = PROTECTED_ROUTES.BOARD;

export const ROUTE_BUILDERS = {
  board: (boardId: string) => PROTECTED_ROUTES.BOARD.replace(':boardId', boardId),
} as const;
