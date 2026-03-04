'use client';

import type { Level } from '@/lib/types';

interface LevelSelectorProps {
  currentLevel: Level;
  onSelect: (level: Level) => void;
  completedCounts: Record<Level, number>;
  totalCounts: Record<Level, number>;
}

const LEVEL_INFO: Record<Level, { label: string; description: string; emoji: string }> = {
  1: { label: '초급', description: '기본 문장 구조 (SVO)', emoji: '🌱' },
  2: { label: '중급', description: '부사구, to부정사, 접속사', emoji: '🌿' },
  3: { label: '고급', description: '분사구문, 관계절, 가정법', emoji: '🌳' },
};

export function LevelSelector({
  currentLevel,
  onSelect,
  completedCounts,
  totalCounts,
}: LevelSelectorProps) {
  return (
    <div className="space-y-3">
      {([1, 2, 3] as Level[]).map((level) => {
        const info = LEVEL_INFO[level];
        const isActive = currentLevel === level;
        const completed = completedCounts[level];
        const total = totalCounts[level];
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

        return (
          <button
            key={level}
            onClick={() => onSelect(level)}
            className={`w-full rounded-2xl p-4 text-left transition-all ${
              isActive
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-200'
                : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{info.emoji}</span>
                <div>
                  <p className={`font-semibold ${isActive ? 'text-white' : 'text-gray-800'}`}>
                    {info.label}
                  </p>
                  <p
                    className={`text-xs ${isActive ? 'text-violet-200' : 'text-gray-400'}`}
                  >
                    {info.description}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${isActive ? 'text-white' : 'text-violet-600'}`}>
                  {percent}%
                </p>
                <p className={`text-xs ${isActive ? 'text-violet-200' : 'text-gray-400'}`}>
                  {completed}/{total}
                </p>
              </div>
            </div>
            <div className="mt-3 h-1.5 rounded-full bg-violet-200/30 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isActive ? 'bg-white/60' : 'bg-violet-400'
                }`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
