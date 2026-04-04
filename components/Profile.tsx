"use client"
import { useState, useEffect } from "react"

export default function Profile() {
  const [isStravaConnected, setIsStravaConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)

  // CLIENT-SAFE: Detectamos la wallet solo cuando el componente ya cargó en el navegador
  useEffect(() => {
    const checkWallet = async () => {
      try {
        const ethereum = (window as any).ethereum;
        if (ethereum && ethereum.selectedAddress) {
          setAddress(ethereum.selectedAddress);
        }
      } catch (e) {
        console.log("No wallet detected yet");
      }
    };
    checkWallet();

    // Check de Strava en la URL
    const params = new URLSearchParams(window.location.search)
    if (params.get("code")) {
      setIsStravaConnected(true)
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

  const handleStravaConnect = () => {
    const CLIENT_ID = "182742"
    const REDIRECT_URI = window.location.origin
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&approval_prompt=auto&scope=activity:read_all`
    window.location.href = authUrl;
  }

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%", maxWidth: "500px", margin: "0 auto", color: "white" }}>
      
      {/* CARD PRINCIPAL */}
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
          background: address ? "linear-gradient(135deg, #0052FF 0%, #38bdf8 100%)" : "rgba(255,255,255,0.05)", 
          margin: "0 auto 20px auto", display: "flex", alignItems: "center", 
          justifyContent: "center", fontSize: "32px"
        }}>
          🏃‍♂️
        </div>
        
        <h2 style={{ fontSize: "20px", fontWeight: "900", letterSpacing: "1px", marginBottom: "8px" }}>
          {address ? "ATHLETE CONNECTED" : "ONCHAIN PROFILE"}
        </h2>

        <div style={{ 
          background: "rgba(0,0,0,0.3)", padding: "8px 16px", 
          borderRadius: "10px", display: "inline-block", border: "1px solid rgba(255,255,255,0.1)" 
        }}>
          <p style={{ color: "#38bdf8", fontSize: "14px", fontFamily: "monospace", margin: 0 }}>
            {address ? formatAddress(address) : "Waiting for wallet..."}
          </p>
        </div>
      </div>

      {/* STRAVA CARD */}
      <div style={{ 
        background: "rgba(15, 23, 42, 0.4)", padding: "24px", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" 
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ fontSize: "24px", background: "#fc4c0220", width: "42px", height: "42px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "10px" }}>🧡</div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: "bold", fontSize: "16px" }}>STRAVA</div>
              <div style={{ fontSize: "11px", color: isStravaConnected ? "#22c55e" : "rgba(255,255,255,0.4)" }}>
                {isStravaConnected ? "● CONNECTED" : "NOT SYNCED"}
              </div>
            </div>
          </div>

          <button 
            onClick={handleStravaConnect}
            style={{ 
              background: "#fc4c02", color: "white", border: "none", 
              padding: "10px 20px", borderRadius: "10px", fontWeight: "900", 
              fontSize: "12px", cursor: "pointer" 
            }}
          >
            {isStravaConnected ? "LOGOUT" : "CONNECT"}
          </button>
        </div>
      </div>
    </div>
  )
}
