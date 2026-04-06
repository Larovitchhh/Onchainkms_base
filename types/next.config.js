/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      // Mantenemos lo de Farcaster que ya tenías
      {
        source: "/.well-known/farcaster.json",
        headers: [
          { key: "Content-Type", value: "application/json" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
      // Añadimos la política de seguridad para que Stacks pueda funcionar
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            // Permitimos 'unsafe-eval' (necesario para @stacks/connect) y los dominios de Hiro/Stacks
            value: "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.hiro.so https://*.stacks.co; object-src 'none';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
