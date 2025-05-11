import { useQuery } from '@tanstack/react-query';

import { getFormList } from './api';
import queryKey from './query-key';
import { GetFormListRequest } from './type';

export const useGetFormList = (request?: GetFormListRequest) => {
  const applicationFormId = request?.applicationFormId;

  const { data, isLoading, isError } = useQuery({
    queryKey: queryKey.getFormList(request),
    queryFn: () => getFormList(request),
    enabled: !!applicationFormId,
  });

  return { data, isLoading, isError };
};
