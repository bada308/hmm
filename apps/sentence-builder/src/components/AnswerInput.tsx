'use client';

interface AnswerInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function AnswerInput({ value, onChange, onSubmit }: AnswerInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) onSubmit();
    }
  };

  return (
    <div className="space-y-3">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="영어 문장을 입력하세요..."
        className="w-full rounded-xl border-2 border-violet-200 bg-white p-4 text-base text-gray-800 placeholder-violet-300 outline-none transition-colors focus:border-violet-500 resize-none"
        rows={3}
        autoFocus
      />
      <button
        onClick={onSubmit}
        disabled={!value.trim()}
        className="w-full rounded-xl bg-violet-600 py-3 text-base font-semibold text-white transition-colors hover:bg-violet-700 active:bg-violet-800 disabled:bg-violet-300 disabled:cursor-not-allowed"
      >
        정답 확인
      </button>
    </div>
  );
}
