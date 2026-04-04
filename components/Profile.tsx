"use client"
import { useState, useEffect } from "react"
// Importamos el hook de wagmi (que es el estándar que pide Base ahora)
import { useAccount } from "wagmi" 

const CLIENT_ID = "182742"

export default function Profile() {
  const [isStravaConnected, setIsStravaConnected] = useState(false)
  
  // ESTO ES LO IMPORTANTE:
  // Obtenemos la dirección real de la wallet conectada en BaseApp
  const { address, isConnected } = useAccount() 

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("code")) {
      setIsStravaConnected(true)
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

  const handleStravaConnect = () => {
    const REDIRECT_URI = window.location.origin
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&approval_prompt=auto&scope=activity:read_all`
    window.location.href = authUrl;
  };

  // Formatear la dirección para que se vea bonita (0x1234...5678)
  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%", maxWidth: "500px", margin: "0 auto" }}>
      
      <div style={{ 
        background: "rgba(15, 23, 42, 0.6)", 
        padding: "40px 32px", 
        borderRadius: "24px", 
        border: "1px solid rgba(255,255,255,0.05)", 
        backdropFilter: "blur(10px)",
        textAlign: "center" 
      }}>
        <div style={{ 
          width: "80px", height: "80px", borderRadius: "20px", 
          background: isConnected ? "linear-gradient(135deg, #0052FF 0%, #38bdf8 100%)" : "#1e293b", 
          margin: "0 auto 20px auto", display: "flex", alignItems: "center", 
          justifyContent: "center", fontSize: "32px", boxShadow: isConnected ? "0 0 20px rgba(0, 82, 255, 0.3)" : "none"
        }}>
          {isConnected ? "✅" : "👤"}
        </div>
        
        <h2 style={{ fontSize: "20px", fontWeight: "900", letterSpacing: "1px", color: "white" }}>
          {isConnected ? "CONNECTED ATHLETE" : "NO WALLET FOUND"}
        </h2>

        <div style={{ 
          marginTop: "8px", background: "rgba(0,0,0,0.3)", padding: "6px 12px", 
          borderRadius: "8px", display: "inline-block", border: "1px solid rgba(255,255,255,0.1)" 
        }}>
          <p style={{ color: "#38bdf8", fontSize: "14px", fontFamily: "monospace", fontWeight: "bold" }}>
            {isConnected && address ? formatAddress(address) : "0x000...000"}
          </p>
        </div>
      </div>

      {/* INTEGRACIÓN STRAVA */}
      <div style={{ background: "rgba(15, 23, 42, 0.4)", padding: "24px", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
        <h3 style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", fontWeight: "bold", letterSpacing: "2px", marginBottom: "16px" }}>INTEGRATIONS</h3>
        {/* ... Resto del código de Strava igual ... */}
        <div style={{ 
          display: "flex", alignItems: "center", justifyContent: "space-between", 
          background: "rgba(0,0,0,0.3)", padding: "16px 20px", borderRadius: "16px",
          border: isStravaConnected ? "1px solid #fc4c02" : "1px solid rgba(255,255,255,0.05)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ fontSize: "24px" }}>🧡</div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: "bold", fontSize: "16px", color: "white" }}>STRAVA</div>
              <div style={{ fontSize: "11px", color: isStravaConnected ? "#22c55e" : "rgba(255,255,255,0.4)" }}>
                {isStravaConnected ? "CONNECTED" : "NOT SYNCED"}
              </div>
            </div>
          </div>
          <button 
            onClick={handleStravaConnect}
            style={{ 
              background: isStravaConnected ? "transparent" : "#fc4c02", 
              color: "white", 
              border: isStravaConnected ? "1px solid #fc4c02" : "none",
              padding: "10px 18px", borderRadius: "10px", fontWeight: "900", fontSize: "11px", cursor: "pointer"
            }}
          >
            {isStravaConnected ? "LOGOUT" : "CONNECT"}
          </button>
        </div>
      </div>
    </div>
  )
}
