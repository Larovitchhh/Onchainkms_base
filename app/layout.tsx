"use client"
import "./globals.css"
import { WagmiProvider, createConfig, http } from "wagmi"
import { base } from "wagmi/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

// Configuración de Wagmi optimizada para Base
export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="6941e8fdd19763ca26ddc370" />
        <link rel="icon" href="/nft/favicon.png" />
        {/* Metadatos de Farcaster para Base App */}
        <meta property="fc:frame" content="vNext" />
        <meta property="farcaster:metadata" content={JSON.stringify({
          version: "1",
          name: "OnchainKms",
          iconUrl: "https://onchainkms-base.vercel.app/nft/logo.png",
          homeUrl: "https://onchainkms-base.vercel.app",
          imageUrl: "https://onchainkms-base.vercel.app/nft/og.png",
          buttonTitle: "Mint Now",
          splashImageUrl: "https://onchainkms-base.vercel.app/nft/splash.png",
          splashBackgroundColor: "#0F172A",
        })} />
      </head>
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  )
}
