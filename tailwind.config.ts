import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";


const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
          base: '#f9f9ed', // ivory
          main: '#7d84b2', // cool gray
          accent: '#d9dbf1', // lavender
          accent2: '#8e9dcc', // vista blue
        },
        app: {
          base: '#071952',
          main: '#0B666A',
          accent: '#97FEED',
          accent2: '#35A29F',
          text: {
            main: '#ffffff',
            sub: '#fefefe',
          }
        },
        elem: {
          alert: '#bd8f8f', // fa8072
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
