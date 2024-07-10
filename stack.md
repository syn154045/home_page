# Next.js

- Launched: 24/06/15

## todo list
- ADMIN
  - 登録時、メール送信認証でemail-verifiedを設置
- APP
  - ページのイメージ感の整理

# color palette...
```ts:tailwind.config.ts
theme: { extend: { colors: {

    natural: {
        base: '#FFFFEC', // ivory
        main: '#F1E4C3', // dutch white
        accent: '#C6A969', // ecru
        accent2: '#597E52', // fern green
        text: {
            main: '#333',
            sub: '#222',
        },
    },
    neon: {
        base: '#071952',
        main: '#0B666A',
        accent: '#97FEED',
        accent2: '#35A29F',
        text: {
        main: '#ffffff',
        sub: '#fefefe',
        }
    },
    monotone: {
        base: '#48555C',
        main: '#B7AAA3',
        accent: '#4EFFEF',
        accent2: '#00A7F5',
        text: {
            main: '#C5C5C5',
            sub: '#FFFEF6',
        }
    },
    purpule: {
        base: '#5A639C',
        main: '#7776B3',
        accent: '#9B86BD',
        accent2: '#E2BBE9',
        text: {
            main: '#FFFFFF',
            sub: '#FFFFFF'
        }
    }
    

},},}
```

# Done List
## NextAuth (v4)
```ts: src/app/api/auth/[...nextauth]/route.ts
/**
 * next-authのプロバイダ設定（2024/7/10現在、ひとまず完成形）
 */
import { prisma } from '@/common/utils/prismadb';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            /**
             * !! credentialsProvider使用時の注意事項 !!
             *   (ref: https://qiita.com/t0riumi/items/e98fe312371e520e710f)
             *
             * - Passwordを使用した認証ではsession管理にDBは使えません
             * - ユーザー登録は独自実装する必要があり、他のプロバイダとの併用は危険
             *   （他のプロバイダで登録されたEmailでは登録できないようにするならまだ。。）
             * - ユーザー情報の更新では、session.update() -> jwtコールバックでのupdateトリガーで情報を更新する必要あり
             *   （忘れると、ログインしなおすまで情報が更新されない）
             * - sessionコールバックは多数実行されるため、jwt情報を活用するようにtoken引数の値を詰めた方が良い
             */
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                let user = null; // `try`ブロックの外で`user`を宣言
                try {
                    // メールアドレス存在チェック
                    user = await prisma.user.findUnique({
                        where: { email: credentials?.email },
                    });
                    if (!user) {
                        return null;
                    }
                } catch (error) {
                    return null; // エラーが発生した場合はnullを返す
                }
                return user;
            },
        }),
        // TODO: google OAUTHを使用
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        // }),
    ],
    pages: {
        signIn: '/admin/login',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
      // TODO: JWT・SESSIONのコールバック
        // async jwt({ token, trigger, user }) {
        //     if (trigger === 'signIn') {
        //         // token.role = user.role;
        //         // token.emailVerified = user.emailVerfied ? user.emailVerfied : null;
        //     }
        //     if (trigger === 'update') {
        //         const dbData = await prisma.user.findUnique({
        //             where: { id: token.sub },
        //         });
        //         if (dbData === null) return token;
        //         token.name = dbData.name;
        //         token.email = dbData.email;
        //         token.picture = dbData.image;
        //         // token.emailVerified = dbData.emailVerified;
        //     }
        //     return token;
        // },
        // async redirect({ url, baseUrl }) {
        //     return baseUrl + '/admin';
        // },
    },
});

export { handler as GET, handler as POST };
```
```ts: src/common/utils/prismadb.ts
/**
 * prisma clientの生成
 */
import { PrismaClient } from '@prisma/client';

// const prisma = () => {
//     return new PrismaClient();
// };

// declare const globalThis: {
//     prismaGlobal: ReturnType<typeof prismaClientSingleton>;
// } & typeof global;

// const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// export default prisma;

// if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

// 現在の設定：
const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma || new PrismaClient();

```
**************************************************
> 以下は試行錯誤の履歴として掲載..
```ts: src/common/utils/auth.config.ts
/**
 * next-authのコンフィグを分ける場合
 * ※ルートディレクトリに置かれることが多そう
 */
import { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const publicRoutes: string[] = ['/'];
            const adminRoutes: string[] = ['/admin/register', '/admin/login'];
            const isLoggedIn = !!auth?.user;
            const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
            const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
            
            if (isAdminRoute) {
                if (isLoggedIn) {
                    return Response.redirect(new URL("/", nextUrl));
                }
                return true;
            }
            
            if (!isPublicRoute && !isLoggedIn) {
                return false;
            }
            
            return true;
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith(baseUrl)) return url;
            return baseUrl;
        }
    },
    providers: [],
```
```ts: src/common/utils/auth.ts
/**
 * auth.configからさらに切り出す場合
 */

import { getUserByEmail } from '@/features/db/admin/login';
import bcrypt from 'bcrypt';
import { loginSchema } from '@/features/validations/admin/loginSchema';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    session: { strategy: 'jwt' },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const parsedCredentials = loginSchema.safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUserByEmail(email);

                    if (!user) return null;

                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (passwordMatch) return user;
                }

                return null;
            },
        }),
    ],
});

```
```ts: src/common/utils/middleware.ts
/**
 * roleが複数ある、一般ユーザーと管理ユーザーなど複数の階層がある場合
 * ※ルートディレクトリに置かれることが多そう
 */
import { withAuth } from 'next-auth/middleware';

export default withAuth({
    // Matches the pages config in `[...nextauth]`
    pages: {
        signIn: '/admin/login',
    },
    callbacks: {
        authorized: ({ token }) => !!token,
    }
});

export const config = { matcher: ['/admin/:path*'] };

```

## Prisma
```bash
npm run dev
npx prisma init --datasource-provider sqlite
    Next steps:
    1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
    2. Run prisma db pull to turn your database schema into a Prisma schema.
    3. Run prisma generate to generate the Prisma Client. You can then start querying your database.
npx prisma generate
npx prisma migrate dev --name init
```
```.env
User: postgres
Password: pass
Host: localhost
Port: 5432
Database name: myapp
Schema name: public
DATABASE_URL=postgresql://root:pass@localhost:5432/mydb?schema=public
```

## TailwindCSS plugin
### tailwind typography
- refs
[tailwind typography](https://github.com/tailwindlabs/tailwindcss-typography)
- install
``` bash
npm install -D @tailwindcss/typography
```
- add config setting
```ts:tailwind.config.ts
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    + require('@tailwindcss/typography'),
    // ...
  ],
}
```
- how to use
```tsx
<div className="prose">
    <h1>title</h1>
    <p>body.</p>
</div>
```

### tailwind-variants
- refs
[]()


## TailwindCSS Eslint & prettier
- install
```bash
npm i -D eslint-plugin-tailwndcss prettier
```

- add config setting
```json:package.json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    + "fix": "next lint --fix",
    + "format": "prettier --write src",
    + "ff": "npm run format && npm run fix"
  },
```
```json:.eslintc.json
{
  "root": true,
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "next",
    "next/core-web-vitals",
    "plugin:tailwindcss/recommended"
  ],
  "plugins": [
    "tailwindcss"
  ],
  "settings": {
    "config": "./tailwind.config.ts",
    "groupByResponsive": true
  }
}
```
[prettier options](https://prettier.io/docs/en/options#jsx-quotes)
```mjs:.prettierrc.mjs
export default {
    // クォーテーションをシングルに変更 (default: false)
    singleQuote: true,
    // タブインデントを４に変更 (default: 2)
    tabWidth: 4
}
```
```.prettierignore
# Node modules
node_modules/

# Build directories
build/
dist/
out/

# Next.js specific
.next/
.vercel/

# Logs
logs/
*.log

# Dependency directories
bower_components/

# Test coverage
coverage/

# Generated files
*.min.js
*.min.css

# Config files
*.config.js
*.config.ts

# Markdown files (optional)
*.md

# Ignore specific folders
public/
static/

# Ignore specific file types
*.svg
*.png
*.jpg
*.jpeg

# Ignore specific files
.env
.DS_Store

# Ignore all hidden files
.*
```

- runコマンド
```bash
npm run ff
```

## 