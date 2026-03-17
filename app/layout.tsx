import "./globals.css"

export const metadata = {
  title: "Onchain Sports",
  description: "Mint your sport activity on Base",
  // Metadatos de Farcaster v2 y Frames
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://onchainkms-base.vercel.app/api/nft?sport=road&km=25&time=60&elev=100&xp=75",
    "farcaster:metadata": JSON.stringify({
      version: "1",
      name: "Onchain Sports",
      iconUrl: "https://onchainkms-base.vercel.app/favicon.png",
      homeUrl: "https://onchainkms-base.vercel.app",
      imageUrl: "https://onchainkms-base.vercel.app/api/nft?sport=road&km=25&xp=75",
      buttonTitle: "Mint Now",
      splashImageUrl: "https://onchainkms-base.vercel.app/favicon.png",
      splashBackgroundColor: "#0a1a3a",
    }),
  },
  openGraph: {
    title: "Onchain Sports",
    description: "Mint your sport activity on Base",
    url: "https://onchainkms-base.vercel.app",
    siteName: "Onchain Sports",
    images: [
      {
        url: "https://onchainkms-base.vercel.app/api/nft?sport=road&km=25&time=60&elev=100&xp=75",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Onchain Sports",
    description: "Mint your sport activity on Base",
    images: ["https://onchainkms-base.vercel.app/api/nft?sport=road&km=25&time=60&elev=100&xp=75"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="talentapp:project_verification"
          content="7484bc8aab7a80329d9a68fc559aad005ce48622f2bdea6131807097a49770a9c78661ef758841b68a2265853274175de292dff70ca314ced5dbb4232fd6d140"
        />
        <link rel="icon" href="/favicon.png" />
      </head>

      <body>
        {children}
      </body>
    </html>
  )
}
