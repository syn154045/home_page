import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const regionCode = searchParams.get('regionCode');
    const species = searchParams.get('species');

    if (!regionCode) {
        return NextResponse.json(
            { error: 'Region code is required' },
            { status: 400 },
        );
    }
    if (!species) {
        return NextResponse.json(
            { error: 'Species is required' },
            { status: 400 },
        );
    }

    try {
        const res = await fetch(
            `https://api.ebird.org/v2/data/obs/${regionCode}/recent/${species}`,
            {
                headers: {
                    'X-eBirdApiToken': process.env.EBIRD_API_KEY || '',
                },
            },
        );
        const data = await res.json();

        return NextResponse.json({ data });
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch data' },
            { status: 500 },
        );
    }
}
