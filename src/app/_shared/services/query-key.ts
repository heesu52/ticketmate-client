import { GetConcertListRequest } from '@/app/_shared/services/type';

const queryKey = {
  getConcertList: (request?: GetConcertListRequest) => [
    'getConcertList',
    request,
  ],
  getMember: () => ['getMember'] as const,
};

export default queryKey;
