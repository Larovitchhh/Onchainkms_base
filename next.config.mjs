/** @type {import('next').NextConfig} */
const nextConfig = {
  // Saltamos la validación estricta de imágenes para la preview
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'onchainkms-base.vercel.app',
        port: '',
        pathname: '/nft/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/nft',
        headers: [
          {
            key: 'Content-Security-Policy',
            // 'unsafe-eval' es la clave para quitar el error que viste en F12
            value: "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
