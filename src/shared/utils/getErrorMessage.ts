import { ERROR_MESSAGES } from '../constants/error-type';

const AUTH_ERROR_CODES = new Set([
  'UNAUTHORIZED',
  'MISSING_AUTH_TOKEN',
  'INVALID_ACCESS_TOKEN',
  'INVALID_REFRESH_TOKEN',
  'EXPIRED_ACCESS_TOKEN',
  'EXPIRED_REFRESH_TOKEN',
  'REFRESH_TOKEN_NOT_FOUND',
  'TOKEN_BLACKLISTED',
  'COOKIES_NOT_FOUND',
]);

const UNKNOWN_ERROR = '알 수 없는 에러가 발생했습니다.' as const;

export const getErrorMessage = (
  errorCode?: keyof typeof ERROR_MESSAGES,
): string => {
  if (AUTH_ERROR_CODES.has(errorCode ?? '')) {
    return ERROR_MESSAGES['AUTH_RETRY_REQUIRED'];
  }

  if (errorCode) {
    return ERROR_MESSAGES[errorCode] ?? UNKNOWN_ERROR;
  }

  return UNKNOWN_ERROR;
};
