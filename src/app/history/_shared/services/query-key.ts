import { GetFormListRequest } from './type';

const queryKey = {
  getFormList: (request?: GetFormListRequest) =>
    request ? ['getFormList', request] : ['getFormList'],
  getRejectionReason: (applicationFormId: string) => [
    'getRejectReason',
    applicationFormId,
  ],
};

export default queryKey;
