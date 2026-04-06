"use client"
import { useState, useEffect } from "react"
import { userSession, connectStacks } from "../lib/stacksAuth"

export default function ConnectStacks() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const logout = () => {
    userSession.signUserOut()
    window.location.reload()
  }

  if (userSession.isUserSignedIn()) {
    const user = userSession.loadUserData()
    const addr = user.profile.stxAddress.mainnet || user.profile.stxAddress
    return (
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <div style={{ 
          background: "rgba(85, 70, 255, 0.1)", 
          padding: "8px 15px", 
          borderRadius: "12px", 
          border: "1px solid rgba(85, 70, 255, 0.3)", 
          fontSize: "12px",
          color: "white",
          fontWeight: "bold"
        }}>
          STX: {addr.slice(0,4)}...{addr.slice(-4)}
        </div>
        <button onClick={logout} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "14px" }}>✕</button>
      </div>
    )
  }

  return (
    <button
      onClick={() => connectStacks()}
      style={{
        padding: "10px 20px",
        background: "#5546ff",
        color: "white",
        border: "none",
        borderRadius: "12px",
        cursor: "pointer",
        fontWeight: "900",
        fontSize: "12px",
        boxShadow: "0 4px 15px rgba(85, 70, 255, 0.3)"
      }}
    >
      Connect Stacks
    </button>
  )
}
