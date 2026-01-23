'use client';

import { useCallback, useState, useRef, useEffect } from 'react';
import type { CellType } from '@/lib/types';
import type { ThemeColors } from '@/lib/themes';

interface CellProps {
  type: CellType;
  value: string;
  theme: ThemeColors;
  completed?: boolean;
  readOnly?: boolean;
  onChange?: (value: string) => void;
  onToggleComplete?: () => void;
}

export function Cell({
  type,
  value,
  theme,
  completed = false,
  readOnly = false,
  onChange,
  onToggleComplete,
}: CellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  const handleClick = useCallback(() => {
    if (readOnly) return;
    setIsEditing(true);
  }, [readOnly]);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    if (editValue !== value && onChange) {
      onChange(editValue);
    }
  }, [editValue, value, onChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleBlur();
      }
      if (e.key === 'Escape') {
        setEditValue(value);
        setIsEditing(false);
      }
    },
    [handleBlur, value]
  );

  const getBackgroundColor = () => {
    switch (type) {
      case 'main':
        return theme.primary;
      case 'sub':
        return theme.secondary;
      case 'action':
        return completed ? theme.secondary : theme.background;
    }
  };

  const getFontWeight = () => {
    switch (type) {
      case 'main':
        return 'font-bold';
      case 'sub':
        return 'font-semibold';
      default:
        return 'font-normal';
    }
  };

  const getFontSize = () => {
    switch (type) {
      case 'main':
        return 'text-sm md:text-base';
      case 'sub':
        return 'text-xs md:text-sm';
      default:
        return 'text-xs';
    }
  };

  return (
    <div
      className={`
        relative w-full aspect-square p-1
        flex items-center justify-center
        border rounded-lg
        transition-all duration-200
        ${readOnly ? 'cursor-default' : 'cursor-pointer hover:shadow-md'}
        ${completed ? 'opacity-70' : ''}
      `}
      style={{
        backgroundColor: getBackgroundColor(),
        borderColor: theme.border,
      }}
      onClick={handleClick}
    >
      {type === 'action' && !readOnly && value && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleComplete?.();
          }}
          className={`
            absolute top-1 right-1 w-4 h-4 md:w-5 md:h-5
            rounded-full border-2 transition-all
            flex items-center justify-center
            ${completed ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300 hover:border-gray-400'}
          `}
        >
          {completed && (
            <svg
              className="w-2.5 h-2.5 md:w-3 md:h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>
      )}

      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`
            w-full h-full resize-none
            bg-transparent text-center
            outline-none
            ${getFontSize()} ${getFontWeight()}
          `}
          style={{ color: theme.text }}
        />
      ) : (
        <span
          className={`
            text-center break-words overflow-hidden
            ${getFontSize()} ${getFontWeight()}
            ${completed ? 'line-through' : ''}
          `}
          style={{ color: theme.text }}
        >
          {value || (
            <span
              style={{ color: theme.textLight }}
              className="opacity-50"
            >
              {type === 'main' ? '핵심 목표' : type === 'sub' ? '세부 목표' : '실행 항목'}
            </span>
          )}
        </span>
      )}
    </div>
  );
}
