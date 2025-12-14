import httpClient from '@/lib/http-client/http-client';

/**
 * @description 로그아웃
 */

// api/auth/logout
const postLogout = async () => {
  const data = await httpClient({
    method: 'post',
    url: 'auth/logout',
  });

  return data;
};
export { postLogout };
