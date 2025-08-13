import { GetFormListRequest } from './type';

const queryKey = {
  getFormList: (request?: GetFormListRequest) => ['getFormList', request],
  getRejectionReason: (applicationFormId: string) => [
    'getRejectReason',
    applicationFormId,
  ],
};

export default queryKey;
