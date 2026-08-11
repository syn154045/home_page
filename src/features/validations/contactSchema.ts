import * as v from 'valibot';

export const ContactFormSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty('氏名を入力してください')),
  company: v.string(),
  email: v.pipe(
    v.string(),
    v.email(),
    v.nonEmpty('メールアドレスを入力してください')
  ),
  content: v.pipe(v.string(), v.nonEmpty('お問い合わせ内容を入力してください')),
});

export type ContactFormType = v.InferOutput<typeof ContactFormSchema>;
