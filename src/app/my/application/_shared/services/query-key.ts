import { GetAcceptingConcertRequest } from '@/app/my/application/_shared/services/type';

const queryKey = {
  getOnOffConcertList: (request?: GetAcceptingConcertRequest) => [
    'getOnOffConcertList',
    request,
  ],

  getAcceptingConcertList: (request?: GetAcceptingConcertRequest) => [
    'getAcceptingConcertList',
    request,
  ],
};

export default queryKey;
