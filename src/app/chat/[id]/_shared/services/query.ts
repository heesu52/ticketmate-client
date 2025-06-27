import { useQuery } from '@tanstack/react-query';

import { getChatDetail } from './api';
import queryKey from './query-key';
import { GetChatDetailRequest } from './type';

const useGetChatDetail = (request: GetChatDetailRequest) => {
  return useQuery({
    queryKey: queryKey.chatDetail(request.chatRoomId),
    queryFn: () => getChatDetail(request),
  });
};

export default useGetChatDetail;
