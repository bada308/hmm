'use client';

import { useState } from 'react';

interface ExportButtonsProps {
  onExportPNG: () => Promise<void>;
  onExportPDF: () => Promise<void>;
}

export function ExportButtons({ onExportPNG, onExportPDF }: ExportButtonsProps) {
  const [isExporting, setIsExporting] = useState<'png' | 'pdf' | null>(null);

  const handleExport = async (type: 'png' | 'pdf') => {
    setIsExporting(type);
    try {
      if (type === 'png') {
        await onExportPNG();
      } else {
        await onExportPDF();
      }
    } finally {
      setIsExporting(null);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => handleExport('png')}
        disabled={isExporting !== null}
        className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200
                   text-gray-700 text-sm font-medium transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center gap-2"
      >
        {isExporting === 'png' ? (
          <span className="animate-spin">⏳</span>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )}
        PNG
      </button>
      <button
        type="button"
        onClick={() => handleExport('pdf')}
        disabled={isExporting !== null}
        className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200
                   text-gray-700 text-sm font-medium transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center gap-2"
      >
        {isExporting === 'pdf' ? (
          <span className="animate-spin">⏳</span>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        )}
        PDF
      </button>
    </div>
  );
}
