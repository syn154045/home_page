import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const regionCode = searchParams.get('regionCode');
    
    if (!regionCode) {
        return NextResponse.json({ error: 'Region code is required' }, { status: 400 });
    }
    
    try {
        // OpenWeather APIリクエスト
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${regionCode}&appid=${process.env.OPENWEATHER_API_KEY}`);
        const weatherData = await res.json();
        
        return NextResponse.json({ weatherData });
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}