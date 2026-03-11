"use client"

import { useState } from "react"
import MintButton from "./MintButton"
import MintStacksButton from "./MintStacksButton"
import { calculateXP } from "../lib/xpCalculator"

export default function ActivityForm() {
  const [type, setType] = useState("run")
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

  // Definición de deportes con sus colores NFT y fondos asociados
  const sports = [
    { 
      id: "road", 
      label: "Road Ride", 
      icon: "🚴", 
      color: "#f59e0b", // Ámbar/Oro (NFT Oro)
      glowColor: "rgba(245, 158, 11, 0.4)",
    },
    { 
      id: "mtb", 
      label: "MTB Ride", 
      icon: "🚵", 
      color: "#22c55e", // Verde (NFT Verde)
      glowColor: "rgba(34, 197, 94, 0.4)",
    },
    { 
      id: "run", 
      label: "Onchain Run", 
      icon: "🏃", 
      color: "#ef4444", // Rojo (NFT Rojo)
      glowColor: "rgba(239, 68, 68, 0.4)",
    },
    { 
      id: "swim", 
      label: "Onchain Swim", 
      icon: "🏊", 
      color: "#a855f7", // Púrpura (NFT Púrpura)
      glowColor: "rgba(168, 85, 247, 0.4)",
    },
  ]

  // Encontrar la actividad seleccionada para obtener sus colores
  const activeSport = sports.find(s => s.id === type)

  // Estilos base para inputs
  const getInputStyle = (isActive: boolean = false) => ({
    width: "100%",
    padding: "16px",
    marginBottom: "16px",
    borderRadius: "14px",
    // Borde normal o borde con el color de la actividad
    border: isActive && activeSport 
      ? `2px solid ${activeSport.color}` 
      : "1px solid rgba(255, 255, 255, 0.1)",
    background: "rgba(255, 255, 255, 0.03)",
    color: "white",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.3s ease",
    boxShadow: isActive && activeSport 
      ? `inset 0 0 10px ${activeSport.glowColor}` 
      : "inset 0 2px 4px rgba(0,0,0,0.3)"
  })

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(circle at top center, #0f172a 0%, #050505 100%)",
      color: "white",
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
    }}>

      <div style={{
        width: 850,
        display: "flex",
        gap: 80,
        alignItems: "center",
        padding: "60px",
        borderRadius: "40px",
        background: "rgba(255, 255, 255, 0.01)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
      }}>

        {/* LEFT SIDE: INPUTS & SPORT SELECTION */}
        <div style={{ flex: 1 }}>
          <h2 style={{ marginBottom: "24px", fontSize: "24px", fontWeight: 800, letterSpacing: "-0.5px" }}>
            Identify Your Activity
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginBottom: "30px"
          }}>
            {sports.map(s => (
              <button
                key={s.id}
                onClick={() => setType(s.id)}
                style={{
                  padding: "14px",
                  borderRadius: "16px",
                  // El borde adopta el color del NFT si está seleccionado
                  border: type === s.id ? `2px solid ${s.color}` : "1px solid rgba(255,255,255,0.1)",
                  // Fondo con opacidad baja del color neón
                  background: type === s.id ? `${s.color}15` : "transparent",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontWeight: type === s.id ? 700 : 500,
                  // Efecto de brillo si está seleccionado
                  boxShadow: type === s.id ? `0 0 15px ${s.glowColor}` : "none",
                }}
              >
                <span style={{ fontSize: 20 }}>
                  {s.icon}
                </span>
                {s.label}
              </button>
            ))}
          </div>

          <div style={{ position: "relative" }}>
            <label style={{ display: "block", fontSize: "11px", color: "#64748b", marginBottom: "6px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>Distance (km)</label>
            <input
              placeholder="0.00"
              type="number"
              onChange={(e) => setDistance(Number(e.target.value))}
              // Pasamos true para indicar que el input debe reaccionar a la actividad activa
              style={getInputStyle(true)}
            />

            <label style={{ display: "block", fontSize: "11px", color: "#64748b", marginBottom: "6px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>Duration (min)</label>
            <input
              placeholder="0"
              type="number"
              onChange={(e) => setDuration(Number(e.target.value))}
              style={getInputStyle(true)}
            />

            <label style={{ display: "block", fontSize: "11px", color: "#64748b", marginBottom: "6px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>Elevation (m)</label>
            <input
              placeholder="0"
              type="number"
              onChange={(e) => setElevation(Number(e.target.value))}
              style={{ ...getInputStyle(true), marginBottom: 0 }}
            />
          </div>
        </div>

        {/* RIGHT SIDE: SCORE CARD */}
        <div style={{
          width: 300,
          padding: "40px 30px",
          borderRadius: "30px",
          // Mantenemos el fondo oscuro premium
          background: "linear-gradient(145deg, #0f172a, #050505)",
          // El borde de la tarjeta también responde al color de la actividad
          border: activeSport ? `1px solid ${activeSport.color}33` : "1px solid rgba(255, 255, 255, 0.05)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          // Brillo general de la tarjeta
          boxShadow: activeSport ? `0 0 40px ${activeSport.glowColor}` : "0 0 20px rgba(255,255,255,0.05)"
        }}>
          <span style={{ fontSize: "12px", fontWeight: 800, color: "#3b82f6", letterSpacing: "3px", marginBottom: "10px" }}>
            TOTAL REWARD
          </span>
          
          <div style={{
            fontSize: 84,
            fontWeight: 900,
            lineHeight: 1,
            // Degradado del texto
            background: "linear-gradient(to bottom, #fff 30%, #3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 15px rgba(59, 130, 246, 0.3))"
          }}>
            {xp}
          </div>

          <div style={{
            marginTop: 5,
            marginBottom: 40,
            fontSize: "18px",
            color: "#fff",
            fontWeight: 300,
            opacity: 0.8
          }}>
            Experience Points
          </div>

          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ 
              width: "100%", 
              transform: "scale(1.02)", 
              transition: "transform 0.2s" 
            }}>
              <MintButton activity={activity} xp={xp} />
            </div>
            
            <div style={{ width: "100%", opacity: 0.9 }}>
              <MintStacksButton activity={activity} xp={xp} />
            </div>
          </div>
          
          <div style={{ marginTop: "24px", fontSize: "10px", color: "#475569", fontStyle: "italic" }}>
            All activity verified on-chain.
          </div>
        </div>

      </div>
    </div>
  )
}
