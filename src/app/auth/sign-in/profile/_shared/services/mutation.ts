import { useMutation } from '@tanstack/react-query';

import { HttpClientError } from '@/lib/http-client/http-client.type';

import { patchMember } from './api';
import { PatchMemberRequest } from './type';

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (request: PatchMemberRequest) => patchMember(request),
    onError: (error: HttpClientError) => {
      return error;
    },
  });
};
