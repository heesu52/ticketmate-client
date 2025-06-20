import { GetFormDetailRequest } from './type';

const queryKey = {
  getFormDetail: (request?: GetFormDetailRequest) => ['getFormDetail', request],
};

export default queryKey;
