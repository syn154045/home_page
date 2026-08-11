import {
  DM_Sans,
  M_PLUS_Rounded_1c,
  Ubuntu_Mono,
  Zen_Maru_Gothic,
} from 'next/font/google';

// sans jap
export const MPlusRounded = M_PLUS_Rounded_1c({
  weight: ['100', '300', '400', '500', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mplusrounded',
  adjustFontFallback: false,
});

// rounded jap
export const ZenMaru = Zen_Maru_Gothic({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-zenmaru',
  adjustFontFallback: false,
});

// sans font
export const DmSans = DM_Sans({
  weight: ['100', '200', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dmsans',
  adjustFontFallback: false,
});

// mono font
export const UbuntuMono = Ubuntu_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  style: ['italic', 'normal'],
  variable: '--font-ubuntumono',
  adjustFontFallback: false,
});
