'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  JLPTLevel,
  CharacterType,
  StudyMode,
  CardProgress,
  CardFilter,
} from './types';

interface JapaneseStore {
  // 설정
  showRomaji: boolean;
  toggleRomaji: () => void;
  selectedLevel: JLPTLevel;
  setLevel: (level: JLPTLevel) => void;
  selectedCategory: string | null;
  setCategory: (cat: string | null) => void;
  studyMode: StudyMode;
  setStudyMode: (mode: StudyMode) => void;
  characterType: CharacterType | 'both';
  setCharacterType: (type: CharacterType | 'both') => void;
  cardFilter: CardFilter;
  setCardFilter: (filter: CardFilter) => void;

  // 진행도
  progress: Record<string, CardProgress>;
  markCorrect: (id: string) => void;
  markIncorrect: (id: string) => void;
  resetProgress: () => void;
}

export const useJapaneseStore = create<JapaneseStore>()(
  persist(
    (set) => ({
      // 설정 기본값
      showRomaji: true,
      selectedLevel: 'N5',
      selectedCategory: null,
      studyMode: 'characters',
      characterType: 'hiragana',
      cardFilter: 'all',

      toggleRomaji: () => set((s) => ({ showRomaji: !s.showRomaji })),
      setLevel: (level) => set({ selectedLevel: level, selectedCategory: null }),
      setCategory: (cat) => set({ selectedCategory: cat }),
      setStudyMode: (mode) => set({ studyMode: mode }),
      setCharacterType: (type) => set({ characterType: type }),
      setCardFilter: (filter) => set({ cardFilter: filter }),

      // 진행도
      progress: {},

      markCorrect: (id) =>
        set((s) => {
          const prev = s.progress[id] || {
            id,
            status: 'new' as const,
            correctCount: 0,
            lastSeen: null,
          };
          const newCount = prev.correctCount + 1;
          return {
            progress: {
              ...s.progress,
              [id]: {
                ...prev,
                correctCount: newCount,
                status: newCount >= 3 ? 'mastered' : 'learning',
                lastSeen: new Date().toISOString(),
              },
            },
          };
        }),

      markIncorrect: (id) =>
        set((s) => {
          const prev = s.progress[id] || {
            id,
            status: 'new' as const,
            correctCount: 0,
            lastSeen: null,
          };
          return {
            progress: {
              ...s.progress,
              [id]: {
                ...prev,
                correctCount: Math.max(0, prev.correctCount - 1),
                status: 'learning',
                lastSeen: new Date().toISOString(),
              },
            },
          };
        }),

      resetProgress: () => set({ progress: {} }),
    }),
    {
      name: 'japanese-study-storage',
    }
  )
);
