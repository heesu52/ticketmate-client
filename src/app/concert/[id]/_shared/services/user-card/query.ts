import { useInfiniteQuery } from '@tanstack/react-query';

import { getUserList } from '@/app/concert/[id]/_shared/services/user-card/api';
import queryKey from '@/app/concert/[id]/_shared/services/user-card/query-key';
import {
  GetUserListRequest,
  GetUserListResponse,
} from '@/app/concert/[id]/_shared/services/user-card/type';

interface InfiniteUserListRequest
  extends Omit<GetUserListRequest, 'pageNumber' | 'pageSize'> {
  pageSize?: number;
}

export const useGetUserListInfinite = (request: InfiniteUserListRequest) => {
  const pageSize = request.pageSize ?? 10;

  return useInfiniteQuery<GetUserListResponse>({
    queryKey: [...queryKey.getUserList(request), pageSize],
    queryFn: (context) => {
      const pageParam =
        typeof context.pageParam === 'number' && context.pageParam > 0
          ? context.pageParam
          : 1;

      return getUserList({
        ...request,
        pageNumber: pageParam,
        pageSize,
      });
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.last ? undefined : allPages.length + 1,
    enabled: !!request.concertId,
    initialPageParam: 1,
  });
};
