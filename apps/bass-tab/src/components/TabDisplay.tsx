'use client';

import type { BassTab, TabMeasure } from '@/lib/types';
import { BASS_STRINGS } from '@/lib/types';

interface TabDisplayProps {
  tab: BassTab;
}

function MeasureDisplay({ measure }: { measure: TabMeasure }) {
  // Build tab lines for each string
  const lines: string[][] = BASS_STRINGS.map(() => []);

  for (const note of measure.notes) {
    if (note.fret === -1) {
      // Rest - add dash to all strings
      lines.forEach((line) => line.push('-'));
    } else {
      // Add fret number to the correct string, dash to others
      lines.forEach((line, idx) => {
        if (idx + 1 === note.string) {
          const fretStr = note.fret.toString();
          line.push(fretStr);
          // Add extra dash if fret is 2 digits
          if (fretStr.length === 1) {
            line.push('-');
          }
        } else {
          line.push('--');
        }
      });
    }
  }

  // If measure is empty, add some dashes
  if (measure.notes.length === 0) {
    lines.forEach((line) => line.push('----'));
  }

  return (
    <div className="font-mono text-sm">
      {lines.map((line, idx) => (
        <div key={idx} className="flex">
          <span className="w-4 text-bass-500 font-bold">{BASS_STRINGS[idx].name}</span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-700">{line.join('')}</span>
          <span className="text-gray-400">|</span>
        </div>
      ))}
    </div>
  );
}

export function TabDisplay({ tab }: TabDisplayProps) {
  // Group measures into rows (4 measures per row)
  const measuresPerRow = 4;
  const rows: TabMeasure[][] = [];

  for (let i = 0; i < tab.measures.length; i += measuresPerRow) {
    rows.push(tab.measures.slice(i, i + measuresPerRow));
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">{tab.title}</h2>

      <div className="space-y-8">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex flex-wrap gap-4">
            {row.map((measure) => (
              <div key={measure.number} className="relative">
                <span className="absolute -top-4 left-0 text-xs text-gray-400">
                  {measure.number}
                </span>
                <MeasureDisplay measure={measure} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="text-xs text-gray-500 mt-4">
        <p>튜닝: E-A-D-G (표준 4현 베이스)</p>
      </div>
    </div>
  );
}
