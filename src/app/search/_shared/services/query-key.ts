import { GetSearchRequest } from './type';

const queryKey = {
  getConcertSearchResult: (request?: GetSearchRequest) =>
    request ? ['concertSearch', request] : ['concertSearch'],

  getAgentSearchResult: (request?: GetSearchRequest) =>
    request ? ['agentSearch', request] : ['agentSearch'],

  getRecentSearches: () => ['recentSearches'],
};

export default queryKey;
