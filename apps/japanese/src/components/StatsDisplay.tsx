'use client';

import { useJapaneseStore } from '@/lib/store';
import { hiragana } from '@/data/hiragana';
import { katakana } from '@/data/katakana';
import { getAllVocabulary } from '@/data/vocabulary';

export function StatsDisplay() {
  const { progress } = useJapaneseStore();

  const allChars = [...hiragana, ...katakana];
  const allVocab = getAllVocabulary();

  const charIds = allChars.map((c) => `char-${c.type}-${c.romaji}`);
  const charMastered = charIds.filter(
    (id) => progress[id]?.status === 'mastered'
  ).length;
  const charLearning = charIds.filter(
    (id) => progress[id]?.status === 'learning'
  ).length;

  const vocabMastered = allVocab.filter(
    (w) => progress[w.id]?.status === 'mastered'
  ).length;
  const vocabLearning = allVocab.filter(
    (w) => progress[w.id]?.status === 'learning'
  ).length;

  const totalStudied = charLearning + charMastered + vocabLearning + vocabMastered;

  if (totalStudied === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
        <div className="text-2xl font-bold text-indigo-600">
          {charMastered}
          <span className="text-sm text-gray-400 font-normal">
            /{allChars.length}
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-1">문자 마스터</div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
        <div className="text-2xl font-bold text-pink-500">
          {vocabMastered}
          <span className="text-sm text-gray-400 font-normal">
            /{allVocab.length}
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-1">단어 마스터</div>
      </div>
    </div>
  );
}
