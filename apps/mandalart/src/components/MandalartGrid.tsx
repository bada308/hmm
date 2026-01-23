'use client';

import { useMandalartStore } from '@/lib/store';
import { GoalCell } from './GoalCell';

export function MandalartGrid() {
  const { gridSize, goals, updateGoal, toggleComplete } = useMandalartStore();

  const centerIndex = Math.floor((gridSize * gridSize) / 2);

  return (
    <div
      className="grid gap-2 w-full max-w-2xl mx-auto"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
      }}
    >
      {goals.map((goal, index) => (
        <GoalCell
          key={goal.id}
          goal={goal}
          isCenter={index === centerIndex}
          onUpdate={(updates) => updateGoal(goal.id, updates)}
          onToggleComplete={() => toggleComplete(goal.id)}
        />
      ))}
    </div>
  );
}
