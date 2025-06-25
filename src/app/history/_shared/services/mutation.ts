import { useMutation } from '@tanstack/react-query';

import { putFormApprove, putFormReject } from './api';
import { PutFormRequest } from './type';

export const usePutFormApprove = () => {
  return useMutation({
    mutationFn: (request: PutFormRequest) => putFormApprove(request),
  });
};

export const usePutFormReject = () => {
  return useMutation({
    mutationFn: (request: PutFormRequest) => putFormReject(request),
  });
};
