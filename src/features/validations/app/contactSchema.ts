import { z } from 'zod';

export const ContactSchema = z.object({
    name: z.string().min(1, { message: 'お名前を記入してください' }),
    company: z.string(),
    email: z
        .string()
        .min(1, { message: 'メールアドレスを記入してください' })
        .email({ message: '正しいメールアドレスの形式を入力してください' })
        .max(100, { message: 'メールアドレスが長すぎます' }),
    content: z
        .string()
        .min(1, { message: 'お問い合わせ内容を記入してください' }),
});
export type ContactFormType = z.infer<typeof ContactSchema>;
