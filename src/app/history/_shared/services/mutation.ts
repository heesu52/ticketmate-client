import { useMutation } from '@tanstack/react-query';

import { putFormApprove, putFormCancel, putFormReject } from './api';
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

export const usePutFormCancel = () => {
  return useMutation({
    mutationFn: (request: PutFormRequest) => putFormCancel(request),
  });
};
