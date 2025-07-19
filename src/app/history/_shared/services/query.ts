import { useQuery } from '@tanstack/react-query';

import { getFormList, getRejectionReason } from './api';
import queryKey from './query-key';
import { GetFormListRequest, PutFormRequest } from './type';

const useGetFormList = (request?: GetFormListRequest) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKey.getFormList(request),
    queryFn: () => getFormList(request),
  });

  return { data, isLoading, isError };
};

const useGetRejectedReason = (request: PutFormRequest) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKey.getRejectionReason(request),
    queryFn: () => getRejectionReason(request),
  });

  return { data, isLoading, isError };
};

export { useGetFormList, useGetRejectedReason };
