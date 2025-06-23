import { SignInAPIBody } from '@/app/auth/sign-in/_services/sign-in-api.type';
import instance from '@/shared/services/instance';

const postSignInAPI = async (data: SignInAPIBody) => {
  return instance(
    `/auth/sign-in?username=${data.username}&password=${data.password}`,
    {
      method: 'POST',
    },
  );
};

export { postSignInAPI };
