import { prisma } from '@/common/utils/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const blogs = await prisma.blog.findMany({
            include: {
                tags: true,
                blog_tag: true,
            },
        });

        return NextResponse.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blogs...' },
            { status: 500 },
        );
    }
}
