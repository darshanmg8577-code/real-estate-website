import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { Manrope, Bricolage_Grotesque } from 'next/font/google';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });
const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage' });

export const metadata = {
    title: 'Basava Ganguru - Premium Residential Layout',
    description: 'Premium plots starting from ₹2300/sq.ft in Shivamogga, Karnataka',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className={`${manrope.variable} ${bricolage.variable}`}>
            <body style={{ margin: 0, padding: 0, fontFamily: 'var(--font-manrope, sans-serif)' }}>
                {children}
                <Toaster position="bottom-right" />
            </body>
        </html>
    );
}