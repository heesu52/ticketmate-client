import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  GetSearchRequest,
  GetConcertSearchResponse,
  GetAgentSearchResponse,
} from '@/app/@modal/(.)search/_shared/services/type';

import { getSearch, getRecentSearch, deleteRecentSearch } from './api'; // 작성하신 경로에 맞춰 import

export const useSearchQuery = <
  T extends GetConcertSearchResponse | GetAgentSearchResponse,
>(
  request?: GetSearchRequest,
  enabled = true, // 필요할 때만 실행
) => {
  return useQuery({
    queryKey: ['search', request],
    queryFn: () => getSearch<T>(request),
    enabled,
  });
};

export const useRecentSearchQuery = () => {
  return useQuery({
    queryKey: ['recentSearches'],
    queryFn: getRecentSearch,
    staleTime: 1000 * 60 * 5, // 5분 캐시
  });
};

export const useDeleteRecentSearchMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecentSearch,
    onSuccess: () => {
      // 삭제 후 최근 검색어 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['recentSearches'] });
    },
  });
};
