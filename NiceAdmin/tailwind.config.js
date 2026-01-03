/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#4154f1', // NiceAdmin Blue
                secondary: '#6c757d',
                success: '#198754',
                danger: '#dc3545',
                warning: '#ffc107',
                info: '#0dcaf0',
                light: '#f6f9ff',
                dark: '#444444',
            },
            fontFamily: {
                sans: ['"Open Sans"', 'sans-serif'],
                display: ['"Nunito"', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
