import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import {
  getOnOffConcert,
  getAcceptingConcert,
} from '@/app/my/application/_shared/services/api';
import queryKey from '@/app/my/application/_shared/services/query-key';
import { GetAcceptingConcertRequest } from '@/app/my/application/_shared/services/type';

/**
 * @description 대리인 on/off 설정을 위한 전체 공연 목록 조회
 */
const useGetOnOffConcertList = (request?: GetAcceptingConcertRequest) => {
  return useInfiniteQuery({
    queryKey: queryKey.getOnOffConcertList(request),
    initialPageParam: request?.pageNumber ?? 1,
    queryFn: ({ pageParam = 1 }) =>
      getOnOffConcert({ ...request, pageNumber: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.last ? undefined : (lastPage.number ?? 0) + 1,
    select: (data) => ({
      content: data.pages.flatMap((page) => page.content),
      pageParams: data.pageParams,
    }),
    placeholderData: (data) => data,
  });
};

/**
 * @description 대리인 on 설정된 모집 중 공연 목록 조회
 */

const useGetAcceptingConcertList = (request: GetAcceptingConcertRequest) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: queryKey.getAcceptingConcertList(request),
    queryFn: () => getAcceptingConcert(request),
  });

  return { data, isLoading, isError, refetch };
};

export { useGetOnOffConcertList, useGetAcceptingConcertList };
