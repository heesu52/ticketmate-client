import { useInfiniteQuery } from '@tanstack/react-query';

import { getConcertList } from '@/app/_shared/services/api';
import queryKey from '@/app/_shared/services/query-key';
import { GetConcertListRequest } from '@/app/_shared/services/type';

export const useGetConcertList = (request?: GetConcertListRequest) => {
  return useInfiniteQuery({
    queryKey: queryKey.getConcertList(request),
    queryFn: ({ pageParam = 1 }) =>
      getConcertList({ ...request, pageNumber: pageParam }),
    getNextPageParam: (pageData) => {
      const current = pageData.number;
      const total = pageData.totalPages;

      return current < total - 1 ? current + 1 : undefined;
    },
    initialPageParam: request?.pageNumber,
    select: (data) => ({
      content: data?.pages.flatMap((page) => page.content),
      pageParams: data.pageParams,
    }),
    placeholderData: (data) => data,
  });
};
