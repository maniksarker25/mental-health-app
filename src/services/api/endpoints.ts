const BASE_URL = 'https://api.mentalhealthanonymous.example';

export const endpoints = {
  topics: () => `${BASE_URL}/topics`,
  topic: (id: string) => `${BASE_URL}/topics/${id}`,
  createShare: () => `${BASE_URL}/anonymous-shares`,
  shareStatus: (id: string) => `${BASE_URL}/anonymous-shares/${id}/status`
};

export const queryKeys = {
  topics: ['topics'] as const,
  topic: (id: string) => ['topics', id] as const,
  shareStatus: (id: string) => ['anonymous-shares', id, 'status'] as const
};