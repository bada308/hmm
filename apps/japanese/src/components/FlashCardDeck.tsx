'use client';

import { useState, useMemo, useCallback } from 'react';
import { FlashCard } from './FlashCard';
import { ProgressBar } from './ProgressBar';
import { useJapaneseStore } from '@/lib/store';
import { shuffle } from '@/utils/shuffle';
import type { Character, VocabWord, CardFilter } from '@/lib/types';

type CardItem =
  | { type: 'character'; data: Character }
  | { type: 'vocab'; data: VocabWord };

interface FlashCardDeckProps {
  items: CardItem[];
  title: string;
  onBack: () => void;
}

function getCardId(item: CardItem): string {
  if (item.type === 'character') {
    return `char-${item.data.type}-${item.data.romaji}`;
  }
  return item.data.id;
}

function getStatusColor(correctCount: number | undefined): string {
  if (correctCount === undefined || correctCount === 0) return 'border-blue-300';
  if (correctCount >= 3) return 'border-green-400';
  return 'border-amber-400';
}

const filterLabels: Record<CardFilter, string> = {
  all: '전체',
  new: '새 카드',
  learning: '학습 중',
  mastered: '완료',
};

export function FlashCardDeck({ items, title, onBack }: FlashCardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deckItems, setDeckItems] = useState(items);
  const { showRomaji, progress, markCorrect, markIncorrect, cardFilter, setCardFilter } =
    useJapaneseStore();

  const filteredItems = useMemo(() => {
    if (cardFilter === 'all') return deckItems;
    return deckItems.filter((item) => {
      const id = getCardId(item);
      const p = progress[id];
      if (cardFilter === 'new') return !p || p.status === 'new';
      if (cardFilter === 'learning') return p?.status === 'learning';
      if (cardFilter === 'mastered') return p?.status === 'mastered';
      return true;
    });
  }, [deckItems, cardFilter, progress]);

  const currentItem = filteredItems[currentIndex];
  const masteredCount = deckItems.filter((item) => {
    const p = progress[getCardId(item)];
    return p?.status === 'mastered';
  }).length;

  const handleShuffle = useCallback(() => {
    setDeckItems(shuffle(items));
    setCurrentIndex(0);
  }, [items]);

  const handlePrev = () => {
    setCurrentIndex((i) => (i > 0 ? i - 1 : filteredItems.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((i) => (i < filteredItems.length - 1 ? i + 1 : 0));
  };

  const handleCorrect = () => {
    if (!currentItem) return;
    markCorrect(getCardId(currentItem));
    if (currentIndex < filteredItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleIncorrect = () => {
    if (!currentItem) return;
    markIncorrect(getCardId(currentItem));
    if (currentIndex < filteredItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const cardFront = currentItem
    ? currentItem.type === 'character'
      ? {
          main: currentItem.data.character,
          romaji: currentItem.data.romaji,
        }
      : {
          main: currentItem.data.word,
          sub:
            currentItem.data.word !== currentItem.data.reading
              ? currentItem.data.reading
              : undefined,
          romaji: currentItem.data.romaji,
        }
    : { main: '' };

  const cardBack = currentItem
    ? currentItem.type === 'character'
      ? {
          meaning: currentItem.data.romaji,
          extra: `${currentItem.data.type === 'hiragana' ? '히라가나' : '카타카나'} - ${currentItem.data.row}`,
        }
      : {
          meaning: currentItem.data.meaning,
          extra: currentItem.data.word !== currentItem.data.reading
            ? `${currentItem.data.reading} (${currentItem.data.romaji})`
            : undefined,
        }
    : { meaning: '' };

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-12">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 text-sm text-gray-500 hover:text-gray-700"
        >
          ← 돌아가기
        </button>
        <p className="text-gray-400 text-lg">
          {cardFilter === 'all'
            ? '카드가 없습니다.'
            : `"${filterLabels[cardFilter]}" 필터에 해당하는 카드가 없습니다.`}
        </p>
        <button
          type="button"
          onClick={() => setCardFilter('all')}
          className="mt-4 text-indigo-500 hover:text-indigo-700 text-sm"
        >
          전체 보기
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {/* 상단 네비게이션 */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← 돌아가기
        </button>
        <h2 className="text-lg font-bold text-gray-700">{title}</h2>
        <button
          type="button"
          onClick={handleShuffle}
          className="text-sm text-indigo-500 hover:text-indigo-700"
        >
          섞기
        </button>
      </div>

      {/* 진행률 */}
      <ProgressBar
        current={masteredCount}
        total={deckItems.length}
        label="마스터 진행률"
      />

      {/* 필터 */}
      <div className="flex gap-2 mt-3 mb-5 justify-center">
        {(Object.keys(filterLabels) as CardFilter[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => {
              setCardFilter(f);
              setCurrentIndex(0);
            }}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              cardFilter === f
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {filterLabels[f]}
          </button>
        ))}
      </div>

      {/* 카드 */}
      <FlashCard
        key={`${getCardId(currentItem)}-${currentIndex}`}
        front={cardFront}
        back={cardBack}
        showRomaji={showRomaji}
        statusColor={getStatusColor(progress[getCardId(currentItem)]?.correctCount)}
        onCorrect={handleCorrect}
        onIncorrect={handleIncorrect}
      />

      {/* 카드 번호 + 좌우 이동 */}
      <div className="flex items-center justify-center gap-6 mt-5">
        <button
          type="button"
          onClick={handlePrev}
          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm text-gray-500">
          {currentIndex + 1} / {filteredItems.length}
        </span>
        <button
          type="button"
          onClick={handleNext}
          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
