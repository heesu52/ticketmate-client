import { useMutation } from '@tanstack/react-query';

import { patchFormApprove, patchFormCancel, patchFormReject } from './api';
import { PutFormRequest } from './type';

export const usePutFormApprove = () => {
  return useMutation({
    mutationFn: (request: PutFormRequest) => patchFormApprove(request),
  });
};

export const usePutFormReject = () => {
  return useMutation({
    mutationFn: (request: PutFormRequest) => patchFormReject(request),
  });
};

export const usePutFormCancel = () => {
  return useMutation({
    mutationFn: (request: PutFormRequest) => patchFormCancel(request),
  });
};
