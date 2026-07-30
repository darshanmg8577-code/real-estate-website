'use client';

import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

interface DownloadItem {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    plot_viewed?: string;
    device_info?: string;
    browser_info?: string;
    location?: string;
    downloaded_at: string;
}

export default function DownloadsPage() {
    const [downloads, setDownloads] = useState<DownloadItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDownloads = async () => {
            try {
                const response = await fetch('/basava-ganguru/api/downloads');
                const data = await response.json();
                setDownloads(data || []);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDownloads();
    }, []);

    const handleExportCSV = () => {
        const csv = [
            ['Name', 'Email', 'Phone', 'Date'],
            ...downloads.map((d) => [
                d.name,
                d.email || '',
                d.phone || '',
                new Date(d.downloaded_at).toLocaleDateString(),
            ]),
        ]
            .map((row) => row.join(','))
            .join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'downloads.csv';
        a.click();
    };

    return (
        <div style={{ padding: '30px', background: '#f3f4f6', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Brochure Downloads</h1>
                    <button
                        onClick={handleExportCSV}
                        style={{
                            background: '#10b981',
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
                        <Download size={18} /> Export CSV
                    </button>
                </div>

                {loading ? (
                    <p>Loading downloads...</p>
                ) : (
                    <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '13px' }}>Name</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '13px' }}>Email</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '13px' }}>Phone</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '13px' }}>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {downloads.map((download) => (
                                    <tr key={download.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                        <td style={{ padding: '12px 16px' }}>{download.name}</td>
                                        <td style={{ padding: '12px 16px' }}>{download.email || 'N/A'}</td>
                                        <td style={{ padding: '12px 16px' }}>{download.phone || 'N/A'}</td>
                                        <td style={{ padding: '12px 16px' }}>{new Date(download.downloaded_at).toLocaleDateString()}</td>
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