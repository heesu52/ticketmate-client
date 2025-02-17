import { SignInAPIBody } from '@/app/auth/sign-in/_services/sign-in-api.type';
import httpClient from '@/shared/services';
import { fetchWithErrorHandling } from '@/shared/utils/services/fetch-utils';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const instance = httpClient({
  baseURL: BASE_URL,
});

const postSignInAPI = (data: SignInAPIBody) => {
  return fetchWithErrorHandling(
    instance('/auth/sign-in', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  );
};

export { postSignInAPI };
