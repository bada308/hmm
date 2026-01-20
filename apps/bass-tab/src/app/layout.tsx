import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bass Tab Converter',
  description: 'MusicXML을 베이스 탭 악보로 변환',
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
