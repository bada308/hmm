import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '만다라트 - 신년 계획',
  description: '목표를 시각화하고 달성하세요',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
