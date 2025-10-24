import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchMember } from './api';
import queryKey from './query-key';
import { PatchMemberRequest } from './type';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: PatchMemberRequest) => patchMember(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.getMember() });
    },
    onError: (error) => {
      return error;
    },
  });
};
