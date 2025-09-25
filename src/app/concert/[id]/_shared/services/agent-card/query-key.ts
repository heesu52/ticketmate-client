import { GetAgentListRequest } from './type';

const queryKey = {
  getAgentList: (request?: GetAgentListRequest) => ['getAgentList', request],
};

export default queryKey;
