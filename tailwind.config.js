/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Customer – Tech Blue palette
                brand: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',   // primary blue
                    600: '#2563eb',   // active / CTA
                    700: '#1d4ed8',
                    800: '#1e3a8a',   // navy deep
                    900: '#172554',
                },
                // Vendor status colors (high contrast on white)
                status: {
                    pending: '#d97706', // amber-600
                    pendingBg: '#fffbeb',
                    accepted: '#1d4ed8', // blue-700
                    acceptedBg: '#eff6ff',
                    done: '#15803d', // green-700
                    doneBg: '#f0fdf4',
                    cancelled: '#6b7280', // gray-500
                    cancelledBg: '#f9fafb',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'card': '0 4px 20px rgba(0,0,0,0.04)',
                'card-hover': '0 8px 30px rgba(59,130,246,0.12)',
                'blue-glow': '0 4px 20px rgba(37,99,235,0.3)',
            },
        },
    },
    // Safelist ensures dynamically-constructed class strings (e.g. in ternaries)
    // are never purged by Tailwind JIT
    safelist: [
        { pattern: /^(bg|text|border|ring|from|to|via)-brand-(50|100|200|300|400|500|600|700|800|900)$/ },
        { pattern: /^(bg|text|border)-status-(pending|accepted|done|cancelled)(Bg)?$/ },
        'shadow-blue-glow',
        'shadow-card',
        'shadow-card-hover',
        // badge utility classes from index.css @apply
        'badge-pending',
        'badge-confirmed',
        'badge-completed',
        'badge-cancelled',
    ],
    plugins: [],
}
