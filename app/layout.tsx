import "./globals.css"

export const metadata = {
  title: "OnchainKms - Move further",
  description: "Track your activity onchain",
  
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://onchainkms-base.vercel.app/nft/og.png",
    
    // Mantenemos tu JSON de Farcaster
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

    // --- INYECCIÓN PARA REGISTRO EN BASE.DEV ---
    // Declaramos la estructura que te pide el validador
    "base:app:structure": "app,api/nft,webhook,components,lib,public,types",
    "base:app:components": "ActivityForm,ConnectStacks,ConnectWallet,MintButton,MintStacksButton",
    "base:app:lib": "contract,mint,mintStacks,stacksAuth,wallet,xpCalculator",
    "base:app:api_routes": "/api/nft,/webhook",
    "base:app:farcaster_config": "./well-known/farcaster.json",
    // -------------------------------------------
  },

  openGraph: {
    title: "Onchainkms - Move further",
    description: "Track your activity onchain",
    url: "https://onchainkms-base.vercel.app",
    siteName: "OnchainKms",
    images: [{ url: "https://onchainkms-base.vercel.app/nft/og.png", width: 1200, height: 630 }],
    locale: "es_ES",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Onchainkms - Move further",
    description: "Track your activity onchain",
    images: ["https://onchainkms-base.vercel.app/nft/og.png"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Tu verificación de Talent Protocol se queda igual */}
        <meta name="talentapp:project_verification" content="7484bc8aab7a80329d9a68fc559aad005ce48622f2bdea6131807097a49770a9c78661ef758841b68a2265853274175de292dff70ca314ced5dbb4232fd6d140" />
        <link rel="icon" href="/nft/favicon.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
