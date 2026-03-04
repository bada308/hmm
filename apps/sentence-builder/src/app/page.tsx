'use client';

import { useCallback, useMemo } from 'react';
import { usePracticeStore } from '@/lib/store';
import { getSentencesByLevel } from '@/lib/sentences';
import { useHydration } from '@/hooks/useHydration';
import { PracticeCard, ProgressBar, Snackbar, LevelSelector } from '@/components';
import type { Level } from '@/lib/types';

export default function Home() {
  const hydrated = useHydration();
  const store = usePracticeStore();

  const levelSentences = useMemo(
    () => getSentencesByLevel(store.currentLevel),
    [store.currentLevel]
  );

  const currentSentence = levelSentences[store.currentIndex];

  const completedCounts = useMemo(() => {
    const counts: Record<Level, number> = { 1: 0, 2: 0, 3: 0 };
    for (const id of store.completedIds) {
      if (id <= 70) counts[1]++;
      else if (id <= 140) counts[2]++;
      else counts[3]++;
    }
    return counts;
  }, [store.completedIds]);

  const totalCounts = useMemo(
    () => ({
      1: getSentencesByLevel(1).length,
      2: getSentencesByLevel(2).length,
      3: getSentencesByLevel(3).length,
    }),
    []
  );

  const levelCompletedForCurrent = useMemo(() => {
    return store.completedIds.filter((id) => {
      return levelSentences.some((s) => s.id === id);
    }).length;
  }, [store.completedIds, levelSentences]);

  const handleSelfAssess = useCallback(
    (result: 'correct' | 'close' | 'wrong') => {
      if (!currentSentence) return;

      const messages = {
        correct: '정답! 잘했어요! 👏',
        close: '거의 맞았어요! 💪',
        wrong: '다음엔 더 잘할 수 있어요! 📝',
      };

      if (result === 'correct' || result === 'close') {
        store.markCompleted(currentSentence.id);
      }

      store.showSnackbar(messages[result]);

      setTimeout(() => {
        if (store.currentIndex < levelSentences.length - 1) {
          store.nextSentence(levelSentences);
        } else {
          store.setPhase('reading');
          store.showSnackbar('이 레벨의 모든 문장을 완료했어요! 🎉');
        }
      }, 800);
    },
    [currentSentence, levelSentences, store]
  );

  const hideSnackbar = useCallback(() => {
    store.hideSnackbar();
  }, [store]);

  if (!hydrated) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-8">
      <div className="mx-auto max-w-md px-4 pt-6">
        {/* 헤더 */}
        <header className="mb-6 text-center">
          <h1 className="text-xl font-bold text-violet-800">영어 문장 만들기</h1>
          <p className="mt-1 text-sm text-violet-400">영어 어순으로 생각하는 훈련</p>
        </header>

        {/* 레벨 선택 */}
        <div className="mb-6">
          <LevelSelector
            currentLevel={store.currentLevel}
            onSelect={store.setLevel}
            completedCounts={completedCounts}
            totalCounts={totalCounts}
          />
        </div>

        {/* 진행률 */}
        {currentSentence && (
          <div className="mb-4">
            <ProgressBar
              current={store.currentIndex}
              total={levelSentences.length}
              completedCount={levelCompletedForCurrent}
            />
          </div>
        )}

        {/* 학습 카드 */}
        {currentSentence && (
          <PracticeCard
            sentence={currentSentence}
            phase={store.phase}
            userInput={store.userInput}
            onInputChange={store.setUserInput}
            onStartWriting={() => store.setPhase('writing')}
            onSubmitAnswer={() => store.setPhase('revealed')}
            onSelfAssess={handleSelfAssess}
          />
        )}

        {/* 네비게이션 */}
        {currentSentence && (
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => store.prevSentence()}
              disabled={store.currentIndex <= 0}
              className="flex-1 rounded-xl border-2 border-violet-200 py-2.5 text-sm font-medium text-violet-600 transition-colors hover:bg-violet-50 disabled:border-violet-100 disabled:text-violet-300 disabled:cursor-not-allowed"
            >
              ← 이전
            </button>
            <button
              onClick={() => store.nextSentence(levelSentences)}
              disabled={store.currentIndex >= levelSentences.length - 1}
              className="flex-1 rounded-xl border-2 border-violet-200 py-2.5 text-sm font-medium text-violet-600 transition-colors hover:bg-violet-50 disabled:border-violet-100 disabled:text-violet-300 disabled:cursor-not-allowed"
            >
              다음 →
            </button>
          </div>
        )}
      </div>

      {/* 스낵바 */}
      <Snackbar
        message={store.snackbar.message}
        visible={store.snackbar.visible}
        onHide={hideSnackbar}
      />
    </main>
  );
}
