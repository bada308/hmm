'use client';

import { Cell } from './Cell';
import { ACTION_CELL_MAP } from '@/lib/types';
import type { SubGrid as SubGridType } from '@/lib/types';
import type { ThemeColors } from '@/lib/themes';

interface SubGridProps {
  subGrid: SubGridType;
  subGoalText: string;
  theme: ThemeColors;
  isCenter?: boolean;
  centerGoal?: {
    mainGoal: string;
    subGoals: string[];
  };
  onUpdateMainGoal?: (value: string) => void;
  onUpdateSubGoal?: (position: number, value: string) => void;
  onUpdateAction?: (actionIndex: number, value: string) => void;
  onToggleComplete?: (actionIndex: number) => void;
}

export function SubGrid({
  subGrid,
  subGoalText,
  theme,
  isCenter = false,
  centerGoal,
  onUpdateMainGoal,
  onUpdateSubGoal,
  onUpdateAction,
  onToggleComplete,
}: SubGridProps) {
  const renderCell = (row: number, col: number) => {
    const key = `${row},${col}`;

    if (isCenter && centerGoal) {
      // 중심 3x3 그리드
      if (row === 1 && col === 1) {
        // 핵심 목표 (정중앙)
        return (
          <Cell
            key={key}
            type="main"
            value={centerGoal.mainGoal}
            theme={theme}
            onChange={onUpdateMainGoal}
          />
        );
      } else {
        // 세부 목표
        const position = ACTION_CELL_MAP[key];
        if (typeof position === 'number') {
          return (
            <Cell
              key={key}
              type="sub"
              value={centerGoal.subGoals[position]}
              theme={theme}
              onChange={(value) => onUpdateSubGoal?.(position, value)}
            />
          );
        }
      }
    } else {
      // 주변 서브그리드
      if (row === 1 && col === 1) {
        // 세부 목표 (중앙, 읽기 전용)
        return (
          <Cell
            key={key}
            type="sub"
            value={subGoalText}
            theme={theme}
            readOnly
          />
        );
      } else {
        // 실행 항목
        const actionIndex = ACTION_CELL_MAP[key];
        if (typeof actionIndex === 'number') {
          const action = subGrid.actions[actionIndex];
          return (
            <Cell
              key={key}
              type="action"
              value={action?.text || ''}
              theme={theme}
              completed={action?.completed || false}
              onChange={(value) => onUpdateAction?.(actionIndex, value)}
              onToggleComplete={() => onToggleComplete?.(actionIndex)}
            />
          );
        }
      }
    }

    return null;
  };

  return (
    <div
      className={`grid grid-cols-3 gap-1 p-2 rounded-xl ${isCenter ? 'ring-2' : ''}`}
      style={{
        backgroundColor: isCenter ? theme.primary : 'transparent',
        boxShadow: isCenter ? `0 4px 16px ${theme.border}60` : 'none',
        ['--tw-ring-color' as string]: isCenter ? theme.text : 'transparent',
      }}
    >
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <div key={`${row}-${col}`}>{renderCell(row, col)}</div>
        ))
      )}
    </div>
  );
}
