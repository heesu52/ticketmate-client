import { useInfiniteQuery } from '@tanstack/react-query';

import { getChatDetail } from './api';
import queryKey from './query-key';
import { GetChatDetailRequest } from './type';

const useGetChatDetail = (request: GetChatDetailRequest) => {
  return useInfiniteQuery({
    queryKey: queryKey.chatDetail(request.chatRoomId),
    queryFn: () => getChatDetail(request),
    initialPageParam: 1,
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

export default useGetChatDetail;
