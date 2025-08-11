import { useQuery } from '@tanstack/react-query';

import { getFormList, getRejectionReason } from './api';
import queryKey from './query-key';
import { GetFormListRequest } from './type';

const useGetFormList = (request?: GetFormListRequest) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKey.getFormList(request),
    queryFn: () => getFormList(request),
  });

  return { data, isLoading, isError };
};

const useGetRejectedReason = (applicationFormId: string, enabled: boolean) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKey.getRejectionReason(applicationFormId),
    queryFn: () => getRejectionReason(applicationFormId),
    enabled,
  });

  return { data, isLoading, isError };
};

export { useGetFormList, useGetRejectedReason };
