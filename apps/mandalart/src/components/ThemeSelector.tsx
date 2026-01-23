'use client';

import type { ThemeType } from '@/lib/types';
import { themes, themeNames, themeList } from '@/lib/themes';

interface ThemeSelectorProps {
  value: ThemeType;
  onChange: (theme: ThemeType) => void;
}

export function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">테마:</span>
      <div className="flex gap-1">
        {themeList.map((themeKey) => {
          const theme = themes[themeKey];
          const isSelected = value === themeKey;

          return (
            <button
              key={themeKey}
              type="button"
              onClick={() => onChange(themeKey)}
              className={`
                w-8 h-8 rounded-full transition-all
                ${isSelected ? 'ring-2 ring-offset-2 scale-110' : 'hover:scale-105'}
              `}
              style={{
                backgroundColor: theme.primary,
                ['--tw-ring-color' as string]: theme.primary,
              }}
              title={themeNames[themeKey]}
            />
          );
        })}
      </div>
    </div>
  );
}
