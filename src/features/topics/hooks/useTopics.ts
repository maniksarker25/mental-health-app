import { useQuery } from '@tanstack/react-query';
import { fetchTopic, fetchTopics } from '../../../services/api/client';
import { queryKeys } from '../../../services/api/endpoints';

export function useTopics() {
  return useQuery({
    queryKey: queryKeys.topics,
    queryFn: fetchTopics,
    staleTime: 5 * 60 * 1000,
    retry: 1
  });
}

export function useTopic(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.topic(id ?? 'unknown'),
    queryFn: () => fetchTopic(id as string),
    enabled: Boolean(id),
    retry: 1
  });
}