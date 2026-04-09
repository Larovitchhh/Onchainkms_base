"use client"
import { useState, useEffect } from "react"
import MintButton from "./MintButton"
import MintStacksButton from "./MintStacksButton"
import { calculateXP } from "../lib/xpCalculator"
import { SportType } from "../types"

export default function ActivityForm() {
  const [type, setType] = useState<SportType>("run") 
  const [distance, setDistance] = useState(0)
  const [duration, setDuration] = useState(0)
  const [elevation, setElevation] = useState(0)

  // Calculamos XP en cada render para que siempre esté sincronizado
  const xp = calculateXP(type as any, distance, duration, elevation)
  
  // Objeto de actividad que pasamos a los botones de Mint
  const activity = { 
    type, 
    distance: Number(distance), 
    duration: Number(duration), 
    elevation: Number(elevation) 
  }

  const sports = [
    { id: "run", label: "RUN", icon: "/buttons/run.png", color: "#38bdf8" },
    { id: "road", label: "ROAD", icon: "/buttons/road.png", color: "#f59e0b" },
    { id: "mtb", label: "MTB", icon: "/buttons/mtb.png", color: "#22c55e" },
    { id: "swim", label: "SWIM", icon: "/buttons/swim.png", color: "#a855f7" },
  ]

  // URL de la API del NFT
  const nftPreviewURL = `/api/nft?sport=${type}&km=${distance}&time=${duration}&elev=${elevation}&xp=${xp}&v=${Date.now()}`

  return (
    <div style={{ display: "flex", gap: "32px", width: "100%", maxWidth: "1000px", flexWrap: "wrap", margin: "40px auto" }}>
      
      {/* LADO IZQUIERDO: INPUTS */}
      <div style={{ flex: "1 1 450px", background: "rgba(15, 23, 42, 0.6)", padding: "32px", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(10px)" }}>
        
        {/* GRILLA DE BOTONES */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "32px" }}>
          {sports.map(s => (
            <button
              key={s.id}
              onClick={() => setType(s.id as SportType)}
              style={{
                aspectRatio: "1/1",
                borderRadius: "16px",
                border: type === s.id ? `2px solid ${s.color}` : "1px solid rgba(255,255,255,0.1)",
                background: type === s.id ? `${s.color}20` : "rgba(0,0,0,0.3)",
                cursor: "pointer",
                padding: "0",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                boxShadow: type === s.id ? `0 0 15px ${s.color}40` : "none"
              }}
            >
              <img 
                src={s.icon} 
                alt={s.label} 
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover",
                  filter: type === s.id ? "none" : "brightness(0.5) grayscale(100%)",
                  transform: type === s.id ? "scale(1.05)" : "scale(1)",
                  transition: "all 0.4s ease"
                }} 
              />
            </button>
          ))}
        </div>

        {/* INPUTS DE DATOS */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "10px", color: "rgba(255,255,255,0.4)", marginBottom: "8px", fontWeight: "bold", letterSpacing: "1px" }}>DISTANCE (KM)</label>
          <input
            type="number"
            value={distance || ""}
            placeholder="0.00"
            onChange={(e) => setDistance(Number(e.target.value))}
            className="tech-font"
            style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.2)", color: "#38bdf8", fontSize: "18px", outline: "none", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "10px", color: "rgba(255,255,255,0.4)", marginBottom: "8px", fontWeight: "bold", letterSpacing: "1px" }}>DURATION (MIN)</label>
          <input
            type="number"
            value={duration || ""}
            placeholder="0"
            onChange={(e) => setDuration(Number(e.target.value))}
            className="tech-font"
            style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.2)", color: "#38bdf8", fontSize: "18px", outline: "none", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "10px", color: "rgba(255,255,255,0.4)", marginBottom: "8px", fontWeight: "bold", letterSpacing: "1px" }}>ELEVATION (M)</label>
          <input
            type="number"
            value={elevation || ""}
            placeholder="0"
            onChange={(e) => setElevation(Number(e.target.value))}
            className="tech-font"
            style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.2)", color: "#38bdf8", fontSize: "18px", outline: "none", boxSizing: "border-box" }}
          />
        </div>
      </div>

      {/* LADO DERECHO: REWARD & PREVIEW */}
      <div style={{ width: "340px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <div className="glow-border" style={{ padding: "32px", borderRadius: "24px", background: "linear-gradient(180deg, rgba(30,58,138,0.3) 0%, rgba(2,6,23,0.8) 100%)", textAlign: "center" }}>
          <div style={{ fontSize: "10px", color: "#38bdf8", fontWeight: "bold", letterSpacing: "3px", marginBottom: "8px" }}>XP EARNED</div>
          <div className="tech-font" style={{ fontSize: "64px", fontWeight: "900", color: "white", textShadow: "0 0 20px rgba(56, 189, 248, 0.5)" }}>{xp}</div>
          
          <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {/* BOTÓN MINT BASE */}
            <MintButton activity={activity} xp={xp} />
            {/* BOTÓN MINT STACKS */}
            <MintStacksButton activity={activity} xp={xp} />
          </div>
        </div>

        {/* PREVISUALIZACIÓN DEL NFT */}
        <div style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.5)" }}>
          <img src={nftPreviewURL} alt="Preview" style={{ width: "100%", display: "block" }} />
        </div>
      </div>
    </div>
  )
}
