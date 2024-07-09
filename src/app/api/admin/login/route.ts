import { prisma } from '@/common/utils/prismadb';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { email, password } = data;

    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
        });
        if (!user || !password) throw new Error('ユーザーが見つかりません');
        if (user?.password) {
            const isCorrectPassword = await bcrypt.compare(
                password,
                user.password,
            );
            if (!isCorrectPassword) {
                throw new Error('パスワードが誤っています');
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return new NextResponse(JSON.stringify({ errors: error.message }), {
                status: 400,
            });
        }
    }
    return new NextResponse(JSON.stringify({ message: 'Success' }), {
        status: 201,
    });
}
