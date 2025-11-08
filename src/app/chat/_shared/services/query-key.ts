import { GetChatListRequest } from '@/app/chat/_shared/services/type';

const queryKey = {
  chatList: (request?: GetChatListRequest) =>
    request ? ['chatList', request] : ['chatList'],
};

export default queryKey;
