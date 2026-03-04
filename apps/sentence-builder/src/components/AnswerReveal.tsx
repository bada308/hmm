'use client';

interface AnswerRevealProps {
  userInput: string;
  correctAnswer: string;
  onSelfAssess: (result: 'correct' | 'close' | 'wrong') => void;
}

export function AnswerReveal({ userInput, correctAnswer, onSelfAssess }: AnswerRevealProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="rounded-xl bg-violet-50 p-4">
          <p className="mb-1 text-xs font-medium text-violet-400">내가 쓴 문장</p>
          <p className="text-base text-gray-700">{userInput}</p>
        </div>
        <div className="rounded-xl bg-violet-100 p-4">
          <p className="mb-1 text-xs font-medium text-violet-500">정답</p>
          <p className="text-base font-semibold text-violet-800">{correctAnswer}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onSelfAssess('correct')}
          className="flex-1 rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600 active:bg-emerald-700"
        >
          맞았어요
        </button>
        <button
          onClick={() => onSelfAssess('close')}
          className="flex-1 rounded-xl bg-amber-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-600 active:bg-amber-700"
        >
          비슷해요
        </button>
        <button
          onClick={() => onSelfAssess('wrong')}
          className="flex-1 rounded-xl bg-rose-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-600 active:bg-rose-700"
        >
          틀렸어요
        </button>
      </div>
    </div>
  );
}
