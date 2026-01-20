import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Goal, GridSize, MandalartState } from './types';

const createEmptyGoals = (size: GridSize): Goal[] => {
  const total = size * size;
  return Array.from({ length: total }, (_, i) => ({
    id: `goal-${i}`,
    text: '',
    completed: false,
    reward: undefined,
  }));
};

export const useMandalartStore = create<MandalartState>()(
  persist(
    (set) => ({
      gridSize: 9,
      goals: createEmptyGoals(9),
      setGridSize: (size) =>
        set((state) => {
          if (state.gridSize === size) return state;
          return {
            gridSize: size,
            goals: createEmptyGoals(size),
          };
        }),
      updateGoal: (id, updates) =>
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id ? { ...goal, ...updates } : goal
          ),
        })),
      toggleComplete: (id) =>
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id ? { ...goal, completed: !goal.completed } : goal
          ),
        })),
      resetAll: () =>
        set((state) => ({
          goals: createEmptyGoals(state.gridSize),
        })),
    }),
    {
      name: 'mandalart-storage',
    }
  )
);
