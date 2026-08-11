import { JSX } from 'react';
import type { Metadata } from 'next';
import BgTest2 from '@/components/layouts/BgTest2';
import { Footer } from '@/components/layouts/Footer';
import { Header } from '@/components/layouts/Header';
import { MPlusRounded, ZenMaru, DmSans, UbuntuMono } from '@/utils/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | syn:',
    default: 'syn:',
  },
  description: 'something good.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="ja">
      <body
        className={`${MPlusRounded.variable} ${ZenMaru.variable} ${DmSans.variable} ${UbuntuMono.variable} antialiased bg-primary-900 text-primary-50 text-base leading-[1.25]`}
      >
        <main className="font-mplusrounded min-h-screen">
          <BgTest2 />
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}

// TODO:
// 最初にアクセスをしたときに、画面中央に
// 「> welcome!」 という文字をタイピングし、フェードアウト
