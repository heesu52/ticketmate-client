import { useQuery } from '@tanstack/react-query';

import {
  getFormDetail,
  getFormDetailByChat,
} from '@/app/concert/form/[id]/_shared/services/api';
import queryKey from '@/app/concert/form/[id]/_shared/services/query-key';
import { GetFormDetailRequest } from '@/app/concert/form/[id]/_shared/services/type';

const useGetFormDetail = (request: GetFormDetailRequest, enabled: boolean) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKey.getFormDetail(request),
    queryFn: () => getFormDetail(request),
    enabled: !!request.applicationFormId && enabled,
  });

  return { data, isLoading, isError };
};

const useGetFormDetailByChat = (
  request: GetFormDetailRequest,
  enabled: boolean,
) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKey.getFormDetailByChat(request),
    queryFn: () => getFormDetailByChat(request),
    enabled: !!request.applicationFormId && enabled,
  });
  return { data, isLoading, isError };
};

export { useGetFormDetail, useGetFormDetailByChat };
