import { useMutation } from '@tanstack/react-query';

import { postSignInAPI } from '@/app/auth/sign-in/_services/sign-in-api';
import { SignInAPIBody } from '@/app/auth/sign-in/_services/sign-in-api.type';

const useSignInMutation = () => {
  return useMutation({
    mutationFn: (body: SignInAPIBody) => postSignInAPI(body),
    onSuccess: async (data) => {
      console.log('로그인 성공:', data);
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  });
};

export { useSignInMutation };
