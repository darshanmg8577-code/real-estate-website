import { ReactNode } from 'react';
import { Bricolage_Grotesque, Manrope, IBM_Plex_Mono } from 'next/font/google';

// Font imports MUST be at layout level (server component)
const display = Bricolage_Grotesque({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    variable: '--font-display',
});

const body = Manrope({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    variable: '--font-body',
});

const mono = IBM_Plex_Mono({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    variable: '--font-mono',
});

export const metadata = {
    title: 'Basava Ganguru - Premium Residential Layout',
    description: 'Premium plots starting from ₹2300/sq.ft in Shivamogga, Karnataka',
};

export default function BasavaLayout({ children }: { children: ReactNode }) {
    return (
        <div className={`${display.variable} ${body.variable} ${mono.variable}`}>
            {children}
        </div>
    );
}