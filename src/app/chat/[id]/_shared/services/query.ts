import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getChatMessageList, getChatRoomInfo } from './api';
import queryKey from './query-key';
import { GetChatMessageListRequest, GetChatRoomInfoRequest } from './type';

export const useGetChatMessageList = (request: GetChatMessageListRequest) => {
  return useInfiniteQuery({
    queryKey: queryKey.chatMessageList(request),
    queryFn: ({ pageParam = 1 }) =>
      getChatMessageList({
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

export const useGetChatRoomInfo = (request: GetChatRoomInfoRequest) => {
  return useQuery({
    queryKey: queryKey.chatRoomInfo(request),
    queryFn: () => getChatRoomInfo(request),
  });
};
