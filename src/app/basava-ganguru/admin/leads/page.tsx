'use client';

import React, { useEffect, useState } from 'react';
import { Trash2, Phone, Mail } from 'lucide-react';

interface Lead {
    id: string;
    plot_id?: string;
    name: string;
    phone: string;
    email?: string;
    message?: string;
    status?: string;
    created_at?: string;
}

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const response = await fetch('/basava-ganguru/api/leads');
                const data = await response.json();
                setLeads(data || []);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeads();
    }, []);

    const filteredLeads = filter === 'All' ? leads : leads.filter((l) => l.status === filter);

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this lead?')) return;
        try {
            await fetch(`/basava-ganguru/api/leads?id=${id}`, { method: 'DELETE' });
            setLeads(leads.filter((l) => l.id !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div style={{ padding: '30px', background: '#f3f4f6', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>Leads Management</h1>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                    {['All', 'New', 'Interested', 'Contacted'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '6px',
                                border: 'none',
                                background: filter === status ? '#3b82f6' : '#e5e7eb',
                                color: filter === status ? 'white' : '#1f2937',
                                cursor: 'pointer',
                                fontWeight: '500',
                            }}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <p>Loading leads...</p>
                ) : (
                    <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '13px' }}>Name</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '13px' }}>Phone</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '13px' }}>Email</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '13px' }}>Status</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '13px' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLeads.map((lead) => (
                                    <tr key={lead.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                        <td style={{ padding: '12px 16px' }}>{lead.name}</td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <a
                                                href={`tel:${lead.phone}`}
                                                style={{ color: '#3b82f6', textDecoration: 'none', display: 'flex', gap: '6px', alignItems: 'center' }}
                                            >
                                                <Phone size={14} /> {lead.phone}
                                            </a>
                                        </td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <a
                                                href={`mailto:${lead.email}`}
                                                style={{ color: '#3b82f6', textDecoration: 'none', display: 'flex', gap: '6px', alignItems: 'center' }}
                                            >
                                                <Mail size={14} /> {lead.email || 'N/A'}
                                            </a>
                                        </td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', background: '#dbeafe', color: '#1e40af', fontWeight: '600' }}>
                                                {lead.status || 'New'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} onClick={() => handleDelete(lead.id)}>
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