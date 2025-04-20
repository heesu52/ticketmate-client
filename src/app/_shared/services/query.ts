import { useQuery } from '@tanstack/react-query';

import { getConcertList } from '@/app/_shared/services/api';
import queryKey from '@/app/_shared/services/query-key';
import { GetConcertListRequest } from '@/app/_shared/services/type';

const useGetConcertList = (request?: GetConcertListRequest) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKey.getConcertList(request),
    queryFn: () => getConcertList(request),
  });

  return { data, isLoading, isError };
};

export { useGetConcertList };
