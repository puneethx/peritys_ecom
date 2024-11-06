/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['ishaastudio.com', 'ktprudential.eu', 'spartan-networks.com', 'img.freepik.com', 'houseofcambridge.co.uk', 'developer.apple.com', 'freepngimg.com', 'm.media-amazon.com', 'www.concept-phones.com', 'www.ftmodel.in', 'miro.medium.com', 'ferraricentre.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'your-external-domain.com',
                pathname: '/images/**',
            },
        ],
    },
};

export default nextConfig;
