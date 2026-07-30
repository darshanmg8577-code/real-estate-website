import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

export const metadata = {
    title: 'Basava Ganguru - Premium Residential Layout',
    description: 'Premium plots starting from ₹2300/sq.ft in Shivamogga, Karnataka',
};

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
            <Toaster position="bottom-right" />
        </>
    );
}