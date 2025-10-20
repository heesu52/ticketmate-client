import { useQuery } from '@tanstack/react-query';

import { getConcertDetail } from './api';
import queryKey from './query-key';
import { GetConcertDetailRequest } from './type';

export const useGetConcertDetail = (request: GetConcertDetailRequest) => {
  const concertId = request.concertId;

  const { data, isLoading, isError } = useQuery({
    queryKey: queryKey.getConcertDetail(request),
    queryFn: () => getConcertDetail(request),
    enabled: !!concertId,
  });

  return { data, isLoading, isError };
};
