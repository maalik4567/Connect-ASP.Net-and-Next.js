/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7290',
    }
};
