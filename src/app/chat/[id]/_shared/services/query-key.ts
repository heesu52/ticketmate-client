import { GetChatDetailRequest } from '@/app/chat/[id]/_shared/services/type';

const queryKey = {
  chatDetail: (request?: GetChatDetailRequest) => ['chat'],
};

export default queryKey;
