'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';

export default function Home() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 30);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: '#faf7ef', fontFamily: "'Manrope', sans-serif" }}>
            {/* Navigation */}
            <nav
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    background: isScrolled ? 'rgba(11, 17, 32, 0.95)' : 'rgba(11, 17, 32, 0.8)',
                    backdropFilter: 'blur(10px)',
                    padding: '12px 20px',
                }}
            >
                <div
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    {/* Logo */}
                    <div style={{ color: '#f5f1e6', fontWeight: 'bold', fontSize: '18px' }}>
                        Basava Ganguru
                    </div>

                    {/* Desktop Menu */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '30px',
                            alignItems: 'center',
                        }}
                        className="hidden md:flex"
                    >
                        <a href="#home" style={{ color: '#f5f1e6', textDecoration: 'none' }}>
                            Home
                        </a>
                        <a href="#about" style={{ color: '#f5f1e6', textDecoration: 'none' }}>
                            About
                        </a>
                        <a href="#plots" style={{ color: '#f5f1e6', textDecoration: 'none' }}>
                            Plots
                        </a>
                        <a href="tel:+919980061727" style={{ color: '#f5f1e6', textDecoration: 'none' }}>
                            Contact
                        </a>
                    </div>

                    {/* CTA Button Desktop */}
                    <a
                        href="tel:+919980061727"
                        style={{
                            background: 'linear-gradient(135deg, #e3be86, #b8894a)',
                            color: '#0b1120',
                            padding: '12px 24px',
                            borderRadius: '50px',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                        className="hidden md:flex"
                    >
                        <Phone size={18} />
                        Call Now
                    </a>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f5f1e6' }}
                        className="md:hidden"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div
                        style={{
                            background: 'rgba(11, 17, 32, 0.95)',
                            padding: '20px',
                            marginTop: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                        }}
                    >
                        <a href="#home" style={{ color: '#f5f1e6', textDecoration: 'none' }}>
                            Home
                        </a>
                        <a href="#about" style={{ color: '#f5f1e6', textDecoration: 'none' }}>
                            About
                        </a>
                        <a href="#plots" style={{ color: '#f5f1e6', textDecoration: 'none' }}>
                            Plots
                        </a>
                        <a href="tel:+919980061727" style={{ color: '#e3be86', fontWeight: 'bold' }}>
                            Call +91 99800 61727
                        </a>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section
                id="home"
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    paddingTop: '80px',
                    background: 'linear-gradient(135deg, #0b1120 0%, #1b2540 100%)',
                    color: '#f5f1e6',
                }}
            >
                <div
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: '0 20px',
                        width: '100%',
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 style={{ fontSize: 'clamp(32px, 6vw, 64px)', marginBottom: '20px', lineHeight: 1.2, fontWeight: 'bold' }}>
                            Premium Residential <span style={{ color: '#e3be86' }}>Layout</span>
                        </h1>
                        <p
                            style={{
                                fontSize: '18px',
                                marginBottom: '30px',
                                maxWidth: '600px',
                                color: 'rgba(245, 241, 230, 0.8)',
                                lineHeight: 1.6,
                            }}
                        >
                            32 Premium plots in Shivamogga, Karnataka. Starting from ₹2,300/sq.ft with complete home construction services.
                        </p>

                        {/* CTA Buttons */}
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '60px' }}>
                            <a
                                href="tel:+919980061727"
                                style={{
                                    background: 'linear-gradient(135deg, #e3be86, #b8894a)',
                                    color: '#0b1120',
                                    padding: '16px 30px',
                                    borderRadius: '50px',
                                    fontWeight: 'bold',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                }}
                            >
                                <Phone size={18} />
                                Call Now
                            </a>
                            <a
                                href="https://wa.me/919980061727"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    border: '1.5px solid rgba(245, 241, 230, 0.3)',
                                    color: '#f5f1e6',
                                    padding: '16px 30px',
                                    borderRadius: '50px',
                                    fontWeight: 'bold',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: 'rgba(245, 241, 230, 0.05)',
                                    backdropFilter: 'blur(6px)',
                                }}
                            >
                                <MessageCircle size={18} />
                                WhatsApp
                            </a>
                        </div>

                        {/* Stats */}
                        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                            <div>
                                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#e3be86' }}>32</div>
                                <div style={{ fontSize: '14px', color: 'rgba(245, 241, 230, 0.6)' }}>Total Plots</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#e3be86' }}>15+</div>
                                <div style={{ fontSize: '14px', color: 'rgba(245, 241, 230, 0.6)' }}>Years Experience</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#e3be86' }}>2.8k+</div>
                                <div style={{ fontSize: '14px', color: 'rgba(245, 241, 230, 0.6)' }}>Happy Families</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section
                id="about"
                style={{
                    padding: '80px 20px',
                    background: '#faf7ef',
                    color: '#0b1120',
                }}
            >
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 style={{ fontSize: '40px', marginBottom: '20px', fontWeight: 'bold' }}>About Basava Ganguru</h2>
                        <p style={{ fontSize: '16px', lineHeight: 1.8, maxWidth: '800px', color: '#555' }}>
                            Vijayalaxmi C Patil Developers & Promoters presents Basava Ganguru – a premium residential layout with 32 carefully planned plots. Located in Shivamogga, Karnataka, this development offers the perfect blend of modern living and traditional values.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Plots Section */}
            <section
                id="plots"
                style={{
                    padding: '80px 20px',
                    background: '#fff',
                    color: '#0b1120',
                }}
            >
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '40px', marginBottom: '40px', fontWeight: 'bold' }}>Plot Details</h2>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '20px',
                        }}
                    >
                        {[
                            { name: 'Plot Size', value: '900 - 1600 sqft' },
                            { name: 'Base Price', value: '₹2,300/sqft' },
                            { name: 'Registration', value: '₹25,000' },
                            { name: 'Road Width', value: '9m - 12m' },
                            { name: 'Total Plots', value: '32 Units' },
                            { name: 'Location', value: 'Shivamogga, KA' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                style={{
                                    background: '#f5f1e6',
                                    padding: '20px',
                                    borderRadius: '8px',
                                    textAlign: 'center',
                                }}
                            >
                                <div style={{ fontSize: '14px', color: '#b8894a', fontWeight: 'bold', marginBottom: '8px' }}>
                                    {item.name}
                                </div>
                                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{item.value}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Floating Action Buttons */}
            <div
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 50,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                }}
            >
                <motion.a
                    href="https://wa.me/919980061727"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: '#25D366',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        textDecoration: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <MessageCircle size={28} />
                </motion.a>
                <motion.a
                    href="tel:+919980061727"
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #e3be86, #b8894a)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0b1120',
                        textDecoration: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        fontWeight: 'bold',
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Phone size={28} />
                </motion.a>
            </div>
        </div>
    );
}