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
                dark: {
                    ...require('daisyui/src/colors/themes')[
                        '[data-theme=dark]'
                    ],
                    'base-100': '#000100',
                    primary: '#6AD70E',
                    'primary-focus': '#74C367',
                    'primary-content': '#000000',
                    success: '#2DCD46',
                    secondary: '#6516DD',
                    'secondary-focus': '#7C3BFF',
                    'secondary-content': '#FFFFFF',
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
                        'background-image': 'linear-gradient(90deg,#560911 0%, #9A2C3B 100%)'
                    }
                },
            },
        ],
    },
    plugins: [require('daisyui')],
}
