'use client';

import { useMandalartStore } from '@/lib/store';

export function Progress() {
  const { goals, gridSize } = useMandalartStore();

  const centerIndex = Math.floor((gridSize * gridSize) / 2);
  const goalsWithoutCenter = goals.filter((_, i) => i !== centerIndex);
  const filledGoals = goalsWithoutCenter.filter((g) => g.text.trim());
  const completedGoals = goalsWithoutCenter.filter((g) => g.completed);

  const completionRate = filledGoals.length > 0
    ? Math.round((completedGoals.length / filledGoals.length) * 100)
    : 0;

  return (
    <div className="flex items-center gap-4 text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <span>목표</span>
        <span className="font-semibold text-greenery-600">
          {filledGoals.length}/{gridSize * gridSize - 1}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span>완료</span>
        <span className="font-semibold text-greenery-600">
          {completedGoals.length}/{filledGoals.length}
        </span>
      </div>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-greenery-400 transition-all duration-300"
          style={{ width: `${completionRate}%` }}
        />
      </div>
      <span className="font-semibold text-greenery-600">{completionRate}%</span>
    </div>
  );
}
