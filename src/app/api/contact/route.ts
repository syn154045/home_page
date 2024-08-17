import ContactReceived from '@/emails/contactReceived';
import ContactSent from '@/emails/contactSent';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

interface ContactData {
    name: string;
    company?: string;
    email: string;
    content: string;
}

export async function POST(req: NextRequest) {
    try {
        const dataArr: ContactData = await req.json();
        const { name, company, email, content } = dataArr;
        console.log(process.env.RESEND_API_KEY);

        const resend = new Resend(process.env.RESEND_API_KEY);
        const resendFrom = process.env.RESEND_EMAIL_FROM as string;

        // お問い合わせ主に送信
        const { error: sendErr } = await resend.emails.send({
            from: resendFrom,
            to: email,
            subject: 'syn: お問い合わせ受理いたしました',
            react: ContactSent({
                contactName: name,
                company: company,
                ownerEmail: resendFrom,
                content: content,
            }),
        });
        if (sendErr) {
            throw new Error(`メール送信エラー1: ${sendErr.message}`);
        }

        // 管理者に送信
        const { error: receiveErr } = await resend.emails.send({
            from: resendFrom,
            to: resendFrom,
            subject: 'syn: お問い合わせを受信しました',
            react: ContactReceived({
                contactName: name,
                company: company,
                email: email,
                content: content,
            }),
        });
        if (receiveErr) {
            throw new Error(`メール送信エラー2: ${receiveErr.message}`);
        }

        return new NextResponse(JSON.stringify({ message: 'success' }), {
            status: 200,
        });
    } catch (error) {
        console.error(error);
        let errMessage = 'メール送信中にエラーが発生しました';

        if (error instanceof Error) {
            if (error.message.includes('API')) {
                errMessage = 'APIキーエラーが発生しました';
            } else if (error.message.includes('メールアドレス')) {
                errMessage = '無効なメールアドレスが指定されました';
            }
        }
        return new NextResponse(JSON.stringify({ message: errMessage }), {
            status: 500,
        });
    }
}
