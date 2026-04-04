"use client"
import { useState, useEffect } from "react"

const CLIENT_ID = "182742"

export default function Profile({ user }: { user?: any }) {
  const [isStravaConnected, setIsStravaConnected] = useState(false)
  
  // Datos del usuario de BaseApp/Farcaster
  const displayName = user?.displayName || "ONCHAIN ATHLETE"
  const pfp = user?.pfpUrl || null
  const username = user?.username ? `@${user.username}` : "Not connected to Farcaster"

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("code")) {
      setIsStravaConnected(true)
      window.history.replaceState({}, document.title, "/")
    }
  }, [])

  const handleStravaConnect = () => {
    const REDIRECT_URI = window.location.origin
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&approval_prompt=auto&scope=activity:read_all`
    
    // Intentamos abrir en ventana nueva para evitar bloqueos
    window.open(authUrl, '_blank')
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%", maxWidth: "500px", margin: "0 auto" }}>
      
      {/* TARJETA DE PERFIL BASE NATIVE */}
      <div style={{ 
        background: "rgba(15, 23, 42, 0.6)", 
        padding: "40px 32px", 
        borderRadius: "24px", 
        border: "1px solid rgba(255,255,255,0.05)", 
        backdropFilter: "blur(10px)",
        textAlign: "center" 
      }}>
        <div style={{ position: "relative", width: "100px", height: "100px", margin: "0 auto 20px auto" }}>
          {pfp ? (
            <img src={pfp} alt="Profile" style={{ width: "100%", height: "100%", borderRadius: "50%", border: "3px solid #38bdf8", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "linear-gradient(45deg, #38bdf8, #818cf8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px" }}>🏃‍♂️</div>
          )}
          <div style={{ position: "absolute", bottom: "0", right: "0", background: "#38bdf8", width: "24px", height: "24px", borderRadius: "50%", border: "3px solid #0f172a" }}></div>
        </div>
        
        <h2 style={{ fontSize: "28px", fontWeight: "900", letterSpacing: "-1px", marginBottom: "4px" }}>
          {displayName.toUpperCase()}
        </h2>
        <p style={{ color: "#38bdf8", fontSize: "12px", fontWeight: "bold", letterSpacing: "1px" }}>
          {username}
        </p>
      </div>

      {/* INTEGRACIÓN STRAVA */}
      <div style={{ background: "rgba(15, 23, 42, 0.4)", padding: "24px", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
        <h3 style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", fontWeight: "bold", letterSpacing: "2px", marginBottom: "16px" }}>INTEGRATIONS</h3>

        <div style={{ 
          display: "flex", alignItems: "center", justifyContent: "space-between", 
          background: "rgba(0,0,0,0.3)", padding: "16px 20px", borderRadius: "16px",
          border: isStravaConnected ? "1px solid #fc4c02" : "1px solid rgba(255,255,255,0.05)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ fontSize: "24px", background: "#fc4c0220", width: "42px", height: "42px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "12px" }}>🧡</div>
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
              padding: "8px 18px", borderRadius: "10px", fontWeight: "900", fontSize: "12px", cursor: "pointer"
            }}
          >
            {isStravaConnected ? "UNLINK" : "CONNECT"}
          </button>
        </div>
        
        {!isStravaConnected && (
          <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", marginTop: "12px", textAlign: "center" }}>
            * If Google login fails, please use your Strava email/password.
          </p>
        )}
      </div>
    </div>
  )
}
