/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    // disable: process.env.NODE_ENV === 'development',
})

const nextConfig = withPWA({
    reactStrictMode: true,
    swcMinify: true,
    images: {
        minimumCacheTTL: 60,
        domains: [
            'tailwindcss.com',
            'i.ytimg.com',
            'www.facebook.com',
            'images.unsplash.com',
            'images.converteai.net'
        ],
    },
})

module.exports = nextConfig
