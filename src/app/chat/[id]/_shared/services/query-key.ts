import {
  GetChatMessageListRequest,
  GetChatRoomInfoRequest,
} from '@/app/chat/[id]/_shared/services/type';

const queryKey = {
  chatMessageList: (request?: GetChatMessageListRequest) => [
    'chatMessageList',
    request,
  ],
  chatRoomInfo: (request?: GetChatRoomInfoRequest) => ['chatRoomInfo', request],
};

export default queryKey;
