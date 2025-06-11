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

export const getErrorMessage = (errorCode?: string): string => {
  if (AUTH_ERROR_CODES.has(errorCode ?? '')) {
    return ERROR_MESSAGES['AUTH_RETRY_REQUIRED'];
  }

  if (errorCode && ERROR_MESSAGES[errorCode]) {
    return ERROR_MESSAGES[errorCode];
  }

  return '알 수 없는 에러가 발생했습니다.';
};
