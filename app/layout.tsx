import "./globals.css"

export const metadata = {
  title: "Onchain Sports",
  description: "Mint your sport activity on Base",
  // Intentamos inyectar el CSP vía Metadata de Next.js
  other: {
    'content-security-policy': "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com; img-src 'self' data: https: blob:; style-src 'self' 'unsafe-inline';",
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
        {/* Etiqueta META física: Esta es la que suele mandar sobre el resto */}
        <meta 
          httpEquiv="Content-Security-Policy" 
          content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; img-src 'self' data: https: blob:; style-src 'self' 'unsafe-inline';" 
        />
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
