import { NextRequest, NextResponse } from 'next/server';
import { plotsAPI, leadsAPI, brochureAPI } from '@/lib/supabase';

export async function GET(request: NextRequest) {
    try {
        const [plotStats, leads, downloads] = await Promise.all([
            plotsAPI.getStats(),
            leadsAPI.getAll(),
            brochureAPI.getAll(),
        ]);

        return NextResponse.json({
            ...plotStats,
            totalLeads: leads?.length || 0,
            downloads: downloads?.length || 0,
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 });
    }
}