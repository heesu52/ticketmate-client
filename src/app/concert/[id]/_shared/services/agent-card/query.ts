import { useInfiniteQuery } from '@tanstack/react-query';

import { getAgentList } from '@/app/concert/[id]/_shared/services/agent-card/api';
import queryKey from '@/app/concert/[id]/_shared/services/agent-card/query-key';
import { GetAgentListRequest } from '@/app/concert/[id]/_shared/services/agent-card/type';

export const useGetAgentList = (request: GetAgentListRequest) => {
  return useInfiniteQuery({
    queryKey: queryKey.getAgentList(request),
    initialPageParam: request?.pageNumber,
    queryFn: ({ pageParam = request?.pageNumber }) =>
      getAgentList({ ...request, pageNumber: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const current = lastPage.number; // 현재 페이지
      const total = lastPage.totalPages; // 총 페이지

      return current < total - 1 ? allPages.length + 1 : undefined;
    },
    select: (data) => ({
      content: data?.pages.flatMap((page) => page.content),
      pageParams: data.pageParams,
    }),
    placeholderData: (data) => data,
  });
};
