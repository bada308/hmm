'use client';

import { useRouter } from 'next/navigation';
import { MandalartCard } from '@/components';
import { useMandalartStore } from '@/lib/store';
import { useHydration } from '@/hooks/useHydration';

export default function Home() {
  const router = useRouter();
  const hydrated = useHydration();
  const { mandalarts, createMandalart, deleteMandalart } = useMandalartStore();

  const handleCreate = () => {
    const id = createMandalart();
    router.push(`/edit/${id}`);
  };

  if (!hydrated) {
    return (
      <main className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-gray-400">로딩 중...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            만다라트
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            목표를 시각화하고 하나씩 달성해보세요
          </p>
        </header>

        {/* 새 만다라트 생성 버튼 */}
        <div className="mb-8 flex justify-center">
          <button
            type="button"
            onClick={handleCreate}
            className="px-6 py-3 bg-gradient-to-r from-pink-400 to-orange-400
                       text-white font-semibold rounded-full shadow-lg
                       hover:shadow-xl hover:scale-105 transition-all duration-300
                       flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            새 만다라트 만들기
          </button>
        </div>

        {/* 만다라트 목록 */}
        {mandalarts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {mandalarts
              .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
              .map((mandalart) => (
                <MandalartCard
                  key={mandalart.id}
                  mandalart={mandalart}
                  onDelete={deleteMandalart}
                />
              ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-gray-500 mb-2">아직 만다라트가 없어요</p>
            <p className="text-gray-400 text-sm">새 만다라트를 만들어 목표를 계획해보세요!</p>
          </div>
        )}

        {/* 푸터 */}
        <footer className="text-center text-xs text-gray-400 mt-12 pt-8 border-t border-gray-100">
          만다라트로 꿈을 현실로 만들어보세요
        </footer>
      </div>
    </main>
  );
}
