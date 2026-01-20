'use client';

import { Button, Card } from '@repo/ui';
import { useAppStore } from '@repo/store';

export default function Home() {
  const { theme, toggleTheme } = useAppStore();

  return (
    <main className="min-h-screen p-8 flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold">HMM Monorepo</h1>
      <p className="text-gray-600">여러 가벼운 앱을 위한 모노레포</p>

      <Card className="max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">기술 스택</h2>
        <ul className="space-y-2 text-gray-700">
          <li>Next.js 15 + React 19</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
          <li>Turborepo</li>
          <li>Zustand (전역 상태 관리)</li>
        </ul>
      </Card>

      <Card className="max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Zustand 테스트</h2>
        <p className="mb-4">
          현재 테마: <span className="font-mono font-bold">{theme}</span>
        </p>
        <Button onClick={toggleTheme}>테마 토글</Button>
      </Card>

      <div className="flex gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
      </div>
    </main>
  );
}
