'use client';

import type { Phase, Sentence } from '@/lib/types';
import { HintChips } from './HintChips';
import { AnswerInput } from './AnswerInput';
import { AnswerReveal } from './AnswerReveal';

interface PracticeCardProps {
  sentence: Sentence;
  phase: Phase;
  userInput: string;
  onInputChange: (value: string) => void;
  onStartWriting: () => void;
  onSubmitAnswer: () => void;
  onSelfAssess: (result: 'correct' | 'close' | 'wrong') => void;
}

export function PracticeCard({
  sentence,
  phase,
  userInput,
  onInputChange,
  onStartWriting,
  onSubmitAnswer,
  onSelfAssess,
}: PracticeCardProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      {/* 한국어 원문 */}
      <div className={phase === 'writing' ? 'mb-4' : 'mb-6'}>
        <p
          className={`font-semibold text-gray-800 leading-relaxed ${
            phase === 'writing' ? 'text-base' : 'text-lg'
          }`}
        >
          {sentence.korean}
        </p>
      </div>

      {/* Phase: reading - 어순 힌트 + 시작 버튼 */}
      {phase === 'reading' && (
        <div className="space-y-5">
          <HintChips wordOrder={sentence.wordOrder} hints={sentence.hints} />
          <button
            onClick={onStartWriting}
            className="w-full rounded-xl bg-violet-600 py-3 text-base font-semibold text-white transition-colors hover:bg-violet-700 active:bg-violet-800"
          >
            문장 만들기
          </button>
        </div>
      )}

      {/* Phase: writing - 컴팩트 힌트 + 입력 */}
      {phase === 'writing' && (
        <div className="space-y-4">
          <HintChips wordOrder={sentence.wordOrder} hints={sentence.hints} compact />
          <AnswerInput value={userInput} onChange={onInputChange} onSubmit={onSubmitAnswer} />
        </div>
      )}

      {/* Phase: revealed - 정답 비교 + 자기평가 */}
      {phase === 'revealed' && (
        <AnswerReveal
          userInput={userInput}
          correctAnswer={sentence.answer}
          onSelfAssess={onSelfAssess}
        />
      )}
    </div>
  );
}
