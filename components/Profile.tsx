"use client"
import { useState, useEffect } from "react"

// Intentamos importar de forma segura. Si da error en tu terminal, 
// es que necesitas instalar: npm install wagmi viem @tanstack/react-query
let useAccount: any;
try {
  useAccount = require("wagmi").useAccount;
} catch (e) {
  useAccount = () => ({ address: null, isConnected: false });
}

const CLIENT_ID = "182742"

export default function Profile() {
  const [isStravaConnected, setIsStravaConnected] = useState(false)
  
  // Obtenemos la info de la wallet si está disponible
  const account = useAccount ? useAccount() : { address: null, isConnected: false };
  const { address, isConnected } = account;

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

  const formatAddress = (addr: string) => addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "0x000...000"

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%", maxWidth: "500px", margin: "0 auto" }}>
      
      {/* CARD DE PERFIL */}
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
          background: isConnected ? "linear-gradient(135deg, #0052FF 0%, #38bdf8 100%)" : "rgba(255,255,255,0.05)", 
          margin: "0 auto 20px auto", display: "flex", alignItems: "center", 
          justifyContent: "center", fontSize: "32px"
        }}>
          {isConnected ? "🛡️" : "👤"}
        </div>
        
        <h2 style={{ fontSize: "20px", fontWeight: "900", letterSpacing: "1px" }}>
          {isConnected ? "CONNECTED ATHLETE" : "PROFILE"}
        </h2>

        <div style={{ 
          marginTop: "8px", background: "rgba(0,0,0,0.3)", padding: "6px 12px", 
          borderRadius: "8px", display: "inline-block", border: "1px solid rgba(255,255,255,0.1)" 
        }}>
          <p style={{ color: "#38bdf8", fontSize: "14px", fontFamily: "monospace" }}>
            {address ? formatAddress(address) : "Wallet not connected"}
          </p>
        </div>
      </div>

      {/* STRAVA SECTION */}
      <div style={{ background: "rgba(15, 23, 42, 0.4)", padding: "24px", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
        <h3 style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", fontWeight: "bold", letterSpacing: "2px", marginBottom: "16px" }}>SERVICES</h3>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(0,0,0,0.3)", padding: "16px 20px", borderRadius: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "24px" }}>🧡</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: "bold", fontSize: "16px" }}>STRAVA</div>
              <div style={{ fontSize: "11px", color: isStravaConnected ? "#22c55e" : "rgba(255,255,255,0.4)" }}>
                {isStravaConnected ? "SYNCED" : "NOT CONNECTED"}
              </div>
            </div>
          </div>
          <button 
            onClick={handleStravaConnect}
            style={{ background: "#fc4c02", color: "white", border: "none", padding: "10px 18px", borderRadius: "10px", fontWeight: "900", fontSize: "11px", cursor: "pointer" }}
          >
            {isStravaConnected ? "DISCONNECT" : "CONNECT"}
          </button>
        </div>
      </div>
    </div>
  )
}
