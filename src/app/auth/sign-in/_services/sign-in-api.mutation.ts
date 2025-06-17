import { useMutation } from '@tanstack/react-query';

import { postSignInAPI } from '@/app/auth/sign-in/_services/sign-in-api';
import {
  SignInAPIBody,
  SignInAPIResponse,
} from '@/app/auth/sign-in/_services/sign-in-api.type';

const useSignInMutation = () => {
  return useMutation<SignInAPIResponse, unknown, SignInAPIBody>({
    mutationFn: (body: SignInAPIBody) => postSignInAPI(body),
    onSuccess: async (data) => {
      console.log('로그인 성공:', data);
      const memberType = data?.memberType;
      if (memberType) {
        localStorage.setItem('memberType', memberType);
        console.log(memberType);
      }
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  });
};

export { useSignInMutation };
