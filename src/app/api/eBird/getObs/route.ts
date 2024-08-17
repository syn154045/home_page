import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const regionCode = searchParams.get('regionCode');

    if (!regionCode) {
        return NextResponse.json(
            { error: 'Region code is required' },
            { status: 400 },
        );
    }

    try {
        // eBird APIリクエスト
        const res = await fetch(
            `https://api.ebird.org/v2/data/obs/${regionCode}/recent`,
            {
                headers: {
                    'X-eBirdApiToken': process.env.EBIRD_API_KEY || '',
                },
            },
        );
        const ebirdData = await res.json();

        return NextResponse.json({ ebirdData });
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch data' },
            { status: 500 },
        );
    }
}
