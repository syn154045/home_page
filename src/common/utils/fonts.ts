import { M_PLUS_Rounded_1c, Reddit_Mono, Ubuntu_Mono } from "next/font/google";

export const MPlusRounded = M_PLUS_Rounded_1c ({
    weight: ['100', '300', '400', '500', '700', '800', '900'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-mplusrounded',
    adjustFontFallback: false,
});

export const UbuntuMono = Ubuntu_Mono ({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
    style: ['italic', 'normal'],
    variable: '--font-ubuntumono',
    adjustFontFallback: false,
});

export const RedditMono = Reddit_Mono ({
    weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-redditmono',
    adjustFontFallback: false,
});