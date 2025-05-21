import { GetFormListRequest } from './type';

const queryKey = {
  getFormList: (request?: GetFormListRequest) => ['getFormList', request],
};

export default queryKey;
