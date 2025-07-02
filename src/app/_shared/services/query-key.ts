import { GetConcertListRequest } from '@/app/_shared/services/type';

const queryKey = {
  getConcertList: (request?: GetConcertListRequest) => [
    'getConcertList',
    request,
  ],
};

export default queryKey;
