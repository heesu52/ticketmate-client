import { useMutation } from '@tanstack/react-query';

import {
  postFulfillmentForm,
  patchFulfillmentFormUpdate,
  patchFulfillmentFormReject,
  patchFulfillmentFormAccept,
} from './api';
import {
  PostFulfillmentFormRequest,
  PatchFulfillmentFormUpdateRequest,
  PatchFulfillmentFormRejectResponse,
  PatchFulfillmentFormAcceptRequest,
} from './type';

/**
 * 성공양식 전송 mutation
 * @returns 성공양식 전송 mutation hook
 */
export const usePostFulfillmentForm = () => {
  return useMutation({
    mutationFn: (request: PostFulfillmentFormRequest) =>
      postFulfillmentForm(request),
  });
};

/**
 * 성공양식 수정 mutation
 * @returns 성공양식 수정 mutation hook
 */
export const usePatchFulfillmentFormUpdate = () => {
  return useMutation({
    mutationFn: (request: PatchFulfillmentFormUpdateRequest) =>
      patchFulfillmentFormUpdate(request),
  });
};

/**
 * 성공양식 거절 mutation
 * @returns 성공양식 거절 mutation hook
 */
export const usePatchFulfillmentFormReject = () => {
  return useMutation({
    mutationFn: (request: PatchFulfillmentFormRejectResponse) =>
      patchFulfillmentFormReject(request),
  });
};

/**
 * 성공양식 수락 mutation
 * @returns 성공양식 수락 mutation hook
 */
export const usePatchFulfillmentFormAccept = () => {
  return useMutation({
    mutationFn: (request: PatchFulfillmentFormAcceptRequest) =>
      patchFulfillmentFormAccept(request),
  });
};
