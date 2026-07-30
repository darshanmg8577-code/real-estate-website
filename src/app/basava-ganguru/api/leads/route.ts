
import { NextRequest, NextResponse } from 'next/server';
import { leadsAPI } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, message, plot_id } = body;

        if (!name || !phone) {
            return NextResponse.json({ error: 'Name and phone required' }, { status: 400 });
        }

        const lead = {
            plot_id,
            name,
            email,
            phone,
            message,
            status: 'New',
        };

        const result = await leadsAPI.create(lead);
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to submit lead' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const leads = await leadsAPI.getAll();
        return NextResponse.json(leads || []);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) throw new Error('Lead ID required');

        await leadsAPI.delete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
    }
}