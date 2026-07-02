import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                brand: {
                    yellow: '#F6D400',
                    orange: '#F39C12',
                    red: '#D62828',
                    green: '#4CAF50',
                    black: '#222222',
                    white: '#FFFFFF',
                },
                earth: {
                    50: '#FDFAF2',
                    100: '#F9F3E0',
                    200: '#EDE0C4',
                    800: '#3D2C1A',
                    900: '#1E1608',
                }
            }
        },
    },

    plugins: [forms],
};
