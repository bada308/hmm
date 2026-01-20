'use client';

import { useState } from 'react';
import { FileUpload, TabDisplay } from '@/components';
import { parseMusicXML } from '@/lib/musicxml-parser';
import { convertToTab } from '@/lib/tab-converter';
import type { BassTab } from '@/lib/types';

export default function Home() {
  const [tab, setTab] = useState<BassTab | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileLoad = (content: string) => {
    try {
      setError(null);
      const parsed = parseMusicXML(content);
      const bassTab = convertToTab(parsed);
      setTab(bassTab);
    } catch (e) {
      setError(e instanceof Error ? e.message : '파일 변환 중 오류가 발생했습니다');
      setTab(null);
    }
  };

  const handleError = (errorMsg: string) => {
    setError(errorMsg);
    setTab(null);
  };

  const handleReset = () => {
    setTab(null);
    setError(null);
  };

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">🎸 Bass Tab Converter</h1>
          <p className="text-gray-500 text-sm">MusicXML 파일을 베이스 탭 악보로 변환</p>
        </header>

        {!tab && <FileUpload onFileLoad={handleFileLoad} onError={handleError} />}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {tab && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="text-sm text-gray-500 hover:text-bass-600 transition-colors"
              >
                다른 파일 변환
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 overflow-x-auto">
              <TabDisplay tab={tab} />
            </div>
          </div>
        )}

        <footer className="text-center text-xs text-gray-400 pt-4">
          MusicXML 파일은 MuseScore, Finale, Sibelius 등에서 내보낼 수 있습니다
        </footer>
      </div>
    </main>
  );
}
