import { SignInAPIBody } from '@/app/auth/sign-in/_services/sign-in-api.type';
import instance from '@/shared/services';

const postSignInAPI = (data: SignInAPIBody) => {
  return instance(
    `/auth/sign-in?username=${data.username}&password=${data.password}`,
    {
      method: 'POST',
    },
  );
};

export { postSignInAPI };
