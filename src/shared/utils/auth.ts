export const refreshAccessToken = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reissue`,
    {
      method: 'POST',
      credentials: 'include',
    },
  );

  if (res.ok && res.status === 200) {
    return true;
  } else {
    return false;
  }
};
