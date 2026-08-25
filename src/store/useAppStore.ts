import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { HistoryEntry } from '../types';

interface AppState {
  onboardingComplete: boolean;
  notificationsEnabled: boolean;
  history: HistoryEntry[];
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  addHistoryEntry: (entry: HistoryEntry) => void;
  clearHistory: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      onboardingComplete: false,
      notificationsEnabled: true,
      history: [],
      completeOnboarding: () => set({ onboardingComplete: true }),
      resetOnboarding: () => set({ onboardingComplete: false }),
      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
      addHistoryEntry: (entry) =>
      set((state) => ({ history: [entry, ...state.history].slice(0, 50) })),
      clearHistory: () => set({ history: [] })
    }),
    { name: 'mha-app-state' }
  )
);