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
        {/* ID de tu proyecto en Base.dev */}
        <meta name="base:app_id" content="6941e8fdd19763ca26ddc370" />
        
        {/* Cargamos el SDK de Farcaster v2 por CDN para evitar el comando 'npm install' */}
        <script src="https://cdn.jsdelivr.net/npm/@farcaster/frame-sdk/dist/bundle.js"></script>
        
        <meta name="talentapp:project_verification" content="7484bc8aab7a80329d9a68fc559aad005ce48622f2bdea6131807097a49770a9c78661ef758841b68a2265853274175de292dff70ca314ced5dbb4232fd6d140" />
        <link rel="icon" href="/nft/favicon.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
