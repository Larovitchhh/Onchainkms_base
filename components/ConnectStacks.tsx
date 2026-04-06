"use client"
import { useState, useEffect } from "react"
import { showConnect } from "@stacks/connect" // Importación directa para forzar el popup
import { userSession } from "../lib/stacksAuth"

export default function ConnectStacks() {
  const [mounted, setMounted] = useState(false)
  const [address, setAddress] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    // Verificamos si hay sesión activa al cargar
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData()
      const stxAddr = userData.profile.stxAddress?.mainnet || userData.profile.stxAddress?.testnet || userData.profile.stxAddress
      setAddress(stxAddr)
    }
  }, [])

  const handleConnect = () => {
    // Usamos showConnect directamente para asegurar que el navegador detecte la acción del usuario
    showConnect({
      appDetails: {
        name: "OnchainKMs",
        icon: window.location.origin + "/logo.png",
      },
      userSession,
      onFinish: () => {
        const userData = userSession.loadUserData()
        const stxAddr = userData.profile.stxAddress?.mainnet || userData.profile.stxAddress
        setAddress(stxAddr)
        window.location.reload() // Recargamos para asentar la sesión
      },
      onCancel: () => {
        console.log("Usuario canceló la conexión")
      }
    })
  }

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation() // Evitamos que el clic active el botón de conectar
    userSession.signUserOut()
    setAddress(null)
    window.location.href = window.location.origin // Limpieza total de la URL y estado
  }

  if (!mounted) return null

  const formatSTX = (addr: string) => `${addr.slice(0, 4)}...${addr.slice(-4)}`

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <button
        onClick={!address ? handleConnect : undefined}
        style={{
          padding: "10px 20px",
          background: address ? "rgba(85, 70, 255, 0.1)" : "#5546ff",
          color: "white",
          border: address ? "1px solid rgba(85, 70, 255, 0.4)" : "none",
          borderRadius: "12px",
          cursor: address ? "default" : "pointer",
          fontWeight: "900",
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          transition: "all 0.2s ease"
        }}
      >
        <span style={{ fontSize: "16px" }}>💜</span>
        {address ? formatSTX(address) : "Connect Stacks"}
      </button>

      {address && (
        <button 
          onClick={handleLogout}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.4)",
            borderRadius: "10px",
            width: "32px",
            height: "38px",
            cursor: "pointer",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          ✕
        </button>
      )}
    </div>
  )
}
