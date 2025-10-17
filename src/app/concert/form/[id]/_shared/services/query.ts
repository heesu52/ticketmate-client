import { useQuery } from '@tanstack/react-query';

import { getFormDetail } from './api';
import queryKey from './query-key';
import { GetFormDetailRequest } from './type';

const useGetFormDetail = (request: GetFormDetailRequest) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKey.getFormDetail(request),
    queryFn: () => getFormDetail(request!),
    enabled: !!request.applicationFormId,
  });

  return { data, isLoading, isError };
};

export { useGetFormDetail };
