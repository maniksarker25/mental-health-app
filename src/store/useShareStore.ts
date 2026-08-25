import { create } from 'zustand';
import type { DeliveryMethod, Recipient, Topic } from '../types';
import { maskEmail, maskPhone } from '../utils/mask';

interface ShareState {
  selectedTopic: Topic | null;
  recipient: Recipient | null;
  message: string;
  setSelectedTopic: (topic: Topic) => void;
  setRecipient: (recipient: Recipient) => void;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  setMessage: (message: string) => void;
  resetShareFlow: () => void;
}

export const useShareStore = create<ShareState>((set) => ({
  selectedTopic: null,
  recipient: null,
  message: '',
  setSelectedTopic: (topic) => set({ selectedTopic: topic }),
  setRecipient: (recipient) => set({ recipient }),
  setDeliveryMethod: (method) =>
  set((state) => ({
    recipient: state.recipient ?
    { ...state.recipient, method } :
    { method }
  })),
  setMessage: (message) => set({ message }),
  resetShareFlow: () => set({ selectedTopic: null, recipient: null, message: '' })
}));

export function getRecipientRaw(recipient: Recipient): string {
  if (recipient.method === 'EMAIL') return recipient.email ?? '';
  return `${recipient.countryCode ?? ''}${(recipient.phone ?? '').replace(/\D/g, '')}`;
}

export function getRecipientMasked(recipient: Recipient): string {
  if (recipient.method === 'EMAIL') return maskEmail(recipient.email ?? '');
  return maskPhone(recipient.countryCode ?? '', recipient.phone ?? '');
}