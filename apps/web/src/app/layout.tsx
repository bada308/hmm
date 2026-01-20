import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HMM - Monorepo',
  description: 'A collection of lightweight apps',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
