import "./globals.css"

export const metadata = {
  title: "Onchain Sports",
  description: "Mint your sport activity on Base"
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
      </head>

      <body>
        {children}
      </body>
    </html>
  )
}
