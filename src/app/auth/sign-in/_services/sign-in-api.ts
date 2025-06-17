import {
  SignInAPIBody,
  SignInAPIResponse,
} from '@/app/auth/sign-in/_services/sign-in-api.type';
import instance from '@/shared/services/instance';

const postSignInAPI = async (data: SignInAPIBody) => {
  const response = await instance<SignInAPIResponse>(
    `/auth/sign-in?username=${data.username}&password=${data.password}`,
    {
      method: 'POST',
    },
  );
  return response.data;
};

export { postSignInAPI };
