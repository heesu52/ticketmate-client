import { useInfiniteQuery } from '@tanstack/react-query';

import { getChatDetail } from './api';
import queryKey from './query-key';
import { GetChatDetailRequest } from './type';

const useGetChatDetail = (request: GetChatDetailRequest) => {
  return useInfiniteQuery({
    queryKey: queryKey.chatDetail(request),
    queryFn: ({ pageParam = 1 }) =>
      getChatDetail({
        ...request,
        parameter: { ...request.parameter, pageNumber: pageParam },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // last가 true이면 마지막 페이지이므로 다음 페이지가 없음
      return lastPage.last ? undefined : allPages.length + 1;
    },
    select: (data) => ({
      content: data?.pages.flatMap((page) => page.content),
      pageParams: data.pageParams,
    }),
    placeholderData: (data) => data,
  });
};

export default useGetChatDetail;
