'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut } from 'lucide-react';

export default function AdminDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [stats, setStats] = useState({
        totalPlots: 0,
        available: 0,
        booked: 0,
        reserved: 0,
        sold: 0,
        totalLeads: 0,
    });
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

    const statCards = [
        { label: 'Total Plots', value: stats.totalPlots, bg: 'bg-blue-500' },
        { label: 'Available', value: stats.available, bg: 'bg-green-500' },
        { label: 'Booked', value: stats.booked, bg: 'bg-yellow-500' },
        { label: 'Reserved', value: stats.reserved, bg: 'bg-orange-500' },
        { label: 'Sold', value: stats.sold, bg: 'bg-red-500' },
        { label: 'Leads', value: stats.totalLeads, bg: 'bg-purple-500' },
    ];

    const navItems = [
        { label: 'Dashboard', href: '/basava-ganguru/admin', icon: '📊' },
        { label: 'Plots', href: '/basava-ganguru/admin/plots', icon: '🗺️' },
        { label: 'Leads', href: '/basava-ganguru/admin/leads', icon: '👥' },
        { label: 'Downloads', href: '/basava-ganguru/admin/downloads', icon: '📥' },
        { label: 'Analytics', href: '/basava-ganguru/admin/analytics', icon: '📈' },
        { label: 'Settings', href: '/basava-ganguru/admin/settings', icon: '⚙️' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f3f4f6' }}>
            {/* Sidebar */}
            <div
                style={{
                    width: sidebarOpen ? '240px' : '80px',
                    background: '#1f2937',
                    color: 'white',
                    padding: '20px',
                    transition: 'width 0.3s',
                    position: 'relative',
                    overflowY: 'auto',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    {sidebarOpen && <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>VCP Admin</h2>}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                    >
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            style={{
                                padding: '12px 12px',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                fontSize: '14px',
                            }}
                        >
                            <span>{item.icon}</span>
                            {sidebarOpen && item.label}
                        </Link>
                    ))}
                </nav>

                <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #374151' }}>
                    <button
                        style={{
                            padding: '12px',
                            borderRadius: '6px',
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            width: '100%',
                        }}
                    >
                        <LogOut size={20} />
                        {sidebarOpen && 'Logout'}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '30px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '30px', color: '#1f2937' }}>Dashboard</h1>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '20px',
                        }}
                    >
                        {statCards.map((card, i) => (
                            <div
                                key={i}
                                style={{
                                    background: 'white',
                                    padding: '20px',
                                    borderRadius: '8px',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                }}
                            >
                                <div
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '6px',
                                        marginBottom: '12px',
                                        background: card.bg,
                                    }}
                                />
                                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>{card.label}</p>
                                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937' }}>{card.value}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Quick Links */}
                <div style={{ marginTop: '50px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#1f2937' }}>
                        Quick Actions
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                        {navItems.slice(1).map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{
                                    background: '#3b82f6',
                                    color: 'white',
                                    padding: '12px',
                                    borderRadius: '6px',
                                    textDecoration: 'none',
                                    textAlign: 'center',
                                    fontWeight: '500',
                                }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}