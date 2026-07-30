import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

export const metadata = {
    title: 'Basava Ganguru - Premium Residential Layout',
    description: 'Premium plots starting from ₹2300/sq.ft in Shivamogga, Karnataka',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                {children}
                <Toaster position="bottom-right" />
            </body>
        </html>
    );
}