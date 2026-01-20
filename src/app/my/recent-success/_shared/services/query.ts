import { useQuery } from '@tanstack/react-query';

import { getRecentSuccessList } from '@/app/my/recent-success/_shared/services/api';
import queryKey from '@/app/my/recent-success/_shared/services/query-key';

/**
 * @description 최근 신청 성공내역 리스트 조회
 */
const useGetRecentSuccessList = (agentId: string) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: queryKey.getRecentSuccessList(agentId),
    queryFn: () => getRecentSuccessList(agentId),
  });

  return { data, isLoading, isError, refetch };
};
export { useGetRecentSuccessList };
