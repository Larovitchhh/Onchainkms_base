import "./globals.css"

export const metadata = {
  title: "OnchainKms - Move further",
  description: "Track your activity onchain",
  
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://onchainkms-base.vercel.app/og.png",
    
    // SINCRONIZACIÓN TOTAL: Cada campo del well-known debe estar aquí
    "farcaster:metadata": JSON.stringify({
      version: "1",
      name: "OnchainKms",
      iconUrl: "https://onchainkms-base.vercel.app/logo.png",
      homeUrl: "https://onchainkms-base.vercel.app",
      imageUrl: "https://onchainkms-base.vercel.app/image.png",
      splashImageUrl: "https://onchainkms-base.vercel.app/splash.png",
      splashBackgroundColor: "#0F172A",
      webhookUrl: "https://onchainkms-base.vercel.app/api/webhook",
      // Campos extra que tienes en tu well-known y faltaban aquí:
      subtitle: "Track your activity onchain",
      description: "Track your activity onchain",
      screenshotUrls: ["https://onchainkms-base.vercel.app/screenshot1.png"],
      primaryCategory: "health-fitness",
      tagline: "Track your activity onchain"
    }),
  },

  openGraph: {
    title: "Onchainkms - Move further",
    description: "Track your activity onchain",
    url: "https://onchainkms-base.vercel.app",
    siteName: "OnchainKms",
    images: [{ url: "https://onchainkms-base.vercel.app/og.png", width: 1200, height: 630 }],
    locale: "es_ES",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Onchainkms - Move further",
    description: "Track your activity onchain",
    images: ["https://onchainkms-base.vercel.app/og.png"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="talentapp:project_verification" content="7484bc8aab7a80329d9a68fc559aad005ce48622f2bdea6131807097a49770a9c78661ef758841b68a2265853274175de292dff70ca314ced5dbb4232fd6d140" />
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
