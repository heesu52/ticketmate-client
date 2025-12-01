import { useQuery } from '@tanstack/react-query';

import { getFulfillmentForm } from './api';
import queryKey from './query-key';
import { GetFulfillmentFormRequest } from './type';

/**
 * 성공양식 조회
 * @param request 성공양식 조회 요청 파라미터
 * @returns 성공양식 조회 query
 */
export const useGetFulfillmentForm = (request: GetFulfillmentFormRequest) => {
  return useQuery({
    queryKey: queryKey.fulfillmentForm(request),
    queryFn: () => getFulfillmentForm(request),
    enabled: !!request.fulfillmentFormId,
  });
};
