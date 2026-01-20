'use client';

import { useState } from 'react';
import type { Goal } from '@/lib/types';

interface GoalCellProps {
  goal: Goal;
  isCenter: boolean;
  onUpdate: (updates: Partial<Omit<Goal, 'id'>>) => void;
  onToggleComplete: () => void;
}

export function GoalCell({ goal, isCenter, onUpdate, onToggleComplete }: GoalCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({ text: e.target.value });
  };

  const handleRewardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ reward: e.target.value || undefined });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      setShowReward(false);
    }
  };

  return (
    <div
      className={`
        relative group aspect-square border rounded-lg p-2 transition-all cursor-pointer
        ${isCenter
          ? 'bg-greenery-400 border-greenery-500 text-white'
          : goal.completed
            ? 'bg-greenery-100 border-greenery-300'
            : 'bg-white border-gray-200 hover:border-greenery-300'
        }
      `}
      onClick={() => !isEditing && setIsEditing(true)}
      onKeyDown={handleKeyDown}
    >
      {isEditing ? (
        <div className="absolute inset-0 p-2 z-10 bg-white border-2 border-greenery-400 rounded-lg shadow-lg">
          <textarea
            autoFocus
            value={goal.text}
            onChange={handleTextChange}
            onBlur={() => !showReward && setIsEditing(false)}
            placeholder={isCenter ? '핵심 목표' : '목표 입력'}
            className="w-full h-[60%] text-sm resize-none border-0 focus:outline-none text-gray-800"
          />
          <div className="absolute bottom-2 left-2 right-2 space-y-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowReward(!showReward);
              }}
              className="text-xs text-greenery-600 hover:text-greenery-700"
            >
              {showReward ? '보상 숨기기' : '+ 보상 추가'}
            </button>
            {showReward && (
              <input
                type="text"
                value={goal.reward || ''}
                onChange={handleRewardChange}
                onBlur={() => {
                  setShowReward(false);
                  setIsEditing(false);
                }}
                placeholder="보상 (선택)"
                className="w-full text-xs px-2 py-1 border border-gray-200 rounded focus:outline-none focus:border-greenery-400"
              />
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="h-full flex flex-col">
            <p
              className={`
                text-xs leading-tight flex-1 overflow-hidden
                ${isCenter ? 'font-semibold text-center flex items-center justify-center' : ''}
                ${!goal.text ? 'text-gray-400 italic' : ''}
              `}
            >
              {goal.text || (isCenter ? '핵심 목표' : '클릭하여 입력')}
            </p>
            {goal.reward && (
              <p className="text-[10px] text-greenery-600 mt-1 truncate">
                🎁 {goal.reward}
              </p>
            )}
          </div>

          {!isCenter && goal.text && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleComplete();
              }}
              className={`
                absolute top-1 right-1 w-5 h-5 rounded-full border-2
                flex items-center justify-center text-xs
                transition-colors
                ${goal.completed
                  ? 'bg-greenery-400 border-greenery-400 text-white'
                  : 'border-gray-300 hover:border-greenery-400'
                }
              `}
            >
              {goal.completed && '✓'}
            </button>
          )}
        </>
      )}
    </div>
  );
}
