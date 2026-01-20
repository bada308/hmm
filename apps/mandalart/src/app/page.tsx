'use client';

import { useEffect, useState } from 'react';
import { GridSizeSelector, MandalartGrid, Progress } from '@/components';
import { useMandalartStore } from '@/lib/store';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const resetAll = useMandalartStore((s) => s.resetAll);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-gray-400">로딩 중...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">
            🎯 만다라트
          </h1>
          <p className="text-gray-500 text-sm">
            목표를 시각화하고 하나씩 달성해보세요
          </p>
        </header>

        <div className="flex items-center justify-between">
          <GridSizeSelector />
          <button
            type="button"
            onClick={() => {
              if (confirm('모든 목표를 초기화할까요?')) {
                resetAll();
              }
            }}
            className="text-sm text-gray-400 hover:text-red-500 transition-colors"
          >
            초기화
          </button>
        </div>

        <Progress />

        <MandalartGrid />

        <footer className="text-center text-xs text-gray-400 pt-4">
          셀을 클릭하여 목표를 입력하세요 • 체크박스로 완료 표시
        </footer>
      </div>
    </main>
  );
}
