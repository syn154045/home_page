import { z } from 'zod';

export const signUpSchema = z.object({
    email: z
        .string()
        .email({ message: 'メールアドレスを入力してください' }),
    password: z
        .string()
        .min(4, { message: 'パスワードを入力してください'}),
});

export const loginSchema = z.object({
    email: z
        .string()
        .email({ message: 'メールアドレスを入力してください' }),
    password: z
        .string()
        .min(4, { message: 'パスワードを入力してください'}),
});