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
        async jwt({ token, trigger, user }) {
            if (trigger === 'signIn') {
                // token.role = user.role;
                // token.emailVerified = user.emailVerfied ? user.emailVerfied : null;
            }

            if (trigger === 'update') {
                const dbData = await prisma.user.findUnique({
                    where: { id: token.sub },
                });

                if (dbData === null) return token;
                token.name = dbData.name;
                token.email = dbData.email;
                token.picture = dbData.image;
                // token.emailVerified = dbData.emailVerified;
            }
            return token;
        },
        // async redirect({ url, baseUrl }) {
        //     return baseUrl + '/admin';
        // },
    },
});

export { handler as GET, handler as POST };
