/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React strict mode for better error detection
    reactStrictMode: true,

    // Image optimization
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: '**.cloudinary.com',
            },
        ],
        formats: ['image/avif', 'image/webp'],
    },

    // Performance optimizations
    poweredByHeader: false,
    compress: true,
    generateEtags: true,

    // Security headers
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                ],
            },
        ];
    },

    // Redirects for SEO
    async redirects() {
        return [
            {
                source: '/home',
                destination: '/',
                permanent: true,
            },
        ];
    },

    // Rewrites for API routes
    async rewrites() {
        return {
            beforeFiles: [],
            afterFiles: [],
        };
    },

    // Webpack configuration
    webpack: (config, { isServer }) => {
        config.optimization = {
            ...config.optimization,
            splitChunks: {
                ...config.optimization.splitChunks,
                chunks: 'all',
            },
        };
        return config;
    },

    // Environment variables
    env: {
        NEXT_PUBLIC_PHONE: '+919980061727',
        NEXT_PUBLIC_EMAIL: 'anilkrui223@gmail.com',
        NEXT_PUBLIC_WHATSAPP_URL: 'https://wa.me/919980061727',
    },

    // Experimental features for better performance
    experimental: {
        scrollRestoration: true,
    },
};

module.exports = nextConfig;