import type { Metadata } from 'next';
import './globals.css';
import { LenisProvider } from '@/components/LenisProvider';

export const metadata: Metadata = {
  title: 'Frontend Engineer Portfolio',
  description:
    'ユーザー体験を重視した、パフォーマンスに優れ、アクセシブルなWebアプリケーションを開発しています。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+JP:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=block"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg-offwhite font-sans text-text-black antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
