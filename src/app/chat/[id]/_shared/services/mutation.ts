import { useMutation, useQueryClient } from '@tanstack/react-query';

import queryKey from '@/app/chat/[id]/_shared/services/query-key';

import { patchCancelProgress, sendChatMessageImage } from './api';
import {
  PatchCancelProgressRequest,
  SendChatImageMessageRequest,
} from './type';

export const useSendChatMessageImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: SendChatImageMessageRequest) =>
      sendChatMessageImage(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.chatMessageList() });
    },
  });
};

export const usePatchCancelProgress = () => {
  return useMutation({
    mutationFn: (request: PatchCancelProgressRequest) =>
      patchCancelProgress(request),
  });
};
