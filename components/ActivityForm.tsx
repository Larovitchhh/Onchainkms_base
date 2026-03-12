"use client"

import { useState } from "react"
import MintButton from "./MintButton"
import MintStacksButton from "./MintStacksButton"
import { calculateXP } from "../lib/xpCalculator"

export default function ActivityForm() {
  const [type, setType] = useState("road")
  const [distance, setDistance] = useState(0)
  const [duration, setDuration] = useState(0)
  const [elevation, setElevation] = useState(0)

  const xp = calculateXP(type as any, distance, duration, elevation)

  const activity = { type, distance, duration, elevation }

  const sports = [
    { id: "road", label: "Onchain Road Ride", icon: "🚴", color: "#f59e0b" },
    { id: "mtb", label: "Onchain MTB Ride", icon: "🚵", color: "#22c55e" },
    { id: "run", label: "Onchain Run", icon: "🏃", color: "#ef4444" },
    { id: "swim", label: "Onchain Swim", icon: "🏊", color: "#a855f7" },
  ]

  const activeSport = sports.find(s => s.id === type) || sports[0]

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#050505", // Fondo único y profundo
      color: "white",
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "20px"
    }}>

      <div style={{
        display: "flex",
        gap: "24px",
        width: "100%",
        maxWidth: "900px",
        alignItems: "stretch"
      }}>

        {/* PANEL IZQUIERDO: FORMULARIO */}
        <div style={{
          flex: 1,
          padding: "40px",
          borderRadius: "24px",
          background: "#0f0f0f",
          border: `1px solid ${activeSport.color}33`,
          transition: "all 0.3s ease"
        }}>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "30px" }}>
            {sports.map(s => (
              <button
                key={s.id}
                onClick={() => setType(s.id)}
                style={{
                  padding: "12px",
                  borderRadius: "12px",
                  border: type === s.id ? `2px solid ${s.color}` : "1px solid #1f2937",
                  background: type === s.id ? `${s.color}15` : "#050505",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.2s"
                }}
              >
                <span>{s.icon}</span> {s.label}
              </button>
            ))}
          </div>

          {["Distance (km)", "Duration (min)", "Elevation (m)"].map((label, i) => (
            <div key={label} style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", fontSize: "11px", color: "#666", marginBottom: "5px", fontWeight: 600, textTransform: "uppercase" }}>{label}</label>
              <input
                type="number"
                placeholder="0"
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (i === 0) setDistance(val);
                  else if (i === 1) setDuration(val);
                  else setElevation(val);
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: `1px solid ${activeSport.color}44`,
                  background: "#050505",
                  color: "white",
                  outline: "none"
                }}
              />
            </div>
          ))}
        </div>

        {/* PANEL DERECHO: RECOMPENSA */}
        <div style={{
          width: "320px",
          padding: "40px",
          borderRadius: "24px",
          background: "#0f0f0f",
          border: `1px solid ${activeSport.color}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 30px ${activeSport.color}22`
        }}>
          <span style={{ fontSize: "11px", fontWeight: 800, color: activeSport.color, letterSpacing: "2px", marginBottom: "10px" }}>
            ONCHAIN REWARD
          </span>
          
          <div style={{
            fontSize: "80px",
            fontWeight: 900,
            color: "white", // Color sólido para asegurar visibilidad
            lineHeight: 1,
            textShadow: `0 0 20px ${activeSport.color}66`
          }}>
            {xp}
          </div>

          <div style={{ fontSize: "16px", color: "#888", marginBottom: "40px" }}>
            Experience Points
          </div>

          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
            <MintButton activity={activity} xp={xp} />
            <MintStacksButton activity={activity} xp={xp} />
          </div>
        </div>

      </div>
    </div>
  )
}
