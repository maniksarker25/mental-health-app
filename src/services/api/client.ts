import { topics } from '../../data/topics';
import type { CreateSharePayload, CreateShareResponse, Topic } from '../../types';

/**
 * Mock transport layer. Every screen talks to these functions through query
 * hooks, so swapping this file for real HTTP calls requires no UI changes.
 */

const LATENCY = 650;

export class ApiError extends Error {
  readonly code: 'NETWORK' | 'NOT_FOUND' | 'SERVER';

  constructor(code: ApiError['code'], message: string) {
    super(message);
    this.code = code;
  }
}

function delay<T>(value: T, ms = LATENCY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function fetchTopics(): Promise<Topic[]> {
  return delay(topics);
}

export async function fetchTopic(id: string): Promise<Topic> {
  const topic = topics.find((item) => item.id === id);
  if (!topic) {
    throw new ApiError('NOT_FOUND', 'This topic is no longer available.');
  }
  return delay(topic, 350);
}

export async function createAnonymousShare(
payload: CreateSharePayload)
: Promise<CreateShareResponse> {
  await delay(null, 1900);
  // Deterministic failure hook so the failure path stays testable.
  if (payload.recipient.includes('fail')) {
    throw new ApiError('SERVER', 'We couldn’t send the resource right now.');
  }
  return {
    success: true,
    shareId: `share_${Math.random().toString(36).slice(2, 10)}`,
    status: 'SENT'
  };
}