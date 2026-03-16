import "./globals.css"

export const metadata = {
  title: "Onchain Sports",
  description: "Mint your sport activity on Base",
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: "https://onchainkms-base.vercel.app/nft/road.png",
      button: {
        title: "Mint my Activity",
        action: {
          type: "launch_frame",
          name: "Onchain Sports",
          url: "https://onchainkms-base.vercel.app/",
          splashImageUrl: "https://onchainkms-base.vercel.app/nft/splash.png",
          splashBackgroundColor: "#ffffff",
        },
      },
    }),
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
      <body>{children}</body>
    </html>
  )
}
