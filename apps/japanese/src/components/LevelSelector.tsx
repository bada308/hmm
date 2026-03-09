'use client';

import type { JLPTLevel } from '@/lib/types';
import { getAvailableLevels } from '@/data/vocabulary';

interface LevelSelectorProps {
  selectedLevel: JLPTLevel;
  onSelect: (level: JLPTLevel) => void;
}

const allLevels: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];

export function LevelSelector({ selectedLevel, onSelect }: LevelSelectorProps) {
  const availableLevels = getAvailableLevels();

  return (
    <div className="flex gap-2 justify-center">
      {allLevels.map((level) => {
        const isAvailable = availableLevels.includes(level);
        const isSelected = selectedLevel === level;

        return (
          <button
            key={level}
            type="button"
            disabled={!isAvailable}
            onClick={() => isAvailable && onSelect(level)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isSelected
                ? 'bg-indigo-500 text-white shadow-md'
                : isAvailable
                  ? 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-500'
                  : 'bg-gray-50 text-gray-300 border border-gray-100 cursor-not-allowed'
            }`}
            title={!isAvailable ? '준비 중' : undefined}
          >
            {level}
            {!isAvailable && (
              <span className="block text-[10px] leading-tight">준비 중</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
