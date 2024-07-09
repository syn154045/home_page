// // import NextAuth, { NextAuthOptions } from 'next-auth';
// // import { PrismaAdapter } from '@auth/prisma-adapter';
// // import { prisma } from './prismadb';
// // import { PrismaClient } from '@prisma/client';
// import { getUserByEmail } from '@/features/db/admin/login';
// import bcrypt from 'bcrypt';
// import { loginSchema } from '@/features/validations/admin/loginSchema';
// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { authConfig } from './auth.config';

// export const { handlers, signIn, signOut, auth } = NextAuth({
//     ...authConfig,
//     // adapter: PrismaAdapter(prisma),
//     session: { strategy: 'jwt' },
//     providers: [
//         CredentialsProvider({
//             credentials: {
//                 email: {},
//                 password: {},
//             },
//             async authorize(credentials) {
//                 const parsedCredentials = loginSchema.safeParse(credentials);

//                 if (parsedCredentials.success) {
//                     const { email, password } = parsedCredentials.data;
//                     const user = await getUserByEmail(email);

//                     if (!user) return null;

//                     const passwordMatch = await bcrypt.compare(password, user.password);

//                     if (passwordMatch) return user;
//                 }

//                 return null;
//             },
//         }),
//     ],
// });
