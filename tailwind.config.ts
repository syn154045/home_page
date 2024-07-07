import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";


const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/common/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mPlusRounded: ["var(--font-mplusrounded)"],
        ubuntuMono: ["var(--font-ubuntumono)"],
        redditMono: ["var(--font-redditmono)"],
      },
      colors: {
        admin: {
          base: '#B4B4B8',
          main: '#C7C8CC',
          accent: '#E3E1D9',
          accent2: '#F2EFE5',
          text: {
            main: '#4B4B47',
            sub: '#3C3C39'
          }
        },
        app: {
          base: '#48555C',
          main: '#B7AAA3',
          accent: '#4EFFEF',
          accent2: '#00A7F5',
          text: {
            main: '#C5C5C5',
            sub: '#A9A9A9',
          }
        },
        elem: {
          alert: '#F34336', // fa8072
          success: '#8fbc8f', // 73fa80
          info: '#8f8fbd', // 8073fa
        },
      },
      screens: {
        'pc': '1280px',
        'tablet': '600px',  // ipad mini 基準->768px (if you need big-tablet->1024px)
        'phone': '360px',   // iphone 基準->375px (min:320px)
      },
      aspectRatio: {
        standardH: '4 / 3',
        standardV: '3 / 4',
        videoH: '12 / 9',
        videoV: '9 / 12',
        cinema: '12 / 5',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    // library plugin
    require('@tailwindcss/typography'),
    // static utilities
    plugin(function({ addUtilities }) {
      addUtilities({
        "hidden-scrollbar": {
          '-ms-overflow-style': 'none',   // IE, Edge
          'scrollbar-width': 'none',      // firefox
          '&::-webkit-scrollbar': {
            'display': 'none',          // Chrome, Safari
          }
        }
      });
    }),
    // dynamic utilites
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "grid-cols-auto-fill": (value) => ({
            gridTemplateColumns: `repeat(auto-fill, minmax(${value}, 1fr))`,
          }),
        },
        { values: theme("spacing") }
      );
      matchUtilities(
        {
          "fluid-text": (value) => ({
            fontSize: ``,
          }),
        },
        { values: theme("spacing") }
      );
    }),
  ],
};

export default config;
