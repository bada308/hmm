'use client';

import { useState } from 'react';

interface FlashCardProps {
  front: {
    main: string;
    sub?: string;
    romaji?: string;
  };
  back: {
    meaning: string;
    extra?: string;
  };
  showRomaji: boolean;
  statusColor?: string;
  onCorrect?: () => void;
  onIncorrect?: () => void;
}

export function FlashCard({
  front,
  back,
  showRomaji,
  statusColor = 'border-blue-300',
  onCorrect,
  onIncorrect,
}: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleCorrect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCorrect?.();
    setIsFlipped(false);
  };

  const handleIncorrect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onIncorrect?.();
    setIsFlipped(false);
  };

  return (
    <div className="perspective w-full max-w-sm mx-auto">
      <div
        className={`relative w-full h-72 cursor-pointer preserve-3d transition-transform duration-500 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={handleFlip}
      >
        {/* 앞면 */}
        <div
          className={`absolute inset-0 backface-hidden rounded-2xl border-2 ${statusColor} bg-white shadow-lg flex flex-col items-center justify-center p-6`}
        >
          <div className="font-japanese text-6xl font-bold text-gray-800 mb-3">
            {front.main}
          </div>
          {front.sub && (
            <div className="font-japanese text-xl text-gray-500 mb-2">
              {front.sub}
            </div>
          )}
          {showRomaji && front.romaji && (
            <div className="text-sm text-indigo-400 mt-1">{front.romaji}</div>
          )}
          <div className="absolute bottom-3 text-xs text-gray-300">
            탭해서 뒤집기
          </div>
        </div>

        {/* 뒷면 */}
        <div
          className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border-2 ${statusColor} bg-gradient-to-br from-indigo-50 to-pink-50 shadow-lg flex flex-col items-center justify-center p-6`}
        >
          <div className="text-3xl font-bold text-gray-800 mb-2">
            {back.meaning}
          </div>
          {back.extra && (
            <div className="text-sm text-gray-500 mt-2">{back.extra}</div>
          )}

          {/* 알아요/모르겠어요 버튼 */}
          {(onCorrect || onIncorrect) && (
            <div className="absolute bottom-4 flex gap-3">
              <button
                type="button"
                onClick={handleIncorrect}
                className="px-5 py-2 bg-red-100 text-red-600 rounded-full text-sm font-medium hover:bg-red-200 transition-colors"
              >
                모르겠어요
              </button>
              <button
                type="button"
                onClick={handleCorrect}
                className="px-5 py-2 bg-green-100 text-green-600 rounded-full text-sm font-medium hover:bg-green-200 transition-colors"
              >
                알아요
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
