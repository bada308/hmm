'use client';

import { useRef, use, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { MandalartGrid, ThemeSelector, ExportButtons } from '@/components';
import { useMandalartStore } from '@/lib/store';
import { exportToPNG, exportToPDF } from '@/lib/export';
import { useHydration } from '@/hooks/useHydration';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const gridRef = useRef<HTMLDivElement>(null);
  const hydrated = useHydration();

  const { getMandalart, updateTitle, updateTheme } = useMandalartStore();
  const mandalart = getMandalart(id);

  const initialTitle = useMemo(() => mandalart?.title ?? '', [mandalart?.title]);

  const handleTitleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    if (mandalart && newTitle !== mandalart.title) {
      updateTitle(id, newTitle);
    }
  };

  const handleExportPNG = async () => {
    if (!gridRef.current || !mandalart) return;
    await exportToPNG(gridRef.current, mandalart.title || '만다라트');
  };

  const handleExportPDF = async () => {
    if (!gridRef.current || !mandalart) return;
    await exportToPDF(gridRef.current, mandalart.title || '만다라트');
  };

  if (!hydrated) {
    return (
      <main className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-gray-400">로딩 중...</div>
      </main>
    );
  }

  if (!mandalart) {
    return (
      <main className="min-h-screen p-6 flex flex-col items-center justify-center">
        <div className="text-gray-400 mb-4">만다라트를 찾을 수 없습니다</div>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="text-pink-500 hover:underline"
        >
          목록으로 돌아가기
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        {/* 상단 툴바 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          {/* 뒤로가기 + 제목 */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <input
              type="text"
              defaultValue={initialTitle}
              onBlur={handleTitleBlur}
              placeholder="제목을 입력하세요"
              className="text-xl md:text-2xl font-bold bg-transparent border-none outline-none
                         focus:ring-2 focus:ring-pink-200 rounded-lg px-2 py-1
                         placeholder:text-gray-300"
            />
          </div>

          {/* 테마 + 내보내기 */}
          <div className="flex flex-wrap items-center gap-4">
            <ThemeSelector
              value={mandalart.theme}
              onChange={(theme) => updateTheme(id, theme)}
            />
            <ExportButtons
              onExportPNG={handleExportPNG}
              onExportPDF={handleExportPDF}
            />
          </div>
        </div>

        {/* 만다라트 그리드 */}
        <MandalartGrid ref={gridRef} mandalart={mandalart} />

        {/* 안내 문구 */}
        <footer className="text-center text-xs text-gray-400 mt-6">
          셀을 클릭하여 목표를 입력하세요 • 실행 항목은 체크박스로 완료 표시
        </footer>
      </div>
    </main>
  );
}
