"use client"
import { useState, useEffect } from "react"

const CLIENT_ID = "182742"
// Asegúrate de que esta URL esté permitida en tu panel de Strava
const REDIRECT_URI = typeof window !== 'undefined' ? `${window.location.origin}/` : ""

export default function Profile() {
  const [isStravaConnected, setIsStravaConnected] = useState(false)
  
  // En una sesión real, aquí podrías leer de localStorage si ya hubo un login
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("code")) {
      setIsStravaConnected(true)
      // Limpiar la URL para que no quede el código ahí expuesto
      window.history.replaceState({}, document.title, "/")
    }
  }, [])

  const handleStravaConnect = () => {
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&approval_prompt=auto&scope=activity:read_all`
    window.location.href = authUrl
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%", maxWidth: "600px", margin: "0 auto" }}>
      
      {/* CARD DE USUARIO */}
      <div style={{ 
        background: "rgba(15, 23, 42, 0.6)", 
        padding: "40px 32px", 
        borderRadius: "24px", 
        border: "1px solid rgba(255,255,255,0.05)", 
        backdropFilter: "blur(10px)",
        textAlign: "center" 
      }}>
        <div style={{ 
          width: "80px", 
          height: "80px", 
          borderRadius: "50%", 
          background: "linear-gradient(45deg, #38bdf8, #818cf8)", 
          margin: "0 auto 20px auto",
          border: "4px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "32px"
        }}>
          🏃‍♂️
        </div>
        <h2 style={{ fontSize: "24px", fontWeight: "900", letterSpacing: "-1px", marginBottom: "4px" }}>
          ATHLETE <span style={{ color: "#38bdf8" }}>PROFILE</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase" }}>
          Ready to sync onchain
        </p>
      </div>

      {/* SECCIÓN DE INTEGRACIONES */}
      <div style={{ 
        background: "rgba(15, 23, 42, 0.4)", 
        padding: "24px", 
        borderRadius: "24px", 
        border: "1px solid rgba(255,255,255,0.05)" 
      }}>
        <h3 style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", fontWeight: "bold", letterSpacing: "2px", marginBottom: "16px", textAlign: "left" }}>
          CONNECTED SERVICES
        </h3>

        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between", 
          background: "rgba(0,0,0,0.3)", 
          padding: "16px 20px", 
          borderRadius: "16px",
          border: isStravaConnected ? "1px solid #fc4c0250" : "1px solid rgba(255,255,255,0.05)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
             {/* Logo de Strava o Emoji */}
            <div style={{ fontSize: "24px", background: "#fc4c0220", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "10px" }}>
              🧡
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: "bold", fontSize: "16px" }}>STRAVA</div>
              <div style={{ fontSize: "11px", color: isStravaConnected ? "#22c55e" : "rgba(255,255,255,0.3)" }}>
                {isStravaConnected ? "● Sincronizado" : "No conectado"}
              </div>
            </div>
          </div>

          {!isStravaConnected ? (
            <button 
              onClick={handleStravaConnect}
              style={{ 
                background: "#fc4c02", 
                color: "white", 
                border: "none", 
                padding: "8px 16px", 
                borderRadius: "8px", 
                fontWeight: "900", 
                fontSize: "12px", 
                cursor: "pointer",
                boxShadow: "0 0 15px rgba(252, 76, 2, 0.3)"
              }}
            >
              CONNECT
            </button>
          ) : (
            <div style={{ color: "#22c55e", fontSize: "12px", fontWeight: "bold" }}>ACTIVE</div>
          )}
        </div>
      </div>

      {/* INFO EXTRA / ESTADÍSTICAS VACÍAS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {[
          { label: "TOTAL XP", value: "0" },
          { label: "NFTS MINTED", value: "0" }
        ].map(stat => (
          <div key={stat.label} style={{ background: "rgba(0,0,0,0.2)", padding: "16px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", fontWeight: "bold", letterSpacing: "1px", marginBottom: "4px" }}>{stat.label}</div>
            <div className="tech-font" style={{ fontSize: "20px", fontWeight: "bold" }}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
