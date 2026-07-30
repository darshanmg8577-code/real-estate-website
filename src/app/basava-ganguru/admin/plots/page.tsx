'use client';

import React, { useEffect, useState } from 'react';
import { Trash2, Edit2, Plus } from 'lucide-react';

interface Plot {
    id: string;
    plot_number: number;
    status: string;
    area_sqft?: number;
    total_cost?: number;
}

export default function PlotsPage() {
    const [plots, setPlots] = useState<Plot[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchPlots = async () => {
            try {
                const response = await fetch('/basava-ganguru/api/plots');
                const data = await response.json();
                setPlots(data || []);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPlots();
    }, []);

    const filteredPlots = plots.filter((p) => p.plot_number?.toString().includes(search) || p.status?.toLowerCase().includes(search.toLowerCase()));

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this plot?')) return;
        try {
            await fetch(`/basava-ganguru/api/plots?id=${id}`, { method: 'DELETE' });
            setPlots(plots.filter((p) => p.id !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div style={{ padding: '30px', background: '#f3f4f6', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Plots Management</h1>
                    <button
                        style={{
                            background: '#3b82f6',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'center',
                        }}
                    >
                        <Plus size={18} /> Add Plot
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Search plots..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px 15px',
                        marginBottom: '20px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px',
                    }}
                />

                {loading ? (
                    <p>Loading plots...</p>
                ) : (
                    <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '13px' }}>Plot #</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '13px' }}>Status</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '13px' }}>Area (sqft)</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '13px' }}>Price</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '13px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPlots.map((plot) => (
                                    <tr key={plot.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                        <td style={{ padding: '12px 16px' }}>#{plot.plot_number}</td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <span
                                                style={{
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '12px',
                                                    background:
                                                        plot.status === 'Available'
                                                            ? '#dcfce7'
                                                            : plot.status === 'Booked'
                                                                ? '#dbeafe'
                                                                : plot.status === 'Reserved'
                                                                    ? '#fef3c7'
                                                                    : '#fee2e2',
                                                    color:
                                                        plot.status === 'Available'
                                                            ? '#166534'
                                                            : plot.status === 'Booked'
                                                                ? '#1e40af'
                                                                : plot.status === 'Reserved'
                                                                    ? '#b45309'
                                                                    : '#991b1b',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                {plot.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px 16px' }}>{plot.area_sqft?.toLocaleString()}</td>
                                        <td style={{ padding: '12px 16px' }}>₹{(plot.total_cost || 0).toLocaleString()}</td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <button style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', padding: '4px', marginRight: '8px' }}>
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                                                onClick={() => handleDelete(plot.id)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}