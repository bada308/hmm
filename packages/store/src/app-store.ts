import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AppState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

const updateDOMTheme = (theme: 'light' | 'dark') => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => {
        updateDOMTheme(theme);
        set({ theme });
      },
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          updateDOMTheme(newTheme);
          return { theme: newTheme };
        }),
    }),
    {
      name: 'app-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          updateDOMTheme(state.theme);
        }
      },
    }
  )
);
