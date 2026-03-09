'use client';

import { useJapaneseStore } from '@/lib/store';
import type { Character } from '@/lib/types';

interface CharacterGridProps {
  characters: Character[];
  rows: string[];
  title: string;
  onSelectRow: (row: string) => void;
}

export function CharacterGrid({
  characters,
  rows,
  title,
  onSelectRow,
}: CharacterGridProps) {
  const { showRomaji, progress } = useJapaneseStore();

  const baseRows = rows.filter(
    (r) => !r.includes('が') && !r.includes('ざ') && !r.includes('だ') && !r.includes('ば') && !r.includes('ぱ') &&
           !r.includes('ガ') && !r.includes('ザ') && !r.includes('ダ') && !r.includes('バ') && !r.includes('パ')
  );
  const dakutenRows = rows.filter((r) => !baseRows.includes(r));

  const getCharStatus = (char: Character) => {
    const id = `char-${char.type}-${char.romaji}`;
    const p = progress[id];
    if (!p) return 'new';
    return p.status;
  };

  const statusBg = (status: string) => {
    if (status === 'mastered') return 'bg-green-100 text-green-800 border-green-300';
    if (status === 'learning') return 'bg-amber-50 text-amber-800 border-amber-300';
    return 'bg-white text-gray-800 border-gray-200';
  };

  const renderRow = (row: string) => {
    const chars = characters.filter((c) => c.row === row);
    const masteredInRow = chars.filter((c) => getCharStatus(c) === 'mastered').length;

    return (
      <div key={row} className="mb-3">
        <button
          type="button"
          onClick={() => onSelectRow(row)}
          className="w-full text-left group"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-gray-500">{row}</span>
            <span className="text-xs text-gray-300">
              {masteredInRow}/{chars.length}
            </span>
            <span className="text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
              학습하기 →
            </span>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {chars.map((char) => {
              const status = getCharStatus(char);
              return (
                <div
                  key={char.character}
                  className={`w-11 h-11 rounded-lg border flex flex-col items-center justify-center ${statusBg(status)} transition-colors`}
                >
                  <span className="font-japanese text-lg leading-none">
                    {char.character}
                  </span>
                  {showRomaji && (
                    <span className="text-[9px] text-gray-400 leading-none mt-0.5">
                      {char.romaji}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </button>
      </div>
    );
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-700 mb-4">{title}</h3>

      <div className="mb-4">
        <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-2">
          기본 (청음)
        </h4>
        {baseRows.map(renderRow)}
      </div>

      {dakutenRows.length > 0 && (
        <div>
          <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-2">
            탁음 / 반탁음
          </h4>
          {dakutenRows.map(renderRow)}
        </div>
      )}
    </div>
  );
}
