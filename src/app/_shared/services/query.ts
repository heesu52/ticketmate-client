import { useInfiniteQuery } from '@tanstack/react-query';

import { getConcertList } from '@/app/_shared/services/api';
import queryKey from '@/app/_shared/services/query-key';
import { GetConcertListRequest } from '@/app/_shared/services/type';

export const useGetConcertList = (request?: GetConcertListRequest) => {
  return useInfiniteQuery({
    queryKey: queryKey.getConcertList(request),
    initialPageParam: request?.pageNumber,
    queryFn: ({ pageParam = request?.pageNumber }) =>
      getConcertList({ ...request, pageNumber: pageParam }),
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
