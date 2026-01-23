// 테마 타입
export type ThemeType = 'peach' | 'mint' | 'lavender' | 'lemon' | 'sky';

// 실행 항목 (각 서브그리드의 8개 항목)
export interface ActionItem {
  id: string;
  text: string;
  completed: boolean;
}

// 중심 3x3 그리드 (핵심 목표 + 8개 세부 목표)
export interface CenterGoal {
  mainGoal: string; // 핵심 목표 (정중앙)
  subGoals: string[]; // 8개 세부 목표 (시계방향: 상, 우상, 우, 우하, 하, 좌하, 좌, 좌상)
}

// 주변 3x3 서브그리드
export interface SubGrid {
  position: number; // 0-7 (세부 목표 위치, 시계방향)
  actions: ActionItem[]; // 8개 실행 항목
}

// 만다라트 전체 구조
export interface Mandalart {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  theme: ThemeType;
  center: CenterGoal; // 중심 3x3
  subGrids: SubGrid[]; // 주변 8개 3x3
}

// 스토어 상태 타입
export interface MandalartStore {
  mandalarts: Mandalart[];
  currentId: string | null;

  // 만다라트 CRUD
  createMandalart: (title?: string) => string;
  deleteMandalart: (id: string) => void;
  duplicateMandalart: (id: string) => string | null;

  // 현재 만다라트 수정
  setCurrentId: (id: string | null) => void;
  updateTitle: (id: string, title: string) => void;
  updateTheme: (id: string, theme: ThemeType) => void;
  updateMainGoal: (id: string, mainGoal: string) => void;
  updateSubGoal: (id: string, position: number, subGoal: string) => void;
  updateAction: (
    id: string,
    subGridPosition: number,
    actionIndex: number,
    text: string
  ) => void;
  toggleActionComplete: (
    id: string,
    subGridPosition: number,
    actionIndex: number
  ) => void;

  // 헬퍼
  getMandalart: (id: string) => Mandalart | undefined;
}

// 셀 타입 (렌더링용)
export type CellType = 'main' | 'sub' | 'action';

// 서브그리드 위치 매핑 (그리드 위치 -> 세부목표 인덱스)
// 3x3 그리드에서의 위치: 0=상, 1=우상, 2=우, 3=우하, 4=하, 5=좌하, 6=좌, 7=좌상
// 실제 그리드 배치:
// [0,0]=좌상(7) [0,1]=상(0)   [0,2]=우상(1)
// [1,0]=좌(6)   [1,1]=중심    [1,2]=우(2)
// [2,0]=좌하(5) [2,1]=하(4)   [2,2]=우하(3)
export const SUBGRID_POSITION_MAP: Record<string, number> = {
  '0,0': 7, // 좌상
  '0,1': 0, // 상
  '0,2': 1, // 우상
  '1,0': 6, // 좌
  '1,2': 2, // 우
  '2,0': 5, // 좌하
  '2,1': 4, // 하
  '2,2': 3, // 우하
};

// 중심 3x3 내 셀 위치 -> 세부목표 인덱스
export const CENTER_CELL_MAP: Record<string, number | 'main'> = {
  '0,0': 7, // 좌상
  '0,1': 0, // 상
  '0,2': 1, // 우상
  '1,0': 6, // 좌
  '1,1': 'main', // 중심 (핵심 목표)
  '1,2': 2, // 우
  '2,0': 5, // 좌하
  '2,1': 4, // 하
  '2,2': 3, // 우하
};

// 서브그리드 내 셀 위치 -> 액션 인덱스
export const ACTION_CELL_MAP: Record<string, number | 'center'> = {
  '0,0': 7,
  '0,1': 0,
  '0,2': 1,
  '1,0': 6,
  '1,1': 'center', // 세부 목표 (읽기 전용)
  '1,2': 2,
  '2,0': 5,
  '2,1': 4,
  '2,2': 3,
};
