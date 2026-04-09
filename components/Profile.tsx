"use client"
import { useState, useEffect, useCallback } from "react"
import { checkCeloPass } from "../lib/celoService"
import Link from "next/link"

export default function Profile() {
  const [isStravaConnected, setIsStravaConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [activities, setActivities] = useState<any[]>([])
  const [hasCeloPass, setHasCeloPass] = useState(false)
  const [checkingPass, setCheckingPass] = useState(true)

  const fetchActivities = useCallback(async (addr: string) => {
    try {
      const res = await fetch(`/webhook?address=${addr}`);
      const data = await res.json();
      setActivities(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching profile activities:", err);
    }
  }, []);

  const stats = activities.reduce((acc, act) => ({
    totalKm: acc.totalKm + (Number(act.distance) || 0),
    totalXp: acc.totalXp + (Number(act.xp) || 0),
    totalElev: acc.totalElev + (Number(act.elevation) || 0),
    count: acc.count + 1
  }), { totalKm: 0, totalXp: 0, totalElev: 0, count: 0 });

  useEffect(() => {
    const checkWallet = async () => {
      try {
        const ethereum = (window as any).ethereum;
        if (ethereum && ethereum.selectedAddress) {
          const addr = ethereum.selectedAddress;
          setAddress(addr);
          await fetchActivities(addr);
          const ownsPass = await checkCeloPass(addr);
          setHasCeloPass(ownsPass);
        }
      } catch (e) {
        console.log("No wallet detected yet");
      } finally {
        setCheckingPass(false);
      }
    };
    checkWallet();
  }, [fetchActivities])

  const handleStravaConnect = () => {
    const CLIENT_ID = "182742"
    const REDIRECT_URI = window.location.origin
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&approval_prompt=auto&scope=activity:read_all`
    window.location.href = authUrl;
  }

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getDate()}/${d.getMonth() + 1}`;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%", maxWidth: "500px", margin: "0 auto", color: "white", paddingBottom: "40px" }}>
      
      {/* 1. CARD DE IDENTIDAD (LIMPIA CON EMOJI) */}
      <div style={{ background: "rgba(15, 23, 42, 0.6)", padding: "40px 32px", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(10px)", textAlign: "center" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "20px", background: address ? "linear-gradient(135deg, #0052FF 0%, #38bdf8 100%)" : "rgba(255,255,255,0.05)", margin: "0 auto 20px auto", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" }}>
          🏃‍♂️
        </div>
        <h2 style={{ fontSize: "20px", fontWeight: "900", letterSpacing: "1px", marginBottom: "8px" }}>
          {address ? "ONCHAIN ATHLETE" : "ONCHAIN PROFILE"}
        </h2>
        <div style={{ background: "rgba(0,0,0,0.3)", padding: "8px 16px", borderRadius: "10px", display: "inline-block", border: "1px solid rgba(255,255,255,0.1)" }}>
          <p style={{ color: "#38bdf8", fontSize: "14px", fontFamily: "monospace", margin: 0 }}>
            {address ? formatAddress(address) : "Waiting for wallet..."}
          </p>
        </div>
      </div>

      {/* 2. PANEL DE STATS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <div style={{ background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
          <div style={{ fontSize: "10px", opacity: 0.5, fontWeight: "900", marginBottom: "4px" }}>TOTAL XP</div>
          <div style={{ fontSize: "24px", fontWeight: "900", color: "#FFD700" }}>{stats.totalXp.toLocaleString()}</div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
          <div style={{ fontSize: "10px", opacity: 0.5, fontWeight: "900", marginBottom: "4px" }}>ACTIVITIES</div>
          <div style={{ fontSize: "24px", fontWeight: "900", color: "#38bdf8" }}>{stats.count}</div>
        </div>
      </div>

      {/* 3. EL PNG COMO PANEL COMPLETO (ENCIMA DE ACTIVIDADES) */}
      {hasCeloPass && (
        <div style={{ 
          width: "100%", 
          borderRadius: "28px", 
          border: "2px solid #35D07F", 
          overflow: "hidden", 
          lineHeight: 0, // Elimina espacios fantasma bajo la imagen
          boxShadow: "0 0 40px rgba(53, 208, 127, 0.2)"
        }}>
          <img 
            src="/nft/celo-pass.png" 
            alt="Celo Onchain Athlete Pass" 
            style={{ 
              width: "100%", 
              height: "auto", 
              display: "block",
              objectFit: "cover"
            }}
          />
        </div>
      )}

      {/* 4. LISTA DE ACTIVIDADES */}
      <div style={{ background: "rgba(15, 23, 42, 0.4)", padding: "24px", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "900", marginBottom: "16px", color: "rgba(255,255,255,0.4)", letterSpacing: "1px" }}>
          MY ONCHAIN ACTIVITIES
        </h3>
        {activities.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px", opacity: 0.3, fontSize: "12px" }}>
            No activities minted yet.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {activities.map((act, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", padding: "12px 16px", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div>
                  <div style={{ fontSize: "10px", color: act.blockchain === 'base' ? '#38bdf8' : '#35D07F', fontWeight: "bold" }}>
                    {formatDate(act.created_at)} • {act.blockchain.toUpperCase()}
                  </div>
                  <div style={{ fontSize: "15px", fontWeight: "900" }}>
                     {act.sport === 'run' ? '🏃' : '🚲'} {act.distance}km
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "16px", color: "#22c55e", fontWeight: "900" }}>+{act.xp} XP</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. STRAVA CARD */}
      <div style={{ background: "rgba(15, 23, 42, 0.4)", padding: "24px", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
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
          <button onClick={handleStravaConnect} style={{ background: "#fc4c02", color: "white", border: "none", padding: "10px 20px", borderRadius: "10px", fontWeight: "900", cursor: "pointer" }}>
            {isStravaConnected ? "LOGOUT" : "CONNECT"}
          </button>
        </div>
      </div>
    </div>
  )
}
