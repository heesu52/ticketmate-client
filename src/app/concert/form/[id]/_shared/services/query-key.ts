import { GetFormDetailRequest } from '@/app/concert/form/[id]/_shared/services/type';

const queryKey = {
  getFormDetail: (request?: GetFormDetailRequest) => [
    'getFormDetail',
    request?.applicationFormId,
  ],
};

export default queryKey;
