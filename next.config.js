/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: [
            'app/api/NorthWindService'
        ]
    }
}

module.exports = nextConfig
