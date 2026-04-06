"use client"
import { useState, useEffect } from "react"
import { AppConfig, UserSession, showConnect } from "@stacks/connect"

const appConfig = new AppConfig(['store_write', 'publish_data'])
const userSession = new UserSession({ appConfig })

export default function ConnectStacks() {
  const [mounted, setMounted] = useState(false)
  const [address, setAddress] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData()
      setAddress(userData.profile.stxAddress?.mainnet || userData.profile.stxAddress)
    }
  }, [])

  const handleConnect = (e: React.MouseEvent) => {
    e.preventDefault() // Evitamos la navegación real
    console.log("Evento disparado correctamente")
    
    // Limpiamos rastro manual por si acaso
    localStorage.removeItem('blockstack-session')
    
    showConnect({
      appDetails: {
        name: "OnchainKMs",
        icon: window.location.origin + "/logo.png",
      },
      userSession,
      onFinish: () => {
        window.location.reload()
      },
      onCancel: () => {
        console.log("Cancelado")
      }
    })
  }

  if (!mounted) return null

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {!address ? (
        <a
          href="#"
          onClick={handleConnect}
          style={{
            padding: "10px 20px",
            background: "#5546ff",
            color: "white",
            textDecoration: "none",
            borderRadius: "12px",
            fontWeight: "900",
            fontSize: "12px",
            display: "inline-block",
            textAlign: "center"
          }}
        >
          Connect Stacks
        </a>
      ) : (
        <div style={{ display: "flex", gap: "10px", alignItems: "center", background: "rgba(85, 70, 255, 0.1)", padding: "10px", borderRadius: "12px" }}>
          <span style={{ fontSize: "12px" }}>{address.slice(0,4)}...{address.slice(-4)}</span>
          <button onClick={() => { userSession.signUserOut(); window.location.reload(); }} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>✕</button>
        </div>
      )}
    </div>
  )
}
