"use client"
import { useState, useEffect } from "react"
import { connectStacks, userSession } from "../lib/stacksAuth"

export default function ConnectStacks() {
  const [mounted, setMounted] = useState(false)
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    setMounted(true)
    if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData())
    }
  }, [])

  // Evitar errores de hidratación
  if (!mounted) return null

  const handleConnect = async () => {
    try {
      await connectStacks()
    } catch (error) {
      console.error("Stacks connection error:", error)
    }
  }

  const formatSTX = (addr: string) => `${addr.slice(0, 4)}...${addr.slice(-4)}`

  return (
    <button
      onClick={handleConnect}
      style={{
        padding: "10px 20px",
        background: userData ? "rgba(85, 70, 255, 0.2)" : "#5546ff",
        color: "white",
        border: userData ? "1px solid #5546ff" : "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "12px",
        transition: "all 0.3s ease"
      }}
    >
      {userData 
        ? `STX: ${formatSTX(userData.profile.stxAddress.mainnet)}` 
        : "Connect Stacks"}
    </button>
  )
}
