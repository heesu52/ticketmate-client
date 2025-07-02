import { useQueryClient } from '@tanstack/react-query';

import queryKey from '@/app/_shared/services/query-key';
import { GetMemberResponse } from '@/app/_shared/services/type';

export const useMember = (): GetMemberResponse | undefined => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(queryKey.getMember());
};
