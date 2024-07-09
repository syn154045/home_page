import { z } from 'zod';

export const signUpSchema = z
    .object({
        email: z
            .string()
            .min(1, { message: 'メールアドレスを入力してください' })
            .email({ message: '無効なメールアドレス形式です' }),
        password: z
            .string()
            .min(4, { message: 'パスワードを4文字以上入力してください' }),
        passwordConfirm: z.string(),
    })
    .superRefine(({ password, passwordConfirm }, ctx) => {
        if (password !== passwordConfirm) {
            ctx.addIssue({
                code: 'custom',
                message: 'パスワードが一致しません',
                path: ['passwordConfirm'],
            });
        }
    });

export const loginSchema = z.object({
    email: z.string().email({ message: 'メールアドレスを入力してください' }),
    password: z.string().min(4, { message: 'パスワードを入力してください' }),
});
