import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ActionItem, Mandalart, MandalartStore, SubGrid, ThemeType } from './types';

// UUID 생성 함수
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

// 빈 액션 아이템 8개 생성
const createEmptyActions = (): ActionItem[] => {
  return Array.from({ length: 8 }, (_, i) => ({
    id: `action-${generateId()}-${i}`,
    text: '',
    completed: false,
  }));
};

// 빈 서브그리드 8개 생성
const createEmptySubGrids = (): SubGrid[] => {
  return Array.from({ length: 8 }, (_, i) => ({
    position: i,
    actions: createEmptyActions(),
  }));
};

// 빈 만다라트 생성
const createEmptyMandalart = (title: string = '새 만다라트'): Mandalart => {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    title,
    createdAt: now,
    updatedAt: now,
    theme: 'peach' as ThemeType,
    center: {
      mainGoal: '',
      subGoals: Array(8).fill(''),
    },
    subGrids: createEmptySubGrids(),
  };
};

export const useMandalartStore = create<MandalartStore>()(
  persist(
    (set, get) => ({
      mandalarts: [],
      currentId: null,

      // 만다라트 생성
      createMandalart: (title?: string) => {
        const newMandalart = createEmptyMandalart(title);
        set((state) => ({
          mandalarts: [...state.mandalarts, newMandalart],
          currentId: newMandalart.id,
        }));
        return newMandalart.id;
      },

      // 만다라트 삭제
      deleteMandalart: (id: string) => {
        set((state) => ({
          mandalarts: state.mandalarts.filter((m) => m.id !== id),
          currentId: state.currentId === id ? null : state.currentId,
        }));
      },

      // 만다라트 복제
      duplicateMandalart: (id: string) => {
        const original = get().mandalarts.find((m) => m.id === id);
        if (!original) return null;

        const now = new Date().toISOString();
        const duplicated: Mandalart = {
          ...JSON.parse(JSON.stringify(original)),
          id: generateId(),
          title: `${original.title} (복사본)`,
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          mandalarts: [...state.mandalarts, duplicated],
        }));

        return duplicated.id;
      },

      // 현재 ID 설정
      setCurrentId: (id: string | null) => {
        set({ currentId: id });
      },

      // 제목 업데이트
      updateTitle: (id: string, title: string) => {
        set((state) => ({
          mandalarts: state.mandalarts.map((m) =>
            m.id === id
              ? { ...m, title, updatedAt: new Date().toISOString() }
              : m
          ),
        }));
      },

      // 테마 업데이트
      updateTheme: (id: string, theme: ThemeType) => {
        set((state) => ({
          mandalarts: state.mandalarts.map((m) =>
            m.id === id
              ? { ...m, theme, updatedAt: new Date().toISOString() }
              : m
          ),
        }));
      },

      // 핵심 목표 업데이트
      updateMainGoal: (id: string, mainGoal: string) => {
        set((state) => ({
          mandalarts: state.mandalarts.map((m) =>
            m.id === id
              ? {
                  ...m,
                  center: { ...m.center, mainGoal },
                  updatedAt: new Date().toISOString(),
                }
              : m
          ),
        }));
      },

      // 세부 목표 업데이트
      updateSubGoal: (id: string, position: number, subGoal: string) => {
        set((state) => ({
          mandalarts: state.mandalarts.map((m) => {
            if (m.id !== id) return m;

            const newSubGoals = [...m.center.subGoals];
            newSubGoals[position] = subGoal;

            return {
              ...m,
              center: { ...m.center, subGoals: newSubGoals },
              updatedAt: new Date().toISOString(),
            };
          }),
        }));
      },

      // 실행 항목 업데이트
      updateAction: (
        id: string,
        subGridPosition: number,
        actionIndex: number,
        text: string
      ) => {
        set((state) => ({
          mandalarts: state.mandalarts.map((m) => {
            if (m.id !== id) return m;

            const newSubGrids = m.subGrids.map((sg) => {
              if (sg.position !== subGridPosition) return sg;

              const newActions = sg.actions.map((action, idx) =>
                idx === actionIndex ? { ...action, text } : action
              );

              return { ...sg, actions: newActions };
            });

            return {
              ...m,
              subGrids: newSubGrids,
              updatedAt: new Date().toISOString(),
            };
          }),
        }));
      },

      // 실행 항목 완료 토글
      toggleActionComplete: (
        id: string,
        subGridPosition: number,
        actionIndex: number
      ) => {
        set((state) => ({
          mandalarts: state.mandalarts.map((m) => {
            if (m.id !== id) return m;

            const newSubGrids = m.subGrids.map((sg) => {
              if (sg.position !== subGridPosition) return sg;

              const newActions = sg.actions.map((action, idx) =>
                idx === actionIndex
                  ? { ...action, completed: !action.completed }
                  : action
              );

              return { ...sg, actions: newActions };
            });

            return {
              ...m,
              subGrids: newSubGrids,
              updatedAt: new Date().toISOString(),
            };
          }),
        }));
      },

      // 만다라트 조회
      getMandalart: (id: string) => {
        return get().mandalarts.find((m) => m.id === id);
      },
    }),
    {
      name: 'mandalart-storage',
      version: 2, // 버전 업데이트 (기존 데이터와 호환되지 않음)
    }
  )
);
