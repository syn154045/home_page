import { prisma } from '@/common/utils/prismadb';
import VerifyEmail from '@/emails/verifyEmail';
import { signUpSchema } from '@/features/validations/admin/loginSchema';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

interface RegisterData {
    userName: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export async function POST(req: NextRequest) {
    const data: RegisterData = await req.json();
    const { userName, email, password } = data;

    // メールアドレス重複確認とバリデーションを同時に行う
    const [user, validationResult] = await Promise.all([
        prisma.user.findFirst({ where: { email } }),
        signUpSchema.safeParseAsync(data),
    ]);

    let errors = validationResult.success
        ? {}
        : validationResult.error.flatten().fieldErrors;
    //スプレッド構文で広げてから代入
    if (user) {
        errors.email = [
            ...(errors.email || []),
            'このメールアドレスは既に使用されています',
        ];
    }

    if (Object.keys(errors).length > 0) {
        return new NextResponse(JSON.stringify({ errors }), { status: 400 });
    }

    // パスワードをハッシュ化してユーザーを作成
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data: {
            email: email,
            password: hashedPassword,
        },
    });
    
    // メール送信
    const token = randomBytes(32).toString('hex');
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);
    
    await prisma.verificationToken.create({
        data: {
            identifier: email,
            token: token,
            expires: expires,
        }
    });
    
    const resend = new Resend(process.env.RESEND_API_KEY);
    const resendFrom = process.env.RESEND_EMAIL_FROM as string;
    
    resend.emails.send({
        from: resendFrom,
        to: email,
        subject: 'E-mail verification',
        react: VerifyEmail({ username: userName, email:encodeURIComponent(email), verifyCode: token }),
    })

    return new NextResponse(JSON.stringify({ message: 'Success' }), {
        status: 201,
    });
}
