import { getCookie } from 'cookies-next';

export const getAccessTokenFromServer = async () => {
  const refreshToken = await getCookie('refreshToken');

  if (!refreshToken) return false;

  console.log('getRefresh', refreshToken);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reissue`, {
    method: 'POST',
    credentials: 'include',
  });

  console.log('reissue', res);

  if (!res.ok || res.status !== 200) return false;

  return res.ok;
};
