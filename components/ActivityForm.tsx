"use client"

import { useState } from "react"
import MintButton from "./MintButton"
import MintStacksButton from "./MintStacksButton"
import { calculateXP } from "../lib/xpCalculator"

export default function ActivityForm() {
  const [type, setType] = useState("road") // Por defecto Road para ver el color ámbar inicial
  const [distance, setDistance] = useState(0)
  const [duration, setDuration] = useState(0)
  const [elevation, setElevation] = useState(0)

  const xp = calculateXP(
    type as any,
    distance,
    duration,
    elevation
  )

  const activity = {
    type,
    distance,
    duration,
    elevation
  }

  // Definición de deportes con sus colores NFT y resplandores asociados
  const sports = [
    { 
      id: "road", 
      label: "Road Ride", 
      icon: "🚴", 
      color: "#f59e0b", // Ámbar/Oro (NFT Oro)
      glowColor: "rgba(245, 158, 11, 0.3)",
      activeBg: "rgba(245, 158, 11, 0.1)"
    },
    { 
      id: "mtb", 
      label: "MTB Ride", 
      icon: "🚵", 
      color: "#22c55e", // Verde (NFT Verde)
      glowColor: "rgba(34, 197, 94, 0.3)",
      activeBg: "rgba(34, 197, 94, 0.1)"
    },
    { 
      id: "run", 
      label: "Onchain Run", 
      icon: "🏃", 
      color: "#ef4444", // Rojo (NFT Rojo)
      glowColor: "rgba(239, 68, 68, 0.3)",
      activeBg: "rgba(239, 68, 68, 0.1)"
    },
    { 
      id: "swim", 
      label: "Onchain Swim", 
      icon: "🏊", 
      color: "#a855f7", // Púrpura (NFT Púrpura)
      glowColor: "rgba(168, 85, 247, 0.3)",
      activeBg: "rgba(168, 85, 247, 0.1)"
    },
  ]

  // Encontrar la actividad seleccionada para obtener sus colores
  const activeSport = sports.find(s => s.id === type)

  // Estilos dinámicos para inputs
  const getInputStyle = (isActive: boolean = false) => ({
    width: "100%",
    padding: "16px",
    marginBottom: "20px",
    borderRadius: "14px",
    border: isActive && activeSport 
      ? `2px solid ${activeSport.color}` 
      : "1px solid rgba(255, 255, 255, 0.1)",
    background: "rgba(255, 255, 255, 0.03)",
    color: "white",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.3s ease",
    boxShadow: isActive && activeSport 
      ? `0 0 10px ${activeSport.glowColor}` 
      : "inset 0 2px 4px rgba(0,0,0,0.3)"
  })

  // Estilo base para las etiquetas de los inputs
  const labelStyle = { 
    display: "block", 
    fontSize: "12px", 
    color: "#94a3b8", 
    marginBottom: "8px", 
    fontWeight: 700, 
    textTransform: "uppercase", 
    letterSpacing: "1px" 
  }

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(circle at top center, #111827 0%, #050505 100%)", // Fondo degradado premium
      color: "white",
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
    }}>

      {/* MAIN CONTAINER: Ahora es invisible, solo alinea las dos tarjetas */}
      <div style={{
        display: "flex",
        gap: "40px", // Espacio equilibrado entre tarjetas
        alignItems: "stretch", // Asegura que ambas tarjetas tengan la misma altura
        maxWidth: "1100px",
        width: "100%",
        padding: "0 20px"
      }}>

        {/* LEFT SIDE: INPUTS & SPORT SELECTION (Glassmorphism) */}
        <div style={{ 
          flex: 1,
          padding: "50px",
          borderRadius: "24px",
          background: "rgba(255, 255, 255, 0.02)", // Cristal muy sutil
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
        }}>
          <h2 style={{ marginBottom: "30px", fontSize: "28px", fontWeight: 800, letterSpacing: "-1px" }}>
            <span style={{color: "#94a3b8"}}>Log Your</span> Activity
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "14px",
            marginBottom: "40px"
          }}>
            {sports.map(s => (
              <button
                key={s.id}
                onClick={() => setType(s.id)}
                style={{
                  padding: "16px",
                  borderRadius: "16px",
                  border: type === s.id ? `2px solid ${s.color}` : "1px solid rgba(255,255,255,0.1)",
                  background: type === s.id ? s.activeBg : "rgba(255,255,255,0.01)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontWeight: type === s.id ? 700 : 500,
                  fontSize: "15px",
                  boxShadow: type === s.id ? `0 0 20px ${s.glowColor}` : "none",
                }}
              >
                <span style={{ fontSize: 22 }}>{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>

          <div style={{ position: "relative" }}>
            <label style={labelStyle}>Distance (km)</label>
            <input
              placeholder="0.00"
              type="number"
              onChange={(e) => setDistance(Number(e.target.value))}
              style={getInputStyle(true)}
            />

            <label style={labelStyle}>Duration (minutes)</label>
            <input
              placeholder="0"
              type="number"
              onChange={(e) => setDuration(Number(e.target.value))}
              style={getInputStyle(true)}
            />

            <label style={labelStyle}>Elevation (meters)</label>
            <input
              placeholder="0"
              type="number"
              onChange={(e) => setElevation(Number(e.target.value))}
              style={{ ...getInputStyle(true), marginBottom: 0 }}
            />
          </div>
        </div>

        {/* RIGHT SIDE: SCORE CARD (Solid & Glowing) */}
        <div style={{
          width: "360px",
          padding: "50px 40px",
          borderRadius: "24px",
          background: "linear-gradient(160deg, #111827, #050505)", // Fondo sólido y oscuro
          border: activeSport ? `2px solid ${activeSport.color}` : "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center", // Centra el contenido verticalmente
          textAlign: "center",
          // Resplandor exterior que coincide con el color del NFT activo
          boxShadow: activeSport ? `0 0 60px ${activeSport.glowColor}` : "0 0 30px rgba(255,255,255,0.05)",
          transition: "all 0.4s ease"
        }}>
          <span style={{ 
            fontSize: "13px", 
            fontWeight: 800, 
            color: activeSport ? activeSport.color : "#94a3b8", 
            letterSpacing: "4px", 
            marginBottom: "15px",
            textTransform: "uppercase"
          }}>
            Onchain Reward
          </span>
          
          <div style={{
            fontSize: "110px", // Más grande para mayor impacto
            fontWeight: 900,
            lineHeight: 1,
            // Degradado del texto que se funde con el color de la actividad
            background: `linear-gradient(to bottom, #fff 40%, ${activeSport ? activeSport.color : "#fff"})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: `drop-shadow(0 0 20px ${activeSport ? activeSport.glowColor : "rgba(255,255,255,0.2)"})`,
            transition: "all 0.4s ease"
          }}>
            {xp}
          </div>

          <div style={{
            marginTop: 10,
            marginBottom: 50,
            fontSize: "20px",
            color: "#fff",
            fontWeight: 300,
            opacity: 0.8,
            letterSpacing: "1px"
          }}>
            Experience Points
          </div>

          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ 
              width: "100%", 
              transform: "scale(1.05)", // Ligeramente más grande para destacar
              transition: "transform 0.2s" 
            }}>
              <MintButton activity={activity} xp={xp} />
            </div>
            
            <div style={{ width: "100%", opacity: 0.9 }}>
              <MintStacksButton activity={activity} xp={xp} />
            </div>
          </div>
          
          <div style={{ marginTop: "30px", fontSize: "11px", color: "#64748b", fontStyle: "italic" }}>
            Verify your activity and mint your NFT.
          </div>
        </div>

      </div>
    </div>
  )
}
