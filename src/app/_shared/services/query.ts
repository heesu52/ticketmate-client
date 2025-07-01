import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getConcertList, getMember } from '@/app/_shared/services/api';
import queryKey from '@/app/_shared/services/query-key';
import { GetConcertListRequest } from '@/app/_shared/services/type';

export const useGetConcertList = (request?: GetConcertListRequest) => {
  return useInfiniteQuery({
    queryKey: queryKey.getConcertList(request),
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
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

export const useGetMember = () => {
  return useQuery({
    queryKey: queryKey.getMember(),
    queryFn: getMember,
    staleTime: 1000 * 60 * 5, // optional: 5분 동안 fresh
  });
};
