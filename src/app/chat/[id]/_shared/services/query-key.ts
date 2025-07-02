import { GetChatDetailRequest } from '@/app/chat/[id]/_shared/services/type';

const queryKey = {
  chatDetail: (request: GetChatDetailRequest) =>
    request?.parameter
      ? ['chat', request.chatRoomId, request.parameter]
      : ['chat', request.chatRoomId],
};

export default queryKey;
