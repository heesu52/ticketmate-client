import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';

import {
  GetSearchRequest,
  GetConcertSearchResponse,
  GetAgentSearchResponse,
} from '@/app/@modal/(.)search/_shared/services/type';

import { getSearch, getRecentSearch, deleteRecentSearch } from './api';
import queryKey from './query-key';

const useGetConcertSearchQuery = (
  request: GetSearchRequest,
  options?: { enabled?: boolean },
) => {
  return useInfiniteQuery({
    queryKey: queryKey.getConcertSearchResult(request),
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      getSearch<GetConcertSearchResponse>({
        ...request,
        pageNumber: pageParam,
      }),
    getNextPageParam: (lastPage) => {
      const current = lastPage.searchResults.number;
      const total = lastPage.searchResults.totalPages;
      return current < total - 1 ? current + 1 : undefined;
    },
    select: (data) => ({
      content: data.pages.flatMap((page) => page.searchResults.content),
      pageParams: data.pageParams,
      concertCount: data.pages[0].concertCount,
      agentCount: data.pages[0].agentCount,
    }),
    enabled: options?.enabled ?? true,
  });
};

const useGetAgentSearchQuery = (
  request: GetSearchRequest,
  options?: { enabled?: boolean },
) => {
  return useInfiniteQuery({
    queryKey: queryKey.getAgentSearchResult(request),
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      getSearch<GetAgentSearchResponse>({ ...request, pageNumber: pageParam }),
    getNextPageParam: (lastPage) => {
      const current = lastPage.searchResults.number;
      const total = lastPage.searchResults.totalPages;
      return current < total - 1 ? current + 1 : undefined;
    },
    select: (data) => ({
      content: data.pages.flatMap((page) => page.searchResults.content),
      pageParams: data.pageParams,
      concertCount: data.pages[0].concertCount,
      agentCount: data.pages[0].agentCount,
    }),
    enabled: options?.enabled ?? true,
  });
};

const useRecentSearchQuery = (isLoggedIn: boolean) => {
  return useQuery({
    queryKey: ['recentSearches'],
    queryFn: getRecentSearch,
    enabled: isLoggedIn, //로그인을 안했을 경우 호출x
  });
};

const useDeleteRecentSearchMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecentSearch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recentSearches'] });
    },
  });
};

export {
  useGetConcertSearchQuery,
  useGetAgentSearchQuery,
  useRecentSearchQuery,
  useDeleteRecentSearchMutation,
};
