'use client';

interface HintChipsProps {
  wordOrder: string[];
  hints: string[];
  compact?: boolean;
}

export function HintChips({ wordOrder, hints, compact = false }: HintChipsProps) {
  return (
    <div className={compact ? 'space-y-2' : 'space-y-4'}>
      <div className="flex flex-wrap items-center gap-1.5">
        {wordOrder.map((phrase, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span
              className={`inline-block rounded-full bg-violet-100 text-violet-700 font-medium ${
                compact ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1.5 text-sm'
              }`}
            >
              {phrase}
            </span>
            {i < wordOrder.length - 1 && (
              <span className={`text-violet-300 font-bold ${compact ? 'text-xs' : 'text-sm'}`}>
                +
              </span>
            )}
          </div>
        ))}
      </div>
      <div
        className={`flex flex-wrap gap-1.5 ${compact ? 'text-xs' : 'text-sm'}`}
      >
        <span className="text-violet-400">hint:</span>
        {hints.map((hint, i) => (
          <span key={i} className="text-violet-500 font-medium">
            {hint}
            {i < hints.length - 1 && ','}
          </span>
        ))}
      </div>
    </div>
  );
}
