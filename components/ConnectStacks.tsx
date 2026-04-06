"use client"
import { useState, useEffect } from "react"
import { showConnect, UserSession, AppConfig } from "@stacks/connect"

export default function ConnectStacks() {
  const [address, setAddress] = useState<string | null>(null)

  // Configuramos la sesión dentro del componente o de forma persistente
  const appConfig = new AppConfig(['store_write', 'publish_data'])
  const userSession = new UserSession({ appConfig })

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData()
      setAddress(userData.profile.stxAddress?.mainnet || userData.profile.stxAddress)
    }
  }, [])

  const handleConnect = () => {
    console.log("Forzando limpieza de sesión antigua...");
    // Esto limpia el valor {} que vemos en tu captura de pantalla
    localStorage.removeItem('blockstack-session'); 
    
    showConnect({
      userSession,
      appDetails: {
        name: "OnchainKMs",
        icon: window.location.origin + "/logo.png",
      },
      onFinish: () => {
        window.location.reload()
      },
      onCancel: () => {
        console.log("Conexión cancelada");
      }
    })
  }

  const handleLogout = () => {
    userSession.signUserOut()
    localStorage.removeItem('blockstack-session')
    window.location.reload()
  }

  // Renderizado directo para evitar problemas de hidratación que "duerman" el botón
  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      {!address ? (
        <button
          onClick={handleConnect}
          id="stx-connect-button"
          style={{
            padding: "10px 20px",
            background: "linear-gradient(135deg, #5546ff 0%, #7c3aed 100%)",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "900",
            fontSize: "12px",
            boxShadow: "0 4px 15px rgba(85, 70, 255, 0.4)"
          }}
        >
          Connect Stacks
        </button>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(85, 70, 255, 0.1)", padding: "8px 12px", borderRadius: "12px", border: "1px solid #5546ff" }}>
          <span style={{ fontSize: "12px", fontWeight: "bold" }}>
            {address.slice(0, 4)}...{address.slice(-4)}
          </span>
          <button onClick={handleLogout} style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontSize: "16px" }}>✕</button>
        </div>
      )}
    </div>
  )
}
