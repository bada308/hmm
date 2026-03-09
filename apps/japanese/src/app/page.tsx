'use client';

import { useState } from 'react';
import { useJapaneseStore } from '@/lib/store';
import { useHydration } from '@/hooks/useHydration';
import { FlashCardDeck } from '@/components/FlashCardDeck';
import { CharacterGrid } from '@/components/CharacterGrid';
import { LevelSelector } from '@/components/LevelSelector';
import { CategorySelector } from '@/components/CategorySelector';
import { SettingsPanel } from '@/components/SettingsPanel';
import { StatsDisplay } from '@/components/StatsDisplay';
import { hiragana, hiraganaRows } from '@/data/hiragana';
import { katakana, katakanaRows } from '@/data/katakana';
import { getVocabulary, getCategories } from '@/data/vocabulary';

type View =
  | 'home'
  | 'character-grid'
  | 'character-study'
  | 'vocab-categories'
  | 'vocab-study';

export default function Home() {
  const hydrated = useHydration();
  const {
    setStudyMode,
    characterType,
    setCharacterType,
    selectedLevel,
    setLevel,
    selectedCategory,
    setCategory,
  } = useJapaneseStore();

  const [view, setView] = useState<View>('home');
  const [studyRow, setStudyRow] = useState<string | null>(null);

  if (!hydrated) {
    return (
      <main className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-gray-400">로딩 중...</div>
      </main>
    );
  }

  // 문자 학습 카드 데이터
  const getCharCards = (row?: string | null) => {
    let chars =
      characterType === 'both'
        ? [...hiragana, ...katakana]
        : characterType === 'hiragana'
          ? hiragana
          : katakana;

    if (row) {
      chars = chars.filter((c) => c.row === row);
    }

    return chars.map((c) => ({ type: 'character' as const, data: c }));
  };

  // 단어 학습 카드 데이터
  const getVocabCards = () => {
    let words = getVocabulary(selectedLevel);
    if (selectedCategory) {
      words = words.filter((w) => w.category === selectedCategory);
    }
    return words.map((w) => ({ type: 'vocab' as const, data: w }));
  };

  // 문자 학습 - 행 선택 시
  const handleSelectRow = (row: string) => {
    setStudyRow(row);
    setView('character-study');
  };

  // 홈 화면
  if (view === 'home') {
    return (
      <main className="min-h-screen p-4 md:p-6">
        <div className="max-w-lg mx-auto">
          {/* 헤더 */}
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
              <span className="font-japanese">日本語</span> 학습
            </h1>
            <p className="text-gray-500 text-sm">
              플래시카드로 일본어를 공부해요
            </p>
          </header>

          {/* 설정 */}
          <div className="flex justify-center mb-6">
            <SettingsPanel />
          </div>

          {/* 통계 */}
          <div className="mb-8">
            <StatsDisplay />
          </div>

          {/* 모드 선택 */}
          <div className="grid grid-cols-1 gap-4">
            {/* 문자 학습 */}
            <button
              type="button"
              onClick={() => {
                setStudyMode('characters');
                setView('character-grid');
              }}
              className="text-left p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-indigo-700 mb-1">
                    문자 학습
                  </h2>
                  <p className="text-sm text-indigo-500">
                    히라가나 & 카타카나 50음도
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    기본 46자 + 탁음/반탁음 25자
                  </p>
                </div>
                <span className="font-japanese text-4xl text-indigo-300 group-hover:scale-110 transition-transform">
                  あ
                </span>
              </div>
            </button>

            {/* 단어 학습 */}
            <button
              type="button"
              onClick={() => {
                setStudyMode('vocabulary');
                setView('vocab-categories');
              }}
              className="text-left p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-pink-700 mb-1">
                    단어 학습
                  </h2>
                  <p className="text-sm text-pink-500">
                    JLPT 수준별 일본어 단어
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    카테고리별 플래시카드 학습
                  </p>
                </div>
                <span className="font-japanese text-4xl text-pink-300 group-hover:scale-110 transition-transform">
                  漢
                </span>
              </div>
            </button>
          </div>

          {/* 푸터 */}
          <footer className="text-center text-xs text-gray-400 mt-12 pt-8 border-t border-gray-100">
            듀오링고 보조 학습 앱
          </footer>
        </div>
      </main>
    );
  }

  // 문자 격자 화면
  if (view === 'character-grid') {
    return (
      <main className="min-h-screen p-4 md:p-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => setView('home')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← 홈
            </button>
            <SettingsPanel />
          </div>

          {/* 문자 타입 선택 */}
          <div className="flex gap-2 justify-center mb-6">
            {(['hiragana', 'katakana', 'both'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setCharacterType(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  characterType === t
                    ? 'bg-indigo-500 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300'
                }`}
              >
                {t === 'hiragana' ? '히라가나' : t === 'katakana' ? '카타카나' : '전체'}
              </button>
            ))}
          </div>

          {/* 전체 학습 버튼 */}
          <div className="mb-6 text-center">
            <button
              type="button"
              onClick={() => {
                setStudyRow(null);
                setView('character-study');
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all"
            >
              전체 플래시카드 학습
            </button>
          </div>

          {/* 격자 */}
          {(characterType === 'hiragana' || characterType === 'both') && (
            <div className="mb-8">
              <CharacterGrid
                characters={hiragana}
                rows={hiraganaRows}
                title="히라가나 (ひらがな)"
                onSelectRow={handleSelectRow}
              />
            </div>
          )}
          {(characterType === 'katakana' || characterType === 'both') && (
            <CharacterGrid
              characters={katakana}
              rows={katakanaRows}
              title="카타카나 (カタカナ)"
              onSelectRow={handleSelectRow}
            />
          )}
        </div>
      </main>
    );
  }

  // 문자 플래시카드 학습
  if (view === 'character-study') {
    const cards = getCharCards(studyRow);
    const title = studyRow
      ? `${studyRow} 학습`
      : characterType === 'hiragana'
        ? '히라가나 전체'
        : characterType === 'katakana'
          ? '카타카나 전체'
          : '문자 전체';

    return (
      <main className="min-h-screen p-4 md:p-6">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-end mb-2">
            <SettingsPanel />
          </div>
          <FlashCardDeck
            items={cards}
            title={title}
            onBack={() => setView('character-grid')}
          />
        </div>
      </main>
    );
  }

  // 단어 카테고리 선택
  if (view === 'vocab-categories') {
    const categories = getCategories(selectedLevel);

    return (
      <main className="min-h-screen p-4 md:p-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => setView('home')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← 홈
            </button>
            <SettingsPanel />
          </div>

          <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
            단어 학습
          </h2>

          {/* JLPT 레벨 선택 */}
          <div className="mb-6">
            <LevelSelector selectedLevel={selectedLevel} onSelect={setLevel} />
          </div>

          {/* 카테고리 */}
          <CategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setCategory}
          />

          {/* 학습 시작 버튼 */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setView('vocab-study')}
              className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all"
            >
              학습 시작
            </button>
          </div>
        </div>
      </main>
    );
  }

  // 단어 플래시카드 학습
  if (view === 'vocab-study') {
    const cards = getVocabCards();
    const title = selectedCategory
      ? `${selectedLevel} - ${selectedCategory}`
      : `${selectedLevel} 전체`;

    return (
      <main className="min-h-screen p-4 md:p-6">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-end mb-2">
            <SettingsPanel />
          </div>
          <FlashCardDeck
            items={cards}
            title={title}
            onBack={() => setView('vocab-categories')}
          />
        </div>
      </main>
    );
  }

  return null;
}
