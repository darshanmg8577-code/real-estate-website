export function convertSqftToSqm(sqft: number): number {
    return Math.round(sqft / 10.764);
}

export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(value);
}

export function getStatusColor(status: string): string {
    const colors: Record<string, string> = {
        'Available': '#10b981',
        'Booked': '#3b82f6',
        'Reserved': '#f59e0b',
        'Sold': '#ef4444',
    };
    return colors[status] || '#6b7280';
}

export function isValidPhone(phone: string): boolean {
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone);
}

export function searchPlots(plots: any[], query: string): any[] {
    if (!query) return plots;
    const lowerQuery = query.toLowerCase();
    return plots.filter(
        (plot) =>
            plot.plot_number?.toString().includes(query) ||
            plot.status?.toLowerCase().includes(lowerQuery) ||
            plot.facing?.toLowerCase().includes(lowerQuery)
    );
}