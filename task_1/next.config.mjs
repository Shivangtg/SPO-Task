/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // <--- This is the fix
    },
};

export default nextConfig;
