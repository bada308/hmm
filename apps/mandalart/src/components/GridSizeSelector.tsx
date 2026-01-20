'use client';

import { useMandalartStore } from '@/lib/store';
import type { GridSize } from '@/lib/types';

export function GridSizeSelector() {
  const { gridSize, setGridSize } = useMandalartStore();

  const sizes: { value: GridSize; label: string }[] = [
    { value: 4, label: '4×4' },
    { value: 9, label: '9×9' },
  ];

  return (
    <div className="flex gap-2">
      {sizes.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => setGridSize(value)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${gridSize === value
              ? 'bg-greenery-400 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-greenery-100'
            }
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
