import { useQuery } from '@tanstack/react-query';

import { getMember } from './api';
import queryKey from './query-key';

export const useGetMember = () => {
  return useQuery({
    queryKey: queryKey.getMember(),
    queryFn: getMember,
    enabled: false,
    staleTime: 1000 * 60 * 5, // optional: 5분 동안 fresh
  });
};
