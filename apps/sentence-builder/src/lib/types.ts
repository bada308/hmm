export type Level = 1 | 2 | 3;
export type Phase = 'reading' | 'writing' | 'revealed';

export interface Sentence {
  id: number;
  level: Level;
  korean: string;
  wordOrder: string[];
  hints: string[];
  answer: string;
}

export interface SnackbarState {
  message: string;
  visible: boolean;
}

export interface PracticeStore {
  currentLevel: Level;
  currentIndex: number;
  phase: Phase;
  userInput: string;
  completedIds: number[];
  snackbar: SnackbarState;

  setLevel: (level: Level) => void;
  nextSentence: (levelSentences: Sentence[]) => void;
  prevSentence: () => void;
  markCompleted: (id: number) => void;
  setPhase: (phase: Phase) => void;
  setUserInput: (input: string) => void;
  showSnackbar: (message: string) => void;
  hideSnackbar: () => void;
  reset: () => void;
}
