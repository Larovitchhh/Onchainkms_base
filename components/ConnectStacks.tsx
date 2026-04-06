"use client"
import { useState, useEffect } from "react"
import { showConnect } from "@stacks/connect"
import { userSession } from "../lib/stacksAuth"

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

  const handleConnect = () => {
    console.log("Botón pulsado: Iniciando showConnect...") // Para verificar en F12
    
    showConnect({
      appDetails: {
        name: "OnchainKMs",
        icon: window.location.origin + "/logo.png",
      },
      userSession,
      onFinish: () => {
        window.location.reload()
      }
    })
  }

  const handleLogout = () => {
    userSession.signUserOut()
    setAddress(null)
    window.location.reload()
  }

  if (!mounted) return null

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {!address ? (
        <button
          onClick={handleConnect}
          style={{
            padding: "10px 20px",
            background: "#5546ff",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "900",
            fontSize: "12px"
          }}
        >
          Connect Stacks
        </button>
      ) : (
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <div style={{ background: "rgba(85, 70, 255, 0.1)", padding: "10px 15px", borderRadius: "12px", border: "1px solid #5546ff", fontSize: "12px", fontWeight: "bold" }}>
            STX: {address.slice(0,4)}...{address.slice(-4)}
          </div>
          <button onClick={handleLogout} style={{ background: "none", border: "none", color: "white", cursor: "pointer", opacity: 0.5 }}>✕</button>
        </div>
      )}
    </div>
  )
}
