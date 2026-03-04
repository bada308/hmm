'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Level, Phase, PracticeStore, Sentence } from './types';

export const usePracticeStore = create<PracticeStore>()(
  persist(
    (set) => ({
      currentLevel: 1,
      currentIndex: 0,
      phase: 'reading' as Phase,
      userInput: '',
      completedIds: [],
      snackbar: { message: '', visible: false },

      setLevel: (level: Level) => {
        set({ currentLevel: level, currentIndex: 0, phase: 'reading', userInput: '' });
      },

      nextSentence: (levelSentences: Sentence[]) => {
        set((state) => {
          const nextIndex = state.currentIndex + 1;
          if (nextIndex >= levelSentences.length) return state;
          return { currentIndex: nextIndex, phase: 'reading', userInput: '' };
        });
      },

      prevSentence: () => {
        set((state) => {
          const prevIndex = state.currentIndex - 1;
          if (prevIndex < 0) return state;
          return { currentIndex: prevIndex, phase: 'reading', userInput: '' };
        });
      },

      markCompleted: (id: number) => {
        set((state) => ({
          completedIds: state.completedIds.includes(id)
            ? state.completedIds
            : [...state.completedIds, id],
        }));
      },

      setPhase: (phase: Phase) => {
        set({ phase });
      },

      setUserInput: (input: string) => {
        set({ userInput: input });
      },

      showSnackbar: (message: string) => {
        set({ snackbar: { message, visible: true } });
      },

      hideSnackbar: () => {
        set({ snackbar: { message: '', visible: false } });
      },

      reset: () => {
        set({
          currentLevel: 1,
          currentIndex: 0,
          phase: 'reading',
          userInput: '',
          completedIds: [],
        });
      },
    }),
    {
      name: 'sentence-builder-storage',
      version: 1,
    }
  )
);
