import { NextRequest, NextResponse } from 'next/server';
import { brochureAPI } from '@/lib/supabase';

export async function GET(request: NextRequest) {
    try {
        const downloads = await brochureAPI.getAll();
        return NextResponse.json(downloads || []);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to fetch downloads' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const result = await brochureAPI.recordDownload(data);
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to record download' }, { status: 500 });
    }
}
