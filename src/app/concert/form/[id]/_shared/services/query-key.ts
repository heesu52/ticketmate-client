import { GetFormDetailRequest } from './type';

const queryKey = {
  getFormDetail: (request?: GetFormDetailRequest) => [
    'getFormDetail',
    request?.applicationFormId,
  ],
};

export default queryKey;
