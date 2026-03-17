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

  // Calculamos XP dinámicamente
  const xp = calculateXP(type as any, distance, duration, elevation)

  const activity = { type, distance, duration, elevation }

  const sports = [
    { id: "road", label: "Road Ride", icon: "🚴", color: "#f59e0b" },
    { id: "mtb", label: "MTB Ride", icon: "🚵", color: "#22c55e" },
    { id: "run", label: "Run", icon: "🏃", color: "#ef4444" },
    { id: "swim", label: "Swim", icon: "🏊", color: "#a855f7" },
  ]

  const activeSport = sports.find(s => s.id === type) || sports[0]

  // URL DE PREVIEW
  const nftPreviewURL = `/api/nft?sport=${type}&km=${distance}&time=${duration}&elev=${elevation}&xp=${xp}&v=${Date.now()}`

  // URLs de compartición
  const baseUrl = "https://onchainkms-base.vercel.app"
  const shareText = `Burned ${distance} KM onchain! 🔥 Recieved ${xp} XP on Base.`
  const fullPreviewUrl = `${baseUrl}${nftPreviewURL}`

  const shareWarpcast = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds[]=${encodeURIComponent(fullPreviewUrl)}`
  const shareX = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(fullPreviewUrl)}`

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #0a1a3a 0%, #0f2a5a 40%, #1e3a8a 100%)",
      color: "white",
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "40px 20px"
    }}>

      <div style={{
        display: "flex",
        gap: "24px",
        width: "100%",
        maxWidth: "1100px",
        alignItems: "stretch",
        flexWrap: "wrap"
      }}>

        {/* PANEL IZQUIERDO: CONFIGURACIÓN */}
        <div style={{
          flex: "1 1 500px",
          padding: "40px",
          borderRadius: "24px",
          background: "#0f0f0f",
          border: `1px solid ${activeSport.color}33`
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

          {[
            { label: "Distance (km)", val: distance, set: setDistance },
            { label: "Duration (min)", val: duration, set: setDuration },
            { label: "Elevation (m)", val: elevation, set: setElevation }
          ].map((item) => (
            <div key={item.label} style={{ marginBottom: "15px" }}>
              <label style={{
                display: "block",
                fontSize: "11px",
                color: "#666",
                marginBottom: "5px",
                fontWeight: 600,
                textTransform: "uppercase"
              }}>
                {item.label}
              </label>

              <input
                type="number"
                value={item.val || ""}
                placeholder="0"
                onChange={(e) => item.set(Number(e.target.value))}
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

          {/* PREVIEW DINÁMICA DEL NFT */}
          <div style={{ marginTop: "30px" }}>
             <p style={{ fontSize: "12px", color: "#555", marginBottom: "10px" }}>NFT PREVIEW</p>
             <div style={{ 
               width: "100%", 
               aspectRatio: "1792/1024", 
               background: "#050505", 
               borderRadius: "14px",
               overflow: "hidden",
               border: `1px solid ${activeSport.color}66`,
               display: "flex",
               alignItems: "center",
               justifyContent: "center"
             }}>
                <img
                  key={nftPreviewURL}
                  src={nftPreviewURL}
                  alt="NFT Preview"
                  crossOrigin="anonymous"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
             </div>
          </div>
        </div>

        {/* PANEL DERECHO: ACCIONES */}
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
          <span style={{
            fontSize: "11px",
            fontWeight: 800,
            color: activeSport.color,
            letterSpacing: "2px",
            marginBottom: "10px"
          }}>
            ONCHAIN REWARD
          </span>

          <div style={{
            fontSize: "80px",
            fontWeight: 900,
            color: "white",
            lineHeight: 1,
            textShadow: `0 0 20px ${activeSport.color}66`
          }}>
            {xp}
          </div>

          <div style={{ fontSize: "16px", color: "#888", marginBottom: "40px" }}>
            Experience Points
          </div>

          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
            <MintButton activity={activity} xp={xp} />
            <MintStacksButton activity={activity} xp={xp} />
            
            {/* BOTONES DE REDES SOCIALES */}
            <div style={{ 
              display: "flex", 
              gap: "8px", 
              width: "100%", 
              marginTop: "12px",
              paddingTop: "20px",
              borderTop: "1px solid #222"
            }}>
              <a 
                href={shareWarpcast}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "10px",
                  background: "#472a91",
                  color: "white",
                  fontSize: "11px",
                  fontWeight: "bold",
                  textDecoration: "none",
                  textAlign: "center"
                }}
              >
                Warpcast
              </a>
              <a 
                href={shareX}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "10px",
                  background: "#000",
                  border: "1px solid #333",
                  color: "white",
                  fontSize: "11px",
                  fontWeight: "bold",
                  textDecoration: "none",
                  textAlign: "center"
                }}
              >
                Share on X
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
