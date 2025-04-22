import { useQuery } from '@tanstack/react-query';

import { getConcertDetail } from './api';
import queryKey from './query-key';
import { GetConcertDetailRequest } from './type';

const useGetConcertDetail = (request?: GetConcertDetailRequest) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKey.getConcertDetail(request),
    queryFn: () => getConcertDetail(request),
  });

  return { data, isLoading, isError };
};

export { useGetConcertDetail };
