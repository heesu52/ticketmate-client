import { useMutation, useQueryClient } from '@tanstack/react-query';

import queryKey from '@/app/history/_shared/services/query-key';
import { customToast } from '@/shared/components/toast/custom-toast/custom-toast';

import { patchFormApprove, patchFormCancel, patchFormReject } from './api';
import { PutFormRequest } from './type';

export const usePutFormApprove = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (applicationFormId: string) =>
      patchFormApprove(applicationFormId),
    onSuccess: () => {
      customToast({
        description: '요청수락이 완료되었습니다.',
      });
      queryClient.invalidateQueries({
        queryKey: queryKey.getFormList(),
      });
    },
    onError: () => {
      customToast({
        description: '요청수락 중 오류가 발생했습니다.',
      });
    },
  });
};
export const usePutFormReject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: PutFormRequest) => patchFormReject(request),
    onSuccess: () => {
      customToast({
        description: '요청거절이 완료되었습니다.',
      });
      queryClient.invalidateQueries({
        queryKey: queryKey.getFormList(),
      });
    },
    onError: () => {
      customToast({
        description: '요청거절 중 오류가 발생했습니다.',
      });
    },
  });
};

export const usePutFormCancel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (applicationFormId: string) =>
      patchFormCancel(applicationFormId),
    onSuccess: () => {
      customToast({
        description: '취소가 완료되었습니다.',
      });
      queryClient.invalidateQueries({
        queryKey: queryKey.getFormList(),
      });
    },
    onError: () => {
      customToast({
        description: '취소 중 오류가 발생했습니다.',
      });
    },
  });
};
