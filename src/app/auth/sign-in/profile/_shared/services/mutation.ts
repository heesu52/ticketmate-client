import { useMutation } from '@tanstack/react-query';

import { HttpClientError } from '@/lib/http-client/http-client.type';

import { postMember } from './api';
import { PostMemberRequest } from './type';

export const usePostMember = () => {
  return useMutation({
    mutationFn: (request: PostMemberRequest) => postMember(request),
    onError: (error: HttpClientError) => {
      return error;
    },
  });
};
