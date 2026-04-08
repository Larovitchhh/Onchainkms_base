"use client"
import { useState, useEffect } from "react"
import { checkCeloPass } from "../lib/celoService"
import Link from "next/link" // Importamos Link para navegar

export default function Profile() {
  const [isStravaConnected, setIsStravaConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [activities, setActivities] = useState<any[]>([])
  const [hasCeloPass, setHasCeloPass] = useState(false)
  const [checkingPass, setCheckingPass] = useState(true)

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
          fetchActivities(addr);
          
          const ownsPass = await checkCeloPass(addr);
          setHasCeloPass(ownsPass);
        }
      } catch (e) {
        console.log("No wallet detected");
      } finally {
        setCheckingPass(false);
      }
    };
    checkWallet();
    // ... resto de tu useEffect de Strava
  }, [])

  // ... (tus funciones fetchActivities, formatAddress, etc. se mantienen igual)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%", maxWidth: "500px", margin: "0 auto", color: "white", paddingBottom: "40px" }}>
      
      {/* CARD DE IDENTIDAD */}
      <div style={{ background: "rgba(15, 23, 42, 0.6)", padding: "40px 32px", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(10px)", textAlign: "center", position: "relative" }}>
        
        {hasCeloPass && (
          <div style={{ 
            position: "absolute", top: "20px", right: "20px", 
            background: "linear-gradient(135deg, #35D07F 0%, #FBCC5C 100%)",
            padding: "4px 12px", borderRadius: "12px", color: "#000",
            fontSize: "10px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "4px"
          }}>
            <span>CELO BUILDER</span> ✨
          </div>
        )}

        <div style={{ width: "80px", height: "80px", borderRadius: "20px", background: address ? "linear-gradient(135deg, #0052FF 0%, #38bdf8 100%)" : "rgba(255,255,255,0.05)", margin: "0 auto 20px auto", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" }}>
          🏃‍♂️
        </div>
        <h2 style={{ fontSize: "20px", fontWeight: "900", letterSpacing: "1px", marginBottom: "8px" }}>
          {address ? "ATHLETE CONNECTED" : "ONCHAIN PROFILE"}
        </h2>
        <div style={{ background: "rgba(0,0,0,0.3)", padding: "8px 16px", borderRadius: "10px", display: "inline-block", border: "1px solid rgba(255,255,255,0.1)" }}>
          <p style={{ color: "#38bdf8", fontSize: "14px", fontFamily: "monospace", margin: 0 }}>
            {address ? formatAddress(address) : "Waiting for wallet..."}
          </p>
        </div>
      </div>

      {/* BLOQUE DE ACCIÓN: MINT CELO PASS (Solo si no lo tiene) */}
      {!hasCeloPass && !checkingPass && address && (
        <Link href="/celo" style={{ textDecoration: "none" }}>
          <div style={{ 
            background: "linear-gradient(90deg, rgba(53,208,127,0.1) 0%, rgba(251,204,92,0.1) 100%)", 
            padding: "20px", borderRadius: "20px", border: "1px dashed #FBCC5C",
            display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer"
          }}>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: "900", fontSize: "14px", color: "#FBCC5C" }}>MINT CELO ONCHAIN PASS</div>
              <div style={{ fontSize: "11px", opacity: 0.6 }}>Get your builder badge for Proof of Ship</div>
            </div>
            <span style={{ fontSize: "20px" }}>⚡</span>
          </div>
        </Link>
      )}

      {/* PANEL DE STATS (Igual que el tuyo) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {/* ... tus stats de XP, Activities, etc ... */}
      </div>

      {/* NFT DISPLAY (Si ya lo tiene) */}
      {hasCeloPass && (
        <div style={{ background: "rgba(53, 208, 127, 0.1)", padding: "24px", borderRadius: "24px", border: "1px solid #35D07F", display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ width: "60px", height: "60px", borderRadius: "12px", background: "linear-gradient(135deg, #35D07F, #FBCC5C)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
            🏆
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontWeight: "900", fontSize: "14px", color: "#35D07F" }}>CELO ONCHAIN PASS</div>
            <div style={{ fontSize: "12px", opacity: 0.7 }}>Proof of Ship Builder Member</div>
          </div>
        </div>
      )}

      {/* ... Resto de tu código (Lista de actividades y Strava Card) */}
    </div>
  )
}
