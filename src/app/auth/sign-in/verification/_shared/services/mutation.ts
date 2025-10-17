import { useMutation } from '@tanstack/react-query';

import { postSendVerificationCode, postVerifyVerificationCode } from './api';
import {
  PostVerificationCodeRequest,
  PostVerifyVerificationCodeRequest,
} from './type';

export const usePostSendVerificationCode = () => {
  return useMutation({
    mutationFn: (request: PostVerificationCodeRequest) =>
      postSendVerificationCode(request),
  });
};

export const usePostVerifyVerificationCode = () => {
  return useMutation({
    mutationFn: (request: PostVerifyVerificationCodeRequest) =>
      postVerifyVerificationCode(request),
  });
};
