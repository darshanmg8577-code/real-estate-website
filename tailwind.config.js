/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                navy: '#0F172A',
                gold: '#C89B3C',
                charcoal: '#1F2937',
                lightGrey: '#F5F5F5',
                darkGrey: '#E5E7EB',
            },
            fontFamily: {
                poppins: ['var(--font-poppins)', 'sans-serif'],
                inter: ['var(--font-inter)', 'sans-serif'],
            },
            fontSize: {
                'xs': ['0.75rem', { lineHeight: '1rem' }],
                'sm': ['0.875rem', { lineHeight: '1.25rem' }],
                'base': ['1rem', { lineHeight: '1.5rem' }],
                'lg': ['1.125rem', { lineHeight: '1.75rem' }],
                'xl': ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
                '5xl': ['3rem', { lineHeight: '1' }],
                '6xl': ['3.75rem', { lineHeight: '1' }],
                '7xl': ['4.5rem', { lineHeight: '1' }],
            },
            boxShadow: {
                'gold': '0 10px 30px rgba(200, 155, 60, 0.2)',
                'gold-lg': '0 20px 50px rgba(200, 155, 60, 0.3)',
                'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            },
            borderRadius: {
                'xl': '1.25rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            },
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
            animation: {
                'fadeInUp': 'fadeInUp 0.6s ease-out',
                'fadeInDown': 'fadeInDown 0.6s ease-out',
                'slideInLeft': 'slideInLeft 0.6s ease-out',
                'slideInRight': 'slideInRight 0.6s ease-out',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
            },
            backdropBlur: {
                'xs': '2px',
                'sm': '4px',
                'md': '8px',
                'lg': '12px',
                'xl': '16px',
            },
        },
    },
    plugins: [],
};

export default config;