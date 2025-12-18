import {
  GetSearchRequest,
  GetConcertSearchResponse,
  GetAgentSearchResponse,
  GetRecentSearchResponse,
} from '@/app/search/_shared/services/type';
import httpClient from '@/lib/http-client/http-client';

const BASE_URL = 'search';

/**
 * @description 검색 api
 */

const getSearch = async <
  T extends GetConcertSearchResponse | GetAgentSearchResponse,
>(
  request?: GetSearchRequest,
): Promise<T> => {
  const data = await httpClient<T>({
    method: 'get',
    url: `${BASE_URL}`,
    options: {
      searchParams: { ...request },
    },
  });

  return data;
};

/**
 * @description 최근검색 api
 */

const getRecentSearch = async () => {
  const data = await httpClient<GetRecentSearchResponse>({
    method: 'get',
    url: `${BASE_URL}/recent`,
  });
  return data;
};

/**
 * @description 최근검색어 삭제 api
 */

const deleteRecentSearch = async () => {
  const data = await httpClient({
    method: 'delete',
    url: `${BASE_URL}/recent`,
  });
  return data;
};

export { getSearch, getRecentSearch, deleteRecentSearch };
