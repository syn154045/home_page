import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import configPrettier from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
// import pluginTailwindcss from "eslint-plugin-tailwindcss"; // tailwindCSS v4未対応
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  // 1. global ignores
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },

  // 2. js rule
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // 3. ts rule
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ], // 未使用の変数を警告するが、引数名が _ で始まるものは無視する
      '@typescript-eslint/no-explicit-any': 'warn', // any型は警告
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: false,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
          allowConciseArrowFunctionExpressionsStartingWithVoid: false,
        },
      ], // 関数の戻り値の型を明示することを推奨するが、例外を許可

      'no-unused-vars': 'off', // jsの未使用変数ルールを無効化
    },
  },

  // 4. react rule
  pluginReact.configs.flat.recommended,
  {
    files: ['**/*.{jsx,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/prop-types': 'off', // typescriptを使用しているためprop-typesは無効化
      'react/react-in-jsx-scope': 'off', // Next.jsでは不要
    },
  },

  // 5. import plugin
  {
    plugins: { import: pluginImport },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
        node: true,
      },
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            'internal',
            ['parent', 'sibling'],
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: 'next', group: 'external', position: 'before' },
            { pattern: '@/**', group: 'internal', position: 'before' },
          ],
          pathGroupsExcludedImportTypes: ['react', 'next/**'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-duplicates': 'error',
      'import/newline-after-import': 'warn',
      'import/no-unresolved': 'warn',
    },
  },

  // 6. tailwindcss plugin
  // ...pluginTailwindcss.configs['flat/recommended'],
  // {
  //   settings: {
  //     tailwindcss: {
  //       config: 'renderer/tailwind.config.js',
  //     },
  //   },
  // },

  // 7. js extends
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      eqeqeq: ['warn', 'always', { null: 'ignore' }], // == を使用する場合は、nullを無視する
      curly: ['warn', 'all'], // if, for, while, do-whileなどのブロックは常に中括弧で囲む
    },
  },

  // 8. prettier plugin
  {
    plugins: { prettier: pluginPrettier },
    rules: {
      'prettier/prettier': 'warn',
    },
  },
  configPrettier,
]);
