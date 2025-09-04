import {
  GetSearchRequest,
  GetConcertSearchResponse,
  GetAgentSearchResponse,
  GetRecentSearchResponse,
} from '@/app/@modal/(.)search/_shared/services/type';
import instance from '@/shared/services/instance';
import { createQueryParams } from '@/shared/utils/services/query-string';

const BASE_URL = '/search';

/**
 * @description 검색 api
 */
const getSearch = async <
  T extends GetConcertSearchResponse | GetAgentSearchResponse,
>(
  request?: GetSearchRequest,
): Promise<T> => {
  const query = request
    ? `?${createQueryParams(request as unknown as Record<string, unknown>)}`
    : '';

  const data = await instance<T>(`${BASE_URL}${query}`, {
    method: 'GET',
  });

  return data;
};

const getRecentSearch = async () => {
  const data = await instance<GetRecentSearchResponse>(`${BASE_URL}/recent`, {
    method: 'GET',
  });
  return data;
};

const deleteRecentSearch = async () => {
  const data = await instance(`${BASE_URL}/recent`, {
    method: 'DELETE',
  });
  return data;
};

export { getSearch, getRecentSearch, deleteRecentSearch };
