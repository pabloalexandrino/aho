/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: [
            {
                light: {
                    ...require('daisyui/src/colors/themes')[
                        '[data-theme=dark]'
                        ],
                    primary: '#6AD70E',
                    'primary-content': '#000100',
                    success: '#2DCD46',
                    'secondary-content': '#000100',
                    // error: '#EF4444',
                    error: '#B30000',
                    '.text-glow': {
                        //add glow to title
                        'text-shadow': '0 0 10px #6AD70E, 0 0 10px #6AD70E',
                    },
                    '.box-glow': {
                        //add glow to box
                        'box-shadow': '0 0 2px #6AD70E, 0 0 8px #6AD70E',
                    },
                    '.box-red-glow': {
                        //add glow to box
                        'box-shadow': '0 0 40px #B30000, 0 0 20px #B30000',
                    },
                    '.bg-gradient': {
                        'background-image': 'linear-gradient(90deg,#560911 0%, #9A2C3B 100%)',
                    },
                    '.bg-gold-gradient': { 'background': 'linear-gradient(90deg, #AA821D 3.29%, rgba(248, 249, 194, 0.874851) 53.01%, rgba(223, 189, 105, 0.65) 98.63%);' },
                    '.bg-radial-gradient': {
                        'background-image': 'radial-gradient(50% 50% at 50% 50%,#B30000 0%, rgba(255, 255, 255, 0) 100%);',
                    },
                },
                dark: {
                    ...require('daisyui/src/colors/themes')[
                        '[data-theme=light]'
                        ],
                    primary: '#6AD70E',
                    'primary-content': '#000100',
                    success: '#2DCD46',
                    'secondary-content': '#000100',
                    // error: '#EF4444',
                    error: '#B30000',
                    '.text-glow': {
                        //add glow to title
                        'text-shadow': '0 0 10px #6AD70E, 0 0 10px #6AD70E',
                    },
                    '.box-glow': {
                        //add glow to box
                        'box-shadow': '0 0 2px #6AD70E, 0 0 8px #6AD70E',
                    },
                    '.box-red-glow': {
                        //add glow to box
                        'box-shadow': '0 0 40px #B30000, 0 0 20px #B30000',
                    },
                    '.bg-gradient': {
                        'background-image': 'linear-gradient(90deg,#560911 0%, #9A2C3B 100%)',
                    },
                    '.bg-gold-gradient': { 'background': 'linear-gradient(90deg, #AA821D 3.29%, rgba(248, 249, 194, 0.874851) 53.01%, rgba(223, 189, 105, 0.65) 98.63%);' },
                    '.bg-radial-gradient': {
                        'background-image': 'radial-gradient(50% 50% at 50% 50%,#B30000 0%, rgba(255, 255, 255, 0) 100%);',
                    },
                },
            },
        ],
    },
    plugins: [require('daisyui')],
}
