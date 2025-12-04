import {
  PostVerificationCodeRequest,
  PostVerifyVerificationCodeRequest,
} from '@/app/auth/sign-in/verification/_shared/services/type';
import httpClient from '@/lib/http-client/http-client';

const BASE_URL = 'auth';

/**
 * @description 인증번호 발송&재발송
 */
export const postSendVerificationCode = async (
  request: PostVerificationCodeRequest,
) => {
  const data = await httpClient({
    method: 'post',
    url: `${BASE_URL}/sms/send-code`,
    options: {
      json: request,
    },
  });

  return data;
};

/**
 * @description 인증번호 검증
 */
export const postVerifyVerificationCode = async (
  request: PostVerifyVerificationCodeRequest,
) => {
  const data = await httpClient({
    method: 'post',
    url: `${BASE_URL}/sms/verify`,
    options: {
      json: request,
    },
  });

  return data;
};
