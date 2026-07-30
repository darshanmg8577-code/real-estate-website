'use client';

import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';

interface SettingsData {
    base_price_per_sqft?: number;
    registration_cost?: number;
    company_name?: string;
    company_phone?: string;
    company_email?: string;
}

export default function SettingsPage() {
    const [settings, setSettings] = useState<SettingsData>({
        base_price_per_sqft: 2300,
        registration_cost: 25000,
        company_name: 'Vijayalaxmi C Patil Developers',
        company_phone: '+91 99800 61727',
        company_email: 'anilkrui223@gmail.com',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch('/basava-ganguru/api/settings');
                const data = await response.json();
                setSettings(data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSettings((prev) => ({
            ...prev,
            [name]: name.includes('price') || name.includes('cost') ? Number(value) : value,
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch('/basava-ganguru/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });
            alert('Settings saved!');
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setSaving(false);
        }
    };

    if (loading)
        return (
            <div style={{ padding: '30px' }}>
                <p>Loading...</p>
            </div>
        );

    return (
        <div style={{ padding: '30px', background: '#f3f4f6', minHeight: '100vh' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px' }}>Settings</h1>

                <div style={{ background: 'white', padding: '30px', borderRadius: '8px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>Base Price per Sq.ft</label>
                        <input
                            type="number"
                            name="base_price_per_sqft"
                            value={settings.base_price_per_sqft || 0}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>Registration Cost</label>
                        <input
                            type="number"
                            name="registration_cost"
                            value={settings.registration_cost || 0}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>Company Name</label>
                        <input
                            type="text"
                            name="company_name"
                            value={settings.company_name || ''}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>Phone</label>
                        <input
                            type="tel"
                            name="company_phone"
                            value={settings.company_phone || ''}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>Email</label>
                        <input
                            type="email"
                            name="company_email"
                            value={settings.company_email || ''}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        style={{
                            width: '100%',
                            background: '#3b82f6',
                            color: 'white',
                            padding: '12px',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: '600',
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: saving ? 0.6 : 1,
                        }}
                    >
                        <Save size={18} /> {saving ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </div>
        </div>
    );
}