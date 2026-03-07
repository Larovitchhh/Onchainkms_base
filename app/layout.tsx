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
      <body style={{fontFamily:"Arial",padding:"40px"}}>
        {children}
      </body>
    </html>
  )
}
