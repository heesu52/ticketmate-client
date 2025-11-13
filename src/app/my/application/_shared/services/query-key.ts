import { GetAcceptingConcertRequest } from '@/app/my/application/_shared/services/type';

const queryKey = {
  getOnOffConcertList: (request?: GetAcceptingConcertRequest) => [
    'getOnOffConcertList',
    request,
  ],

  getAcceptingConcertList: ['getAcceptingConcertList'],
};

export default queryKey;
