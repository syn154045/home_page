import { prisma } from '@/common/utils/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { token, email } = await req.json();

        if (!token || !email) {
            return NextResponse.json({ message: 'Token is required' }, { status: 400 });
        }

        const record = await prisma.verificationToken.findUnique({
            where: {
                identifier_token: {
                    identifier: email,
                    token: token,
                }
            },
        });
        
        if (!record) return NextResponse.json({ message: 'Invalid token or email' }, { status: 400 });

        if (new Date() >= record.expires) return NextResponse.json({ message: 'your token is expired' }, { status: 400 });
        
        await prisma.user.update({
            where: { email: record.identifier },
            data: { emailVerified: new Date() }
        });

        await prisma.verificationToken.delete({
            where: {
                identifier_token: {
                    identifier: email,
                    token: token,
                }
            }
        });

        return NextResponse.json({ message: 'Email verified successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
