import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DAアルゴリズムと公立高校併願制について学べるサイト',
  description:
    'DAアルゴリズム（受け入れ保留アルゴリズム）を用いた併願制のメリットを体験できるシミュレーション',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
