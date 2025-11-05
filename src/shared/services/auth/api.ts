const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth`;

export const refreshAccessToken = async () => {
  const res = await fetch(`${BASE_URL}/reissue`, {
    method: 'POST',
    credentials: 'include',
  });

  if (res.ok && res.status === 200) {
    return true;
  } else {
    return false;
  }
};

export const logout = async () => {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  return res;
};
