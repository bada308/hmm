'use client';

import { useJapaneseStore } from '@/lib/store';

export function SettingsPanel() {
  const { showRomaji, toggleRomaji } = useJapaneseStore();

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={toggleRomaji}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
          showRomaji
            ? 'bg-indigo-100 text-indigo-700'
            : 'bg-gray-100 text-gray-500'
        }`}
      >
        <span
          className={`w-7 h-4 rounded-full relative transition-colors ${
            showRomaji ? 'bg-indigo-500' : 'bg-gray-300'
          }`}
        >
          <span
            className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${
              showRomaji ? 'left-3.5' : 'left-0.5'
            }`}
          />
        </span>
        로마자
      </button>
    </div>
  );
}
