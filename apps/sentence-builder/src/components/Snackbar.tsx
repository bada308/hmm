'use client';

import { useEffect } from 'react';

interface SnackbarProps {
  message: string;
  visible: boolean;
  onHide: () => void;
}

export function Snackbar({ message, visible, onHide }: SnackbarProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onHide, 2000);
      return () => clearTimeout(timer);
    }
  }, [visible, onHide]);

  if (!visible) return null;

  return (
    <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 animate-slide-down">
      <div className="rounded-full bg-violet-700 px-5 py-2.5 text-sm font-medium text-white shadow-lg">
        {message}
      </div>
    </div>
  );
}
