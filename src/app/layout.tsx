import { JSX } from 'react';
import type { Metadata } from 'next';
import { MPlusRounded, UbuntuMono, RedditMono } from '@/common/utils/fonts';
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
        className={`${MPlusRounded.variable} ${UbuntuMono.variable} ${RedditMono.variable} antialiased bg-neutral-50 text-neutral-900 min-h-full`}
      >
        {children}
      </body>
    </html>
  );
}
