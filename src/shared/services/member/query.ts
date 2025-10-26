import { useQuery } from '@tanstack/react-query';

import { getMember } from '@/shared/services/member/api';
import queryKey from '@/shared/services/member/query-key';

export const useGetMember = (enabled: boolean = true) => {
  return useQuery({
    queryKey: queryKey.getMember(),
    queryFn: getMember,
    enabled,
  });
};
