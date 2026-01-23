'use client';

import Link from 'next/link';
import type { Mandalart } from '@/lib/types';
import { getTheme, themeNames } from '@/lib/themes';

interface MandalartCardProps {
  mandalart: Mandalart;
  onDelete: (id: string) => void;
}

export function MandalartCard({ mandalart, onDelete }: MandalartCardProps) {
  const theme = getTheme(mandalart.theme);
  const completedCount = mandalart.subGrids.reduce(
    (acc, sg) => acc + sg.actions.filter((a) => a.completed).length,
    0
  );
  const totalActions = 64; // 8 서브그리드 x 8 액션

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div
      className="relative group rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      style={{
        backgroundColor: theme.background,
        border: `2px solid ${theme.border}`,
      }}
    >
      <Link href={`/edit/${mandalart.id}`} className="block p-4">
        {/* 미니 그리드 미리보기 */}
        <div
          className="grid grid-cols-3 gap-1 mb-3 aspect-square"
          style={{ maxWidth: '120px', margin: '0 auto' }}
        >
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => {
              const isCenter = row === 1 && col === 1;
              return (
                <div
                  key={`${row}-${col}`}
                  className="rounded-sm"
                  style={{
                    backgroundColor: isCenter ? theme.primary : theme.secondary,
                    aspectRatio: '1',
                  }}
                />
              );
            })
          )}
        </div>

        {/* 제목 */}
        <h3
          className="font-bold text-center truncate mb-1"
          style={{ color: theme.text }}
        >
          {mandalart.title || '제목 없음'}
        </h3>

        {/* 핵심 목표 미리보기 */}
        {mandalart.center.mainGoal && (
          <p
            className="text-xs text-center truncate mb-2"
            style={{ color: theme.textLight }}
          >
            {mandalart.center.mainGoal}
          </p>
        )}

        {/* 진행률 */}
        <div className="flex items-center gap-2 mb-2">
          <div
            className="flex-1 h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: theme.border }}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${(completedCount / totalActions) * 100}%`,
                backgroundColor: theme.primary,
              }}
            />
          </div>
          <span className="text-xs" style={{ color: theme.textLight }}>
            {Math.round((completedCount / totalActions) * 100)}%
          </span>
        </div>

        {/* 메타 정보 */}
        <div className="flex justify-between items-center text-xs" style={{ color: theme.textLight }}>
          <span>{themeNames[mandalart.theme]}</span>
          <span>{formatDate(mandalart.updatedAt)}</span>
        </div>
      </Link>

      {/* 삭제 버튼 */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (confirm('이 만다라트를 삭제하시겠습니까?')) {
            onDelete(mandalart.id);
          }
        }}
        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 text-gray-400
                   opacity-0 group-hover:opacity-100 transition-opacity
                   flex items-center justify-center hover:bg-red-50 hover:text-red-500"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
