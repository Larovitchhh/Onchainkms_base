"use client"
import { useState, useEffect } from "react"
import { showConnect, UserSession, AppConfig } from "@stacks/connect"

// Configuramos la sesión directamente aquí para evitar fallos de importación
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

  const handleConnect = () => {
    console.log("Intentando abrir wallet de Stacks...")
    
    showConnect({
      userSession,
      appDetails: {
        name: "OnchainKMs",
        icon: window.location.origin + "/logo.png",
      },
      onFinish: () => {
        const userData = userSession.loadUserData()
        setAddress(userData.profile.stxAddress?.mainnet || userData.profile.stxAddress)
        window.location.reload()
      },
      onCancel: () => {
        console.log("Conexión cancelada por el usuario")
      }
    })
  }

  const handleLogout = () => {
    userSession.signUserOut()
    window.location.reload()
  }

  if (!mounted) return null

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      {!address ? (
        <button
          onClick={handleConnect}
          style={{
            padding: "10px 20px",
            background: "#5546ff",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "900",
            fontSize: "12px",
            boxShadow: "0 4px 14px 0 rgba(85, 70, 255, 0.39)"
          }}
        >
          Connect Stacks
        </button>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(85, 70, 255, 0.1)", padding: "5px 12px", borderRadius: "10px", border: "1px solid #5546ff" }}>
          <span style={{ fontSize: "12px", fontWeight: "bold", color: "white" }}>
            {address.slice(0, 4)}...{address.slice(-4)}
          </span>
          <button 
            onClick={handleLogout}
            style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontSize: "16px", padding: "0 5px", marginLeft: "5px" }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
