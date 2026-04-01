/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Simplified neutral palette
                brand: {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827',
                },
                // Status colors (minimal)
                status: {
                    pending: '#d97706', // amber
                    pendingBg: '#fffbeb',
                    accepted: '#374151', // gray
                    acceptedBg: '#f3f4f6',
                    done: '#15803d', // green
                    doneBg: '#f0fdf4',
                    cancelled: '#6b7280', // gray
                    cancelledBg: '#f9fafb',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'card': '0 4px 20px rgba(0,0,0,0.04)',
                'card-hover': '0 8px 30px rgba(0,0,0,0.08)',
                'blue-glow': '0 4px 20px rgba(0,0,0,0.15)',
            },
        },
    },
    safelist: [
        { pattern: /^(bg|text|border|ring|from|to|via)-brand-(50|100|200|300|400|500|600|700|800|900)$/ },
        { pattern: /^(bg|text|border)-status-(pending|accepted|done|cancelled)(Bg)?$/ },
        'shadow-blue-glow',
        'shadow-card',
        'shadow-card-hover',
        'badge-pending',
        'badge-confirmed',
        'badge-completed',
        'badge-cancelled',
    ],
    plugins: [],
}
