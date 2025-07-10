import { GetFormListRequest, PutFormRequest } from './type';

const queryKey = {
  getFormList: (request?: GetFormListRequest) => ['getFormList', request],
  getRejectionReason: (request?: PutFormRequest) => [
    'getRejectReason',
    request,
  ],
};

export default queryKey;
