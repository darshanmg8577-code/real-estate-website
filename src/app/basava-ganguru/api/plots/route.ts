import { NextRequest, NextResponse } from 'next/server';
import { plotsAPI } from '@/lib/supabase';

export async function GET(request: NextRequest) {
    try {
        const plots = await plotsAPI.getAll();
        return NextResponse.json(plots);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to fetch plots' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const data = await request.json();
        await plotsAPI.update(data);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to update plot' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) throw new Error('Plot ID required');

        await plotsAPI.delete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to delete plot' }, { status: 500 });
    }
}