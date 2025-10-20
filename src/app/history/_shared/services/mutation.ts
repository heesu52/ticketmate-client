import { usePatchForm } from '@/app/history/_shared/hooks/usePatchForm';

import { patchFormApprove, patchFormCancel, patchFormReject } from './api';
import { PatchFormRequest } from './type';

export const usePatchFormApproveMutation = () =>
  usePatchForm<string>({
    mutationFn: (applicationFormId) => patchFormApprove(applicationFormId),
  });

export const usePatchFormRejectMutation = () =>
  usePatchForm<PatchFormRequest>({
    mutationFn: (request) => patchFormReject(request),
  });

export const usePatchFormCancelMutation = () =>
  usePatchForm<string>({
    mutationFn: (applicationFormId) => patchFormCancel(applicationFormId),
  });
