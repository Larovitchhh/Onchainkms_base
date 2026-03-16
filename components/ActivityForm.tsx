"use client"

import { useState, useEffect } from "react"
import MintButton from "./MintButton"
import MintStacksButton from "./MintStacksButton"
import { calculateXP } from "../lib/xpCalculator"
import { SportType, Activity } from "../types"

export default function ActivityForm() {
  const [type, setType] = useState<SportType>("road")
  const [distance, setDistance] = useState(0)
  const [duration, setDuration] = useState(0)
  const [elevation, setElevation] = useState(0)

  // Señal para Farcaster (Ready)
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.parent.postMessage({ type: "ready" }, "*");
    }
  }, []);

  const xp = calculateXP(type, distance, duration, elevation)

  // FIX: Cast exacto para que TypeScript no de error
  const activity: Activity = { 
    type: type as SportType, 
    distance: Number(distance) || 0, 
    duration: Number(duration) || 0, 
    elevation: Number(elevation) || 0 
  }

  const sports: { id: SportType; label: string; icon: string; color: string }[] = [
    { id: "road", label: "Road Ride", icon: "🚴", color: "#f59e0b" },
    { id: "mtb", label: "MTB Ride", icon: "🚵", color: "#22c55e" },
    { id: "run", label: "Run", icon: "🏃", color: "#ef4444" },
    { id: "swim", label: "Swim", icon: "🏊", color: "#a855f7" },
  ]

  const activeSport = sports.find(s => s.id === type) || sports[0]
  const nftURL = `/api/nft?sport=${type}&km=${distance}&time=${duration}&elev=${elevation}&xp=${xp}`

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #0a1a3a 0%, #0f2a5a 40%, #1e3a8a 100%)",
      color: "white",
      padding: "20px"
    }}>
      <div style={{ display: "flex", gap: "24px", width: "100%", maxWidth: "1100px" }}>
        <div style={{ flex: 1, padding: "40px", borderRadius: "24px", background: "#0f0f0f", border: `1px solid ${activeSport.color}33` }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "30px" }}>
            {sports.map(s => (
              <button key={s.id} onClick={() => setType(s.id)} style={{
                padding: "12px", borderRadius: "12px", border: type === s.id ? `2px solid ${s.color}` : "1px solid #1f2937",
                background: type === s.id ? `${s.color}15` : "#050505", color: "white", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px"
              }}>
                <span>{s.icon}</span> {s.label}
              </button>
            ))}
          </div>

          {[
            { label: "Distance (km)", val: distance, set: setDistance },
            { label: "Duration (min)", val: duration, set: setDuration },
            { label: "Elevation (m)", val: elevation, set: setElevation }
          ].map((item) => (
            <div key={item.label} style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", fontSize: "11px", color: "#666", marginBottom: "5px", textTransform: "uppercase" }}>{item.label}</label>
              <input type="number" value={item.val || ""} onChange={(e) => item.set(Number(e.target.value))} style={{
                width: "100%", padding: "12px", borderRadius: "10px", border: `1px solid ${activeSport.color}44`, background: "#050505", color: "white"
              }} />
            </div>
          ))}

          {xp > 0 && (
            <div style={{ marginTop: "30px" }}>
              <img src={nftURL} alt="Preview" style={{ width: "100%", borderRadius: "14px", border: `1px solid ${activeSport.color}` }} />
            </div>
          )}
        </div>

        <div style={{ width: "320px", padding: "40px", borderRadius: "24px", background: "#0f0f0f", border: `1px solid ${activeSport.color}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: "11px", fontWeight: 800, color: activeSport.color, letterSpacing: "2px" }}>ONCHAIN REWARD</span>
          <div style={{ fontSize: "80px", fontWeight: 900, color: "white" }}>{xp}</div>
          <div style={{ fontSize: "16px", color: "#888", marginBottom: "40px" }}>XP Points</div>
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
            <MintButton activity={activity} xp={xp} />
            <MintStacksButton activity={activity} xp={xp} />
          </div>
        </div>
      </div>
    </div>
  )
}
