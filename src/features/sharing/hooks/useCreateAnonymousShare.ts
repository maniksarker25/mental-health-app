import { useMutation } from '@tanstack/react-query';
import { createAnonymousShare } from '../../../services/api/client';
import type { CreateSharePayload, CreateShareResponse } from '../../../types';

export function useCreateAnonymousShare() {
  return useMutation<CreateShareResponse, Error, CreateSharePayload>({
    mutationKey: ['create-anonymous-share'],
    mutationFn: createAnonymousShare,
    retry: 0
  });
}