import {
  PostVerificationCodeRequest,
  PostVerifyVerificationCodeRequest,
} from '@/app/auth/sign-in/verification/_shared/services/type';
import instance from '@/shared/services/instance';

const BASE_URL = '/auth';

/**
 * @description 인증번호 발송&재발송
 */
export const postSendVerificationCode = async (
  request: PostVerificationCodeRequest,
) => {
  const data = await instance(`${BASE_URL}/sms/send-code`, {
    method: 'POST',
    body: JSON.stringify(request),
  });
  return data;
};

/**
 * @description 인증번호 검증
 */
export const postVerifyVerificationCode = async (
  request: PostVerifyVerificationCodeRequest,
) => {
  const data = await instance(`${BASE_URL}/sms/verify`, {
    method: 'POST',
    body: JSON.stringify(request),
  });
  return data;
};
