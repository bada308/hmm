'use client';

import { useJapaneseStore } from '@/lib/store';
import { getVocabulary } from '@/data/vocabulary';

interface CategorySelectorProps {
  categories: string[];
  selectedCategory: string | null;
  onSelect: (cat: string | null) => void;
}

export function CategorySelector({
  categories,
  selectedCategory,
  onSelect,
}: CategorySelectorProps) {
  const { selectedLevel, progress } = useJapaneseStore();
  const allWords = getVocabulary(selectedLevel);

  const getCategoryProgress = (cat: string) => {
    const words = allWords.filter((w) => w.category === cat);
    const mastered = words.filter((w) => progress[w.id]?.status === 'mastered').length;
    return { mastered, total: words.length };
  };

  return (
    <div className="space-y-2">
      {/* 전체 보기 */}
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
          selectedCategory === null
            ? 'bg-indigo-50 border-2 border-indigo-300 text-indigo-700'
            : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-medium">전체 단어</span>
          <span className="text-xs text-gray-400">{allWords.length}개</span>
        </div>
      </button>

      {categories.map((cat) => {
        const { mastered, total } = getCategoryProgress(cat);
        const percentage = total === 0 ? 0 : Math.round((mastered / total) * 100);

        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelect(cat)}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-50 border-2 border-indigo-300 text-indigo-700'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{cat}</span>
              <span className="text-xs text-gray-400">
                {mastered}/{total} ({percentage}%)
              </span>
            </div>
            {/* 미니 진행률 바 */}
            <div className="w-full bg-gray-100 rounded-full h-1 mt-2">
              <div
                className="h-1 rounded-full bg-gradient-to-r from-pink-400 to-indigo-500 transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
