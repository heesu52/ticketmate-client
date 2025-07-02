import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

import { getMember } from '@/app/_shared/services/api';
import queryKey from '@/app/_shared/services/query-key';

export const useGetMember = () => {
  const accessToken = getCookie('accessToken');

  return useQuery({
    queryKey: queryKey.getMember(),
    queryFn: getMember,
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5, // optional: 5분 동안 fresh
  });
};
