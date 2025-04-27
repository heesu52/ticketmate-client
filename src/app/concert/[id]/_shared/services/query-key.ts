import { GetConcertDetailRequest } from '@/app/concert/[id]/_shared/services/type';

const queryKey = {
  getConcertDetail: (request?: GetConcertDetailRequest) => [
    'getConcertDetail',
    request,
  ],
};

export default queryKey;
