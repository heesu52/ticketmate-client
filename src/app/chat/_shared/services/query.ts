import { useInfiniteQuery } from '@tanstack/react-query';

import { getChatList } from '@/app/chat/_shared/services/api';

import queryKey from './query-key';
import { GetChatListRequest } from './type';

export const useChatList = (request: GetChatListRequest) => {
  return useInfiniteQuery({
    queryKey: queryKey.chatList(request),
    queryFn: ({ pageParam = 1 }) =>
      getChatList({ ...request, pageNumber: pageParam }),

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
