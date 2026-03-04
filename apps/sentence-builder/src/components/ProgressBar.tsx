'use client';

interface ProgressBarProps {
  current: number;
  total: number;
  completedCount: number;
}

export function ProgressBar({ current, total, completedCount }: ProgressBarProps) {
  const percent = total > 0 ? (completedCount / total) * 100 : 0;

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-violet-600">
        {current + 1} / {total}
      </span>
      <div className="flex-1 h-2 rounded-full bg-violet-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-violet-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs text-violet-400">{completedCount}완료</span>
    </div>
  );
}
