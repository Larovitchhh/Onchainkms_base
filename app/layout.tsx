import "./globals.css"

export const metadata = {
  title: "OnchainKms - Move further",
  description: "Track your activity onchain",
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://onchainkms-base.vercel.app/nft/og.png",
    "farcaster:metadata": JSON.stringify({
      version: "1",
      name: "OnchainKms",
      iconUrl: "https://onchainkms-base.vercel.app/nft/logo.png",
      homeUrl: "https://onchainkms-base.vercel.app",
      imageUrl: "https://onchainkms-base.vercel.app/nft/image.png",
      buttonTitle: "Mint Now",
      splashImageUrl: "https://onchainkms-base.vercel.app/nft/splash.png",
      splashBackgroundColor: "#0F172A",
    }),
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Configuración esencial para MiniPay y dispositivos móviles */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <meta name="base:app_id" content="6941e8fdd19763ca26ddc370" />
        <script src="https://cdn.jsdelivr.net/npm/@farcaster/frame-sdk/dist/bundle.js" defer></script>
        <link rel="icon" href="/nft/favicon.png" />
      </head>
      <body style={{ backgroundColor: "#020617" }}>{children}</body>
    </html>
  )
}
