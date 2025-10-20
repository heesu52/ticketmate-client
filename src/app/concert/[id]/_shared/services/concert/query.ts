import { useQuery } from '@tanstack/react-query';

import { getConcertDetail } from '@/app/concert/[id]/_shared/services/concert/api';
import queryKey from '@/app/concert/[id]/_shared/services/concert/query-key';
import { GetConcertDetailRequest } from '@/app/concert/[id]/_shared/services/concert/type';

export const useGetConcertDetail = (request: GetConcertDetailRequest) => {
  const concertId = request.concertId;

  const { data, isLoading, isError } = useQuery({
    queryKey: queryKey.getConcertDetail(request),
    queryFn: () => getConcertDetail(request),
    enabled: !!concertId,
  });

  return { data, isLoading, isError };
};
