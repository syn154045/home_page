import type { Metadata } from 'next';
import { MPlusRounded, UbuntuMono, RedditMono } from '~/utils/fonts';
import './globals.css';

export const metadata: Metadata = {
    title: {
        template: '%s | Ornith Tech',
        default: 'Ornith Tech',
    },
    description: '野鳥の行動生態学について研究しています',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body
                className={`${MPlusRounded.variable} ${UbuntuMono.variable} ${RedditMono.variable} ${MPlusRounded.className}`}
            >
                {children}
            </body>
        </html>
    );
}
