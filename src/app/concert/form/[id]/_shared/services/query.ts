import { useQuery } from '@tanstack/react-query';

import { getFormDetail } from '@/app/concert/form/[id]/_shared/services/api';
import queryKey from '@/app/concert/form/[id]/_shared/services/query-key';
import { GetFormDetailRequest } from '@/app/concert/form/[id]/_shared/services/type';

const useGetFormDetail = (request: GetFormDetailRequest) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKey.getFormDetail(request),
    queryFn: () => getFormDetail(request),
    enabled: !!request.applicationFormId,
  });

  return { data, isLoading, isError };
};

export { useGetFormDetail };
