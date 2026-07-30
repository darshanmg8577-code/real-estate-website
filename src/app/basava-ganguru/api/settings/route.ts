import { NextRequest, NextResponse } from 'next/server';
import { settingsAPI } from '@/lib/supabase';

export async function GET(request: NextRequest) {
    try {
        const settings = await settingsAPI.get();
        return NextResponse.json(settings);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const data = await request.json();
        await settingsAPI.update(data);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
