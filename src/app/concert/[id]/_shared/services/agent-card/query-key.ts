import { GetAgentListRequest } from '@/app/concert/[id]/_shared/services/agent-card/type';

const queryKey = {
  getAgentList: (request?: GetAgentListRequest) => ['getAgentList', request],
};

export default queryKey;
