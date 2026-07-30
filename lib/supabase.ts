import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase configuration');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions
export interface Plot {
    id: string;
    plot_number: number;
    status: string;
    facing?: string;
    road_width?: string;
    length?: number;
    breadth?: number;
    area_sqft?: number;
    area_sqm?: number;
    base_price?: number;
    registration_cost?: number;
    maintenance?: number;
    total_cost?: number;
    svg_polygon_points?: string;
    featured?: boolean;
    latitude?: number;
    longitude?: number;
    notes?: string;
    created_at?: string;
    updated_at?: string;
}

export interface InterestedLead {
    id?: string;
    plot_id?: string;
    name: string;
    email?: string;
    phone: string;
    message?: string;
    status?: string;
    ip_address?: string;
    device_info?: string;
    browser_info?: string;
    source?: string;
    created_at?: string;
}

export interface BrochureDownload {
    id?: string;
    name: string;
    email?: string;
    phone?: string;
    plot_viewed?: string;
    device_info?: string;
    browser_info?: string;
    location?: string;
    downloaded_at?: string;
}

export interface Settings {
    id?: string;
    base_price_per_sqft?: number;
    registration_cost?: number;
    company_name?: string;
    company_phone?: string;
    company_email?: string;
    company_location?: string;
    google_maps_url?: string;
}

// Plot API
export const plotsAPI = {
    async getAll(): Promise<Plot[]> {
        const { data, error } = await supabase
            .from('plots')
            .select('*')
            .order('plot_number');
        if (error) throw error;
        return data || [];
    },

    async getStats(): Promise<{
        total: number;
        available: number;
        booked: number;
        reserved: number;
        sold: number;
    }> {
        const { data, error } = await supabase
            .from('plots')
            .select('status');
        if (error) throw error;
        const plots = data || [];
        return {
            total: plots.length,
            available: plots.filter((p: any) => p.status === 'Available').length,
            booked: plots.filter((p: any) => p.status === 'Booked').length,
            reserved: plots.filter((p: any) => p.status === 'Reserved').length,
            sold: plots.filter((p: any) => p.status === 'Sold').length,
        };
    },

    async update(plot: Partial<Plot>): Promise<void> {
        const { error } = await supabase
            .from('plots')
            .update(plot)
            .eq('id', plot.id);
        if (error) throw error;
    },

    async delete(id: string): Promise<void> {
        const { error } = await supabase
            .from('plots')
            .delete()
            .eq('id', id);
        if (error) throw error;
    },
};

// Leads API
export const leadsAPI = {
    async create(lead: InterestedLead): Promise<InterestedLead> {
        const { data, error } = await supabase
            .from('interested_leads')
            .insert([lead])
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async getAll(): Promise<InterestedLead[]> {
        const { data, error } = await supabase
            .from('interested_leads')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data || [];
    },

    async delete(id: string): Promise<void> {
        const { error } = await supabase
            .from('interested_leads')
            .delete()
            .eq('id', id);
        if (error) throw error;
    },
};

// Brochure API
export const brochureAPI = {
    async recordDownload(download: BrochureDownload): Promise<BrochureDownload> {
        const { data, error } = await supabase
            .from('brochure_downloads')
            .insert([download])
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async getAll(): Promise<BrochureDownload[]> {
        const { data, error } = await supabase
            .from('brochure_downloads')
            .select('*')
            .order('downloaded_at', { ascending: false });
        if (error) throw error;
        return data || [];
    },
};

// Settings API
export const settingsAPI = {
    async get(): Promise<Settings> {
        const { data, error } = await supabase
            .from('settings')
            .select('*')
            .single();
        if (error) throw error;
        return data;
    },

    async update(settings: Partial<Settings>): Promise<void> {
        const current = await this.get();
        const { error } = await supabase
            .from('settings')
            .update(settings)
            .eq('id', current.id);
        if (error) throw error;
    },
};