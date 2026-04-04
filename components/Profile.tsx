"use client"
import { useState, useEffect } from "react"

const CLIENT_ID = "182742"

export default function Profile({ user }: { user?: any }) {
  const [isStravaConnected, setIsStravaConnected] = useState(false)
  
  // Extraemos los datos exactos que envía el SDK de Base
  // Si user.displayName no existe, probamos con username o un fallback
  const displayName = user?.displayName || user?.username || "BASE USER"
  const pfp = user?.pfpUrl || null
  const bio = user?.bio || "Onchain Athlete"

  useEffect(() => {
    // Detectar si volvemos de Strava por la URL
    const params = new URLSearchParams(window.location.search)
    if (params.get("code")) {
      setIsStravaConnected(true)
      // Limpiamos la URL sin recargar la página
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

  const handleStravaConnect = () => {
    // Intentamos forzar la apertura fuera del iframe de Base
    const REDIRECT_URI = window.location.origin
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&approval_prompt=auto&scope=activity:read_all`
    
    // IMPORTANTE: En BaseApp, a veces window.open es bloqueado. 
    // Si no funciona, usaremos window.location.href aunque sea más brusco.
    window.location.href = authUrl;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%", maxWidth: "500px", margin: "0 auto" }}>
      
      {/* TARJETA DE PERFIL PARA BASEAPP */}
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
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "rgba(56, 189, 248, 0.1)", border: "1px dashed #38bdf8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px" }}>
              👤
            </div>
          )}
        </div>
        
        <h2 style={{ fontSize: "28px", fontWeight: "900", letterSpacing: "-1px", marginBottom: "4px", color: "white" }}>
          {displayName.toUpperCase()}
        </h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: "bold" }}>
          {bio}
        </p>
      </div>

      {/* INTEGRACIÓN STRAVA */}
      <div style={{ background: "rgba(15, 23, 42, 0.4)", padding: "24px", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
        <h3 style={{ fontSize: "10px", color: "#38bdf8", fontWeight: "bold", letterSpacing: "2px", marginBottom: "16px" }}>CONECTAR DISPOSITIVO</h3>

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
                {isStravaConnected ? "SINCRONIZADO" : "NO CONECTADO"}
              </div>
            </div>
          </div>

          <button 
            onClick={handleStravaConnect}
            style={{ 
              background: isStravaConnected ? "transparent" : "#fc4c02", 
              color: "white", 
              border: isStravaConnected ? "1px solid #fc4c02" : "none",
              padding: "10px 20px", borderRadius: "12px", fontWeight: "900", fontSize: "12px", cursor: "pointer"
            }}
          >
            {isStravaConnected ? "DESCONECTAR" : "CONECTAR"}
          </button>
        </div>
      </div>
    </div>
  )
}
