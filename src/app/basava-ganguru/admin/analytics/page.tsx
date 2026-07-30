'use client';

import React, { useEffect, useState } from 'react';

interface Stats {
    total: number;
    available: number;
    booked: number;
    reserved: number;
    sold: number;
}

export default function AnalyticsPage() {
    const [stats, setStats] = useState<Stats>({ total: 0, available: 0, booked: 0, reserved: 0, sold: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/basava-ganguru/api/stats');
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statusData = [
        { label: 'Available', value: stats.available, color: '#10b981' },
        { label: 'Booked', value: stats.booked, color: '#3b82f6' },
        { label: 'Reserved', value: stats.reserved, color: '#f59e0b' },
        { label: 'Sold', value: stats.sold, color: '#ef4444' },
    ];

    const total = stats.total || 1;
    const getPercentage = (value: number) => ((value / total) * 100).toFixed(1);

    return (
        <div style={{ padding: '30px', background: '#f3f4f6', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px' }}>Analytics</h1>

                {loading ? (
                    <p>Loading analytics...</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        {/* Chart */}
                        <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Plot Distribution</h2>
                            {statusData.map((item) => (
                                <div key={item.label} style={{ marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ fontWeight: '500' }}>{item.label}</span>
                                        <span style={{ color: '#6b7280' }}>
                                            {item.value} ({getPercentage(item.value)}%)
                                        </span>
                                    </div>
                                    <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{ width: `${getPercentage(item.value)}%`, height: '100%', background: item.color }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Summary</h2>
                            {[
                                { label: 'Total Plots', value: stats.total },
                                { label: 'Available', value: stats.available },
                                { label: 'Booked', value: stats.booked },
                                { label: 'Reserved', value: stats.reserved },
                                { label: 'Sold', value: stats.sold },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    style={{
                                        paddingBottom: '12px',
                                        marginBottom: '12px',
                                        borderBottom: i < 4 ? '1px solid #e5e7eb' : 'none',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <span>{item.label}</span>
                                    <span style={{ fontWeight: 'bold' }}>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}