import { getCookie } from 'cookies-next';

export const getAccessTokenFromServer = async () => {
  const refreshToken = getCookie('refreshToken');

  if (!refreshToken) return false;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reissue`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok || res.status !== 200) return false;

  return getCookie('accessToken');
};
