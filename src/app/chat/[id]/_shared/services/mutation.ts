import { useMutation, useQueryClient } from '@tanstack/react-query';

import queryKey from '@/app/chat/[id]/_shared/services/query-key';

import { sendChatMessageImage } from './api';
import { SendChatImageMessageRequest } from './type';

export const useSendChatMessageImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: SendChatImageMessageRequest) =>
      sendChatMessageImage(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.chatDetail() });
    },
  });
};
