export type GridSize = 4 | 9;

export interface Goal {
  id: string;
  text: string;
  completed: boolean;
  reward?: string;
}

export interface MandalartState {
  gridSize: GridSize;
  goals: Goal[];
  setGridSize: (size: GridSize) => void;
  updateGoal: (id: string, updates: Partial<Omit<Goal, 'id'>>) => void;
  toggleComplete: (id: string) => void;
  resetAll: () => void;
}
