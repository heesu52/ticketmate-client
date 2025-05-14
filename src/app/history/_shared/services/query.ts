import { useQuery } from '@tanstack/react-query';

import { getFormList } from './api';
import queryKey from './query-key';
import { GetFormListRequest } from './type';

const useGetFormList = (request?: GetFormListRequest) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKey.getFormList(request),
    queryFn: () => getFormList(request),
  });

  return { data, isLoading, isError };
};

export { useGetFormList };
