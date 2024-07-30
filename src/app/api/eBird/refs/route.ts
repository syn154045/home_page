import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const parentCode = searchParams.get('parentCode') || '';

    let endpoint = '';
    switch (type) {
        case 'country':
            endpoint = 'https://api.ebird.org/v2/ref/region/list/country/world';
            break;
        case 'subnational1':
            endpoint = `https://api.ebird.org/v2/ref/region/list/subnational1/${parentCode}`;
            break;
        case 'subnational2':
            endpoint = `https://api.ebird.org/v2/ref/region/list/subnational2/${parentCode}`;
            break;
        default:
            return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    try {
        const response = await fetch(endpoint, {
            headers: {
                'X-eBirdApiToken': process.env.EBIRD_API_KEY || '',
            },
        });
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(`Error fetching ${type} data:`, error);
        return NextResponse.json({ error: `Failed to fetch ${type} data` }, { status: 500 });
    }
}