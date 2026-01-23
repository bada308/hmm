'use client';

import { SubGrid } from './SubGrid';
import { SUBGRID_POSITION_MAP } from '@/lib/types';
import type { Mandalart } from '@/lib/types';
import { getTheme } from '@/lib/themes';
import { useMandalartStore } from '@/lib/store';
import { forwardRef } from 'react';

interface MandalartGridProps {
  mandalart: Mandalart;
}

export const MandalartGrid = forwardRef<HTMLDivElement, MandalartGridProps>(
  function MandalartGrid({ mandalart }, ref) {
    const { updateMainGoal, updateSubGoal, updateAction, toggleActionComplete } =
      useMandalartStore();

    const theme = getTheme(mandalart.theme);

    const renderSubGrid = (row: number, col: number) => {
      const key = `${row},${col}`;
      const isCenter = row === 1 && col === 1;

      if (isCenter) {
        // 중심 그리드
        return (
          <SubGrid
            key={key}
            subGrid={{ position: -1, actions: [] }}
            subGoalText=""
            theme={theme}
            isCenter
            centerGoal={mandalart.center}
            onUpdateMainGoal={(value) => updateMainGoal(mandalart.id, value)}
            onUpdateSubGoal={(position, value) =>
              updateSubGoal(mandalart.id, position, value)
            }
          />
        );
      } else {
        // 주변 서브그리드
        const position = SUBGRID_POSITION_MAP[key];
        const subGrid = mandalart.subGrids.find((sg) => sg.position === position);
        const subGoalText = mandalart.center.subGoals[position] || '';

        if (!subGrid) return null;

        return (
          <SubGrid
            key={key}
            subGrid={subGrid}
            subGoalText={subGoalText}
            theme={theme}
            onUpdateAction={(actionIndex, value) =>
              updateAction(mandalart.id, position, actionIndex, value)
            }
            onToggleComplete={(actionIndex) =>
              toggleActionComplete(mandalart.id, position, actionIndex)
            }
          />
        );
      }
    };

    return (
      <div
        ref={ref}
        className="grid grid-cols-3 gap-2 md:gap-3 p-3 md:p-4 rounded-2xl"
        style={{
          backgroundColor: theme.background,
          border: `2px solid ${theme.border}`,
        }}
      >
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <div key={`${row}-${col}`}>{renderSubGrid(row, col)}</div>
          ))
        )}
      </div>
    );
  }
);
