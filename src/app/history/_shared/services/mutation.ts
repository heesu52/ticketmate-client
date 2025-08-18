import { usePatchForm } from '@/app/history/_shared/hooks/usePatchForm';

import { patchFormApprove, patchFormCancel, patchFormReject } from './api';
import { PatchFormRequest } from './type';

export const usePatchFormApprove = () =>
  usePatchForm<string>({
    mutationFn: (applicationFormId) => patchFormApprove(applicationFormId),
    successMessage: '요청수락이 완료되었습니다.',
    errorMessage: '요청수락 중 오류가 발생했습니다.',
  });

export const usePatchFormReject = () =>
  usePatchForm<PatchFormRequest>({
    mutationFn: (request) => patchFormReject(request),
    successMessage: '요청거절이 완료되었습니다.',
    errorMessage: '요청거절 중 오류가 발생했습니다.',
  });

export const usePatchFormCancel = () =>
  usePatchForm<string>({
    mutationFn: (applicationFormId) => patchFormCancel(applicationFormId),
    successMessage: '취소가 완료되었습니다.',
    errorMessage: '취소 중 오류가 발생했습니다.',
  });
