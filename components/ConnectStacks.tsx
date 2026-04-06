"use client"
import { userSession, connectStacks } from "../lib/stacksAuth"
import { useEffect, useState } from "react"

export default function ConnectStacks() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const handleLogout = () => {
    userSession.signUserOut()
    window.location.reload()
  }

  if (userSession.isUserSignedIn()) {
    const userData = userSession.loadUserData()
    const addr = userData.profile.stxAddress.mainnet || userData.profile.stxAddress
    return (
      <div style={{ display: "flex", gap: "10px" }}>
        <span style={{ color: "white", fontSize: "12px", border: "1px solid #5546ff", padding: "5px 10px", borderRadius: "8px" }}>
          {addr.slice(0,4)}...{addr.slice(-4)}
        </span>
        <button onClick={handleLogout} style={{ color: "white", background: "none", border: "none", cursor: "pointer" }}>✕</button>
      </div>
    )
  }

  return (
    <button
      onClick={() => connectStacks()} // Llamamos a la función de lib/stacksAuth.ts
      style={{
        padding: "10px 20px",
        background: "#5546ff",
        color: "white",
        borderRadius: "12px",
        fontWeight: "bold",
        cursor: "pointer",
        border: "none"
      }}
    >
      Connect Stacks
    </button>
  )
}
